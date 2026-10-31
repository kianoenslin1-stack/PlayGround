import * as THREE from 'three'
import { rand, randInt, chance, clamp, TAU, bloodSplatTexture, softDropTexture, makeCanvas } from './utils.js'
import { sound } from './audio.js'

const GRAVITY = -22

/* ------------------------------------------------------------------ */
/* Blood droplets                                                      */
/* ------------------------------------------------------------------ */

export class BloodParticles {
  constructor(scene, renderer, count = 1400) {
    this.scene = scene
    this.max = count
    this.cursor = 0
    this.particles = []

    const geo = new THREE.BufferGeometry()
    this.pos = new Float32Array(count * 3)
    this.col = new Float32Array(count * 3)
    this.size = new Float32Array(count)
    this.alpha = new Float32Array(count)
    this.vel = new Float32Array(count * 3)
    this.life = new Float32Array(count)
    this.maxLife = new Float32Array(count)
    this.grounded = new Uint8Array(count)
    this.grav = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      this.pos[i * 3 + 1] = -999
      this.alpha[i] = 0
      this.particles.push({ active: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, max: 1, size: 0.05, r: 0.4, g: 0.02, b: 0.03, ground: false, grav: 1 })
    }

    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.col, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alpha, 1))
    geo.setDrawRange(0, count)
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100)

    const map = softDropTexture()
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uMap: { value: map },
        uScale: { value: 500 }
      },
      vertexShader: /* glsl */`
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uScale;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (uScale / max(0.35, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          if (vAlpha <= 0.001) discard;
          vec4 t = texture2D(uMap, gl_PointCoord);
          float a = t.a * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor, a);
        }
      `
    })
    this.setSize(renderer)
    this.points = new THREE.Points(geo, this.material)
    this.points.frustumCulled = false
    this.points.renderOrder = 3
    scene.add(this.points)
    this.geo = geo
  }

  setSize(renderer) {
    const h = renderer.domElement.height || 900
    this.material.uniforms.uScale.value = h * 0.55
  }

  spawn(x, y, z, opts = {}) {
    const p = this.particles[this.cursor]
    this.cursor = (this.cursor + 1) % this.max
    const spread = opts.spread ?? 0.2
    p.active = true
    p.x = x + rand(-spread, spread)
    p.y = y + rand(-spread, spread)
    p.z = z + rand(-spread, spread)
    p.vx = (opts.vx ?? 0) + rand(-1, 1) * (opts.chaos ?? 1.6)
    p.vy = (opts.vy ?? 0) + rand(-0.4, 1.1) * (opts.chaos ?? 1.6)
    p.vz = (opts.vz ?? 0) + rand(-1, 1) * (opts.chaos ?? 1.6)
    p.life = 0
    p.max = rand(0.5, 1.5) * (opts.life ?? 1)
    p.size = rand(0.035, 0.12) * (opts.size ?? 1)
    const tone = rand(0.55, 1)
    p.r = 0.38 * tone
    p.g = 0.012 + rand(0, 0.02)
    p.b = 0.02 + rand(0, 0.02)
    p.ground = false
    p.grav = opts.gravity ?? 1
    return p
  }

  burst(pos, opts = {}) {
    const n = opts.count ?? 18
    for (let i = 0; i < n; i++) this.spawn(pos.x, pos.y, pos.z, opts)
  }

  sprayCone(pos, dir, opts = {}) {
    const n = opts.count ?? 20
    const speed = opts.speed ?? 4
    const spread = opts.spread ?? 0.55
    for (let i = 0; i < n; i++) {
      const p = this.spawn(pos.x, pos.y, pos.z, { ...opts, chaos: 0 })
      const vx = dir.x * speed + rand(-1, 1) * spread * speed
      const vy = dir.y * speed + rand(-0.4, 1.2) * spread * speed
      const vz = dir.z * speed + rand(-1, 1) * spread * speed
      p.vx = vx; p.vy = vy; p.vz = vz
    }
  }

  update(dt, decals) {
    const posA = this.pos
    const colA = this.col
    const sizeA = this.size
    const alphaA = this.alpha
    for (let i = 0; i < this.max; i++) {
      const p = this.particles[i]
      if (!p.active) { alphaA[i] = 0; continue }
      p.life += dt
      if (p.life >= p.max) {
        p.active = false
        alphaA[i] = 0
        posA[i * 3 + 1] = -999
        continue
      }
      p.vy += GRAVITY * p.grav * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.z += p.vz * dt
      if (p.y <= 0.015) {
        if (!p.ground) {
          p.ground = true
          if (decals && chance(0.22)) decals.add(p.x, 0.011, p.z, rand(0.1, 0.35), rand(0, TAU))
        }
        p.active = false
        alphaA[i] = 0
        posA[i * 3 + 1] = -999
        continue
      }
      posA[i * 3] = p.x
      posA[i * 3 + 1] = p.y
      posA[i * 3 + 2] = p.z
      colA[i * 3] = p.r
      colA[i * 3 + 1] = p.g
      colA[i * 3 + 2] = p.b
      sizeA[i] = p.size
      const t = p.life / p.max
      alphaA[i] = Math.min(1, (1 - t) * 2.2) * 0.95
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aColor.needsUpdate = true
    this.geo.attributes.aSize.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
  }

  clear() {
    for (const p of this.particles) p.active = false
    this.alpha.fill(0)
    this.pos.fill(-999)
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
  }
}

/* ------------------------------------------------------------------ */
/* Ground decals & pools                                               */
/* ------------------------------------------------------------------ */

export class BloodDecals {
  constructor(scene, max = 460) {
    this.max = max
    this.cursor = 0
    const geo = new THREE.PlaneGeometry(1, 1)
    geo.rotateX(-Math.PI / 2)
    const mat = new THREE.MeshBasicMaterial({
      map: bloodSplatTexture(), transparent: true, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      color: 0xffffff, opacity: 0.94
    })
    this.mesh = new THREE.InstancedMesh(geo, mat, max)
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.renderOrder = 1
    this.mesh.frustumCulled = false
    this.mesh.count = 0
    this.count = 0
    this.matrix = new THREE.Matrix4()
    this.quat = new THREE.Quaternion()
    this.pos = new THREE.Vector3()
    this.scale = new THREE.Vector3()
    const c = new THREE.Color()
    for (let i = 0; i < max; i++) {
      this.mesh.setColorAt(i, c.setRGB(1, 1, 1))
      this.matrix.makeScale(0, 0, 0)
      this.mesh.setMatrixAt(i, this.matrix)
    }
    scene.add(this.mesh)
  }

  add(x, z, scale = 1, rot = 0, tint = 1) {
    const i = this.cursor
    this.cursor = (this.cursor + 1) % this.max
    this.count = Math.min(this.count + 1, this.max)
    this.mesh.count = this.count
    this.pos.set(x, 0.012 + (i % 9) * 0.00035, z)
    this.quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot)
    this.scale.set(scale * rand(0.9, 1.15), 1, scale * rand(0.9, 1.15))
    this.matrix.compose(this.pos, this.quat, this.scale)
    this.mesh.setMatrixAt(i, this.matrix)
    const c = new THREE.Color().setRGB(0.72 * tint, 0.72 * tint, 0.72 * tint)
    this.mesh.setColorAt(i, c)
    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
  }

  clear() {
    this.matrix.makeScale(0, 0, 0)
    for (let i = 0; i < this.max; i++) this.mesh.setMatrixAt(i, this.matrix)
    this.mesh.count = 0
    this.cursor = 0
    this.count = 0
    this.mesh.instanceMatrix.needsUpdate = true
  }
}

export class BloodPools {
  constructor(scene, max = 26) {
    this.scene = scene
    this.max = max
    this.list = []
    const tex = this.poolTexture()
    this.mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, depthWrite: false, opacity: 0.92,
      color: 0x9a5a5a, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3
    })
    this.geo = new THREE.CircleGeometry(1, 24)
    this.geo.rotateX(-Math.PI / 2)
  }

  poolTexture() {
    const s = 128
    const c = makeCanvas(s, s)
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2)
    g.addColorStop(0, 'rgba(40,0,3,0.98)')
    g.addColorStop(0.55, 'rgba(70,2,7,0.9)')
    g.addColorStop(0.82, 'rgba(80,3,8,0.55)')
    g.addColorStop(1, 'rgba(60,0,4,0)')
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2, 0, TAU); ctx.fill()
    // irregular edge blobs
    for (let i = 0; i < 40; i++) {
      const a = rand(0, TAU), d = rand(34, 60)
      ctx.fillStyle = `rgba(60,1,6,${rand(0.2, 0.6)})`
      ctx.beginPath(); ctx.ellipse(s / 2 + Math.cos(a) * d, s / 2 + Math.sin(a) * d, rand(2, 8), rand(2, 7), a, 0, TAU); ctx.fill()
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }

  add(x, z, target = 1.4) {
    let pool = this.list.find((p) => p.life === 0)
    if (!pool) {
      if (this.list.length < this.max) {
        const mesh = new THREE.Mesh(this.geo, this.mat)
        mesh.renderOrder = 2
        mesh.rotation.y = rand(0, TAU)
        this.scene.add(mesh)
        pool = { mesh, size: 0.01, target: 1, life: 1, growing: true }
        this.list.push(pool)
      } else {
        pool = this.list[0]
        this.list.push(this.list.shift())
      }
    }
    pool.mesh.position.set(x, 0.014 + this.list.indexOf(pool) * 0.0002, z)
    pool.mesh.rotation.y = rand(0, TAU)
    pool.target = target * rand(0.8, 1.3)
    pool.size = Math.max(0.25, pool.size * 0.6)
    pool.life = 1
    pool.growing = true
    pool.mesh.visible = true
    return pool
  }

  update(dt) {
    for (const p of this.list) {
      if (!p.mesh.visible) continue
      if (p.growing) {
        p.size += (p.target - p.size) * Math.min(1, dt * 1.5)
        if (Math.abs(p.target - p.size) < 0.02) p.growing = false
      } else {
        p.life -= dt * 0.012
        p.size += dt * 0.02
      }
      p.mesh.scale.set(p.size, 1, p.size)
      p.mesh.material.opacity = 1
    }
  }

  clear() {
    for (const p of this.list) p.mesh.visible = false
    this.list = []
  }
}

/* ------------------------------------------------------------------ */
/* Physical debris (severed limbs, weapons, skulls, guts)              */
/* ------------------------------------------------------------------ */

export class Debris {
  constructor(scene, blood, decals, pools) {
    this.scene = scene
    this.blood = blood
    this.decals = decals
    this.pools = pools
    this.items = []
    this.max = 54
    this.tmp = new THREE.Vector3()
  }

  add(object, vel, angVel, radius = 0.25, opts = {}) {
    object.updateWorldMatrix(true, true)
    if (object.parent !== this.scene) this.scene.attach(object)
    const item = {
      object,
      vx: vel.x, vy: vel.y, vz: vel.z,
      ax: angVel.x, ay: angVel.y, az: angVel.z,
      radius,
      restY: opts.restY ?? radius * 0.42,
      life: 0,
      settled: false,
      bleeds: opts.bleeds ?? 0,
      dripTimer: 0,
      bounce: opts.bounce ?? 0.28,
      friction: opts.friction ?? 0.88,
      onImpact: opts.onImpact || null,
      pool: false
    }
    this.items.push(item)
    if (this.items.length > this.max) {
      const old = this.items.shift()
      old.object.parent?.remove(old.object)
    }
    return item
  }

  update(dt) {
    for (const it of this.items) {
      if (it.settled) continue
      it.life += dt
      it.vy += GRAVITY * dt
      const o = it.object
      o.position.x += it.vx * dt
      o.position.y += it.vy * dt
      o.position.z += it.vz * dt
      o.rotation.x += it.ax * dt
      o.rotation.y += it.ay * dt
      o.rotation.z += it.az * dt

      // arena bounds
      const r = Math.hypot(o.position.x, o.position.z)
      const limit = 24.2
      if (r > limit) {
        const nx = o.position.x / r, nz = o.position.z / r
        o.position.x = nx * limit
        o.position.z = nz * limit
        it.vx *= -0.45
        it.vz *= -0.45
      }

      if (o.position.y < it.restY) {
        o.position.y = it.restY
        if (it.vy < -0.6) {
          const impact = Math.min(1, -it.vy / 8)
          if (it.bleeds) this.blood.burst(o.position, { count: Math.floor(4 + impact * 8), chaos: 1.5, size: 0.8, vy: 1 })
          if (!it.pool && it.bleeds && (impact > 0.22 || it.life > 1.2)) {
            this.pools.add(o.position.x, o.position.z, 0.5 + it.bleeds * 0.18)
            it.pool = true
          }
          if (impact > 0.5) sound.hitFlesh(0.35)
          it.vy = -it.vy * it.bounce
          it.ax *= 0.6; it.ay *= 0.7; it.az *= 0.6
          if (Math.abs(it.vy) < 0.6) it.vy = 0
        } else {
          it.vy = 0
        }
        it.vx *= Math.pow(it.friction, dt * 60)
        it.vz *= Math.pow(it.friction, dt * 60)
        it.ax *= Math.pow(0.2, dt)
        it.ay *= Math.pow(0.25, dt)
        it.az *= Math.pow(0.2, dt)
        if (Math.abs(it.vx) + Math.abs(it.vz) + Math.abs(it.ax) + Math.abs(it.az) < 0.02) {
          it.settled = true
          it.vx = it.vy = it.vz = 0
          it.ax = it.ay = it.az = 0
          if (it.bleeds && !it.pool) {
            this.pools.add(o.position.x, o.position.z, 0.6 + it.bleeds * 0.25)
            it.pool = true
          }
        }
      }

      // arterial drip while airborne
      if (it.bleeds > 0) {
        it.dripTimer -= dt
        if (it.dripTimer <= 0) {
          it.dripTimer = rand(0.03, 0.1)
          this.blood.spawn(o.position.x, o.position.y, o.position.z, {
            vy: rand(-0.4, 0.4), chaos: 0.5, size: 0.7, life: 1.2
          })
        }
      }
    }
  }

  clear() {
    for (const it of this.items) it.object.parent?.remove(it.object)
    this.items = []
  }
}

/* ------------------------------------------------------------------ */
/* High-level gore director                                            */
/* ------------------------------------------------------------------ */

export class Gore {
  constructor(scene, renderer, quality) {
    this.scene = scene
    this.low = quality === 'low'
    this.decals = new BloodDecals(scene, this.low ? 240 : 460)
    this.pools = new BloodPools(scene, 24)
    this.blood = new BloodParticles(scene, renderer, this.low ? 700 : 1400)
    this.debris = new Debris(scene, this.blood, this.decals, this.pools)
    this.fountains = []
    this.chunkGeoBox = new THREE.BoxGeometry(1, 1, 1)
    this.chunkGeoSph = new THREE.IcosahedronGeometry(1, 0)
    this.boneMat = new THREE.MeshStandardMaterial({ color: 0xd6c8ad, roughness: 0.8 })
    this.brainMat = new THREE.MeshStandardMaterial({ color: 0xb56a72, roughness: 0.7 })
    this.meatMat = new THREE.MeshStandardMaterial({ color: 0x8f1620, roughness: 0.9 })
    this.darkMeatMat = new THREE.MeshStandardMaterial({ color: 0x5c0a10, roughness: 0.95 })
    this.gutMat = new THREE.MeshStandardMaterial({ color: 0x7a2a2c, roughness: 0.85 })
    this.bloodMat = new THREE.MeshStandardMaterial({ color: 0x5e060c, roughness: 0.5 })
    this.onDecal = null
    this._v = new THREE.Vector3()
  }

  update(dt) {
    this.blood.update(dt, this.decals)
    this.debris.update(dt)
    this.decals.mesh.instanceMatrix.needsUpdate = true
    this.pools.update(dt)
    for (let i = this.fountains.length - 1; i >= 0; i--) {
      const f = this.fountains[i]
      f.life -= dt
      if (f.life <= 0) { this.fountains.splice(i, 1); continue }
      f.acc += dt
      const interval = f.heavy ? 0.012 : 0.03
      while (f.acc > interval) {
        f.acc -= interval
        const p = this.blood.spawn(f.pos.x + rand(-0.05, 0.05), f.pos.y, f.pos.z + rand(-0.05, 0.05), {
          chaos: 0.6, size: 0.9, life: 1.3, gravity: 0.9
        })
        const force = f.power * (1 - Math.pow(1 - f.life / f.duration, 2))
        p.vx += f.dir.x * force + rand(-0.7, 0.7)
        p.vy += f.dir.y * force + rand(0.2, 2.4)
        p.vz += f.dir.z * force + rand(-0.7, 0.7)
      }
    }
  }

  fountain(pos, dir = { x: 0, y: 1, z: 0 }, power = 3.4, duration = 2.2, heavy = false) {
    this.fountains.push({
      pos: { x: pos.x, y: pos.y, z: pos.z },
      dir, power, life: duration, duration, acc: 0, heavy
    })
    // initial spray
    this.blood.sprayCone(new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(dir.x, dir.y, dir.z), {
      count: heavy ? 34 : 20, speed: power, spread: 0.5, size: 1.1, life: 1.2
    })
  }

  impact(pos, dir, power = 1, kind = 'flesh') {
    this.blood.sprayCone(new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(dir.x, dir.y, dir.z), {
      count: Math.floor(10 + power * 14),
      speed: 2.5 + power * 2.4,
      spread: 0.55,
      size: 0.6 + power * 0.5,
      life: 0.9
    })
    if (chance(0.5 * power)) this.decals.add(pos.x + rand(-0.4, 0.4), pos.z + rand(-0.4, 0.4), rand(0.25, 0.7), rand(0, TAU))
    if (kind === 'flesh' && chance(0.4)) {
      const m = new THREE.Mesh(this.chunkGeoBox, this.darkMeatMat)
      m.scale.setScalar(rand(0.04, 0.1))
      m.position.set(pos.x, pos.y, pos.z)
      this.debris.add(m, { x: dir.x * 3 + rand(-1, 1), y: rand(1, 3), z: dir.z * 3 + rand(-1, 1) }, { x: rand(-9, 9), y: rand(-9, 9), z: rand(-9, 9) }, 0.05, { bleeds: 0 })
    }
  }

  bloodSpray(pos, dir, count = 24, speed = 4, size = 1) {
    this.blood.sprayCone(new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(dir.x, dir.y, dir.z), {
      count, speed, spread: 0.65, size, life: 1.1
    })
  }

  groundSplash(pos) {
    this.blood.burst(pos, { count: 26, chaos: 2.4, vy: 1.2, size: 1.2 })
    this.decals.add(pos.x, pos.z, rand(0.7, 1.5), rand(0, TAU))
    this.pools.add(pos.x, pos.z, rand(1.0, 1.9))
  }

  limbSever(pos, dir, limbObject, radius = 0.26, opts = {}) {
    const vel = new THREE.Vector3(dir.x * 2.6 + rand(-0.6, 0.6), rand(1.6, 3.4), dir.z * 2.6 + rand(-0.6, 0.6))
    const ang = new THREE.Vector3(rand(-7, 7), rand(-7, 7), rand(-7, 7))
    this.debris.add(limbObject, vel, ang, radius, { bleeds: 2.2, ...opts })
    this.bloodSpray(pos, { x: dir.x * 0.4, y: 1, z: dir.z * 0.4 }, 40, 5.5, 1.25)
    this.fountain(pos, { x: dir.x * 0.4, y: 1.1, z: dir.z * 0.4 }, 4.2, 2.4, true)
    this.decals.add(pos.x, pos.z, rand(0.9, 1.8), rand(0, TAU))
    if (chance(0.7)) this.pools.add(pos.x, pos.z, rand(0.7, 1.3))
  }

  headExplode(pos, dir) {
    sound.crush()
    this.blood.burst(pos, { count: 90, chaos: 5, vy: 2, size: 1.6, life: 1.5 })
    this.blood.sprayCone(pos, new THREE.Vector3(dir.x, 0.8, dir.z), { count: 40, speed: 7, spread: 0.9, size: 1.4 })
    // skull fragments
    for (let i = 0; i < 9; i++) {
      const m = new THREE.Mesh(this.chunkGeoBox, this.boneMat)
      m.scale.set(rand(0.05, 0.11), rand(0.03, 0.08), rand(0.04, 0.1))
      m.position.set(pos.x + rand(-0.1, 0.1), pos.y + rand(-0.08, 0.1), pos.z + rand(-0.1, 0.1))
      this.debris.add(m, {
        x: dir.x * rand(2, 6) + rand(-3, 3), y: rand(3, 7), z: dir.z * rand(2, 6) + rand(-3, 3)
      }, { x: rand(-16, 16), y: rand(-16, 16), z: rand(-16, 16) }, 0.07)
    }
    // brain & meat
    for (let i = 0; i < 7; i++) {
      const m = new THREE.Mesh(this.chunkGeoSph, i % 3 === 0 ? this.brainMat : this.meatMat)
      m.scale.setScalar(rand(0.045, 0.1))
      m.position.copy(pos)
      this.debris.add(m, {
        x: rand(-3.5, 3.5) + dir.x * 2, y: rand(2.5, 5.5), z: rand(-3.5, 3.5) + dir.z * 2
      }, { x: rand(-12, 12), y: rand(-12, 12), z: rand(-12, 12) }, 0.06, { bleeds: 0.5 })
    }
    // pool & splatter
    this.groundSplash(pos)
    this.decals.add(pos.x + rand(-1, 1), pos.z + rand(-1, 1), rand(1.4, 2.4), rand(0, TAU))
    this.fountain({ x: pos.x, y: pos.y - 0.1, z: pos.z }, { x: 0, y: 1.2, z: 0 }, 5, 3, true)
  }

  headDetach(pos, dir, headObject) {
    this.debris.add(headObject, new THREE.Vector3(dir.x * 2.6 + rand(-1, 1), rand(2, 4.2), dir.z * 2.6 + rand(-1, 1)), new THREE.Vector3(rand(-9, 9), rand(-9, 9), rand(-9, 9)), 0.19, { bleeds: 1.6, restY: 0.16 })
    this.bloodSpray(pos, { x: dir.x * 0.3, y: 1.2, z: dir.z * 0.3 }, 55, 6, 1.35)
    this.fountain(pos, { x: dir.x * 0.2, y: 1.3, z: dir.z * 0.2 }, 5.5, 2.8, true)
    this.groundSplash({ x: pos.x + dir.x, y: 0, z: pos.z + dir.z })
    this.decals.add(pos.x, pos.z, rand(1.2, 2.2), rand(0, TAU))
  }

  bisect(pos, dir, upper, lower) {
    sound.sever()
    const v = new THREE.Vector3(dir.x, 0.15, dir.z).normalize()
    this.debris.add(upper, {
      x: v.x * 2.4 + rand(-0.8, 0.8), y: rand(2.2, 4), z: v.z * 2.4 + rand(-0.8, 0.8)
    }, { x: rand(-5, 5), y: rand(-3, 3), z: rand(-9, 1) }, 0.34, { bleeds: 3, restY: 0.3 })
    this.debris.add(lower, {
      x: dir.x * 1.1 + rand(-0.5, 0.5), y: rand(0.4, 1.4), z: dir.z * 1.1 + rand(-0.5, 0.5)
    }, { x: rand(-3, 3), y: rand(-2, 2), z: -rand(3, 7) }, 0.32, { bleeds: 1.2, restY: 0.28 })
    this.blood.burst(pos, { count: 110, chaos: 4.5, vy: 1.5, size: 1.5, life: 1.4 })
    this.blood.sprayCone(pos, new THREE.Vector3(dir.x, 0.5, dir.z), { count: 40, speed: 5.5, spread: 0.9, size: 1.4 })
    this.fountain(pos, { x: 0, y: 1.4, z: 0 }, 5.2, 3.4, true)
    this.groundSplash(pos)
    this.decals.add(pos.x, pos.z, rand(1.6, 2.6), rand(0, TAU))
    this.spillGuts(pos, dir)
  }

  spillGuts(pos, dir) {
    for (let i = 0; i < 7; i++) {
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, rand(0.16, 0.5), 3, 6), this.gutMat)
      m.position.set(pos.x + rand(-0.15, 0.15), pos.y + rand(-0.3, 0.3), pos.z + rand(-0.15, 0.15))
      m.rotation.set(rand(0, TAU), rand(0, TAU), rand(0, TAU))
      this.debris.add(m, {
        x: dir.x * rand(0.5, 2.4) + rand(-1.5, 1.5),
        y: rand(0.5, 2.6),
        z: dir.z * rand(0.5, 2.4) + rand(-1.5, 1.5)
      }, { x: rand(-8, 8), y: rand(-8, 8), z: rand(-8, 8) }, 0.1, { bleeds: 0.3, bounce: 0.05 })
    }
    // pulsing organ clump
    const organ = new THREE.Mesh(this.chunkGeoSph, this.meatMat)
    organ.scale.set(0.13, 0.1, 0.15)
    organ.position.set(pos.x, pos.y, pos.z)
    this.debris.add(organ, { x: dir.x * 1.8, y: rand(1, 2), z: dir.z * 1.8 }, { x: rand(-6, 6), y: rand(-6, 6), z: rand(-6, 6) }, 0.12, { bleeds: 1 })
  }

  gib(pos, dir, type = 'meat') {
    const m = new THREE.Mesh(this.chunkGeoSph, type === 'bone' ? this.boneMat : this.meatMat)
    m.scale.setScalar(rand(0.04, 0.09))
    m.position.copy(pos)
    this.debris.add(m, {
      x: dir.x * rand(1.5, 5) + rand(-2, 2), y: rand(1.5, 5), z: dir.z * rand(1.5, 5) + rand(-2, 2)
    }, { x: rand(-18, 18), y: rand(-18, 18), z: rand(-18, 18) }, 0.05, { bleeds: 0.4 })
  }

  clear() {
    this.blood.clear()
    this.decals.clear()
    this.pools.clear()
    this.debris.clear()
    this.fountains = []
  }
}
