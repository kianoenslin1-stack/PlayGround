import * as THREE from 'three'
import { WEAPONS, ARMORS } from './weapons.js'
import { ENEMY_TYPES } from './character.js'
import { formatNumber, clamp, roman } from './utils.js'

const $ = id => document.getElementById(id)

export class UI {
  constructor(audio) {
    this.audio = audio
    this.handlers = {}
    this.currentOverlay = null
    this.layout = 'desktop'
    this.enemyEls = new Map()
    this.bossEnemy = null
    this.lastHealth = 100
    this.armoryState = { tab: 'weapons', selected: null }
    this.dom = {
      loading: $('loading-screen'), title: $('title-screen'), hud: $('hud'),
      health: $('health-bar'), healthLag: $('health-lag'), healthText: $('health-text'),
      stamina: $('stamina-bar'), armorChip: $('armor-chip'), combo: $('combo-chip'),
      wave: $('wave-label'), arena: $('arena-name'), objective: $('wave-objective'), pips: $('wave-pips'),
      score: $('score-value'), marks: $('marks-value'), chain: $('chain-value'), chainTimer: $('chain-timer'),
      rage: $('rage-bar'), rageText: $('rage-text'), weapon: $('hud-weapon'),
      statReach: $('stat-reach'), statHit: $('stat-hit'),
      bossHud: $('boss-hud'), bossName: $('boss-name'), bossFill: $('boss-fill'),
      announce: $('announcement'), announceKicker: $('announce-kicker'), announceTitle: $('announce-title'), announceSub: $('announce-sub'),
      prompt: $('execution-prompt'), slow: $('slowmo-vignette'), hitmarker: $('hit-marker'),
      damage: $('damage-flash'), blood: $('blood-screen'), parry: $('parry-flash'),
      reticle: $('reticle'), touch: $('touch-ui'), executeBtn: document.querySelector('[data-touch="execute"]'),
      staminaWarning: $('stamina-warning'), controls: $('control-ribbon'),
      pause: $('pause-screen'), settings: $('settings-screen'), armory: $('armory-screen'),
      boon: $('boon-screen'), codex: $('codex-screen'), death: $('death-screen')
    }
    this.bindStatic()
  }

  bindStatic() {
    const click = (id, fn) => $(id)?.addEventListener('click', () => { this.audio.ui(true); fn() })
    click('btn-start', () => this.handlers.start?.())
    click('btn-armory', () => this.handlers.armory?.())
    click('btn-settings', () => this.handlers.settings?.())
    click('btn-codex', () => this.handlers.codex?.())
    click('btn-resume', () => this.handlers.resume?.())
    click('btn-pause-settings', () => this.handlers.settings?.())
    click('btn-abandon', () => this.handlers.abandon?.())
    click('btn-retry', () => this.handlers.retry?.())
    click('btn-menu', () => this.handlers.menu?.())
    click('btn-next-wave', () => this.handlers.nextWave?.())
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.ui()
        const name = btn.dataset.close
        if (name === 'settings') this.handlers.closeSettings?.()
        else this.closeOverlay(name)
      })
    })
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.audio.ui()
        this.armoryState.tab = tab.dataset.tab
        this.renderArmory()
      })
    })
    // settings
    const vol = $('set-volume'), sens = $('set-sens'), gore = $('set-gore'), scale = $('set-scale'), shake = $('set-shake'), motion = $('set-motion')
    const updateLabel = () => {
      $('vol-val').textContent = `${vol.value}%`
      $('sens-val').textContent = (sens.value / 100).toFixed(1)
      $('gore-val').textContent = ['SUBTLE', 'STANDARD', 'CINEMATIC'][gore.value]
      $('scale-val').textContent = ['AUTO', 'HIGH', 'PERFORMANCE'][scale.value]
    }
    vol.addEventListener('input', () => { updateLabel(); this.handlers.setting?.('volume', Number(vol.value)) })
    sens.addEventListener('input', () => { updateLabel(); this.handlers.setting?.('sensitivity', Number(sens.value)) })
    gore.addEventListener('input', () => { updateLabel(); this.handlers.setting?.('gore', Number(gore.value)) })
    scale.addEventListener('input', () => { updateLabel(); this.handlers.setting?.('scale', Number(scale.value)) })
    shake.addEventListener('change', () => this.handlers.setting?.('shake', shake.checked))
    motion.addEventListener('change', () => this.handlers.setting?.('motion', motion.checked))
    updateLabel()
  }

  bind(handlers) { this.handlers = handlers }

  setSettings(settings) {
    $('set-volume').value = Math.round(settings.volume * 100)
    $('set-sens').value = settings.sensitivity
    $('set-gore').value = settings.gore
    $('set-scale').value = settings.scale
    $('set-shake').checked = settings.shake
    $('set-motion').checked = settings.motion
    $('vol-val').textContent = `${Math.round(settings.volume * 100)}%`
    $('sens-val').textContent = (settings.sensitivity / 100).toFixed(1)
    $('gore-val').textContent = ['SUBTLE', 'STANDARD', 'CINEMATIC'][settings.gore]
    $('scale-val').textContent = ['AUTO', 'HIGH', 'PERFORMANCE'][settings.scale]
  }

  hideLoading() {
    this.dom.loading.classList.add('is-leaving')
    setTimeout(() => this.dom.loading.classList.remove('is-active'), 600)
  }

  showTitle() {
    document.body.classList.remove('in-game')
    this.dom.title.classList.add('is-active')
    this.dom.title.classList.remove('is-leaving')
    this.dom.hud.setAttribute('aria-hidden', 'true')
    this.clearEnemyBars()
  }

  hideTitle() {
    this.dom.title.classList.add('is-leaving')
    setTimeout(() => { this.dom.title.classList.remove('is-active') }, 600)
  }

  enterGame() {
    document.body.classList.add('in-game')
    this.dom.hud.setAttribute('aria-hidden', 'false')
    this.controlHint()
  }

  controlHint() {
    this.dom.controls.classList.remove('hide')
    clearTimeout(this.controlTimer)
    this.controlTimer = setTimeout(() => this.dom.controls.classList.add('hide'), 9000)
  }

  setTouch(enabled) {
    document.body.classList.toggle('touch', enabled)
    this.touchEnabled = enabled
  }

  updateTitleLoadout(meta) {
    const w = WEAPONS.find(w => w.id === meta.weapon) || WEAPONS[0]
    const a = ARMORS.find(a => a.id === meta.armor) || ARMORS[0]
    $('title-weapon').textContent = w.name
    $('title-weapon-glyph').textContent = w.icon
    $('title-armor').textContent = `${a.name} · RANK ${meta.rank || 1}`
    $('title-renown').textContent = formatNumber(meta.renown || 0)
    const next = this.xpForRank(meta.rank || 1)
    $('title-xp').style.width = `${clamp(((meta.renown || 0) % next) / next * 100, 2, 100)}%`
  }

  xpForRank(rank) { return 500 + rank * 230 }

  updateHUD(data) {
    const d = this.dom
    d.health.style.width = `${clamp(data.health / data.maxHealth * 100, 0, 100)}%`
    d.healthText.textContent = Math.ceil(data.health)
    if (data.health < this.lastHealth) d.healthLag.style.width = `${clamp(data.health / data.maxHealth * 100, 0, 100)}%`
    else setTimeout(() => { d.healthLag.style.width = `${clamp(data.health / data.maxHealth * 100, 0, 100)}%` }, 300)
    this.lastHealth = data.health
    d.stamina.style.width = `${clamp(data.stamina / data.maxStamina * 100, 0, 100)}%`
    d.armorChip.textContent = data.armor > 0 ? `PLATE ${Math.ceil(data.armor / data.maxArmor * 100)}%` : 'PLATE BROKEN'
    d.combo.textContent = data.combo > 1 ? `${data.combo} HIT CHAIN` : 'NO CHAIN'
    d.score.textContent = String(Math.floor(data.score)).padStart(6, '0')
    d.marks.textContent = formatNumber(data.runMarks)
    d.chain.textContent = `×${data.chain.toFixed(2)}`
    d.chainTimer.style.transform = `scaleX(${clamp(data.chainTimer, 0, 1)})`
    d.rage.style.width = `${clamp(data.rage, 0, 100)}%`
    d.rageText.textContent = Math.floor(data.rage)
    d.weapon.textContent = data.weaponName
    d.statReach.style.width = `${clamp(data.reach / 3.5 * 100, 10, 100)}%`
    d.statHit.style.width = `${clamp(data.damage / 105 * 100, 10, 100)}%`
    d.staminaWarning.classList.toggle('on', data.stamina < 14)
    d.executeBtn?.classList.toggle('show', !!data.executable)
    d.prompt.classList.toggle('show', !!data.executable)
    d.slow.classList.toggle('on', !!data.slowmo)
  }

  setWave(wave, arenaName, objective, boss = false) {
    this.dom.wave.textContent = `WAVE ${roman(wave)}`
    this.dom.arena.textContent = arenaName
    this.dom.objective.textContent = objective
    let html = ''
    const pips = Math.min(10, Math.max(10, Math.ceil(wave / 5) * 5))
    for (let i = 1; i <= pips; i++) html += `<i class="${i < wave ? 'filled' : ''} ${i % 5 === 0 ? 'boss' : ''}"></i>`
    this.dom.pips.innerHTML = html
  }

  setBoss(enemy) {
    this.bossEnemy = enemy
    this.dom.bossHud.classList.toggle('active', !!enemy)
    if (enemy) {
      this.dom.bossName.textContent = enemy.def.name
      this.dom.bossName.parentElement.querySelector('span').textContent = enemy.def.title
    }
  }

  updateEnemyBars(enemies, camera) {
    const layer = $('enemy-layer')
    const current = new Set()
    const v = new THREE.Vector3()
    for (const e of enemies) {
      if (e.char.dead || e.removed) continue
      current.add(e.id)
      let entry = this.enemyEls.get(e.id)
      if (!entry) {
        const el = document.createElement('div')
        el.className = `enemy-bar ${e.def.boss ? 'boss' : ''}`
        el.innerHTML = `<div class="name"><span>${e.def.name}</span><b>${e.char.health > 0 ? Math.ceil(e.char.health) : ''}</b></div><div class="track"><i></i></div>`
        layer.appendChild(el)
        entry = { el, fill: el.querySelector('.track i'), name: el.querySelector('.name b') }
        this.enemyEls.set(e.id, entry)
      }
      e.char.getHeadPosition(v)
      v.y += .42
      const p = v.clone().project(camera)
      const dist = camera.position.distanceTo(v)
      const visible = p.z < 1 && dist < 26 && dist > 1.4
      entry.el.classList.toggle('show', visible)
      if (visible) {
        entry.el.style.left = `${(p.x * .5 + .5) * window.innerWidth}px`
        entry.el.style.top = `${(-p.y * .5 + .5) * window.innerHeight}px`
        entry.fill.style.width = `${clamp(e.char.health / e.char.maxHealth * 100, 0, 100)}%`
        entry.name.textContent = Math.ceil(e.char.health)
      }
    }
    for (const [id, entry] of this.enemyEls) {
      if (!current.has(id)) { entry.el.remove(); this.enemyEls.delete(id) }
    }
    if (this.bossEnemy) {
      const e = this.bossEnemy
      if (e.char.dead || e.removed) { this.setBoss(null) } else {
        this.dom.bossFill.style.width = `${clamp(e.char.health / e.char.maxHealth * 100, 0, 100)}%`
      }
    }
  }

  clearEnemyBars() {
    for (const [, entry] of this.enemyEls) entry.el.remove()
    this.enemyEls.clear()
    this.setBoss(null)
  }

  setReticle(lock) { this.dom.reticle.classList.toggle('lock', lock) }

  showAnnouncement(kicker, title, sub, boss = false, duration = 2300) {
    const d = this.dom
    d.announceKicker.textContent = kicker
    d.announceTitle.textContent = title
    d.announceSub.textContent = sub
    d.announce.classList.toggle('boss', boss)
    d.announce.classList.add('show')
    clearTimeout(this.announceTimer)
    this.announceTimer = setTimeout(() => d.announce.classList.remove('show'), duration)
  }

  toast(text, type = '') {
    const el = document.createElement('div')
    el.className = `toast ${type}`
    el.textContent = text
    $('toast-layer').appendChild(el)
    setTimeout(() => el.remove(), 3300)
  }

  flashDamage() {
    this.dom.damage.classList.add('hit')
    setTimeout(() => this.dom.damage.classList.remove('hit'), 100)
  }

  flashBlood() {
    this.dom.blood.classList.add('active')
    clearTimeout(this.bloodTimer)
    this.bloodTimer = setTimeout(() => this.dom.blood.classList.remove('active'), 1200)
  }

  flashParry() {
    this.dom.parry.classList.remove('on')
    void this.dom.parry.offsetWidth
    this.dom.parry.classList.add('on')
  }

  hitMarker(heavy = false) {
    this.dom.hitmarker.classList.remove('on')
    void this.dom.hitmarker.offsetWidth
    this.dom.hitmarker.style.borderColor = heavy ? 'rgba(255,106,63,.95)' : 'rgba(255,238,210,.9)'
    this.dom.hitmarker.classList.add('on')
  }

  showSlowmo(on) { this.dom.slow.classList.toggle('on', on) }

  openOverlay(name) {
    const el = this.dom[name === 'boons' ? 'boon' : name]
    if (!el) return
    this.currentOverlay = name
    el.classList.add('is-active')
    if (name === 'pause' || name === 'settings' || name === 'armory' || name === 'codex') {
      this.dom.hud.style.opacity = name === 'pause' ? '.25' : '.12'
    }
  }

  closeOverlay(name) {
    const el = this.dom[name === 'boons' ? 'boon' : name]
    if (!el) return
    el.classList.remove('is-active')
    this.currentOverlay = null
    this.dom.hud.style.opacity = ''
  }

  closeAllOverlays() {
    for (const el of [this.dom.pause, this.dom.settings, this.dom.armory, this.dom.codex, this.dom.boon, this.dom.death]) el.classList.remove('is-active')
    this.currentOverlay = null
    this.dom.hud.style.opacity = ''
  }

  showPause(show) {
    this.dom.pause.classList.toggle('is-active', show)
    this.dom.hud.style.opacity = show ? '.25' : ''
  }

  setPauseStats(wave, kills, score) {
    $('pause-wave').textContent = roman(wave)
    $('pause-kills').textContent = kills
    $('pause-score').textContent = formatNumber(score)
  }

  renderArmory(meta = this.armoryMeta, loadout = this.armoryLoadout) {
    if (!meta) return
    this.armoryMeta = meta
    this.armoryLoadout = loadout
    const grid = $('armory-grid')
    const tab = this.armoryState.tab
    $('armory-marks').textContent = formatNumber(meta.marks)
    $('armory-progress').textContent = `BEST WAVE — ${roman(meta.bestWave || 0)}`
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab))
    if (tab === 'boons') {
      grid.innerHTML = `<div class="gear-card" style="grid-column:1/-1;cursor:default;min-height:120px"><div class="gear-icon">✦</div><strong>BOONS OF THE FALLEN</strong><span>Survive a wave to claim a boon. Boons are lost when you fall.</span><div style="color:#8d7a60;font-size:12px;margin-top:12px;line-height:1.5">Each wave offers three gifts. Choose one: heal, harden your hide, sharpen your steel, or feed on the dying. Bosses grant greater boons.</div></div>`
      if (!this.armoryState.selected || !this.armoryState.selected.startsWith('boon')) this.armoryState.selected = 'boon-info'
      this.renderDetail({ id: 'boon-info', name: 'THE ARENA REMEMBERS', type: 'PROGRESSION', icon: '✦', desc: 'The crowd rewards endurance. Each wave cleared grants Bloodmarks and a boon. Fall, and the run ends — but your weapons and armor remain.', stats: [['RENOWN', 78], ['BLOODMARKS', 60], ['SURVIVAL', 42]], owned: true, equipped: true, cost: 0 })
      return
    }
    const list = tab === 'weapons' ? WEAPONS : ARMORS
    const unlocked = tab === 'weapons' ? meta.unlockedWeapons : meta.unlockedArmor
    const equipped = tab === 'weapons' ? loadout.weapon : loadout.armor
    grid.innerHTML = ''
    for (const item of list) {
      const owned = unlocked.includes(item.id)
      const el = document.createElement('button')
      const cardEquipped = equipped === item.id
      el.className = `gear-card ${owned ? '' : 'locked'} ${cardEquipped ? 'equipped' : ''} ${this.armoryState.selected === item.id ? 'selected' : ''}`
      el.innerHTML = `<div class="gear-icon">${item.icon}</div><strong>${item.name}</strong><span>${item.type}</span><span class="gear-cost ${owned ? 'owned' : ''}">${cardEquipped ? 'EQUIPPED' : owned ? 'OWNED' : `${formatNumber(item.cost)} BLOODMARKS`}</span>`
      el.addEventListener('click', () => { this.audio.ui(); this.armoryState.selected = item.id; this.renderArmory(meta, loadout) })
      grid.appendChild(el)
      if (!this.armoryState.selected || !list.find(x => x.id === this.armoryState.selected)) this.armoryState.selected = list[0].id
    }
    const selected = list.find(x => x.id === this.armoryState.selected) || list[0]
    const owned = unlocked.includes(selected.id)
    const stats = tab === 'weapons' ? [
      ['DAMAGE', selected.damage / 105 * 100],
      ['REACH', selected.reach / 3.5 * 100],
      ['SPEED', selected.speed * 100],
      ['STAGGER', selected.stagger / 2.2 * 100]
    ] : [
      ['VITALITY', selected.health / 140 * 100],
      ['STAMINA', selected.stamina / 130 * 100],
      ['DEFENSE', selected.defense / .34 * 100],
      ['MOBILITY', selected.speed / 1.15 * 100]
    ]
    this.renderDetail({
      ...selected,
      owned: unlocked.includes(selected.id),
      equipped: equipped === selected.id,
      stats,
      canAfford: meta.marks >= selected.cost
    })
  }

  renderDetail(item) {
    $('detail-type').textContent = item.type
    $('detail-name').textContent = item.name
    $('detail-desc').textContent = item.desc
    $('armory-icon').textContent = item.icon
    const stats = $('detail-stats')
    stats.innerHTML = ''
    for (const [name, value] of item.stats || []) {
      stats.innerHTML += `<div class="detail-stat"><span>${name}</span><i><b style="width:${clamp(value, 3, 100)}%"></b></i></div>`
    }
    const btn = $('armory-action')
    if (item.equipped) { btn.textContent = 'EQUIPPED'; btn.disabled = true }
    else if (item.owned) { btn.textContent = 'EQUIP'; btn.disabled = false }
    else if (item.canAfford) { btn.textContent = `UNLOCK — ${formatNumber(item.cost)}`; btn.disabled = false }
    else { btn.textContent = `NEED ${formatNumber(item.cost - (this.armoryMeta?.marks || 0))} MORE`; btn.disabled = true }
    btn.onclick = () => {
      if (item.id === 'boon-info') return
      this.handlers.armoryAction?.(this.armoryState.tab, item.id)
    }
  }

  showArmory(meta, loadout) {
    this.openOverlay('armory')
    this.renderArmory(meta, loadout)
  }

  showBoons(wave, boons, reward) {
    this.openOverlay('boons')
    $('boon-wave').textContent = roman(wave)
    $('boon-reward').textContent = `+${formatNumber(reward)} BLOODMARKS`
    const grid = $('boon-grid')
    grid.innerHTML = ''
    this.selectedBoon = null
    const next = $('btn-next-wave')
    next.disabled = true
    next.textContent = 'CHOOSE A BOON'
    for (const boon of boons) {
      const el = document.createElement('button')
      el.className = 'boon-card'
      el.innerHTML = `<div class="boon-sigil">${boon.icon}</div><div><h3>${boon.name}</h3><p>${boon.desc}</p><em>${boon.rarity}</em></div>`
      el.addEventListener('click', () => {
        this.audio.ui(true)
        grid.querySelectorAll('.boon-card').forEach(c => c.classList.remove('selected'))
        el.classList.add('selected')
        this.selectedBoon = boon
        next.disabled = false
        next.textContent = 'CLAIM & ENTER THE NEXT WAVE'
      })
      grid.appendChild(el)
    }
    next.onclick = () => {
      if (!this.selectedBoon) return
      this.handlers.boonChosen?.(this.selectedBoon)
      this.closeOverlay('boons')
      this.handlers.nextWave?.()
    }
  }

  showDeath(data) {
    this.dom.hud.style.opacity = '.1'
    this.dom.death.classList.add('is-active')
    $('death-wave').textContent = roman(data.wave)
    $('death-kills').textContent = data.kills
    $('death-score').textContent = formatNumber(data.score)
    $('death-marks').textContent = `+${formatNumber(data.marks)}`
    $('death-sub').textContent = data.boss ? `FELLED BY ${data.boss}` : 'YOUR NAME JOINS THE SAND'
  }

  hideDeath() {
    this.dom.death.classList.remove('is-active')
    this.dom.hud.style.opacity = ''
  }

  hideGameUI() {
    document.body.classList.remove('in-game')
    this.dom.hud.style.opacity = ''
    this.dom.hud.setAttribute('aria-hidden', 'true')
    this.clearEnemyBars()
    this.showSlowmo(false)
    this.setBoss(null)
  }

  showError(message) {
    const el = $('boot-error')
    el.hidden = false
    el.textContent = message
  }
}
