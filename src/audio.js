import { rand } from './utils.js';

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noiseBuf = null;
    this.ambientGain = null;
    this.crowdGain = null;
    this.started = false;
    this.muted = false;
    this.lowHealth = false;
    this.heartT = 0;
    this.volume = 0.55;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);

    const len = Math.floor(this.ctx.sampleRate * 2);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;

    this.startAmbient();
  }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : this.volume;
  }

  now() { return this.ctx.currentTime; }

  noise({ dur = 0.3, freq = 800, q = 1.2, gain = 0.3, type = 'bandpass', sweep = null, delay = 0, attack = 0.005 }) {
    if (!this.ctx || this.muted) return;
    const t = this.now() + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.playbackRate.value = rand(0.9, 1.1);
    const filt = this.ctx.createBiquadFilter();
    filt.type = type;
    filt.frequency.setValueAtTime(freq, t);
    filt.Q.value = q;
    if (sweep) filt.frequency.exponentialRampToValueAtTime(Math.max(20, sweep), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filt).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  tone({ freq = 200, endFreq = null, dur = 0.3, gain = 0.2, type = 'sine', delay = 0, attack = 0.005 }) {
    if (!this.ctx || this.muted) return;
    const t = this.now() + delay;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(10, endFreq), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  startAmbient() {
    if (this.started || !this.ctx) return;
    this.started = true;
    const t = this.now();

    // low drone
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 42;
    const dg = this.ctx.createGain();
    dg.gain.value = 0.055;
    drone.connect(dg).connect(this.master);
    drone.start();

    const drone2 = this.ctx.createOscillator();
    drone2.type = 'triangle';
    drone2.frequency.value = 63.5;
    const dg2 = this.ctx.createGain();
    dg2.gain.value = 0.02;
    drone2.connect(dg2).connect(this.master);
    drone2.start();

    // crowd murmur
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 620;
    filt.Q.value = 0.6;
    const g = this.ctx.createGain();
    g.gain.value = 0.028;
    src.connect(filt).connect(g).connect(this.master);
    src.start(t);
    this.crowdGain = g;

    // slow swell LFO
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lg = this.ctx.createGain();
    lg.gain.value = 0.012;
    lfo.connect(lg).connect(g.gain);
    lfo.start(t);
  }

  swing(heavy = false) {
    if (!this.ctx) return;
    if (heavy) {
      this.noise({ dur: 0.34, freq: 320, sweep: 90, q: 0.8, gain: 0.26, type: 'bandpass' });
      this.tone({ freq: 90, endFreq: 40, dur: 0.28, gain: 0.14, type: 'sine' });
    } else {
      this.noise({ dur: 0.22, freq: 1600, sweep: 380, q: 1.1, gain: 0.2, type: 'bandpass' });
    }
  }

  hitFlesh(power = 1) {
    if (!this.ctx) return;
    this.noise({ dur: 0.16, freq: 240, sweep: 100, q: 0.7, gain: 0.24 * power, type: 'lowpass' });
    this.tone({ freq: 120, endFreq: 45, dur: 0.22, gain: 0.25 * power, type: 'sine' });
    this.noise({ dur: 0.08, freq: 3200, q: 0.7, gain: 0.1 * power, type: 'highpass', delay: 0.01 });
  }

  hitMetal() {
    if (!this.ctx) return;
    this.tone({ freq: 1850, endFreq: 1400, dur: 0.2, gain: 0.08, type: 'square' });
    this.tone({ freq: 2700, endFreq: 2100, dur: 0.14, gain: 0.05, type: 'triangle' });
    this.noise({ dur: 0.06, freq: 5000, q: 1, gain: 0.14, type: 'highpass' });
  }

  crush() {
    if (!this.ctx) return;
    this.tone({ freq: 70, endFreq: 24, dur: 0.5, gain: 0.5, type: 'sine' });
    this.noise({ dur: 0.42, freq: 380, sweep: 70, q: 0.5, gain: 0.4, type: 'lowpass' });
    // bone cracks
    for (let i = 0; i < 4; i++) {
      this.noise({ dur: 0.035, freq: rand(1400, 3200), q: 2, gain: 0.2, type: 'bandpass', delay: 0.02 + i * 0.035 });
    }
  }

  boneSnap() {
    for (let i = 0; i < 3; i++) {
      this.noise({ dur: 0.04, freq: rand(900, 2400), q: 3, gain: 0.18, type: 'bandpass', delay: i * 0.03 });
    }
  }

  sever() {
    if (!this.ctx) return;
    this.hitFlesh(1.1);
    this.boneSnap();
    this.noise({ dur: 0.5, freq: 700, sweep: 120, q: 0.6, gain: 0.16, type: 'lowpass', delay: 0.05 });
  }

  scream(pitch = 1) {
    if (!this.ctx || this.muted) return;
    const t = this.now();
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    const f0 = rand(210, 360) * pitch;
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.38, t + 0.55);
    const vib = this.ctx.createOscillator();
    vib.frequency.value = rand(9, 15);
    const vg = this.ctx.createGain();
    vg.gain.value = 18;
    vib.connect(vg).connect(osc.frequency);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 900;
    filt.Q.value = 1.2;
    osc.connect(filt).connect(g).connect(this.master);
    osc.start(t); vib.start(t);
    osc.stop(t + 0.7); vib.stop(t + 0.7);
  }

  hurt() {
    if (!this.ctx) return;
    this.tone({ freq: 95, endFreq: 38, dur: 0.3, gain: 0.3, type: 'sine' });
    this.noise({ dur: 0.2, freq: 900, sweep: 200, q: 0.8, gain: 0.18, type: 'lowpass' });
  }

  playerDeath() {
    if (!this.ctx) return;
    this.tone({ freq: 55, endFreq: 18, dur: 1.6, gain: 0.4, type: 'sine' });
    this.noise({ dur: 1.4, freq: 500, sweep: 60, q: 0.4, gain: 0.22, type: 'lowpass' });
    this.scream(0.7);
  }

  cheer(strength = 1) {
    if (!this.ctx || this.muted) return;
    if (this.crowdGain) {
      const t = this.now();
      this.crowdGain.gain.cancelScheduledValues(t);
      this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, t);
      this.crowdGain.gain.linearRampToValueAtTime(0.05 + 0.06 * strength, t + 0.25);
      this.crowdGain.gain.linearRampToValueAtTime(0.03, t + 2.4);
    }
    this.noise({ dur: 1.4, freq: 700, q: 0.5, gain: 0.09 * strength, type: 'bandpass', attack: 0.3 });
    this.noise({ dur: 1.0, freq: 1500, q: 0.7, gain: 0.05 * strength, type: 'bandpass', delay: 0.12, attack: 0.2 });
  }

  gong() {
    if (!this.ctx) return;
    this.tone({ freq: 150, endFreq: 96, dur: 1.7, gain: 0.28, type: 'sine', attack: 0.01 });
    this.tone({ freq: 320, endFreq: 210, dur: 1.3, gain: 0.12, type: 'triangle', attack: 0.01 });
    this.noise({ dur: 1.2, freq: 400, q: 0.4, gain: 0.1, type: 'lowpass' });
  }

  setLowHealth(on) {
    if (on === this.lowHealth) return;
    this.lowHealth = on;
    this.heartT = 0;
  }

  update(dt) {
    if (!this.ctx || this.muted) return;
    if (this.lowHealth) {
      this.heartT -= dt;
      if (this.heartT <= 0) {
        this.heartT = 0.82;
        this.tone({ freq: 52, endFreq: 34, dur: 0.16, gain: 0.16, type: 'sine' });
        this.tone({ freq: 46, endFreq: 30, dur: 0.14, gain: 0.1, type: 'sine', delay: 0.19 });
      }
    }
  }
}
