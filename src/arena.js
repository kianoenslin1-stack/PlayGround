import * as THREE from 'three'
import { rand, pick, clamp, seededRandom } from './utils.js'
import {
  createStoneTexture, createSandTexture, createBasaltTexture, createLavaGlowTexture,
  createBannerTexture, createGlowTexture, createRuneTexture, createDustTexture, createCrackTexture
} from './textures.js'

export const ARENAS = [
  {
    name: 'THE GILDED PIT', sub: 'SURVIVE THE CROWD’S HUNGER',
    skyTop: 0x07090f, skyBottom: 0x3a1e11, fog: 0x2a1c11, fogDensity: .018,
    moon: 0xffe3b0, ambient: 0x687385, sun: 0xb7c8e4, ground: 'sand',
    torch: 0xff8a3c, crowd: 0x3a2017, banner: 0
  },
  {
    name: 'THE ASHEN GALLOWS', sub: 'NOTHING HERE DIES CLEAN',
    skyTop: 0x05090a, skyBottom: 0x1b2926, fog: 0x15201d, fogDensity: .026,
    moon: 0xc3e1d2, ambient: 0x4d6663, sun: 0x9ac4ba, ground: 'stone',
    torch: 0x74e0bd, crowd: 0x171f1d, banner: 1
  },
  {
    name: 'THE CRIMSON KEEP', sub: 'THE MOUNTAIN IS AWAKE',
    skyTop: 0x080304, skyBottom: 0x3a0906, fog: 0x2b0b07, fogDensity: .023,
    moon: 0xff6b45, ambient: 0x6b362a, sun: 0xdb8b6d, ground: 'basalt',
    torch: 0xff4c22, crowd: 0x24100d, banner: 2
  }
]

export function createEnvironmentMap(renderer) {
  const envScene = new THREE.Scene()
  const geo = new THREE.SphereGeometry(30, 24, 16)
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      top: { value: new THREE.Color(0x192535) },
      mid: { value: new THREE.Color(0x6f4a2d) },
      bottom: { value: new THREE.Color(0x160d08) }
    },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying vec3 vP;
      void main(){ float h = normalize(vP).y * .5 + .5; vec3 c = mix(bottom, mid, smoothstep(.12,.52,h)); c = mix(c, top, smoothstep(.46,.96,h)); gl_FragColor = vec4(c, 1.); }`
  })
  envScene.add(new THREE.Mesh(geo, mat))
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffb76c })
  const glow1 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 8), glowMat)
  glow1.position.set(10, 2, -8); envScene.add(glow1)
  const glow2 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0x527ca6 }))
  glow2.position.set(-9, 12, 4); envScene.add(glow2)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const tex = pmrem.fromScene(envScene, .06).texture
  pmrem.dispose()
  geo.dispose(); mat.dispose(); glowMat.dispose(); glow1.geometry.dispose()
  return tex
}

function skyMaterial(theme) {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(theme.skyTop) },
      bottomColor: { value: new THREE.Color(theme.skyBottom) },
      moonColor: { value: new THREE.Color(theme.moon) },
      moonPos: { value: new THREE.Vector3(.48, .24, -.83).normalize() },
      time: { value: 0 }
    },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec3 vDir; uniform vec3 topColor; uniform vec3 bottomColor; uniform vec3 moonColor; uniform vec3 moonPos; uniform float time;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
      void main(){
        float h = clamp(vDir.y * .5 + .5, 0., 1.);
        vec3 col = mix(bottomColor, topColor, smoothstep(.22, .84, h));
        float md = max(0., dot(normalize(vDir), normalize(moonPos)));
        col += moonColor * pow(md, 220.) * 1.7;
        col += moonColor * pow(md, 18.) * .12;
        float cloud = 0.;
        vec2 uv = vDir.xz / max(.1, vDir.y + .45) * .55;
        for(int i=0;i<4;i++){ float n = noise(uv * (1.8 + float(i)*1.2) + vec2(time*.003, time*.001)); cloud += (n-.5) * (0.22 / (1. + float(i))); }
        col += moonColor * smoothstep(.08, .4, cloud) * smoothstep(.05, .35, h) * .07;
        float star = step(.9975, hash(floor(vDir.xz * 700. + vDir.y * 120.)));
        col += vec3(star) * smoothstep(.42, .85, h) * (1. - cloud) * .9;
        gl_FragColor = vec4(col, 1.);
      }`
  })
}

export class Arena {
  constructor(scene, renderer) {
    this.scene = scene
    this.renderer = renderer
    this.group = null
    this.themeIndex = 0
    this.flames = []
    this.banners = []
    this.crowd = []
    this.hazards = []
    this.lights = []
    this.sky = null
    this.moon = null
    this.stars = null
    this.dust = null
    this.emberStream = null
    this.time = 0
    this.radius = 21.5
    this.crowdExcitement = 0
    this.arenaMoonDir = new THREE.Vector3(.48, .24, -.83).normalize()
  }

  build(themeIndex = 0, quality = 'auto') {
    this.themeIndex = themeIndex % ARENAS.length
    const theme = ARENAS[this.themeIndex]
    if (this.group) {
      this.scene.remove(this.group)
      this.disposeGroup(this.group)
    }
    this.group = new THREE.Group()
    this.group.name = 'arena'
    this.scene.add(this.group)
    this.flames = []
    this.banners = []
    this.crowd = []
    this.hazards = []
    this.lights = []
    this.quality = quality

    this.scene.fog = new THREE.FogExp2(theme.fog, theme.fogDensity)
    this.scene.background = new THREE.Color(theme.skyTop)
    this.buildSky(theme)
    this.buildLights(theme)
    this.buildGround(theme)
    this.buildWalls(theme)
    this.buildCrowd(theme)
    this.buildProps(theme)
    this.buildHazards(theme)
    this.buildAtmosphere(theme)
  }

  buildSky(theme) {
    if (this.sky) { this.scene.remove(this.sky); this.sky.material.dispose(); this.sky.geometry.dispose() }
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(170, 32, 20), skyMaterial(theme))
    this.sky.frustumCulled = false
    this.scene.add(this.sky)
    if (this.stars) { this.scene.remove(this.stars); this.stars.geometry.dispose(); this.stars.material.dispose() }
    const starGeo = new THREE.BufferGeometry()
    const positions = []
    for (let i = 0; i < 900; i++) {
      const v = new THREE.Vector3(rand(-1, 1), rand(.05, 1), rand(-1, 1)).normalize().multiplyScalar(140)
      positions.push(v.x, v.y, v.z)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xcfd7d8, size: .22, transparent: true, opacity: .52, depthWrite: false, sizeAttenuation: true }))
    this.scene.add(this.stars)
    if (this.moon) { this.scene.remove(this.moon); this.moon.material.map?.dispose(); this.moon.material.dispose() }
    const moonMat = new THREE.SpriteMaterial({ map: createGlowTexture(256), color: theme.moon, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .9 })
    this.moon = new THREE.Sprite(moonMat)
    this.moon.position.copy(this.arenaMoonDir).multiplyScalar(120)
    this.moon.scale.setScalar(28)
    this.scene.add(this.moon)
  }

  buildLights(theme) {
    const hemi = new THREE.HemisphereLight(theme.ambient, 0x120c08, 1.9)
    this.group.add(hemi); this.lights.push(hemi)
    const sun = new THREE.DirectionalLight(theme.sun, 3.0)
    sun.position.set(-24, 38, -26)
    sun.castShadow = true
    sun.shadow.mapSize.set(this.quality === 'low' ? 1024 : 2048, this.quality === 'low' ? 1024 : 2048)
    sun.shadow.camera.near = 5
    sun.shadow.camera.far = 80
    sun.shadow.camera.left = -27
    sun.shadow.camera.right = 27
    sun.shadow.camera.top = 27
    sun.shadow.camera.bottom = -27
    sun.shadow.bias = -.0008
    sun.shadow.normalBias = .025
    this.group.add(sun); this.lights.push(sun)
    this.sun = sun
    const fill = new THREE.DirectionalLight(theme.torch, .65)
    fill.position.set(-10, 8, 22)
    this.group.add(fill); this.lights.push(fill)
    const key = new THREE.DirectionalLight(0xffd3a2, 1.15)
    key.position.set(14, 11, 18)
    this.group.add(key); this.lights.push(key)
    const center = new THREE.PointLight(theme.torch, 1.8, 23, 2)
    center.position.set(0, 7, -7)
    this.group.add(center); this.lights.push(center)
    this.centerLight = center
  }

  buildGround(theme) {
    let map, bump, emissiveMap = null, roughness = .96
    if (theme.ground === 'sand') { map = createSandTexture(512); map.repeat.set(4.5, 4.5); bump = map; }
    else if (theme.ground === 'basalt') { map = createBasaltTexture(512); map.repeat.set(3.4, 3.4); bump = map; emissiveMap = createLavaGlowTexture(512); emissiveMap.repeat.set(3.4, 3.4); roughness = .82 }
    else { map = createStoneTexture(1, 512); map.repeat.set(4, 4); bump = createCrackTexture(512); bump.repeat.set(4, 4) }
    const mat = new THREE.MeshStandardMaterial({
      map, bumpMap: bump, bumpScale: .07, roughness, metalness: .04,
      color: theme.ground === 'sand' ? 0xb08b61 : theme.ground === 'basalt' ? 0x644d45 : 0x7f8079
    })
    if (theme.ground === 'basalt') {
      mat.emissive = new THREE.Color(0xd64a1a)
      mat.emissiveMap = emissiveMap
      mat.emissiveIntensity = .7
    }
    const ground = new THREE.Mesh(new THREE.CircleGeometry(26.2, 96), mat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.group.add(ground)
    this.ground = ground
    // dark outer ring
    const outer = new THREE.Mesh(new THREE.RingGeometry(25.8, 30, 96), new THREE.MeshStandardMaterial({ color: 0x171310, roughness: .98, metalness: .02 }))
    outer.rotation.x = -Math.PI / 2; outer.position.y = .003; this.group.add(outer)

    // central sigil
    const runeTex = createRuneTexture(512, theme.ground === 'basalt' ? '#ff5a2b' : theme.ground === 'stone' ? '#6bd3b2' : '#b68b50')
    const sigil = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), new THREE.MeshBasicMaterial({ map: runeTex, transparent: true, opacity: .28, depthWrite: false, blending: THREE.AdditiveBlending, color: theme.ground === 'basalt' ? 0xff6038 : theme.ground === 'stone' ? 0x5db695 : 0xc99b5d }))
    sigil.rotation.x = -Math.PI / 2; sigil.position.y = .012; this.group.add(sigil)
    this.sigil = sigil
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.75, .04, 6, 96), new THREE.MeshStandardMaterial({ color: 0x4c3a26, metalness: .6, roughness: .4 }))
    ring.rotation.x = Math.PI / 2; ring.position.y = .025; this.group.add(ring)

    // scattered bones and skulls
    const boneMat = new THREE.MeshStandardMaterial({ color: 0x968872, roughness: .86 })
    const skullGeo = new THREE.SphereGeometry(.12, 7, 5)
    const boneGeo = new THREE.CylinderGeometry(.018, .022, .34, 5)
    const rng = seededRandom(48)
    for (let i = 0; i < 55; i++) {
      const a = rng() * Math.PI * 2
      const r = 8 + rng() * 16.5
      const g = rng() > .38 ? new THREE.Mesh(boneGeo, boneMat) : new THREE.Mesh(skullGeo, boneMat)
      if (g.geometry === skullGeo) g.scale.set(1, .82, 1)
      g.position.set(Math.cos(a) * r, .03 + rng() * .015, Math.sin(a) * r)
      g.rotation.set(Math.PI / 2 + rand(-.3, .3), rand(0, 6), rand(-.3, .3))
      g.castShadow = true
      this.group.add(g)
    }
  }

  buildWalls(theme) {
    const stoneMap = createStoneTexture(2, 512); stoneMap.repeat.set(8, 2)
    const wallMat = new THREE.MeshStandardMaterial({ map: stoneMap, bumpMap: stoneMap, bumpScale: .12, color: theme.ground === 'stone' ? 0x6e726d : theme.ground === 'basalt' ? 0x4b3731 : 0x8a765e, roughness: .93, side: THREE.DoubleSide })
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(25.4, 26.1, 3.15, 80, 1, true), wallMat)
    wall.position.y = 1.575
    wall.receiveShadow = true; wall.castShadow = true
    this.group.add(wall)
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x393029, roughness: .8, metalness: .18 })
    for (const [y, r, h] of [[.32, 25.45, .3], [3.05, 25.2, .28], [1.6, 25.35, .1]]) {
      const trim = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 80, 1, true), trimMat)
      trim.position.y = y; trim.receiveShadow = true; this.group.add(trim)
    }
    // arch niches
    const nicheMat = new THREE.MeshStandardMaterial({ color: 0x0d0a08, roughness: 1 })
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + .31
      if (Math.abs(((a + Math.PI) % (Math.PI * 2)) - Math.PI) < .35) continue
      const arch = new THREE.Group()
      const dark = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), nicheMat)
      dark.position.z = -.04; arch.add(dark)
      const top = new THREE.Mesh(new THREE.CircleGeometry(1.1, 20, 0, Math.PI), nicheMat)
      top.position.set(0, 1.1, -.035); arch.add(top)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(1.16, .08, 5, 18, Math.PI), trimMat)
      rim.position.set(0, 1.08, 0); arch.add(rim)
      arch.position.set(Math.sin(a) * 25.05, 1.48, Math.cos(a) * 25.05)
      arch.lookAt(0, 1.48, 0)
      this.group.add(arch)
    }

    // grand gate at north
    const gate = new THREE.Group()
    const gateMat = new THREE.MeshStandardMaterial({ color: 0x2c2520, roughness: .84, metalness: .26 })
    const gateWood = new THREE.MeshStandardMaterial({ color: 0x22150f, roughness: .95 })
    for (const x of [-4.7, 4.7]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(2.2, 8, 2.2), gateMat)
      tower.position.set(x, 4, 0); tower.castShadow = true; tower.receiveShadow = true; gate.add(tower)
      const cap = new THREE.Mesh(new THREE.ConeGeometry(1.7, 1.8, 4), gateMat)
      cap.position.set(x, 8.8, 0); cap.rotation.y = Math.PI / 4; gate.add(cap)
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(11.4, 1.25, 2.1), gateMat)
    lintel.position.y = 7.35; lintel.castShadow = true; gate.add(lintel)
    const archShape = new THREE.Shape()
    archShape.moveTo(-4.1, 0); archShape.lineTo(-4.1, 4.3); archShape.absarc(0, 4.3, 4.1, Math.PI, 0, true); archShape.lineTo(4.1, 0); archShape.closePath()
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x0b0806, roughness: 1 })
    const door = new THREE.Mesh(new THREE.ShapeGeometry(archShape, 24), doorMat)
    door.position.set(0, 0, -.05); gate.add(door)
    for (let i = -3; i <= 3; i++) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(.045, .055, 6.8, 6), new THREE.MeshStandardMaterial({ color: 0x3b3b37, metalness: .8, roughness: .34 }))
      bar.position.set(i * .88, 3.4, .2); gate.add(bar)
      const spike = new THREE.Mesh(new THREE.ConeGeometry(.075, .3, 4), bar.material)
      spike.position.set(i * .88, 0, .2); spike.rotation.x = Math.PI; gate.add(spike)
    }
    const skull = new THREE.Mesh(new THREE.SphereGeometry(.28, 8, 6), new THREE.MeshStandardMaterial({ color: 0xa09278, roughness: .9 }))
    skull.scale.set(1, 1.2, .9); skull.position.set(0, 8.55, .9); gate.add(skull)
    const gateRing = new THREE.Mesh(new THREE.TorusGeometry(.13, .035, 5, 12), gateMat)
    gateRing.position.set(0, 8.55, 1.15); gate.add(gateRing)
    gate.position.set(0, 0, -25.1)
    this.group.add(gate)
    this.gate = gate

    // banners
    const bannerTex = createBannerTexture(theme.banner, 512)
    for (let i = 0; i < 8; i++) {
      if (i === 1 || i === 6) continue
      const a = i / 8 * Math.PI * 2 + Math.PI
      const banner = new THREE.Group()
      const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.7, 5, 8), new THREE.MeshStandardMaterial({ map: bannerTex, transparent: true, side: THREE.DoubleSide, roughness: .98, metalness: 0, color: 0xd0c2aa }))
      cloth.position.y = -1.37; cloth.castShadow = true
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 1.9, 8), new THREE.MeshStandardMaterial({ color: 0x4a4032, metalness: .7, roughness: .4 }))
      rod.rotation.z = Math.PI / 2; rod.position.y = .04; banner.add(rod)
      banner.add(cloth)
      banner.position.set(Math.sin(a) * 24.9, 3.6, Math.cos(a) * 24.9)
      banner.lookAt(0, 3.6, 0)
      this.group.add(banner)
      this.banners.push({ group: banner, cloth, phase: rand(0, 6), base: cloth.geometry.attributes.position.array.slice() })
    }

    // pillars and braziers
    const columnMat = new THREE.MeshStandardMaterial({ map: stoneMap, color: theme.ground === 'basalt' ? 0x5b4741 : 0x88745d, roughness: .9 })
    const bronze = new THREE.MeshStandardMaterial({ color: 0x4e3e28, metalness: .72, roughness: .44 })
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2
      if (i === 2) continue
      const r = 21.6
      const x = Math.sin(a) * r, z = Math.cos(a) * r
      const col = new THREE.Group()
      const base = new THREE.Mesh(new THREE.CylinderGeometry(.62, .76, .5, 8), columnMat); base.position.y = .25; col.add(base)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.33, .45, 4.5, 10), columnMat); shaft.position.y = 2.7; shaft.castShadow = true; shaft.receiveShadow = true; col.add(shaft)
      const capital = new THREE.Mesh(new THREE.CylinderGeometry(.62, .38, .42, 8), columnMat); capital.position.y = 5.12; col.add(capital)
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(.52, .27, .36, 10), bronze); bowl.position.y = 5.5; col.add(bowl)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(.51, .05, 5, 16), bronze); rim.rotation.x = Math.PI / 2; rim.position.y = 5.67; col.add(rim)
      col.position.set(x, 0, z)
      col.rotation.y = -a
      this.group.add(col)
      this.addFlame(x, 5.75, z, 1.0 + (i % 3) * .18, theme, i < 4)
    }

    // wall torches
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + .32
      const x = Math.sin(a) * 24.6, z = Math.cos(a) * 24.6
      this.addFlame(x, 3.05, z, .58, theme, false)
      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, .7, 6), bronze)
      bracket.position.set(x * .98, 2.65, z * .98); bracket.rotation.x = .3; this.group.add(bracket)
    }
  }

  addFlame(x, y, z, scale, theme, light = false) {
    const glowMat = new THREE.SpriteMaterial({ map: createGlowTexture(128), color: theme.torch, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .92 })
    const sprite = new THREE.Sprite(glowMat)
    sprite.position.set(x, y, z)
    sprite.scale.setScalar(.9 * scale)
    this.group.add(sprite)
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: createGlowTexture(128), color: 0xffdf9c, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .86 }))
    core.position.set(x, y + .05, z); core.scale.setScalar(.4 * scale); this.group.add(core)
    let point = null
    if (light) {
      point = new THREE.PointLight(theme.torch, 5.3 * scale, 12, 2)
      point.position.set(x, y + .25, z)
      this.group.add(point)
      this.lights.push(point)
    }
    this.flames.push({ sprite, core, point, baseY: y, scale, phase: rand(0, 10), rate: rand(.8, 1.4) })
  }

  buildCrowd(theme) {
    const count = this.quality === 'low' ? 160 : 280
    const bodyGeo = new THREE.CapsuleGeometry(.12, .32, 2, 5)
    const headGeo = new THREE.SphereGeometry(.1, 6, 5)
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .98, metalness: 0 })
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .92 })
    const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, count)
    const heads = new THREE.InstancedMesh(headGeo, headMat, count)
    bodies.castShadow = false; bodies.receiveShadow = false
    heads.castShadow = false; heads.receiveShadow = false
    const matrix = new THREE.Matrix4(), quat = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3()
    const colors = [0x27130f, 0x31251d, 0x1c1a17, 0x3a1a13, 0x2c2a24, 0x231c18]
    for (let i = 0; i < count; i++) {
      const row = i % 4
      const a = Math.random() * Math.PI * 2
      const r = 27.6 + row * 2.1 + rand(-.4, .4)
      const y = 2.7 + row * .6
      const s = rand(.8, 1.15)
      pos.set(Math.sin(a) * r, y, Math.cos(a) * r)
      quat.setFromEuler(new THREE.Euler(0, Math.atan2(-Math.sin(a), -Math.cos(a)), 0))
      scl.set(s, s, s)
      matrix.compose(pos, quat, scl)
      bodies.setMatrixAt(i, matrix)
      bodies.setColorAt(i, new THREE.Color(pick(colors)))
      pos.y += .39 * s
      matrix.compose(pos, quat, scl)
      heads.setMatrixAt(i, matrix)
      heads.setColorAt(i, new THREE.Color(Math.random() < .5 ? 0x6e513d : 0x8b6950))
      this.crowd.push({ angle: a, radius: r, baseY: y, scale: s, phase: rand(0, Math.PI * 2) })
    }
    bodies.instanceMatrix.needsUpdate = true
    heads.instanceMatrix.needsUpdate = true
    if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true
    if (heads.instanceColor) heads.instanceColor.needsUpdate = true
    this.group.add(bodies, heads)
    this.crowdBodies = bodies
    this.crowdHeads = heads
    this.crowdMatrix = matrix
    this.crowdQuat = quat
    this.crowdPos = pos
    this.crowdScl = scl
  }

  buildProps(theme) {
    const wood = new THREE.MeshStandardMaterial({ color: 0x2d1c12, roughness: .97 })
    const iron = new THREE.MeshStandardMaterial({ color: 0x312f2a, metalness: .64, roughness: .5 })
    if (this.themeIndex === 1) {
      // gallows
      for (let i = 0; i < 3; i++) {
        const a = 2.1 + i * .67
        const r = 18.2
        const g = new THREE.Group()
        const post = new THREE.Mesh(new THREE.CylinderGeometry(.13, .17, 5.6, 6), wood)
        post.position.y = 2.8; g.add(post)
        const arm = new THREE.Mesh(new THREE.BoxGeometry(2.4, .2, .2), wood)
        arm.position.set(1.1, 5.3, 0); g.add(arm)
        const rope = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, 1.4, 4), new THREE.MeshStandardMaterial({ color: 0x6c5940, roughness: 1 }))
        rope.position.set(1.8, 4.55, 0); g.add(rope)
        const noose = new THREE.Mesh(new THREE.TorusGeometry(.12, .018, 4, 10), rope.material)
        noose.position.set(1.8, 3.83, 0); g.add(noose)
        g.position.set(Math.sin(a) * r, 0, Math.cos(a) * r)
        g.rotation.y = -a
        this.group.add(g)
      }
      // hanging cage
      const cage = new THREE.Group()
      for (let i = 0; i < 8; i++) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 1.8, 4), iron)
        const a = i / 8 * Math.PI * 2
        bar.position.set(Math.cos(a) * .5, 0, Math.sin(a) * .5); cage.add(bar)
      }
      const top = new THREE.Mesh(new THREE.TorusGeometry(.5, .035, 4, 12), iron); top.rotation.x = Math.PI / 2; top.position.y = .9; cage.add(top)
      const bottom = top.clone(); bottom.position.y = -.9; cage.add(bottom)
      const chain = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, 3, 4), iron); chain.position.y = 2.9; cage.add(chain)
      cage.position.set(-7, 5.2, -19); this.group.add(cage)
      this.hangingCage = cage
    }
    if (this.themeIndex === 2) {
      // jagged obsidian fangs
      const obMat = new THREE.MeshStandardMaterial({ color: 0x1d1414, metalness: .32, roughness: .52 })
      for (let i = 0; i < 9; i++) {
        const a = rand(0, Math.PI * 2), r = rand(18.5, 22.5)
        const h = rand(1.1, 3.4)
        const spike = new THREE.Mesh(new THREE.ConeGeometry(rand(.18, .48), h, 5), obMat)
        spike.position.set(Math.sin(a) * r, h / 2, Math.cos(a) * r)
        spike.rotation.z = rand(-.18, .18)
        this.group.add(spike)
      }
      // lava cracks lights
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + .5
        const light = new THREE.PointLight(0xff3b12, 2.2, 9, 2)
        light.position.set(Math.sin(a) * 13, .35, Math.cos(a) * 13)
        this.group.add(light); this.lights.push(light)
      }
    }
    // Crowd terracing, just above the arena wall.
    const standMat = new THREE.MeshStandardMaterial({ color: 0x322c25, roughness: .96 })
    for (let row = 0; row < 4; row++) {
      const r = 27.3 + row * 2.1
      const step = new THREE.Mesh(new THREE.CylinderGeometry(r + 1.15, r + 1.15, .52, 64, 1, true), standMat)
      step.position.y = 2.48 + row * .6
      step.receiveShadow = true
      this.group.add(step)
      const lip = new THREE.Mesh(new THREE.TorusGeometry(r + 1.15, .055, 4, 64), new THREE.MeshStandardMaterial({ color: 0x4e4032, roughness: .72 }))
      lip.rotation.x = Math.PI / 2
      lip.position.y = 2.76 + row * .6
      this.group.add(lip)
    }
  }

  buildHazards(theme) {
    const positions = [
      { x: -8.5, z: 2.5 }, { x: 8.5, z: 2.5 }, { x: -7.5, z: -10.5 }, { x: 7.5, z: -10.5 }
    ]
    const runeTex = createRuneTexture(256, theme.ground === 'basalt' ? '#ff6a35' : theme.ground === 'stone' ? '#74dcb8' : '#c79555')
    for (const p of positions) {
      const group = new THREE.Group()
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.54, .07, 32), new THREE.MeshStandardMaterial({ color: 0x2a2722, metalness: .45, roughness: .65 }))
      base.position.y = .035; base.receiveShadow = true; group.add(base)
      const rune = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ map: runeTex, transparent: true, opacity: .34, depthWrite: false, blending: THREE.AdditiveBlending, color: theme.ground === 'stone' ? 0x73d4b0 : 0xff6b3b }))
      rune.rotation.x = -Math.PI / 2; rune.position.y = .075; group.add(rune)
      const spikeGeo = new THREE.ConeGeometry(.1, 1.1, 5)
      const spikeMat = new THREE.MeshStandardMaterial({ color: 0x77766c, metalness: .85, roughness: .3 })
      const spikes = new THREE.InstancedMesh(spikeGeo, spikeMat, 14)
      spikes.castShadow = true
      const matrix = new THREE.Matrix4()
      const spikeData = []
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2
        const r = i < 7 ? .5 : .95
        spikeData.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, s: rand(.7, 1.2) })
      }
      for (let i = 0; i < 14; i++) {
        matrix.makeScale(1, .02, 1)
        matrix.setPosition(spikeData[i].x, 0, spikeData[i].z)
        spikes.setMatrixAt(i, matrix)
      }
      group.add(spikes)
      group.position.set(p.x, 0, p.z)
      this.group.add(group)
      this.hazards.push({ group, spikes, rune, base, phase: rand(0, 5), cycle: 4.4, active: false, spikeData, matrix, position: new THREE.Vector3(p.x, 0, p.z), wasActive: false })
    }
  }

  buildAtmosphere(theme) {
    const dustCount = this.quality === 'low' ? 180 : 360
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(dustCount * 3)
    const phases = new Float32Array(dustCount)
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = rand(-24, 24)
      positions[i * 3 + 1] = rand(.2, 10)
      positions[i * 3 + 2] = rand(-24, 24)
      phases[i] = rand(0, Math.PI * 2)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const tex = createDustTexture(64)
    const mat = new THREE.PointsMaterial({ color: theme.ground === 'basalt' ? 0xff6b3a : theme.ground === 'stone' ? 0x92b9aa : 0xd8b887, size: .055, map: tex, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending })
    this.dust = new THREE.Points(geo, mat)
    mat.opacity = .24
    mat.size = .038
    this.group.add(this.dust)
    this.dustData = { positions, phases, count: dustCount }

    // embers rising near fire
    const emberCount = this.quality === 'low' ? 80 : 160
    const eg = new THREE.BufferGeometry()
    const ep = new Float32Array(emberCount * 3)
    const esp = new Float32Array(emberCount * 3)
    for (let i = 0; i < emberCount; i++) {
      const a = rand(0, 6.28), r = rand(7, 23)
      ep[i * 3] = Math.sin(a) * r
      ep[i * 3 + 1] = rand(0, 12)
      ep[i * 3 + 2] = Math.cos(a) * r
      esp[i * 3] = rand(-.15, .15); esp[i * 3 + 1] = rand(.35, 1.2); esp[i * 3 + 2] = rand(-.15, .15)
    }
    eg.setAttribute('position', new THREE.BufferAttribute(ep, 3))
    this.emberStream = new THREE.Points(eg, new THREE.PointsMaterial({ color: theme.torch, size: .08, map: createDustTexture(32), transparent: true, opacity: .8, blending: THREE.AdditiveBlending, depthWrite: false }))
    this.group.add(this.emberStream)
    this.emberData = { positions: ep, speed: esp, count: emberCount }
  }

  update(dt, intensity = 0) {
    this.time += dt
    this.crowdExcitement += (intensity - this.crowdExcitement) * Math.min(1, dt * 1.5)
    const time = this.time
    if (this.sky) this.sky.material.uniforms.time.value = time
    // flames
    for (const f of this.flames) {
      const flicker = .82 + Math.sin(time * 12 * f.rate + f.phase) * .1 + Math.sin(time * 19.7 + f.phase * 2) * .07
      f.sprite.scale.setScalar(.92 * f.scale * flicker)
      f.core.scale.setScalar(.48 * f.scale * (0.9 + Math.sin(time * 16 + f.phase) * .12))
      f.core.position.y = f.baseY + .06 + Math.sin(time * 9 + f.phase) * .04
      f.sprite.position.y = f.baseY + Math.sin(time * 7 + f.phase) * .03
      if (f.point) f.point.intensity = (4.8 + Math.sin(time * 15 + f.phase) * .7) * f.scale
    }
    // crowd idle
    if (this.crowdBodies) {
      const m = this.crowdMatrix, q = this.crowdQuat, p = this.crowdPos, s = this.crowdScl
      const count = this.crowd.length
      for (let i = 0; i < count; i++) {
        const c = this.crowd[i]
        const bob = Math.sin(time * (1.2 + this.crowdExcitement * 3.2) + c.phase) * (.012 + this.crowdExcitement * .07)
        const sway = Math.sin(time * .4 + c.phase) * .04
        p.set(Math.sin(c.angle + sway * .02) * c.radius, c.baseY + bob, Math.cos(c.angle + sway * .02) * c.radius)
        q.setFromEuler(new THREE.Euler(0, Math.atan2(-Math.sin(c.angle), -Math.cos(c.angle)), 0))
        s.set(c.scale, c.scale, c.scale)
        m.compose(p, q, s)
        this.crowdBodies.setMatrixAt(i, m)
        p.y += .39 * c.scale + bob * .6
        m.compose(p, q, s)
        this.crowdHeads.setMatrixAt(i, m)
      }
      this.crowdBodies.instanceMatrix.needsUpdate = true
      this.crowdHeads.instanceMatrix.needsUpdate = true
    }
    // banners
    for (const b of this.banners) {
      const posAttr = b.cloth.geometry.attributes.position
      const base = b.base
      for (let i = 0; i < posAttr.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1]
        const wave = Math.sin(time * 1.4 + b.phase + y * .8 + x * 1.2) * .08 * (1 - (y + 2) / 4.2)
        posAttr.setZ(i, wave)
      }
      posAttr.needsUpdate = true
    }
    // hazards
    for (const h of this.hazards) {
      h.phase += dt
      const cyc = h.phase % 6
      const warn = cyc > 3.75 && cyc < 4.55
      const active = cyc >= 4.55 && cyc < 5.55
      h.active = active
      h.rune.material.opacity = warn ? .38 + Math.sin(time * 18) * .2 : active ? .16 : .18
      const rise = active ? Math.min(1, (cyc - 4.55) * 7) : cyc >= 5.55 ? Math.max(0, 1 - (cyc - 5.55) * 9) : 0
      for (let i = 0; i < h.spikeData.length; i++) {
        const d = h.spikeData[i]
        h.matrix.makeScale(1, Math.max(.02, rise * d.s), 1)
        h.matrix.setPosition(d.x, .04 + rise * .42, d.z)
        h.spikes.setMatrixAt(i, h.matrix)
      }
      h.spikes.instanceMatrix.needsUpdate = true
    }
    // dust drift
    if (this.dust) {
      const a = this.dust.geometry.attributes.position
      for (let i = 0; i < this.dustData.count; i++) {
        let y = a.getY(i) + dt * (.08 + (i % 5) * .02)
        let x = a.getX(i) + Math.sin(time * .3 + this.dustData.phases[i]) * dt * .08
        let z = a.getZ(i) + Math.cos(time * .24 + this.dustData.phases[i]) * dt * .06
        if (y > 10) y = .2
        if (x > 24) x = -24; if (x < -24) x = 24
        if (z > 24) z = -24; if (z < -24) z = 24
        a.setXYZ(i, x, y, z)
      }
      a.needsUpdate = true
    }
    // embers
    if (this.emberStream) {
      const a = this.emberStream.geometry.attributes.position
      const { speed, count } = this.emberData
      for (let i = 0; i < count; i++) {
        let y = a.getY(i) + dt * speed[i * 3 + 1]
        let x = a.getX(i) + Math.sin(time + i) * dt * .08
        let z = a.getZ(i) + Math.cos(time * .7 + i) * dt * .06
        if (y > 13) { y = 0; x = rand(-23, 23); z = rand(-23, 23) }
        a.setXYZ(i, x, y, z)
      }
      a.needsUpdate = true
    }
    if (this.hangingCage) {
      this.hangingCage.rotation.z = Math.sin(time * .55) * .035
    }
    if (this.centerLight) this.centerLight.intensity = 1.1 + this.crowdExcitement * 1.4
    if (this.sigil) this.sigil.material.opacity = .22 + Math.sin(time * .8) * .04 + this.crowdExcitement * .05
  }

  excite(amount = .4) {
    this.crowdExcitement = Math.min(1, this.crowdExcitement + amount)
  }

  clampToArena(pos, padding = .45) {
    const r = Math.hypot(pos.x, pos.z)
    const max = this.radius - padding
    if (r > max) {
      pos.x = (pos.x / r) * max
      pos.z = (pos.z / r) * max
    }
    return pos
  }

  distanceToEdge(pos) {
    return this.radius - Math.hypot(pos.x, pos.z)
  }

  disposeGroup(group) {
    group.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        for (const m of mats) {
          for (const k of ['map', 'bumpMap', 'emissiveMap', 'normalMap']) if (m[k]) m[k].dispose()
          m.dispose()
        }
      }
    })
  }

  dispose() {
    if (this.group) { this.scene.remove(this.group); this.disposeGroup(this.group) }
    if (this.sky) { this.scene.remove(this.sky); this.sky.geometry.dispose(); this.sky.material.dispose() }
    if (this.stars) { this.scene.remove(this.stars); this.stars.geometry.dispose(); this.stars.material.dispose() }
    if (this.moon) { this.scene.remove(this.moon); this.moon.material.map?.dispose(); this.moon.material.dispose() }
  }
}
