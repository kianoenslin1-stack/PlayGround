import { clamp, rand } from './utils.js'

export class AudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.sfxBus = null
    this.ambientBus = null
    this.volume = .75
    this.muted = false
    this.started = false
    this.intensity = 0
    this.nextBeat = 0
    this.nextCrowd = 0
    this.stepTimer = 0
  }

  start() {
    if (this.started) { this.ctx?.resume(); return }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    this.ctx = new AC()
    this.started = true
    const ctx = this.ctx
    this.master = ctx.createGain()
    this.master.gain.value = this.volume
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.knee.value = 18
    comp.ratio.value = 5
    comp.attack.value = .003
    comp.release.value = .2
    this.master.connect(comp)
    comp.connect(ctx.destination)
    this.sfxBus = ctx.createGain(); this.sfxBus.gain.value = .8; this.sfxBus.connect(this.master)
    this.ambientBus = ctx.createGain(); this.ambientBus.gain.value = .65; this.ambientBus.connect(this.master)
    this.noise = this.makeNoise(2, 'pink')
    this.white = this.makeNoise(1, 'white')
    this.buildAmbience()
    this.nextBeat = ctx.currentTime + 2
    this.nextCrowd = ctx.currentTime + 4
  }

  makeNoise(seconds, kind = 'white') {
    const ctx = this.ctx
    const length = Math.floor(ctx.sampleRate * seconds)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1
      if (kind === 'pink') {
        b0 = .99886 * b0 + white * .0555179
        b1 = .99332 * b1 + white * .0750759
        b2 = .96900 * b2 + white * .1538520
        b3 = .86650 * b3 + white * .3104856
        b4 = .55000 * b4 + white * .5329522
        b5 = -.7616 * b5 - white * .0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * .5362) * .11
        b6 = white * .115926
      } else data[i] = white
    }
    return buffer
  }

  buildAmbience() {
    const ctx = this.ctx
    // Wind
    const wind = ctx.createBufferSource()
    wind.buffer = this.noise
    wind.loop = true
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'; windFilter.frequency.value = 260; windFilter.Q.value = .7
    const windGain = ctx.createGain(); windGain.gain.value = .032
    const lfo = ctx.createOscillator(); lfo.frequency.value = .065
    const lfoGain = ctx.createGain(); lfoGain.gain.value = .018
    lfo.connect(lfoGain); lfoGain.connect(windGain.gain)
    wind.connect(windFilter); windFilter.connect(windGain); windGain.connect(this.ambientBus)
    wind.start(); lfo.start()

    // Low cathedral drone
    for (const [f, gain] of [[41.2, .013], [61.7, .008], [82.4, .005]]) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'; osc.frequency.value = f
      const g = ctx.createGain(); g.gain.value = gain
      const trem = ctx.createOscillator(); trem.frequency.value = .04 + Math.random() * .05
      const tg = ctx.createGain(); tg.gain.value = gain * .35
      trem.connect(tg); tg.connect(g.gain)
      osc.connect(g); g.connect(this.ambientBus); osc.start(); trem.start()
    }

    // Crowd bed
    const crowd = ctx.createBufferSource(); crowd.buffer = this.noise; crowd.loop = true
    const cf = ctx.createBiquadFilter(); cf.type = 'bandpass'; cf.frequency.value = 640; cf.Q.value = .45
    const cg = ctx.createGain(); cg.gain.value = .012
    const clfo = ctx.createOscillator(); clfo.frequency.value = .11
    const clg = ctx.createGain(); clg.gain.value = .007
    clfo.connect(clg); clg.connect(cg.gain)
    crowd.connect(cf); cf.connect(cg); cg.connect(this.ambientBus); crowd.start(); clfo.start()
    this.crowdGain = cg
  }

  setVolume(v) {
    this.volume = clamp(v, 0, 1)
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, .05)
  }

  setMuted(m) {
    this.muted = m
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : this.volume, this.ctx.currentTime, .04)
  }

  now() { return this.ctx?.currentTime || 0 }

  tone({ freq = 220, end = freq, duration = .25, gain = .1, type = 'sine', attack = .004, pan = 0, bus = null, lowpass = null }) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (end !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, end), t + duration)
    const g = ctx.createGain()
    g.gain.setValueAtTime(.0001, t)
    g.gain.linearRampToValueAtTime(gain, t + attack)
    g.gain.exponentialRampToValueAtTime(.0001, t + duration)
    let node = osc
    if (lowpass) {
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lowpass
      node.connect(f); node = f
    }
    const p = ctx.createStereoPanner(); p.pan.value = pan
    node.connect(g); g.connect(p); p.connect(bus || this.sfxBus)
    osc.start(t); osc.stop(t + duration + .04)
  }

  noiseBurst({ duration = .2, gain = .12, freq = 1200, endFreq = freq, q = 1, type = 'bandpass', pan = 0, attack = .002, bus = null }) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource(); src.buffer = this.white
    src.playbackRate.value = rand(.9, 1.1)
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = q
    f.frequency.setValueAtTime(freq, t)
    if (endFreq !== freq) f.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), t + duration)
    const g = ctx.createGain()
    g.gain.setValueAtTime(.0001, t)
    g.gain.linearRampToValueAtTime(gain, t + attack)
    g.gain.exponentialRampToValueAtTime(.0001, t + duration)
    const p = ctx.createStereoPanner(); p.pan.value = clamp(pan, -1, 1)
    src.connect(f); f.connect(g); g.connect(p); p.connect(bus || this.sfxBus)
    src.start(t); src.stop(t + duration + .03)
  }

  swing(power = 1) {
    if (!this.ctx) return
    this.noiseBurst({ duration: .18 + power * .1, gain: .11 * power, freq: 700, endFreq: 2200 + power * 900, q: 1.6, type: 'bandpass', attack: .045 })
    this.noiseBurst({ duration: .22, gain: .035, freq: 240, endFreq: 110, q: .7, type: 'lowpass' })
  }

  hit(power = 1, metal = false) {
    if (!this.ctx) return
    this.tone({ freq: 92 * power, end: 43, duration: .18 + power * .08, gain: .2 * power, type: 'sine' })
    this.tone({ freq: 156, end: 60, duration: .12, gain: .06, type: 'triangle' })
    this.noiseBurst({ duration: .12, gain: .15, freq: 480, endFreq: 180, q: .8, type: 'lowpass' })
    this.noiseBurst({ duration: .07, gain: .08, freq: 1800, endFreq: 600, q: .7 })
    if (metal) {
      for (const f of [1420, 2180, 3170]) this.tone({ freq: f, end: f * .98, duration: .28, gain: .035, type: 'sine' })
      this.noiseBurst({ duration: .14, gain: .08, freq: 4400, endFreq: 2400, q: 2 })
    }
  }

  block() {
    if (!this.ctx) return
    for (const f of [920, 1740, 2780, 4120]) this.tone({ freq: f, end: f * .96, duration: .32, gain: .045, type: 'sine' })
    this.noiseBurst({ duration: .18, gain: .12, freq: 3900, endFreq: 1400, q: 2.2 })
    this.tone({ freq: 72, end: 48, duration: .22, gain: .13, type: 'sine' })
  }

  parry() {
    if (!this.ctx) return
    for (const [f, g] of [[1240, .08], [2130, .06], [3290, .04], [4680, .02]]) this.tone({ freq: f, end: f * .985, duration: .62, gain: g, type: 'sine', attack: .002 })
    this.tone({ freq: 84, end: 38, duration: .5, gain: .17, type: 'sine' })
    this.noiseBurst({ duration: .18, gain: .12, freq: 5600, endFreq: 2200, q: 1.8 })
  }

  flesh(power = 1) {
    if (!this.ctx) return
    this.noiseBurst({ duration: .16, gain: .15, freq: 340, endFreq: 130, q: 1.1, type: 'lowpass' })
    this.noiseBurst({ duration: .07, gain: .07, freq: 1300, endFreq: 400, q: 3 })
    this.tone({ freq: 61, end: 34, duration: .28, gain: .11, type: 'sine' })
  }

  hurt() {
    if (!this.ctx) return
    this.tone({ freq: 110, end: 46, duration: .38, gain: .17, type: 'triangle' })
    this.noiseBurst({ duration: .2, gain: .1, freq: 340, endFreq: 90, q: .8, type: 'lowpass' })
    this.tone({ freq: 48, end: 36, duration: .75, gain: .08, type: 'sine' })
  }

  footstep(surface = 0) {
    if (!this.ctx) return
    this.noiseBurst({ duration: .09, gain: .038, freq: surface === 0 ? 240 : 530, endFreq: surface === 0 ? 90 : 160, q: 1.1, type: 'lowpass' })
    this.tone({ freq: surface === 0 ? 52 : 74, end: 36, duration: .1, gain: .035, type: 'sine' })
  }

  roar(boss = false) {
    if (!this.ctx) return
    const base = boss ? 74 : 126
    for (let i = 0; i < 3; i++) {
      this.tone({ freq: base * (1 + i * .03), end: base * .58, duration: boss ? 1.1 : .65, gain: .028, type: 'sawtooth', attack: .07, lowpass: 820 })
    }
    this.noiseBurst({ duration: boss ? 1.15 : .7, gain: .075, freq: 560, endFreq: 240, q: .7 })
    this.tone({ freq: base * .5, end: 31, duration: .9, gain: .08, type: 'sine' })
  }

  death() {
    if (!this.ctx) return
    this.tone({ freq: 130, end: 43, duration: .75, gain: .055, type: 'sawtooth', lowpass: 460 })
    this.flesh(1.2)
  }

  execute() {
    if (!this.ctx) return
    this.tone({ freq: 58, end: 24, duration: 1.8, gain: .2, type: 'sine', attack: .01 })
    this.tone({ freq: 146, end: 36, duration: 1.2, gain: .05, type: 'sawtooth', lowpass: 700 })
    this.noiseBurst({ duration: .8, gain: .1, freq: 1000, endFreq: 130, q: .65, type: 'lowpass', attack: .03 })
    this.ctx.suspend
  }

  heartbeat() {
    if (!this.ctx) return
    this.tone({ freq: 64, end: 38, duration: .22, gain: .11, type: 'sine', attack: .006 })
    setTimeout(() => this.tone({ freq: 58, end: 33, duration: .18, gain: .07, type: 'sine' }), 155)
  }

  ui(confirm = false) {
    if (!this.ctx) return
    this.tone({ freq: confirm ? 392 : 620, end: confirm ? 523 : 560, duration: confirm ? .24 : .09, gain: confirm ? .035 : .018, type: 'sine' })
    if (confirm) this.tone({ freq: 784, end: 1046, duration: .3, gain: .018, type: 'sine' })
  }

  unlock() {
    if (!this.ctx) return
    for (const [f, d] of [[392, .15], [523.25, .2], [659.25, .26], [1046.5, .8]]) this.tone({ freq: f, end: f * 1.002, duration: d, gain: .04, type: 'sine', attack: .01 })
  }

  waveHorn(boss = false) {
    if (!this.ctx) return
    const base = boss ? 82 : 110
    for (const [f, g] of [[base, .09], [base * 1.5, .045], [base * 2, .02]]) {
      this.tone({ freq: f, end: f * .99, duration: boss ? 2.2 : 1.4, gain: g, type: 'sawtooth', attack: .22, lowpass: 680 })
    }
    this.noiseBurst({ duration: 1.3, gain: .065, freq: 520, endFreq: 280, q: .5, type: 'lowpass', attack: .2 })
  }

  update(dt, intensity = 0, moving = false) {
    if (!this.ctx || this.ctx.state !== 'running') return
    this.intensity += (intensity - this.intensity) * Math.min(1, dt * .8)
    if (this.crowdGain) this.crowdGain.gain.setTargetAtTime(.012 + this.intensity * .018, this.ctx.currentTime, .8)
    if (this.ctx.currentTime > this.nextBeat) {
      if (this.intensity > .16) {
        const low = 48 + Math.random() * 12
        this.tone({ freq: low, end: 31, duration: .34, gain: .05 + this.intensity * .08, type: 'sine', bus: this.ambientBus })
        this.noiseBurst({ duration: .1, gain: .016 + this.intensity * .012, freq: 180, endFreq: 70, q: .7, type: 'lowpass', bus: this.ambientBus })
        if (this.intensity > .65) setTimeout(() => this.tone({ freq: low * .8, end: 28, duration: .28, gain: .045, type: 'sine', bus: this.ambientBus }), 230)
      }
      this.nextBeat = this.ctx.currentTime + Math.max(.48, 1.55 - this.intensity * .7) + Math.random() * .15
    }
    if (this.ctx.currentTime > this.nextCrowd) {
      if (this.intensity > .35 && Math.random() < .4) this.noiseBurst({ duration: .7, gain: .012, freq: 760 + Math.random() * 500, endFreq: 500, q: .9, bus: this.ambientBus })
      this.nextCrowd = this.ctx.currentTime + 3 + Math.random() * 4
    }
  }
}
