import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  TAU, clamp, rand, randInt, chance, makeMat, makeMesh,
  sandTexture, stoneTexture, bannerTexture, flameTexture, emblemTexture, softDropTexture
} from './utils.js'

export const ARENA_RADIUS = 23.5

function skyMaterial() {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color(0x05060c) },
      mid: { value: new THREE.Color(0x1b0a12) },
      horizon: { value: new THREE.Color(0x4a1014) },
      bottom: { value: new THREE.Color(0x090405) }
    },
    vertexShader: /* glsl */`
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 top; uniform vec3 mid; uniform vec3 horizon; uniform vec3 bottom;
      varying vec3 vWorld;
      void main() {
        float h = normalize(vWorld).y;
        vec3 c = mix(horizon, mid, smoothstep(-0.02, 0.18, h));
        c = mix(c, top, smoothstep(0.14, 0.65, h));
        c = mix(bottom, c, smoothstep(-0.35, -0.01, h));
        float glow = exp(-abs(h) * 9.0);
        c += vec3(0.16, 0.025, 0.02) * glow;
        gl_FragColor = vec4(c, 1.0);
      }
    `
  })
}

export class Arena {
  constructor(scene, renderer, lowQuality = false) {
    this.scene = scene
    this.renderer = renderer
    this.low = lowQuality
    this.time = 0
    this.crowdEnergy = 0
    this.embers = []
    this.flames = []
    this.banners = []
    this.spawnPoints = []
    this.crowd = null
    this.crowdHeads = null
    this.crowdBase = []
    this._tmpM = new THREE.Matrix4()
    this._tmpQ = new THREE.Quaternion()
    this._tmpE = new THREE.Euler()
    this._tmpV = new THREE.Vector3()
    this._tmpS = new THREE.Vector3()

    this.buildSky()
    this.buildFloor()
    this.buildStands()
    this.buildCrowd()
    this.buildPillars()
    this.buildGates()
    this.buildProps()
    this.buildLights()
    this.buildDust()
    this.batchStatic()
  }

  /** Collapse the many static arena props into one draw call per material. */
  batchStatic() {
    const preserve = new Set(this.banners.map((b) => b.mesh))
    const groups = new Map()
    this.scene.updateMatrixWorld(true)
    this.scene.traverse((o) => {
      if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || preserve.has(o)) return
      if (Array.isArray(o.material)) return
      if (!o.geometry?.isBufferGeometry) return
      const key = o.material.uuid
      if (!groups.has(key)) groups.set(key, { material: o.material, items: [] })
      groups.get(key).items.push(o)
    })

    for (const { material, items } of groups.values()) {
      if (items.length < 2) continue
      const sig = Object.keys(items[0].geometry.attributes).sort().join(',')
      if (items.some((m) => Object.keys(m.geometry.attributes).sort().join(',') !== sig)) continue
      const pieces = []
      for (const m of items) {
        const g = m.geometry.clone()
        g.applyMatrix4(m.matrixWorld)
        pieces.push(g)
      }
      const merged = mergeGeometries(pieces, false)
      for (const g of pieces) g.dispose()
      if (!merged) continue
      const mesh = new THREE.Mesh(merged, material)
      mesh.castShadow = !this.low && items.some((m) => m.castShadow)
      mesh.receiveShadow = items.some((m) => m.receiveShadow)
      this.scene.add(mesh)
      for (const m of items) m.parent?.remove(m)
    }

    // Drop group shells left behind by the merged props.
    const empty = []
    this.scene.traverse((o) => {
      if (o.isGroup && o.children.length === 0) empty.push(o)
    })
    for (const g of empty) g.parent?.remove(g)
  }

  buildSky() {
    const sky = new THREE.Mesh(new THREE.SphereGeometry(220, 32, 20), skyMaterial())
    sky.frustumCulled = false
    this.scene.add(sky)

    // moon
    const moonCanvas = document.createElement('canvas')
    moonCanvas.width = moonCanvas.height = 128
    const mc = moonCanvas.getContext('2d')
    const mg = mc.createRadialGradient(64, 64, 18, 64, 64, 64)
    mg.addColorStop(0, 'rgba(240,232,215,0.95)')
    mg.addColorStop(0.55, 'rgba(210,196,175,0.5)')
    mg.addColorStop(1, 'rgba(120,80,70,0)')
    mc.fillStyle = mg
    mc.fillRect(0, 0, 128, 128)
    const moonTex = new THREE.CanvasTexture(moonCanvas)
    moonTex.colorSpace = THREE.SRGBColorSpace
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({
      map: moonTex, transparent: true, depthWrite: false, fog: false, color: 0xffe9cf
    }))
    moon.position.set(-105, 75, -150)
    moon.scale.set(48, 48, 1)
    this.scene.add(moon)

    // stars
    const count = 500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU)
      const y = rand(0.08, 1)
      const r = Math.sqrt(1 - y * y)
      positions[i * 3] = Math.cos(a) * r * 195
      positions[i * 3 + 1] = y * 195
      positions[i * 3 + 2] = Math.sin(a) * r * 195
      const w = rand(0.55, 1)
      colors[i * 3] = w
      colors[i * 3 + 1] = w * rand(0.85, 0.98)
      colors[i * 3 + 2] = w * rand(0.8, 1)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const stars = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.9, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.85,
      depthWrite: false, fog: false
    }))
    this.scene.add(stars)
  }

  buildFloor() {
    const sand = sandTexture(this.renderer)
    const floorMat = new THREE.MeshStandardMaterial({
      map: sand, color: 0xb8a889, roughness: 0.97, metalness: 0
    })
    const floor = new THREE.Mesh(new THREE.CircleGeometry(ARENA_RADIUS + 1.4, 96), floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    this.scene.add(floor)
    this.floor = floor

    // packed earth ring around the wall
    const outer = new THREE.Mesh(
      new THREE.RingGeometry(ARENA_RADIUS + 1.2, 29.5, 80),
      new THREE.MeshStandardMaterial({ color: 0x2f241a, roughness: 1 })
    )
    outer.rotation.x = -Math.PI / 2
    outer.position.y = -0.02
    outer.receiveShadow = true
    this.scene.add(outer)

    // dark old stains baked into the sand near the edges
    const stainMat = new THREE.MeshBasicMaterial({
      map: sandTexture(this.renderer), color: 0x3a1a12, transparent: true, opacity: 0.3,
      depthWrite: false
    })
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(new THREE.CircleGeometry(rand(1.2, 3.4), 18), stainMat)
      const a = rand(0, TAU), r = rand(6, ARENA_RADIUS - 2)
      m.rotation.x = -Math.PI / 2
      m.rotation.z = rand(0, TAU)
      m.position.set(Math.cos(a) * r, 0.005 + i * 0.0002, Math.sin(a) * r)
      this.scene.add(m)
    }

    // center ring mark
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(6.4, 6.65, 64),
      new THREE.MeshStandardMaterial({ color: 0x3d2c1d, roughness: 0.95, transparent: true, opacity: 0.65 })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.008
    this.scene.add(ring)

    // faint center emblem
    const em = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 32),
      new THREE.MeshStandardMaterial({ map: emblemTexture(), transparent: true, opacity: 0.18, color: 0x2a1a10, roughness: 1, depthWrite: false })
    )
    em.rotation.x = -Math.PI / 2
    em.position.y = 0.009
    this.scene.add(em)
  }

  buildStands() {
    const stone = stoneTexture(this.renderer)
    const stoneMat = new THREE.MeshStandardMaterial({ map: stone, color: 0x8a7d70, roughness: 1 })
    const darkStone = new THREE.MeshStandardMaterial({ map: stone, color: 0x3e3631, roughness: 1 })

    // inner wall ring
    const segs = 44
    const wallGeo = new THREE.BoxGeometry(3.9, 1.75, 1.15)
    const walls = new THREE.InstancedMesh(wallGeo, stoneMat, segs)
    walls.castShadow = !this.low
    walls.receiveShadow = true
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const p = new THREE.Vector3()
    const s = new THREE.Vector3(1, 1, 1)
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * TAU
      p.set(Math.cos(a) * (ARENA_RADIUS + 1.2), 0.87, Math.sin(a) * (ARENA_RADIUS + 1.2))
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -a + Math.PI / 2)
      m.compose(p, q, s)
      walls.setMatrixAt(i, m)
    }
    this.scene.add(walls)

    // wall cap
    const cap = new THREE.Mesh(
      new THREE.TorusGeometry(ARENA_RADIUS + 1.2, 0.22, 6, 96),
      darkStone
    )
    cap.rotation.x = Math.PI / 2
    cap.position.y = 1.78
    this.scene.add(cap)

    // tiered stands
    const tiers = [
      { r0: 25.4, r1: 28.6, y: 1.6 },
      { r0: 28.2, r1: 31.6, y: 3.0 },
      { r0: 31.2, r1: 35.0, y: 4.4 }
    ]
    for (const t of tiers) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(t.r0, t.r1, 80, 1), stoneMat)
      ring.rotation.x = -Math.PI / 2
      ring.position.y = t.y
      ring.receiveShadow = true
      this.scene.add(ring)
      const riser = new THREE.Mesh(
        new THREE.CylinderGeometry(t.r1, t.r1, 1.5, 80, 1, true),
        darkStone
      )
      riser.position.y = t.y - 0.75
      riser.material.side = THREE.DoubleSide
      this.scene.add(riser)
    }

    // outer wall
    const outerWall = new THREE.Mesh(
      new THREE.CylinderGeometry(37.5, 37.5, 16, 64, 1, true),
      darkStone
    )
    outerWall.position.y = 7
    outerWall.material.side = THREE.BackSide
    this.scene.add(outerWall)

    // decorative arches / alcoves silhouetted against the stands
    const archMat = new THREE.MeshStandardMaterial({ color: 0x120c0b, roughness: 1 })
    const archGeo = new THREE.BoxGeometry(2.4, 3.4, 0.4)
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * TAU + 0.05
      const arch = new THREE.Mesh(archGeo, archMat)
      arch.position.set(Math.cos(a) * 30, 4.4, Math.sin(a) * 30)
      arch.rotation.y = -a
      this.scene.add(arch)
    }
  }

  buildCrowd() {
    const count = this.low ? 150 : 330
    const bodyGeo = new THREE.CylinderGeometry(0.19, 0.26, 0.78, 5)
    const headGeo = new THREE.SphereGeometry(0.15, 6, 5)
    const mats = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, vertexColors: false })
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
    const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, count)
    const heads = new THREE.InstancedMesh(headGeo, headMat, count)
    bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    heads.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const palette = [
      0x2b1914, 0x3a2318, 0x1c1512, 0x44251a, 0x2a2220, 0x33201c, 0x4a2a1c,
      0x241a16, 0x3d2a20, 0x2d2024, 0x51301e, 0x36241b
    ]
    const skin = [0x9a6b4e, 0x7c5138, 0xb08060, 0x6a4430, 0x8a5d42]
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const tier = randInt(0, 2)
      const rad = [26.4, 29.6, 32.8][tier] + rand(-0.8, 0.8)
      const y = [1.66, 3.06, 4.46][tier] + 0.42
      const a = rand(0, TAU)
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad
      bodies.setColorAt(i, c.setHex(palette[randInt(0, palette.length - 1)]))
      heads.setColorAt(i, c.setHex(skin[randInt(0, skin.length - 1)]))
      this.crowdBase.push({ x, y, z, a, phase: rand(0, TAU), speed: rand(0.7, 1.6), scale: rand(0.85, 1.15) })
    }
    this.crowd = bodies
    this.crowdHeads = heads
    bodies.instanceColor.needsUpdate = true
    heads.instanceColor.needsUpdate = true
    bodies.frustumCulled = false
    heads.frustumCulled = false
    this.scene.add(bodies, heads)
    this.updateCrowd(0)
  }

  updateCrowd(t) {
    if (!this.crowd) return
    const m = this._tmpM
    const q = this._tmpQ
    const e = this._tmpE
    const p = this._tmpV
    const s = this._tmpS
    const energy = this.crowdEnergy
    for (let i = 0; i < this.crowdBase.length; i++) {
      const b = this.crowdBase[i]
      const bob = Math.sin(t * b.speed + b.phase) * (0.025 + energy * 0.11)
      const sway = Math.sin(t * 0.7 + b.phase * 2) * (0.02 + energy * 0.08)
      e.set(0, -b.a + Math.PI / 2 + sway, 0)
      q.setFromEuler(e)
      p.set(b.x, b.y + bob, b.z)
      s.set(b.scale, b.scale, b.scale)
      m.compose(p, q, s)
      this.crowd.setMatrixAt(i, m)
      p.y = b.y + 0.55 * b.scale + bob
      m.compose(p, q, s)
      this.crowdHeads.setMatrixAt(i, m)
    }
    this.crowd.instanceMatrix.needsUpdate = true
    this.crowdHeads.instanceMatrix.needsUpdate = true
  }

  buildPillars() {
    const stone = stoneTexture(this.renderer)
    const mat = new THREE.MeshStandardMaterial({ map: stone, color: 0x6b6058, roughness: 1 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x1d1714, roughness: 1 })
    const flameTex = flameTexture()
    const torchPositions = []

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + 0.31
      const r = ARENA_RADIUS + 2.3
      const x = Math.cos(a) * r, z = Math.sin(a) * r
      const g = new THREE.Group()
      g.position.set(x, 0, z)
      const base = makeMesh(new THREE.CylinderGeometry(0.62, 0.78, 0.5, 10), dark, [0, 0.25, 0])
      const shaft = makeMesh(new THREE.CylinderGeometry(0.36, 0.46, 5.4, 10), mat, [0, 3.05, 0])
      shaft.castShadow = !this.low
      const cap = makeMesh(new THREE.CylinderGeometry(0.55, 0.42, 0.35, 10), dark, [0, 5.9, 0])
      g.add(base, shaft, cap)
      // brazier
      const bowl = makeMesh(new THREE.CylinderGeometry(0.62, 0.36, 0.42, 10), dark, [0, 6.25, 0])
      g.add(bowl)
      // emblem on shaft
      const em = new THREE.Mesh(
        new THREE.CircleGeometry(0.28, 16),
        new THREE.MeshStandardMaterial({ map: emblemTexture(), transparent: true, color: 0xb09a72, roughness: 1, opacity: 0.8 })
      )
      em.position.set(0, 3.4, 0.47)
      g.add(em)
      this.scene.add(g)

      // flame
      const flame = new THREE.Sprite(new THREE.SpriteMaterial({
        map: flameTex, color: 0xffb05a, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, opacity: 0.95, fog: false
      }))
      flame.position.set(0, 6.9, 0)
      flame.scale.set(1.5, 2.2, 1)
      g.add(flame)
      this.flames.push({ sprite: flame, phase: rand(0, TAU), base: 1, torch: g })

      if (i % 3 === 0) {
        const light = new THREE.PointLight(0xff8438, 52, 21, 2)
        light.position.set(0, 6.7, 0)
        g.add(light)
        torchPositions.push({ light, phase: rand(0, TAU) })
      }
      this.embers.push({ ...this.emberData(x, z, 6.8) })
    }
    this.torchLights = torchPositions

    // embers (points)
    const count = 90
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    this.emberSeeds = []
    for (let i = 0; i < count; i++) {
      const s = this.embers[i % this.embers.length]
      pos[i * 3] = s.x; pos[i * 3 + 1] = s.y; pos[i * 3 + 2] = s.z
      col[i * 3] = 1; col[i * 3 + 1] = rand(0.35, 0.65); col[i * 3 + 2] = 0.12
      this.emberSeeds.push({ ...s, speed: rand(0.4, 1.4), phase: rand(0, TAU), amp: rand(0.2, 0.9) })
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pmat = new THREE.PointsMaterial({
      size: 0.09, vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
    })
    this.emberPoints = new THREE.Points(geo, pmat)
    this.emberPoints.frustumCulled = false
    this.scene.add(this.emberPoints)
  }

  emberData(x, z, y) {
    return { x: x + rand(-0.15, 0.15), y, z: z + rand(-0.15, 0.15) }
  }

  buildGates() {
    const dark = new THREE.MeshStandardMaterial({ color: 0x16100e, roughness: 0.95 })
    const iron = new THREE.MeshStandardMaterial({ color: 0x3d3a37, roughness: 0.55, metalness: 0.7 })
    const stone = new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: 1 })

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU + Math.PI / 4
      const r = ARENA_RADIUS + 0.4
      const x = Math.cos(a) * r, z = Math.sin(a) * r
      const g = new THREE.Group()
      g.position.set(x, 0, z)
      g.lookAt(0, 0, 0)
      // gate opening (dark)
      const hole = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 3.5), dark)
      hole.position.set(0, 1.78, -0.62)
      g.add(hole)
      // arch
      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.3, 6, 16, Math.PI), stone)
      arch.position.set(0, 3.45, -0.7)
      g.add(arch)
      // posts
      for (const sx of [-1, 1]) {
        const post = makeMesh(new THREE.CylinderGeometry(0.3, 0.36, 3.5, 6), stone, [sx * 1.5, 1.75, -0.7])
        g.add(post)
      }
      // portcullis bars
      const bars = new THREE.Group()
      for (let b = -2; b <= 2; b++) {
        const bar = makeMesh(new THREE.CylinderGeometry(0.045, 0.045, 3.1, 5), iron, [b * 0.52, 1.6, -0.35])
        bars.add(bar)
      }
      for (let b = 0; b < 4; b++) {
        const bar = makeMesh(new THREE.BoxGeometry(2.5, 0.07, 0.07), iron, [0, 0.55 + b * 0.72, -0.35])
        bars.add(bar)
      }
      g.add(bars)
      this.scene.add(g)

      // spawn just inside the gate
      const sr = ARENA_RADIUS - 1.2
      this.spawnPoints.push(new THREE.Vector3(Math.cos(a) * sr, 0, Math.sin(a) * sr))

      // gate torches
      for (const sx of [-1, 1]) {
        const pole = makeMesh(new THREE.CylinderGeometry(0.05, 0.05, 1.4, 5), iron, [sx * 1.9, 2.0, -0.4])
        g.add(pole)
        const flame = new THREE.Sprite(new THREE.SpriteMaterial({
          map: flameTexture(), color: 0xff8a3a, transparent: true, blending: THREE.AdditiveBlending,
          depthWrite: false, fog: false
        }))
        flame.position.set(sx * 1.9, 2.85, -0.4)
        flame.scale.set(0.65, 1.0, 1)
        g.add(flame)
        this.flames.push({ sprite: flame, phase: rand(0, TAU), base: 0.65 })
      }
    }
  }

  buildProps() {
    const bone = new THREE.MeshStandardMaterial({ color: 0xcfc2a8, roughness: 0.85 })
    const darkBone = new THREE.MeshStandardMaterial({ color: 0x9c8f78, roughness: 0.9 })
    const iron = new THREE.MeshStandardMaterial({ color: 0x2f2c29, roughness: 0.5, metalness: 0.6 })

    // skulls on spikes around the wall
    for (let i = 0; i < 14; i++) {
      const a = rand(0, TAU)
      const r = ARENA_RADIUS + 0.1
      const g = new THREE.Group()
      g.position.set(Math.cos(a) * r, 0, Math.sin(a) * r)
      const spike = makeMesh(new THREE.CylinderGeometry(0.035, 0.07, 1.2, 5), iron, [0, 1.55, 0])
      const skull = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), bone)
      skull.scale.set(1, 0.95, 1.15)
      skull.position.y = 2.1
      skull.castShadow = !this.low
      const jaw = makeMesh(new THREE.BoxGeometry(0.18, 0.09, 0.2), darkBone, [0, 1.97, 0.06])
      g.add(spike, skull, jaw)
      this.scene.add(g)
    }

    // scattered bones near the edges
    for (let i = 0; i < 26; i++) {
      const a = rand(0, TAU), r = rand(ARENA_RADIUS - 4.5, ARENA_RADIUS - 0.4)
      const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, rand(0.16, 0.4), 3, 5), chance(0.5) ? bone : darkBone)
      b.position.set(Math.cos(a) * r, 0.05, Math.sin(a) * r)
      b.rotation.set(Math.PI / 2 + rand(-0.3, 0.3), rand(0, TAU), rand(-0.3, 0.3))
      b.receiveShadow = true
      this.scene.add(b)
    }

    // banners between pillars
    const btex = bannerTexture()
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + 0.6
      const r = ARENA_RADIUS + 1.05
      const banner = new THREE.Mesh(
        new THREE.PlaneGeometry(1.7, 3.7, 1, 4),
        new THREE.MeshStandardMaterial({ map: btex, side: THREE.DoubleSide, roughness: 0.95, color: 0xb08a7a })
      )
      banner.position.set(Math.cos(a) * r, 4.2, Math.sin(a) * r)
      banner.rotation.y = -a + Math.PI / 2
      this.scene.add(banner)
      this.banners.push({ mesh: banner, phase: rand(0, TAU), baseRot: banner.rotation.y })
    }

    // torches on wall
    const flameTex = flameTexture()
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + 0.14
      const r = ARENA_RADIUS + 0.35
      const g = new THREE.Group()
      g.position.set(Math.cos(a) * r, 2.1, Math.sin(a) * r)
      g.rotation.y = -a + Math.PI
      const bracket = makeMesh(new THREE.BoxGeometry(0.08, 0.08, 0.55), iron, [0, 0, 0.25])
      const cup = makeMesh(new THREE.CylinderGeometry(0.16, 0.1, 0.22, 8), iron, [0, 0.08, 0.5])
      const fl = new THREE.Sprite(new THREE.SpriteMaterial({
        map: flameTex, color: 0xff8f42, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, fog: false
      }))
      fl.position.set(0, 0.5, 0.5)
      fl.scale.set(0.8, 1.25, 1)
      g.add(bracket, cup, fl)
      this.scene.add(g)
      this.flames.push({ sprite: fl, phase: rand(0, TAU), base: 0.8 })
    }
  }

  buildLights() {
    const hemi = new THREE.HemisphereLight(0x93a0c0, 0x3d2c1e, 1.9)
    this.scene.add(hemi)

    const moon = new THREE.DirectionalLight(0xb8c7e6, 4.0)
    moon.position.set(-22, 32, -18)
    moon.castShadow = !this.low
    if (!this.low) {
      moon.shadow.mapSize.set(2048, 2048)
      moon.shadow.camera.left = -30
      moon.shadow.camera.right = 30
      moon.shadow.camera.top = 30
      moon.shadow.camera.bottom = -30
      moon.shadow.camera.near = 1
      moon.shadow.camera.far = 90
      moon.shadow.bias = -0.0006
      moon.shadow.normalBias = 0.02
    }
    this.scene.add(moon)
    this.moon = moon

    const fill = new THREE.DirectionalLight(0xc47a52, 1.05)
    fill.position.set(20, 9, 26)
    this.scene.add(fill)

    // gentle front fill so the fighters read against the stands
    const front = new THREE.DirectionalLight(0xa8bcd8, 1.35)
    front.position.set(14, 16, 34)
    this.scene.add(front)

    // central warm light from braziers (cheap ambient boost)
    const center = new THREE.PointLight(0xff7c3a, 46, 44, 2)
    center.position.set(0, 10, 0)
    this.scene.add(center)
    this.centerLight = center
  }

  buildDust() {
    const count = this.low ? 90 : 220
    const pos = new Float32Array(count * 3)
    this.dustSeeds = []
    for (let i = 0; i < count; i++) {
      const a = rand(0, TAU), r = rand(0, ARENA_RADIUS - 1)
      const p = { x: Math.cos(a) * r, y: rand(0.2, 5.5), z: Math.sin(a) * r, phase: rand(0, TAU), speed: rand(0.1, 0.4) }
      this.dustSeeds.push(p)
      pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.dust = new THREE.Points(geo, new THREE.PointsMaterial({
      size: 0.045, color: 0xd8c2a0, transparent: true, opacity: 0.28,
      depthWrite: false, sizeAttenuation: true
    }))
    this.dust.frustumCulled = false
    this.scene.add(this.dust)
  }

  excite(amount = 1) {
    this.crowdEnergy = clamp(this.crowdEnergy + amount * 0.35, 0, 1)
    this.crowdEnergyTimer = 2.2
  }

  update(dt, t) {
    this.time = t
    // flames
    for (const f of this.flames) {
      const n = Math.sin(t * 13 + f.phase) * 0.5 + Math.sin(t * 23 + f.phase * 2) * 0.3
      const s = 0.85 + n * 0.22
      f.sprite.scale.set(f.base * s, f.base * 1.55 * (1 + n * 0.16), 1)
      f.sprite.material.opacity = 0.78 + n * 0.18
    }
    // torch light flicker
    for (const l of this.torchLights) {
      l.light.intensity = 46 + Math.sin(t * 9 + l.phase) * 8 + Math.sin(t * 17 + l.phase * 3) * 4
    }
    if (this.centerLight) this.centerLight.intensity = 44 + Math.sin(t * 5.1) * 4

    // banners sway
    for (const b of this.banners) {
      b.mesh.rotation.y = b.baseRot + Math.sin(t * 0.9 + b.phase) * 0.06
      b.mesh.rotation.x = Math.sin(t * 1.3 + b.phase) * 0.02
    }

    // crowd
    this.crowdEnergy = Math.max(0, this.crowdEnergy - dt * 0.22)
    this.updateCrowd(t)

    // embers
    if (this.emberPoints) {
      const attr = this.emberPoints.geometry.attributes.position
      for (let i = 0; i < this.emberSeeds.length; i++) {
        const e = this.emberSeeds[i]
        const yy = 6.8 + ((t * e.speed + e.phase) % 3.4)
        attr.array[i * 3] = e.x + Math.sin(t * e.speed * 2 + e.phase) * e.amp * 0.5
        attr.array[i * 3 + 1] = yy
        attr.array[i * 3 + 2] = e.z + Math.cos(t * e.speed * 1.7 + e.phase) * e.amp * 0.5
      }
      attr.needsUpdate = true
    }

    // dust
    if (this.dust) {
      const attr = this.dust.geometry.attributes.position
      for (let i = 0; i < this.dustSeeds.length; i++) {
        const p = this.dustSeeds[i]
        attr.array[i * 3] = p.x + Math.sin(t * p.speed + p.phase) * 1.4
        attr.array[i * 3 + 1] = p.y + Math.sin(t * p.speed * 0.7 + p.phase) * 0.7
        attr.array[i * 3 + 2] = p.z + Math.cos(t * p.speed + p.phase) * 1.4
      }
      attr.needsUpdate = true
    }
  }
}
