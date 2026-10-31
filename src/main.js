import * as THREE from 'three'
import './style.css'
import { Arena, ARENA_RADIUS } from './arena.js'
import { Gore } from './gore.js'
import { Player } from './player.js'
import { Fighter, ENEMY_TYPES } from './fighter.js'
import { sound } from './audio.js'
import {
  TAU, clamp, lerp, rand, randInt, chance, pick, roman, smoothstep, easeOutCubic,
  softDropTexture
} from './utils.js'

const $ = (sel) => document.querySelector(sel)

class Bloodpit {
  constructor() {
    this.canvas = $('#scene')
    this.state = 'menu'
    this.selectedWeapon = 'sword'
    this.wave = 0
    this.kills = 0
    this.score = 0
    this.combo = 0
    this.comboTimer = 0
    this.comboMaxTime = 3.2
    this.enemies = []
    this.spawnQueue = []
    this.pickups = []
    this.time = 0
    this.waveBreak = 0
    this.waveActive = false
    this.hitstop = 0
    this.slowmo = 1
    this.slowmoTimer = 0
    this.deathTimer = 0
    this.hudCache = {}
    this.floaterCount = 0
    this.touch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    this.isMobile = matchMedia('(max-width: 760px)').matches
    this.paused = false
    this.timeScale = 1
    this.best = this.loadBest()
    this.menuAngle = 0.3
    this.crowdPulse = 0
    this.lastHeartbeat = 0
    this.lockRequested = false
    this.hadLock = false
    this.enemyId = 0
    this.stats = { dismemberments: 0, bestCombo: 0 }
    this._v = new THREE.Vector3()
    this._v2 = new THREE.Vector3()

    this.setupRenderer()
    this.setupScene()
    this.setupUI()
    this.loop = this.loop.bind(this)
    this.clock = new THREE.Clock()
    this.hideLoading()
    requestAnimationFrame(this.loop)
  }

  setupRenderer() {
    const gl = document.createElement('canvas').getContext('webgl2') || document.createElement('canvas').getContext('webgl')
    let rendererName = ''
    try {
      const dbg = gl.getExtension('WEBGL_debug_renderer_info')
      rendererName = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : ''
    } catch {}
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    this.low = /swiftshader|llvmpipe|software|basic render/i.test(rendererName)
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.low,
      powerPreference: 'high-performance',
      alpha: false
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.low ? 1 : 1.7))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.46
    if (!this.low) {
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    this.renderer.info.autoReset = true
    this.canvas.addEventListener('webglcontextlost', (e) => e.preventDefault())
  }

  setupScene() {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x160a0b, this.low ? 0.02 : 0.016)
    this.camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.05, 300)
    this.camera.position.set(0, 5.5, 15)
    this.scene.add(this.camera)

    this.arena = new Arena(this.scene, this.renderer, this.low)
    this.gore = new Gore(this.scene, this.renderer, this.low ? 'low' : 'high')
    this.player = new Player(this.camera, this.scene, this.gore, this)
    this.player.rig.visible = false
    this.player.setWeapon(this.selectedWeapon, true)

    this.ambient = new THREE.AmbientLight(0x5d5054, 0.8)
    this.scene.add(this.ambient)

    this.camera.position.set(15, 7, 13)
    this.camera.lookAt(0, 1.5, 0)
  }

  loadBest() {
    try {
      const raw = localStorage.getItem('bloodpit.best')
      if (raw) return JSON.parse(raw)
    } catch {}
    return { score: 0, wave: 0, kills: 0 }
  }

  saveBest() {
    try { localStorage.setItem('bloodpit.best', JSON.stringify(this.best)) } catch {}
  }

  hideLoading() {
    const el = $('#loading')
    setTimeout(() => {
      el.classList.remove('open')
      setTimeout(() => el.remove(), 600)
    }, 260)
  }

  setupUI() {
    document.body.classList.toggle('touch', this.touch)
    this.ui = {
      menu: $('#menu'),
      hud: $('#hud'),
      pause: $('#pause'),
      gameover: $('#gameover'),
      healthFill: $('#health-fill'),
      healthLag: $('#health-lag'),
      waveNumber: $('#wave-number'),
      enemiesLeft: $('#enemies-left'),
      score: $('#score'),
      kills: $('#kills'),
      comboWrap: $('#combo-wrap'),
      comboMult: $('#combo-mult'),
      comboTimer: $('#combo-timer i'),
      weaponName: $('#weapon-name'),
      weaponKind: $('#weapon-kind'),
      weaponIcon: $('#weapon-icon'),
      bossWrap: $('#boss-wrap'),
      bossName: $('#boss-name'),
      bossFill: $('#boss-fill'),
      crosshair: $('#crosshair'),
      chargeRing: $('#charge-ring'),
      ringFill: $('#ring-fill'),
      hitmarker: $('#hitmarker'),
      banner: $('#banner'),
      bannerKicker: $('#banner-kicker'),
      bannerTitle: $('#banner-title'),
      bannerSub: $('#banner-sub'),
      killfeed: $('#killfeed'),
      floaters: $('#floaters'),
      interact: $('#interact-prompt'),
      interactText: $('#interact-prompt span'),
      exec: $('#exec-prompt'),
      damageFlash: $('#damage-flash'),
      touchControls: $('#touch-controls'),
      rotate: $('#rotate-note'),
      pauseBtn: $('#pause-btn'),
      bloodCanvas: $('#fx-blood'),
      hint: $('#hint'),
      bestScore: $('#best-score'),
      bestWave: $('#best-wave'),
      pauseWave: $('#pause-wave'),
      pauseKills: $('#pause-kills'),
      pauseScore: $('#pause-score'),
      goWave: $('#go-wave'),
      goKills: $('#go-kills'),
      goScore: $('#go-score'),
      goRecord: $('#go-record')
    }
    this.ui.gameover = $('#gameover')
    this.ui.pause = $('#pause')
    this.bloodCtx = this.ui.bloodCanvas.getContext('2d')
    this.resizeBlood()
    this.ui.bestScore.textContent = this.best.score || 0
    this.ui.bestWave.textContent = this.best.wave ? roman(this.best.wave) : '—'
    this.bindUI()
    window.addEventListener('resize', () => this.onResize())
    this.onResize()
  }

  bindUI() {
    document.querySelectorAll('.weapon-card').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.weapon-card').forEach((c) => {
          c.classList.toggle('selected', c === card)
          c.setAttribute('aria-checked', c === card ? 'true' : 'false')
        })
        this.selectedWeapon = card.dataset.weapon
        sound.init()
        sound.ui()
      })
    })
    $('#play-btn').addEventListener('click', () => this.startRun(this.selectedWeapon))
    $('#retry-btn').addEventListener('click', () => this.startRun(this.player.weaponId || this.selectedWeapon))
    $('#menu-btn').addEventListener('click', () => this.toMenu())
    $('#resume-btn').addEventListener('click', () => this.resume())
    $('#quit-btn').addEventListener('click', () => this.toMenu())
    $('#pause-btn').addEventListener('click', () => this.pause())
    $('#pause-btn').addEventListener('pointerdown', (e) => e.stopPropagation())

    // keyboard
    window.addEventListener('keydown', (e) => this.onKeyDown(e))
    window.addEventListener('keyup', (e) => this.onKeyUp(e))
    window.addEventListener('blur', () => { this.keys = {}; this.player.blockUp() })

    // mouse / pointer
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e))
    window.addEventListener('mouseup', (e) => this.onMouseUp(e))
    window.addEventListener('mousemove', (e) => this.onMouseMove(e))
    this.canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false })

    // pointer lock
    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.canvas
      if (locked) this.hadLock = true
      if (!locked && this.hadLock && this.state === 'playing' && !this.touch) {
        this.hadLock = false
        this.pause()
      }
    })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause()
    })

    this.setupTouch()
    this.keys = {}
    this.dragging = false
    this.dragMoved = 0
    this.lastMouse = { x: 0, y: 0 }
    this.setTouchVisible(false)
  }

  setupTouch() {
    const zone = $('#stick-zone')
    const knob = $('#stick-knob')
    let active = false
    let startX = 0, startY = 0
    const maxR = 46
    const updateStick = (x, y) => {
      let dx = x - startX, dy = y - startY
      const d = Math.hypot(dx, dy)
      if (d > maxR) { dx = dx / d * maxR; dy = dy / d * maxR }
      knob.style.transform = `translate(${dx}px, ${dy}px)`
      this.player.moveInput.x = clamp(dx / maxR, -1, 1)
      this.player.moveInput.z = clamp(dy / maxR, -1, 1)
    }
    zone.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      active = true
      zone.setPointerCapture(e.pointerId)
      const r = zone.getBoundingClientRect()
      startX = r.left + r.width / 2
      startY = r.top + r.height / 2
      updateStick(e.clientX, e.clientY)
    })
    zone.addEventListener('pointermove', (e) => {
      if (!active) return
      e.preventDefault()
      updateStick(e.clientX, e.clientY)
    })
    const end = (e) => {
      if (!active) return
      active = false
      knob.style.transform = 'translate(0,0)'
      this.player.moveInput.x = 0
      this.player.moveInput.z = 0
    }
    zone.addEventListener('pointerup', end)
    zone.addEventListener('pointercancel', end)

    // look drag anywhere on the canvas
    let lookId = null
    let lx = 0, ly = 0
    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch' || this.state !== 'playing') return
      lookId = e.pointerId
      lx = e.clientX; ly = e.clientY
    })
    this.canvas.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'touch' || lookId !== e.pointerId || this.state !== 'playing') return
      e.preventDefault()
      this.player.look((e.clientX - lx) * 2.1, (e.clientY - ly) * 2.1, 0.0022)
      lx = e.clientX; ly = e.clientY
    })
    const endLook = (e) => { if (lookId === e.pointerId) lookId = null }
    this.canvas.addEventListener('pointerup', endLook)
    this.canvas.addEventListener('pointercancel', endLook)

    const attack = $('#t-attack')
    attack.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation()
      if (this.state !== 'playing') return
      sound.init()
      this.player.startCharge()
    })
    attack.addEventListener('pointerup', (e) => {
      e.preventDefault()
      this.player.releaseCharge()
    })
    attack.addEventListener('pointercancel', () => this.player.cancelCharge())

    const bindHold = (id, down, up) => {
      const el = $(id)
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault(); e.stopPropagation()
        if (this.state !== 'playing') return
        el.classList.add('on')
        down()
      })
      const end = (e) => {
        e.preventDefault()
        el.classList.remove('on')
        up && up()
      }
      el.addEventListener('pointerup', end)
      el.addEventListener('pointercancel', end)
    }
    bindHold('#t-block', () => this.player.blockDown(), () => this.player.blockUp())
    bindHold('#t-dodge', () => this.player.dodge())
    bindHold('#t-kick', () => this.player.shove())
    $('#t-exec').addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation()
      this.tryExecute()
    })
  }

  setTouchVisible(on) {
    this.ui.touchControls.classList.toggle('hidden', !(on && this.touch))
  }

  onResize() {
    const w = window.innerWidth, h = window.innerHeight
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.low ? 1 : 1.7))
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.resizeBlood()
    const portrait = h > w * 1.05
    this.ui.rotate.classList.toggle('hidden', !(this.touch && portrait && this.state === 'playing'))
  }

  resizeBlood() {
    const c = this.ui.bloodCanvas
    c.width = window.innerWidth
    c.height = window.innerHeight
    this.bloodCtx.clearRect(0, 0, c.width, c.height)
  }

  /* ------------------------------------------------------------------ */
  /* Flow                                                                */
  /* ------------------------------------------------------------------ */

  startRun(weapon) {
    sound.init()
    sound.resume()
    this.selectedWeapon = weapon
    this.state = 'playing'
    this.paused = false
    this.wave = 0
    this.kills = 0
    this.score = 0
    this.combo = 0
    this.comboTimer = 0
    this.stats = { dismemberments: 0, bestCombo: 0 }
    this.enemies.forEach((e) => this.removeFighter(e))
    this.enemies = []
    this.spawnQueue = []
    this.pickups.forEach((p) => this.removePickup(p))
    this.pickups = []
    this.gore.clear()
    this.bloodCtx.clearRect(0, 0, this.ui.bloodCanvas.width, this.ui.bloodCanvas.height)
    this.hitstop = 0
    this.slowmoTimer = 0
    this.slowmo = 1
    this.waveBreak = 0
    this.waveActive = false
    this.deathTimer = 0
    this.ui.killfeed.innerHTML = ''
    this.ui.floaters.innerHTML = ''
    this.ui.menu.classList.remove('open')
    this.ui.gameover.classList.remove('open')
    this.ui.pause.classList.remove('open')
    this.ui.hud.classList.remove('hidden')
    this.player.reset(weapon)
    this.player.rig.visible = true
    this.setTouchVisible(true)
    this.updateWeaponUI()
    this.updateHealthUI(true)
    this.setBanner('WAVE I', 'LET THE BLOOD FLOW', 'THE RED KING IS WATCHING')
    this.startWave(1)
    this.requestLock()
    this.ui.hint.classList.remove('fade')
    clearTimeout(this._hintTimer)
    this._hintTimer = setTimeout(() => this.ui.hint.classList.add('fade'), 9000)
    this.crowdPulse = 1
    this.arena.excite(2)
  }

  toMenu() {
    this.state = 'menu'
    this.paused = false
    this.enemies.forEach((e) => this.removeFighter(e))
    this.enemies = []
    this.spawnQueue = []
    this.pickups.forEach((p) => this.removePickup(p))
    this.pickups = []
    this.gore.clear()
    this.bloodCtx.clearRect(0, 0, this.ui.bloodCanvas.width, this.ui.bloodCanvas.height)
    this.ui.menu.classList.add('open')
    this.ui.pause.classList.remove('open')
    this.ui.gameover.classList.remove('open')
    this.ui.hud.classList.add('hidden')
    this.ui.bossWrap.classList.add('hidden')
    this.ui.banner.classList.add('hidden')
    this.ui.killfeed.innerHTML = ''
    this.ui.floaters.innerHTML = ''
    this.setTouchVisible(false)
    this.player.rig.visible = false
    this.player.alive = false
    if (document.pointerLockElement) document.exitPointerLock()
    this.ui.bestScore.textContent = this.best.score || 0
    this.ui.bestWave.textContent = this.best.wave ? roman(this.best.wave) : '—'
    this.ui.rotate.classList.add('hidden')
    this.clearBloodOverlay(true)
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    this.paused = true
    this.player.blockUp()
    this.player.cancelCharge()
    this.pausedAt = performance.now()
    this.ui.pause.classList.add('open')
    this.ui.pauseWave.textContent = 'WAVE ' + roman(this.wave)
    this.ui.pauseKills.textContent = this.kills
    this.ui.pauseScore.textContent = this.score
    this.setTouchVisible(false)
    this.ui.rotate.classList.add('hidden')
    if (document.pointerLockElement) document.exitPointerLock()
    sound.ui()
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = 'playing'
    this.paused = false
    this.ui.pause.classList.remove('open')
    this.setTouchVisible(true)
    this.onResize()
    const portrait = window.innerHeight > window.innerWidth * 1.05
    this.ui.rotate.classList.toggle('hidden', !(this.touch && portrait))
    this.requestLock()
    sound.ui()
  }

  requestLock() {
    if (this.touch) return
    try {
      const p = this.canvas.requestPointerLock?.({ unadjustedMovement: true })
      if (p?.catch) p.catch(() => {
        try { this.canvas.requestPointerLock?.() } catch {}
      })
      this.lockRequested = true
    } catch {
      try { this.canvas.requestPointerLock?.() } catch {}
    }
  }

  gameOver() {
    if (this.state === 'gameover') return
    this.state = 'gameover'
    this.ui.gameover.classList.add('open')
    this.setTouchVisible(false)
    this.ui.rotate.classList.add('hidden')
    this.ui.goWave.textContent = roman(this.wave)
    this.ui.goKills.textContent = this.kills
    this.ui.goScore.textContent = this.score
    this.ui.goRecord.textContent = ''
    if (this.score > (this.best.score || 0)) {
      this.best.score = this.score
      this.ui.goRecord.textContent = 'A NEW RECORD. THE CROWD WILL REMEMBER YOU.'
    }
    if (this.wave > (this.best.wave || 0)) this.best.wave = this.wave
    if (this.kills > (this.best.kills || 0)) this.best.kills = this.kills
    this.saveBest()
    this.ui.bestScore.textContent = this.best.score
    this.ui.bestWave.textContent = roman(this.best.wave)
    this.ui.hud.classList.add('hidden')
    this.ui.bossWrap.classList.add('hidden')
    if (document.pointerLockElement) document.exitPointerLock()
    this.deathLine()
    sound.crowdRoar(1.2, 3)
  }

  deathLine() {
    const lines = [
      'The crowd got what it paid for.',
      'Your blood feeds the sand like all the rest.',
      'The Red King does not remember your name.',
      'Steel is honest. You were not fast enough.',
      'Somewhere, a hammer is still falling.'
    ]
    $('#death-line').textContent = pick(lines)
  }

  /* ------------------------------------------------------------------ */
  /* Waves                                                               */
  /* ------------------------------------------------------------------ */

  startWave(n) {
    this.wave = n
    this.waveActive = true
    this.waveBreak = 0
    const boss = n % 5 === 0
    const count = boss ? 2 + Math.floor(n / 5) : Math.min(8, 2 + Math.floor((n - 1) * 0.8) + 1)
    this.spawnQueue = []
    const types = []
    if (boss) types.push('executioner')
    for (let i = 0; i < count; i++) {
      let type = 'duelist'
      if (boss && i < 2) type = 'duelist'
      else if (chance(Math.min(0.55, 0.1 + n * 0.055))) type = 'brute'
      types.push(type)
    }
    if (boss) types[0] = 'executioner'
    for (let i = 0; i < types.length; i++) {
      this.spawnQueue.push({ type: types[i], delay: i * rand(0.55, 1.1) })
    }
    this.waveEnemyTotal = count
    this.waveKills = 0
    this.ui.enemiesLeft.textContent = `${count} CHALLENGER${count > 1 ? 'S' : ''} REMAIN`
    this.ui.waveNumber.textContent = 'WAVE ' + roman(n)
    const titles = boss
      ? ['THE EXECUTIONER COMES', 'A BIGGER SHADOW', 'THE RED KING SENDS HIS BUTCHER']
      : n === 1
        ? ['LET THE BLOOD FLOW', 'WELCOME TO THE PIT']
        : ['MORE MEAT FOR THE SAND', 'THE CROWD HUNGERS', 'STEEL IS THIRSTY', 'ANOTHER BATCH OF HEROES']
    this.setBanner('WAVE ' + roman(n), pick(titles), boss ? 'SURVIVE' : `${count} CHALLENGERS`)
    if (boss) {
      sound.bossRoar()
      this.ui.bossWrap.classList.remove('hidden')
      this.ui.bossName.textContent = 'THE EXECUTIONER'
    } else {
      this.ui.bossWrap.classList.add('hidden')
    }
    this.arena.excite(1)
    this.ui.rotate.classList.toggle('hidden', !(this.touch && window.innerHeight > window.innerWidth * 1.05))
  }

  checkWaveState(dt) {
    if (this.waveBreak > 0) {
      this.waveBreak -= dt
      this.ui.enemiesLeft.textContent = `NEXT WAVE IN ${Math.max(1, Math.ceil(this.waveBreak))}`
      if (this.waveBreak <= 0) {
        this.cleanupArena()
        this.startWave(this.wave + 1)
      }
      return
    }
    if (!this.waveActive) return
    if (this.state !== 'playing') return
    const alive = this.enemies.some((e) => !e.dead)
    if (this.spawnQueue.length === 0 && !alive) {
      this.waveActive = false
      this.waveBreak = 4.8
      this.ui.enemiesLeft.textContent = 'THE SAND IS QUIET'
      this.setBanner('WAVE ' + roman(this.wave) + ' CLEARED', 'THE SAND IS QUIET', 'CATCH YOUR BREATH')
      this.player.health = Math.min(this.player.maxHealth, this.player.health + 22)
      this.updateHealthUI()
      this.ui.comboWrap.classList.add('hidden')
      this.ui.bossWrap.classList.add('hidden')
      sound.crowdRoar(1, 2.4)
      this.arena.excite(1.5)
    }
  }

  cleanupArena() {
    // keep the blood, clear the oldest corpses so the pit stays playable
    let dead = this.enemies.filter((e) => e.dead)
    const keep = this.low ? 1 : 3
    for (let i = 0; i < dead.length - keep; i++) this.removeFighter(dead[i])
    this.enemies = this.enemies.filter((e) => !e.removed)
    this.pickups = this.pickups.filter((p) => {
      if (!p.mesh.parent) { this.removePickup(p); return false }
      return true
    })
  }

  spawnEnemy(type, forcedPos) {
    const cfg = ENEMY_TYPES[type]
    let pos
    if (forcedPos) pos = forcedPos.clone()
    else if (this.wave === 1 && this.enemies.length < 3) {
      const side = this.enemies.length === 0 ? -1 : this.enemies.length === 1 ? 1 : 0
      pos = new THREE.Vector3(side * rand(2.5, 5.5), 0, 6.5 - rand(7, 10.5))
      if (this.enemies.length === 2) pos.set(rand(-2, 2), 0, -2.5)
    } else {
      const pts = this.arena.spawnPoints
      const p = pick(pts)
      pos = p.clone().add(new THREE.Vector3(rand(-0.8, 0.8), 0, rand(-0.8, 0.8)))
    }
    const enemy = new Fighter(this.scene, this.gore, type, pos, this)
    enemy.id = ++this.enemyId
    enemy.root.position.copy(pos)
    enemy.root.rotation.y = Math.atan2(-pos.x, -pos.z)
    enemy.wave = this.wave
    this.enemies.push(enemy)
    this.gore.blood.burst(new THREE.Vector3(pos.x, 0.15, pos.z), { count: 16, chaos: 1.8, size: 0.7, vy: 1.4 })
    this.arena.excite(0.4)
    if (cfg.boss) {
      this.crowdPulse = 1
      this.ui.bossWrap.classList.remove('hidden')
    }
    sound.crowdRoar(0.5, 1.2)
    return enemy
  }

  removeFighter(f) {
    if (!f || f.removed) return
    f.removed = true
    if (f.root.parent) f.scene.remove(f.root)
    f.hitParts = []
  }

  updateWaves(dt) {
    // spawn from queue
    const maxActive = this.low ? 3 : this.wave >= 4 ? 4 : 3
    const alive = this.enemies.filter((e) => !e.dead).length
    if (this.spawnQueue.length > 0) {
      this.spawnQueue[0].delay -= dt
      if (this.spawnQueue[0].delay <= 0 && alive < maxActive) {
        const item = this.spawnQueue.shift()
        this.spawnEnemy(item.type)
      }
    }
    const remaining = this.spawnQueue.length + this.enemies.filter((e) => !e.dead).length
    this.ui.enemiesLeft.textContent = this.waveBreak > 0
      ? `NEXT WAVE IN ${Math.max(1, Math.ceil(this.waveBreak))}`
      : `${remaining} CHALLENGER${remaining === 1 ? '' : 'S'} REMAIN`
    this.checkWaveState(dt)

    // boss bar
    const boss = this.enemies.find((e) => !e.dead && e.cfg.boss)
    if (boss) {
      const hp = clamp(boss.partHp.torso / boss.partMax.torso, 0, 1)
      this.ui.bossWrap.classList.remove('hidden')
      this.ui.bossFill.style.width = (hp * 100).toFixed(1) + '%'
    } else if (this.waveBreak <= 0) {
      this.ui.bossWrap.classList.add('hidden')
    }

    // corpse cleanup
    for (const e of this.enemies) {
      if (e.dead && !e.removed) {
        if (e.deathTimer > (this.low ? 12 : 22) && e.root.parent) this.removeFighter(e)
      }
    }
    if (this.enemies.length > 14) {
      this.enemies = this.enemies.filter((e) => !e.removed)
    }
  }

  /* ------------------------------------------------------------------ */
  /* Input                                                               */
  /* ------------------------------------------------------------------ */

  onKeyDown(e) {
    const code = e.code
    if (code === 'Escape') {
      if (this.state === 'playing') { e.preventDefault(); this.pause() }
      else if (this.state === 'paused' && performance.now() - (this.pausedAt || 0) > 350) { e.preventDefault(); this.resume() }
      return
    }
    if (code === 'KeyM') { sound.setMuted(!sound.muted); return }
    if (this.state !== 'playing') return
    if (code === 'KeyW' || code === 'ArrowUp') { this.keys.w = true; e.preventDefault() }
    if (code === 'KeyS' || code === 'ArrowDown') { this.keys.s = true; e.preventDefault() }
    if (code === 'KeyA' || code === 'ArrowLeft') { this.keys.a = true; e.preventDefault() }
    if (code === 'KeyD' || code === 'ArrowRight') { this.keys.d = true; e.preventDefault() }
    if (e.repeat) return
    if (code === 'Space') { e.preventDefault(); this.player.shove() }
    if (code === 'ShiftLeft' || code === 'ShiftRight') { e.preventDefault(); this.player.dodge() }
    if (code === 'KeyE') { e.preventDefault(); this.tryInteract() }
    this.updateMoveInput()
  }

  onKeyUp(e) {
    const code = e.code
    if (code === 'KeyW' || code === 'ArrowUp') this.keys.w = false
    if (code === 'KeyS' || code === 'ArrowDown') this.keys.s = false
    if (code === 'KeyA' || code === 'ArrowLeft') this.keys.a = false
    if (code === 'KeyD' || code === 'ArrowRight') this.keys.d = false
    this.updateMoveInput()
  }

  updateMoveInput() {
    if (!this.keys) return
    let x = (this.keys.d ? 1 : 0) - (this.keys.a ? 1 : 0)
    let z = (this.keys.s ? 1 : 0) - (this.keys.w ? 1 : 0)
    const len = Math.hypot(x, z)
    if (len > 1) { x /= len; z /= len }
    this.player.moveInput.x = x
    this.player.moveInput.z = z
  }

  onMouseDown(e) {
    if (this.state !== 'playing') return
    sound.init()
    if (!this.touch && !document.pointerLockElement) {
      this.dragging = true
      this.dragMoved = 0
      this.lastMouse.x = e.clientX
      this.lastMouse.y = e.clientY
      if (e.button === 0) this.requestLock()
    }
    if (e.button === 0) this.player.startCharge()
    if (e.button === 2) { e.preventDefault(); this.player.blockDown() }
  }

  onMouseUp(e) {
    if (e.button === 0) {
      if (this.state === 'playing') this.player.releaseCharge()
      this.dragging = false
    }
    if (e.button === 2) this.player.blockUp()
  }

  onMouseMove(e) {
    if (this.state !== 'playing') return
    if (document.pointerLockElement === this.canvas) {
      this.player.look(e.movementX || 0, e.movementY || 0)
    } else if (this.dragging) {
      const dx = e.clientX - this.lastMouse.x
      const dy = e.clientY - this.lastMouse.y
      this.lastMouse.x = e.clientX
      this.lastMouse.y = e.clientY
      this.dragMoved += Math.abs(dx) + Math.abs(dy)
      this.player.look(dx * 1.4, dy * 1.4, 0.0022)
    }
  }

  tryInteract() {
    if (this.state !== 'playing') return
    if (this.tryExecute()) return
    this.tryPickup()
  }

  tryExecute() {
    if (this.state !== 'playing') return false
    const target = this.findExecutionTarget()
    if (!target) return false
    const dir = new THREE.Vector3(
      target.root.position.x - this.player.pos.x,
      0,
      target.root.position.z - this.player.pos.z
    ).normalize()
    // move the player into range, then cinematic strike
    this.player.executing = 0.72
    this.player.attackState = 'idle'
    this.player.charging = false
    this.player.blocking = false
    this.player.invuln = 1.2
    this.player.rig.position.z -= 0.12
    this.slowmo = 0.28
    this.slowmoTimer = 0.62
    this.hitstop = 0.04
    target.staggerTimer = 0.4
    target.execute(this.player.weaponId === 'hammer' ? 'hammer' : 'sword', dir)
    this.player.shake(0.45)
    this.bloodSplatter(10, 0.85)
    this.ui.exec.classList.add('hidden')
    this.crowdPulse = 1
    this.arena.excite(2.5)
    this.gameOverFlash = Math.max(this.gameOverFlash || 0, 0.35)
    return true
  }

  tryPickup() {
    let best = null, bestD = 2.3
    for (const p of this.pickups) {
      if (!p.mesh.parent) continue
      p.mesh.getWorldPosition(this._v)
      const d = Math.hypot(this._v.x - this.player.pos.x, this._v.z - this.player.pos.z)
      if (d < bestD) { bestD = d; best = p }
    }
    if (!best) return false
    if (best.type === this.player.weaponId) {
      // already carrying it, still remove litter swap? keep it
      return false
    }
    this.player.setWeapon(best.type)
    this.removePickup(best)
    this.pickups = this.pickups.filter((p) => p !== best)
    this.addScore(40, null, '+40 GLORY')
    this.addKillFeed('TAKEN', best.type.toUpperCase(), 40)
    return true
  }

  findExecutionTarget() {
    if (!this.player.alive) return null
    let best = null, bestD = 3.4
    const sin = Math.sin(this.player.yaw), cos = Math.cos(this.player.yaw)
    for (const e of this.enemies) {
      if (e.dead) continue
      if (e.staggerTimer <= 0.05) continue
      const dx = e.root.position.x - this.player.pos.x
      const dz = e.root.position.z - this.player.pos.z
      const d = Math.hypot(dx, dz)
      if (d > bestD) continue
      const dot = (-dx * sin - dz * cos) / (d || 1)
      if (dot < 0.2) continue
      bestD = d
      best = e
    }
    return best
  }

  findPickupTarget() {
    let best = null, bestD = 2.3
    for (const p of this.pickups) {
      if (!p.mesh.parent) continue
      if (p.type === this.player.weaponId) continue
      p.mesh.getWorldPosition(this._v)
      const d = Math.hypot(this._v.x - this.player.pos.x, this._v.z - this.player.pos.z)
      if (d < bestD) { bestD = d; best = p }
    }
    return best
  }

  /* ------------------------------------------------------------------ */
  /* Combat callbacks                                                    */
  /* ------------------------------------------------------------------ */

  playerSwing(player, a, b, kind, damage, type, hitRadius, hitSet) {
    const camPos = player.camera.getWorldPosition(new THREE.Vector3())
    const aimDir = player.camera.getWorldDirection(new THREE.Vector3())
    const range = player.attackRange
    // A melee swing should catch anything inside a generous forward arc even
    // when the animated weapon itself passes to one side of the target.
    const minDot = (type === 'crush' ? 0.12 : 0.32) - (kind === 'heavy' ? 0.14 : 0)
    const maxEnemies = player.weaponId === 'hammer' ? 3 : 1
    const candidates = []
    for (const enemy of this.enemies) {
      if (enemy.dead || hitSet.has(enemy.id)) continue
      const camDist = Math.hypot(enemy.root.position.x - player.pos.x, enemy.root.position.z - player.pos.z)
      if (camDist > range + 1.4) continue
      const chest = new THREE.Vector3(enemy.root.position.x, 1.15 * enemy.scale, enemy.root.position.z)
      const to = chest.sub(camPos)
      const dot = to.normalize().dot(aimDir)
      if (dot < minDot) continue
      candidates.push({ enemy, dot, dist: camDist })
    }
    candidates.sort((x, y) => (y.dot - x.dot) || (x.dist - y.dist))

    let hits = 0
    for (const { enemy } of candidates) {
      const chest = new THREE.Vector3(enemy.root.position.x, 1.15 * enemy.scale, enemy.root.position.z)
      const aimEnd = camPos.clone().addScaledVector(aimDir, Math.min(range + 0.9, camPos.distanceTo(chest) + 0.9))
      let hit = enemy.hitTest(camPos, aimEnd, hitRadius + 0.16)
      if (!hit) {
        // Small aim error is forgiven by testing the stump-to-chest line too.
        hit = enemy.hitTest(camPos, chest, 0.24)
      }
      if (!hit) continue
      const dir = new THREE.Vector3().subVectors(hit.point, camPos).normalize()
      hitSet.add(enemy.id)
      const result = enemy.takeHit(hit.key, damage, type, dir, hit.point, { fromPlayer: true })
      if (result?.blocked) {
        this.onEnemyBlocked(enemy, hit.point)
        sound.metal()
        this.hitstop = Math.max(this.hitstop, 0.03)
        this.player.shake(0.08)
        break
      }
      this.gore.impact(hit.point, dir, kind === 'heavy' ? 1.5 : 0.9, 'flesh')
      this.gore.bloodSpray(hit.point, dir, kind === 'heavy' ? 32 : 16, 4.5, 1)
      enemy.checkDestroy(result, dir, hit.point)
      this.onPlayerHit(enemy, hit, result, type, kind, hit.point)
      hits++
      if (hits >= maxEnemies) break
    }
  }

  playerShove(player) {
    const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw)
    let hitAny = false
    for (const enemy of this.enemies) {
      if (enemy.dead) continue
      const dx = enemy.root.position.x - player.pos.x
      const dz = enemy.root.position.z - player.pos.z
      const d = Math.hypot(dx, dz)
      if (d > 2.5) continue
      const dot = (-dx * sin - dz * cos) / (d || 1)
      if (dot < 0.35) continue
      hitAny = true
      enemy.staggerTimer = Math.max(enemy.staggerTimer, enemy.cfg.boss ? 0.3 : 0.9)
      enemy.state = 'stagger'
      enemy.stateTime = 0
      const p = new THREE.Vector3(enemy.root.position.x, 1.1, enemy.root.position.z)
      this.gore.bloodSpray(p, { x: dx / d, y: 0.2, z: dz / d }, 8, 2.5, 0.6)
      this.addFloater(p, 'SHOVED', 'gold')
      sound.hitFlesh(0.6)
      this.hitstop = Math.max(this.hitstop, 0.035)
    }
    if (hitAny) {
      this.player.shake(0.1)
      this.addScore(10, null, null)
    }
  }

  onPlayerHit(enemy, hit, result, type, kind, point) {
    const dmg = Math.round(result?.applied || 0)
    this.player.bloodied = (this.player.bloodied || 0) + 1
    this.bumpCombo(1)
    this.addScore(Math.round((4 + dmg * 0.25) * this.comboMult()), null, null)
    if (dmg >= 10) this.addFloater(point, String(dmg), kind === 'heavy' ? 'big' : '')
    if (this.player.weaponModel?.userData.stain) this.player.weaponModel.userData.stain.visible = true
    sound.hitFlesh(clamp(dmg / 40, 0.5, 1.6))
    if (type === 'crush' && chance(0.5)) sound.hitBone(0.8)
    this.shakeAmount(0.06 + dmg * 0.0015)
    this.showHitmarker(false)
    this.hitstop = Math.max(this.hitstop, kind === 'heavy' ? 0.055 : 0.028)
    if (enemy.dead || result?.destroyed) this.hitstop = Math.max(this.hitstop, 0.075)
    if (kind === 'heavy') this.bloodSplatter(2, 0.35)
    this.player.comboTimer = 0.5
  }

  onEnemyBlocked(enemy, point) {
    this.addFloater(point, 'BLOCKED', 'gold')
    this.showHitmarker(false)
    this.addScore(5, null, null)
  }

  onDismember(enemy, label, pos, kind) {
    this.stats.dismemberments++
    const bonusMap = {
      ARM: 140, 'LEFT ARM': 140, LEG: 120, 'LEFT LEG': 120, HEAD: 320,
      'SKULL CRUSHED': 260, BISECTED: 500, 'CHEST CAVED IN': 420,
      'RIB CAGE SHATTERED': 420, EXECUTION: 380, DECAPITATION: 340,
      'CUT IN HALF': 500
    }
    const base = (bonusMap[label] || 150)
    this.bumpCombo(2)
    this.addScore(base, pos, `+${base} GLORY`)
    this.addKillFeed(enemy.cfg.name, label, base)
    this.stats.bestCombo = Math.max(this.stats.bestCombo, this.combo)
    this.crowdPulse = 1
    this.arena.excite(kind === 'bisect' ? 2.4 : 1.4)
    if (kind === 'decap' || kind === 'crush' || kind === 'bisect' || kind === 'execute') {
      this.slowmo = 0.32
      this.slowmoTimer = Math.max(this.slowmoTimer, kind === 'bisect' ? 0.55 : 0.3)
      this.bloodSplatter(kind === 'bisect' ? 12 : 8, 0.75)
    } else {
      this.bloodSplatter(3, 0.4)
    }
    this.gameOverFlash = 0.3
  }

  onKill(enemy, label, pos, executed = false) {
    this.kills++
    this.waveKills = (this.waveKills || 0) + 1
    this.bumpCombo(2)
    const base = 90 + this.wave * 12 + (executed ? 80 : 0)
    this.addScore(base, pos, `+${base}`)
    this.ui.kills.textContent = `${this.kills} KILL${this.kills === 1 ? '' : 'S'}`
    this.addKillFeed(enemy.cfg.name, label, base)
    this.crowdPulse = 1
    this.arena.excite(1.6)
    this.bloodSplatter(5, 0.55)
    this.showHitmarker(true)
    this.gameOverFlash = 0.25
  }

  onWeaponDrop(type, mesh) {
    if (!mesh || mesh.userData.isPickup) return
    if (type !== 'sword' && type !== 'hammer') return
    mesh.userData.isPickup = true
    const marker = new THREE.Sprite(new THREE.SpriteMaterial({
      map: softDropTexture(), color: type === 'hammer' ? 0xffcf7a : 0x9fd4ff,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9
    }))
    marker.scale.set(0.7, 0.7, 1)
    marker.position.set(0, 0.5, 0)
    mesh.add(marker)
    this.pickups.push({ type, mesh, marker, id: Math.random() })
    // clean up old pickups
    if (this.pickups.length > 4) {
      const old = this.pickups.shift()
      this.removePickup(old)
    }
  }

  removePickup(p) {
    if (!p) return
    if (p.marker?.parent) p.marker.parent.remove(p.marker)
    if (p.mesh?.parent) p.mesh.parent.remove(p.mesh)
  }

  onPlayerHurt(dmg, attacker, dir) {
    this.ui.damageFlash.style.opacity = clamp(0.25 + dmg / 55, 0, 0.9)
    setTimeout(() => { this.ui.damageFlash.style.opacity = 0 }, 130)
    this.bloodSplatter(Math.min(14, 4 + dmg * 0.35), 0.7)
    this.player.shake(0.25)
    this.shakeAmount(0.2)
    this.updateHealthUI()
    if (this.player.health < 32) {
      this.lastHeartbeat = 0
    }
  }

  onParry(attacker) {
    attacker.staggerTimer = Math.max(attacker.staggerTimer, 1.25)
    attacker.state = 'stagger'
    attacker.stateTime = 0
    this.addScore(60, attacker.root.position, '+60 PARRY')
    this.addFloater(new THREE.Vector3(attacker.root.position.x, 1.8, attacker.root.position.z), 'PARRY', 'gold')
    this.bumpCombo(1)
    this.arena.excite(1)
    this.showHitmarker(true)
    this.hitstop = Math.max(this.hitstop, 0.04)
  }

  onPlayerDeath(attacker) {
    this.state = 'dying'
    this.deathTimer = 0
    this.player.rig.visible = false
    this.bloodSplatter(30, 1)
    this.ui.damageFlash.style.opacity = 0.95
    setTimeout(() => { this.ui.damageFlash.style.opacity = 0 }, 500)
    this.ui.bossWrap.classList.add('hidden')
    this.ui.exec.classList.add('hidden')
    this.ui.interact.classList.add('hidden')
    this.slowmo = 0.25
    this.slowmoTimer = 1.4
    this.setTouchVisible(false)
  }

  onWeaponChanged(type) {
    this.updateWeaponUI()
    this.player.weaponModel.userData.stain.visible = (this.player.bloodied || 0) > 0
  }

  onHeavyStart(player) {
    player.shake(0.08)
  }

  onCharge(t) {}

  onDodge() {
    this.shakeAmount(0.04)
  }

  onShove() {}

  updateWeaponUI() {
    const w = this.player.stats
    this.ui.weaponName.textContent = w.name
    this.ui.weaponKind.textContent = w.kind
    this.ui.weaponIcon.className = 'weapon-icon ' + this.player.weaponId + ' swap'
    setTimeout(() => { this.ui.weaponIcon.className = 'weapon-icon ' + this.player.weaponId }, 420)
    this.selectedWeapon = this.player.weaponId
  }

  enemyHitPlayer(enemy, amount, weaponKind) {
    if (this.state !== 'playing') return
    const dir = new THREE.Vector3(
      this.player.pos.x - enemy.root.position.x,
      0,
      this.player.pos.z - enemy.root.position.z
    ).normalize()
    const result = this.player.takeDamage(amount, enemy, weaponKind, dir)
    if (result?.blocked && !result.parried) {
      this.hitstop = Math.max(this.hitstop, 0.025)
      this.player.shake(0.18)
      this.showHitmarker(false)
    }
    if (result?.parried) {
      this.hitstop = Math.max(this.hitstop, 0.06)
    }
  }

  /* ------------------------------------------------------------------ */
  /* Scoring / feedback                                                  */
  /* ------------------------------------------------------------------ */

  bumpCombo(n = 1) {
    this.combo += n
    this.comboTimer = this.comboMaxTime
    this.ui.comboWrap.classList.remove('hidden')
    this.ui.comboMult.textContent = 'x' + this.comboMult().toFixed(1).replace('.0', '')
    this.stats.bestCombo = Math.max(this.stats.bestCombo, this.combo)
    this.ui.comboWrap.style.animation = 'none'
    void this.ui.comboWrap.offsetWidth
    this.ui.comboWrap.style.animation = ''
  }

  comboMult() {
    return 1 + Math.min(4, Math.floor(this.combo / 4) * 0.5)
  }

  addScore(amount, pos, floaterText) {
    const gain = Math.round(amount * (amount > 20 ? this.comboMult() : 1))
    this.score += gain
    this.ui.score.textContent = this.score
    if (pos && floaterText) this.addFloater(pos, floaterText, 'gold')
  }

  addFloater(worldPos, text, cls = '') {
    if (!worldPos) return
    const v = this._v.copy(worldPos).project(this.camera)
    if (v.z > 1 || v.z < -1) return
    const x = (v.x * 0.5 + 0.5) * window.innerWidth
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight
    if (x < -100 || x > window.innerWidth + 100 || y < -100 || y > window.innerHeight + 100) return
    const el = document.createElement('div')
    el.className = 'floater ' + cls
    el.textContent = text
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    this.ui.floaters.appendChild(el)
    setTimeout(() => el.remove(), 1000)
    if (this.ui.floaters.childElementCount > 24) this.ui.floaters.firstChild?.remove()
  }

  addKillFeed(actor, action, points) {
    const row = document.createElement('div')
    row.className = 'kf-row'
    row.innerHTML = `${actor} <b>${action}</b> <i>+${points}</i>`
    this.ui.killfeed.prepend(row)
    while (this.ui.killfeed.childElementCount > 5) this.ui.killfeed.lastChild.remove()
    setTimeout(() => {
      row.style.transition = 'opacity .5s'
      row.style.opacity = '0'
      setTimeout(() => row.remove(), 600)
    }, 5200)
  }

  showHitmarker(kill) {
    const hm = this.ui.hitmarker
    hm.classList.remove('show', 'kill')
    void hm.offsetWidth
    hm.classList.toggle('kill', !!kill)
    hm.classList.add('show')
  }

  shakeAmount(v) {
    this.player.shake(v)
  }

  setBanner(kicker, title, sub, red = false) {
    this.ui.bannerKicker.textContent = kicker
    this.ui.bannerTitle.textContent = title
    this.ui.bannerSub.textContent = sub
    this.ui.bannerTitle.classList.toggle('red', red)
    this.ui.banner.classList.remove('hidden', 'out')
    void this.ui.banner.offsetWidth
    this.ui.banner.style.animation = ''
    clearTimeout(this._bannerTimer)
    this._bannerTimer = setTimeout(() => {
      this.ui.banner.classList.add('out')
      setTimeout(() => this.ui.banner.classList.add('hidden'), 400)
    }, 2600)
  }

  /* ------------------------------------------------------------------ */
  /* Screen blood                                                        */
  /* ------------------------------------------------------------------ */

  bloodSplatter(strength = 5, alphaScale = 0.7) {
    const ctx = this.bloodCtx
    if (!ctx) return
    const w = this.ui.bloodCanvas.width, h = this.ui.bloodCanvas.height
    const n = Math.min(16, Math.floor(strength))
    for (let i = 0; i < n; i++) {
      const edge = chance(0.7)
      const x = edge
        ? (chance(0.5) ? rand(0, w * 0.26) : rand(w * 0.74, w))
        : rand(w * 0.2, w * 0.8)
      const y = edge ? rand(0, h) : rand(0, h * 0.55)
      const r = rand(4, 30) * (0.5 + strength * 0.045)
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(118,2,8,${rand(0.32, 0.58) * alphaScale})`)
      g.addColorStop(0.55, `rgba(88,2,7,${rand(0.18, 0.38) * alphaScale})`)
      g.addColorStop(1, 'rgba(60,0,4,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
      // droplets
      for (let k = 0; k < 4; k++) {
        const a = rand(0, TAU), d = rand(r * 0.5, r * 2.2)
        ctx.fillStyle = `rgba(${80 + randInt(0, 40)},2,6,${rand(0.25, 0.6) * alphaScale})`
        ctx.beginPath()
        ctx.ellipse(x + Math.cos(a) * d, y + Math.sin(a) * d, rand(1, 5), rand(1, 9), a, 0, TAU)
        ctx.fill()
      }
    }
  }

  clearBloodOverlay() {
    this.bloodCtx.clearRect(0, 0, this.ui.bloodCanvas.width, this.ui.bloodCanvas.height)
  }

  updateBloodFade(raw) {
    // gradual fade of old gore from the lens
    if (this._bloodFadeAcc === undefined) this._bloodFadeAcc = 0
    this._bloodFadeAcc += raw
    if (this._bloodFadeAcc < 0.08) return
    this._bloodFadeAcc = 0
    const ctx = this.bloodCtx
    const w = this.ui.bloodCanvas.width, h = this.ui.bloodCanvas.height
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,0.075)'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'
  }

  /* ------------------------------------------------------------------ */
  /* HUD                                                                 */
  /* ------------------------------------------------------------------ */

  updateHealthUI(instant = false) {
    const pct = clamp(this.player.health / this.player.maxHealth, 0, 1)
    this.ui.healthFill.style.transform = `scaleX(${pct})`
    this.ui.healthLag.style.transform = `scaleX(${pct})`
    this.ui.healthFill.classList.toggle('low', pct < 0.3)
    if (instant) this.ui.healthLag.style.transition = 'none'
    else this.ui.healthLag.style.transition = ''
  }

  updateHUD(dt) {
    // health lags smooth
    this.updateHealthUI()

    // charge ring
    if (this.player.charging && this.player.alive) {
      const t = clamp(this.player.chargeTime / 1.0, 0, 1)
      this.ui.chargeRing.style.opacity = '1'
      this.ui.ringFill.style.strokeDashoffset = String(264 * (1 - t))
      this.ui.ringFill.style.stroke = t >= 0.26 ? '#ff2f2f' : 'rgba(255,80,60,.7)'
    } else {
      this.ui.chargeRing.style.opacity = '0'
    }

    // combo timer
    if (this.comboTimer > 0) {
      this.comboTimer -= dt
      this.ui.comboWrap.classList.remove('hidden')
      this.ui.comboTimer.style.transform = `scaleX(${clamp(this.comboTimer / this.comboMaxTime, 0, 1)})`
      if (this.comboTimer <= 0) {
        this.ui.comboWrap.classList.add('hidden')
        this.combo = 0
      }
    }

    // aim target
    let hot = false
    let execTarget = null
    const sin = Math.sin(this.player.yaw), cos = Math.cos(this.player.yaw)
    for (const e of this.enemies) {
      if (e.dead) continue
      const dx = e.root.position.x - this.player.pos.x
      const dz = e.root.position.z - this.player.pos.z
      const d = Math.hypot(dx, dz)
      if (d > 3.8) continue
      const dot = (-dx * sin - dz * cos) / (d || 1)
      if (dot > 0.965) { hot = true }
      if (e.staggerTimer > 0.05 && d < 3.4 && dot > 0.2) execTarget = e
    }
    this.ui.crosshair.classList.toggle('hot', hot)
    this.ui.exec.classList.toggle('hidden', !execTarget || this.state !== 'playing')
    if (this.touch) {
      $('#t-exec').classList.toggle('hidden', !execTarget || this.state !== 'playing')
    }

    const pickup = this.findPickupTarget()
    if (pickup && !execTarget) {
      this.ui.interact.classList.remove('hidden')
      this.ui.interactText.textContent = 'TAKE THE ' + pickup.type.toUpperCase()
    } else {
      this.ui.interact.classList.add('hidden')
    }

    // low health heartbeat
    if (this.player.alive && this.player.health < 32) {
      this.lastHeartbeat -= dt
      if (this.lastHeartbeat <= 0) {
        this.lastHeartbeat = 1.15
        sound.heartbeat(1 - this.player.health / 40)
      }
    }

    // banner rotate note
    if (this.touch && this.state === 'playing') {
      this.ui.rotate.classList.toggle('hidden', !(window.innerHeight > window.innerWidth * 1.05))
    }

    // pickups marker bob
    for (const p of this.pickups) {
      if (!p.marker.parent) continue
      p.marker.position.y = 0.5 + Math.sin(this.time * 2.5 + p.id * 10) * 0.12
      p.marker.material.opacity = 0.55 + Math.sin(this.time * 3 + p.id) * 0.25
    }

    // damage flash pulse from hurt
    const hurt = this.player.hurtFlash
    if (hurt > 0.01) {
      this.ui.damageFlash.style.opacity = String(clamp(hurt * 0.8, 0, 0.85))
    }
  }

  /* ------------------------------------------------------------------ */
  /* Loop                                                                */
  /* ------------------------------------------------------------------ */

  loop() {
    requestAnimationFrame(this.loop)
    const raw = Math.min(this.clock.getDelta(), 0.05)
    this.time += raw

    if (this.state === 'menu') {
      this.menuAngle += raw * 0.07
      const r = 13.5
      this.camera.position.set(Math.cos(this.menuAngle) * r, 6.6 + Math.sin(this.time * 0.2) * 0.2, Math.sin(this.menuAngle) * r)
      this.camera.lookAt(0, 1.7, 0)
      this.player.rig.visible = false
      this.arena.update(raw, this.time)
      this.gore.update(raw)
      this.renderer.render(this.scene, this.camera)
      return
    }

    if (this.state === 'paused') {
      this.renderer.render(this.scene, this.camera)
      return
    }

    if (this.state === 'gameover') {
      this.arena.update(raw * 0.3, this.time)
      this.gore.update(raw * 0.3)
      this.renderer.render(this.scene, this.camera)
      return
    }

    // time scaling: hit stop, slow-mo, dying
    let dt = raw
    if (this.hitstop > 0) {
      this.hitstop -= raw
      dt = raw * 0.08
    }
    if (this.slowmoTimer > 0) {
      this.slowmoTimer -= raw
      dt = Math.min(dt, raw * this.slowmo)
      if (this.slowmoTimer <= 0) this.slowmo = 1
    }
    if (this.state === 'dying') dt = raw * 0.35

    this.arena.update(raw, this.time)
    this.gore.update(dt)
    this.player.update(dt)

    if (this.state === 'dying') {
      this.deathTimer += raw
      if (this.deathTimer > 1.7) this.gameOver()
    }

    if (this.state === 'playing' || this.state === 'dying') {
      const others = this.enemies
      for (const e of this.enemies) {
        if (e.removed) continue
        if (this.state === 'dying' || !this.player.alive) {
          if (e.dead) e.update(dt, this.time, this.player, others)
          else {
            // enemies circle the corpse
            e.update(dt * 0.45, this.time, this.player, others)
          }
        } else {
          e.update(dt, this.time, this.player, others)
        }
      }
      if (this.state === 'playing') this.updateWaves(dt)
      this.updateHUD(dt)
      this.updateBloodFade(raw)
    }

    this.updateCrowd(raw)
    this.renderer.render(this.scene, this.camera)
  }

  updateCrowd(raw) {
    if (this.crowdPulse > 0) {
      this.crowdPulse = Math.max(0, this.crowdPulse - raw * 0.5)
    }
    // slight camera-driven crowd energy already handled in arena
    if (this.state === 'playing') {
      const h = this.player.health / this.player.maxHealth
      if (h < 0.3 && Math.random() < 0.01) this.arena.excite(0.2)
    }
  }
}

/* ------------------------------------------------------------------ */
/* Debug surface for automated checks                                  */
/* ------------------------------------------------------------------ */

window.addEventListener('DOMContentLoaded', () => {
  const game = new Bloodpit()
  window.__BLOODPIT = game
  window.__bloodpit = {
    game,
    start: (weapon) => game.startRun(weapon || 'sword'),
    spawn: (type = 'duelist', dist = 2.4) => {
      const p = game.player
      const x = p.pos.x + Math.sin(p.yaw) * dist * -1
      const z = p.pos.z + Math.cos(p.yaw) * dist * -1
      return game.spawnEnemy(type, new THREE.Vector3(x, 0, z))
    },
    attack: (heavy = false) => {
      game.player.beginAttack(heavy ? 'heavy' : 'light', heavy ? 1.2 : 0)
    },
    hit: (type = 'head', dmg = 999) => {
      const e = game.enemies.find((x) => !x.dead)
      if (!e) return null
      const dir = new THREE.Vector3(0, 0, -1)
      const point = e.head.getWorldPosition(new THREE.Vector3())
      e.root.updateWorldMatrix(true, true)
      if (type === 'head') {
        const r = e.takeHit('head', dmg, 'slash', dir, point, { fromPlayer: true })
        e.checkDestroy(r, dir, point)
        return r
      }
    },
    screenshotPose: () => {
      // place the camera in front of a freshly mutilated enemy for visual checks
    }
  }
})
