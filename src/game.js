import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { Character, ENEMY_TYPES } from './character.js'
import { Arena, ARENAS, createEnvironmentMap } from './arena.js'
import { Effects } from './effects.js'
import { AudioEngine } from './audio.js'
import { UI } from './ui.js'
import { WEAPONS, ARMORS, getWeapon, getArmor } from './weapons.js'
import { clamp, damp, dampAngle, rand, randInt, pick, chance, roman, shortestAngle, formatNumber } from './utils.js'

const SAVE_KEY = 'iron-requiem-save-v1'
const SETTINGS_KEY = 'iron-requiem-settings-v1'

const BOONS = [
  { id: 'iron-skin', name: 'IRON SKIN', icon: '⬢', desc: 'Gain 20 maximum Vitality and heal 20. The plate grows around your bones.', rarity: 'FORTITUDE', apply: g => { g.maxHealth += 20; g.player.char.maxHealth += 20; g.heal(20) } },
  { id: 'second-wind', name: 'SECOND WIND', icon: '≋', desc: 'Gain 24 maximum Stamina and regenerate it 20% faster.', rarity: 'ENDURANCE', apply: g => { g.maxStamina += 24; g.staminaRegen *= 1.2 } },
  { id: 'keen-edge', name: 'KEEN EDGE', icon: '⟡', desc: 'All weapon damage increased by 14%.', rarity: 'STEEL', apply: g => { g.damageMul *= 1.14 } },
  { id: 'bloodthirst', name: 'BLOODTHIRST', icon: '♨', desc: 'Heal for 9% of all damage dealt. The fallen feed you.', rarity: 'HUNGER', apply: g => { g.lifesteal += .09 } },
  { id: 'butchers-rhythm', name: "BUTCHER'S RHYTHM", icon: '⌁', desc: 'Attacks and dodges cost 22% less Stamina.', rarity: 'TEMPO', apply: g => { g.staminaCostMul *= .78 } },
  { id: 'thick-blood', name: 'THICK BLOOD', icon: '◉', desc: 'Take 14% less damage from all sources.', rarity: 'SURVIVAL', apply: g => { g.damageTakenMul *= .86 } },
  { id: 'executioner', name: "EXECUTIONER'S DUE", icon: '☠', desc: 'Executions cost 10 less Bloodlust and restore 30 Vitality.', rarity: 'CRUELTY', apply: g => { g.executeCost = Math.max(20, g.executeCost - 10); g.executeHeal += 18 } },
  { id: 'ruin', name: 'RUIN', icon: '✦', desc: 'Armor breaks 55% faster under your blows.', rarity: 'RUIN', apply: g => { g.breakMul *= 1.55 } },
  { id: 'warlords-stride', name: "WARLORD'S STRIDE", icon: '➤', desc: 'Move 10% faster and dodge 15% farther.', rarity: 'MOTION', apply: g => { g.moveSpeedMul *= 1.1; g.dodgeMul *= 1.15 } },
  { id: 'blood-price', name: 'BLOOD PRICE', icon: '♦', desc: 'Gain 40 Bloodlust now and 20 at the start of every wave.', rarity: 'RAGE', apply: g => { g.waveRage += 20; g.rage = Math.min(100, g.rage + 40) } }
]

function loadJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v && typeof v === 'object' ? { ...fallback, ...v } : fallback
  } catch { return fallback }
}

export class Game {
  constructor() {
    this.canvas = document.getElementById('stage')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .07, 260)
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance', stencil: false })
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.3
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor(0x080605, 1)
    this.applyPixelRatio()

    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)
    this.bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth * .55, innerHeight * .55), .36, .66, .9)
    this.composer.addPass(this.bloom)
    this.composer.addPass(new OutputPass())

    this.clock = new THREE.Clock()
    this.time = 0
    this.realTime = 0
    this.state = 'title'
    this.arena = new Arena(this.scene, this.renderer)
    this.effects = new Effects(this.scene, this.camera)
    this.audio = new AudioEngine()
    this.ui = new UI(this.audio)
    this.meta = loadJSON(SAVE_KEY, {
      marks: 0, unlockedWeapons: ['ashen-longsword'], unlockedArmor: ['vigil-plate'],
      weapon: 'ashen-longsword', armor: 'vigil-plate', bestWave: 0, renown: 0, kills: 0, runs: 0
    })
    this.settings = loadJSON(SETTINGS_KEY, { volume: .75, sensitivity: 100, gore: 2, scale: 0, shake: true, motion: false })
    this.weapon = getWeapon(this.meta.weapon)
    this.armor = getArmor(this.meta.armor)
    this.enemies = []
    this.enemyId = 1
    this.spawnQueue = []
    this.spawnTimer = 0
    this.activeLimit = 2
    this.yaw = 0
    this.pitch = .17
    this.cameraDist = 5.9
    this.cameraShoulder = -1.12
    this.intro = 1
    this.timeScale = 1
    this.slowmoTimer = 0
    this.freezeTimer = 0
    this.hitstop = 0
    this.execution = null
    this.deathTimer = 0
    this.deathShown = false
    this.waveClearTimer = -1
    this.wave = 1
    this.themeIndex = 0
    this.waveActive = false
    this.keys = {}
    this.touch = { active: false, moveX: 0, moveY: 0, lookId: null, lastX: 0, lastY: 0 }
    this.attackBuffer = null
    this.uiTimer = 0
    this.lastStep = 0
    this.pointerLocked = false
    this.shakeEnabled = this.settings.shake && !this.settings.motion

    this.scene.environment = createEnvironmentMap(this.renderer)
    this.scene.environmentIntensity = .95
    this.setupWorld()
    this.ui.setSettings(this.settings)
    this.ui.updateTitleLoadout(this.meta)
    this.audio.setVolume(this.settings.volume)
    this.bindUI()
    this.bindInput()
    this.resetRunData()
    this.spawnPlayer()
    this.arena.build(0)
    this.player.root.position.set(0, 0, 3.1)
    this.player.root.rotation.y = .16
    this.player.state = 'idle'
    this.player.speedActual = 0
    this.ui.showTitle()
    this.ui.setTouch(this.isTouchDevice())
    this.resize()
    addEventListener('resize', () => this.resize())
    this.animate = this.animate.bind(this)
    this.animate()
    setTimeout(() => this.ui.hideLoading(), 260)
  }

  applyPixelRatio() {
    const cap = this.settings?.scale === 2 ? 1 : this.settings?.scale === 1 ? 2 : 1.5
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, cap))
  }

  resize() {
    const w = innerWidth, h = innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.composer.setSize(w, h)
    this.bloom.setSize(w * .55, h * .55)
    this.applyPixelRatio()
  }

  isTouchDevice() {
    return matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  setupWorld() {
    // A warm rim light follows the action without casting shadows.
    this.rimLight = new THREE.PointLight(0xffc58a, 8.5, 11, 2)
    this.scene.add(this.rimLight)
    this.playerLight = new THREE.PointLight(0xaacbff, 2.4, 10, 2)
    this.scene.add(this.playerLight)
    this.heroLight = new THREE.SpotLight(0xffe0b0, 14, 24, .44, .75, 1.6)
    this.heroLight.position.set(0, 14, 6)
    this.heroLight.target.position.set(0, 0, 4)
    this.scene.add(this.heroLight, this.heroLight.target)
  }

  spawnPlayer() {
    if (this.player) {
      this.player.dispose()
      this.scene.remove(this.player.root)
    }
    const armor = getArmor(this.meta.armor)
    const weapon = getWeapon(this.meta.weapon)
    this.weapon = weapon
    this.armor = armor
    this.baseMaxHealth = armor.health
    this.baseMaxStamina = armor.stamina
    this.maxHealth = this.baseMaxHealth
    this.maxStamina = this.baseMaxStamina
    this.damageMul = 1
    this.staminaRegen = 21
    this.staminaCostMul = 1
    this.damageTakenMul = 1
    this.lifesteal = 0
    this.breakMul = 1
    this.moveSpeedMul = 1
    this.dodgeMul = 1
    this.executeCost = 40
    this.executeHeal = 12
    this.waveRage = 0
    this.player = new Character(this.scene, {
      player: true, health: this.maxHealth, armor: 100,
      weaponData: weapon, healthScale: 1
    })
    this.player.maxHealth = this.maxHealth
    this.player.health = this.maxHealth
    this.player.speed = 4.0 * armor.speed
    this.player.root.position.set(0, 0, 8)
    this.player.root.rotation.y = Math.PI
    this.player.onArmorBreak = piece => this.onPlayerArmorBreak(piece)
    this.player.getWeaponTip()
  }

  resetRunData() {
    this.wave = 1
    this.kills = 0
    this.score = 0
    this.runMarks = 0
    this.chain = 1
    this.chainTimer = 0
    this.rage = 0
    this.combo = 0
    this.comboWindow = 0
    this.stamina = this.maxStamina || 100
    this.staminaDelay = 0
    this.blockStart = -10
    this.blocking = false
    this.blockBroken = false
    this.lastDamageTime = -10
    this.attackCooldown = 0
    this.attackStep = 0
    this.playerInvuln = 0
    this.hazardCooldown = 0
    this.waveActive = false
    this.spawnQueue = []
    this.spawnTimer = 0
    this.waveClearTimer = -1
    this.deathTimer = 0
    this.deathShown = false
    this.boons = []
    this.boonChoices = []
    this.enemyAttacks = 0
    this.runStart = this.realTime
    this.themeIndex = 0
    this.playerKnockback = new THREE.Vector3()
  }

  bindUI() {
    this.ui.bind({
      start: () => this.startRun(),
      armory: () => this.openArmory('title'),
      settings: () => this.openSettings(),
      codex: () => this.ui.openOverlay('codex'),
      resume: () => this.resume(),
      abandon: () => this.abandonRun(),
      retry: () => { this.ui.closeAllOverlays(); this.startRun() },
      menu: () => { this.ui.closeAllOverlays(); this.toTitle() },
      nextWave: () => this.nextWave(),
      boonChosen: boon => this.chooseBoon(boon),
      setting: (key, value) => this.changeSetting(key, value),
      closeSettings: () => this.closeSettings(),
      armoryAction: (tab, id) => this.armoryAction(tab, id)
    })
  }

  bindInput() {
    const keyMap = { KeyW: 'forward', KeyS: 'back', KeyA: 'left', KeyD: 'right', ShiftLeft: 'sprint', ShiftRight: 'sprint', Space: 'dodge', KeyQ: 'heavy', KeyE: 'execute' }
    addEventListener('keydown', e => {
      if (e.code === 'Escape') { e.preventDefault(); this.togglePause(); return }
      if (e.code === 'Tab') e.preventDefault()
      const k = keyMap[e.code]
      if (k) this.keys[k] = true
      if (this.state !== 'playing' || this.ui.currentOverlay) return
      if (e.code === 'Space') { e.preventDefault(); this.tryDodge() }
      if (e.code === 'KeyQ') { e.preventDefault(); this.tryAttack('heavy') }
      if (e.code === 'KeyE') { e.preventDefault(); this.tryExecute() }
    })
    addEventListener('keyup', e => {
      const k = keyMap[e.code]
      if (k) this.keys[k] = false
    })
    this.canvas.addEventListener('mousedown', e => {
      if (this.state !== 'playing' || this.ui.currentOverlay) return
      if (e.button === 0) {
        if (!this.pointerLocked && !this.isTouchDevice()) this.requestLock()
        this.tryAttack('light')
      } else if (e.button === 2) {
        this.startBlock()
      }
    })
    addEventListener('mouseup', e => {
      if (e.button === 2) this.endBlock()
    })
    this.canvas.addEventListener('contextmenu', e => e.preventDefault())
    document.addEventListener('mousemove', e => {
      if (this.state !== 'playing' || this.ui.currentOverlay) return
      if (!this.pointerLocked && !this.touch.dragging) return
      if (this.touch.dragging) return
      this.yaw -= e.movementX * (this.settings.sensitivity / 100) * .0022
      this.pitch = clamp(this.pitch + e.movementY * (this.settings.sensitivity / 100) * .0017, -.18, .82)
    })
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas
      if (!this.pointerLocked) this.endBlock()
    })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause()
    })
    this.bindTouch()
  }

  requestLock() {
    if (this.isTouchDevice()) return
    try { this.canvas.requestPointerLock() } catch {}
  }

  bindTouch() {
    const stick = document.getElementById('joystick')
    const knob = stick.querySelector('b')
    let stickId = null
    const updateStick = (e) => {
      const r = stick.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
      const len = Math.hypot(x, y)
      const nx = len > 1 ? x / len : x
      const ny = len > 1 ? y / len : y
      this.touch.moveX = nx
      this.touch.moveY = ny
      knob.style.transform = `translate(${nx * 27}px, ${ny * 27}px)`
    }
    stick.addEventListener('pointerdown', e => {
      stickId = e.pointerId; stick.setPointerCapture(e.pointerId); updateStick(e); e.preventDefault()
    })
    stick.addEventListener('pointermove', e => { if (e.pointerId === stickId) updateStick(e) })
    const endStick = e => {
      if (e.pointerId !== stickId) return
      stickId = null; this.touch.moveX = 0; this.touch.moveY = 0
      knob.style.transform = ''
    }
    stick.addEventListener('pointerup', endStick)
    stick.addEventListener('pointercancel', endStick)

    const lookZone = this.canvas
    lookZone.addEventListener('pointerdown', e => {
      if (!this.isTouchDevice() || this.state !== 'playing') return
      if (e.clientX < innerWidth * .42) return
      this.touch.lookId = e.pointerId; this.touch.lastX = e.clientX; this.touch.lastY = e.clientY; this.touch.dragging = true
      lookZone.setPointerCapture?.(e.pointerId)
    })
    lookZone.addEventListener('pointermove', e => {
      if (!this.touch.dragging || e.pointerId !== this.touch.lookId) return
      const dx = e.clientX - this.touch.lastX
      const dy = e.clientY - this.touch.lastY
      this.yaw -= dx * .006 * (this.settings.sensitivity / 100)
      this.pitch = clamp(this.pitch + dy * .0045, -.18, .82)
      this.touch.lastX = e.clientX; this.touch.lastY = e.clientY
    })
    const endLook = e => {
      if (e.pointerId !== this.touch.lookId) return
      this.touch.dragging = false; this.touch.lookId = null
    }
    lookZone.addEventListener('pointerup', endLook)
    lookZone.addEventListener('pointercancel', endLook)

    document.querySelectorAll('[data-touch]').forEach(btn => {
      btn.addEventListener('pointerdown', e => {
        e.preventDefault()
        if (this.state !== 'playing') return
        const a = btn.dataset.touch
        if (a === 'attack') this.tryAttack('light')
        if (a === 'heavy') this.tryAttack('heavy')
        if (a === 'dodge') this.tryDodge()
        if (a === 'execute') this.tryExecute()
        if (a === 'block') this.startBlock()
      })
      if (btn.dataset.touch === 'block') {
        const end = () => this.endBlock()
        btn.addEventListener('pointerup', end)
        btn.addEventListener('pointercancel', end)
      }
    })
  }

  togglePause() {
    if (this.state === 'playing') this.pause()
    else if (this.state === 'paused') this.resume()
    else if (this.ui.currentOverlay && this.ui.currentOverlay !== 'boons') {
      if (this.state === 'title') this.ui.closeAllOverlays()
      else if (this.ui.currentOverlay === 'settings') this.closeSettings()
    }
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.ui.setPauseStats(this.wave, this.kills, this.score)
    this.ui.showPause(true)
    this.endBlock()
    if (document.pointerLockElement) document.exitPointerLock()
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = 'playing'
    this.ui.showPause(false)
    this.requestLock()
  }

  openSettings() {
    if (this.state === 'playing') this.pause()
    this.settingsReturn = this.ui.currentOverlay
    this.ui.closeOverlay('pause')
    this.ui.openOverlay('settings')
  }

  closeSettings() {
    this.ui.closeOverlay('settings')
    if (this.state === 'paused') this.ui.openOverlay('pause')
    if (this.state === 'title') this.ui.showTitle()
  }

  openArmory(context = 'title') {
    if (this.state === 'playing') this.pause()
    this.armoryContext = context
    this.ui.showArmory(this.meta, { weapon: this.meta.weapon, armor: this.meta.armor })
  }

  armoryAction(tab, id) {
    const list = tab === 'weapons' ? WEAPONS : ARMORS
    const item = list.find(i => i.id === id)
    if (!item) return
    const unlockedKey = tab === 'weapons' ? 'unlockedWeapons' : 'unlockedArmor'
    const equipKey = tab === 'weapons' ? 'weapon' : 'armor'
    let unlocked = this.meta[unlockedKey]
    if (!unlocked.includes(id)) {
      if (this.meta.marks < item.cost) return
      this.meta.marks -= item.cost
      this.meta[unlockedKey] = [...unlocked, id]
      this.audio.unlock()
      this.ui.toast(`${item.name} UNLOCKED`, 'gold')
    }
    this.meta[equipKey] = id
    this.saveMeta()
    this.ui.updateTitleLoadout(this.meta)
    if (tab === 'weapons') { this.weapon = getWeapon(id); this.meta.weapon = id }
    else { this.armor = getArmor(id); this.meta.armor = id }
    this.ui.renderArmory(this.meta, { weapon: this.meta.weapon, armor: this.meta.armor })
    this.ui.toast(`${item.name} EQUIPPED`, 'gold')
    if (this.state === 'title') this.refreshTitlePlayer()
  }

  refreshTitlePlayer() {
    this.spawnPlayer()
    this.player.root.position.set(0, 0, 3.1)
    this.player.root.rotation.y = .16
    this.ui.updateTitleLoadout(this.meta)
  }

  saveMeta() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.meta)) } catch {}
  }

  saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings)) } catch {}
  }

  changeSetting(key, value) {
    this.settings[key] = value
    if (key === 'volume') this.audio.setVolume(value / 100)
    if (key === 'scale') { this.applyPixelRatio(); this.resize() }
    if (key === 'shake' || key === 'motion') this.shakeEnabled = this.settings.shake && !this.settings.motion
    this.saveSettings()
  }

  startRun() {
    this.audio.start()
    this.ui.closeAllOverlays()
    this.ui.hideTitle()
    this.ui.enterGame()
    this.state = 'playing'
    this.endBlock()
    this.clearEnemies()
    this.resetRunData()
    this.spawnPlayer()
    this.player.root.position.set(0, 0, 8)
    this.player.root.rotation.y = Math.PI
    this.meta.runs = (this.meta.runs || 0) + 1
    this.themeIndex = 0
    this.arena.build(0)
    this.yaw = 0
    this.pitch = .17
    this.cameraDist = 5.9
    this.intro = 1
    this.startWave(1)
    this.requestLock()
    this.ui.toast('THE CROWD REMEMBERS YOU', 'blood')
    setTimeout(() => this.ui.showAnnouncement('THE GATE OPENS', 'WAVE I', 'SURVIVE THE CROWD’S HUNGER', false, 2600), 650)
  }

  clearEnemies() {
    for (const e of this.enemies) {
      e.char.onArmorBreak = null
      e.char.onDecapitate = null
      e.char.dispose()
    }
    this.enemies = []
    this.ui.clearEnemyBars()
  }

  startWave(wave) {
    this.wave = wave
    this.waveActive = true
    this.waveClearTimer = -1
    this.spawnTimer = 0
    this.attackStep = 0
    this.chain = 1
    this.chainTimer = 0
    this.combo = 0
    this.rage = Math.min(100, this.rage + this.waveRage)
    const theme = Math.floor((wave - 1) / 4) % 3
    if (theme !== this.themeIndex) {
      this.themeIndex = theme
      this.arena.build(theme)
      this.ui.showAnnouncement('THE GROUND SHIFTS', ARENAS[theme].name, 'A NEW TRIAL BEGINS', false, 3000)
    }
    const boss = wave % 5 === 0
    if (!boss) this.ui.setBoss(null)
    this.activeLimit = boss ? 2 : Math.min(4, 1 + Math.ceil(wave / 2.2))
    this.spawnQueue = this.composeWave(wave, boss)
    this.ui.setWave(wave, ARENAS[this.themeIndex].name, boss ? 'BREAK THE CHAMPION' : ARENAS[this.themeIndex].sub, boss)
    this.audio.waveHorn(boss)
    this.arena.excite(.35)
    if (boss) this.ui.showAnnouncement('CHAMPION OF THE PIT', ENEMY_TYPES.champion.name, 'NO MERCY IS GIVEN', true, 3400)
    else this.ui.showAnnouncement('THE CROWD RISES', `WAVE ${roman(wave)}`, 'SURVIVE', false, 2200)
  }

  composeWave(wave, boss) {
    const q = []
    if (boss) {
      q.push('champion')
      if (wave >= 10) q.push('knight')
      if (wave >= 15) q.push('berserker')
      if (wave >= 20) q.push('knight')
      return q
    }
    const count = Math.min(9, 2 + Math.floor((wave - 1) * .58))
    for (let i = 0; i < count; i++) {
      let type = 'gladiator'
      const r = Math.random()
      if (wave >= 9) type = r < .35 ? 'gladiator' : r < .68 ? 'knight' : 'berserker'
      else if (wave >= 6) type = r < .45 ? 'gladiator' : r < .72 ? 'knight' : 'berserker'
      else if (wave >= 3) type = r < .66 ? 'gladiator' : 'berserker'
      else if (wave >= 2) type = r < .85 ? 'gladiator' : 'berserker'
      q.push(type)
    }
    return q
  }

  updateSpawns(dt) {
    if (!this.waveActive || this.spawnQueue.length === 0) return
    const alive = this.enemies.filter(e => !e.char.dead).length
    if (alive >= this.activeLimit) return
    this.spawnTimer -= dt
    if (this.spawnTimer > 0) return
    const type = this.spawnQueue.shift()
    this.spawnEnemy(type)
    this.spawnTimer = this.spawnQueue.length ? rand(.6, 1.1) : 0
  }

  spawnEnemy(type) {
    const def = ENEMY_TYPES[type]
    const boss = type === 'champion'
    const waveScale = 1 + (this.wave - 1) * .055
    const health = Math.round(def.health * (boss ? 1 + Math.floor(this.wave / 5) * .1 : waveScale))
    const char = new Character(this.scene, { type, health, armor: def.armor, weaponData: { kind: def.weapon } })
    char.def = def
    char.maxHealth = health
    char.health = health
    char.speed = def.speed * (1 + Math.min(.2, (this.wave - 1) * .008))
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw))
    const spawnDist = boss ? 16 : rand(11.5, 15.5)
    let pos = this.player.root.position.clone()
      .addScaledVector(forward, spawnDist)
      .addScaledVector(right, boss ? 0 : rand(-6, 6))
    pos.y = 0
    this.arena.clampToArena(pos, 1.2)
    char.root.position.copy(pos)
    char.root.rotation.y = Math.atan2(this.player.root.position.x - pos.x, this.player.root.position.z - pos.z)
    const e = {
      id: this.enemyId++, type, def, char, boss,
      state: 'approach', cooldown: rand(.9, 1.8), blockCd: rand(.8, 2), blockTimer: 0, guard: boss ? 5 : def.shield ? 2 : 0,
      strafe: chance(.5) ? 1 : -1, decision: 0, removeTimer: 0, hitFlash: 0, knock: new THREE.Vector3(),
      staggerResist: boss ? 1 : 0, dyingAwarded: false
    }
    char.onArmorBreak = piece => this.onEnemyArmorBreak(e, piece)
    char.onDecapitate = () => {
      const p = new THREE.Vector3(); char.getHeadPosition(p); p.y -= .3
      this.effects.spawnHead(p, 0x8d624d, def.boss ? 0x333334 : 0x5c5150)
    }
    this.enemies.push(e)
    if (boss) {
      this.ui.setBoss(e)
      this.arena.excite(.7)
      this.audio.roar(true)
      this.effects.dust(char.root.position, 18, 0x8e735c, 1.6)
    } else {
      this.effects.dust(char.root.position, 9, 0x8a7258, 1)
    }
    return e
  }

  updatePlayer(dt) {
    const c = this.player
    if (this.state === 'dead') { c.update(dt); return }
    if (this.execution) { c.update(dt); return }
    if (this.attackCooldown > 0) this.attackCooldown -= dt
    if (this.playerInvuln > 0) this.playerInvuln -= dt
    if (this.hazardCooldown > 0) this.hazardCooldown -= dt
    if (this.chainTimer > 0) { this.chainTimer -= dt; if (this.chainTimer <= 0) { this.chain = 1; this.combo = 0 } }
    if (this.comboWindow > 0) { this.comboWindow -= dt; if (this.comboWindow <= 0) this.attackStep = 0 }

    const canMove = c.state !== 'attack' && c.state !== 'hit' && c.state !== 'dead' && !this.blocking
    let move = new THREE.Vector3()
    if (canMove) {
      const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
      const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw))
      if (this.keys.forward) move.add(forward)
      if (this.keys.back) move.sub(forward)
      if (this.keys.right) move.add(right)
      if (this.keys.left) move.sub(right)
      if (this.touch.moveX || this.touch.moveY) {
        move.addScaledVector(right, this.touch.moveX)
        move.addScaledVector(forward, -this.touch.moveY)
      }
      if (move.lengthSq() > 1) move.normalize()
    }
    const sprinting = this.keys.sprint && move.lengthSq() > .01 && this.stamina > 1
    let speed = this.player.speed * this.moveSpeedMul * (sprinting ? 1.32 : 1)
    if (this.blocking) speed *= .3
    if (c.state === 'dodge') speed = this.player.speed * 2.35 * this.dodgeMul
    if (c.state === 'hit') speed = 0
    if (sprinting) {
      this.stamina = Math.max(0, this.stamina - 12 * dt)
      this.staminaDelay = .6
    }
    if (this.blocking) {
      this.stamina = Math.max(0, this.stamina - 5 * dt)
      this.staminaDelay = .4
      if (this.stamina <= 0) this.breakGuard()
    }
    if (move.lengthSq() > .01) {
      c.root.position.addScaledVector(move, speed * dt)
      if (canMove || c.state === 'dodge') {
        const desired = Math.atan2(move.x, move.z)
        c.root.rotation.y = dampAngle(c.root.rotation.y, desired, c.state === 'dodge' ? 20 : 12, dt)
      }
    }
    c.root.position.addScaledVector(this.playerKnockback, dt)
    this.playerKnockback.multiplyScalar(Math.max(0, 1 - dt * 12))
    this.arena.clampToArena(c.root.position, .55)
    c.speedActual = move.lengthSq() > .01 ? speed : 0
    if (c.state === 'dodge' && c.stateTime > .39) { c.state = 'idle'; c.stateTime = 0 }
    if (c.state === 'dodge') this.playerInvuln = Math.max(this.playerInvuln, .03)

    // stamina recovery
    this.staminaDelay = Math.max(0, this.staminaDelay - dt)
    if (this.staminaDelay <= 0 && !sprinting && !this.blocking) {
      this.stamina = Math.min(this.maxStamina, this.stamina + this.staminaRegen * dt)
    }
    if (c.state === 'attack') {
      // minor forward momentum
      const forward = new THREE.Vector3(Math.sin(c.root.rotation.y), 0, Math.cos(c.root.rotation.y))
      c.root.position.addScaledVector(forward, dt * (this.player.attackType === 'heavy' ? .8 : 1.2))
      this.arena.clampToArena(c.root.position, .55)
    }
    c.update(dt)
    if (c.events.swing) {
      c.events.swing = false
      this.audio.swing(c.attackType === 'heavy' ? 1.25 : .9)
      const ip = c.root.position.clone()
      this.effects.slash(ip, c.root.rotation.y, c.attackType === 'heavy')
    }
    if (c.events.hit) {
      c.events.hit = false
      this.resolvePlayerAttack()
    }
    if (this.attackBuffer && this.attackBuffer.time > 0) {
      this.attackBuffer.time -= dt
      if (c.state === 'idle' && this.attackCooldown <= 0) {
        const t = this.attackBuffer.type
        this.attackBuffer = null
        this.tryAttack(t)
      } else if (this.attackBuffer.time <= 0) this.attackBuffer = null
    }
    if (c.state === 'idle') this.playerInvuln = Math.max(0, this.playerInvuln - dt * 10)
    if (this.stamina <= .5) this.blockBroken = true

    // footsteps
    if (c.speedActual > .3 && c.state === 'idle') {
      this.stepTimer = (this.stepTimer || 0) + dt * c.speedActual
      if (this.stepTimer > 2.1) {
        this.stepTimer = 0
        this.audio.footstep(this.themeIndex === 0 ? 0 : 1)
      }
    }
  }

  tryAttack(type) {
    if (this.state !== 'playing' || this.execution || this.player.dead) return
    const c = this.player
    if (c.state === 'hit' || c.state === 'dodge') return
    if (c.state === 'attack') { this.attackBuffer = { type, time: .38 }; return }
    if (this.attackCooldown > 0) return
    if (this.stamina < (type === 'heavy' ? 20 : 9)) {
      this.ui.toast('STAMINA SPENT', 'blood')
      this.audio.ui()
      return
    }
    const heavy = type === 'heavy'
    const cost = (heavy ? this.weapon.stamina * 1.65 : this.weapon.stamina) * this.staminaCostMul
    if (this.stamina < cost) { this.ui.toast('STAMINA SPENT', 'blood'); return }
    this.stamina -= cost
    this.staminaDelay = .9
    this.blocking = false
    const duration = (heavy ? .78 : .43 + (this.attackStep % 2) * .015) / this.weapon.speed
    this.player.attackType = heavy ? 'heavy' : 'light'
    c.startAttack(this.player.attackType, duration)
    // face the closest target or camera forward
    const target = this.closestEnemyInFront(4.7, 1.25)
    if (target) {
      const d = target.char.root.position.clone().sub(c.root.position)
      c.root.rotation.y = Math.atan2(d.x, d.z)
    } else {
      c.root.rotation.y = Math.atan2(-Math.sin(this.yaw), -Math.cos(this.yaw))
    }
    if (!heavy) {
      this.attackStep++
      this.comboWindow = 1.05
      this.attackCooldown = .08
    } else {
      this.attackStep = 0
      this.attackCooldown = .25
    }
  }

  closestEnemyInFront(maxDist = 4.5, maxAngle = 1.2) {
    const c = this.player
    let best = null, bestScore = Infinity
    for (const e of this.enemies) {
      if (e.char.dead || e.removed) continue
      const d = e.char.root.position.clone().sub(c.root.position)
      const dist = d.length()
      if (dist > maxDist) continue
      const ang = Math.abs(shortestAngle(c.root.rotation.y, Math.atan2(d.x, d.z)))
      if (ang > maxAngle) continue
      const score = dist + ang * 1.6
      if (score < bestScore) { bestScore = score; best = e }
    }
    return best
  }

  resolvePlayerAttack() {
    const c = this.player
    const heavy = c.attackType === 'heavy'
    const range = this.weapon.reach + (heavy ? .35 : .2)
    const facing = c.root.rotation.y
    const hits = []
    for (const e of this.enemies) {
      if (e.char.dead || e.removed) continue
      const d = e.char.root.position.clone().sub(c.root.position)
      const dist = Math.hypot(d.x, d.z)
      if (dist > range + .35) continue
      const ang = Math.abs(shortestAngle(facing, Math.atan2(d.x, d.z)))
      if (ang > (heavy ? .82 : 1.08)) continue
      hits.push({ e, dist, ang })
    }
    if (!hits.length) {
      this.audio.swing(.7)
      return
    }
    const base = heavy ? this.weapon.heavy : this.weapon.damage
    for (const { e } of hits) {
      const dir = e.char.root.position.clone().sub(c.root.position).normalize()
      const facingPlayer = Math.abs(shortestAngle(e.char.root.rotation.y, Math.atan2(-dir.x, -dir.z))) < 1.25
      if ((e.char.state === 'block' || e.blockTimer > 0) && facingPlayer) {
        e.guard -= heavy ? 2 : 1
        this.effects.sparksBurst(e.char.getChestPosition(), dir.clone().negate(), heavy ? 26 : 14, heavy ? 1.4 : 1)
        this.audio.block()
        this.ui.hitMarker(heavy)
        this.effects.shake(heavy ? .3 : .12)
        this.hitstop = Math.max(this.hitstop, .035)
        this.chain = Math.max(1, this.chain * .75)
        if (e.guard <= 0) {
          e.blockTimer = 0
          e.char.stagger(1.4)
          e.char.shieldBroken = true
          if (e.char.shield) {
            e.char.shield.visible = false
            this.effects.spawnDebris(e.char.root.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0x4a281c, .2)
          }
          this.ui.toast('GUARD BROKEN', 'gold')
          this.audio.parry()
          e.guard = 2
        }
        continue
      }
      let dmg = base * this.damageMul * rand(.93, 1.07)
      if (e.char.state === 'hit') dmg *= 1.12
      const result = e.char.takeHit(dmg, {
        heavy, breakPower: this.weapon.break * this.breakMul,
        side: Math.sign(dir.x) || 1,
        ignoreArmor: false
      })
      if (!result) continue
      const chest = e.char.getChestPosition()
      const bloodAmount = Math.round((heavy ? 34 : 20) * (this.settings.gore / 2 + .15))
      this.effects.bloodBurst(chest, dir, bloodAmount, heavy ? 1.25 : .85)
      this.effects.sparksBurst(chest, dir.clone().negate(), heavy ? 14 : 6, .7)
      this.audio.hit(heavy ? 1.45 : .9, e.char.armor > 0)
      this.audio.flesh(heavy ? 1.4 : .8)
      this.ui.hitMarker(heavy)
      this.ui.flashBlood()
      this.hitstop = Math.max(this.hitstop, heavy ? .085 : .045)
      if (this.shakeEnabled) this.effects.shake(heavy ? .48 : .2)
      this.effects.floatText(chest, `${Math.round(result.damage)}`, result.broken ? 'crit' : '')
      if (result.broken) this.ui.toast(`${result.broken.label} SHATTERED`, 'gold')
      if (result.damage > 0 && this.lifesteal > 0) this.heal(result.damage * this.lifesteal, true)
      this.rage = Math.min(100, this.rage + (heavy ? 13 : 6.5))
      this.chain = Math.min(4, this.chain + (heavy ? .35 : .22))
      this.chainTimer = 1.7
      this.combo++
      this.score += Math.round(result.damage * 8 * this.chain)
      if (result.killed) this.onEnemyKilled(e, heavy)
      else if (e.char.armor > 0) e.char.addWound()
    }
  }

  onEnemyArmorBreak(e, piece) {
    const pos = new THREE.Vector3()
    piece.mesh.getWorldPosition(pos)
    this.effects.spawnDebris(pos, piece.mesh.material?.color?.getHex?.() || 0x5c5c5c, .18, null, 'metal')
    if (this.settings.gore > 0) this.effects.bloodBurst(pos, new THREE.Vector3(0, .2, 0), Math.round(7 * this.settings.gore), .7)
    this.audio.hit(1.1, true)
  }

  onPlayerArmorBreak(piece) {
    const pos = new THREE.Vector3()
    piece.mesh.getWorldPosition(pos)
    this.effects.spawnDebris(pos, 0x4a4e4d, .16, null, 'metal')
    this.ui.toast(`${piece.label} SHATTERED`, 'blood')
  }

  onEnemyKilled(e, heavy = false) {
    if (e.dyingAwarded) return
    e.dyingAwarded = true
    this.kills++
    this.score += Math.round(e.def.score * this.chain)
    const marks = Math.round(e.def.marks * (1 + this.wave * .035))
    this.runMarks += marks
    this.rage = Math.min(100, this.rage + (e.boss ? 30 : 9))
    this.audio.death()
    this.arena.excite(e.boss ? 1 : .28)
    if (e.boss) {
      this.ui.setBoss(null)
      this.ui.showAnnouncement('THE CHAMPION FALLS', e.def.name, 'THE CROWD HAS A NEW GOD', true, 3400)
      this.audio.waveHorn(true)
      this.effects.sparksBurst(e.char.getChestPosition(), new THREE.Vector3(0, 1, 0), 60, 1.8)
    }
    if ((heavy || e.boss) && this.settings.gore >= 1 && chance(e.boss ? .75 : .22)) {
      e.char.decapitate()
    }
    if (this.settings.gore >= 1) {
      const chest = e.char.getChestPosition()
      this.effects.bloodBurst(chest, new THREE.Vector3(rand(-.4, .4), 1, rand(-.4, .4)), 20, .8)
    }
    this.ui.toast(`${e.def.name} BROKEN`, e.boss ? 'gold' : '')
    this.effects.floatText(e.char.getHeadPosition(), `+${marks}`, 'heal')
  }

  startBlock() {
    if (this.state !== 'playing' || this.execution || this.player.dead) return
    if (this.stamina < 6 || this.player.state === 'hit' || this.player.state === 'attack') return
    this.blocking = true
    this.blockStart = this.realTime
    this.player.setState('block', 0)
  }

  endBlock() {
    this.blocking = false
    if (this.player && this.player.state === 'block') { this.player.state = 'idle'; this.player.stateTime = 0 }
  }

  breakGuard() {
    if (!this.blocking) return
    this.endBlock()
    this.player.setState('hit', 0)
    this.player.stagger(1.1)
    this.player.staggered = true
    this.audio.hurt()
    this.ui.toast('GUARD BROKEN', 'blood')
    this.effects.shake(.35)
    this.stamina = 0
  }

  tryDodge() {
    if (this.state !== 'playing' || this.execution || this.player.dead) return
    const c = this.player
    if (c.state === 'attack' || c.state === 'hit' || c.state === 'dodge') return
    const cost = 22 * this.staminaCostMul
    if (this.stamina < cost) { this.ui.toast('STAMINA SPENT', 'blood'); return }
    this.stamina -= cost
    this.staminaDelay = .7
    this.endBlock()
    c.setState('dodge', 0)
    c.attackType = 'light'
    this.playerInvuln = .33
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
    const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw))
    let dir = new THREE.Vector3()
    if (this.keys.forward) dir.add(forward)
    if (this.keys.back) dir.sub(forward)
    if (this.keys.right) dir.add(right)
    if (this.keys.left) dir.sub(right)
    if (this.touch.moveX || this.touch.moveY) { dir.addScaledVector(right, this.touch.moveX); dir.addScaledVector(forward, -this.touch.moveY) }
    if (!dir.lengthSq()) dir.copy(forward).negate()
    dir.normalize()
    const dest = c.root.position.clone().addScaledVector(dir, 2.7 * this.dodgeMul)
    this.arena.clampToArena(dest, .6)
    c.root.position.copy(dest)
    c.root.rotation.y = Math.atan2(dir.x, dir.z)
    this.effects.dust(c.root.position, 12, 0x8a7258, 1.2)
    this.audio.noiseBurst({ duration: .22, gain: .07, freq: 900, endFreq: 200, q: .6, type: 'lowpass' })
  }

  tryExecute() {
    if (this.state !== 'playing' || this.execution || this.player.dead) return
    if (this.rage < this.executeCost) { this.ui.toast('BLOODLUST TOO LOW', 'blood'); return }
    let best = null, bestDist = 3.4
    for (const e of this.enemies) {
      if (e.char.dead || e.removed) continue
      const ratio = e.char.health / e.char.maxHealth
      if (ratio > (e.boss ? .16 : .34)) continue
      const dist = e.char.root.position.distanceTo(this.player.root.position)
      if (dist < bestDist) { bestDist = dist; best = e }
    }
    if (!best) { this.ui.toast('NO BROKEN FOE', ''); return }
    this.rage -= this.executeCost
    this.execution = { enemy: best, time: 0, killed: false, start: this.player.root.position.clone() }
    this.state = 'executing'
    this.timeScale = .3
    this.ui.showSlowmo(true)
    this.endBlock()
    this.attackBuffer = null
    best.char.stagger(3)
    best.char.health = Math.max(1, best.char.health)
    this.audio.execute()
    this.audio.heartbeat()
    this.effects.shake(.2)
    const d = best.char.root.position.clone().sub(this.player.root.position)
    this.player.root.rotation.y = Math.atan2(d.x, d.z)
    this.player.setState('execute', 0)
  }

  updateExecution(dt) {
    const ex = this.execution
    if (!ex) return
    ex.time += dt
    const target = ex.enemy
    if (!ex.killed) {
      const d = target.char.root.position.clone().sub(this.player.root.position)
      const dist = Math.hypot(d.x, d.z)
      if (dist > 1.6) {
        this.player.root.position.addScaledVector(d.normalize(), Math.min(dist - 1.6, dt * 4.5))
        this.arena.clampToArena(this.player.root.position, .6)
      }
      this.player.root.rotation.y = dampAngle(this.player.root.rotation.y, Math.atan2(d.x, d.z), 12, dt)
      this.player.update(dt * .55)
      target.char.update(dt * .45)
      if (ex.time > .85) {
        ex.killed = true
        target.char.health = 1
        target.char.takeHit(99999, { heavy: true, ignoreArmor: true, side: 1 })
        target.char.die({ decapitate: true })
        this.onEnemyKilled(target, true)
        this.effects.bloodBurst(target.char.getChestPosition(), new THREE.Vector3(0, 1.2, 0), 95, 1.8)
        this.effects.sparksBurst(target.char.getChestPosition(), new THREE.Vector3(0, 1, 0), 30, 1.3)
        this.effects.shake(.65)
        this.audio.hit(1.8, true)
        this.audio.flesh(1.8)
        this.heal(this.executeHeal)
        this.score += 450
        this.arena.excite(1)
        this.ui.hitMarker(true)
        this.ui.flashBlood()
        this.ui.showAnnouncement('A LIFE GIVEN', 'REQUIEM', 'THE SAND DRINKS DEEP', true, 1700)
      }
    } else {
      target.char.update(dt * .45)
      this.player.update(dt * .3)
    }
    if (ex.time > 1.72) {
      this.execution = null
      this.state = 'playing'
      this.timeScale = 1
      this.ui.showSlowmo(false)
      this.player.state = 'idle'
      this.player.stateTime = 0
      this.attackCooldown = .32
    }
  }

  updateEnemies(dt) {
    const playerPos = this.player.root.position
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]
      const c = e.char
      if (c.dead) {
        c.update(dt)
        e.removeTimer += dt
        if (e.removeTimer > 5.2) {
          c.dispose()
          this.enemies.splice(i, 1)
          if (e.boss) this.ui.setBoss(null)
        }
        continue
      }
      const d = playerPos.clone().sub(c.root.position)
      const dist = Math.hypot(d.x, d.z)
      e.cooldown -= dt
      e.blockCd -= dt
      if (e.blockTimer > 0) e.blockTimer -= dt
      const facingPlayer = Math.abs(shortestAngle(c.root.rotation.y, Math.atan2(d.x, d.z))) < 1.35
      const boss = e.boss
      const def = e.def
      const ideal = def.attackRange * .78

      // Raise guard when the player commits to an attack.
      if (!boss && def.shield && e.blockCd <= 0 && e.blockTimer <= 0 && c.state === 'idle' && dist < 4.4 && this.player.state === 'attack' && facingPlayer && this.settings.gore >= 0 && chance(dt * 3.1)) {
        c.setState('block', 0)
        e.blockTimer = .58
        e.blockCd = rand(1.3, 2.5)
      }
      if (e.blockTimer <= 0 && c.state === 'block') { c.state = 'idle'; c.stateTime = 0 }

      if (c.state === 'idle' || c.state === 'dodge') {
        let move = new THREE.Vector3()
        if (!c.blocking && dist > ideal + .15) {
          move.copy(d).normalize()
          if (e.strafe) move.addScaledVector(new THREE.Vector3(-d.z, 0, d.x).normalize(), .2)
        } else if (dist < ideal - .55) {
          move.copy(d).normalize().multiplyScalar(-.65)
        } else {
          move.set(-d.z, 0, d.x).normalize().multiplyScalar(e.strafe * .45)
        }
        // separation
        for (const other of this.enemies) {
          if (other === e || other.char.dead) continue
          const od = c.root.position.clone().sub(other.char.root.position)
          const odist = od.length()
          if (odist < 1.35 && odist > .01) move.addScaledVector(od.normalize(), (1.35 - odist) * 1.5)
        }
        if (move.lengthSq() > 1) move.normalize()
        c.speedActual = move.length() * c.speed * (c.state === 'dodge' ? 1.4 : 1)
        c.root.position.addScaledVector(move, c.speedActual * dt)
        const desired = Math.atan2(d.x, d.z)
        c.root.rotation.y = dampAngle(c.root.rotation.y, desired, 6 + def.aggressive * 3, dt)
        // attack decision
        if (dist < def.attackRange && e.cooldown <= 0 && facingPlayer && !c.blocking) {
          const pressure = def.aggressive * (boss ? 1.1 : 1) * (this.wave > 8 ? 1.12 : 1)
          if (chance(dt * (1.7 + pressure * 2.2))) {
            const heavy = boss && chance(.28)
            c.startAttack(heavy ? 'heavy' : 'light', heavy ? 1.12 : def.windup + .22)
            e.cooldown = rand(def.windup + def.recover, def.windup + def.recover + 1.2) * (boss ? .72 : 1)
            e.attackAngle = Math.atan2(d.x, d.z)
            c.root.rotation.y = e.attackAngle
          }
        }
      } else {
        c.speedActual = 0
        if (c.state !== 'attack' && c.state !== 'hit' && c.state !== 'block') c.root.rotation.y = dampAngle(c.root.rotation.y, Math.atan2(d.x, d.z), 4, dt)
      }
      c.root.position.addScaledVector(e.knock, dt)
      e.knock.multiplyScalar(Math.max(0, 1 - dt * 7))
      this.arena.clampToArena(c.root.position, .75)
      c.update(dt)
      if (c.events.swing) {
        c.events.swing = false
        this.audio.swing(.7)
      }
      if (c.events.hit) {
        c.events.hit = false
        const hitDist = c.root.position.distanceTo(playerPos)
        if (hitDist < def.attackRange + .85 && facingPlayer) {
          const heavy = c.attackType === 'heavy'
          this.enemyHitPlayer(e, def.damage * (boss ? (heavy ? 1.5 : 1) : 1), heavy)
          if (boss && heavy) {
            this.effects.sparksBurst(playerPos.clone().setY(.2), new THREE.Vector3(0, 1, 0), 35, 1.5)
            this.effects.shake(.5)
            if (this.playerInvuln <= 0) this.damagePlayer(8, e, true)
          }
        } else {
          this.audio.swing(.5)
        }
      }
      // telegraph glint
      if (c.state === 'attack' && c.attackProgress < .5 && Math.random() < dt * 10) {
        this.effects.embers(c.getWeaponTip(), 1, boss ? 0xff3014 : 0xff9b5b)
      }
    }
  }

  enemyHitPlayer(e, damage, heavy) {
    if (this.state !== 'playing' || this.player.dead) return
    if (this.playerInvuln > 0) {
      if (chance(.4)) this.effects.dust(this.player.root.position, 6, 0x8f7b63, .8)
      return
    }
    const toEnemy = e.char.root.position.clone().sub(this.player.root.position).normalize()
    const playerForward = new THREE.Vector3(Math.sin(this.player.root.rotation.y), 0, Math.cos(this.player.root.rotation.y))
    const facing = playerForward.dot(toEnemy) > .12
    if (this.blocking && facing) {
      if (this.realTime - this.blockStart < .25) {
        this.parry(e)
        return
      }
      const staminaCost = damage * 1.6
      this.stamina = Math.max(0, this.stamina - staminaCost)
      this.staminaDelay = .8
      const chip = damage * .14 * this.damageTakenMul
      this.damagePlayer(chip, e, true)
      this.effects.sparksBurst(this.player.root.position.clone().setY(1.25), toEnemy.clone().negate(), 22, 1.2)
      this.audio.block()
      this.ui.hitMarker(false)
      if (this.shakeEnabled) this.effects.shake(.18)
      if (this.stamina <= 0) this.breakGuard()
      return
    }
    this.damagePlayer(damage, e, heavy)
  }

  parry(e) {
    this.audio.parry()
    this.ui.flashParry()
    this.ui.showAnnouncement('PARRY', 'PERFECT', '', false, 900)
    this.effects.sparksBurst(this.player.root.position.clone().setY(1.3), new THREE.Vector3(0, 1, 0), 34, 1.6)
    this.effects.shake(.24)
    this.effects.floatText(e.char.getChestPosition(), 'PARRY', 'block')
    e.char.stagger(1.45)
    this.rage = Math.min(100, this.rage + 16)
    this.score += 180
    this.chain = Math.min(4, this.chain + .4)
    this.stamina = Math.min(this.maxStamina, this.stamina + 12)
    this.playerInvuln = .35
    this.slowmoTimer = .3
    this.arena.excite(.45)
    this.ui.setReticle(true)
  }

  damagePlayer(amount, source, heavy = false) {
    if (this.player.dead) return
    const dmg = Math.max(1, amount * (1 - this.armor.defense) * this.damageTakenMul)
    const result = this.player.takeHit(dmg, { heavy, side: chance(.5) ? 1 : -1, ignoreArmor: false })
    if (!result) return
    this.stamina = Math.max(0, this.stamina - (heavy ? 20 : 11))
    this.staminaDelay = 1.1
    this.lastDamageTime = this.realTime
    this.ui.flashDamage()
    if (this.settings.gore > 1) this.ui.flashBlood()
    if (this.shakeEnabled) this.effects.shake(heavy ? .68 : .38)
    this.hitstop = Math.max(this.hitstop, heavy ? .08 : .035)
    this.audio.hurt()
    this.effects.bloodBurst(this.player.root.position.clone().setY(1.25), new THREE.Vector3(0, .4, 0), 10, .6)
    if (source) {
      const dir = this.player.root.position.clone().sub(source.char.root.position).normalize()
      this.playerKnockback.addScaledVector(dir, heavy ? 5 : 2.4)
    }
    if (this.player.health <= 0) this.playerDied(source)
  }

  heal(amount, silent = false) {
    if (!this.player || this.player.dead) return
    const before = this.player.health
    this.player.health = Math.min(this.maxHealth, this.player.health + amount)
    const gained = this.player.health - before
    if (!silent && gained > 0) this.effects.floatText(this.player.root.position.clone().setY(2), `+${Math.round(gained)}`, 'heal')
  }

  playerDied(source) {
    if (this.state === 'dead') return
    this.state = 'dead'
    this.player.die({ side: chance(.5) ? 1 : -1 })
    this.player.health = 0
    this.deathTimer = 0
    this.deathShown = false
    this.timeScale = .28
    this.endBlock()
    this.execution = null
    this.audio.death()
    this.audio.hurt()
    this.ui.flashBlood()
    this.ui.showSlowmo(true)
    this.effects.shake(.7)
    this.effects.bloodBurst(this.player.root.position.clone().setY(1.2), new THREE.Vector3(0, .5, 0), 40, 1.2)
    this.arena.excite(.8)
    this.meta.bestWave = Math.max(this.meta.bestWave || 0, this.wave)
    this.meta.kills = (this.meta.kills || 0) + this.kills
    this.meta.renown = (this.meta.renown || 0) + Math.round(this.score * .07) + this.wave * 30
    this.meta.marks += this.runMarks
    this.saveMeta()
  }

  updateWave(dt) {
    if (this.waveClearTimer > 0) {
      this.waveClearTimer -= dt
      if (this.waveClearTimer <= 0) {
        this.state = 'boon'
        this.ui.showBoons(this.wave, this.boonChoices, this.waveReward)
        this.ui.dom.hud.style.opacity = '.1'
        if (document.pointerLockElement) document.exitPointerLock()
      }
    }
    if (!this.waveActive) return
    const alive = this.enemies.filter(e => !e.char.dead && !e.removed).length
    if (this.spawnQueue.length === 0 && alive === 0 && this.state === 'playing') {
      this.waveActive = false
      this.waveClearTimer = 2.1
      const reward = Math.round(75 + this.wave * 28 + (this.wave % 5 === 0 ? 220 : 0))
      this.runMarks += reward
      this.score += this.wave * 120
      this.boonChoices = this.rollBoons()
      this.ui.showAnnouncement('THE SAND FALLS STILL', `WAVE ${roman(this.wave)} CLEARED`, `+${formatNumber(reward)} BLOODMARKS`, false, 2600)
      this.audio.waveHorn(false)
      this.arena.excite(1)
      this.waveReward = reward
    }
  }

  rollBoons() {
    const owned = new Set(this.boons.map(b => b.id))
    const pool = BOONS.filter(b => !owned.has(b.id) || ['iron-skin', 'keen-edge', 'bloodthirst'].includes(b.id))
    const out = []
    while (out.length < 3 && pool.length) {
      const idx = Math.floor(Math.random() * pool.length)
      out.push(pool.splice(idx, 1)[0])
    }
    return out
  }

  chooseBoon(boon) {
    if (!boon) return
    this.boons.push(boon)
    boon.apply(this)
    this.audio.unlock()
    this.ui.toast(`${boon.name} CLAIMED`, 'gold')
    this.heal(Math.min(14, this.maxHealth - this.player.health), true)
  }

  nextWave() {
    if (this.state !== 'boon') return
    this.ui.closeAllOverlays()
    this.ui.dom.hud.style.opacity = ''
    this.state = 'playing'
    this.wave++
    this.stamina = this.maxStamina
    this.rage = Math.min(100, this.rage + 14)
    this.startWave(this.wave)
    this.requestLock()
  }

  abandonRun() {
    this.ui.closeAllOverlays()
    this.toTitle()
  }

  toTitle() {
    this.state = 'title'
    this.clearEnemies()
    this.ui.hideGameUI()
    this.ui.showTitle()
    this.ui.dom.hud.style.opacity = ''
    this.ui.updateTitleLoadout(this.meta)
    this.spawnPlayer()
    this.player.root.position.set(0, 0, 3.1)
    this.player.root.rotation.y = .16
    this.arena.build(0)
    this.themeIndex = 0
    this.yaw = .4
    this.pitch = .1
    this.timeScale = 1
    this.execution = null
    this.deathShown = false
    this.ui.hideDeath()
    if (document.pointerLockElement) document.exitPointerLock()
  }

  updateHazards(dt) {
    for (const h of this.arena.hazards) {
      if (!h.active) continue
      const candidates = []
      if (!this.player.dead) candidates.push({ obj: this.player.root.position, player: true })
      for (const e of this.enemies) if (!e.char.dead) candidates.push({ e, obj: e.char.root.position })
      for (const c of candidates) {
        const dist = Math.hypot(c.obj.x - h.position.x, c.obj.z - h.position.z)
        if (dist < 1.35) {
          if (c.player) {
            if (this.hazardCooldown <= 0 && this.playerInvuln <= 0) {
              this.hazardCooldown = .65
              this.damagePlayer(21, null, true)
              this.ui.toast('IMPALED', 'blood')
              this.effects.bloodBurst(c.obj.clone().setY(.5), new THREE.Vector3(0, 1, 0), 24, 1)
            }
          } else {
            if (!c.e.hazardCd || c.e.hazardCd <= 0) {
              c.e.hazardCd = .7
              const result = c.e.char.takeHit(42, { heavy: true, breakPower: 1.5 })
              if (result) {
                this.effects.bloodBurst(c.e.char.getChestPosition(), new THREE.Vector3(0, 1, 0), 18, 1)
                this.audio.hit(1.2, true)
                if (result.killed) this.onEnemyKilled(c.e, true)
              }
            }
          }
        }
      }
    }
    for (const e of this.enemies) if (e.hazardCd > 0) e.hazardCd -= dt
  }

  updateCamera(dtReal) {
    const cam = this.camera
    let desiredPos = new THREE.Vector3()
    let look = new THREE.Vector3()
    let fov = 55
    if (this.state === 'title') {
      const t = this.realTime
      const a = .42 + Math.sin(t * .055) * .1
      const r = 6.4 - Math.sin(t * .12) * .12
      desiredPos.set(Math.sin(a) * r, 2.35 + Math.sin(t * .21) * .06, 3.1 + Math.cos(a) * r)
      look.set(-.62, 1.38, 3.1)
      cam.position.lerp(desiredPos, 1 - Math.exp(-4 * dtReal))
      cam.lookAt(look)
      cam.fov = 47
      cam.updateProjectionMatrix()
      this.rimLight.position.set(desiredPos.x - .6, 2.6, desiredPos.z + .8)
      this.rimLight.intensity = 15
      this.playerLight.intensity = 3
      this.playerLight.position.set(-desiredPos.x * .4, 3.3, desiredPos.z)
      this.heroLight.position.set(-2, 6, 8)
      this.heroLight.target.position.set(0, 1, 3)
    } else if (this.execution) {
      const ex = this.execution
      const target = ex.enemy.char.getChestPosition()
      const mid = this.player.root.position.clone().lerp(ex.enemy.char.root.position, .5)
      const side = new THREE.Vector3(Math.cos(this.player.root.rotation.y), 0, -Math.sin(this.player.root.rotation.y))
      const k = clamp(ex.time / .9, 0, 1)
      desiredPos.copy(mid).addScaledVector(side, 2.6 + k * .2).add(new THREE.Vector3(0, 1.5 + Math.sin(ex.time * 2) * .03, 0))
      look.copy(target)
      cam.position.lerp(desiredPos, 1 - Math.exp(-5 * dtReal))
      cam.lookAt(look)
      cam.fov = 38 + Math.sin(k * Math.PI) * 4
      cam.updateProjectionMatrix()
    } else if (this.state === 'dead') {
      const t = this.deathTimer
      const p = this.player.root.position
      desiredPos.set(p.x + Math.sin(t * .3) * 4.3, 2.2 + Math.min(1.6, t * .35), p.z + Math.cos(t * .3) * 4.3)
      cam.position.lerp(desiredPos, 1 - Math.exp(-2 * dtReal))
      cam.lookAt(p.x, .7, p.z)
      cam.fov = 48
      cam.updateProjectionMatrix()
    } else {
      const baseTarget = this.player.root.position.clone().setY(1.48)
      const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
      const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw))
      let dist = this.cameraDist * (1 + this.intro * .75)
      const horiz = dist * Math.cos(this.pitch)
      desiredPos.copy(baseTarget)
        .addScaledVector(forward, -horiz)
        .addScaledVector(right, this.cameraShoulder)
        .add(new THREE.Vector3(0, dist * Math.sin(this.pitch) + .15, 0))
      look.copy(baseTarget).addScaledVector(forward, 7).add(new THREE.Vector3(0, .08, 0))
      if (this.intro > 0) {
        this.intro = Math.max(0, this.intro - dtReal * 1.5)
        cam.position.lerp(desiredPos, 1 - Math.exp(-3.6 * dtReal))
      } else {
        cam.position.copy(desiredPos)
      }
      cam.lookAt(look)
      const sprinting = this.keys.sprint && this.player.speedActual > 2
      fov = 55 + (sprinting ? 3.5 : 0) + (this.player.state === 'attack' ? 1.2 : 0)
      cam.fov = damp(cam.fov, fov, 4, dtReal)
      cam.updateProjectionMatrix()
      this.rimLight.position.set(this.player.root.position.x - 1.6, 2.7, this.player.root.position.z + 2.2)
      this.rimLight.intensity = 9
      this.playerLight.position.set(this.player.root.position.x + 2.4, 2.6, this.player.root.position.z - 1.8)
      this.playerLight.intensity = 2.8
      this.heroLight.position.set(this.player.root.position.x, 12, this.player.root.position.z + 3)
      this.heroLight.target.position.copy(this.player.root.position)
    }
    if (this.shakeEnabled) {
      const s = this.effects.getShake(dtReal)
      cam.position.x += s.x; cam.position.y += s.y
    }
  }

  updateHUD(dtReal) {
    this.uiTimer -= dtReal
    if (this.uiTimer > 0) return
    this.uiTimer = .075
    const executable = !!this.execution || this.rage >= this.executeCost && this.enemies.some(e => !e.char.dead && e.char.health / e.char.maxHealth < (e.boss ? .16 : .34) && e.char.root.position.distanceTo(this.player.root.position) < 3.4)
    if (!this.execution) this.ui.updateHUD({
      health: Math.max(0, this.player.health), maxHealth: this.maxHealth,
      stamina: this.stamina, maxStamina: this.maxStamina,
      armor: this.player.armor, maxArmor: this.player.maxArmor,
      combo: this.combo, score: this.score, runMarks: this.runMarks,
      chain: this.chain, chainTimer: this.chainTimer / 1.7,
      rage: this.rage, weaponName: this.weapon.name,
      reach: this.weapon.reach, damage: this.weapon.damage,
      executable, slowmo: this.slowmoTimer > 0 || !!this.execution
    })
    this.ui.setReticle(!!this.closestEnemyInFront(4.4, .55))
    this.ui.updateEnemyBars(this.enemies, this.camera)
  }

  update(dtReal) {
    this.realTime += dtReal
    this.time += dtReal
    const dt = dtReal * this.timeScale
    if (this.settings.motion) this.bloom.strength = .32
    if (this.state === 'title') {
      this.arena.update(dtReal, .05)
      this.player.update(dtReal)
      this.player.speedActual = 0
      this.effects.update(dtReal, this.camera)
      this.updateCamera(dtReal)
      this.audio.update(dtReal, .08, false)
      return
    }
    if (this.state === 'paused' || this.state === 'boon' || (this.state === 'title')) {
      this.arena.update(dtReal * .25, .12)
      this.effects.update(dtReal * .25, this.camera)
      return
    }
    if (this.state === 'executing') {
      this.updateExecution(dtReal)
      this.arena.update(dt * .5, .6)
      this.effects.update(dt * .5, this.camera)
      this.updateCamera(dtReal)
      this.updateHUD(dtReal)
      this.audio.update(dtReal, .8, false)
      return
    }
    if (this.state === 'dead') {
      this.deathTimer += dtReal
      this.player.update(dt)
      this.arena.update(dt, .1)
      this.effects.update(dt, this.camera)
      this.updateCamera(dtReal)
      if (this.deathTimer > 2.4 && !this.deathShown) {
        this.deathShown = true
        this.timeScale = 1
        this.ui.showSlowmo(false)
        this.ui.showDeath({
          wave: this.wave, kills: this.kills, score: this.score, marks: this.runMarks,
          boss: this.enemies.find(e => e.boss && !e.char.dead)?.def.name
        })
      }
      this.audio.update(dtReal, .1, false)
      return
    }
    // playing
    if (this.slowmoTimer > 0) this.slowmoTimer -= dtReal
    if (this.hitstop > 0) { this.hitstop -= dtReal; this.freezeTimer = 1 }
    else this.freezeTimer = 0
    const worldDt = this.freezeTimer ? dt * .08 : dt
    this.timeScale = damp(this.timeScale, this.slowmoTimer > 0 ? .35 : 1, 18, dtReal)
    if (this.freezeTimer) this.timeScale = .08
    const stepDt = dtReal * this.timeScale
    this.updateSpawns(dtReal)
    this.updatePlayer(stepDt)
    this.updateEnemies(stepDt)
    this.updateHazards(stepDt)
    this.updateWave(dtReal)
    this.arena.update(stepDt, clamp(1 - this.enemies.filter(e => !e.char.dead).length / 6, .1, 1))
    this.effects.update(stepDt, this.camera)
    this.updateCamera(dtReal)
    this.updateHUD(dtReal)
    const close = this.enemies.filter(e => !e.char.dead && e.char.root.position.distanceTo(this.player.root.position) < 9).length
    const intensity = clamp(.12 + close * .19 + this.combo * .03, 0, 1)
    this.audio.update(dtReal, intensity, this.player.speedActual > .5)
    if (this.settings.gore >= 2 && this.player.health < this.maxHealth * .3) this.ui.dom.blood.classList.add('active')
    else if (!this.settings.gore) this.ui.dom.blood.classList.remove('active')
  }

  render() {
    this.composer.render()
  }

  animate() {
    requestAnimationFrame(this.animate)
    const dt = Math.min(this.clock.getDelta(), .05)
    this.update(dt)
    this.render()
  }
}
