import * as THREE from 'three'
import { rand, clamp, pick } from './utils.js'
import { createParticleTexture, createBloodSplatTexture, createGlowTexture } from './textures.js'

const pointVertex = `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (340.0 / max(1.0, -mv.z));
  gl_Position = projectionMatrix * mv;
}`
const pointFragment = `
uniform sampler2D uMap;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  if (tex.a * vAlpha < .01) discard;
  gl_FragColor = vec4(vColor, tex.a * vAlpha);
}`

class ParticlePool {
  constructor(scene, max, additive, texture, color) {
    this.max = max
    this.particles = []
    this.positions = new Float32Array(max * 3)
    this.colors = new Float32Array(max * 3)
    this.sizes = new Float32Array(max)
    this.alphas = new Float32Array(max)
    this.geo = new THREE.BufferGeometry()
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3))
    this.geo.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1))
    this.geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1))
    this.geo.setDrawRange(0, 0)
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: texture } },
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexColors: false
    })
    this.points = new THREE.Points(this.geo, this.mat)
    this.points.frustumCulled = false
    scene.add(this.points)
    this.color = color
  }

  spawn(position, velocity, opts = {}) {
    if (this.particles.length >= this.max) this.particles.shift()
    this.particles.push({
      x: position.x, y: position.y, z: position.z,
      vx: velocity.x, vy: velocity.y, vz: velocity.z,
      gravity: opts.gravity ?? -9,
      drag: opts.drag ?? 1.2,
      life: opts.life ?? .8,
      maxLife: opts.life ?? .8,
      size: opts.size ?? .08,
      color: new THREE.Color(opts.color ?? this.color),
      fade: opts.fade ?? 1,
      floor: opts.floor ?? 0
    })
  }

  update(dt) {
    let n = 0
    const arr = this.particles
    for (let i = arr.length - 1; i >= 0; i--) {
      const p = arr[i]
      p.life -= dt
      if (p.life <= 0) { arr.splice(i, 1); continue }
      p.vy += p.gravity * dt
      const damp = Math.max(0, 1 - p.drag * dt)
      p.vx *= damp; p.vz *= damp
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt
      if (p.y < p.floor + .02) { p.y = p.floor + .02; p.vy = Math.abs(p.vy) * .25; p.vx *= .62; p.vz *= .62 }
      const t = p.life / p.maxLife
      this.positions[n * 3] = p.x
      this.positions[n * 3 + 1] = p.y
      this.positions[n * 3 + 2] = p.z
      this.colors[n * 3] = p.color.r
      this.colors[n * 3 + 1] = p.color.g
      this.colors[n * 3 + 2] = p.color.b
      this.sizes[n] = p.size * (0.55 + t * .65)
      this.alphas[n] = Math.min(1, t * 2) * p.fade
      n++
    }
    this.geo.setDrawRange(0, n)
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aColor.needsUpdate = true
    this.geo.attributes.aSize.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
  }
}

export class Effects {
  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
    this.bloodTex = createParticleTexture(false)
    this.sparkTex = createParticleTexture(true)
    this.blood = new ParticlePool(scene, 900, false, this.bloodTex, 0x6b0a06)
    this.sparks = new ParticlePool(scene, 600, true, this.sparkTex, 0xffb35f)
    this.decals = []
    this.decalIndex = 0
    this.decalTexture = createBloodSplatTexture(256)
    this.debris = []
    this.slashes = []
    this.flashes = []
    this.floaters = []
    this.trauma = 0
    this.time = 0
    this.setupDecals()
    this.setupFlashPool()
  }

  setupDecals() {
    const geo = new THREE.PlaneGeometry(1, 1)
    for (let i = 0; i < 52; i++) {
      const mat = new THREE.MeshBasicMaterial({ map: this.decalTexture, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.y = .018
      mesh.visible = false
      mesh.renderOrder = 2
      this.scene.add(mesh)
      this.decals.push(mesh)
    }
  }

  setupFlashPool() {
    this.flashTex = createGlowTexture(128)
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.SpriteMaterial({ map: this.flashTex, color: 0xffc077, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 })
      const sprite = new THREE.Sprite(mat)
      sprite.visible = false
      this.scene.add(sprite)
      this.flashes.push({ sprite, life: 0, max: .2, start: 1 })
    }
  }

  bloodBurst(position, direction, amount = 20, power = 1) {
    const dir = direction ? direction.clone().normalize() : new THREE.Vector3(0, 0, 1)
    for (let i = 0; i < amount; i++) {
      const v = new THREE.Vector3(
        dir.x * rand(.4, 3.1) * power + rand(-1.3, 1.3),
        rand(.2, 2.4) * power + dir.y,
        dir.z * rand(.4, 3.1) * power + rand(-1.3, 1.3)
      )
      const color = new THREE.Color().setHSL(.012 + rand(-.01, .015), .82, rand(.09, .2))
      this.blood.spawn(
        { x: position.x + rand(-.14, .14), y: position.y + rand(-.18, .18), z: position.z + rand(-.14, .14) },
        v,
        { gravity: -11, drag: .9, life: rand(.45, 1.2), size: rand(.035, .115) * (power > 1 ? 1.3 : 1), color, floor: 0 }
      )
    }
    // mist
    for (let i = 0; i < Math.max(3, amount * .18); i++) {
      const color = new THREE.Color(0x4a0906)
      this.blood.spawn(
        { x: position.x, y: position.y, z: position.z },
        { x: rand(-.5, .5), y: rand(0, .6), z: rand(-.5, .5) },
        { gravity: .1, drag: 2, life: rand(.3, .7), size: rand(.15, .32), color, fade: .55 }
      )
    }
    this.addDecal(position, power)
  }

  addDecal(position, scale = 1) {
    const mesh = this.decals[this.decalIndex % this.decals.length]
    this.decalIndex++
    if (mesh.position.y < .015) mesh.position.y = .017 + rand(0, .006)
    mesh.position.set(position.x + rand(-.15, .15), .019 + rand(0, .006), position.z + rand(-.15, .15))
    mesh.rotation.z = rand(0, Math.PI * 2)
    const s = rand(.5, 1.4) * scale
    mesh.scale.set(s, s, 1)
    mesh.material.opacity = rand(.45, .78)
    mesh.visible = true
    mesh.userData.life = rand(16, 30)
    mesh.userData.maxLife = mesh.userData.life
  }

  sparksBurst(position, normal, amount = 15, power = 1) {
    const dir = normal ? normal.clone().normalize() : new THREE.Vector3(0, 1, 0)
    for (let i = 0; i < amount; i++) {
      const v = new THREE.Vector3(
        dir.x * rand(1, 4.5) + rand(-1.6, 1.6),
        rand(.1, 3.4) + dir.y,
        dir.z * rand(1, 4.5) + rand(-1.6, 1.6)
      ).multiplyScalar(power)
      const color = new THREE.Color().setHSL(rand(.055, .11), 1, rand(.5, .7))
      this.sparks.spawn(
        { x: position.x, y: position.y, z: position.z }, v,
        { gravity: -12, drag: .55, life: rand(.16, .6), size: rand(.025, .09), color, floor: 0 }
      )
    }
    this.impactFlash(position, 1.1 * power)
  }

  embers(position, amount = 10, color = 0xff7a3c) {
    for (let i = 0; i < amount; i++) {
      const c = new THREE.Color(color).offsetHSL(rand(-.02, .02), 0, rand(-.15, .15))
      this.sparks.spawn(
        { x: position.x + rand(-.4, .4), y: position.y, z: position.z + rand(-.4, .4) },
        { x: rand(-.4, .4), y: rand(.4, 1.8), z: rand(-.4, .4) },
        { gravity: .4, drag: .8, life: rand(.5, 1.6), size: rand(.025, .08), color: c }
      )
    }
  }

  dust(position, amount = 12, color = 0x9d8261, power = 1) {
    for (let i = 0; i < amount; i++) {
      const c = new THREE.Color(color)
      this.blood.spawn(
        { x: position.x + rand(-.2, .2), y: .05 + rand(0, .12), z: position.z + rand(-.2, .2) },
        { x: rand(-1.4, 1.4) * power, y: rand(.1, .7) * power, z: rand(-1.4, 1.4) * power },
        { gravity: -.15, drag: 1.8, life: rand(.4, .9), size: rand(.18, .4) * power, color: c, fade: .22 }
      )
    }
  }

  impactFlash(position, scale = 1, color = 0xffbe7a) {
    const f = this.flashes.find(x => x.life <= 0) || this.flashes[0]
    f.life = .19; f.max = .19; f.start = scale
    f.sprite.position.copy(position)
    f.sprite.material.color.set(color)
    f.sprite.scale.setScalar(.45 * scale)
    f.sprite.visible = true
  }

  spawnDebris(position, color, size = .16, velocity = null, type = 'metal') {
    const geo = Math.random() < .5 ? new THREE.BoxGeometry(size * rand(.7, 1.5), size * rand(.5, 1.3), size * rand(.4, .9)) : new THREE.TetrahedronGeometry(size * rand(.6, 1.2))
    const mat = new THREE.MeshStandardMaterial({ color, metalness: type === 'metal' ? .8 : .05, roughness: type === 'metal' ? .38 : .9 })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.position.copy(position)
    this.scene.add(mesh)
    const v = velocity || new THREE.Vector3(rand(-2.8, 2.8), rand(1.5, 5), rand(-2.8, 2.8))
    this.debris.push({ mesh, v, av: new THREE.Vector3(rand(-8, 8), rand(-8, 8), rand(-8, 8)), life: rand(5, 8), floor: .04 + rand(0, .08) })
  }

  spawnHead(position, color, helmetColor) {
    const group = new THREE.Group()
    const head = new THREE.Mesh(new THREE.SphereGeometry(.16, 9, 7), new THREE.MeshStandardMaterial({ color, roughness: .7 }))
    head.scale.set(.94, 1.1, .96)
    group.add(head)
    if (helmetColor) {
      const helm = new THREE.Mesh(new THREE.SphereGeometry(.173, 9, 6, 0, Math.PI * 2, 0, Math.PI * .62), new THREE.MeshStandardMaterial({ color: helmetColor, metalness: .8, roughness: .33 }))
      helm.position.y = .04; group.add(helm)
    }
    group.position.copy(position)
    group.castShadow = true
    this.scene.add(group)
    this.debris.push({ mesh: group, v: new THREE.Vector3(rand(-2.5, 2.5), rand(3, 6), rand(-1, 2.5)), av: new THREE.Vector3(rand(-9, 9), rand(-9, 9), rand(-9, 9)), life: 9, floor: .18, head: true, blood: true })
    for (let i = 0; i < 24; i++) {
      this.blood.spawn({ x: position.x, y: position.y, z: position.z }, { x: rand(-2, 2), y: rand(1, 4), z: rand(-2, 2) }, { gravity: -11, drag: .7, life: rand(.5, 1.3), size: rand(.04, .11), color: new THREE.Color(0x5a0805) })
    }
  }

  slash(position, angle, heavy = false) {
    const inner = heavy ? 1.05 : .75
    const outer = heavy ? 3.0 : 2.55
    const theta = heavy ? 1.7 : 1.95
    const geo = new THREE.RingGeometry(inner, outer, 24, 1, -theta / 2, theta)
    const mat = new THREE.MeshBasicMaterial({ color: heavy ? 0xffa568 : 0xe8d3ae, transparent: true, opacity: .5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(position)
    mesh.position.y += heavy ? 1.3 : 1.1
    if (heavy) {
      mesh.rotation.set(0, -angle + Math.PI / 2, -.55)
    } else {
      mesh.rotation.set(-Math.PI / 2 + .32, 0, 0)
      mesh.rotation.z = -angle
    }
    this.scene.add(mesh)
    this.slashes.push({ mesh, life: .22, max: .22 })
  }

  floatText(position, text, cls = '') {
    const el = document.createElement('div')
    el.className = `float-num ${cls}`
    el.textContent = text
    document.getElementById('float-layer').appendChild(el)
    this.floaters.push({ el, position: position.clone(), life: .72 })
  }

  shake(amount) {
    this.trauma = clamp(this.trauma + amount, 0, 1.3)
  }

  getShake(dt) {
    if (this.trauma <= 0) return { x: 0, y: 0 }
    this.trauma = Math.max(0, this.trauma - dt * 1.8)
    const s = this.trauma * this.trauma
    return { x: (Math.sin(this.time * 91.3) + Math.sin(this.time * 57.1)) * .045 * s, y: (Math.cos(this.time * 83.7) + Math.sin(this.time * 47.9)) * .035 * s }
  }

  update(dt, camera = this.camera) {
    this.time += dt
    this.blood.update(dt)
    this.sparks.update(dt)
    for (const d of this.decals) {
      if (!d.visible) continue
      d.userData.life -= dt
      if (d.userData.life <= 0) { d.visible = false; continue }
      if (d.userData.life < 3) d.material.opacity = Math.max(0, d.material.opacity - dt * .18)
    }
    for (let i = this.debris.length - 1; i >= 0; i--) {
      const d = this.debris[i]
      d.life -= dt
      if (d.life <= 0) {
        this.scene.remove(d.mesh)
        d.mesh.traverse?.(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose() })
        this.debris.splice(i, 1)
        continue
      }
      d.v.y -= 15 * dt
      d.mesh.position.addScaledVector(d.v, dt)
      if (d.mesh.position.y < d.floor) {
        d.mesh.position.y = d.floor
        if (Math.abs(d.v.y) > 1.2) { d.v.y *= -.28; d.v.x *= .65; d.v.z *= .65 } else { d.v.y = 0; d.v.multiplyScalar(.94) }
        d.av.multiplyScalar(.93)
        if (d.head && Math.random() < .15) this.blood.spawn({ x: d.mesh.position.x, y: d.mesh.position.y, z: d.mesh.position.z }, { x: rand(-.3, .3), y: .2, z: rand(-.3, .3) }, { gravity: -9, drag: 1, life: .4, size: .05, color: new THREE.Color(0x500704) })
      }
      d.mesh.rotation.x += d.av.x * dt
      d.mesh.rotation.y += d.av.y * dt
      d.mesh.rotation.z += d.av.z * dt
      if (!d.head && d.mesh.position.y <= d.floor + .1) d.v.x *= .985
    }
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const s = this.slashes[i]
      s.life -= dt
      if (s.life <= 0) {
        this.scene.remove(s.mesh); s.mesh.geometry.dispose(); s.mesh.material.dispose(); this.slashes.splice(i, 1); continue
      }
      const k = 1 - s.life / s.max
      s.mesh.scale.setScalar(1 + k * .34)
      s.mesh.material.opacity = (1 - k) * .42
    }
    for (const f of this.flashes) {
      if (f.life <= 0) continue
      f.life -= dt
      const k = 1 - f.life / f.max
      f.sprite.scale.setScalar(f.start * (.45 + k * 1.9))
      f.sprite.material.opacity = (1 - k) * .7
      if (f.life <= 0) f.sprite.visible = false
    }
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const f = this.floaters[i]
      f.life -= dt
      if (f.life <= 0) { f.el.remove(); this.floaters.splice(i, 1); continue }
      const p = f.position.clone().project(camera)
      const x = (p.x * .5 + .5) * window.innerWidth
      const y = (-p.y * .5 + .5) * window.innerHeight
      f.el.style.left = `${x}px`
      f.el.style.top = `${y}px`
    }
  }
}
