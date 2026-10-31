import * as THREE from 'three'

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const invLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1)
export const smoothstep = (a, b, v) => { const t = invLerp(a, b, v); return t * t * (3 - 2 * t) }
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a)
export const randInt = (a, b) => Math.floor(rand(a, b + 1))
export const pick = arr => arr[Math.floor(Math.random() * arr.length)]
export const chance = p => Math.random() < p
export const deg = d => d * Math.PI / 180

export function dampAngle(current, target, lambda, dt) {
  let diff = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI
  if (diff < -Math.PI) diff += Math.PI * 2
  return current + diff * (1 - Math.exp(-lambda * dt))
}

export function shortestAngle(a, b) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI
  if (d < -Math.PI) d += Math.PI * 2
  return d
}

export function angleDiff(a, b) {
  return Math.abs(shortestAngle(a, b))
}

export function seededRandom(seed = 1) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function makePeriodicNoise(seed = 8) {
  const rng = seededRandom(seed)
  const grid = Array.from({ length: 64 * 64 }, rng)
  const at = (x, y) => grid[((y & 63) * 64) + (x & 63)]
  return (x, y, scale = 64) => {
    const sx = x / scale
    const sy = y / scale
    const x0 = Math.floor(sx)
    const y0 = Math.floor(sy)
    const tx = sx - x0
    const ty = sy - y0
    const u = tx * tx * (3 - 2 * tx)
    const v = ty * ty * (3 - 2 * ty)
    return lerp(lerp(at(x0, y0), at(x0 + 1, y0), u), lerp(at(x0, y0 + 1), at(x0 + 1, y0 + 1), u), v)
  }
}

export function seededNoise2D(seed = 1) {
  const hash = (x, y) => {
    let n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453
    return n - Math.floor(n)
  }
  return (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = x - xi
    const yf = y - yi
    const u = xf * xf * (3 - 2 * xf)
    const v = yf * yf * (3 - 2 * yf)
    return lerp(lerp(hash(xi, yi), hash(xi + 1, yi), u), lerp(hash(xi, yi + 1), hash(xi + 1, yi + 1), u), v)
  }
}

export function fbm(noise, x, y, octaves = 4) {
  let sum = 0
  let amp = .5
  let freq = 1
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, y * freq) * amp
    freq *= 2
    amp *= .5
  }
  return sum
}

export function formatNumber(n) {
  return Math.max(0, Math.floor(n)).toLocaleString('en-US')
}

export function roman(n) {
  const table = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let out = ''
  for (const [value, symbol] of table) while (n >= value) { out += symbol; n -= value }
  return out || 'I'
}

export function disposeObject(obj) {
  obj.traverse(child => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      for (const mat of mats) {
        if (mat.map) mat.map.dispose()
        mat.dispose()
      }
    }
  })
}

export function setShadow(root, cast = true, receive = true) {
  root.traverse(o => {
    if (o.isMesh) { o.castShadow = cast; o.receiveShadow = receive }
  })
}
