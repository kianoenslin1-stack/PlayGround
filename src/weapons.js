import * as THREE from 'three'
import { setShadow } from './utils.js'

export const WEAPONS = [
  {
    id: 'ashen-longsword', name: 'ASHEN LONGSWORD', type: 'ONE-HANDED SWORD', icon: '🗡', kind: 'sword',
    damage: 29, heavy: 56, reach: 2.75, speed: 1, stamina: 13, stagger: 1, cost: 0, bleed: 0, break: 1,
    desc: 'A vigil blade, notched by a hundred nameless duels. Balanced, quick, and honest.'
  },
  {
    id: 'butchers-axe', name: "BUTCHER'S AXE", type: 'ONE-HANDED AXE', icon: '🪓', kind: 'axe',
    damage: 35, heavy: 66, reach: 2.55, speed: .88, stamina: 17, stagger: 1.25, cost: 420, bleed: .35, break: 1.1,
    desc: 'Not forged for war. It cleaves bone all the same. Deep wounds bleed the strong dry.'
  },
  {
    id: 'mourning-star', name: 'MOURNING STAR', type: 'ONE-HANDED MACE', icon: '✦', kind: 'mace',
    damage: 39, heavy: 74, reach: 2.45, speed: .78, stamina: 21, stagger: 1.6, cost: 680, bleed: 0, break: 1.7,
    desc: 'A heavy iron prayer. Plate remembers every word. Splinters shields and the arms behind them.'
  },
  {
    id: 'iron-psalm', name: 'IRON PSALM', type: 'WAR HAMMER', icon: '🔨', kind: 'hammer',
    damage: 47, heavy: 92, reach: 2.6, speed: .64, stamina: 26, stagger: 2.1, cost: 980, bleed: 0, break: 2.2,
    desc: 'The last argument of the Vigil. A two-handed sermon that ends most conversations in one blow.'
  },
  {
    id: 'gravekeeper', name: 'GRAVEKEEPER', type: 'GREATSWORD', icon: '⚔', kind: 'greatsword',
    damage: 42, heavy: 82, reach: 3.15, speed: .7, stamina: 24, stagger: 1.45, cost: 1250, bleed: .18, break: 1.45,
    desc: 'Six feet of consecrated steel. Wide arcs, terrible reach, and no forgiveness at the edge.'
  },
  {
    id: 'crownsplitter', name: 'CROWNSPLITTER', type: 'CHAMPION GREATSWORD', icon: '♜', kind: 'greatsword',
    damage: 51, heavy: 104, reach: 3.35, speed: .74, stamina: 23, stagger: 1.8, cost: 2200, bleed: .2, break: 1.8,
    desc: 'Torn from the Pale Warden. The gold still remembers the hand that owned it. Now it remembers yours.'
  }
]

export const ARMORS = [
  {
    id: 'vigil-plate', name: 'VIGIL PLATE', type: 'BALANCED ARMOR', icon: '◈', cost: 0,
    health: 100, stamina: 100, defense: .18, speed: 1, desc: 'Blackened steel over a pilgrim’s habit. The last uniform of a dead order.'
  },
  {
    id: 'bloodletter-harness', name: "BLOODLETTER'S HARNESS", type: 'LIGHT ARMOR', icon: '♨', cost: 360,
    health: 88, stamina: 128, defense: .08, speed: 1.13, desc: 'Less iron, more room for lungs. Trade safety for the breath to keep swinging.'
  },
  {
    id: 'ironclad', name: 'IRONCLAD', type: 'HEAVY ARMOR', icon: '⬢', cost: 760,
    health: 132, stamina: 84, defense: .3, speed: .91, desc: 'A walking reliquary of dents. Slower on the sand, harder to put in it.'
  },
  {
    id: 'regent-shroud', name: 'REGENT SHROUD', type: 'CHAMPION ARMOR', icon: '♛', cost: 1650,
    health: 118, stamina: 112, defense: .24, speed: 1.04, desc: 'Taken from a champion who had never known the taste of sand. It fits you better than him.'
  }
]

const metalPalette = {
  steel: { color: 0x8e9496, metalness: .9, roughness: .3 },
  dark: { color: 0x3b3d3c, metalness: .85, roughness: .42 },
  gold: { color: 0xa77a3e, metalness: .86, roughness: .28 },
  iron: { color: 0x5b5e5e, metalness: .72, roughness: .48 },
  leather: { color: 0x2a1b14, metalness: .03, roughness: .94 },
  blood: { color: 0x5d130e, metalness: .2, roughness: .5 }
}

function mat(name, extra = {}) {
  return new THREE.MeshStandardMaterial({ ...metalPalette[name], ...extra })
}

function mesh(geo, material) {
  const m = new THREE.Mesh(geo, material)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function swordModel(bladeLen, bladeWidth, twoHand = false, gold = false) {
  const g = new THREE.Group()
  const steel = mat(gold ? 'gold' : 'steel')
  const dark = mat('dark')
  const leather = mat('leather')
  const guard = mesh(new THREE.BoxGeometry(bladeWidth * 4.3, .065, .12), dark)
  guard.position.y = .06
  g.add(guard)
  for (const x of [-1, 1]) {
    const tip = mesh(new THREE.ConeGeometry(.045, .16, 4), steel)
    tip.position.set(x * bladeWidth * 2.1, .08, 0); tip.rotation.z = x * Math.PI / 2
    g.add(tip)
  }
  const blade = mesh(new THREE.CylinderGeometry(bladeWidth * .12, bladeWidth * .5, bladeLen, 4), steel)
  blade.position.y = .07 + bladeLen / 2
  blade.rotation.y = Math.PI / 4
  blade.scale.z = .3
  g.add(blade)
  const fuller = mesh(new THREE.BoxGeometry(.014, bladeLen * .8, .02), mat('dark'))
  fuller.position.y = .11 + bladeLen / 2
  fuller.position.z = .018
  g.add(fuller)
  const tipGeo = new THREE.ConeGeometry(bladeWidth * .34, .28, 4)
  const bladeTip = mesh(tipGeo, steel)
  bladeTip.position.y = bladeLen + .21
  bladeTip.rotation.y = Math.PI / 4
  bladeTip.scale.z = .3
  g.add(bladeTip)
  const grip = mesh(new THREE.CylinderGeometry(.026, .03, twoHand ? .42 : .25, 8), leather)
  grip.position.y = -.13
  g.add(grip)
  for (let i = 0; i < 3; i++) {
    const wrap = mesh(new THREE.TorusGeometry(.031, .004, 4, 10), dark)
    wrap.rotation.x = Math.PI / 2; wrap.position.y = -.05 - i * .075
    g.add(wrap)
  }
  const pommel = mesh(new THREE.OctahedronGeometry(.055, 0), gold ? steel : dark)
  pommel.position.y = twoHand ? -.38 : -.28
  g.add(pommel)
  const rune = mesh(new THREE.BoxGeometry(.006, bladeLen * .45, .007), new THREE.MeshStandardMaterial({ color: 0x8f2c18, emissive: 0x9f2a12, emissiveIntensity: 1.4, roughness: .3 }))
  rune.position.set(0, .25 + bladeLen * .52, .024)
  g.add(rune)
  g.userData.tip = bladeTip
  g.userData.bladeLength = bladeLen
  return g
}

function axeModel(handleLen = 1.3, double = false, gold = false) {
  const g = new THREE.Group()
  const wood = new THREE.MeshStandardMaterial({ color: 0x3b2417, roughness: .93, metalness: .02 })
  const steel = mat(gold ? 'gold' : 'steel')
  const dark = mat('dark')
  const shaft = mesh(new THREE.CylinderGeometry(.026, .031, handleLen, 8), wood)
  shaft.position.y = handleLen / 2
  g.add(shaft)
  for (let i = 0; i < 4; i++) {
    const band = mesh(new THREE.TorusGeometry(.03, .006, 4, 10), dark)
    band.rotation.x = Math.PI / 2; band.position.y = .12 + i * .12
    g.add(band)
  }
  const shape = new THREE.Shape()
  shape.moveTo(0, -.1)
  shape.lineTo(.3, -.17)
  shape.quadraticCurveTo(.52, -.02, .48, .18)
  shape.quadraticCurveTo(.36, .31, .13, .24)
  shape.lineTo(0, .14)
  shape.closePath()
  const geo = new THREE.ExtrudeGeometry(shape, { depth: .055, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .012, bevelThickness: .012 })
  geo.center()
  const head = mesh(geo, steel)
  head.position.set(.22, handleLen - .16, 0)
  head.rotation.y = Math.PI / 2
  head.scale.set(1.1, 1.05, 1)
  g.add(head)
  if (double) {
    const head2 = head.clone()
    head2.position.x = -.22
    head2.rotation.y = -Math.PI / 2
    head2.scale.x = -1.1
    g.add(head2)
  }
  const spike = mesh(new THREE.ConeGeometry(.055, .24, 4), steel)
  spike.position.set(0, handleLen + .03, 0)
  g.add(spike)
  g.userData.tip = spike
  g.userData.bladeLength = handleLen
  return g
}

function maceModel() {
  const g = new THREE.Group()
  const steel = mat('steel')
  const dark = mat('dark')
  const shaft = mesh(new THREE.CylinderGeometry(.025, .03, 1.16, 8), mat('iron'))
  shaft.position.y = .58
  g.add(shaft)
  const grip = mesh(new THREE.CylinderGeometry(.032, .036, .24, 8), mat('leather'))
  grip.position.y = .08; g.add(grip)
  const ball = mesh(new THREE.IcosahedronGeometry(.175, 1), steel)
  ball.position.y = 1.24; g.add(ball)
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2
    const b = (i % 3 - 1) * .62
    const spike = mesh(new THREE.ConeGeometry(.032, .17, 4), dark)
    spike.position.set(Math.cos(a) * .22, 1.24 + Math.sin(b) * .2, Math.sin(a) * .22)
    spike.lookAt(spike.position.clone().multiplyScalar(2))
    g.add(spike)
  }
  const collar = mesh(new THREE.TorusGeometry(.055, .012, 5, 12), dark)
  collar.rotation.x = Math.PI / 2; collar.position.y = 1.05; g.add(collar)
  g.userData.tip = ball
  g.userData.bladeLength = 1.35
  return g
}

function hammerModel() {
  const g = new THREE.Group()
  const dark = mat('dark')
  const steel = mat('steel')
  const wood = new THREE.MeshStandardMaterial({ color: 0x3d291a, roughness: .92 })
  const shaft = mesh(new THREE.CylinderGeometry(.03, .038, 1.55, 8), wood)
  shaft.position.y = .775; g.add(shaft)
  for (let i = 0; i < 5; i++) {
    const band = mesh(new THREE.TorusGeometry(.038, .006, 4, 10), dark)
    band.rotation.x = Math.PI / 2; band.position.y = .1 + i * .13; g.add(band)
  }
  const head = mesh(new THREE.BoxGeometry(.56, .25, .29), steel)
  head.position.y = 1.63; g.add(head)
  for (const x of [-.25, .25]) {
    const cap = mesh(new THREE.BoxGeometry(.08, .32, .35), dark)
    cap.position.set(x, 1.63, 0); g.add(cap)
  }
  const sigil = mesh(new THREE.BoxGeometry(.2, .07, .012), new THREE.MeshStandardMaterial({ color: 0x742016, emissive: 0x8e2415, emissiveIntensity: .9 }))
  sigil.position.set(0, 1.63, .151); g.add(sigil)
  const spike = mesh(new THREE.ConeGeometry(.065, .26, 4), steel)
  spike.position.y = 1.86; g.add(spike)
  g.userData.tip = spike
  g.userData.bladeLength = 1.9
  return g
}

export function createWeapon(kind, variant = 0) {
  let group
  if (kind === 'sword') group = swordModel(1.02, .105, false, variant === 2)
  else if (kind === 'greatsword') group = swordModel(1.55, .145, true, variant !== 0)
  else if (kind === 'axe') group = axeModel(1.24, false, variant === 2)
  else if (kind === 'dualaxe') group = axeModel(1.02, false, false)
  else if (kind === 'mace') group = maceModel()
  else if (kind === 'hammer') group = hammerModel()
  else group = swordModel(1, .1)
  group.userData.kind = kind
  setShadow(group)
  return group
}

export function createShield(color = 0x3d1110) {
  const g = new THREE.Group()
  const wood = new THREE.MeshStandardMaterial({ color: 0x352219, roughness: .9 })
  const rim = mat('dark')
  const face = new THREE.MeshStandardMaterial({ color, roughness: .72, metalness: .08 })
  const base = mesh(new THREE.CylinderGeometry(.38, .35, .07, 12), wood)
  base.rotation.x = Math.PI / 2
  base.scale.z = 1.18
  g.add(base)
  const cover = mesh(new THREE.CircleGeometry(.36, 12), face)
  cover.position.z = .042; cover.scale.y = 1.18
  g.add(cover)
  const ring = mesh(new THREE.TorusGeometry(.36, .023, 6, 20), rim)
  ring.scale.y = 1.18
  ring.position.z = .045
  g.add(ring)
  const boss = mesh(new THREE.SphereGeometry(.09, 10, 6), mat('steel'))
  boss.scale.z = .42; boss.position.z = .075; g.add(boss)
  return g
}

export function getWeapon(id) {
  return WEAPONS.find(w => w.id === id) || WEAPONS[0]
}

export function getArmor(id) {
  return ARMORS.find(a => a.id === id) || ARMORS[0]
}
