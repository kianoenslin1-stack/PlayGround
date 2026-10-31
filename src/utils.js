import * as THREE from 'three'

export const TAU = Math.PI * 2
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const invLerp = (a, b, v) => (v - a) / (b - a)
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a)
export const randInt = (a, b) => Math.floor(rand(a, b + 1))
export const chance = (p) => Math.random() < p
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const randSign = () => (Math.random() < 0.5 ? -1 : 1)
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
export const easeInCubic = (t) => t * t * t
export const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5)
export const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
export const easeOutBack = (t) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export function roman(n) {
  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ]
  let out = ''
  for (const [v, s] of map) while (n >= v) { out += s; n -= v }
  return out
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function grain(ctx, w, h, amount, size = 1, alpha = 0.1) {
  const data = ctx.getImageData(0, 0, w, h)
  for (let i = 0; i < data.data.length; i += 4) {
    const n = (Math.random() - 0.5) * amount
    data.data[i] += n
    data.data[i + 1] += n
    data.data[i + 2] += n
  }
  ctx.putImageData(data, 0, 0)
}

export function sandTexture(renderer) {
  const s = 512
  const c = makeCanvas(s, s)
  const ctx = c.getContext('2d')
  const r = rng(7)
  const g = ctx.createLinearGradient(0, 0, s, s)
  g.addColorStop(0, '#8a7150')
  g.addColorStop(0.5, '#79613f')
  g.addColorStop(1, '#5f4c34')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  for (let i = 0; i < 4200; i++) {
    const x = r() * s, y = r() * s
    const v = 40 + r() * 80
    ctx.fillStyle = `rgba(${v + 40},${v + 26},${v + 4},${0.08 + r() * 0.25})`
    ctx.fillRect(x, y, 1 + r() * 2.2, 1 + r() * 2)
  }
  for (let i = 0; i < 120; i++) {
    const x = r() * s, y = r() * s, rr = 0.6 + r() * 2.4
    ctx.fillStyle = r() > 0.5 ? 'rgba(30,22,14,.4)' : 'rgba(210,190,155,.25)'
    ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill()
  }
  for (let i = 0; i < 14; i++) {
    ctx.strokeStyle = `rgba(40,28,16,${0.12 + r() * 0.16})`
    ctx.lineWidth = 0.8 + r() * 1.4
    ctx.beginPath()
    let x = r() * s, y = r() * s
    ctx.moveTo(x, y)
    for (let k = 0; k < 5; k++) { x += (r() - 0.5) * 60; y += r() * 34; ctx.lineTo(x, y) }
    ctx.stroke()
  }
  grain(ctx, s, s, 20)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(9, 9)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = Math.min(8, renderer?.capabilities.getMaxAnisotropy?.() || 1)
  return t
}

export function stoneTexture(renderer) {
  const w = 512, h = 512
  const c = makeCanvas(w, h)
  const ctx = c.getContext('2d')
  const r = rng(19)
  ctx.fillStyle = '#3c3733'
  ctx.fillRect(0, 0, w, h)
  const rows = 8
  const rh = h / rows
  for (let row = 0; row < rows; row++) {
    const offset = (row % 2) * 42
    for (let x = -42; x < w; x += 84) {
      const g = 36 + r() * 22
      ctx.fillStyle = `rgb(${g + 8},${g + 2},${g - 2})`
      ctx.fillRect(x + offset + 2, row * rh + 2, 84 - 4, rh - 4)
      ctx.strokeStyle = 'rgba(12,9,7,.7)'
      ctx.lineWidth = 2
      ctx.strokeRect(x + offset + 2, row * rh + 2, 84 - 4, rh - 4)
      for (let k = 0; k < 20; k++) {
        ctx.fillStyle = `rgba(${150 + r() * 50},${145 + r() * 45},${130 + r() * 40},${r() * 0.09})`
        ctx.fillRect(x + offset + r() * 80, row * rh + r() * rh, 2 + r() * 8, 1 + r() * 2)
      }
    }
  }
  grain(ctx, w, h, 26)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(6, 2)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = Math.min(8, renderer?.capabilities.getMaxAnisotropy?.() || 1)
  return t
}

export function bloodSplatTexture() {
  const s = 256
  const c = makeCanvas(s, s)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, s, s)
  const r = rng(51)
  const cx = s / 2, cy = s / 2
  // central pool
  ctx.fillStyle = 'rgba(58,3,6,0.96)'
  ctx.beginPath()
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * TAU
    const rad = 42 + Math.sin(a * 3 + 1) * 11 + r() * 12
    const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath(); ctx.fill()
  // drops and spatter
  for (let i = 0; i < 90; i++) {
    const a = r() * TAU
    const d = 30 + Math.pow(r(), 0.6) * 88
    const rr = 1 + Math.pow(r(), 3) * 10
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d
    ctx.fillStyle = `rgba(${42 + r() * 40},${1 + r() * 6},${3 + r() * 8},${0.55 + r() * 0.4})`
    ctx.beginPath(); ctx.ellipse(x, y, rr, rr * (0.5 + r()), a, 0, TAU); ctx.fill()
  }
  // streaks
  for (let i = 0; i < 9; i++) {
    const a = r() * TAU
    ctx.strokeStyle = `rgba(52,2,5,${0.3 + r() * 0.35})`
    ctx.lineWidth = 2 + r() * 5
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * 24, cy + Math.sin(a) * 24)
    ctx.lineTo(cx + Math.cos(a) * (50 + r() * 50), cy + Math.sin(a) * (50 + r() * 50))
    ctx.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function softDropTexture() {
  const s = 64
  const c = makeCanvas(s, s)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.8, 'rgba(255,255,255,0.25)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const t = new THREE.CanvasTexture(c)
  return t
}

export function flameTexture() {
  const s = 128
  const c = makeCanvas(s, s)
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,246,210,1)')
  g.addColorStop(0.18, 'rgba(255,197,90,0.95)')
  g.addColorStop(0.45, 'rgba(255,105,20,0.6)')
  g.addColorStop(0.75, 'rgba(190,30,10,0.12)')
  g.addColorStop(1, 'rgba(120,10,0,0)')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2, 0, TAU); ctx.fill()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function bannerTexture() {
  const w = 256, h = 512
  const c = makeCanvas(w, h)
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#5c0910')
  g.addColorStop(0.65, '#3e050b')
  g.addColorStop(1, '#260307')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < 400; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.18})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 1 + Math.random() * 3)
  }
  ctx.strokeStyle = 'rgba(201,161,92,.55)'
  ctx.lineWidth = 5
  ctx.strokeRect(16, 16, w - 32, h - 32)
  ctx.strokeStyle = 'rgba(201,161,92,.25)'
  ctx.lineWidth = 2
  ctx.strokeRect(27, 27, w - 54, h - 54)
  // crown / skull emblem
  ctx.save()
  ctx.translate(w / 2, 190)
  ctx.fillStyle = 'rgba(201,161,92,.82)'
  ctx.beginPath()
  ctx.moveTo(-52, -42); ctx.lineTo(-52, 26); ctx.lineTo(-30, 6); ctx.lineTo(-14, 34)
  ctx.lineTo(0, -6); ctx.lineTo(14, 34); ctx.lineTo(30, 6); ctx.lineTo(52, 26); ctx.lineTo(52, -42)
  ctx.closePath(); ctx.fill()
  // skull
  ctx.fillStyle = 'rgba(228,216,196,.9)'
  ctx.beginPath(); ctx.ellipse(0, 86, 33, 40, 0, 0, TAU); ctx.fill()
  ctx.fillRect(-21, 110, 42, 26)
  ctx.fillStyle = '#2a0408'
  ctx.beginPath(); ctx.ellipse(-13, 82, 9, 11, 0, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.ellipse(13, 82, 9, 11, 0, 0, TAU); ctx.fill()
  ctx.fillRect(-6, 100, 12, 14)
  ctx.fillStyle = 'rgba(201,161,92,.7)'
  for (let i = -2; i <= 2; i++) ctx.fillRect(i * 9 - 2, 124, 4, 14)
  ctx.restore()
  // drips
  for (let i = 0; i < 26; i++) {
    const x = 30 + Math.random() * (w - 60)
    const y = 300 + Math.random() * 40
    const len = 20 + Math.random() * 130
    ctx.fillStyle = `rgba(90,4,8,${0.2 + Math.random() * 0.35})`
    ctx.fillRect(x, y, 2 + Math.random() * 4, len)
    ctx.beginPath(); ctx.arc(x + 2, y + len, 3 + Math.random() * 3, 0, TAU); ctx.fill()
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function emblemTexture() {
  const s = 128
  const c = makeCanvas(s, s)
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, s, s)
  ctx.fillStyle = '#d8cdb8'
  // simple skull-ish mark
  ctx.beginPath(); ctx.ellipse(64, 54, 26, 30, 0, 0, TAU); ctx.fill()
  ctx.fillRect(46, 72, 36, 26)
  ctx.fillStyle = '#1a0406'
  ctx.beginPath(); ctx.ellipse(54, 50, 7, 9, 0, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.ellipse(74, 50, 7, 9, 0, 0, TAU); ctx.fill()
  ctx.fillRect(60, 64, 8, 12)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function makeMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05, ...opts })
}

export function makeMesh(geo, mat, pos, rot) {
  const m = new THREE.Mesh(geo, mat)
  if (pos) m.position.set(pos[0], pos[1], pos[2])
  if (rot) m.rotation.set(rot[0], rot[1], rot[2])
  m.castShadow = true
  m.receiveShadow = true
  return m
}

export function segmentPointDistance(p, a, b) {
  const abx = b.x - a.x, aby = b.y - a.y, abz = b.z - a.z
  const apx = p.x - a.x, apy = p.y - a.y, apz = p.z - a.z
  const denom = abx * abx + aby * aby + abz * abz
  let t = denom > 1e-8 ? (apx * abx + apy * aby + apz * abz) / denom : 0
  t = clamp(t, 0, 1)
  const dx = apx - abx * t, dy = apy - aby * t, dz = apz - abz * t
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function disposeObject(obj) {
  obj.traverse((o) => {
    if (o.geometry) o.geometry.dispose()
    if (o.material) {
      if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose())
      else o.material.dispose()
    }
  })
}
