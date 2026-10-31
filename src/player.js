import * as THREE from 'three'
import {
  TAU, clamp, lerp, damp, rand, chance, easeOutCubic, easeOutQuint, easeInOutQuad,
  makeMesh, softDropTexture
} from './utils.js'
import { sound } from './audio.js'
import { ARENA_RADIUS } from './arena.js'

const WEAPON_STATS = {
  sword: {
    name: 'SWORD', kind: 'CLEAVER', type: 'slash',
    light: { damage: 31, windup: 0.055, active: 0.15, recover: 0.2, range: 2.35, hitRadius: 0.09 },
    heavy: { damage: 82, windup: 0.16, active: 0.2, recover: 0.36, range: 2.55, hitRadius: 0.14 },
    reach: 2.4,
    speeds: [1.0, 1.05, 1.18]
  },
  hammer: {
    name: 'HAMMER', kind: 'SKULLBREAKER', type: 'crush',
    light: { damage: 46, windup: 0.14, active: 0.16, recover: 0.3, range: 2.25, hitRadius: 0.16 },
    heavy: { damage: 96, windup: 0.27, active: 0.22, recover: 0.44, range: 2.5, hitRadius: 0.24 },
    reach: 2.3,
    speeds: [0.92, 0.98, 1.1]
  }
}

function buildWeaponModel(type) {
  const g = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ color: 0xb7c0c9, roughness: 0.28, metalness: 0.92 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x565b62, roughness: 0.4, metalness: 0.85 })
  const wood = new THREE.MeshStandardMaterial({ color: 0x3f2718, roughness: 0.92 })
  const leather = new THREE.MeshStandardMaterial({ color: 0x26170f, roughness: 0.95 })
  const brass = new THREE.MeshStandardMaterial({ color: 0xb08a48, roughness: 0.3, metalness: 0.9 })
  const blood = new THREE.MeshStandardMaterial({ color: 0x6d0810, roughness: 0.42 })

  if (type === 'sword') {
    const grip = makeMesh(new THREE.CylinderGeometry(0.026, 0.031, 0.24, 8), leather, [0, -0.02, 0])
    const pommel = makeMesh(new THREE.SphereGeometry(0.045, 8, 6), brass, [0, -0.15, 0])
    const guard = makeMesh(new THREE.BoxGeometry(0.34, 0.045, 0.07), brass, [0, 0.11, 0])
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.92, 0.017), steel)
    blade.position.y = 0.6
    // taper the blade to a point
    const p = blade.geometry.attributes.position
    for (let i = 0; i < p.count; i++) {
      const yy = p.getY(i)
      if (yy > 0.3) {
        p.setX(i, p.getX(i) * 0.28)
        p.setZ(i, p.getZ(i) * 0.45)
      }
    }
    p.needsUpdate = true
    blade.geometry.computeVertexNormals()
    const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.62, 0.021), darkSteel)
    fuller.position.y = 0.52
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.019, 0.16, 4), steel)
    tip.position.y = 1.12
    tip.rotation.y = Math.PI / 4
    const stain = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.52), blood)
    stain.position.set(0.037, 0.62, 0.008)
    stain.rotation.y = Math.PI / 2
    stain.visible = false
    g.add(grip, pommel, guard, blade, fuller, tip, stain)
    g.userData.stain = stain
    g.userData.tip = 1.14
    g.userData.base = 0.16
  } else {
    const handle = makeMesh(new THREE.CylinderGeometry(0.033, 0.041, 0.95, 8), wood, [0, 0.36, 0])
    const wrap = makeMesh(new THREE.CylinderGeometry(0.042, 0.042, 0.24, 8), leather, [0, -0.05, 0])
    const pommel = makeMesh(new THREE.CylinderGeometry(0.045, 0.04, 0.06, 8), brass, [0, -0.19, 0])
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.27, 0.25), darkSteel)
    head.position.y = 0.9
    const bevel = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.1, 0.28), steel)
    bevel.position.y = 0.9
    const faceL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.31, 0.29), steel)
    faceL.position.set(-0.235, 0.9, 0)
    const faceR = faceL.clone()
    faceR.position.x = 0.235
    const band = makeMesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 8), brass, [0, 0.73, 0])
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.16, 5), steel)
    spike.position.set(0.29, 0.9, 0)
    spike.rotation.z = -Math.PI / 2
    const stain = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.08, 0.27), blood)
    stain.position.y = 1.04
    stain.visible = false
    g.add(handle, wrap, pommel, head, bevel, faceL, faceR, band, spike, stain)
    g.userData.stain = stain
    g.userData.tip = 1.06
    g.userData.base = 0.7
  }
  // first-person arm gripping the weapon
  const skin = new THREE.MeshStandardMaterial({ color: 0x8a5c40, roughness: 0.78 })
  const fist = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), skin)
  fist.scale.set(0.95, 1.15, 0.85)
  fist.position.set(0, 0, 0)
  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.064, 0.38, 7), skin)
  wrist.position.set(0.012, -0.23, 0.01)
  wrist.rotation.z = -0.08
  const knuckle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.035, 0.08), skin)
  knuckle.position.set(0, 0.03, 0.045)
  g.add(fist, wrist, knuckle)
  g.userData.arm = [fist, wrist, knuckle]
  g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false } })
  return g
}

class BladeTrail {
  constructor(scene) {
    this.max = 18
    this.points = []
    const geo = new THREE.BufferGeometry()
    this.positions = new Float32Array(this.max * 2 * 3)
    this.alphas = new Float32Array(this.max * 2)
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1))
    geo.setDrawRange(0, 0)
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: {},
      vertexShader: `attribute float aAlpha; varying float vA; void main(){ vA=aAlpha; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying float vA; void main(){ if(vA<0.01) discard; gl_FragColor=vec4(0.92,0.85,0.8,vA*0.28); }`
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = 4
    scene.add(this.mesh)
    this.geo = geo
    this.enabled = false
  }

  push(base, tip, t) {
    this.points.push({ base: base.clone(), tip: tip.clone(), born: t })
    if (this.points.length > this.max) this.points.shift()
  }

  update(t, active) {
    while (this.points.length && t - this.points[0].born > 0.18) this.points.shift()
    const n = this.points.length
    this.geo.setDrawRange(0, Math.max(0, (n - 1) * 6))
    for (let i = 0; i < n; i++) {
      const p = this.points[i]
      const age = clamp(1 - (t - p.born) / 0.18, 0, 1)
      this.positions[i * 6] = p.base.x
      this.positions[i * 6 + 1] = p.base.y
      this.positions[i * 6 + 2] = p.base.z
      this.positions[i * 6 + 3] = p.tip.x
      this.positions[i * 6 + 4] = p.tip.y
      this.positions[i * 6 + 5] = p.tip.z
      this.alphas[i * 2] = age * 0.55
      this.alphas[i * 2 + 1] = age
    }
    this.geo.attributes.position.needsUpdate = true
    this.geo.attributes.aAlpha.needsUpdate = true
    // build indices implicitly? use non-indexed triangle strip converted to triangles
    if (n > 1) {
      const idx = []
      for (let i = 0; i < n - 1; i++) {
        const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1
        idx.push(a, b, c, b, d, c)
      }
      this.geo.setIndex(idx)
    }
    this.mesh.visible = active && n > 1
  }

  clear() { this.points = []; this.mesh.visible = false }
}

export class Player {
  constructor(camera, scene, gore, game) {
    this.camera = camera
    this.scene = scene
    this.gore = gore
    this.game = game
    this.pos = new THREE.Vector3(0, 0, 6.5)
    this.yaw = 0
    this.pitch = -0.04
    this.health = 100
    this.maxHealth = 100
    this.alive = true
    this.weaponId = 'sword'
    this.stats = WEAPON_STATS.sword
    this.moveSpeed = 5.35
    this.vel = new THREE.Vector3()
    this.moveInput = { x: 0, z: 0 }
    this.walkPhase = 0
    this.stepTimer = 0
    this.attackState = 'idle'
    this.attackT = 0
    this.attackKind = 'light'
    this.attackIndex = 0
    this.comboTimer = 0
    this.charging = false
    this.chargeTime = 0
    this.releaseHeld = false
    this.hitSet = new Set()
    this.blocking = false
    this.blockTime = 0
    this.parryWindow = 0.22
    this.dodgeTime = 0
    this.dodgeCooldown = 0
    this.dodgeDir = new THREE.Vector3()
    this.invuln = 0
    this.shoveTime = 0
    this.shoveCooldown = 0
    this.kick = 0
    this.deadTime = 0
    this.hurtFlash = 0
    this.noise = 0
    this.swapTime = 0
    this.executing = 0
    this.time = 0
    this.lastMoveDelta = 0
    this.rigBase = new THREE.Vector3(0.5, -0.54, -0.92)
    this.rig = new THREE.Group()
    this.rig.position.copy(this.rigBase)
    camera.add(this.rig)
    this.weaponModel = null
    this.trail = new BladeTrail(scene)
    this.tipA = new THREE.Vector3()
    this.tipB = new THREE.Vector3()
    this.baseA = new THREE.Vector3()
    this.baseB = new THREE.Vector3()
    this.shakeAmt = 0
    this.camKick = { x: 0, y: 0, z: 0, roll: 0 }
    this.rigSway = { x: 0, y: 0 }
    this.breath = 0
    this.blockingVisual = 0
    this.aimTarget = null
    this.footPhase = 0
    this.recoil = 0
    this.setWeapon('sword', true)
    this.updateCamera(0)
  }

  setWeapon(type, silent = false) {
    if (this.weaponModel) {
      this.rig.remove(this.weaponModel)
      this.weaponModel.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) o.material.dispose()
      })
    }
    this.weaponId = type
    this.stats = WEAPON_STATS[type]
    this.weaponModel = buildWeaponModel(type)
    this.weaponModel.scale.setScalar(0.6)
    this.rig.add(this.weaponModel)
    this.attackState = 'idle'
    this.charging = false
    this.swapTime = silent ? 0 : 0.32
    if (!silent) {
      sound.pickup()
      this.game?.onWeaponChanged(type)
    }
  }

  reset(weapon) {
    this.pos.set(0, 0, 6.5)
    this.yaw = 0
    this.pitch = -0.03
    this.health = this.maxHealth
    this.alive = true
    this.deadTime = 0
    this.attackState = 'idle'
    this.charging = false
    this.chargeTime = 0
    this.blocking = false
    this.blockTime = 0
    this.dodgeTime = 0
    this.dodgeCooldown = 0
    this.invuln = 0
    this.shoveTime = 0
    this.shoveCooldown = 0
    this.executing = 0
    this.hurtFlash = 0
    this.shakeAmt = 0
    this.vel.set(0, 0, 0)
    this.trail.clear()
    this.setWeapon(weapon || this.weaponId, true)
    this.updateCamera(0)
  }

  look(dx, dy, sensitivity = 0.0022) {
    if (!this.alive || this.game?.paused) return
    this.yaw -= dx * sensitivity
    this.pitch -= dy * sensitivity
    this.pitch = clamp(this.pitch, -1.45, 1.35)
    this.rigSway.x = clamp(this.rigSway.x + dx * 0.00025, -0.05, 0.05)
    this.rigSway.y = clamp(this.rigSway.y + dy * 0.0002, -0.04, 0.04)
  }

  startCharge() {
    if (!this.alive || this.executing > 0) return
    if (this.attackState !== 'idle') return
    if (this.dodgeTime > 0) return
    this.charging = true
    this.chargeTime = 0
    this.blocking = false
  }

  releaseCharge() {
    if (!this.alive || !this.charging) return
    this.charging = false
    const heavy = this.chargeTime >= 0.26
    this.beginAttack(heavy ? 'heavy' : 'light', this.chargeTime)
  }

  cancelCharge() {
    this.charging = false
    this.chargeTime = 0
  }

  beginAttack(kind, charge = 0) {
    if (this.attackState !== 'idle' && this.attackState !== 'recover') return
    if (this.comboTimer > 0) this.attackIndex = (this.attackIndex + 1) % 3
    else this.attackIndex = 0
    this.attackKind = kind
    this.attackState = 'windup'
    this.attackT = 0
    this.chargeRatio = clamp(charge / 1.2, 0, 1)
    this.hitSet.clear()
    this.attackCount = 0
    this.blocking = false
    const cfg = this.stats[kind]
    this.attackDuration = cfg.windup + cfg.active + cfg.recover
    this.attackWindup = cfg.windup
    this.attackActive = cfg.active
    this.attackRecover = cfg.recover
    this.attackDamage = cfg.damage * (kind === 'heavy' ? (0.85 + this.chargeRatio * 0.35) : 1)
    this.attackRange = cfg.range
    this.attackHitRadius = cfg.hitRadius
    this.trail.clear()
    sound.swing(this.weaponId, kind === 'heavy' ? 0.8 : 0.2)
    if (kind === 'heavy') {
      this.game?.onHeavyStart(this)
      this.shake(0.15)
    }
  }

  blockDown() {
    if (!this.alive || this.attackState === 'windup' || this.attackState === 'active') return
    if (this.charging) this.cancelCharge()
    this.blocking = true
    this.blockTime = 0
    this.attackState = 'idle'
  }

  blockUp() {
    this.blocking = false
  }

  dodge() {
    if (!this.alive || this.dodgeCooldown > 0 || this.dodgeTime > 0) return
    if (this.executing > 0) return
    const input = this.moveInput
    let dx = input.x, dz = input.z
    if (Math.hypot(dx, dz) < 0.1) { dx = 0; dz = -1 }
    const len = Math.hypot(dx, dz) || 1
    dx /= len; dz /= len
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw)
    const wx = dx * cos + dz * sin
    const wz = -dx * sin + dz * cos
    this.dodgeDir.set(wx, 0, wz)
    this.dodgeTime = 0.2
    this.dodgeCooldown = 0.85
    this.invuln = Math.max(this.invuln, 0.34)
    this.cancelCharge()
    this.blocking = false
    this.attackState = 'idle'
    sound.dodge()
    this.game?.onDodge()
  }

  shove() {
    if (!this.alive || this.shoveCooldown > 0 || this.executing > 0) return
    if (this.attackState === 'windup' || this.attackState === 'active') return
    this.shoveTime = 0.28
    this.shoveCooldown = 0.9
    this.shoveHit = false
    this.cancelCharge()
    sound.whooshHeavy()
    this.game?.onShove()
  }

  shake(amount) {
    this.shakeAmt = Math.min(0.6, this.shakeAmt + amount)
  }

  update(dt) {
    this.time += dt
    this.hurtFlash = Math.max(0, this.hurtFlash - dt * 2.5)
    this.shakeAmt = Math.max(0, this.shakeAmt - dt * 1.7)
    this.recoil = Math.max(0, this.recoil - dt * 6)
    this.rigSway.x = damp(this.rigSway.x, 0, 6, dt)
    this.rigSway.y = damp(this.rigSway.y, 0, 6, dt)
    if (this.dodgeCooldown > 0) this.dodgeCooldown -= dt
    if (this.shoveCooldown > 0) this.shoveCooldown -= dt
    if (this.invuln > 0) this.invuln -= dt
    if (this.swapTime > 0) this.swapTime -= dt
    if (this.comboTimer > 0) this.comboTimer -= dt
    if (this.blocking) this.blockTime += dt

    if (!this.alive) {
      this.deadTime += dt
      this.updateCamera(dt)
      this.updateWeapon(dt)
      return
    }

    if (this.executing > 0) {
      this.executing -= dt
      this.updateWeapon(dt)
      this.updateCamera(dt)
      return
    }

    if (this.charging) {
      this.chargeTime = Math.min(1.6, this.chargeTime + dt)
      this.game?.onCharge(this.chargeTime)
    }

    // dodge motion
    if (this.dodgeTime > 0) {
      this.dodgeTime -= dt
      const speed = 10.5 * (this.dodgeTime / 0.2) + 2.5
      this.pos.x += this.dodgeDir.x * speed * dt
      this.pos.z += this.dodgeDir.z * speed * dt
      if (chance(0.4)) {
        this.gore.blood.spawn(this.pos.x, 0.08, this.pos.z, { vy: 0.4, chaos: 0.3, size: 0.5, life: 0.5 })
      }
    } else {
      const input = this.moveInput
      let dx = input.x, dz = input.z
      const len = Math.hypot(dx, dz)
      if (len > 1) { dx /= len; dz /= len }
      const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw)
      const wx = dx * cos + dz * sin
      const wz = -dx * sin + dz * cos
      let speed = this.moveSpeed
      if (this.charging) speed *= 0.55
      if (this.blocking) speed *= 0.5
      if (this.attackState === 'windup' || this.attackState === 'active') speed *= 0.28
      if (this.shoveTime > 0) speed *= 0.5
      this.vel.x = damp(this.vel.x, wx * speed, 14, dt)
      this.vel.z = damp(this.vel.z, wz * speed, 14, dt)
      this.pos.x += this.vel.x * dt
      this.pos.z += this.vel.z * dt
      const moveAmt = Math.hypot(this.vel.x, this.vel.z)
      if (moveAmt > 0.4) {
        this.walkPhase += dt * moveAmt * 1.6
        this.stepTimer -= dt
        if (this.stepTimer <= 0) { this.stepTimer = 0.34; sound.step() }
      }
    }

    // arena bounds
    const r = Math.hypot(this.pos.x, this.pos.z)
    const limit = ARENA_RADIUS - 0.7
    if (r > limit) {
      this.pos.x *= limit / r
      this.pos.z *= limit / r
      this.vel.multiplyScalar(0.5)
    }

    // attack timing
    if (this.attackState !== 'idle') {
      this.attackT += dt
      if (this.attackState === 'windup' && this.attackT >= this.attackWindup) {
        this.attackState = 'active'
        this.attackT = 0
      } else if (this.attackState === 'active') {
        this.sampleHit(dt)
        if (this.attackT >= this.attackActive) {
          this.attackState = 'recover'
          this.attackT = 0
        }
      } else if (this.attackState === 'recover' && this.attackT >= this.attackRecover) {
        this.attackState = 'idle'
        this.attackT = 0
        this.comboTimer = 0.5
      }
    }

    // shove hit
    if (this.shoveTime > 0) {
      this.shoveTime -= dt
      this.kick = Math.sin((1 - this.shoveTime / 0.28) * Math.PI)
      if (!this.shoveHit && this.shoveTime < 0.2) {
        this.shoveHit = true
        this.game?.playerShove(this)
      }
    } else this.kick = Math.max(0, this.kick - dt * 5)

    // passive blood drip from dirty weapon
    if (this.weaponModel?.userData.stain?.visible && chance(dt * 2.2) && this.weaponModel) {
      this.getWeaponPoints(this.baseA, this.baseB)
      this.gore.blood.spawn(this.baseB.x, this.baseB.y, this.baseB.z, { vy: -0.4, chaos: 0.1, size: 0.55, life: 0.5, gravity: 1 })
    }

    this.updateWeapon(dt)
    this.updateCamera(dt)
  }

  getWeaponPoints(base, tip) {
    if (!this.weaponModel) return
    this.weaponModel.updateWorldMatrix(true, false)
    const u = this.weaponModel.userData
    base.set(0, u.base, 0)
    tip.set(0, u.tip, 0)
    this.weaponModel.localToWorld(base)
    this.weaponModel.localToWorld(tip)
  }

  sampleHit(dt) {
    this.getWeaponPoints(this.baseA, this.tipB)
    const a = this.baseA, b = this.tipB
    // extend the blade's reach along its own line from the eye so melee can
    // connect at the same distance the animation reads
    const camPos = new THREE.Vector3().setFromMatrixPosition(this.camera.matrixWorld)
    const reachDir = b.clone().sub(camPos)
    const reachLen = reachDir.length() || 1
    reachDir.multiplyScalar(1 / reachLen)
    const extended = b.clone().addScaledVector(reachDir, 0.75)
    this.game?.playerSwing(this, a, extended, this.attackKind, this.attackDamage, this.stats.type, this.attackHitRadius, this.hitSet)
    if (this.attackState === 'active') this.trail.push(a, b, this.time)
  }

  updateWeapon(dt) {
    if (!this.weaponModel) return
    let px = this.rigBase.x, py = this.rigBase.y, pz = this.rigBase.z
    let rx = -0.36, ry = 0.6, rz = -0.3
    if (this.weaponId === 'hammer') {
      rx = -0.46; ry = -0.34; rz = -0.12
    }

    const walkAmt = clamp(Math.hypot(this.vel.x, this.vel.z) / 5, 0, 1)
    const bob = Math.sin(this.walkPhase) * 0.016 * walkAmt
    const bob2 = Math.abs(Math.cos(this.walkPhase)) * 0.012 * walkAmt
    px += Math.sin(this.walkPhase * 0.5) * 0.012 * walkAmt + this.rigSway.x
    py += bob + bob2 + this.rigSway.y + Math.sin(this.time * 1.7) * 0.004
    pz += Math.cos(this.walkPhase) * 0.008 * walkAmt

    // charge pose
    if (this.charging) {
      const t = clamp(this.chargeTime / 1.0, 0, 1)
      const e = easeOutCubic(t)
      if (this.weaponId === 'hammer') {
        rx = lerp(-0.4, 0.15, e)
        ry = lerp(-0.28, -0.05, e)
        rz = lerp(0.22, 0.05, e)
        px = lerp(px, 0.5, e)
        py = lerp(py, -0.22, e)
      } else {
        rx = lerp(-0.3, -0.6, e)
        ry = lerp(0.5, 0.1, e)
        rz = lerp(0.42, -0.55, e)
        px = lerp(px, 0.55, e)
        py = lerp(py, -0.34, e)
      }
      rx += Math.sin(this.time * 30) * 0.008 * e
    }

    // attack poses
    if (this.attackState !== 'idle') {
      const kind = this.attackKind
      const w = this.attackWindup, a = this.attackActive, rc = this.attackRecover
      let t = 0
      let phase = ''
      if (this.attackState === 'windup') { t = this.attackT / w; phase = 'w' }
      else if (this.attackState === 'active') { t = this.attackT / a; phase = 'a' }
      else { t = this.attackT / rc; phase = 'r' }
      const idx = this.attackIndex
      const swingPose = this.getSwingPose(kind, idx, phase, t)
      if (swingPose) {
        px = swingPose.px; py = swingPose.py; pz = swingPose.pz
        rx = swingPose.rx; ry = swingPose.ry; rz = swingPose.rz
      }
    }

    if (this.blocking) {
      this.blockingVisual = damp(this.blockingVisual, 1, 18, dt)
    } else {
      this.blockingVisual = damp(this.blockingVisual, 0, 14, dt)
    }
    if (this.blockingVisual > 0.01) {
      const bl = this.blockingVisual
      px = lerp(px, 0.18, bl)
      py = lerp(py, -0.34, bl)
      pz = lerp(pz, -0.64, bl)
      rx = lerp(rx, -0.55, bl)
      ry = lerp(ry, 0.15, bl)
      rz = lerp(rz, 1.15, bl)
    }

    if (this.shoveTime > 0) {
      py -= this.kick * 0.1
      pz -= this.kick * 0.16
      rx -= this.kick * 0.5
    }

    if (this.swapTime > 0) {
      py -= Math.sin((1 - this.swapTime / 0.32) * Math.PI) * 0.4
      rx -= Math.sin((1 - this.swapTime / 0.32) * Math.PI) * 0.6
    }

    if (this.executing > 0) {
      pz -= 0.2
      rx += 0.5
    }

    const dampK = 1 - Math.exp(-22 * dt)
    this.rig.position.x += (px - this.rig.position.x) * dampK
    this.rig.position.y += (py - this.rig.position.y) * dampK
    this.rig.position.z += (pz - this.rig.position.z) * dampK
    this.rig.rotation.x += (rx - this.rig.rotation.x) * dampK
    this.rig.rotation.y += (ry - this.rig.rotation.y) * dampK
    this.rig.rotation.z += (rz - this.rig.rotation.z) * dampK

    // trail update
    const active = this.attackState === 'active'
    this.trail.update(this.time, active)

    // stain + drip
    if (this.weaponModel.userData.stain) {
      this.weaponModel.userData.stain.visible = (this.bloodied || 0) > 0
    }
  }

  getSwingPose(kind, idx, phase, t) {
    const heavy = kind === 'heavy'
    const sword = this.weaponId === 'sword'
    const pose = (px, py, pz, rx, ry, rz) => ({ px, py, pz, rx, ry, rz })
    let start, w, end, r
    if (sword) {
      if (idx === 2) {
        // overhead executioner's chop
        start = pose(0.36, -0.48, -0.72, -0.3, 0.5, 0.35)
        w = pose(0.34, -0.14, -0.6, 0.12, 0.25, 0.18)
        end = pose(0.16, -0.66, -0.84, -2.3, 0.05, 0.04)
        r = pose(0.32, -0.5, -0.72, -0.65, 0.2, 0.25)
        if (heavy) {
          w = pose(0.3, 0.02, -0.5, 0.35, 0.2, 0.1)
          end = pose(0.14, -0.72, -0.88, -2.75, 0.05, 0.02)
        }
      } else if (idx === 0) {
        // right-to-left cleave
        start = pose(0.4, -0.48, -0.72, -0.3, 0.45, 0.35)
        w = pose(0.6, -0.33, -0.62, -0.55, 0.1, -0.8)
        end = pose(0.06, -0.53, -0.72, -0.12, -0.2, 1.28)
        r = pose(0.32, -0.48, -0.7, -0.25, 0.25, 0.5)
        if (heavy) {
          w = pose(0.66, -0.28, -0.58, -0.7, 0.05, -1.05)
          end = pose(-0.04, -0.58, -0.74, -0.05, -0.25, 1.5)
        }
      } else {
        // left-to-right backhand
        start = pose(0.22, -0.5, -0.72, -0.3, 0.2, 1.0)
        w = pose(0.04, -0.34, -0.6, -0.5, 0.1, 1.35)
        end = pose(0.64, -0.52, -0.7, -0.1, -0.25, -0.95)
        r = pose(0.42, -0.48, -0.7, -0.2, 0.15, 0.05)
        if (heavy) {
          w = pose(-0.02, -0.3, -0.56, -0.65, 0.05, 1.55)
          end = pose(0.7, -0.56, -0.72, -0.02, -0.3, -1.15)
        }
      }
    } else {
      if (idx === 2 || heavy) {
        // overhead skull-crusher
        start = pose(0.38, -0.5, -0.72, -0.4, -0.28, 0.22)
        w = pose(0.38, -0.08, -0.58, 0.28, -0.05, 0.08)
        end = pose(0.2, -0.72, -0.88, -2.35, 0.02, 0.02)
        r = pose(0.36, -0.54, -0.72, -0.45, -0.1, 0.15)
        if (heavy) {
          w = pose(0.4, 0.08, -0.5, 0.5, -0.02, 0.02)
          end = pose(0.16, -0.78, -0.92, -2.7, 0.02, 0.01)
        }
      } else if (idx === 0) {
        // wide hammer sweep
        start = pose(0.4, -0.5, -0.72, -0.4, -0.2, 0.22)
        w = pose(0.64, -0.32, -0.6, -0.55, 0.1, -0.72)
        end = pose(0.03, -0.55, -0.74, -0.12, -0.2, 1.2)
        r = pose(0.38, -0.48, -0.7, -0.3, -0.1, 0.3)
      } else {
        start = pose(0.24, -0.5, -0.72, -0.4, -0.15, 0.95)
        w = pose(0.04, -0.36, -0.6, -0.55, 0.1, 1.25)
        end = pose(0.66, -0.54, -0.72, -0.08, -0.25, -0.9)
        r = pose(0.4, -0.48, -0.7, -0.3, -0.1, 0.05)
      }
    }
    if (phase === 'w') {
      return this.mixPose(start, w, easeOutQuint(t))
    }
    if (phase === 'a') {
      return this.mixPose(w, end, easeOutQuint(Math.min(1, t * 1.25)))
    }
    return this.mixPose(end, r, easeInOutQuad(t))
  }

  mixPose(a, b, t) {
    return {
      px: lerp(a.px, b.px, t), py: lerp(a.py, b.py, t), pz: lerp(a.pz, b.pz, t),
      rx: lerp(a.rx, b.rx, t), ry: lerp(a.ry, b.ry, t), rz: lerp(a.rz, b.rz, t)
    }
  }

  updateCamera(dt) {
    const bobAmt = this.alive ? clamp(Math.hypot(this.vel.x, this.vel.z) / 5, 0, 1) : 0
    const bobY = Math.abs(Math.sin(this.walkPhase)) * 0.045 * bobAmt
    const bobX = Math.sin(this.walkPhase * 0.5) * 0.02 * bobAmt
    let eyeY = 1.68 - bobY + Math.sin(this.time * 1.6) * 0.006
    let roll = Math.sin(this.walkPhase * 0.5) * 0.006 * bobAmt
    if (!this.alive) {
      const t = clamp(this.deadTime / 1.1, 0, 1)
      eyeY = lerp(1.68, 0.38, easeOutCubic(t))
      roll = lerp(0, 1.25, easeOutCubic(t))
    }
    if (this.dodgeTime > 0) roll += 0.05 * (this.dodgeTime / 0.2)
    if (this.charging) {
      const t = clamp(this.chargeTime / 1.0, 0, 1)
      eyeY -= 0.02 * t
      roll += Math.sin(this.time * 40) * 0.0025 * t
    }
    // camera kick from attacks
    const kick = this.attackState === 'active' ? 0.012 : 0
    const shake = this.shakeAmt
    const sx = (Math.random() - 0.5) * shake * 0.3
    const sy = (Math.random() - 0.5) * shake * 0.3
    const sz = (Math.random() - 0.5) * shake * 0.15
    this.camera.position.set(
      this.pos.x + bobX + sx,
      eyeY + sy,
      this.pos.z + sz
    )
    if (this.attackState === 'active') {
      const target = this.attackKind === 'heavy' ? 0.05 : 0.026
      this.camKick.x = lerp(this.camKick.x, target, 0.4)
    } else {
      this.camKick.x = damp(this.camKick.x, 0, 8, dt)
    }
    this.camera.rotation.order = 'YXZ'
    this.camera.rotation.y = this.yaw
    this.camera.rotation.x = this.pitch + this.camKick.x + (Math.random() - 0.5) * shake * 0.12
    this.camera.rotation.z = roll + (Math.random() - 0.5) * shake * 0.15
  }

  takeDamage(amount, attacker, weaponKind, dirVec) {
    if (!this.alive || this.invuln > 0 || this.executing > 0) return
    this.game?.clearRegen?.()
    let dmg = amount
    let parried = false
    // Which way would the player have to face to look at the attacker?
    const dxA = attacker.root.position.x - this.pos.x
    const dzA = attacker.root.position.z - this.pos.z
    const toAttacker = Math.atan2(-dxA, -dzA)
    let diff = toAttacker - this.yaw
    while (diff > Math.PI) diff -= TAU
    while (diff < -Math.PI) diff += TAU
    const blockingFront = this.blocking && Math.abs(diff) < 1.35
    if (blockingFront) {
      if (this.blockTime < this.parryWindow) {
        parried = true
        dmg = 0
        this.game?.onParry(attacker)
        sound.parry()
        this.shake(0.22)
        this.blockTime = 0.6
        this.invuln = Math.max(this.invuln, 0.35)
      } else {
        dmg = amount * 0.14
        sound.block()
        this.shake(0.12)
        this.blockTime = 0.6
      }
    }
    if (dmg > 0) {
      this.health = Math.max(0, this.health - dmg)
      this.hurtFlash = Math.min(1, this.hurtFlash + dmg / 40)
      this.shake(0.2 + dmg * 0.008)
      sound.playerHurt()
      this.game?.onPlayerHurt(dmg, attacker, dirVec)
      this.bloodied = (this.bloodied || 0) + 1
      if (this.health <= 0) this.die(attacker)
    }
    return { blocked: blockingFront, parried }
  }

  die(attacker) {
    if (!this.alive) return
    this.alive = false
    this.deadTime = 0
    this.blocking = false
    this.charging = false
    this.attackState = 'idle'
    this.game?.onPlayerDeath(attacker)
    sound.scream(0.75)
    sound.deathRattle()
    this.gore.blood.burst(new THREE.Vector3(this.pos.x, 1.1, this.pos.z), { count: 30, chaos: 2.5, size: 1.1 })
    this.gore.groundSplash({ x: this.pos.x, y: 0, z: this.pos.z })
  }

  eyePosition(out = new THREE.Vector3()) {
    return out.set(this.pos.x, 1.62, this.pos.z)
  }

  get blockingActive() { return this.blocking }
}
