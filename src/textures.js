import * as THREE from 'three'
import { fbm, seededNoise2D, seededRandom, clamp } from './utils.js'

function canvas(size = 512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return [c, c.getContext('2d')]
}

function texture(c, repeat = 1, srgb = true) {
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.anisotropy = 4
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createStoneTexture(variant = 0, size = 512) {
  const [c, ctx] = canvas(size)
  const img = ctx.createImageData(size, size)
  const noise = seededNoise2D(12 + variant)
  const base = variant === 2 ? [31, 29, 29] : variant === 1 ? [43, 42, 39] : [66, 58, 48]
  const rng = seededRandom(23 + variant)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(noise, x / 46, y / 46, 5)
      const fine = fbm(noise, x / 8, y / 8, 2)
      const grain = (rng() - .5) * 18
      const v = (n * 34 + fine * 21 + grain) * (variant === 2 ? .64 : 1)
      const i = (y * size + x) * 4
      img.data[i] = clamp(base[0] + v, 0, 255)
      img.data[i + 1] = clamp(base[1] + v * .93, 0, 255)
      img.data[i + 2] = clamp(base[2] + v * .82, 0, 255)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  ctx.globalAlpha = .25
  for (let i = 0; i < 90; i++) {
    const x = rng() * size
    const y = rng() * size
    const r = 4 + rng() * 28
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, variant === 0 ? '#0a0907' : '#080808')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  ctx.globalAlpha = 1
  if (variant === 0) {
    ctx.strokeStyle = 'rgba(40,45,28,.2)'
    ctx.lineWidth = 1
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      let x = rng() * size, y = rng() * size
      ctx.moveTo(x, y)
      for (let j = 0; j < 8; j++) { x += (rng() - .5) * 36; y += (rng() - .2) * 26; ctx.lineTo(x, y) }
      ctx.stroke()
    }
  }
  ctx.strokeStyle = variant === 2 ? 'rgba(154,58,21,.18)' : 'rgba(13,11,9,.38)'
  ctx.lineWidth = 1.5
  for (let i = 0; i < 13; i++) {
    ctx.beginPath()
    let x = rng() * size, y = rng() * size
    ctx.moveTo(x, y)
    for (let j = 0; j < 10; j++) { x += (rng() - .5) * 48; y += rng() * 34; ctx.lineTo(x, y) }
    ctx.stroke()
  }
  return texture(c, 1)
}

export function createSandTexture(size = 512) {
  const [c, ctx] = canvas(size)
  const img = ctx.createImageData(size, size)
  const n1 = seededNoise2D(72)
  const n2 = seededNoise2D(46)
  const rng = seededRandom(19)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const broad = fbm(n1, x / 38, y / 38, 4)
      const ripple = Math.sin((x + fbm(n2, x / 30, y / 30, 2) * 80) * .11) * .5 + .5
      const grain = (rng() - .5) * 30
      const v = (broad - .5) * 28 + ripple * 14 + grain
      const i = (y * size + x) * 4
      img.data[i] = clamp(118 + v, 0, 255)
      img.data[i + 1] = clamp(99 + v * .89, 0, 255)
      img.data[i + 2] = clamp(72 + v * .7, 0, 255)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  ctx.globalAlpha = .14
  for (let i = 0; i < 38; i++) {
    const x = rng() * size, y = rng() * size, r = 10 + rng() * 32
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, '#3a2719'); g.addColorStop(1, 'rgba(58,39,25,0)')
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  ctx.globalAlpha = 1
  return texture(c, 1)
}

export function createBasaltTexture(size = 512) {
  const [c, ctx] = canvas(size)
  const img = ctx.createImageData(size, size)
  const noise = seededNoise2D(112)
  const rng = seededRandom(81)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(noise, x / 28, y / 28, 5)
      const grain = (rng() - .5) * 16
      const v = n * 31 + grain
      const i = (y * size + x) * 4
      img.data[i] = clamp(31 + v, 0, 255)
      img.data[i + 1] = clamp(27 + v * .82, 0, 255)
      img.data[i + 2] = clamp(26 + v * .78, 0, 255)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  ctx.lineCap = 'round'
  for (let i = 0; i < 22; i++) {
    ctx.beginPath()
    let x = rng() * size, y = rng() * size
    ctx.moveTo(x, y)
    for (let j = 0; j < 12; j++) { x += (rng() - .5) * 30; y += rng() * 27; ctx.lineTo(x, y) }
    ctx.strokeStyle = `rgba(${70 + rng() * 35 | 0},${27 + rng() * 13 | 0},14,.35)`
    ctx.lineWidth = .6 + rng() * 1.6
    ctx.stroke()
  }
  return texture(c, 1)
}

export function createLavaGlowTexture(size = 512) {
  const [c, ctx] = canvas(size)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, size, size)
  const rng = seededRandom(22)
  ctx.lineCap = 'round'
  for (let i = 0; i < 16; i++) {
    ctx.beginPath()
    let x = rng() * size, y = rng() * size
    ctx.moveTo(x, y)
    for (let j = 0; j < 14; j++) { x += (rng() - .5) * 45; y += rng() * 30; ctx.lineTo(x, y) }
    ctx.strokeStyle = `rgba(${190 + rng() * 60 | 0},${55 + rng() * 80 | 0},18,${.25 + rng() * .45})`
    ctx.lineWidth = 1 + rng() * 4
    ctx.shadowColor = '#ff4d18'
    ctx.shadowBlur = 7
    ctx.stroke()
  }
  ctx.shadowBlur = 0
  return texture(c, 1)
}

export function createBannerTexture(index = 0, size = 512) {
  const [c, ctx] = canvas(size)
  const palettes = [
    ['#4b110e', '#1b0907', '#b28a51'],
    ['#232a2d', '#0d1011', '#788987'],
    ['#3f0b08', '#120504', '#a86f3d']
  ]
  const p = palettes[index % palettes.length]
  const grad = ctx.createLinearGradient(0, 0, 0, size)
  grad.addColorStop(0, p[0]); grad.addColorStop(.72, p[1]); grad.addColorStop(1, '#080504')
  ctx.fillStyle = grad; ctx.fillRect(0, 0, size, size)
  ctx.globalAlpha = .25
  const rng = seededRandom(90 + index)
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = i % 2 ? '#000' : '#fff'
    ctx.fillRect(rng() * size, rng() * size, rng() * 2, 26 + rng() * 80)
  }
  ctx.globalAlpha = 1
  ctx.strokeStyle = p[2]
  ctx.lineWidth = 2
  ctx.strokeRect(20, 20, size - 40, size - 40)
  ctx.lineWidth = 1
  ctx.strokeRect(28, 28, size - 56, size - 56)
  ctx.translate(size / 2, size * .39)
  ctx.fillStyle = p[2]
  ctx.globalAlpha = .78
  ctx.beginPath()
  ctx.arc(0, 0, 67, 0, Math.PI * 2)
  ctx.strokeStyle = p[2]; ctx.lineWidth = 4; ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-43, -18); ctx.quadraticCurveTo(-26, -54, 0, -55); ctx.quadraticCurveTo(26, -54, 43, -18)
  ctx.lineTo(33, 15); ctx.quadraticCurveTo(20, 40, 0, 49); ctx.quadraticCurveTo(-20, 40, -33, 15); ctx.closePath()
  ctx.fill()
  ctx.fillStyle = '#110705'
  ctx.beginPath(); ctx.ellipse(-17, -7, 12, 8, .2, 0, 7); ctx.fill()
  ctx.beginPath(); ctx.ellipse(17, -7, 12, 8, -.2, 0, 7); ctx.fill()
  ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(-7, 21); ctx.lineTo(7, 21); ctx.closePath(); ctx.fill()
  ctx.fillRect(-21, 28, 42, 5)
  ctx.strokeStyle = p[2]; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(-95, 112); ctx.lineTo(95, 112); ctx.stroke()
  ctx.globalAlpha = .65
  ctx.beginPath(); ctx.moveTo(0, 66); ctx.lineTo(-9, 94); ctx.lineTo(0, 122); ctx.lineTo(9, 94); ctx.closePath(); ctx.fill()
  ctx.globalAlpha = 1
  ctx.translate(-size / 2, -size * .39)
  // ragged bottom
  ctx.globalCompositeOperation = 'destination-out'
  for (let x = 0; x < size; x += 8) {
    const h = 7 + rng() * 22
    ctx.fillRect(x, size - h, 9, h)
  }
  ctx.globalCompositeOperation = 'source-over'
  return texture(c, 1)
}

export function createClothTexture(size = 256) {
  const [c, ctx] = canvas(size)
  const img = ctx.createImageData(size, size)
  const noise = seededNoise2D(44)
  const rng = seededRandom(301)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const fold = Math.sin(x / size * Math.PI * 6 + fbm(noise, x / 42, y / 42, 2) * 2.2) * .5 + .5
      const broad = fbm(noise, x / 18, y / 18, 3)
      const weave = (x % 3 === 0 ? 2.5 : 0) + (y % 3 === 0 ? 2.5 : 0)
      const v = 214 + broad * 26 - fold * 30 - weave
      const i = (y * size + x) * 4
      img.data[i] = img.data[i + 1] = img.data[i + 2] = clamp(v, 0, 255)
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  ctx.globalAlpha = .16
  for (let i = 0; i < 18; i++) {
    const x = rng() * size, y = rng() * size, r = 10 + rng() * 42
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, '#1a0a06'); g.addColorStop(1, 'rgba(20,8,5,0)')
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  ctx.globalAlpha = 1
  return texture(c, 1)
}

export function createBloodSplatTexture(size = 256) {
  const [c, ctx] = canvas(size)
  ctx.clearRect(0, 0, size, size)
  const rng = seededRandom(67)
  const cx = size / 2, cy = size / 2
  for (let i = 0; i < 30; i++) {
    const x = cx + (rng() - .5) * size * .55
    const y = cy + (rng() - .5) * size * .55
    const r = 4 + rng() * 30
    const g = ctx.createRadialGradient(x, y, 1, x, y, r)
    g.addColorStop(0, 'rgba(73,4,3,.94)')
    g.addColorStop(.6, 'rgba(91,6,4,.72)')
    g.addColorStop(1, 'rgba(68,4,3,0)')
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  }
  for (let i = 0; i < 45; i++) {
    const a = rng() * Math.PI * 2, d = size * (.16 + rng() * .34)
    ctx.fillStyle = `rgba(${55 + rng() * 40 | 0},3,2,${.3 + rng() * .55})`
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1 + rng() * 5, 1 + rng() * 10, a, 0, Math.PI * 2); ctx.fill()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createParticleTexture(hard = false, size = 64) {
  const [c, ctx] = canvas(size)
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  if (hard) {
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(.35, 'rgba(255,255,255,.95)')
    g.addColorStop(.7, 'rgba(255,255,255,.35)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
  } else {
    g.addColorStop(0, 'rgba(255,255,255,.8)')
    g.addColorStop(.32, 'rgba(255,255,255,.42)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
  }
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createGlowTexture(size = 256) {
  const [c, ctx] = canvas(size)
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,.9)')
  g.addColorStop(.12, 'rgba(255,229,181,.72)')
  g.addColorStop(.42, 'rgba(255,158,75,.16)')
  g.addColorStop(1, 'rgba(255,100,25,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createRuneTexture(size = 512, color = '#ff6a35') {
  const [c, ctx] = canvas(size)
  ctx.clearRect(0, 0, size, size)
  const cx = size / 2, cy = size / 2
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.globalAlpha = .8
  ctx.beginPath(); ctx.arc(cx, cy, size * .44, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, size * .34, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(a)
    ctx.beginPath(); ctx.moveTo(size * .35, 0); ctx.lineTo(size * .42, -6); ctx.lineTo(size * .42, 6); ctx.closePath(); ctx.stroke()
    ctx.restore()
  }
  ctx.font = `600 ${size * .07}px serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.globalAlpha = .65
  const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2
    ctx.save(); ctx.translate(cx + Math.cos(a) * size * .39, cy + Math.sin(a) * size * .39); ctx.rotate(a + Math.PI / 2); ctx.fillStyle = color; ctx.fillText(runes[i % runes.length], 0, 0); ctx.restore()
  }
  ctx.globalAlpha = 1
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function createCrackTexture(size = 512) {
  const [c, ctx] = canvas(size)
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, size, size)
  const rng = seededRandom(314)
  ctx.strokeStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 5
  for (let i = 0; i < 18; i++) {
    ctx.beginPath(); let x = rng() * size, y = rng() * size; ctx.moveTo(x, y)
    for (let j = 0; j < 15; j++) { x += (rng() - .5) * 38; y += (rng() - .2) * 24; ctx.lineTo(x, y) }
    ctx.lineWidth = .4 + rng() * 2.2; ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

export function createDustTexture(size = 256) {
  const [c, ctx] = canvas(size)
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,.6)')
  g.addColorStop(.5, 'rgba(255,255,255,.15)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}
