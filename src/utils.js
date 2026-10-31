import * as THREE from '../vendor/three.module.js';

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t) => t * t * t;

export function canvasTexture(w, h, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (opts.repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  tex.anisotropy = opts.aniso ?? 4;
  return tex;
}

export function makeSandTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#a98c5d';
    ctx.fillRect(0, 0, w, h);
    // broad tonal patches
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w, y = Math.random() * h, r = rand(20, 100);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const shade = Math.random() > 0.5 ? 'rgba(80,58,36,.10)' : 'rgba(220,195,150,.10)';
      g.addColorStop(0, shade); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    }
    // grain
    for (let i = 0; i < 14000; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const v = Math.random();
      ctx.fillStyle = v > 0.7 ? 'rgba(60,42,26,.35)' : v > 0.35 ? 'rgba(200,176,130,.28)' : 'rgba(0,0,0,.12)';
      ctx.fillRect(x, y, rand(0.6, 1.8), rand(0.6, 1.8));
    }
    // raked lines
    ctx.strokeStyle = 'rgba(70,50,30,.10)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 70; i++) {
      const y = Math.random() * h;
      ctx.beginPath(); ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y + rand(-8, 8), w * 0.7, y + rand(-8, 8), w, y + rand(-4, 4));
      ctx.stroke();
    }
  }, { repeat: [5, 5], aniso: 8 });
}

export function makeStoneTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#4a403b';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 1800; i++) {
      const v = Math.random();
      ctx.fillStyle = v > 0.5 ? `rgba(${90 + Math.random() * 40},${80 + Math.random() * 30},${70 + Math.random() * 30},.4)` : 'rgba(20,16,14,.35)';
      const s = rand(1, 6);
      ctx.fillRect(Math.random() * w, Math.random() * h, s, s * rand(0.4, 1.6));
    }
    // cracks
    ctx.strokeStyle = 'rgba(14,10,9,.5)';
    for (let i = 0; i < 8; i++) {
      let x = Math.random() * w, y = Math.random() * h;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let k = 0; k < 5; k++) { x += rand(-22, 22); y += rand(6, 30); ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }, { repeat: [2, 1] });
}

export function makeRadialTexture(inner = 'rgba(255,80,40,1)', outer = 'rgba(255,80,40,0)') {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

export function makeBloodBlobTexture() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // central blot
    for (let i = 0; i < 26; i++) {
      const x = w / 2 + rand(-22, 22), y = h / 2 + rand(-22, 22);
      const r = rand(6, 26);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(130,2,6,.9)');
      g.addColorStop(0.7, 'rgba(100,1,4,.55)');
      g.addColorStop(1, 'rgba(60,0,2,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    }
    // splatter droplets
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2, d = rand(30, 60);
      const x = w / 2 + Math.cos(a) * d, y = h / 2 + Math.sin(a) * d;
      ctx.fillStyle = `rgba(${randInt(70, 115)},0,${randInt(2, 10)},${rand(0.4, 0.85)})`;
      ctx.beginPath(); ctx.arc(x, y, rand(1.5, 5), 0, 7); ctx.fill();
    }
  });
}

export function makeBannerTexture() {
  return canvasTexture(128, 192, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#6d0911'); g.addColorStop(0.6, '#4a050b'); g.addColorStop(1, '#2c0206');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // torn bottom
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, h - 18);
    for (let x = 0; x <= w; x += 16) ctx.lineTo(x + rand(-6, 6), h - 18 + rand(-14, 14));
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
    // border
    ctx.strokeStyle = 'rgba(220,170,90,.35)'; ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, w - 12, h - 26);
    // emblem
    ctx.fillStyle = 'rgba(16,3,3,.75)';
    ctx.beginPath(); ctx.arc(w / 2, 76, 28, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(220,170,90,.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(w / 2, 76, 28, 0, 7); ctx.stroke();
    // skull-ish mark
    ctx.fillStyle = 'rgba(205,185,150,.55)';
    ctx.beginPath(); ctx.arc(w / 2, 70, 10, 0, 7); ctx.fill();
    ctx.fillRect(w / 2 - 7, 76, 14, 9);
    ctx.fillStyle = 'rgba(30,4,4,.9)';
    ctx.beginPath(); ctx.arc(w / 2 - 4, 69, 2.6, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(w / 2 + 4, 69, 2.6, 0, 7); ctx.fill();
    // grime
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(10,0,0,${rand(0.05, 0.2)})`;
      ctx.fillRect(rand(0, w), rand(0, h), rand(2, 18), rand(1, 8));
    }
  });
}
