import { clamp, rand } from './utils.js'

/**
 * Fully procedural audio — no external samples.
 * Everything is synthesised from noise buffers and oscillators on first gesture.
 */
export class Sound {
  constructor() {
    this.ctx = null
    this.master = null
    this.ready = false
    this.muted = false
    this.crowdGain = null
    this.ambientGain = null
    this.lastHit = 0
    this.lastSwing = 0
  }

  init() {
    if (this.ready) { this.resume(); return }
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    try {
      const ctx = new AC()
      this.ctx = ctx
      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -16
      comp.knee.value = 22
      comp.ratio.value = 5
      comp.attack.value = 0.003
      comp.release.value = 0.22
      this.master = ctx.createGain()
      this.master.gain.value = 0.75
      this.master.connect(comp)
      comp.connect(ctx.destination)

      // shared noise
      const len = ctx.sampleRate * 2
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
      this.noiseBuf = buf
      this.ready = true
      this.startAmbience()
      this.resume()
    } catch {
      this.ready = false
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  }

  setMuted(m) {
    this.muted = m
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.75, this.ctx.currentTime, 0.05)
  }

  now() { return this.ctx.currentTime }

  noise(dur = 0.3, type = 'bandpass', freq = 800, q = 1, gain = 0.3, when = 0, sweep = 0) {
    if (!this.ready) return null
    const ctx = this.ctx
    const t = ctx.currentTime + when
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuf
    src.loop = true
    src.playbackRate.value = rand(0.85, 1.15)
    const f = ctx.createBiquadFilter()
    f.type = type
    f.frequency.setValueAtTime(freq, t)
    if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(30, sweep), t + dur)
    f.Q.value = q
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(f); f.connect(g); g.connect(this.master)
    src.start(t); src.stop(t + dur + 0.02)
    return { src, f, g }
  }

  tone(type = 'sine', f0 = 220, f1 = 80, dur = 0.2, gain = 0.25, when = 0, curve = 'exp') {
    if (!this.ready) return
    const ctx = this.ctx
    const t = ctx.currentTime + when
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.setValueAtTime(f0, t)
    if (curve === 'exp') o.frequency.exponentialRampToValueAtTime(Math.max(12, f1), t + dur)
    else o.frequency.linearRampToValueAtTime(Math.max(12, f1), t + dur)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g); g.connect(this.master)
    o.start(t); o.stop(t + dur + 0.02)
    return { o, g }
  }

  startAmbience() {
    if (!this.ready) return
    const ctx = this.ctx
    // wind
    const wind = ctx.createBufferSource()
    wind.buffer = this.noiseBuf
    wind.loop = true
    const wf = ctx.createBiquadFilter()
    wf.type = 'lowpass'
    wf.frequency.value = 260
    wf.Q.value = 0.5
    const wg = ctx.createGain()
    wg.gain.value = 0.05
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.09
    const lfoG = ctx.createGain()
    lfoG.gain.value = 0.02
    lfo.connect(lfoG); lfoG.connect(wg.gain)
    wind.connect(wf); wf.connect(wg); wg.connect(this.master)
    wind.start(); lfo.start()
    this.ambientGain = wg

    // crowd murmur
    const crowd = ctx.createBufferSource()
    crowd.buffer = this.noiseBuf
    crowd.loop = true
    crowd.playbackRate.value = 0.7
    const cf = ctx.createBiquadFilter()
    cf.type = 'bandpass'
    cf.frequency.value = 560
    cf.Q.value = 0.7
    const cf2 = ctx.createBiquadFilter()
    cf2.type = 'peaking'
    cf2.frequency.value = 1200
    cf2.gain.value = 6
    const cg = ctx.createGain()
    cg.gain.value = 0.018
    const clfo = ctx.createOscillator()
    clfo.frequency.value = 0.17
    const clfoG = ctx.createGain()
    clfoG.gain.value = 0.008
    clfo.connect(clfoG); clfoG.connect(cg.gain)
    crowd.connect(cf); cf.connect(cf2); cf2.connect(cg); cg.connect(this.master)
    crowd.start(); clfo.start()
    this.crowdGain = cg
  }

  crowdRoar(power = 1, dur = 1.8) {
    if (!this.ready) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const target = clamp(0.03 + power * 0.09, 0.02, 0.2)
    this.crowdGain.gain.cancelScheduledValues(t)
    this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, t)
    this.crowdGain.gain.linearRampToValueAtTime(target, t + 0.18)
    this.crowdGain.gain.exponentialRampToValueAtTime(0.018, t + dur)
    // surface noise swell
    this.noise(dur * 0.8, 'bandpass', 900, 0.6, 0.05, 0, 400)
    this.tone('sawtooth', rand(120, 180), rand(90, 140), 0.5, 0.015, 0.02)
  }

  swing(kind = 'sword', charge = 0) {
    if (!this.ready) return
    const t = this.now()
    if (t - this.lastSwing < 0.07) return
    this.lastSwing = t
    if (kind === 'hammer') {
      this.noise(0.26, 'bandpass', 420, 1.2, 0.22 + charge * 0.15, 0, 130)
      this.tone('sine', 110, 45, 0.22, 0.08 + charge * 0.08)
    } else {
      this.noise(0.18, 'bandpass', 1300 + charge * 900, 1.6, 0.18 + charge * 0.1, 0, 420)
      this.tone('triangle', 620, 240, 0.12, 0.025)
    }
  }

  hitFlesh(power = 1) {
    if (!this.ready) return
    this.noise(0.16, 'lowpass', 900 + power * 600, 0.9, 0.35 * power, 0, 180)
    this.tone('sine', 95, 38, 0.16, 0.22 * power)
    this.tone('square', 180, 60, 0.05, 0.04 * power)
  }

  hitBone(power = 1) {
    if (!this.ready) return
    this.noise(0.07, 'highpass', 1800, 1, 0.18 * power)
    this.tone('square', 320, 90, 0.06, 0.06 * power)
    for (let i = 0; i < 4; i++) this.noise(0.03, 'bandpass', rand(1200, 3000), 3, 0.06 * power, rand(0, 0.05))
  }

  metal() {
    if (!this.ready) return
    this.noise(0.09, 'highpass', 2400, 1, 0.2)
    this.tone('triangle', 1450, 900, 0.22, 0.05)
    this.tone('triangle', 2200, 1500, 0.16, 0.03)
  }

  block() {
    if (!this.ready) return
    this.metal()
    this.tone('square', 380, 150, 0.1, 0.08)
  }

  parry() {
    if (!this.ready) return
    this.metal()
    this.tone('sine', 2600, 1800, 0.5, 0.06)
    this.tone('sine', 3900, 3000, 0.4, 0.035)
    this.noise(0.2, 'highpass', 3000, 1, 0.1)
  }

  sever() {
    if (!this.ready) return
    this.hitFlesh(1.3)
    this.hitBone(1.1)
    this.noise(0.34, 'lowpass', 1500, 1.4, 0.24, 0.03, 220)
    this.tone('sine', 210, 65, 0.32, 0.1, 0.02)
    // wet squelch
    this.noise(0.22, 'bandpass', 600, 4, 0.12, 0.06, 240)
  }

  crush() {
    if (!this.ready) return
    this.tone('sine', 80, 28, 0.34, 0.4)
    this.noise(0.3, 'lowpass', 700, 1, 0.4, 0, 120)
    this.hitBone(1.4)
    this.noise(0.4, 'bandpass', 500, 3, 0.18, 0.05, 180)
  }

  scream(pitch = 1) {
    if (!this.ready) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(rand(180, 260) * pitch, t)
    o.frequency.linearRampToValueAtTime(rand(300, 430) * pitch, t + 0.16)
    o.frequency.linearRampToValueAtTime(rand(140, 190) * pitch, t + 0.65)
    const vib = ctx.createOscillator()
    vib.frequency.value = rand(5, 8)
    const vg = ctx.createGain()
    vg.gain.value = 14
    vib.connect(vg); vg.connect(o.frequency)
    const f1 = ctx.createBiquadFilter()
    f1.type = 'bandpass'; f1.frequency.value = 750 * pitch; f1.Q.value = 4
    const f2 = ctx.createBiquadFilter()
    f2.type = 'bandpass'; f2.frequency.value = 1350 * pitch; f2.Q.value = 6
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.05)
    g.gain.setValueAtTime(0.06, t + 0.4)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)
    o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(this.master)
    o.start(t); vib.start(t); o.stop(t + 0.72); vib.stop(t + 0.72)
  }

  deathRattle() {
    if (!this.ready) return
    this.noise(0.55, 'lowpass', 600, 1, 0.12, 0, 160)
    this.tone('sawtooth', 140, 55, 0.5, 0.03)
  }

  playerHurt() {
    if (!this.ready) return
    this.hitFlesh(1.1)
    this.tone('sawtooth', 150, 85, 0.22, 0.045)
    this.noise(0.25, 'bandpass', 800, 1.2, 0.1, 0.02, 300)
  }

  dodge() {
    if (!this.ready) return
    this.noise(0.22, 'bandpass', 700, 0.8, 0.12, 0, 250)
  }

  whooshHeavy() {
    if (!this.ready) return
    this.noise(0.35, 'bandpass', 260, 0.8, 0.2, 0, 90)
  }

  pickup() {
    if (!this.ready) return
    this.metal()
    this.tone('triangle', 880, 1320, 0.12, 0.05)
  }

  ui() {
    if (!this.ready) return
    this.tone('triangle', 520, 330, 0.07, 0.04)
  }

  heartbeat(intensity = 1) {
    if (!this.ready) return
    this.tone('sine', 62, 34, 0.17, 0.2 * intensity)
    this.tone('sine', 55, 30, 0.2, 0.13 * intensity, 0.2)
  }

  step() {
    if (!this.ready) return
    this.noise(0.06, 'lowpass', 320, 0.7, 0.035)
  }

  bossRoar() {
    if (!this.ready) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(70, t)
    o.frequency.linearRampToValueAtTime(120, t + 0.4)
    o.frequency.linearRampToValueAtTime(50, t + 1.4)
    const f = ctx.createBiquadFilter()
    f.type = 'lowpass'; f.frequency.value = 400
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.15)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5)
    o.connect(f); f.connect(g); g.connect(this.master)
    o.start(t); o.stop(t + 1.55)
    this.crowdRoar(1.4, 2.4)
    this.noise(1.2, 'lowpass', 240, 0.8, 0.12, 0, 100)
  }
}

export const sound = new Sound()
