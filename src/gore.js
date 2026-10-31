import * as THREE from '../vendor/three.module.js';
import { rand, randInt, clamp, makeBloodBlobTexture } from './utils.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _off = new THREE.Vector3();

function makeDropTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.85, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(32, 32, 31, 0, 7); ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}


export class Gore {
  constructor(scene, isMobile = false) {
    this.scene = scene;
    this.isMobile = isMobile;
    this.time = 0;

    /* ---------- droplets ---------- */
    this.maxDrops = isMobile ? 520 : 1100;
    this.dropPos = new Float32Array(this.maxDrops * 3);
    this.dropCol = new Float32Array(this.maxDrops * 3);
    this.dropVel = new Float32Array(this.maxDrops * 3);
    this.dropLife = new Float32Array(this.maxDrops);
    this.dropMax = new Float32Array(this.maxDrops);
    this.dropSize = new Float32Array(this.maxDrops);
    this.dropHead = 0;
    for (let i = 0; i < this.maxDrops; i++) {
      this.dropPos[i * 3 + 1] = -100;
      this.dropLife[i] = 0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.dropPos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.dropCol, 3));
    g.setAttribute('size', new THREE.BufferAttribute(this.dropSize, 1));
    this.dropGeo = g;
    this.dropMat = new THREE.PointsMaterial({
      color: 0xffffff, vertexColors: true, size: 0.075, sizeAttenuation: true,
      map: makeDropTexture(), alphaTest: 0.08,
      transparent: true, opacity: 0.95, depthWrite: false
    });
    this.drops = new THREE.Points(g, this.dropMat);
    this.drops.frustumCulled = false;
    this.drops.renderOrder = 3;
    scene.add(this.drops);

    /* ---------- mist ---------- */
    this.maxMist = isMobile ? 70 : 130;
    this.mistPos = new Float32Array(this.maxMist * 3);
    this.mistVel = new Float32Array(this.maxMist * 3);
    this.mistLife = new Float32Array(this.maxMist);
    this.mistHead = 0;
    for (let i = 0; i < this.maxMist; i++) this.mistPos[i * 3 + 1] = -100;
    const mg = new THREE.BufferGeometry();
    mg.setAttribute('position', new THREE.BufferAttribute(this.mistPos, 3));
    this.mistGeo = mg;
    this.mist = new THREE.Points(mg, new THREE.PointsMaterial({
      color: 0x3a0104, size: 0.26, sizeAttenuation: true, transparent: true,
      opacity: 0.22, map: makeDropTexture(), alphaTest: 0.05, depthWrite: false
    }));
    this.mist.frustumCulled = false;
    scene.add(this.mist);

    /* ---------- decals ---------- */
    this.maxDecals = isMobile ? 200 : 460;
    const blob = makeBloodBlobTexture();
    blob.anisotropy = 8;
    this.decalMat = new THREE.MeshBasicMaterial({
      map: blob, transparent: true, depthWrite: false, opacity: 0.92,
      polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3
    });
    this.decals = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), this.decalMat, this.maxDecals);
    this.decals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.decals.frustumCulled = false;
    this.decals.renderOrder = 2;
    this.decalHead = 0;
    this.pools = new Map();
    const hide = new THREE.Matrix4().makeTranslation(0, -100, 0);
    for (let i = 0; i < this.maxDecals; i++) {
      this.decals.setMatrixAt(i, hide);
      this.decals.setColorAt(i, new THREE.Color(0x8a0306));
    }
    this.decals.instanceColor.needsUpdate = true;
    scene.add(this.decals);

    /* ---------- meat chunks ---------- */
    this.maxChunks = isMobile ? 50 : 90;
    this.chunks = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.085, 0),
      new THREE.MeshStandardMaterial({ color: 0x6a0205, roughness: 0.8, flatShading: true }),
      this.maxChunks
    );
    this.chunks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.chunks.frustumCulled = false;
    this.chunks.castShadow = false;
    this.chunkData = [];
    this.chunkHead = 0;
    for (let i = 0; i < this.maxChunks; i++) {
      this.chunks.setMatrixAt(i, hide);
      this.chunkData.push({ active: false, pos: new THREE.Vector3(0, -100, 0), vel: new THREE.Vector3(), rot: new THREE.Euler(), ang: new THREE.Vector3(), life: 0 });
    }
    scene.add(this.chunks);

    /* ---------- blood fountains ---------- */
    this.fountains = [];
  }

  spawnBlood(pos, dir, count = 18, power = 1) {
    const n = this.isMobile ? Math.ceil(count * 0.6) : count;
    for (let k = 0; k < n; k++) {
      const i = this.dropHead;
      this.dropHead = (this.dropHead + 1) % this.maxDrops;
      const i3 = i * 3;
      this.dropPos[i3] = pos.x + rand(-0.12, 0.12);
      this.dropPos[i3 + 1] = pos.y + rand(-0.12, 0.12);
      this.dropPos[i3 + 2] = pos.z + rand(-0.12, 0.12);
      const sp = rand(1.2, 4.4) * power;
      const dx = dir ? dir.x : rand(-1, 1);
      const dy = dir ? dir.y : rand(0, 1);
      const dz = dir ? dir.z : rand(-1, 1);
      this.dropVel[i3] = dx * sp + rand(-1.7, 1.7);
      this.dropVel[i3 + 1] = Math.abs(dy) * sp * 0.6 + rand(0.6, 3.6) * power;
      this.dropVel[i3 + 2] = dz * sp + rand(-1.7, 1.7);
      const dark = rand(0.25, 0.85);
      this.dropCol[i3] = 0.2 + dark * 0.3;
      this.dropCol[i3 + 1] = 0.002 + dark * 0.014;
      this.dropCol[i3 + 2] = 0.004 + dark * 0.02;
      this.dropLife[i] = rand(0.45, 1.15) * power;
      this.dropMax[i] = this.dropLife[i];
      this.dropSize[i] = rand(0.5, 1.4);
    }
    this.dropGeo.attributes.position.needsUpdate = true;
    this.dropGeo.attributes.color.needsUpdate = true;

    // little mist puff
    for (let k = 0; k < Math.ceil(n / 6); k++) {
      const i = this.mistHead;
      this.mistHead = (this.mistHead + 1) % this.maxMist;
      const i3 = i * 3;
      this.mistPos[i3] = pos.x + rand(-0.2, 0.2);
      this.mistPos[i3 + 1] = pos.y + rand(-0.1, 0.3);
      this.mistPos[i3 + 2] = pos.z + rand(-0.2, 0.2);
      this.mistVel[i3] = rand(-0.7, 0.7);
      this.mistVel[i3 + 1] = rand(0.2, 1.1);
      this.mistVel[i3 + 2] = rand(-0.7, 0.7);
      this.mistLife[i] = rand(0.5, 1.1);
    }
    this.mistGeo.attributes.position.needsUpdate = true;
  }

  spawnPool(pos, size = 1.2, color = 0x7a0205) {
    const i = this.decalHead;
    this.decalHead = (this.decalHead + 1) % this.maxDecals;
    const existing = this.pools.get(i);
    if (existing) this.pools.delete(i);
    this.pools.set(i, {
      i,
      x: pos.x + rand(-0.15, 0.15),
      z: pos.z + rand(-0.15, 0.15),
      cur: size * 0.35,
      target: size * rand(0.85, 1.35),
      rot: rand(0, Math.PI * 2),
      color: new THREE.Color(color).offsetHSL(0, 0, rand(-0.03, 0.03)),
      low: true
    });
    const m = this.decals;
    _e.set(-Math.PI / 2, 0, rand(0, Math.PI * 2));
    _q.setFromEuler(_e);
    _p.set(pos.x, 0.018 + rand(0, 0.002), pos.z);
    _s.set(size * 0.4, size * 0.4, 1);
    _m.compose(_p, _q, _s);
    m.setMatrixAt(i, _m);
    m.setColorAt(i, this.pools.get(i).color);
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }

  spawnDecal(pos, size = 0.5) {
    const i = this.decalHead;
    this.decalHead = (this.decalHead + 1) % this.maxDecals;
    const m = this.decals;
    _e.set(-Math.PI / 2, 0, rand(0, Math.PI * 2));
    _q.setFromEuler(_e);
    _p.set(pos.x, 0.017 + rand(0, 0.003), pos.z);
    _s.set(size, size * rand(0.7, 1.2), 1);
    _m.compose(_p, _q, _s);
    m.setMatrixAt(i, _m);
    m.setColorAt(i, new THREE.Color(0x8a0306).offsetHSL(0, 0, rand(-0.04, 0.02)));
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }

  spawnChunks(pos, dir, count = 5, power = 1) {
    for (let k = 0; k < count; k++) {
      const i = this.chunkHead;
      this.chunkHead = (this.chunkHead + 1) % this.maxChunks;
      const c = this.chunkData[i];
      c.active = true;
      c.pos.set(pos.x + rand(-0.1, 0.1), pos.y + rand(-0.1, 0.18), pos.z + rand(-0.1, 0.1));
      c.vel.set(
        (dir?.x ?? 0) * rand(1, 4) * power + rand(-2.8, 2.8),
        rand(1.5, 4.6) * power,
        (dir?.z ?? 0) * rand(1, 4) * power + rand(-2.8, 2.8)
      );
      c.rot.set(rand(0, 6), rand(0, 6), rand(0, 6));
      c.ang.set(rand(-9, 9), rand(-9, 9), rand(-9, 9));
      c.life = rand(5, 11);
      c.scale = rand(0.6, 1.7);
      c.stain = false;
    }
  }

  addFountain(obj, offset, duration = 1.2, power = 1.2, chunks = false) {
    this.fountains.push({ obj, offset: offset.clone(), t: duration, duration, power, chunks, acc: 0 });
  }

  update(dt) {
    this.time += dt;
    const pos = this.dropPos, vel = this.dropVel;

    for (let i = 0; i < this.maxDrops; i++) {
      if (this.dropLife[i] <= 0) continue;
      const i3 = i * 3;
      this.dropLife[i] -= dt;
      vel[i3 + 1] -= 17 * dt;
      pos[i3] += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;
      if (pos[i3 + 1] <= 0.02) {
        pos[i3 + 1] = 0.02;
        if (Math.random() < 0.16) this.spawnDecal({ x: pos[i3], z: pos[i3 + 2] }, rand(0.18, 0.6));
        if (this.dropLife[i] > 0.12) {
          this.dropLife[i] = 0.12;
          vel[i3] *= 0.2; vel[i3 + 1] *= -0.12; vel[i3 + 2] *= 0.2;
        }
      }
      if (this.dropLife[i] <= 0) {
        pos[i3 + 1] = -100;
        this.dropLife[i] = 0;
      }
    }
    this.dropGeo.attributes.position.needsUpdate = true;

    const mp = this.mistPos, mv = this.mistVel;
    for (let i = 0; i < this.maxMist; i++) {
      if (this.mistLife[i] <= 0) continue;
      const i3 = i * 3;
      this.mistLife[i] -= dt;
      mp[i3] += mv[i3] * dt;
      mp[i3 + 1] += mv[i3 + 1] * dt;
      mp[i3 + 2] += mv[i3 + 2] * dt;
      mv[i3] *= 0.97;
      mv[i3 + 1] *= 0.97;
      mv[i3 + 2] *= 0.97;
      if (this.mistLife[i] <= 0) { mp[i3 + 1] = -100; this.mistLife[i] = 0; }
    }
    this.mistGeo.attributes.position.needsUpdate = true;

    // grow fresh pools
    if (this.pools.size) {
      let changed = false;
      for (const pool of this.pools.values()) {
        const next = Math.min(pool.target, pool.cur + dt * pool.target * 1.9);
        if (next !== pool.cur) {
          pool.cur = next;
          _e.set(-Math.PI / 2, 0, pool.rot);
          _q.setFromEuler(_e);
          _p.set(pool.x, 0.018, pool.z);
          _s.set(pool.cur, pool.cur, 1);
          _m.compose(_p, _q, _s);
          this.decals.setMatrixAt(pool.i, _m);
          changed = true;
        }
      }
      if (changed) this.decals.instanceMatrix.needsUpdate = true;
    }

    // meat chunks
    let chunkChanged = false;
    for (let i = 0; i < this.maxChunks; i++) {
      const c = this.chunkData[i];
      if (!c.active) continue;
      c.life -= dt;
      c.vel.y -= 19 * dt;
      c.pos.addScaledVector(c.vel, dt);
      c.rot.x += c.ang.x * dt;
      c.rot.y += c.ang.y * dt;
      c.rot.z += c.ang.z * dt;
      if (c.pos.y < 0.06) {
        c.pos.y = 0.06;
        if (c.vel.y < -2 && Math.random() < 0.5) {
          c.vel.y *= -0.32;
          c.vel.x *= 0.55;
          c.vel.z *= 0.55;
          c.ang.multiplyScalar(0.55);
        } else {
          if (!c.stain) {
            c.stain = true;
            this.spawnDecal({ x: c.pos.x, z: c.pos.z }, rand(0.3, 0.7));
          }
          c.vel.set(0, 0, 0);
          c.ang.set(0, 0, 0);
        }
      }
      if (c.life <= 0) {
        c.active = false;
        _m.makeTranslation(0, -100, 0);
      } else {
        _q.setFromEuler(c.rot);
        _s.setScalar(c.scale * Math.min(1, c.life));
        _m.compose(c.pos, _q, _s);
      }
      this.chunks.setMatrixAt(i, _m);
      chunkChanged = true;
    }
    if (chunkChanged) this.chunks.instanceMatrix.needsUpdate = true;

    // blood fountains
    for (let i = this.fountains.length - 1; i >= 0; i--) {
      const f = this.fountains[i];
      f.t -= dt;
      f.acc += dt;
      const rate = 0.03;
      while (f.acc > rate) {
        f.acc -= rate;
        if (f.obj && f.obj.parent) {
          _off.copy(f.offset);
          f.obj.localToWorld(_off);
        } else {
          _off.copy(f.offset);
        }
        this.spawnBlood(_off, { x: rand(-0.4, 0.4), y: 1, z: rand(-0.4, 0.4) }, 2, f.power);
        if (f.chunks && Math.random() < 0.12) this.spawnChunks(_off, { x: 0, z: 0 }, 1, f.power * 0.8);
      }
      if (f.t <= 0) this.fountains.splice(i, 1);
    }
  }

  clear() {
    const hide = new THREE.Matrix4().makeTranslation(0, -100, 0);
    this.dropLife.fill(0);
    for (let i = 0; i < this.maxDrops; i++) this.dropPos[i * 3 + 1] = -100;
    this.dropGeo.attributes.position.needsUpdate = true;
    this.mistLife.fill(0);
    for (let i = 0; i < this.maxMist; i++) this.mistPos[i * 3 + 1] = -100;
    this.mistGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < this.maxDecals; i++) {
      this.decals.setMatrixAt(i, hide);
      this.decals.setColorAt(i, new THREE.Color(0x8a0306));
    }
    this.decals.instanceMatrix.needsUpdate = true;
    if (this.decals.instanceColor) this.decals.instanceColor.needsUpdate = true;
    this.pools.clear();
    for (let i = 0; i < this.maxChunks; i++) {
      this.chunkData[i].active = false;
      this.chunks.setMatrixAt(i, hide);
    }
    this.chunks.instanceMatrix.needsUpdate = true;
    this.fountains.length = 0;
    this.dropHead = 0;
    this.decalHead = 0;
    this.chunkHead = 0;
  }
}
