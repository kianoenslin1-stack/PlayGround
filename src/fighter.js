import * as THREE from 'three'
import {
  TAU, clamp, lerp, damp, rand, randInt, chance, pick, makeMat, makeMesh, roman
} from './utils.js'
import { sound } from './audio.js'
import { ARENA_RADIUS } from './arena.js'

const SKIN = [0x9b6b4f, 0x84563a, 0x6f452f, 0xa97553, 0x5e3a28]
const LEATHER = [0x4b2f20, 0x5a3a26, 0x3a2419, 0x6b4326]
const CLOTH = [0x5c0d13, 0x3e0a10, 0x6d2415, 0x28201f, 0x4b3a1f]

export const ENEMY_TYPES = {
  duelist: {
    name: 'DUELIST',
    scale: 1,
    weapon: 'sword',
    speed: 2.35,
    damage: 15,
    reach: 2.15,
    windup: 0.52,
    recover: 0.42,
    cooldown: [0.9, 1.7],
    armor: 1,
    hp: { head: 30, torso: 110, arm: 36, leg: 48 }
  },
  brute: {
    name: 'BRUTE',
    scale: 1.16,
    weapon: 'hammer',
    speed: 1.55,
    damage: 27,
    reach: 2.45,
    windup: 0.78,
    recover: 0.64,
    cooldown: [1.3, 2.2],
    armor: 0.78,
    hp: { head: 46, torso: 170, arm: 58, leg: 72 }
  },
  executioner: {
    name: 'THE EXECUTIONER',
    scale: 1.32,
    weapon: 'axe',
    speed: 1.7,
    damage: 36,
    reach: 2.8,
    windup: 0.72,
    recover: 0.55,
    cooldown: [1.0, 1.8],
    armor: 0.62,
    hp: { head: 85, torso: 250, arm: 92, leg: 120 },
    boss: true
  }
}

function buildWeapon(kind, scale = 1) {
  const g = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ color: 0x9ba3ad, roughness: 0.32, metalness: 0.85 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x4a4b50, roughness: 0.45, metalness: 0.8 })
  const wood = new THREE.MeshStandardMaterial({ color: 0x3d2618, roughness: 0.9 })
  const brass = new THREE.MeshStandardMaterial({ color: 0x8a6a35, roughness: 0.45, metalness: 0.7 })
  const bloodMat = new THREE.MeshStandardMaterial({ color: 0x6b0810, roughness: 0.55 })

  if (kind === 'sword') {
    const grip = makeMesh(new THREE.CylinderGeometry(0.028, 0.032, 0.26, 6), wood, [0, -0.13, 0])
    const guard = makeMesh(new THREE.BoxGeometry(0.3, 0.045, 0.06), brass, [0, -0.27, 0])
    const blade = makeMesh(new THREE.BoxGeometry(0.075, 0.86, 0.022), steel, [0, -0.72, 0])
    const tip = makeMesh(new THREE.ConeGeometry(0.041, 0.16, 4), steel, [0, -1.22, 0])
    tip.rotation.y = Math.PI / 4
    const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.7, 0.026), darkSteel)
    fuller.position.set(0, -0.72, 0)
    g.add(grip, guard, blade, tip, fuller)
    const stain = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.5), bloodMat)
    stain.position.set(0.038, -0.78, 0.012)
    stain.rotation.y = Math.PI / 2
    stain.visible = false
    g.userData.stain = stain
    g.add(stain)
    g.userData.length = 1.22
  } else if (kind === 'hammer') {
    const handle = makeMesh(new THREE.CylinderGeometry(0.035, 0.045, 0.95, 7), wood, [0, -0.48, 0])
    const head = makeMesh(new THREE.BoxGeometry(0.46, 0.3, 0.28), darkSteel, [0, -0.98, 0])
    const faceL = makeMesh(new THREE.BoxGeometry(0.1, 0.34, 0.32), steel, [-0.25, -0.98, 0])
    const faceR = makeMesh(new THREE.BoxGeometry(0.1, 0.34, 0.32), steel, [0.25, -0.98, 0])
    const band = makeMesh(new THREE.CylinderGeometry(0.052, 0.052, 0.1, 7), brass, [0, -0.83, 0])
    g.add(handle, head, faceL, faceR, band)
    const stain = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.1, 0.3), bloodMat)
    stain.position.set(0, -1.02, 0)
    stain.visible = false
    g.userData.stain = stain
    g.add(stain)
    g.userData.length = 1.06
  } else {
    // executioner axe
    const handle = makeMesh(new THREE.CylinderGeometry(0.04, 0.05, 1.05, 7), wood, [0, -0.52, 0])
    const head = makeMesh(new THREE.BoxGeometry(0.5, 0.28, 0.12), darkSteel, [0.16, -1.02, 0])
    const blade = makeMesh(new THREE.BoxGeometry(0.3, 0.5, 0.05), steel, [0.44, -1.02, 0])
    blade.rotation.z = 0.2
    const spike = makeMesh(new THREE.ConeGeometry(0.06, 0.24, 5), steel, [-0.2, -1.02, 0])
    spike.rotation.z = Math.PI / 2
    g.add(handle, head, blade, spike)
    const stain = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.35), bloodMat)
    stain.position.set(0.46, -1.0, 0.03)
    stain.visible = false
    g.userData.stain = stain
    g.add(stain)
    g.userData.length = 1.2
  }
  g.scale.setScalar(scale)
  return g
}

export class Fighter {
  constructor(scene, gore, type, position, game) {
    this.scene = scene
    this.gore = gore
    this.game = game
    this.typeId = type
    this.type = ENEMY_TYPES[type]
    this.cfg = this.type
    this.scale = this.type.scale
    this.dead = false
    this.dying = false
    this.deathTimer = 0
    this.state = 'spawn'
    this.stateTime = 0
    this.attackCooldown = rand(0.5, 1.5)
    this.staggerTimer = 0
    this.blocking = false
    this.armGone = { l: false, r: false }
    this.legGone = { l: false, r: false }
    this.headGone = false
    this.struck = false
    this.walkPhase = rand(0, TAU)
    this.hitReact = 0
    this.hitReactDir = 0
    this.flash = 0
    this.bloodied = 0
    this.spawnPoint = position.clone()
    this.weaponKind = this.type.weapon
    this.partHp = {
      head: this.type.hp.head,
      torso: this.type.hp.torso,
      armL: this.type.hp.arm,
      armR: this.type.hp.arm,
      legL: this.type.hp.leg,
      legR: this.type.hp.leg
    }
    this.partMax = { ...this.partHp }
    this.hitParts = []
    this.severedParts = []
    this.attackTimer = 0
    this.attackIndex = 0
    this.moveSpeed = this.type.speed
    this.sideDir = chance(0.5) ? 1 : -1
    this.strafeTimer = rand(1, 2.4)
    this.facing = rand(0, TAU)
    this.wantBlock = chance(0.35)
    this.blockCooldown = rand(2, 5)
    this.wasHitByHeavy = false
    this.build()
    this.root.position.copy(position)
    this.root.rotation.y = this.facing
    scene.add(this.root)
    this.updateHitParts()
  }

  build() {
    const s = this.scale
    const skin = pick(SKIN)
    const leather = pick(LEATHER)
    const cloth = this.cfg.boss ? 0x1b1416 : pick(CLOTH)
    const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.72 })
    const leatherMat = new THREE.MeshStandardMaterial({ color: leather, roughness: 0.92 })
    const clothMat = new THREE.MeshStandardMaterial({ color: cloth, roughness: 0.95 })
    const ironMat = new THREE.MeshStandardMaterial({ color: this.cfg.boss ? 0x2b2b2f : 0x55575c, roughness: 0.4, metalness: 0.72 })
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3a, roughness: 0.38, metalness: 0.75 })
    const bloodMat = new THREE.MeshStandardMaterial({ color: 0x65080e, roughness: 0.5 })
    this.materials = { skinMat, leatherMat, clothMat, ironMat, bronzeMat, bloodMat }

    const root = new THREE.Group()
    root.name = 'fighter'
    this.root = root

    const hips = new THREE.Group()
    hips.position.y = 0.96
    root.add(hips)
    this.hips = hips

    const pelvis = makeMesh(new THREE.BoxGeometry(0.36, 0.26, 0.26), leatherMat, [0, 0, 0])
    hips.add(pelvis)
    this.pelvis = pelvis

    // skirt / loincloth
    const skirt = makeMesh(new THREE.CylinderGeometry(0.22, 0.3, 0.34, 8, 1, true), clothMat, [0, -0.1, 0])
    skirt.material = clothMat.clone()
    skirt.material.side = THREE.DoubleSide
    hips.add(skirt)

    const spine = new THREE.Group()
    spine.position.y = 0.13
    hips.add(spine)
    this.spine = spine

    const torso = makeMesh(new THREE.BoxGeometry(0.5, 0.48, 0.29), skinMat, [0, 0.26, 0])
    torso.geometry = this.taperBox(0.5, 0.42, 0.48, 0.3)
    spine.add(torso)
    this.torso = torso

    // chest armour
    if (this.cfg.boss) {
      const armor = makeMesh(new THREE.BoxGeometry(0.58, 0.4, 0.36), ironMat, [0, 0.3, 0.01])
      spine.add(armor)
      this.armorMesh = armor
      for (const sx of [-1, 1]) {
        const spike = makeMesh(new THREE.ConeGeometry(0.07, 0.28, 5), ironMat, [sx * 0.26, 0.52, 0])
        spine.add(spike)
      }
    } else if (this.typeId === 'duelist') {
      const strap = makeMesh(new THREE.BoxGeometry(0.56, 0.12, 0.33), leatherMat, [0, 0.32, 0])
      spine.add(strap)
      const belt = makeMesh(new THREE.BoxGeometry(0.54, 0.1, 0.34), bronzeMat, [0, 0.05, 0])
      spine.add(belt)
    } else {
      const strap = makeMesh(new THREE.BoxGeometry(0.34, 0.5, 0.34), leatherMat, [0, 0.28, 0])
      strap.rotation.y = 0.45
      spine.add(strap)
    }

    const neck = new THREE.Group()
    neck.position.set(0, 0.53, 0)
    spine.add(neck)
    this.neck = neck

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.165, 12, 10), skinMat)
    head.scale.set(0.92, 1.08, 0.95)
    head.position.y = 0.15
    head.castShadow = true
    head.receiveShadow = true
    neck.add(head)
    this.head = head

    // face: eyes and mouth
    const eyeMat = new THREE.MeshBasicMaterial({ color: this.cfg.boss ? 0xff5a2a : 0x120909 })
    for (const sx of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.021, 5, 4), eyeMat)
      eye.position.set(sx * 0.058, 0.18, 0.148)
      neck.add(eye)
    }
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.012, 0.02), eyeMat)
    mouth.position.set(0, 0.08, 0.152)
    neck.add(mouth)

    if (this.typeId === 'duelist') {
      const helm = makeMesh(new THREE.CylinderGeometry(0.18, 0.19, 0.16, 10), bronzeMat, [0, 0.28, 0])
      const crest = makeMesh(new THREE.BoxGeometry(0.03, 0.14, 0.26), clothMat, [0, 0.39, 0])
      const guardN = makeMesh(new THREE.BoxGeometry(0.04, 0.12, 0.03), bronzeMat, [0, 0.17, 0.17])
      neck.add(helm, crest, guardN)
    } else if (this.cfg.boss) {
      const helm = makeMesh(new THREE.CylinderGeometry(0.2, 0.21, 0.24, 10), ironMat, [0, 0.28, 0])
      for (const sx of [-1, 1]) {
        const horn = makeMesh(new THREE.ConeGeometry(0.06, 0.42, 6), bronzeMat, [sx * 0.17, 0.38, 0])
        horn.rotation.z = sx * 0.65
        horn.rotation.x = -0.2
        neck.add(horn)
      }
      neck.add(helm)
    } else {
      const mask = makeMesh(new THREE.BoxGeometry(0.24, 0.2, 0.08), ironMat, [0, 0.16, 0.13])
      const strap = makeMesh(new THREE.BoxGeometry(0.35, 0.07, 0.35), leatherMat, [0, 0.2, 0])
      neck.add(mask, strap)
    }

    // arms
    const armGroups = {}
    for (const side of [-1, 1]) {
      const key = side < 0 ? 'l' : 'r'
      const shoulder = new THREE.Group()
      shoulder.position.set(side * 0.3, 0.47, 0)
      spine.add(shoulder)
      const upper = makeMesh(new THREE.CylinderGeometry(0.075, 0.062, 0.36, 7), skinMat, [0, -0.18, 0])
      shoulder.add(upper)
      if (this.cfg.boss) {
        const pauldron = makeMesh(new THREE.SphereGeometry(0.14, 7, 5), ironMat, [side * 0.03, 0.02, 0])
        pauldron.scale.set(1, 0.8, 1)
        shoulder.add(pauldron)
      }
      const elbow = new THREE.Group()
      elbow.position.y = -0.37
      shoulder.add(elbow)
      const fore = makeMesh(new THREE.CylinderGeometry(0.06, 0.05, 0.33, 7), skinMat, [0, -0.16, 0])
      elbow.add(fore)
      if (key === 'l') {
        // bracer
        const bracer = makeMesh(new THREE.CylinderGeometry(0.065, 0.06, 0.14, 7), leatherMat, [0, -0.26, 0])
        elbow.add(bracer)
      }
      const hand = new THREE.Group()
      hand.position.y = -0.34
      elbow.add(hand)
      const fist = makeMesh(new THREE.SphereGeometry(0.062, 7, 5), skinMat, [0, 0, 0])
      hand.add(fist)
      armGroups[key] = { shoulder, upper, elbow, fore, hand }
    }
    this.arms = armGroups

    // shoulders (visual)
    // legs
    const legGroups = {}
    for (const side of [-1, 1]) {
      const key = side < 0 ? 'l' : 'r'
      const thigh = new THREE.Group()
      thigh.position.set(side * 0.125, -0.06, 0)
      hips.add(thigh)
      const thighMesh = makeMesh(new THREE.CylinderGeometry(0.09, 0.075, 0.42, 7), skinMat, [0, -0.22, 0])
      thigh.add(thighMesh)
      const knee = new THREE.Group()
      knee.position.y = -0.44
      thigh.add(knee)
      const shin = makeMesh(new THREE.CylinderGeometry(0.072, 0.055, 0.4, 7), skinMat, [0, -0.2, 0])
      knee.add(shin)
      const shinGuard = makeMesh(new THREE.CylinderGeometry(0.083, 0.07, 0.2, 7), leatherMat, [0, -0.16, 0.01])
      knee.add(shinGuard)
      const foot = makeMesh(new THREE.BoxGeometry(0.13, 0.08, 0.24), leatherMat, [0, -0.41, 0.05])
      knee.add(foot)
      legGroups[key] = { thigh, thighMesh, knee, shin, foot }
    }
    this.legs = legGroups

    // weapon in right hand
    const weapon = buildWeapon(this.weaponKind, this.weaponKind === 'axe' ? 1.15 : 1)
    weapon.position.set(0, 0, 0)
    weapon.rotation.x = 0.18
    armGroups.r.hand.add(weapon)
    this.weapon = weapon
    this.weaponRest = weapon.rotation.clone()

    // telegraph glint
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = glowCanvas.height = 64
    const gc = glowCanvas.getContext('2d')
    const grad = gc.createRadialGradient(32, 32, 2, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,220,190,1)')
    grad.addColorStop(0.35, 'rgba(255,80,40,0.7)')
    grad.addColorStop(1, 'rgba(255,20,10,0)')
    gc.fillStyle = grad
    gc.fillRect(0, 0, 64, 64)
    const glowTex = new THREE.CanvasTexture(glowCanvas)
    this.glint = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0xff6a3a, transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, opacity: 0
    }))
    this.glint.scale.set(0.7, 0.7, 1)
    this.glint.position.set(0, -1.0, 0)
    weapon.add(this.glint)

    // scale whole body
    if (s !== 1) {
      hips.scale.setScalar(s)
      hips.position.y *= s
      root.scale.setScalar(1)
    }

    root.traverse((o) => {
      if (o.isMesh) { o.castShadow = !this.game?.low; o.receiveShadow = true }
    })

    this.baseHipY = hips.position.y
  }

  taperBox(topW, bottomW, h, depth) {
    const geo = new THREE.BoxGeometry(1, 1, 1)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const k = y > 0 ? topW : bottomW
      pos.setX(i, pos.getX(i) * k)
      pos.setY(i, pos.getY(i) * h)
      pos.setZ(i, pos.getZ(i) * depth)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }

  updateHitParts() {
    if (this.dead && this.state === 'dead') { this.hitParts = []; return }
    this.root.updateWorldMatrix(true, true)
    const parts = []
    const add = (key, mesh, radius, offsetY = 0) => {
      const p = new THREE.Vector3()
      mesh.getWorldPosition(p)
      p.y += offsetY
      parts.push({ key, pos: p, radius: radius * this.scale })
    }
    add('head', this.head, 0.19, 0)
    add('torso', this.torso, 0.3, 0.02)
    add('torso', this.torso, 0.25, -0.2)
    if (!this.armGone.l) {
      add('armL', this.arms.l.upper, 0.13)
      add('armL', this.arms.l.fore, 0.12)
    }
    if (!this.armGone.r) {
      add('armR', this.arms.r.upper, 0.13)
      add('armR', this.arms.r.fore, 0.12)
    }
    if (!this.legGone.l) {
      add('legL', this.legs.l.thighMesh, 0.14)
      add('legL', this.legs.l.shin, 0.12)
    }
    if (!this.legGone.r) {
      add('legR', this.legs.r.thighMesh, 0.14)
      add('legR', this.legs.r.shin, 0.12)
    }
    this.hitParts = parts
  }

  weaponSegment(outA, outB) {
    this.weapon.updateWorldMatrix(true, false)
    outA.set(0, -0.05, 0)
    outB.set(0, -this.weapon.userData.length, 0)
    this.weapon.localToWorld(outA)
    this.weapon.localToWorld(outB)
  }

  /** Returns the best part hit by a world-space segment. */
  hitTest(a, b, padding = 0.06) {
    if (this.dead) return null
    let best = null
    let bestScore = Infinity
    const v = new THREE.Vector3()
    for (const part of this.hitParts) {
      v.copy(part.pos)
      const ab = new THREE.Vector3().subVectors(b, a)
      const apx = v.x - a.x, apy = v.y - a.y, apz = v.z - a.z
      const denom = ab.lengthSq()
      let t = denom > 1e-8 ? (apx * ab.x + apy * ab.y + apz * ab.z) / denom : 0
      t = clamp(t, 0, 1)
      const dx = apx - ab.x * t, dy = apy - ab.y * t, dz = apz - ab.z * t
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist > part.radius + padding) continue
      let score = dist / part.radius
      if (part.key === 'head') score -= 0.22
      if (part.key === 'torso') score += 0.1
      if (score < bestScore) {
        bestScore = score
        best = { ...part, point: new THREE.Vector3(v.x, v.y, v.z), distance: dist }
      }
    }
    return best
  }

  takeHit(partKey, damage, hitType, dir, point, opts = {}) {
    if (this.dead) return null
    const key = partKey === 'armL' || partKey === 'armR' ? partKey : partKey
    const side = key.endsWith('L') ? 'l' : key.endsWith('R') ? 'r' : null
    // block?
    if (this.blocking && opts.fromPlayer && this.state === 'block' && opts.frontal !== false) {
      sound.block()
      this.game?.onEnemyBlocked(this, point)
      this.staggerTimer = Math.max(this.staggerTimer, 0.18)
      return { blocked: true }
    }

    const isHead = key === 'head'
    const isTorso = key === 'torso'
    const isArm = key.startsWith('arm')
    const isLeg = key.startsWith('leg')
    const mult = isHead ? 1.55 : isTorso ? 1.0 : isArm ? 0.92 : 0.85
    const armor = this.type.armor
    const applied = Math.max(1, damage * mult * armor)

    if (key in this.partHp) this.partHp[key] -= applied

    this.hitReact = 0.28
    this.hitReactDir = rand(-1, 1)
    this.flash = 0.12
    this.bloodied++

    // stagger logic
    const heavy = damage > 40 || hitType === 'crush'
    if (this.cfg.boss) this.staggerTimer = Math.max(this.staggerTimer, heavy ? 0.25 : 0)
    else if (heavy || isHead) this.staggerTimer = Math.max(this.staggerTimer, heavy ? 0.85 : 0.5)
    else if (chance(0.25)) this.staggerTimer = Math.max(this.staggerTimer, 0.35)

    if (this.staggerTimer > 0.3 && !this.cfg.boss) {
      this.state = 'stagger'
      this.stateTime = 0
      this.attackTimer = 0
    }

    let destroyed = false
    let deathKind = null

    if (key === 'head' && this.partHp.head <= 0) {
      destroyed = true
      deathKind = hitType === 'crush' ? 'explode' : 'decap'
    } else if (isArm && this.partHp[key] <= 0) {
      destroyed = true
      // arm destroyed at shoulder
    } else if (isLeg && this.partHp[key] <= 0) {
      destroyed = true
    } else if (isTorso && this.partHp.torso <= 0) {
      destroyed = true
      deathKind = hitType === 'crush' ? 'chestburst' : 'bisect'
    }

    if (this.partHp[key] !== undefined && this.partHp[key] <= 0) {
      this.partHp[key] = 0
    }

    return { applied, destroyed, deathKind, key, side, heavy, hitType }
  }

  checkDestroy(result, dir, point) {
    if (!result || !result.destroyed || this.dead) return
    const { key, side, deathKind, hitType } = result
    const game = this.game
    if (key === 'head') {
      if (deathKind === 'explode') {
        this.explodeHead(dir, point)
      } else {
        this.decapitate(dir, point)
      }
      return
    }
    if (key.startsWith('arm')) {
      this.severArm(side, dir, point, hitType === 'crush')
      return
    }
    if (key.startsWith('leg')) {
      this.severLeg(side, dir, point, hitType === 'crush')
      return
    }
    if (key === 'torso') {
      if (deathKind === 'chestburst') this.chestBurst(dir, point)
      else this.bisect(dir, point)
    }
  }

  get stumpMat() {
    if (!this._stumpMat) this._stumpMat = new THREE.MeshStandardMaterial({ color: 0x5a0309, roughness: 0.45 })
    return this._stumpMat
  }

  addStump(parent, x, y, z, r = 0.09) {
    const stump = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), this.stumpMat)
    stump.position.set(x, y, z)
    stump.scale.set(1, 0.7, 1)
    parent.add(stump)
    return stump
  }

  worldOf(object, offsetY = 0) {
    const v = new THREE.Vector3()
    object.getWorldPosition(v)
    v.y += offsetY
    return v
  }

  severArm(side, dir, point, crushed = false) {
    if (this.armGone[side]) return
    this.armGone[side] = true
    const arm = this.arms[side]
    const socket = this.worldOf(arm.shoulder)
    const wasWeapon = side === 'r' && !!this.weapon
    const group = arm.shoulder
    // ensure world matrices up to date
    this.root.updateWorldMatrix(true, true)
    this.scene.attach(group)
    if (wasWeapon && this.weapon) {
      this.weapon.userData.stain && (this.weapon.userData.stain.visible = true)
    }
    this.gore.limbSever(socket, dir, group, 0.25)
    if (crushed) {
      this.gore.blood.burst(socket, { count: 42, chaos: 3.5, size: 1.15, vy: 2.4 })
      this.gore.bloodSpray(socket, dir, 24, 4.2, 1.1)
      for (let i = 0; i < 9; i++) this.gore.gib(socket, dir, i % 2 === 0 ? 'bone' : 'meat')
      sound.crush()
    } else {
      sound.sever()
    }
    if (wasWeapon) {
      // the arm still holds the weapon; drop later is impossible. Mark as lost.
      this.weaponDropped = true
      this.weapon = null
    }
    // stump on shoulder
    this.addStump(this.spine, side === 'l' ? -0.3 : 0.3, 0.47, 0, 0.1)
    this.game?.onDismember(this, side === 'r' ? 'ARM' : 'LEFT ARM', socket, crushed ? 'crush' : 'sever')
    this.staggerTimer = Math.max(this.staggerTimer, 0.7)
    if (!this.dead) {
      this.state = 'stagger'
      this.stateTime = 0
    }
    if (wasWeapon) {
      this.game?.addFloater(socket, 'DISARMED', 'gold')
    } else if (crushed) {
      this.game?.addFloater(socket, 'ARM CRUSHED', 'gore')
    }
  }

  severLeg(side, dir, point, crushed = false) {
    if (this.legGone[side]) return
    this.legGone[side] = true
    const leg = this.legs[side]
    const socket = this.worldOf(leg.thigh, -0.1)
    this.root.updateWorldMatrix(true, true)
    this.scene.attach(leg.thigh)
    this.gore.limbSever(socket, dir, leg.thigh, 0.24)
    if (crushed) {
      this.gore.blood.burst(socket, { count: 36, chaos: 3.2, size: 1.1, vy: 2.2 })
      for (let i = 0; i < 7; i++) this.gore.gib(socket, dir, i % 2 === 0 ? 'bone' : 'meat')
      sound.crush()
    } else {
      sound.sever()
    }
    this.addStump(this.hips, side === 'l' ? -0.125 : 0.125, -0.06, 0, 0.11)
    this.moveSpeed *= 0.45
    this.game?.onDismember(this, side === 'r' ? 'LEG' : 'LEFT LEG', socket, crushed ? 'crush' : 'sever')
    if (this.legGone.l && this.legGone.r) {
      this.die('collapse', dir, socket)
    } else {
      this.staggerTimer = Math.max(this.staggerTimer, 1.0)
      this.state = 'stagger'
      this.stateTime = 0
      this.game?.addFloater(socket, crushed ? 'LEG PULVERIZED' : 'HAMSTRUNG', crushed ? 'gore' : 'gold')
    }
  }

  decapitate(dir, point) {
    if (this.dead) return
    const neck = this.neck
    const pos = this.worldOf(neck, 0.06)
    this.root.updateWorldMatrix(true, true)
    this.scene.attach(neck)
    this.headGone = true
    this.gore.headDetach(pos, dir, neck)
    // neck stump
    this.addStump(this.spine, 0, 0.54, 0, 0.12)
    this.weaponDropAt = this.worldOf(this.weapon || this.arms.r.hand, -0.4)
    sound.sever()
    this.game?.onDismember(this, 'HEAD', pos, 'decap')
    this.die('decap', dir, pos, true)
  }

  explodeHead(dir, point) {
    if (this.dead) return
    const pos = this.worldOf(this.neck, 0.13)
    this.root.updateWorldMatrix(true, true)
    if (this.neck.parent) {
      this.scene.attach(this.neck)
      this.neck.visible = false
    }
    this.headGone = true
    this.gore.headExplode(pos, dir)
    this.addStump(this.spine, 0, 0.54, 0, 0.13)
    this.game?.onDismember(this, 'SKULL CRUSHED', pos, 'crush')
    this.die('explode', dir, pos, true)
    this.game?.addFloater(pos, 'SKULL CRUSHED', 'gore')
  }

  chestBurst(dir, point) {
    if (this.dead) return
    const pos = this.worldOf(this.torso, 0.05)
    // Tear the chest open instead of leaving an intact torso behind.
    this.torso.visible = false
    if (this.armorMesh) this.armorMesh.visible = false
    const cavity = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), this.stumpMat)
    cavity.scale.set(1.15, 1.05, 0.58)
    cavity.position.set(0, 0.26, 0.02)
    this.spine.add(cavity)
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xc9b892, roughness: 0.72 })
    for (let i = 0; i < 7; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(rand(0.14, 0.27), 0.026, 0.03), boneMat)
      rib.position.set(rand(-0.1, 0.1), 0.13 + i * 0.047, 0.135)
      rib.rotation.z = rand(-0.55, 0.55)
      this.spine.add(rib)
    }
    this.gore.blood.burst(pos, { count: 110, chaos: 5, size: 1.5 })
    this.gore.bloodSpray(pos, { x: dir.x, y: 0.4, z: dir.z }, 45, 6, 1.4)
    for (let i = 0; i < 14; i++) this.gore.gib(pos, dir, i % 3 === 0 ? 'bone' : 'meat')
    this.gore.groundSplash(pos)
    this.gore.spillGuts(pos, dir)
    this.game?.onDismember(this, 'RIB CAGE SHATTERED', pos, 'crush')
    this.game?.addFloater(pos, 'CHEST CAVED IN', 'gore')
    sound.crush()
    this.die('chestburst', dir, pos, true)
  }

  bisect(dir, point) {
    if (this.dead) return
    this.dead = true
    this.dying = true
    this.state = 'dead'
    this.hitParts = []
    const cut = this.worldOf(this.hips, 0.16)
    this.root.updateWorldMatrix(true, true)
    const upper = this.spine
    const lower = this.hips
    this.scene.attach(upper)
    this.scene.attach(lower)
    this.scene.remove(this.root)
    this.gore.bisect(cut, dir, upper, lower)
    this.game?.onDismember(this, 'BISECTED', cut, 'bisect')
    this.game?.addFloater(cut, 'CUT IN HALF', 'gore')
    this.game?.onKill(this, 'BISECTED', cut)
    this.dropWeaponAt(cut, dir)
  }

  die(mode, dir, point, silentKill) {
    if (this.dead) return
    this.dead = true
    this.dying = true
    this.state = 'dead'
    this.deathTimer = 0
    this.deathMode = mode
    this.hitParts = []
    this.blocking = false
    const p = point || this.worldOf(this.hips)
    this.gore.groundSplash(p)
    this.gore.pools.add(p.x, p.z, rand(1.3, 2.0))
    this.dropWeaponAt(p, dir)
    this.game?.onKill(this, mode === 'explode' ? 'SKULL CRUSHED' : mode === 'chestburst' ? 'CHEST CAVED IN' : 'SLAIN', p)
    sound.deathRattle()
    if (!silentKill) sound.scream(rand(0.8, 1.2))
    this.fallDir = Math.atan2(dir.x, dir.z)
    this.fallSign = chance(0.5) ? 1 : -1
  }

  dropWeaponAt(pos, dir) {
    if (!this.weapon || this.weaponDropped || this.weaponLocked) return
    const weapon = this.weapon
    if (!weapon.parent) return
    this.root.updateWorldMatrix(true, true)
    const wp = new THREE.Vector3()
    weapon.getWorldPosition(wp)
    this.scene.attach(weapon)
    weapon.position.copy(wp)
    this.weapon = null
    this.weaponDropped = true
    const angle = rand(0, TAU)
    this.gore.debris.add(weapon, {
      x: Math.cos(angle) * rand(0.4, 1.4), y: rand(0.8, 2), z: Math.sin(angle) * rand(0.4, 1.4)
    }, { x: rand(-5, 5), y: rand(-5, 5), z: rand(-5, 5) }, 0.15, { restY: 0.06 })
    this.game?.onWeaponDrop(this.weaponKind, weapon)
  }

  /** Finisher used by the player on a staggered enemy. */
  execute(kind, dir) {
    if (this.dead) return
    const headPos = this.worldOf(this.neck, 0.12)
    this.dead = true
    this.dying = true
    this.state = 'dead'
    this.hitParts = []
    if (kind === 'hammer') {
      this.gore.headExplode(headPos, dir)
      if (this.neck.parent) { this.scene.attach(this.neck); this.neck.visible = false }
      this.addStump(this.spine, 0, 0.54, 0, 0.14)
      this.game?.addFloater(headPos, 'SKULL CRUSHED', 'gore')
    } else {
      this.root.updateWorldMatrix(true, true)
      this.scene.attach(this.neck)
      this.gore.headDetach(headPos, dir, this.neck)
      this.addStump(this.spine, 0, 0.54, 0, 0.12)
      this.game?.addFloater(headPos, 'DECAPITATED', 'gore')
    }
    this.game?.onDismember(this, kind === 'hammer' ? 'EXECUTION' : 'DECAPITATION', headPos, 'execute')
    sound.sever()
    sound.scream(0.7)
    this.game?.onKill(this, kind === 'hammer' ? 'SKULL CRUSHED' : 'DECAPITATED', headPos, true)
    this.gore.groundSplash(headPos)
    this.dropWeaponAt(headPos, dir)
    this.fallDir = Math.atan2(dir.x, dir.z)
    this.fallSign = chance(0.5) ? 1 : -1
  }

  update(dt, time, player, others) {
    this.stateTime += dt
    if (this.staggerTimer > 0) this.staggerTimer -= dt
    this.attackCooldown -= dt
    this.hitReact = Math.max(0, this.hitReact - dt)
    this.flash = Math.max(0, this.flash - dt)
    if (this.blockCooldown > 0) this.blockCooldown -= dt

    if (this.dead) {
      this.updateDeath(dt)
      return
    }

    // face the player
    const dx = player.pos.x - this.root.position.x
    const dz = player.pos.z - this.root.position.z
    const dist = Math.hypot(dx, dz)
    const targetYaw = Math.atan2(dx, dz)
    let dy = targetYaw - this.root.rotation.y
    while (dy > Math.PI) dy -= TAU
    while (dy < -Math.PI) dy += TAU
    const turnRate = this.state === 'windup' ? 8 : 4.4
    this.root.rotation.y += dy * Math.min(1, turnRate * dt)

    // state machine
    if (this.staggerTimer > 0) {
      if (this.state !== 'stagger') { this.state = 'stagger'; this.stateTime = 0 }
    } else if (this.state === 'stagger') {
      this.state = 'chase'
      this.stateTime = 0
      this.attackCooldown = Math.max(this.attackCooldown, 0.18)
    }

    let moveX = 0, moveZ = 0
    let wantSpeed = 0
    const forwardX = Math.sin(this.root.rotation.y)
    const forwardZ = Math.cos(this.root.rotation.y)
    const rightX = Math.cos(this.root.rotation.y)
    const rightZ = -Math.sin(this.root.rotation.y)

    if (this.state === 'spawn') {
      if (this.stateTime > 0.7) { this.state = 'chase'; this.stateTime = 0 }
    }

    if (this.state === 'chase' || this.state === 'strafe') {
      this.strafeTimer -= dt
      const stopRange = this.cfg.reach * 0.72
      if (dist > stopRange) {
        moveX = dx / (dist || 1)
        moveZ = dz / (dist || 1)
        wantSpeed = this.moveSpeed
      } else {
        // circle
        this.state = 'strafe'
        moveX = rightX * this.sideDir * 0.7 - (dx / (dist || 1)) * 0.25
        moveZ = rightZ * this.sideDir * 0.7 - (dz / (dist || 1)) * 0.25
        wantSpeed = this.moveSpeed * 0.55
      }
      if (this.strafeTimer <= 0) {
        this.strafeTimer = rand(1.2, 2.8)
        this.sideDir *= -1
        if (chance(0.3)) this.state = 'chase'
      }
      // block when player is winding up nearby
      if (player.attackState === 'windup' && dist < 3.6 && this.blockCooldown <= 0 && !this.armGone.r) {
        if (this.wantBlock || chance(0.45)) {
          this.state = 'block'
          this.stateTime = 0
          this.blockCooldown = rand(2.5, 4.5)
          this.blocking = true
        }
      }
    }

    if (this.state === 'block') {
      this.blocking = true
      if (this.stateTime > 0.85 || dist > 3.4) {
        this.state = 'chase'
        this.stateTime = 0
        this.blocking = false
      }
    } else {
      this.blocking = false
    }

    // begin attack
    const canAttack = !this.armGone.r && this.attackCooldown <= 0 &&
      (this.state === 'chase' || this.state === 'strafe') && dist < this.cfg.reach && dist > 0.8
    if (canAttack) {
      this.state = 'windup'
      this.stateTime = 0
      this.struck = false
      this.attackIndex = (this.attackIndex + 1) % 3
      this.attackCooldown = rand(this.cfg.cooldown[0], this.cfg.cooldown[1])
      if (chance(0.3)) sound.scream(rand(0.9, 1.3))
    }

    if (this.state === 'windup') {
      this.glint.material.opacity = clamp(this.stateTime / this.cfg.windup, 0, 1) * 0.75
      this.glint.scale.setScalar(0.5 + Math.sin(time * 22) * 0.08 + this.stateTime * 0.4)
      if (this.stateTime >= this.cfg.windup) {
        this.state = 'strike'
        this.stateTime = 0
        sound.swing(this.weaponKind, 0.4)
        this.glint.material.opacity = 0
      }
    } else {
      this.glint.material.opacity = Math.max(0, this.glint.material.opacity - dt * 4)
    }

    if (this.state === 'strike') {
      if (!this.struck && this.stateTime > this.cfg.windup * 0.06 + 0.05) {
        this.struck = true
        this.resolveAttack(player)
      }
      if (this.stateTime > 0.22) {
        this.state = 'recover'
        this.stateTime = 0
      }
    } else if (this.state === 'recover') {
      if (this.stateTime > this.cfg.recover) {
        this.state = 'chase'
        this.stateTime = 0
        this.attackCooldown = Math.max(this.attackCooldown, rand(0.2, 0.6))
      }
    }

    // movement
    if (this.staggerTimer <= 0 && (this.state === 'chase' || this.state === 'strafe' || this.state === 'spawn')) {
      const sep = this.separation(others)
      moveX += sep.x
      moveZ += sep.z
      const len = Math.hypot(moveX, moveZ)
      if (len > 1) { moveX /= len; moveZ /= len }
      const px = player.pos.x - this.root.position.x
      const pz = player.pos.z - this.root.position.z
      const pd = Math.hypot(px, pz) || 1
      if (pd < 0.95) {
        moveX -= (px / pd) * 0.8
        moveZ -= (pz / pd) * 0.8
      }
      this.root.position.x += moveX * wantSpeed * dt
      this.root.position.z += moveZ * wantSpeed * dt
      const r = Math.hypot(this.root.position.x, this.root.position.z)
      if (r > ARENA_RADIUS - 0.6) {
        this.root.position.x *= (ARENA_RADIUS - 0.6) / r
        this.root.position.z *= (ARENA_RADIUS - 0.6) / r
      }
      this.walkPhase += dt * (wantSpeed > 0.1 ? 6.2 : 2.4) * (this.moveSpeed / 2)
      this.animWalk(wantSpeed / Math.max(0.1, this.moveSpeed))
    } else {
      this.animWalk(0)
    }

    // pose / animations
    this.animate(dt, time, player)
    this.updateHitParts()

    // weapon stain builds up
    if (this.weapon && this.weapon.userData.stain) {
      this.weapon.userData.stain.visible = this.bloodied > 0
    }
  }

  separation(others) {
    let sx = 0, sz = 0
    for (const o of others) {
      if (o === this || o.dead) continue
      const dx = this.root.position.x - o.root.position.x
      const dz = this.root.position.z - o.root.position.z
      const d = Math.hypot(dx, dz)
      if (d > 0.001 && d < 1.5) {
        sx += (dx / d) * (1.5 - d) * 0.9
        sz += (dz / d) * (1.5 - d) * 0.9
      }
    }
    return { x: sx, z: sz }
  }

  resolveAttack(player) {
    const dx = player.pos.x - this.root.position.x
    const dz = player.pos.z - this.root.position.z
    const dist = Math.hypot(dx, dz)
    const reach = this.cfg.reach * (this.weaponKind === 'hammer' ? 1.02 : 1)
    if (dist > reach + 0.45) return
    const forwardX = Math.sin(this.root.rotation.y)
    const forwardZ = Math.cos(this.root.rotation.y)
    const dot = (dx * forwardX + dz * forwardZ) / (dist || 1)
    if (dot < 0.35) return
    const dmg = this.cfg.damage * (this.armGone.r ? 0.3 : 1) * (0.85 + Math.random() * 0.3)
    this.game?.enemyHitPlayer(this, dmg, this.weaponKind)
  }

  animWalk(amount) {
    const w = this.walkPhase
    const swing = Math.sin(w) * 0.55 * amount
    this.legs.l.thigh.rotation.x = swing
    this.legs.r.thigh.rotation.x = -swing
    this.legs.l.knee.rotation.x = Math.max(0, -Math.sin(w)) * 0.7 * amount
    this.legs.r.knee.rotation.x = Math.max(0, Math.sin(w)) * 0.7 * amount
    const bob = Math.abs(Math.sin(w)) * 0.035 * amount
    this.hips.position.y = this.baseHipY + bob
    if (!this.armGone.l) this.arms.l.shoulder.rotation.x = -swing * 0.7
    if (!this.armGone.r) this.arms.r.shoulder.rotation.x = swing * 0.55
    this._walkAmount = amount
  }

  animate(dt, time, player) {
    // base posture
    let spineX = 0, spineY = 0, spineZ = 0
    let shR = { x: 0, y: 0, z: 0 }
    let elR = -0.25
    let shL = { x: 0, y: 0, z: 0 }, elL = -0.18
    let hipDrop = 0

    if (this.state === 'chase' || this.state === 'strafe' || this.state === 'spawn') {
      spineX = 0.06
      shR.x += -0.3
      elR = -0.5
      shL.x = -0.15
      elL = -0.35
    }

    if (this.state === 'windup') {
      const t = clamp(this.stateTime / this.cfg.windup, 0, 1)
      const e = t * t
      if (this.weaponKind === 'hammer' || this.weaponKind === 'axe') {
        shR.x = lerp(-0.3, -2.55, e)
        shR.z = lerp(0, -0.25, e)
        elR = lerp(-0.5, -0.35, e)
        spineX = lerp(0.06, -0.22, e)
        spineY = lerp(0, 0.32, e)
      } else {
        shR.x = lerp(-0.3, -1.75, e)
        shR.z = lerp(0, 0.55, e)
        elR = lerp(-0.5, -1.1, e)
        spineX = lerp(0.06, -0.12, e)
        spineY = lerp(0, 0.55, e)
      }
      shL.x = -0.5; elL = -0.8
    } else if (this.state === 'strike') {
      const t = clamp(this.stateTime / 0.2, 0, 1)
      const e = 1 - Math.pow(1 - t, 2)
      if (this.weaponKind === 'hammer' || this.weaponKind === 'axe') {
        shR.x = lerp(-2.55, 0.55, e)
        shR.z = lerp(-0.25, 0.1, e)
        elR = lerp(-0.35, -0.15, e)
        spineX = lerp(-0.22, 0.42, e)
        spineY = lerp(0.32, -0.35, e)
        hipDrop = Math.sin(t * Math.PI) * 0.08
      } else {
        shR.x = lerp(-1.75, -0.2, e)
        shR.z = lerp(0.55, -0.7, e)
        elR = lerp(-1.1, -0.35, e)
        spineX = lerp(-0.12, 0.14, e)
        spineY = lerp(0.55, -0.6, e)
        hipDrop = Math.sin(t * Math.PI) * 0.04
      }
      shL.x = -0.3; elL = -0.6
    } else if (this.state === 'recover') {
      const t = clamp(this.stateTime / this.cfg.recover, 0, 1)
      shR.x = lerp(0.4, -0.3, t)
      shR.z = lerp(0.2, 0, t)
      elR = -0.45
      spineX = lerp(0.2, 0.06, t)
      spineY = lerp(-0.2, 0, t)
    } else if (this.state === 'block') {
      shL.x = -1.35
      shL.z = 0.65
      elL = -1.55
      shR.x = -0.5
      elR = -0.8
      spineX = 0.12
      spineY = 0.25
    } else if (this.state === 'stagger' || this.staggerTimer > 0) {
      const t = clamp(this.stateTime / 0.4, 0, 1)
      spineX = -0.25 - Math.sin(t * 20) * 0.06
      spineZ = 0.18 * (1 - t) + this.hitReactDir * 0.1
      shR.x = 0.4
      shL.x = 0.5
      elR = -0.2
      hipDrop = 0.06
    }

    // hit flinch overlay
    if (this.hitReact > 0) {
      const k = this.hitReact / 0.28
      spineX += 0.35 * k
      spineZ += this.hitReactDir * 0.25 * k
      hipDrop += 0.02 * k
    }

    // apply with smoothness
    const k = 1 - Math.exp(-18 * dt)
    this.spine.rotation.x += (spineX - this.spine.rotation.x) * k
    this.spine.rotation.y += (spineY - this.spine.rotation.y) * k
    this.spine.rotation.z += (spineZ - this.spine.rotation.z) * k
    if (!this.armGone.r) {
      this.arms.r.shoulder.rotation.x += (shR.x - this.arms.r.shoulder.rotation.x) * k
      this.arms.r.shoulder.rotation.z += (shR.z - this.arms.r.shoulder.rotation.z) * k
      this.arms.r.elbow.rotation.x += (elR - this.arms.r.elbow.rotation.x) * k
    }
    if (!this.armGone.l) {
      this.arms.l.shoulder.rotation.x += (shL.x - this.arms.l.shoulder.rotation.x) * k
      this.arms.l.shoulder.rotation.z += (shL.z - this.arms.l.shoulder.rotation.z) * k
      this.arms.l.elbow.rotation.x += (elL - this.arms.l.elbow.rotation.x) * k
    }
    this.hips.position.y += (this.baseHipY - hipDrop - this.hips.position.y) * Math.min(1, dt * 10)

    // head look at player
    if (!this.headGone) {
      const headYaw = clamp((player.pos.x - this.root.position.x) * 0.1, -0.4, 0.4)
      this.neck.rotation.y += (headYaw - this.neck.rotation.y) * Math.min(1, dt * 6)
    }

    // weapon sway / grip
    if (this.weapon) {
      this.weapon.rotation.x = 0.18 + Math.sin(time * 2 + this.walkPhase) * 0.02
    }
  }

  updateDeath(dt) {
    this.deathTimer += dt
    if (this.deathMode === 'bisect') return
    const t = clamp(this.deathTimer / 0.9, 0, 1)
    const e = t * t
    const targetZ = (this.fallSign || 1) * Math.PI * 0.5
    this.root.rotation.z = e * targetZ
    this.root.rotation.x = e * 0.15
    this.root.position.y = -e * 0.05
    this.hips.position.y = this.baseHipY - e * 0.12
    if (this.armGone.r) this.arms.r.shoulder.rotation.x = 0.5
    if (this.armGone.l) this.arms.l.shoulder.rotation.x = 0.5
    if (this.deathTimer > 1.2 && !this._pooled) {
      this._pooled = true
      const p = this.worldOf(this.hips)
      this.gore.pools.add(p.x, p.z, rand(1.4, 2.2))
      for (let i = 0; i < 3; i++) {
        this.gore.decals.add(p.x + rand(-0.8, 0.8), p.z + rand(-0.8, 0.8), rand(0.7, 1.6), rand(0, TAU))
      }
    }
  }

  get position() { return this.root.position }
}
