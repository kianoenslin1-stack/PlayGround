import * as THREE from 'three'
import { clamp, damp, lerp, rand, chance, deg } from './utils.js'
import { createWeapon, createShield } from './weapons.js'
import { createBloodSplatTexture, createClothTexture } from './textures.js'

export const ENEMY_TYPES = {
  gladiator: {
    name: 'GLADIATOR', title: 'THE HUNGRY', health: 92, speed: 2.2, damage: 10, attackRange: 2.3,
    windup: .54, recover: .7, armor: 62, weapon: 'sword', shield: true, scale: .98, score: 90, marks: 9,
    aggressive: .62, color: 0x6d4a2f, accent: 0x9d6c3c, cloth: 0x511510
  },
  knight: {
    name: 'OATHBOUND KNIGHT', title: 'THE OATHBOUND', health: 156, speed: 1.46, damage: 17, attackRange: 2.7,
    windup: .82, recover: .85, armor: 175, weapon: 'mace', shield: true, scale: 1.03, score: 150, marks: 15,
    aggressive: .45, color: 0x5b6061, accent: 0x949da0, cloth: 0x2f383b
  },
  berserker: {
    name: 'BERSERKER', title: 'THE UNQUIET', health: 118, speed: 2.75, damage: 14, attackRange: 2.25,
    windup: .4, recover: .48, armor: 34, weapon: 'axe', shield: false, scale: 1.05, score: 130, marks: 13,
    aggressive: .92, color: 0x6f3325, accent: 0x2f2520, cloth: 0x36160f
  },
  champion: {
    name: 'THE PALE WARDEN', title: 'CHAMPION OF THE PIT', health: 520, speed: 1.72, damage: 25, attackRange: 3.05,
    windup: .94, recover: .92, armor: 380, weapon: 'greatsword', shield: false, scale: 1.24, score: 850, marks: 80,
    aggressive: .5, color: 0x333536, accent: 0xb18a4c, cloth: 0x48110c, boss: true
  }
}

export const PLAYER_START = {
  health: 100, stamina: 100, speed: 4.0, damage: 1
}

let sharedBodyGeo = {}
let bloodTexture = null
let clothTexture = null

function capsule(r, len, mat, cap = 5, radial = 8) {
  const key = `${r}-${len}-${cap}-${radial}`
  if (!sharedBodyGeo[key]) sharedBodyGeo[key] = new THREE.CapsuleGeometry(r, len, cap, radial)
  const m = new THREE.Mesh(sharedBodyGeo[key], mat)
  m.castShadow = true; m.receiveShadow = true
  return m
}

function cylinder(r1, r2, h, mat, seg = 7) {
  const key = `${r1}-${r2}-${h}-${seg}`
  if (!sharedBodyGeo[key]) sharedBodyGeo[key] = new THREE.CylinderGeometry(r1, r2, h, seg)
  const m = new THREE.Mesh(sharedBodyGeo[key], mat)
  m.castShadow = true; m.receiveShadow = true
  return m
}

function roundedBox(w, h, d, r, mat) {
  if (!sharedBodyGeo[`rb-${w}-${h}-${d}-${r}`]) {
    const shape = new THREE.Shape()
    const x = -w / 2, y = -h / 2
    shape.moveTo(x + r, y)
    shape.lineTo(x + w - r, y)
    shape.quadraticCurveTo(x + w, y, x + w, y + r)
    shape.lineTo(x + w, y + h - r)
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    shape.lineTo(x + r, y + h)
    shape.quadraticCurveTo(x, y + h, x, y + h - r)
    shape.lineTo(x, y + r)
    shape.quadraticCurveTo(x, y, x + r, y)
    const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: Math.min(.025, r * .35), bevelThickness: .012 })
    geo.center()
    sharedBodyGeo[`rb-${w}-${h}-${d}-${r}`] = geo
  }
  const m = new THREE.Mesh(sharedBodyGeo[`rb-${w}-${h}-${d}-${r}`], mat)
  m.castShadow = true; m.receiveShadow = true
  return m
}

function armorMat(color, metalness = .72, roughness = .38) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness })
}

function clothMat(color, roughness = .97) {
  if (!clothTexture) clothTexture = createClothTexture(256)
  return new THREE.MeshStandardMaterial({ color, map: clothTexture, metalness: 0, roughness, side: THREE.DoubleSide })
}

export class Character {
  constructor(scene, opts = {}) {
    this.scene = scene
    this.isPlayer = !!opts.player
    this.type = opts.type || 'gladiator'
    this.def = this.isPlayer ? {
      name: 'VIGIL', title: 'THE LAST WATCH', health: opts.health || 100, speed: 4.0, scale: opts.scale || 1
    } : ENEMY_TYPES[this.type]
    this.scale = (opts.scale || this.def.scale || 1)
    this.weaponData = opts.weaponData
    this.armorData = opts.armorData
    this.health = opts.health || this.def.health
    this.maxHealth = this.health
    this.armor = opts.armor ?? (this.def.armor || 0)
    this.maxArmor = this.armor
    this.speed = this.def.speed || 3
    this.damage = this.def.damage || 10
    this.dead = false
    this.deathTime = 0
    this.state = 'idle'
    this.stateTime = 0
    this.attackType = 'light'
    this.attackDuration = .5
    this.attackProgress = 0
    this.events = { swing: false, hit: false, footstep: false }
    this.movePhase = Math.random() * Math.PI * 2
    this.speedActual = 0
    this.flinch = 0
    this.flinchSide = 0
    this.hitFlash = 0
    this.blocking = false
    this.shieldBroken = false
    this.staminaDrain = 0
    this.wounds = 0
    this.root = new THREE.Group()
    this.root.position.set(0, 0, 0)
    this.visual = new THREE.Group()
    this.visual.scale.setScalar(this.scale)
    this.root.add(this.visual)
    this.scene.add(this.root)

    if (!bloodTexture) bloodTexture = createBloodSplatTexture()
    this.armorPieces = {}
    this.materials = []
    this.build()
    this.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    this.state = 'idle'
    this.root.visible = true
  }

  build() {
    const p = this.isPlayer
    const D = this.def
    const skinColor = p ? 0xb08368 : this.type === 'berserker' ? 0x9d6b51 : 0x8d624d
    const skin = armorMat(skinColor, .02, .82)
    const darkSteel = armorMat(p ? 0x555b5a : this.type === 'champion' ? 0x3b3c3d : this.type === 'knight' ? 0x707575 : 0x5a3d2b, .64, .42)
    const steel = armorMat(p ? 0x9aa09f : this.type === 'champion' ? 0x787a75 : 0x8b8d89, .8, .32)
    const accent = armorMat(this.type === 'champion' ? 0xb28a4c : p ? 0x95713f : this.type === 'gladiator' ? 0xb5814d : D.accent, .68, .36)
    const cloth = clothMat(p ? 0x5e120b : D.cloth, .95)
    const leather = armorMat(0x2c1d15, .04, .91)
    const fur = new THREE.MeshStandardMaterial({ color: 0x30271f, roughness: 1, metalness: 0 })
    const black = armorMat(0x171819, .62, .56)
    const eyeMat = new THREE.MeshBasicMaterial({ color: p ? 0xd8b36c : this.type === 'champion' ? 0xff4324 : 0x1b0e08 })
    this.mats = { skin, darkSteel, steel, accent, cloth, leather, fur, black, eyeMat }
    this.materials.push(skin, darkSteel, steel, accent, cloth, leather, fur, black)

    const hips = new THREE.Group(); hips.position.y = 1.01; this.visual.add(hips); this.hips = hips

    const pelvis = roundedBox(.34, .22, .23, .055, leather)
    pelvis.position.y = -.015
    hips.add(pelvis)

    const torso = new THREE.Group(); torso.position.y = .16; hips.add(torso); this.torso = torso
    // Tapered cuirass reads as forged plate rather than a box.
    const cuirass = new THREE.Mesh(new THREE.CylinderGeometry(.255, .195, .5, 14, 1), p || this.type === 'knight' ? darkSteel : skin)
    cuirass.position.y = .25; cuirass.scale.z = .68; cuirass.rotation.y = Math.PI / 14
    cuirass.castShadow = true; cuirass.receiveShadow = true; torso.add(cuirass)
    const collar = new THREE.Mesh(new THREE.TorusGeometry(.115, .021, 5, 14), steel)
    collar.rotation.x = Math.PI / 2; collar.position.y = .5; collar.scale.z = .78; torso.add(collar)
    if (p || this.type !== 'berserker') {
      const breast = roundedBox(.355, .36, .055, .045, p ? darkSteel : this.type === 'gladiator' ? leather : steel)
      breast.position.set(0, .27, .135); torso.add(breast)
      this.armorPieces.chest = this.registerArmor('chest', breast, Math.max(30, (this.maxArmor || 50) * .35), 'CHEST')
      const plateTrim = roundedBox(.225, .195, .015, .028, accent)
      plateTrim.position.set(0, .3, .168); torso.add(plateTrim)
      const plate = roundedBox(.195, .165, .028, .024, p ? darkSteel : steel)
      plate.position.set(0, .3, .18); torso.add(plate)
      // rivets
      for (const [rx, ry] of [[-.135, .39], [.135, .39], [-.135, .16], [.135, .16]]) {
        const rivet = new THREE.Mesh(new THREE.SphereGeometry(.012, 5, 4), accent)
        rivet.position.set(rx, ry, .158); torso.add(rivet)
      }
      if (p) {
        const sigil = new THREE.Mesh(new THREE.TorusGeometry(.05, .008, 4, 12), accent)
        sigil.position.set(0, .3, .195); torso.add(sigil)
      }
      if (this.type === 'champion') {
        const rune = new THREE.Mesh(new THREE.OctahedronGeometry(.045, 0), new THREE.MeshStandardMaterial({ color: 0x9d1e12, emissive: 0xb62612, emissiveIntensity: 1.8, roughness: .3 }))
        rune.position.set(0, .3, .2); torso.add(rune)
      }
    } else {
      const scars = new THREE.Mesh(new THREE.PlaneGeometry(.13, .32), new THREE.MeshBasicMaterial({ color: 0x4e241a, transparent: true, opacity: .65 }))
      scars.position.set(.12, .23, .14); scars.rotation.z = -.35; torso.add(scars)
    }

    const waist = roundedBox(.37, .12, .25, .03, leather)
    waist.position.y = .015; torso.add(waist)
    const belt = roundedBox(.38, .055, .26, .02, accent)
    belt.position.y = .04; torso.add(belt)
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(.075, .06, .02), steel)
    buckle.position.set(0, .04, .143); torso.add(buckle)

    // tabard and layered tassets
    const tabard = new THREE.Mesh(new THREE.PlaneGeometry(.23, .52, 1, 4), cloth)
    tabard.position.set(0, -.24, .135); torso.add(tabard)
    this.tabard = tabard
    const skirtPlates = [
      { x: -.15, z: .015, ry: .12, rz: .42, side: 'L', breakable: true },
      { x: .15, z: .015, ry: -.12, rz: -.42, side: 'R', breakable: true },
      { x: -.075, z: .115, ry: .32, rz: .1, side: 'FL', breakable: false },
      { x: .075, z: .115, ry: -.32, rz: -.1, side: 'FR', breakable: false },
      { x: 0, z: -.125, ry: Math.PI, rz: 0, side: 'B', breakable: false }
    ]
    for (const s of skirtPlates) {
      const tasset = roundedBox(.145, .21, .042, .028, this.type === 'berserker' ? leather : darkSteel)
      tasset.position.set(s.x, -.165, s.z); tasset.rotation.set(-.08, s.ry, s.rz); torso.add(tasset)
      const stud = new THREE.Mesh(new THREE.SphereGeometry(.011, 5, 4), accent)
      stud.position.set(s.x, -.08, s.z + .025); stud.rotation.copy(tasset.rotation); torso.add(stud)
      if (s.breakable && this.type !== 'berserker') this.armorPieces[`tasset${s.side}`] = this.registerArmor(`tasset${s.side}`, tasset, Math.max(18, this.maxArmor * .1), 'TASSET', false)
    }

    // neck / head
    const neck = cylinder(.065, .075, .1, skin, 8); neck.position.y = .53; torso.add(neck)
    const head = new THREE.Group(); head.position.y = .64; torso.add(head); this.head = head
    const skull = new THREE.Mesh(new THREE.SphereGeometry(.137, 14, 10), skin)
    skull.scale.set(.93, 1.1, .96); skull.position.y = .02; skull.castShadow = true; head.add(skull)
    const jaw = roundedBox(.16, .1, .13, .04, skin); jaw.position.set(0, -.08, .035); head.add(jaw)

    if (this.type === 'berserker') {
      const beard = new THREE.Mesh(new THREE.ConeGeometry(.11, .23, 7), fur)
      beard.position.set(0, -.15, .07); beard.rotation.x = .12; head.add(beard)
      const helm = new THREE.Mesh(new THREE.SphereGeometry(.15, 8, 6, 0, Math.PI * 2, 0, Math.PI * .55), darkSteel)
      helm.position.y = .065; head.add(helm)
      for (const x of [-1, 1]) {
        const horn = new THREE.Mesh(new THREE.ConeGeometry(.035, .26, 5), new THREE.MeshStandardMaterial({ color: 0xc3b391, roughness: .8 }))
        horn.position.set(x * .14, .14, -.02); horn.rotation.z = x * .55; horn.rotation.x = -.15; head.add(horn)
      }
    } else {
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(.15, 14, 10, 0, Math.PI * 2, 0, Math.PI * .64), p ? steel : this.type === 'gladiator' ? accent : darkSteel)
      helmet.position.y = .05; helmet.scale.set(1, .98, 1); head.add(helmet)
      this.armorPieces.helmet = this.registerArmor('helmet', helmet, Math.max(22, (this.maxArmor || 50) * .22), 'HELM')
      const brow = new THREE.Mesh(new THREE.CylinderGeometry(.151, .153, .052, 14, 1, true), steel)
      brow.position.y = .012; brow.scale.z = .94; head.add(brow)
      this.armorPieces.visor = this.registerArmor('visor', brow, Math.max(15, this.maxArmor * .1), 'VISOR', false)
      for (const side of [-1, 1]) {
        const cheek = roundedBox(.052, .125, .062, .022, steel)
        cheek.position.set(side * .102, -.045, .075); cheek.rotation.set(-.04, side * .12, side * .07); head.add(cheek)
      }
      const nose = roundedBox(.02, .115, .024, .008, steel)
      nose.position.set(0, -.022, .154); head.add(nose)
      const faceShade = new THREE.Mesh(new THREE.BoxGeometry(.17, .062, .012), black)
      faceShade.position.set(0, .012, .148); head.add(faceShade)
      const chin = roundedBox(.12, .055, .058, .02, steel)
      chin.position.set(0, -.108, .113); chin.rotation.x = -.12; head.add(chin)
      for (const x of [-.05, .05]) {
        const eye = new THREE.Mesh(new THREE.BoxGeometry(.034, .011, .012), eyeMat)
        eye.position.set(x, .014, .161); head.add(eye)
      }
      if (p) {
        const crestBase = roundedBox(.042, .028, .23, .01, accent)
        crestBase.position.set(0, .175, -.005); head.add(crestBase)
        const shape = new THREE.Shape()
        shape.moveTo(-.155, 0)
        shape.quadraticCurveTo(-.13, .175, -.02, .17)
        shape.quadraticCurveTo(.09, .16, .145, .01)
        shape.lineTo(.16, -.012)
        shape.lineTo(.12, -.03)
        shape.lineTo(-.12, -.03)
        shape.closePath()
        const crestGeo = new THREE.ExtrudeGeometry(shape, { depth: .025, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .007, bevelThickness: .005 })
        crestGeo.center()
        const crest = new THREE.Mesh(crestGeo, cloth)
        crest.rotation.y = Math.PI / 2
        crest.position.set(0, .2, .01)
        head.add(crest)
      }
      if (this.type === 'gladiator') {
        const crest = new THREE.Mesh(new THREE.CylinderGeometry(.035, .055, .27, 8), new THREE.MeshStandardMaterial({ color: 0x7c2016, roughness: .95 }))
        crest.position.set(0, .24, -.015); crest.scale.z = .4; head.add(crest)
      }
      if (this.type === 'champion') {
        for (let i = 0; i < 5; i++) {
          const crown = new THREE.Mesh(new THREE.ConeGeometry(.018, .12, 4), accent)
          const a = (i / 5 - .5) * 1.4
          crown.position.set(Math.sin(a) * .14, .19, Math.cos(a) * .07 - .05); crown.rotation.z = -a * .4; head.add(crown)
        }
        for (const x of [-1, 1]) {
          const horn = new THREE.Mesh(new THREE.ConeGeometry(.03, .34, 5), black)
          horn.position.set(x * .14, .18, -.02); horn.rotation.z = x * .48; horn.rotation.x = -.15; head.add(horn)
        }
      }
    }
    // glowing eyes under visor for champion
    if (this.type === 'champion') {
      for (const x of [-.045, .045]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(.012, 5, 4), eyeMat)
        eye.position.set(x, .015, .169); head.add(eye)
      }
    }

    // shoulders and arms
    const armR = new THREE.Group(); armR.position.set(-.255, .46, 0); torso.add(armR); this.armR = armR
    const armL = new THREE.Group(); armL.position.set(.255, .46, 0); torso.add(armL); this.armL = armL
    for (const [arm, sign, side] of [[armR, -1, 'R'], [armL, 1, 'L']]) {
      const pauldronMat = this.type === 'berserker' ? fur : this.type === 'gladiator' && side === 'L' ? leather : darkSteel
      const pauldron = new THREE.Mesh(new THREE.SphereGeometry(.118, 14, 9, 0, Math.PI * 2, 0, Math.PI * .58), pauldronMat)
      pauldron.position.set(sign * .035, .015, 0); pauldron.scale.set(1.18, .72, 1.08); arm.add(pauldron)
      if (this.type !== 'berserker') this.armorPieces[`pauldron${side}`] = this.registerArmor(`pauldron${side}`, pauldron, Math.max(20, this.maxArmor * .14), 'PAULDRON', false)
      const lame = roundedBox(.19, .062, .205, .022, pauldronMat)
      lame.position.set(sign * .058, -.068, .004); lame.rotation.z = sign * .34; arm.add(lame)
      if ((this.type === 'champion' || this.type === 'knight') && side === 'R') {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(.03, .2, 4), accent)
        spike.position.set(sign * .17, .07, 0); spike.rotation.z = sign * 1.25; arm.add(spike)
      }
      const upper = cylinder(.06, .08, .32, this.type === 'berserker' ? skin : darkSteel, 10)
      upper.position.y = -.16; arm.add(upper)
      const elbow = new THREE.Group(); elbow.position.y = -.32; arm.add(elbow)
      const fore = cylinder(.045, .06, .31, this.type === 'berserker' ? skin : steel, 10)
      fore.position.y = -.155; elbow.add(fore)
      const bracer = cylinder(.063, .077, .19, darkSteel, 10)
      bracer.position.y = -.18; elbow.add(bracer)
      if (this.type !== 'berserker') this.armorPieces[`bracer${side}`] = this.registerArmor(`bracer${side}`, bracer, Math.max(16, this.maxArmor * .1), 'BRACER', false)
      const hand = new THREE.Group(); hand.position.y = -.315; elbow.add(hand)
      const fist = new THREE.Mesh(new THREE.SphereGeometry(.057, 7, 6), leather)
      fist.scale.set(.9, .9, 1.1); hand.add(fist)
      if (side === 'R') { this.elbowR = elbow; this.handR = hand } else { this.elbowL = elbow; this.handL = hand }
    }

    // legs
    for (const [side, x] of [['R', -.145], ['L', .145]]) {
      const hip = new THREE.Group(); hip.position.set(x, -.04, 0); hips.add(hip)
      const upper = cylinder(.084, .1, .42, this.type === 'berserker' ? leather : darkSteel, 10)
      upper.position.y = -.21; hip.add(upper)
      const knee = new THREE.Group(); knee.position.y = -.42; hip.add(knee)
      const kneeCop = new THREE.Mesh(new THREE.SphereGeometry(.085, 10, 7), steel)
      kneeCop.position.set(0, .015, .045); kneeCop.scale.set(1.05, .82, .9); knee.add(kneeCop)
      const shin = cylinder(.058, .078, .41, this.type === 'berserker' ? leather : darkSteel, 10)
      shin.position.y = -.205; knee.add(shin)
      const greave = cylinder(.075, .09, .28, steel, 10)
      greave.position.y = -.24; knee.add(greave)
      this.armorPieces[`greave${side}`] = this.registerArmor(`greave${side}`, greave, Math.max(18, this.maxArmor * .1), 'GREAVE', false)
      const boot = roundedBox(.14, .12, .28, .035, leather)
      boot.position.set(0, -.44, .055); knee.add(boot)
      const toeCap = roundedBox(.132, .055, .1, .022, steel)
      toeCap.position.set(0, -.462, .15); knee.add(toeCap)
      const ankle = new THREE.Mesh(new THREE.TorusGeometry(.083, .016, 4, 10), accent)
      ankle.rotation.x = Math.PI / 2; ankle.position.set(0, -.39, .02); knee.add(ankle)
      if (side === 'R') this.legR = hip; else this.legL = hip
      if (side === 'R') this.kneeR = knee; else this.kneeL = knee
    }

    // fur / cloth shoulder mantle
    if (this.type === 'berserker') {
      for (let i = 0; i < 7; i++) {
        const tuft = new THREE.Mesh(new THREE.ConeGeometry(.07, .28, 5), fur)
        tuft.position.set(rand(-.24, .24), .49 + rand(-.02, .04), rand(-.1, .1))
        tuft.rotation.set(rand(-.3, .3), rand(0, 6), rand(-.8, .8))
        torso.add(tuft)
      }
    }

    // cape
    if (p || this.type === 'champion' || this.type === 'knight') {
      const cape = new THREE.Group(); cape.position.set(0, .49, -.16); torso.add(cape); this.cape = cape
      this.capeSegments = []
      let parent = cape
      for (let i = 0; i < 5; i++) {
        const seg = new THREE.Group()
        seg.position.y = i === 0 ? 0 : -.265
        const width = .48 - i * .045
        const geo = new THREE.PlaneGeometry(width, .32, 6, 1)
        const arr = geo.attributes.position.array
        for (let v = 0; v < arr.length; v += 3) {
          const u = arr[v] / (width / 2)
          arr[v + 2] = Math.cos(u * Math.PI) * .022 - Math.abs(u) * .018
          if (i === 4 && arr[v + 1] < -.15) arr[v + 1] -= Math.abs(Math.sin(u * 9.5)) * .045
        }
        geo.attributes.position.needsUpdate = true
        geo.computeVertexNormals()
        const plane = new THREE.Mesh(geo, cloth)
        plane.position.y = -.15; plane.castShadow = true; seg.add(plane)
        parent.add(seg); parent = seg; this.capeSegments.push(seg)
      }
      for (const x of [-.17, .17]) {
        const clasp = new THREE.Mesh(new THREE.SphereGeometry(.026, 8, 6), accent)
        clasp.position.set(x, .47, -.12); torso.add(clasp)
      }
    }

    // weapon
    this.weapon = createWeapon(this.weaponData?.kind || D.weapon, this.type === 'champion' ? 2 : this.type === 'gladiator' ? 1 : 0)
    this.weapon.position.set(0, -.02, 0)
    this.weapon.rotation.set(1.32, 0, 0)
    this.handR.add(this.weapon)
    if (!this.isPlayer) {
      this.weapon.scale.setScalar(this.type === 'champion' ? 1.08 : .96)
    }

    // offhand shield or axe
    if (D.shield) {
      this.shield = createShield(this.type === 'gladiator' ? 0x5d1b13 : 0x2d3b3e)
      this.shield.position.set(.02, -.16, .03)
      this.shield.rotation.set(0, Math.PI / 2, 0)
      this.handL.add(this.shield)
    } else if (this.type === 'berserker') {
      this.offhandWeapon = createWeapon('dualaxe', 0)
      this.offhandWeapon.position.set(0, -.02, 0)
      this.offhandWeapon.rotation.set(1.32, 0, 0)
      this.offhandWeapon.scale.setScalar(.9)
      this.handL.add(this.offhandWeapon)
    }

    // player aura / enemy champion aura light
    if (this.type === 'champion') {
      const light = new THREE.PointLight(0xff3d1e, 1.8, 4.5, 2)
      light.position.set(0, 1.5, 0); this.visual.add(light)
    }

    // selection / shadow blob
    const blob = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, .7),
      new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: .52, depthWrite: false })
    )
    blob.rotation.x = -Math.PI / 2; blob.position.y = .012; this.root.add(blob)
    this.blob = blob
  }

  registerArmor(name, mesh, durability, label, breakable = true) {
    mesh.userData.armorName = name
    mesh.userData.armorLabel = label
    return { mesh, durability, maxDurability: durability, broken: false, label, breakable }
  }

  setState(state, time = 0) {
    if (this.dead) return
    this.state = state
    this.stateTime = time
    if (state === 'idle') this.blocking = false
  }

  startAttack(type = 'light', duration = .55) {
    if (this.dead) return
    this.state = 'attack'
    this.stateTime = 0
    this.attackType = type
    this.attackDuration = duration
    this.attackProgress = 0
    this.events.swing = false
    this.events.hit = false
    this.hasHit = false
    this.hasSwung = false
    this.blocking = false
  }

  takeHit(amount, opts = {}) {
    if (this.dead) return null
    const heavy = opts.heavy || false
    const armorBreakPower = opts.breakPower || 1
    let broken = null
    if (this.armor > 0) {
      const candidates = Object.values(this.armorPieces).filter(p => p.breakable && !p.broken && p.durability > 0)
      if (candidates.length && chance(heavy ? .85 : .38)) {
        const piece = candidates[Math.floor(Math.random() * candidates.length)]
        piece.durability -= amount * (heavy ? 1.8 : .85) * armorBreakPower
        if (piece.durability <= 0) {
          piece.broken = true
          piece.mesh.visible = false
          this.armor = Math.max(0, this.armor - piece.maxDurability * .3)
          broken = piece
          if (this.onArmorBreak) this.onArmorBreak(piece)
        } else {
          this.armor = Math.max(0, this.armor - amount * .1)
        }
      } else {
        this.armor = Math.max(0, this.armor - amount * .24)
      }
    }
    const reduction = opts.ignoreArmor ? 0 : (this.armor / Math.max(1, this.maxArmor)) * .2
    const dealt = Math.max(1, Math.round(amount * (1 - reduction)))
    this.health -= dealt
    this.hitFlash = .12
    this.flinch = heavy ? 1 : .6
    this.flinchSide = opts.side || (Math.random() < .5 ? -1 : 1)
    if (this.state !== 'attack' || heavy || this.type === 'champion') {
      if (!this.dead) this.setState('hit', 0)
    }
    if (this.health <= 0) {
      this.health = 0
      this.die(opts)
    }
    return { damage: dealt, broken, killed: this.dead }
  }

  stagger(duration = .9) {
    if (this.dead || this.type === 'champion') {
      if (this.type === 'champion') this.setState('hit', 0)
      return
    }
    this.setState('hit', 0)
    this.staggerDuration = duration
    this.staggerTimer = duration
    this.staggered = true
  }

  die(opts = {}) {
    if (this.dead) return
    this.dead = true
    this.health = 0
    this.state = 'dead'
    this.stateTime = 0
    this.deathTime = 0
    this.deathDir = opts.side || (Math.random() < .5 ? -1 : 1)
    this.blocking = false
    if (opts.decapitate) this.decapitate()
  }

  decapitate() {
    if (!this.head || this.head.userData.gone) return
    this.head.userData.gone = true
    this.head.visible = false
    if (this.onDecapitate) this.onDecapitate(this)
  }

  update(dt, opts = {}) {
    this.animTime = (this.animTime || 0) + dt
    const t = this.animTime
    this.stateTime += dt
    if (this.hitFlash > 0) this.hitFlash -= dt
    const moving = this.speedActual > .15
    if (moving) this.movePhase += dt * (5.1 + this.speedActual * 1.2)
    const stride = clamp(this.speedActual / 3.1, 0, 1)
    const breathe = Math.sin(t * 1.65) * .018
    const bob = Math.abs(Math.sin(this.movePhase)) * .035 * stride

    // base pose
    const target = {
      hipsX: 0, hipsY: 0, hipsZ: 0,
      torsoX: breathe + .02, torsoY: 0, torsoZ: 0,
      headX: -breathe * .5, headY: Math.sin(t * .37) * .04, headZ: 0,
      armRX: -.22 + Math.sin(this.movePhase + Math.PI) * .34 * stride,
      armRY: 0, armRZ: -.25,
      elbowRX: -.9,
      armLX: -.12 + Math.sin(this.movePhase) * .4 * stride,
      armLY: 0, armLZ: .09,
      elbowLX: -.3,
      legRX: Math.sin(this.movePhase) * .6 * stride,
      legLX: -Math.sin(this.movePhase) * .6 * stride,
      kneeRX: Math.max(0, -Math.sin(this.movePhase)) * .85 * stride,
      kneeLX: Math.max(0, Math.sin(this.movePhase)) * .85 * stride,
      legRZ: -.06, legLZ: .06,
      visualY: 0
    }
    this.blocking = false
    this.flinch = damp(this.flinch, 0, 12, dt)
    this.flinchSide = damp(this.flinchSide, 0, 10, dt)

    if (this.state === 'attack') {
      this.attackProgress = clamp(this.stateTime / this.attackDuration, 0, 1)
      this.applyAttackPose(target, this.attackProgress)
      if (!this.hasSwung && this.attackProgress > (this.attackType === 'heavy' ? .38 : .27)) {
        this.hasSwung = true
        this.events.swing = true
      }
      if (!this.hasHit && this.attackProgress > (this.attackType === 'heavy' ? .57 : .47)) {
        this.hasHit = true
        this.events.hit = true
      }
      if (this.attackProgress >= 1) {
        this.state = 'idle'
        this.stateTime = 0
      }
    } else if (this.state === 'hit') {
      const k = clamp(this.stateTime / .3, 0, 1)
      const s = Math.sin(k * Math.PI)
      target.torsoX -= .22 * s * (this.flinch || .5)
      target.torsoZ = this.flinchSide * .17 * s
      target.headX -= .2 * s
      target.armRX += .35 * s
      target.armLX -= .25 * s
      target.visualY = -.02 * s
      if (this.staggered) {
        this.staggerTimer -= dt
        target.torsoX -= .3
        target.hipsX = -.18
        target.kneeRX += .45
        target.kneeLX += .45
        target.visualY = -.1
        if (this.staggerTimer <= 0 || this.stateTime > 1.25) {
          this.staggered = false
          this.state = 'idle'; this.stateTime = 0
        }
      } else if (this.stateTime > .32) {
        this.state = 'idle'; this.stateTime = 0
      }
    } else if (this.state === 'block') {
      target.armRX = -1.22; target.armRZ = -.8; target.elbowRX = -1.5
      target.armLX = -1.34; target.armLZ = .75; target.elbowLX = -1.25
      target.torsoY = -.18; target.torsoX = .1
      target.legRX = -.22; target.legLX = .16; target.kneeRX = .22; target.kneeLX = .2
      target.visualY = -.035
      this.blocking = true
    } else if (this.state === 'dodge') {
      const k = clamp(this.stateTime / .38, 0, 1)
      const s = Math.sin(k * Math.PI)
      target.hipsX = .45
      target.torsoX = .18
      target.legRX = -.5; target.legLX = .4
      target.kneeRX = .5; target.kneeLX = .7
      target.armRX = -.75; target.armLX = -.5
      target.visualY = -.15 * s
      if (this.stateTime > .45 && !this.isPlayer) { this.state = 'idle'; this.stateTime = 0 }
    } else if (this.state === 'dead') {
      this.deathTime += dt
      this.applyDeathPose(target, dt)
    } else if (this.state === 'execute') {
      this.applyExecutePose(target, this.stateTime)
    }

    // apply smooth
    const J = this
    J.hips.rotation.x = damp(J.hips.rotation.x, target.hipsX, 13, dt)
    J.hips.rotation.y = damp(J.hips.rotation.y, target.hipsY, 13, dt)
    J.hips.rotation.z = damp(J.hips.rotation.z, target.hipsZ, 13, dt)
    J.torso.rotation.x = damp(J.torso.rotation.x, target.torsoX, 12, dt)
    J.torso.rotation.y = damp(J.torso.rotation.y, target.torsoY, 13, dt)
    J.torso.rotation.z = damp(J.torso.rotation.z, target.torsoZ, 10, dt)
    J.head.rotation.x = damp(J.head.rotation.x, target.headX, 9, dt)
    J.head.rotation.y = damp(J.head.rotation.y, target.headY, 8, dt)
    J.head.rotation.z = damp(J.head.rotation.z, target.headZ, 8, dt)
    J.armR.rotation.x = damp(J.armR.rotation.x, target.armRX, 18, dt)
    J.armR.rotation.y = damp(J.armR.rotation.y, target.armRY, 15, dt)
    J.armR.rotation.z = damp(J.armR.rotation.z, target.armRZ, 15, dt)
    J.armL.rotation.x = damp(J.armL.rotation.x, target.armLX, 18, dt)
    J.armL.rotation.y = damp(J.armL.rotation.y, target.armLY, 15, dt)
    J.armL.rotation.z = damp(J.armL.rotation.z, target.armLZ, 15, dt)
    J.elbowR.rotation.x = damp(J.elbowR.rotation.x, target.elbowRX, 17, dt)
    J.elbowL.rotation.x = damp(J.elbowL.rotation.x, target.elbowLX, 17, dt)
    J.legR.rotation.x = damp(J.legR.rotation.x, target.legRX, 18, dt)
    J.legL.rotation.x = damp(J.legL.rotation.x, target.legLX, 18, dt)
    J.legR.rotation.z = damp(J.legR.rotation.z, target.legRZ || 0, 12, dt)
    J.legL.rotation.z = damp(J.legL.rotation.z, target.legLZ || 0, 12, dt)
    J.kneeR.rotation.x = damp(J.kneeR.rotation.x, target.kneeRX, 18, dt)
    J.kneeL.rotation.x = damp(J.kneeL.rotation.x, target.kneeLX, 18, dt)
    J.visual.position.y = damp(J.visual.position.y, target.visualY + bob, 14, dt)

    // weapon angle subtle
    if (J.weapon) {
      J.weapon.rotation.z = damp(J.weapon.rotation.z, this.state === 'attack' ? -this.attackProgress * .25 : 0, 9, dt)
    }

    // cape
    if (this.capeSegments) {
      for (let i = 0; i < this.capeSegments.length; i++) {
        const seg = this.capeSegments[i]
        const flutter = Math.sin(t * 2.3 + i * .8) * .035
        const back = (this.speedActual * .09 + .08) * (i + 1) / this.capeSegments.length
        seg.rotation.x = damp(seg.rotation.x, back + flutter - (this.state === 'attack' ? .18 : 0), 6, dt)
        seg.rotation.z = damp(seg.rotation.z, Math.sin(t * 1.3 + i) * .025 + this.flinchSide * .04, 4, dt)
      }
    }
    if (this.offhandWeapon) {
      this.offhandWeapon.rotation.z = Math.sin(t * 1.2) * .04
    }
  }

  applyAttackPose(t, p) {
    const heavy = this.attackType === 'heavy'
    const twoHand = this.weaponData?.kind === 'greatsword' || this.weaponData?.kind === 'hammer' || this.type === 'champion'
    const windEnd = heavy ? .42 : .25
    const strikeEnd = heavy ? .62 : .5
    let wind = 0, strike = 0
    if (p < windEnd) wind = p / windEnd
    else if (p < strikeEnd) { wind = 1; strike = (p - windEnd) / (strikeEnd - windEnd) }
    else { wind = 1; strike = 1 }
    const ease = x => x * x * (3 - 2 * x)
    const w = ease(wind), s = ease(strike)
    if (heavy) {
      t.armRX = lerp(-.2, -2.55, w)
      t.elbowRX = lerp(-.9, -.35, w)
      t.armRZ = -.25
      t.torsoX = lerp(.02, -.2, w)
      t.torsoY = lerp(0, -.38, w)
      t.armLX = lerp(-.1, -2.1, w)
      t.elbowLX = lerp(-.3, -.25, w)
      if (strike > 0) {
        t.armRX = lerp(-2.55, -.72, s)
        t.elbowRX = lerp(-.35, -1.65, s)
        t.torsoX = lerp(-.2, .52, s)
        t.torsoY = lerp(-.38, .24, s)
        t.armLX = lerp(-2.1, -1.0, s)
        t.elbowLX = lerp(-.25, -1.25, s)
        t.legRX = -.25; t.legLX = .24
        t.visualY = -.06 * s
      }
    } else {
      t.armRX = lerp(-.2, -1.35, w)
      t.elbowRX = lerp(-.9, -.65, w)
      t.armRZ = lerp(-.06, -.85, w)
      t.torsoY = lerp(0, -.72, w)
      t.armLX = lerp(-.1, -.6, w)
      t.elbowLX = -.55
      if (strike > 0) {
        t.armRX = lerp(-1.35, -1.05, s)
        t.armRZ = lerp(-.85, .82, s)
        t.elbowRX = lerp(-.65, -.3, s)
        t.torsoY = lerp(-.72, .76, s)
        t.headY = lerp(-.2, .25, s)
        t.legRX = -.2; t.legLX = .15
      }
    }
    if (twoHand) {
      t.armLX = t.armRX + .08
      t.armLZ = .18
      t.elbowLX = -.8
    }
  }

  applyDeathPose(t, dt) {
    const k = clamp(this.deathTime / .9, 0, 1)
    const e = 1 - Math.pow(1 - k, 3)
    this.visual.rotation.z = damp(this.visual.rotation.z, this.deathDir * 1.5 * e, 5, dt)
    this.visual.position.y = damp(this.visual.position.y, .12 * e, 3, dt)
    this.visual.position.x = damp(this.visual.position.x, this.deathDir * .25 * e, 2, dt)
    t.armRX = -.4; t.armLX = .35; t.armRZ = -.6; t.armLZ = .7
    t.elbowRX = -.3; t.elbowLX = -.25
    t.legRX = .25; t.legLX = -.18; t.kneeRX = .2; t.kneeLX = .4
    t.headX = -.3; t.torsoX = .1
    if (this.deathTime > 4.4) {
      this.root.position.y -= dt * .16
    }
  }

  applyExecutePose(t, time) {
    if (!this.weapon) return
    const k = clamp(time / .5, 0, 1)
    t.armRX = lerp(-.4, -1.2, k)
    t.elbowRX = lerp(-.8, -.5, k)
    t.armRZ = -.3
    t.torsoY = lerp(0, .25, k)
    if (time > .55) {
      t.armRX = 1.0
      t.elbowRX = -.5
      t.torsoY = .55
      t.torsoX = .25
    }
  }

  getHeadPosition(out = new THREE.Vector3()) {
    if (this.head) this.head.getWorldPosition(out)
    else this.root.getWorldPosition(out)
    out.y += .45 * this.scale
    return out
  }

  getChestPosition(out = new THREE.Vector3()) {
    this.torso.getWorldPosition(out)
    out.y += .28 * this.scale
    return out
  }

  getWeaponTip(out = new THREE.Vector3()) {
    if (!this.weapon) return this.getChestPosition(out)
    const tip = this.weapon.userData.tip
    if (tip) return tip.getWorldPosition(out)
    return this.weapon.getWorldPosition(out)
  }

  getArmorPercent() {
    return this.maxArmor > 0 ? clamp(this.armor / this.maxArmor, 0, 1) : 1
  }

  addWound() {
    if (!this.torso || this.wounds >= 5) return
    const geo = new THREE.PlaneGeometry(rand(.08, .16), rand(.1, .2))
    const mat = new THREE.MeshBasicMaterial({ map: bloodTexture, transparent: true, opacity: rand(.65, .92), depthWrite: false })
    const w = new THREE.Mesh(geo, mat)
    w.position.set(rand(-.15, .15), rand(.1, .4), .17)
    w.rotation.z = rand(-1, 1)
    this.torso.add(w)
    this.wounds++
  }

  dispose() {
    this.scene.remove(this.root)
    this.root.traverse(o => {
      if (o.geometry && !Object.values(sharedBodyGeo).includes(o.geometry)) o.geometry.dispose()
      if (o.material && !this.materials.includes(o.material)) {
        if (o.material.map && o.material.map !== bloodTexture) o.material.map.dispose()
        o.material.dispose()
      }
    })
  }
}

let _shadowTex = null
function shadowTexture() {
  if (_shadowTex) return _shadowTex
  const c = document.createElement('canvas'); c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62)
  g.addColorStop(0, 'rgba(0,0,0,.75)'); g.addColorStop(.55, 'rgba(0,0,0,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128)
  _shadowTex = new THREE.CanvasTexture(c)
  return _shadowTex
}
