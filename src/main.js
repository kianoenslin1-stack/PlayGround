import * as THREE from '../vendor/three.module.js';
import { createArena } from './arena.js';
import { makeFighter, animateFighter, setHurtFlash } from './character.js';
import { Gore } from './gore.js';
import { AudioEngine } from './audio.js';
import { clamp, lerp, damp, rand, randInt, pick } from './utils.js';

/* ============================================================
   DOM
   ============================================================ */
const $ = (id) => document.getElementById(id);
const canvas = $('game');
const ui = {
  hud: $('hud'),
  healthFill: $('health-fill'),
  healthGhost: $('health-ghost'),
  healthNum: $('health-num'),
  dashWrap: $('dash-wrap'),
  dashFill: $('dash-fill'),
  waveLabel: $('wave-label'),
  enemyLabel: $('enemy-label'),
  kills: $('kills'),
  score: $('score'),
  comboStat: $('combo-stat'),
  combo: $('combo'),
  crosshair: $('crosshair'),
  announce: $('announce'),
  popups: $('popups'),
  bloodOverlay: $('blood-overlay'),
  damageFlash: $('damage-flash'),
  lowhp: $('lowhp'),
  bossBar: $('boss-bar'),
  bossFill: $('boss-fill'),
  weaponName: $('weapon-name'),
  weaponSub: $('weapon-sub'),
  weaponIcon: $('weapon-icon'),
  menu: $('menu'),
  pause: $('pause'),
  death: $('death'),
  dKills: $('d-kills'),
  dWave: $('d-wave'),
  dScore: $('d-score'),
  deathLine: $('death-line'),
  touchControls: $('touch-controls'),
  joystick: $('joystick'),
  stick: $('stick'),
  attackBtn: $('attack-btn'),
  dashBtn: $('dash-btn'),
  pauseBtn: $('pause-btn'),
  hint: $('hint')
};

/* ============================================================
   ENVIRONMENT / RENDERER
   ============================================================ */
const isMobile = window.matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints > 0 && innerWidth < 900);
const isTouch = isMobile;
if (isTouch) document.body.classList.add('touch');

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: !isMobile, powerPreference: 'high-performance', stencil: false
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.08, 200);
const viewerFill = new THREE.PointLight(0xffb69c, 26, 18, 2);
scene.add(viewerFill);

const arena = createArena(scene, renderer, isMobile);
const gore = new Gore(scene, isMobile);
const audio = new AudioEngine();

const markerGeo = new THREE.RingGeometry(0.46, 0.6, 26);
const markerMat = new THREE.MeshBasicMaterial({
  color: 0xc1121f, transparent: true, opacity: 0.42, side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending, depthWrite: false
});
const bossMarkerMat = new THREE.MeshBasicMaterial({
  color: 0xe0a23a, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending, depthWrite: false
});

/* ============================================================
   STATE
   ============================================================ */
const state = {
  mode: 'menu',
  weapon: 'sword',
  wave: 0,
  kills: 0,
  score: 0,
  combo: 1,
  comboT: 0,
  waveActive: false,
  waveClearT: 0,
  time: 0,
  menuT: 0,
  slowT: 0,
  timeScale: 1,
  hitStop: 0,
  shake: 0,
  blood: 0,
  flash: 0,
  aimCheckT: 0,
  announceTimer: 0,
  deathTimer: 0,
  killsThisWave: 0
};

let enemies = [];
let pendingSpawns = [];
let gibs = [];
let effects = [];
let popups = [];
let player = null;
let menuFighters = [];
let boss = null;

const keys = Object.create(null);
const input = { attack: false, dash: false };
const joy = { active: false, id: null, x: 0, y: 0 };

const V = {
  v1: new THREE.Vector3(), v2: new THREE.Vector3(), v3: new THREE.Vector3(),
  v4: new THREE.Vector3(), v5: new THREE.Vector3(), v6: new THREE.Vector3(),
  v7: new THREE.Vector3(), v8: new THREE.Vector3()
};
const raycaster = new THREE.Raycaster();
raycaster.far = 40;
const CENTER = new THREE.Vector2(0, 0);

const WEAPON_ICONS = {
  sword: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 L57 18 L56 62 L50 70 L44 62 L43 18 Z" fill="currentColor"/><rect x="32" y="64" width="36" height="7" rx="3" fill="currentColor"/><rect x="46" y="70" width="8" height="20" rx="3" fill="currentColor"/><circle cx="50" cy="93" r="5" fill="currentColor"/></svg>`,
  hammer: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M30 14 L70 14 L76 28 L70 42 L30 42 L24 28 Z" fill="currentColor"/><rect x="45" y="40" width="10" height="52" rx="4" fill="currentColor"/><circle cx="50" cy="93" r="5" fill="currentColor"/></svg>`
};

const WEAPON_DATA = {
  sword: {
    name: 'GLADIATOR SWORD',
    sub: 'SEVER · BISECT · DECAPITATE',
    reach: 3.35,
    dur: 0.38,
    cd: 0.44,
    impact: 0.5,
    damage: 44
  },
  hammer: {
    name: 'BUTCHER\'S HAMMER',
    sub: 'CRUSH · CAVE · PULVERIZE',
    reach: 3.1,
    dur: 0.82,
    cd: 0.94,
    impact: 0.6,
    damage: 60
  }
};

/* ============================================================
   CAMERA HELPERS
   ============================================================ */
const camPos = new THREE.Vector3();
const aimDir = new THREE.Vector3();
const camInit = { x: 0, y: 7, z: 17 };

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);

function turnToward(current, target, lambda, dt) {
  let d = target - current;
  d = ((d + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return current + d * (1 - Math.exp(-lambda * dt));
}

/* ============================================================
   PLAYER
   ============================================================ */
function createPlayer() {
  const f = makeFighter({
    weapon: state.weapon,
    skin: 0xb97a55,
    cloth: 0x571219,
    armor: 0x878f96,
    hair: 0x21120d
  });
  scene.add(f.root, f.shadow);
  f.hitMeshes.forEach(m => { m.userData.fighter = f; });
  f.root.position.set(0, 0, 7);
  f.root.rotation.y = 0;

  player = {
    fighter: f,
    pos: f.root.position,
    vel: new THREE.Vector3(),
    yaw: 0,
    pitch: 0.02,
    hp: 100,
    maxHp: 100,
    speed: 0,
    attackCd: 0,
    dashCd: 0,
    dashT: 0,
    dashDir: new THREE.Vector3(),
    invuln: 0,
    dead: false,
    hitDone: true,
    hurtFlash: 0
  };
  audio.setLowHealth(false);
}

function removePlayer() {
  if (!player) return;
  scene.remove(player.fighter.root, player.fighter.shadow);
  player = null;
}

function updatePlayer(dt, realDt) {
  if (!player) return;
  const f = player.fighter;

  /* look with arrow keys as fallback */
  const lookSpeed = 2.3;
  if (keys.ArrowLeft) player.yaw += lookSpeed * dt;
  if (keys.ArrowRight) player.yaw -= lookSpeed * dt;
  if (keys.ArrowUp) player.pitch = clamp(player.pitch + 1.6 * dt, -0.5, 0.55);
  if (keys.ArrowDown) player.pitch = clamp(player.pitch - 1.6 * dt, -0.5, 0.55);

  /* input direction */
  let ix = 0, iz = 0;
  if (keys.KeyW) iz += 1;
  if (keys.KeyS) iz -= 1;
  if (keys.KeyD) ix += 1;
  if (keys.KeyA) ix -= 1;
  if (isTouch) {
    ix += joy.x;
    iz += -joy.y;
  }
  const mag = Math.hypot(ix, iz);
  if (mag > 1) { ix /= mag; iz /= mag; }

  const fwd = V.v1.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
  const right = V.v2.set(Math.cos(player.yaw), 0, -Math.sin(player.yaw));

  const wish = V.v3.set(0, 0, 0).addScaledVector(fwd, iz).addScaledVector(right, ix);
  if (wish.lengthSq() > 0) wish.normalize();

  /* dash */
  if (input.dash && player.dashCd <= 0 && !player.dead) {
    player.dashCd = 1.35;
    player.dashT = 0.17;
    player.invuln = Math.max(player.invuln, 0.3);
    player.dashDir.copy(wish.lengthSq() > 0 ? wish : fwd);
    audio.swing(true);
    const p = player.pos;
    spawnGroundRing(p.x, p.z, 0xd8c39a, 1.2, 2.6, 0.3);
    state.shake = Math.max(state.shake, 0.12);
  }
  input.dash = false;

  player.dashCd = Math.max(0, player.dashCd - dt);
  player.invuln = Math.max(0, player.invuln - dt);

  /* speed */
  const attacking = f.attackT >= 0;
  let targetSpeed = 5.0 * (attacking ? 0.34 : 1);
  if (player.dashT > 0) {
    player.dashT -= dt;
    player.vel.copy(player.dashDir).multiplyScalar(16);
  } else {
    player.vel.x = damp(player.vel.x, wish.x * targetSpeed, 12, dt);
    player.vel.z = damp(player.vel.z, wish.z * targetSpeed, 12, dt);
  }

  player.pos.x += player.vel.x * dt;
  player.pos.z += player.vel.z * dt;

  /* arena bounds */
  const r = Math.hypot(player.pos.x, player.pos.z);
  const maxR = 17.3;
  if (r > maxR) {
    player.pos.x *= maxR / r;
    player.pos.z *= maxR / r;
    player.vel.multiplyScalar(0.4);
  }

  player.speed = Math.hypot(player.vel.x, player.vel.z);
  f.root.rotation.y = player.yaw;
  f.moving = player.dashT > 0 ? 6 : player.speed;

  /* attacks */
  player.attackCd = Math.max(0, player.attackCd - dt);
  if (input.attack && player.attackCd <= 0 && f.attackT < 0 && !player.dead) {
    const data = WEAPON_DATA[state.weapon];
    f.attackT = 0;
    f.attackDur = data.dur;
    f.attackCombo = (f.attackCombo + 1) % 3;
    player.attackCd = data.cd;
    player.hitDone = false;
    player.swingDir = player.yaw;
    player.vel.addScaledVector(fwd, state.weapon === 'hammer' ? 1.1 : 1.9);
    audio.swing(state.weapon === 'hammer');
  }
  input.attack = false;

  /* impact frame */
  if (!player.hitDone && f.attackT >= 0) {
    const data = WEAPON_DATA[state.weapon];
    if (f.attackT >= data.dur * data.impact) {
      player.hitDone = true;
      resolveSwing(state.weapon === 'hammer');
    }
  }

  animateFighter(f, dt, state.time, {});
  if (player.dead) return;

  /* low health */
  audio.setLowHealth(player.hp <= 30 && state.mode === 'playing');
  ui.lowhp.classList.toggle('active', player.hp <= 30 && state.mode === 'playing');

  const hurtPulse = f.flashT;
  if (hurtPulse > 0) f.flashT = hurtPulse;
}

/* ============================================================
   COMBAT — PLAYER ATTACKS
   ============================================================ */
function collectTargets() {
  const arr = [];
  for (const e of enemies) {
    if (e.dead) continue;
    for (const m of e.hitMeshes) {
      const key = m.userData.partKey;
      const part = e.parts[key];
      if (!part || part.detached) continue;
      arr.push(m);
    }
  }
  return arr;
}

function resolveSwing(heavy) {
  if (!player) return;
  const data = WEAPON_DATA[state.weapon];
  const f = player.fighter;
  scene.updateMatrixWorld(true);
  camera.updateMatrixWorld(true);
  camera.getWorldDirection(aimDir);

  const eye = V.v1.set(player.pos.x, 1.4, player.pos.z);
  const fwd = V.v2.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
  const targets = collectTargets();

  raycaster.setFromCamera(CENTER, camera);
  const hits = raycaster.intersectObjects(targets, false);

  let enemy = null, partKey = null, hitPoint = null;

  for (const h of hits) {
    const e = h.object.userData.fighter;
    if (!e || e.dead) continue;
    if (h.point.distanceTo(eye) > data.reach + 0.5) continue;
    const to = V.v3.copy(h.point).sub(eye);
    if (to.dot(fwd) < 0.05) continue;
    enemy = e;
    partKey = h.object.userData.partKey;
    hitPoint = h.point.clone();
    break;
  }

  /* aim assist: find body part closest to the crosshair ray */
  if (!enemy) {
    let bestD = 1.1;
    let bestMesh = null;
    for (const m of targets) {
      const e = m.userData.fighter;
      if (!e || e.dead) continue;
      const wp = m.getWorldPosition(V.v4);
      const planar = Math.hypot(wp.x - player.pos.x, wp.z - player.pos.z);
      if (planar > data.reach + 0.2) continue;
      const toE = V.v5.copy(wp).sub(eye);
      if (toE.dot(fwd) < 0.1) continue;
      const t = V.v6.copy(wp).sub(raycaster.ray.origin).dot(raycaster.ray.direction);
      if (t < 0) continue;
      const closest = V.v7.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, t);
      const d = closest.distanceTo(wp);
      if (d < bestD) { bestD = d; bestMesh = m; }
    }
    if (bestMesh) {
      enemy = bestMesh.userData.fighter;
      partKey = bestMesh.userData.partKey;
      hitPoint = bestMesh.getWorldPosition(new THREE.Vector3());
    }
  }

  /* last resort: closest enemy in front */
  if (!enemy) {
    let bestDot = 0.55, best = null;
    for (const e of enemies) {
      if (e.dead) continue;
      const dx = e.root.position.x - player.pos.x;
      const dz = e.root.position.z - player.pos.z;
      const dist = Math.hypot(dx, dz);
      if (dist > data.reach) continue;
      const dot = (dx * fwd.x + dz * fwd.z) / (dist || 1);
      if (dot > bestDot) { bestDot = dot; best = e; }
    }
    if (best) {
      enemy = best;
      partKey = 'torso';
      hitPoint = best.torso.getWorldPosition(new THREE.Vector3());
    }
  }

  spawnSlashEffect(player.yaw, heavy);

  if (!enemy) {
    if (heavy) {
      const p = V.v8.copy(player.pos).addScaledVector(fwd, 2.2);
      spawnGroundRing(p.x, p.z, 0xb09060, 1.6, 4.2, 0.35);
      gore.spawnChunks(new THREE.Vector3(p.x, 0.1, p.z), { x: 0, y: 1, z: 0 }, 3, 1.2);
      state.shake = Math.max(state.shake, 0.2);
    }
    return;
  }

  playerAttackHit(enemy, partKey, hitPoint, heavy);

  if (heavy) {
    /* shockwave splash */
    const point = hitPoint;
    const splashDamage = 45;
    for (const e of enemies) {
      if (e.dead || e === enemy) continue;
      const d = Math.hypot(e.root.position.x - point.x, e.root.position.z - point.z);
      if (d > 2.5) continue;
      e.hp -= splashDamage;
      setHurtFlash(e, 0.8);
      e.staggerT = Math.max(e.staggerT, 0.5);
      e.attackT = -1;
      gore.spawnBlood(e.torso.getWorldPosition(new THREE.Vector3()), { x: 0, y: 1, z: 0 }, 18, 1.1);
      if (e.hp <= 0) killEnemy(e, 'shockwave');
    }
    spawnGroundRing(point.x, point.z, 0x8e6a3e, 1.2, 5.2, 0.42);
    state.shake = Math.max(state.shake, 0.42);
    audio.crush();
  }
}

function playerAttackHit(e, partKey, point, heavy) {
  const part = e.parts[partKey];
  if (!part || part.detached) return;

  const dir = V.v1.copy(point).sub(camera.position).normalize();
  setHurtFlash(e, 1);
  e.staggerT = Math.max(e.staggerT, heavy ? 0.62 : 0.3);
  e.attackT = -1;
  if (e.ai) e.ai.attackCd = Math.max(e.ai.attackCd, heavy ? 1.1 : 0.6);

  /* knockback */
  const kb = heavy ? 0.55 : 0.18;
  const dx = e.root.position.x - player.pos.x;
  const dz = e.root.position.z - player.pos.z;
  const len = Math.hypot(dx, dz) || 1;
  e.root.position.x += (dx / len) * kb;
  e.root.position.z += (dz / len) * kb;

  state.hitStop = Math.max(state.hitStop, heavy ? 0.085 : 0.045);
  state.shake = Math.max(state.shake, heavy ? 0.46 : 0.18);
  state.blood = Math.min(0.85, state.blood + (heavy ? 0.16 : 0.05));

  gore.spawnBlood(point, dir, heavy ? 52 : 30, heavy ? 1.7 : 1.05);
  gore.spawnChunks(point, dir, heavy ? 10 : 5, heavy ? 1.6 : 1);
  gore.spawnPool(point, heavy ? 0.7 : 0.35);
  audio.hitFlesh(heavy ? 1.5 : 0.9);

  /* blood on the player's weapon */
  const wm = player.fighter.mats.weapon;
  wm.color.lerp(new THREE.Color(0x6d0a0c), 0.35);
  wm.metalness = Math.max(0.2, wm.metalness - 0.1);

  part.hp -= heavy ? 220 : 44;
  e.hp -= heavy ? (partKey === 'head' || partKey === 'torso' ? 160 : 30) : 24;

  addScore(heavy ? 20 : 10);

  if (heavy) {
    if (partKey === 'head') crushHead(e, dir);
    else if (partKey === 'torso') crushTorso(e, dir);
    else if (partKey === 'armL' || partKey === 'armR') crushArm(e, partKey, dir);
    else if (partKey === 'legL' || partKey === 'legR') crushLeg(e, partKey, dir);
  } else {
    if (part.hp <= 0) {
      if (partKey === 'head') decapitate(e, dir);
      else if (partKey === 'torso') bisect(e, dir);
      else if (partKey === 'armL' || partKey === 'armR') severArm(e, partKey, dir);
      else if (partKey === 'legL' || partKey === 'legR') severLeg(e, partKey, dir);
    } else {
      showPopup(pick(['+10', 'HIT', '+10']), point, '');
    }
  }

  if (!e.dead && e.hp <= 0) killEnemy(e, 'wounds');
}

/* ============================================================
   GIB / DISMEMBERMENT
   ============================================================ */
function detachPart(e, key, dir, power = 1) {
  const part = e.parts[key];
  if (!part || part.detached) return null;
  const node = part.node;
  if (!node.parent) return null;

  const world = node.getWorldPosition(new THREE.Vector3());
  scene.attach(node);
  part.detached = true;

  const box = new THREE.Box3().setFromObject(node);
  const floorOff = box.min.y - node.position.y;

  const gib = {
    obj: node,
    vel: new THREE.Vector3(
      dir.x * rand(1.4, 4.2) * power + rand(-1.2, 1.2),
      rand(2.2, 5.2) * power,
      dir.z * rand(1.4, 4.2) * power + rand(-1.2, 1.2)
    ),
    ang: new THREE.Vector3(rand(-11, 11), rand(-11, 11), rand(-11, 11)),
    floorOff,
    life: 26,
    maxLife: 26,
    rest: false,
    bloodT: 0,
    world
  };
  gibs.push(gib);
  return gib;
}

function decapitate(e, dir) {
  if (e.dead) return;
  const gib = detachPart(e, 'head', dir, 1.35);
  const neck = e.torso.getWorldPosition(new THREE.Vector3());
  neck.y += 0.72;
  gore.spawnBlood(neck, dir, 70, 1.8);
  gore.spawnChunks(neck, dir, 9, 1.4);
  if (gib) gib.vel.y += 1.5;
  gore.addFountain(e.torso, new THREE.Vector3(0, 0.72, 0), 2.2, 1.7, true);
  gore.spawnPool(e.root.position, 1.6);
  audio.sever();
  killEnemy(e, 'decapitate', neck);
}

function bisect(e, dir) {
  if (e.dead) return;
  const gib = detachPart(e, 'torso', dir, 1.8);
  if (gib) {
    gib.vel.y += 2.2;
    gib.vel.multiplyScalar(1.2);
  }
  const waist = e.hips.getWorldPosition(new THREE.Vector3());
  waist.y += 0.12;
  gore.spawnBlood(waist, dir, 90, 2.0);
  gore.spawnChunks(waist, dir, 14, 1.8);
  gore.addFountain(e.hips, new THREE.Vector3(0, 0.12, 0), 3.2, 2.0, true);
  gore.spawnPool(e.root.position, 2.2);
  audio.sever();
  audio.crush();
  state.slowT = 0.55;
  state.shake = Math.max(state.shake, 0.55);
  killEnemy(e, 'bisect', waist);
}

function severArm(e, key, dir) {
  if (e.dead) return;
  const gib = detachPart(e, key, dir, 1.1);
  if (!gib) return;
  const shoulder = e.torso.getWorldPosition(new THREE.Vector3());
  const side = key === 'armL' ? -1 : 1;
  shoulder.x += side * 0.3;
  shoulder.y += 0.52;
  gore.spawnBlood(shoulder, dir, 55, 1.5);
  gore.spawnChunks(shoulder, dir, 9, 1.3);
  gore.addFountain(e.torso, new THREE.Vector3(side * 0.34, 0.56, 0), 2.0, 1.4, true);
  audio.sever();
  addScore(70);
  showPopup(key === 'armR' ? 'WEAPON ARM SEVERED +70' : 'ARM SEVERED +70', shoulder, 'gore');
  if (key === 'armR') {
    if (e.ai) e.ai.disarmed = true;
    e.attackT = -1;
  }
}

function severLeg(e, key, dir) {
  if (e.dead) return;
  const gib = detachPart(e, key, dir, 1.0);
  if (!gib) return;
  const hip = e.hips.getWorldPosition(new THREE.Vector3());
  const side = key === 'legL' ? -1 : 1;
  hip.x += side * 0.14;
  gore.spawnBlood(hip, dir, 45, 1.3);
  gore.spawnChunks(hip, dir, 7, 1.2);
  gore.addFountain(e.hips, new THREE.Vector3(side * 0.14, -0.05, 0), 2.2, 1.2, true);
  if (e.ai) {
    e.ai.speed *= 0.42;
    e.ai.bleed = (e.ai.bleed || 0) + 4.5;
  }
  e.staggerT = Math.max(e.staggerT, 1.0);
  e.hp -= 26;
  audio.sever();
  addScore(60);
  showPopup('LEG SEVERED +60', hip, 'gore');
  if (e.hp <= 0) killEnemy(e, 'wounds');
}

function crushHead(e) {
  if (e.dead) return;
  const head = e.head;
  head.scale.set(1.25, 0.22, 1.25);
  head.position.y -= 0.04;
  const p = head.getWorldPosition(new THREE.Vector3());
  gore.spawnBlood(p, { x: 0, y: 1, z: 0 }, 90, 2.1);
  gore.spawnChunks(p, { x: 0, y: 1, z: 0 }, 14, 1.7);
  gore.spawnPool(e.root.position, 1.8);
  audio.crush();
  state.shake = Math.max(state.shake, 0.6);
  killEnemy(e, 'crushhead', p);
}

function crushTorso(e) {
  if (e.dead) return;
  e.torso.scale.set(1.12, 0.3, 1.12);
  e.head.rotation.z = rand(-0.4, 0.4);
  const p = e.torso.getWorldPosition(new THREE.Vector3());
  p.y += 0.25;
  gore.spawnBlood(p, { x: 0, y: 1, z: 0 }, 110, 2.2);
  gore.spawnChunks(p, { x: 0, y: 1, z: 0 }, 18, 1.9);
  gore.addFountain(e.hips, new THREE.Vector3(0, 0.1, 0), 2.5, 1.6, true);
  gore.spawnPool(e.root.position, 2.3);
  audio.crush();
  state.shake = Math.max(state.shake, 0.7);
  state.slowT = 0.4;
  killEnemy(e, 'crushtorso', p);
}

function crushArm(e, key, dir) {
  if (e.dead) return;
  const gib = detachPart(e, key, dir, 1.0);
  const shoulder = e.torso.getWorldPosition(new THREE.Vector3());
  const side = key === 'armL' ? -1 : 1;
  shoulder.x += side * 0.3;
  shoulder.y += 0.52;
  if (gib) {
    gib.obj.scale.y *= 0.4;
    gib.obj.scale.x *= 1.35;
    gib.obj.scale.z *= 1.35;
    gib.rest = false;
  }
  gore.spawnBlood(shoulder, dir, 70, 1.8);
  gore.spawnChunks(shoulder, dir, 12, 1.5);
  gore.addFountain(e.torso, new THREE.Vector3(side * 0.34, 0.56, 0), 2.0, 1.5, true);
  audio.crush();
  addScore(80);
  showPopup('ARM PULVERIZED +80', shoulder, 'gore');
  if (key === 'armR' && e.ai) {
    e.ai.disarmed = true;
    e.attackT = -1;
  }
}

function crushLeg(e, key, dir) {
  if (e.dead) return;
  const gib = detachPart(e, key, dir, 0.9);
  const hip = e.hips.getWorldPosition(new THREE.Vector3());
  const side = key === 'legL' ? -1 : 1;
  hip.x += side * 0.14;
  if (gib) {
    gib.obj.scale.y *= 0.42;
    gib.obj.scale.x *= 1.3;
    gib.obj.scale.z *= 1.3;
  }
  gore.spawnBlood(hip, dir, 50, 1.4);
  gore.spawnChunks(hip, dir, 9, 1.3);
  gore.addFountain(e.hips, new THREE.Vector3(side * 0.14, -0.05, 0), 2.2, 1.3, true);
  if (e.ai) {
    e.ai.speed *= 0.4;
    e.ai.bleed = (e.ai.bleed || 0) + 4;
  }
  e.hp -= 28;
  audio.crush();
  addScore(70);
  showPopup('LEG SHATTERED +70', hip, 'gore');
  if (e.hp <= 0) killEnemy(e, 'wounds');
}

function killEnemy(e, cause, at) {
  if (e.dead) return;
  e.dead = true;
  e.deathT = 0;
  e.hp = 0;
  e.attackT = -1;
  if (e.ai) e.ai.attackCd = 99;
  if (e.marker) e.marker.visible = false;

  state.kills++;
  state.combo = Math.min(9, state.combo + 1);
  state.comboT = 4.2;

  let base = 100;
  let label = 'KILLED';
  let cls = 'gore';
  if (cause === 'decapitate') { base = 220; label = 'DECAPITATED'; }
  else if (cause === 'bisect') { base = 320; label = 'BISECTED'; }
  else if (cause === 'crushhead') { base = 280; label = 'HEAD CRUSHED'; }
  else if (cause === 'crushtorso') { base = 240; label = 'CHEST CAVED IN'; }
  else if (cause === 'wounds') { base = 120; label = 'BLED OUT'; }
  else if (cause === 'shockwave') { base = 90; label = 'SHOCKWAVE KILL'; }

  const gained = addScore(base);
  const pos = at ? at.clone() : e.root.position.clone().setY(1.7);
  pos.y = Math.max(1.1, pos.y);
  showPopup(label, pos, cls + ' big');
  showPopup('+' + gained, pos.clone().add(new THREE.Vector3(0, -0.35, 0)), 'gold');

  gore.spawnPool({ x: e.root.position.x, z: e.root.position.z }, e.isBrute ? 2.6 : 1.5);
  gore.spawnBlood(pos, { x: 0, y: 1, z: 0 }, e.isBrute ? 45 : 28, 1.3);
  audio.scream(e.isBrute ? 0.62 : rand(0.9, 1.35));
  audio.cheer(e.isBrute ? 1.2 : 0.65);
  arena.cheer(e.isBrute ? 1.4 : 0.8);
  state.blood = Math.min(0.85, state.blood + 0.06);
  state.shake = Math.max(state.shake, 0.15);

  if (e.isBoss) {
    boss = null;
    ui.bossBar.classList.add('hidden');
    announce('CHAMPION SLAIN', 'THE PIT HAS A NEW FAVOURITE', 2400);
    state.slowT = 0.9;
    state.score += 500;
    audio.cheer(2);
    arena.cheer(2.4);
  }
}

/* ============================================================
   ENEMY AI
   ============================================================ */
function spawnEnemy(spec = {}) {
  const isBoss = !!spec.boss;
  const brute = isBoss || !!spec.brute;
  const weapon = brute ? 'hammer' : pick(['sword', 'axe', 'club', 'sword']);
  const skins = [0xc98f6b, 0xa87050, 0x8a5a3f, 0xd7a47c, 0x6b4634, 0xbb8060, 0x946147];
  const cloths = [0x3d231d, 0x2b1f2a, 0x4a2a1a, 0x243038, 0x3a2d1f, 0x5a2420, 0x2d3830];

  const f = makeFighter({
    weapon,
    skin: pick(skins),
    cloth: pick(cloths),
    armor: brute ? 0x5a4c40 : pick([0x6a655c, 0x7b7468, 0x55504a, 0x8a7f6d]),
    hair: pick([0x18100c, 0x2e1a0f, 0x0f0c0a]),
    scale: isBoss ? 1.45 : brute ? 1.28 : rand(0.94, 1.04),
    brute
  });

  f.hitMeshes.forEach(m => { m.userData.fighter = f; });

  /* crimson sash marks the enemy team */
  const sash = new THREE.Mesh(
    new THREE.BoxGeometry(0.58, 0.12, 0.36),
    new THREE.MeshStandardMaterial({
      color: isBoss ? 0xb98a33 : 0x8f0e18,
      emissive: isBoss ? 0x3a2405 : 0x2a0103,
      roughness: 0.85, flatShading: true
    })
  );
  sash.position.y = 0.45;
  sash.userData.partKey = 'torso';
  f.torso.add(sash);
  f.hitMeshes.push(sash);

  /* battlefield marker ring */
  f.marker = new THREE.Mesh(markerGeo, isBoss ? bossMarkerMat : markerMat);
  f.marker.rotation.x = -Math.PI / 2;
  f.marker.renderOrder = 2;

  /* spawn position */
  let x = 0, z = 0;
  for (let tries = 0; tries < 20; tries++) {
    const a = Math.random() * Math.PI * 2;
    const rr = rand(10.2, 13.8);
    x = Math.sin(a) * rr;
    z = Math.cos(a) * rr;
    if (Math.hypot(x - player.pos.x, z - player.pos.z) > 6.5) break;
  }
  f.root.position.set(x, 0, z);
  f.root.rotation.y = Math.atan2(-(player.pos.x - x), -(player.pos.z - z));

  const waveScale = 1 + Math.max(0, state.wave - 1) * 0.055;
  for (const k of Object.keys(f.parts)) {
    const p = f.parts[k];
    p.hp *= waveScale * (isBoss ? 1.55 : 1);
    p.maxHp *= waveScale * (isBoss ? 1.55 : 1);
  }
  f.hp = (brute ? 240 : 100) * waveScale * (isBoss ? 1.7 : 1);
  f.maxHp = f.hp;
  f.isBoss = isBoss;
  f.deadTime = 0;

  f.ai = {
    speed: (brute ? 2.5 : rand(2.95, 3.8)) * (1 + state.wave * 0.025),
    attackCd: rand(0.9, 2.0),
    strafe: pick([-1, 1]) * rand(0.35, 0.9),
    seed: rand(0, 10),
    disarmed: false,
    bleed: 0
  };

  f.mats.weapon.emissive.setRGB(0.18, 0.01, 0.01);

  scene.add(f.root, f.shadow);
  f.shadow.position.set(x, 0.02, z);
  f.marker.position.set(x, 0.035, z);
  scene.add(f.marker);
  enemies.push(f);

  spawnGroundRing(x, z, 0xc1121f, 0.4, 2.4, 0.6);
  if (isBoss) {
    boss = f;
    ui.bossBar.classList.remove('hidden');
    ui.bossFill.style.width = '100%';
    announce('THE BUTCHER', 'CHAMPION OF THE PIT', 2600);
    audio.gong();
    arena.cheer(1.8);
  }
}

function updateEnemies(dt) {
  const pPos = player ? player.pos : new THREE.Vector3();

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.dead) {
      e.deadTime = (e.deadTime || 0) + dt;
      animateFighter(e, dt, state.time, {});
      e.shadow.position.set(e.root.position.x, 0.022, e.root.position.z);
      if (e.marker) e.marker.visible = false;
      if (e.deadTime > 30) {
        scene.remove(e.root, e.shadow);
        if (e.marker) scene.remove(e.marker);
        enemies.splice(i, 1);
      }
      continue;
    }
    if (!e.ai) continue;

    if (e.ai.bleed > 0) {
      e.hp -= e.ai.bleed * dt;
      if (e.hp <= 0) {
        killEnemy(e, 'wounds');
        animateFighter(e, dt, state.time, {});
        continue;
      }
    }

    const dx = pPos.x - e.root.position.x;
    const dz = pPos.z - e.root.position.z;
    const dist = Math.hypot(dx, dz) || 0.001;
    const dirX = dx / dist, dirZ = dz / dist;

    const targetYaw = Math.atan2(-dx, -dz);
    e.root.rotation.y = turnToward(e.root.rotation.y, targetYaw, 7, dt);

    let moving = 0;

    if (e.staggerT > 0) {
      e.staggerT -= dt;
    } else if (e.attackT >= 0) {
      /* locked in attack animation */
    } else if (e.ai.disarmed) {
      /* stumble away, bleeding out */
      if (dist < 3.4) {
        e.root.position.x -= dirX * e.ai.speed * 0.55 * dt;
        e.root.position.z -= dirZ * e.ai.speed * 0.55 * dt;
        moving = e.ai.speed * 0.55;
      }
      e.ai.bleed = Math.max(e.ai.bleed, 2.2);
    } else {
      const want = e.isBoss ? 2.0 : 1.55;
      if (dist > want + 0.2) {
        const sp = e.ai.speed;
        const strafe = Math.sin(state.time * 1.4 + e.ai.seed) * e.ai.strafe;
        const mx = dirX + (-dirZ) * strafe * 0.35;
        const mz = dirZ + (dirX) * strafe * 0.35;
        const ml = Math.hypot(mx, mz) || 1;
        e.root.position.x += (mx / ml) * sp * dt;
        e.root.position.z += (mz / ml) * sp * dt;
        moving = sp;
      } else {
        /* circle the player */
        const strafe = e.ai.strafe;
        e.root.position.x += (-dirZ) * strafe * 0.55 * dt;
        e.root.position.z += (dirX) * strafe * 0.55 * dt;
        moving = Math.abs(strafe) * 0.55;
      }

      /* attack */
      e.ai.attackCd -= dt;
      if (dist < (e.isBoss ? 2.7 : 2.05) && e.ai.attackCd <= 0 && e.attackT < 0) {
        const heavy = e.weaponType === 'hammer' || e.weaponType === 'club';
        e.attackT = 0;
        e.attackDur = heavy ? 0.78 : 0.55;
        e.attackHitDone = false;
        e.ai.attackCd = rand(1.5, 2.6) * (e.isBoss ? 0.8 : 1);
        e.ai.heavy = heavy;
        audio.swing(heavy);
      }
    }

    /* separation */
    for (const o of enemies) {
      if (o === e || o.dead) continue;
      const sx = e.root.position.x - o.root.position.x;
      const sz = e.root.position.z - o.root.position.z;
      const d2 = sx * sx + sz * sz;
      if (d2 < 1.0 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const push = (1.0 - d) * 0.9 * dt;
        e.root.position.x += (sx / d) * push;
        e.root.position.z += (sz / d) * push;
      }
    }

    /* don't stand inside the player */
    {
      const px = e.root.position.x - pPos.x;
      const pz = e.root.position.z - pPos.z;
      const pd = Math.hypot(px, pz) || 0.001;
      const minD = 1.18;
      if (pd < minD) {
        e.root.position.x = pPos.x + (px / pd) * minD;
        e.root.position.z = pPos.z + (pz / pd) * minD;
      }
    }

    /* arena bounds */
    const rr = Math.hypot(e.root.position.x, e.root.position.z);
    if (rr > 17.4) {
      e.root.position.x *= 17.4 / rr;
      e.root.position.z *= 17.4 / rr;
    }

    e.moving = moving;
    if (e.marker) e.marker.position.set(e.root.position.x, 0.035, e.root.position.z);
    animateFighter(e, dt, state.time, {});

    /* telegraph & impact */
    if (e.attackT >= 0) {
      const prog = e.attackT / e.attackDur;
      const em = e.mats.weapon.emissive;
      if (prog < 0.5) em.setRGB(0.25 + prog * 1.4, 0.02, 0.01);
      else em.setRGB(0.06, 0.01, 0.01);

      if (!e.attackHitDone && prog >= 0.52) {
        e.attackHitDone = true;
        if (player && !player.dead) {
          const px = player.pos.x - e.root.position.x;
          const pz = player.pos.z - e.root.position.z;
          const pd = Math.hypot(px, pz);
          const fwdDot = (px * -Math.sin(e.root.rotation.y) + pz * -Math.cos(e.root.rotation.y)) / (pd || 1);
          if (pd < (e.isBoss ? 3.4 : 2.75) && fwdDot > 0.15) {
            const base = e.isBoss ? 20 : e.isBrute ? 16 : 9;
            damagePlayer(base + state.wave * 0.7, e);
            gore.spawnBlood(
              new THREE.Vector3(player.pos.x, 1.2, player.pos.z),
              { x: px / (pd || 1), y: 1, z: pz / (pd || 1) },
              20, 1
            );
          }
        }
      }
    } else if (e.mats.weapon.emissive.r > 0.03) {
      e.mats.weapon.emissive.setRGB(0.04, 0.005, 0.005);
    }
  }
}

/* ============================================================
   PLAYER DAMAGE / DEATH
   ============================================================ */
function damagePlayer(amount, from) {
  if (!player || player.dead || state.mode !== 'playing') return;
  if (player.invuln > 0) return;
  player.hp = Math.max(0, player.hp - amount);
  player.invuln = 0.5;
  state.shake = Math.max(state.shake, 0.5);
  state.flash = 0.85;
  state.blood = Math.min(0.72, state.blood + 0.3);
  state.hitStop = Math.max(state.hitStop, 0.05);
  audio.hurt();
  audio.scream(1.1);
  gore.spawnBlood(new THREE.Vector3(player.pos.x, 1.25, player.pos.z), { x: 0, y: 1, z: 0 }, 18, 1);
  setHurtFlash(player.fighter, 0.7);
  state.shake = Math.max(state.shake, 0.55);

  if (player.hp <= 0) playerDie();
}

function playerDie() {
  if (!player || player.dead) return;
  player.dead = true;
  player.hp = 0;
  player.fighter.dead = true;
  player.fighter.deathT = 0;
  player.fighter.attackT = -1;
  state.mode = 'dying';
  state.slowT = 1.4;
  state.deathTimer = 1.5;
  audio.playerDeath();
  audio.setLowHealth(false);
  audio.cheer(0.5);
  if (document.pointerLockElement) document.exitPointerLock();
  ui.lowhp.classList.remove('active');
  ui.touchControls.classList.add('hidden');
  ui.crosshair.classList.add('hidden');
  gore.spawnPool(player.pos, 2.2);
  gore.spawnBlood(new THREE.Vector3(player.pos.x, 1.3, player.pos.z), { x: 0, y: 1, z: 0 }, 60, 1.6);
}

function showDeathScreen() {
  ui.death.classList.remove('hidden');
  ui.hud.classList.add('hidden');
  ui.dKills.textContent = state.kills;
  ui.dWave.textContent = state.wave;
  ui.dScore.textContent = state.score.toLocaleString();
  const lines = [
    'The crowd got what it paid for.',
    'Another name scratched from the wall.',
    'The sand drinks deep tonight.',
    'They will cheer for whoever kills you next.',
    'You almost gave them a show.'
  ];
  ui.deathLine.textContent = pick(lines);
}

/* ============================================================
   WAVES
   ============================================================ */
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

function beginWave(n) {
  state.wave = n;
  state.waveActive = true;
  state.waveClearT = 0;
  state.killsThisWave = 0;

  const isBossWave = n % 5 === 0;
  const specs = [];
  let grunts = Math.min(8, 1 + Math.ceil(n * 0.9));
  if (isBossWave) grunts = 2 + Math.floor(n / 5);

  for (let i = 0; i < grunts; i++) {
    specs.push({ boss: false, brute: false, delay: 1.15 + i * 0.55 });
  }
  if (n >= 4 && !isBossWave) {
    specs.push({ boss: false, brute: true, delay: 1.15 + grunts * 0.55 + 0.4 });
  }
  if (isBossWave) {
    specs.unshift({ boss: true, brute: true, delay: 1.2 });
  }

  pendingSpawns = specs.map(s => ({ ...s }));

  ui.waveLabel.textContent = 'WAVE ' + (ROMAN[n] || n);
  const sub = isBossWave
    ? 'THE BUTCHER ENTERS THE PIT'
    : `${specs.length} GLADIATOR${specs.length > 1 ? 'S' : ''} ENTER${specs.length > 1 ? '' : 'S'}`;
  announce('WAVE ' + (ROMAN[n] || n), sub, 2200);
  audio.gong();
  arena.cheer(0.8);
}

function updateWaves(dt) {
  if (!state.waveActive) {
    if (state.waveClearT > 0) {
      state.waveClearT -= dt;
      if (state.waveClearT <= 0) beginWave(state.wave + 1);
    }
    return;
  }

  for (let i = pendingSpawns.length - 1; i >= 0; i--) {
    const s = pendingSpawns[i];
    s.delay -= dt;
    if (s.delay <= 0) {
      pendingSpawns.splice(i, 1);
      spawnEnemy(s);
    }
  }

  const alive = enemies.filter(e => !e.dead).length;
  if (pendingSpawns.length === 0 && alive === 0) {
    state.waveActive = false;
    state.waveClearT = 4.2;
    const bonus = addScore(120 * state.wave + 100);
    if (player && !player.dead) {
      player.hp = Math.min(player.maxHp, player.hp + 22);
    }
    announce('WAVE CLEARED', `THE CROWD SALUTES · +${bonus}`, 2600);
    audio.gong();
    audio.cheer(1.4);
    arena.cheer(1.8);
    state.blood = Math.max(0, state.blood - 0.2);
  }
}

/* ============================================================
   GIBS / EFFECTS / POPUPS
   ============================================================ */
function updateGibs(dt) {
  for (let i = gibs.length - 1; i >= 0; i--) {
    const g = gibs[i];
    if (!g.obj || !g.obj.parent) { gibs.splice(i, 1); continue; }
    g.life -= dt;

    if (!g.rest) {
      g.vel.y -= 20 * dt;
      g.obj.position.addScaledVector(g.vel, dt);
      g.obj.rotation.x += g.ang.x * dt;
      g.obj.rotation.y += g.ang.y * dt;
      g.obj.rotation.z += g.ang.z * dt;

      g.bloodT -= dt;
      if (g.bloodT <= 0 && g.vel.lengthSq() > 4) {
        g.bloodT = 0.09;
        gore.spawnBlood(g.obj.position, { x: 0, y: 0.2, z: 0 }, 3, 0.7);
      }

      const bottom = g.obj.position.y + g.floorOff;
      if (bottom < 0.05) {
        g.obj.position.y += 0.05 - bottom;
        if (Math.abs(g.vel.y) > 2.4) {
          g.vel.y *= -0.3;
          g.vel.x *= 0.62;
          g.vel.z *= 0.62;
          g.ang.multiplyScalar(0.5);
          gore.spawnBlood(g.obj.position, { x: 0, y: 1, z: 0 }, 10, 1);
        } else {
          g.vel.set(0, 0, 0);
          g.ang.set(0, 0, 0);
          g.rest = true;
          gore.spawnPool({ x: g.obj.position.x, z: g.obj.position.z }, rand(0.9, 1.9));
        }
      }
    }

    if (g.life <= 0 && g.rest) {
      scene.remove(g.obj);
      gibs.splice(i, 1);
      continue;
    }
    if (g.life < 2.2 && g.rest) {
      const s = Math.max(0.001, g.life / 2.2);
      g.obj.scale.multiplyScalar(0.985);
      if (g.life <= 0.05) { scene.remove(g.obj); gibs.splice(i, 1); }
    }
  }
}

function spawnSlashEffect(yaw, heavy) {
  if (heavy) {
    spawnGroundRing(player.pos.x - Math.sin(yaw) * 2.0, player.pos.z - Math.cos(yaw) * 2.0, 0xffb070, 0.8, 3.6, 0.28);
    return;
  }
  const group = new THREE.Group();
  group.position.set(player.pos.x, 1.35, player.pos.z);
  group.rotation.y = yaw;
  group.rotation.z = 0.16;

  const geo = new THREE.RingGeometry(0.75, 3.25, 28, 1, Math.PI / 2 - 1.05, 2.1);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffd8c4, transparent: true, opacity: 0.42,
    side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  group.add(mesh);
  scene.add(group);
  effects.push({ obj: group, type: 'slash', life: 0.18, maxLife: 0.18, mat });
}

function spawnGroundRing(x, z, color, startScale, endScale, life) {
  const geo = new THREE.RingGeometry(0.8, 1.0, 40);
  const mat = new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.05, z);
  mesh.scale.setScalar(startScale);
  scene.add(mesh);
  effects.push({ obj: mesh, type: 'ring', life, maxLife: life, mat, startScale, endScale });
}

function updateEffects(dt) {
  for (let i = effects.length - 1; i >= 0; i--) {
    const fx = effects[i];
    fx.life -= dt;
    const p = clamp(fx.life / fx.maxLife, 0, 1);
    if (fx.type === 'slash') {
      fx.mat.opacity = p * 0.5;
      fx.obj.scale.setScalar(1 + (1 - p) * 0.35);
      fx.obj.rotation.y += dt * 2.4;
    } else {
      fx.mat.opacity = p * 0.5;
      const s = lerp(fx.startScale, fx.endScale, 1 - p);
      fx.obj.scale.setScalar(s);
    }
    if (fx.life <= 0) {
      scene.remove(fx.obj);
      fx.mat.dispose();
      if (fx.obj.children.length) fx.obj.children.forEach(c => c.geometry && c.geometry.dispose());
      else fx.obj.geometry.dispose();
      effects.splice(i, 1);
    }
  }
}

const POPUP_LIFE = 1.15;

function showPopup(text, worldPos, cls = '') {
  const el = document.createElement('div');
  el.className = 'popup ' + cls;
  el.textContent = text;
  el.style.left = '0px';
  el.style.top = '0px';
  ui.popups.appendChild(el);
  popups.push({ el, pos: worldPos.clone(), life: POPUP_LIFE, rise: 0 });
  if (popups.length > 26) {
    const old = popups.shift();
    old.el.remove();
  }
}

function updatePopups(realDt) {
  if (!popups.length) return;
  const w = window.innerWidth, h = window.innerHeight;
  for (let i = popups.length - 1; i >= 0; i--) {
    const p = popups[i];
    p.life -= realDt;
    p.rise += realDt * 38;
    if (p.life <= 0) { p.el.remove(); popups.splice(i, 1); continue; }
    const v = V.v1.copy(p.pos).project(camera);
    if (v.z > 1) { p.el.style.opacity = '0'; continue; }
    const x = (v.x * 0.5 + 0.5) * w;
    const y = (-v.y * 0.5 + 0.5) * h - p.rise;
    p.el.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px)`;
    p.el.style.opacity = String(Math.min(1, p.life / 0.4));
  }
}

/* ============================================================
   SCORING / HUD / ANNOUNCE
   ============================================================ */
function initBloodSplatter() {
  const W = 1024, H = 768;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const clusters = [
    [100, 120, 210], [930, 660, 250], [790, 70, 150],
    [210, 700, 190], [1010, 320, 130], [620, 740, 130]
  ];
  for (const [cx, cy, spread] of clusters) {
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.pow(Math.random(), 1.7) * spread;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d * 0.8;
      const r = rand(2, 16) + Math.max(0, 1 - d / spread) * rand(8, 34);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const alpha = rand(0.18, 0.6);
      g.addColorStop(0, `rgba(${randInt(85, 135)},0,${randInt(2, 9)},${alpha})`);
      g.addColorStop(0.7, `rgba(60,0,3,${alpha * 0.55})`);
      g.addColorStop(1, 'rgba(40,0,2,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * rand(0.55, 1.15), rand(0, 3), 0, 7);
      ctx.fill();

      if (Math.random() < 0.22) {
        const len = rand(10, 60), ang = rand(-0.6, 0.6) + Math.PI / 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.fillStyle = `rgba(${randInt(80, 120)},0,4,${rand(0.2, 0.55)})`;
        ctx.beginPath();
        ctx.ellipse(0, len * 0.4, rand(2, 6), len, 0, 0, 7);
        ctx.fill();
        ctx.restore();
      }
    }
    // droplets flung further out
    for (let i = 0; i < 45; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = rand(spread * 0.7, spread * 1.35);
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d * 0.75;
      ctx.fillStyle = `rgba(${randInt(90, 140)},0,${randInt(2, 8)},${rand(0.15, 0.5)})`;
      ctx.beginPath();
      ctx.ellipse(x, y, rand(1.5, 5), rand(2, 9), Math.random() * 3, 0, 7);
      ctx.fill();
    }
  }
  ui.bloodOverlay.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
}

function addScore(base) {
  const gained = Math.round(base * state.combo);
  state.score += gained;
  return gained;
}

function announce(big, small = '', ms = 2200) {
  ui.announce.innerHTML = `<div class="big">${big}</div>${small ? `<div class="small">${small}</div>` : ''}<span class="bloodline"></span>`;
  ui.announce.classList.remove('show');
  void ui.announce.offsetWidth;
  ui.announce.classList.add('show');
  clearTimeout(state.announceTimer);
  state.announceTimer = setTimeout(() => ui.announce.classList.remove('show'), ms);
}

function updateHUD() {
  if (!player) return;
  const hp = Math.max(0, player.hp);
  const pct = (hp / player.maxHp) * 100;
  ui.healthFill.style.width = pct + '%';
  ui.healthGhost.style.width = pct + '%';
  ui.healthNum.textContent = Math.ceil(hp);
  ui.healthFill.style.filter = hp <= 30 ? 'saturate(1.5) brightness(1.15)' : '';

  const dashPct = 100 - (player.dashCd / 1.35) * 100;
  ui.dashFill.style.width = clamp(dashPct, 0, 100) + '%';
  ui.dashWrap.classList.toggle('cooling', player.dashCd > 0.02);

  ui.kills.textContent = state.kills;
  ui.score.textContent = state.score.toLocaleString();
  if (state.combo > 1 && state.comboT > 0) {
    ui.comboStat.classList.remove('hidden');
    ui.combo.textContent = 'x' + state.combo;
  } else {
    ui.comboStat.classList.add('hidden');
  }

  const alive = enemies.filter(e => !e.dead).length + pendingSpawns.length;
  ui.enemyLabel.textContent = alive > 0 ? `${alive} GLADIATOR${alive > 1 ? 'S' : ''} REMAIN` : 'THE SAND IS QUIET';

  if (boss && !boss.dead) {
    ui.bossBar.classList.remove('hidden');
    ui.bossFill.style.width = clamp((boss.hp / boss.maxHp) * 100, 0, 100) + '%';
  } else if (ui.bossBar && !ui.bossBar.classList.contains('hidden')) {
    ui.bossBar.classList.add('hidden');
  }

  ui.weaponName.textContent = WEAPON_DATA[state.weapon].name;
  ui.weaponSub.textContent = WEAPON_DATA[state.weapon].sub;

  ui.bloodOverlay.style.opacity = state.blood.toFixed(3);
  ui.damageFlash.style.opacity = state.flash.toFixed(3);
}

function updateAimHint(dt) {
  state.aimCheckT -= dt;
  if (state.aimCheckT > 0) return;
  state.aimCheckT = 0.09;
  if (!player || player.dead || state.mode !== 'playing') return;
  camera.updateMatrixWorld(true);
  raycaster.setFromCamera(CENTER, camera);
  const targets = collectTargets();
  const hits = raycaster.intersectObjects(targets, false);
  let hot = false;
  const data = WEAPON_DATA[state.weapon];
  for (const h of hits) {
    const e = h.object.userData.fighter;
    if (!e || e.dead) continue;
    if (h.point.distanceTo(V.v1.set(player.pos.x, 1.4, player.pos.z)) <= data.reach + 0.5) { hot = true; break; }
  }
  if (!hot) {
    for (const e of enemies) {
      if (e.dead) continue;
      const d = Math.hypot(e.root.position.x - player.pos.x, e.root.position.z - player.pos.z);
      if (d < data.reach + 0.3) {
        const fwd = V.v2.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
        const dot = ((e.root.position.x - player.pos.x) * fwd.x + (e.root.position.z - player.pos.z) * fwd.z) / (d || 1);
        if (dot > 0.6) { hot = true; break; }
      }
    }
  }
  ui.crosshair.classList.toggle('hot', hot);
}

/* ============================================================
   INPUT
   ============================================================ */
function requestLock() {
  if (isTouch) return;
  try {
    const p = canvas.requestPointerLock();
    if (p && p.catch) p.catch(() => {});
  } catch (e) { /* ignore */ }
}

window.addEventListener('keydown', (e) => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  keys[e.code] = true;

  if (e.code === 'Space') input.attack = true;
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') input.dash = true;
  if (e.code === 'KeyM') audio.setMuted(!audio.muted);
  if (e.code === 'KeyP') togglePause();
  if (e.code === 'Escape') {
    if (state.mode === 'playing') togglePause();
    else if (state.mode === 'paused') togglePause();
  }
  if (e.code === 'KeyR' && state.mode === 'dead') startGame(state.weapon);
});

window.addEventListener('keyup', (e) => { keys[e.code] = false; });

window.addEventListener('blur', () => {
  for (const k of Object.keys(keys)) keys[k] = false;
});

window.addEventListener('mousemove', (e) => {
  if (isTouch || state.mode !== 'playing' || !player) return;
  if (document.pointerLockElement === canvas) {
    player.yaw -= e.movementX * 0.0023;
    player.pitch = clamp(player.pitch - e.movementY * 0.0021, -0.5, 0.55);
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (state.mode !== 'playing' || isTouch) return;
  if (document.pointerLockElement !== canvas) {
    requestLock();
    return;
  }
  if (e.button === 0) input.attack = true;
});
window.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('pointerlockchange', () => {
  /* no auto-pause: the player can press Esc / P */
});

/* --- touch --- */
let lookId = null, lookX = 0, lookY = 0, lookMoved = 0, lookStart = 0;

if (isTouch) {
  ui.joystick.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    joy.active = true;
    joy.id = e.pointerId;
    joy.x = 0; joy.y = 0;
    try { ui.joystick.setPointerCapture(e.pointerId); } catch (err) {}
    updateJoy(e);
  });
  ui.joystick.addEventListener('pointermove', (e) => {
    if (!joy.active || e.pointerId !== joy.id) return;
    e.preventDefault();
    updateJoy(e);
  });
  const joyEnd = (e) => {
    if (e.pointerId !== joy.id) return;
    joy.active = false; joy.id = null; joy.x = 0; joy.y = 0;
    ui.stick.style.transform = 'translate(0px, 0px)';
  };
  ui.joystick.addEventListener('pointerup', joyEnd);
  ui.joystick.addEventListener('pointercancel', joyEnd);

  function updateJoy(e) {
    const r = ui.joystick.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const max = r.width * 0.34;
    const len = Math.hypot(dx, dy);
    if (len > max) { dx = (dx / len) * max; dy = (dy / len) * max; }
    ui.stick.style.transform = `translate(${dx}px, ${dy}px)`;
    joy.x = dx / max;
    joy.y = dy / max;
  }

  ui.attackBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    input.attack = true;
  });
  ui.dashBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    input.dash = true;
  });

  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' || state.mode !== 'playing') return;
    if (lookId !== null) return;
    lookId = e.pointerId;
    lookX = e.clientX; lookY = e.clientY;
    lookMoved = 0;
    lookStart = performance.now();
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerId !== lookId || !player) return;
    const dx = e.clientX - lookX;
    const dy = e.clientY - lookY;
    lookX = e.clientX; lookY = e.clientY;
    lookMoved += Math.abs(dx) + Math.abs(dy);
    player.yaw -= dx * 0.006;
    player.pitch = clamp(player.pitch - dy * 0.0045, -0.5, 0.55);
  });
  const lookEnd = (e) => {
    if (e.pointerId !== lookId) return;
    if (lookMoved < 10 && performance.now() - lookStart < 280) {
      input.attack = true;
    }
    lookId = null;
  };
  canvas.addEventListener('pointerup', lookEnd);
  canvas.addEventListener('pointercancel', () => { lookId = null; });
}

/* ============================================================
   MENU / FLOW
   ============================================================ */
document.querySelectorAll('.weapon-card').forEach(card => {
  card.addEventListener('click', () => {
    state.weapon = card.dataset.weapon;
    ui.weaponIcon.innerHTML = WEAPON_ICONS[state.weapon];
    document.querySelectorAll('.weapon-card').forEach(c => c.classList.toggle('selected', c === card));
  });
});

$('enter-btn').addEventListener('click', () => startGame(state.weapon));
$('retry-btn').addEventListener('click', () => startGame(state.weapon));
$('menu-btn').addEventListener('click', () => toMenu());
$('resume-btn').addEventListener('click', () => togglePause());
$('quit-btn').addEventListener('click', () => toMenu());
ui.pauseBtn.addEventListener('click', () => {
  if (state.mode === 'playing') togglePause();
});

function startGame(weapon) {
  audio.init();
  state.weapon = weapon;
  state.mode = 'playing';
  state.wave = 0;
  state.kills = 0;
  state.score = 0;
  state.combo = 1;
  state.comboT = 0;
  state.slowT = 0;
  state.timeScale = 1;
  state.hitStop = 0;
  state.shake = 0;
  state.blood = 0;
  state.flash = 0;
  state.waveActive = false;
  state.waveClearT = 0;
  state.deathTimer = 0;
  state.time = 0;

  clearCombat();
  clearMenuFighters();
  gore.clear();

  createPlayer();
  enemies = [];
  pendingSpawns = [];
  boss = null;
  ui.weaponIcon.innerHTML = WEAPON_ICONS[state.weapon];
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

  ui.menu.classList.add('hidden');
  ui.pause.classList.add('hidden');
  ui.death.classList.add('hidden');
  ui.hud.classList.remove('hidden');
  ui.crosshair.classList.remove('hidden');
  ui.bossBar.classList.add('hidden');
  ui.touchControls.classList.toggle('hidden', !isTouch);
  ui.healthFill.style.width = '100%';
  ui.healthGhost.style.width = '100%';
  ui.comboStat.classList.add('hidden');
  ui.announce.classList.remove('show');

  document.body.classList.toggle('playing', true);

  if (!isTouch) requestLock();
  setTimeout(() => {
    if (state.mode === 'playing') beginWave(1);
  }, 900);
  audio.gong();
  audio.cheer(0.7);
}

function toMenu() {
  state.mode = 'menu';
  state.waveActive = false;
  clearCombat();
  removePlayer();
  gore.clear();
  ui.hud.classList.add('hidden');
  ui.pause.classList.add('hidden');
  ui.death.classList.add('hidden');
  ui.menu.classList.remove('hidden');
  ui.touchControls.classList.add('hidden');
  ui.crosshair.classList.remove('hidden');
  ui.bossBar.classList.add('hidden');
  ui.lowhp.classList.remove('active');
  ui.bloodOverlay.style.opacity = '0';
  ui.damageFlash.style.opacity = '0';
  if (document.pointerLockElement) document.exitPointerLock();
  audio.setLowHealth(false);
  clearPopups();
  setupMenuFighters();
}

function togglePause() {
  if (state.mode === 'playing') {
    state.mode = 'paused';
    ui.pause.classList.remove('hidden');
    ui.touchControls.classList.add('hidden');
    if (document.pointerLockElement) document.exitPointerLock();
  } else if (state.mode === 'paused') {
    state.mode = 'playing';
    ui.pause.classList.add('hidden');
    ui.touchControls.classList.toggle('hidden', !isTouch);
    if (!isTouch) requestLock();
  }
}

function clearCombat() {
  for (const e of enemies) {
    scene.remove(e.root, e.shadow);
    if (e.marker) scene.remove(e.marker);
  }
  enemies = [];
  pendingSpawns = [];
  boss = null;
  for (const g of gibs) {
    if (g.obj && g.obj.parent) g.obj.parent.remove(g.obj);
  }
  gibs = [];
  for (const fx of effects) {
    scene.remove(fx.obj);
    if (fx.mat) fx.mat.dispose();
  }
  effects = [];
  clearPopups();
}

function clearPopups() {
  for (const p of popups) p.el.remove();
  popups = [];
}

function setupMenuFighters() {
  clearMenuFighters();
  const configs = [
    { pos: [2.4, 0, 0.2], rot: -0.6, weapon: 'hammer', scale: 1.28, brute: true, cloth: 0x40201a, armor: 0x57493d },
    { pos: [-2.2, 0, 1.4], rot: 2.2, weapon: 'sword', scale: 1, cloth: 0x2a2430, armor: 0x6c655a },
    { pos: [-1.1, 0, -2.6], rot: 2.8, weapon: 'axe', scale: 0.97, cloth: 0x3a2a1c, armor: 0x776b5b }
  ];
  for (const c of configs) {
    const f = makeFighter({
      weapon: c.weapon,
      scale: c.scale,
      brute: c.brute,
      skin: pick([0xb97a55, 0xa3724f, 0xc08a63]),
      cloth: c.cloth,
      armor: c.armor,
      hair: 0x1b100b
    });
    f.root.position.set(c.pos[0], c.pos[1], c.pos[2]);
    f.root.rotation.y = c.rot;
    f.moving = 0;
    scene.add(f.root, f.shadow);
    f.shadow.position.set(c.pos[0], 0.02, c.pos[2]);
    menuFighters.push(f);
  }
}

function clearMenuFighters() {
  for (const f of menuFighters) {
    scene.remove(f.root, f.shadow);
  }
  menuFighters = [];
}

/* ============================================================
   CAMERA
   ============================================================ */
function updateCamera(dt, instant = false) {
  if (!player) return;
  const yaw = player.yaw;
  const pitch = player.pitch;
  const fwdX = -Math.sin(yaw);
  const fwdZ = -Math.cos(yaw);
  const rightX = Math.cos(yaw);
  const rightZ = -Math.sin(yaw);

  const dist = 5.0;
  const side = 1.5;
  const desiredX = player.pos.x - fwdX * dist + rightX * side;
  const desiredZ = player.pos.z - fwdZ * dist + rightZ * side;
  const desiredY = 2.6;

  let cx = desiredX, cz = desiredZ;
  const cr = Math.hypot(cx, cz);
  if (cr > 18.1) { cx *= 18.1 / cr; cz *= 18.1 / cr; }
  const cy = Math.max(1.35, desiredY);

  if (instant) {
    camPos.set(cx, cy, cz);
  } else {
    camPos.x = damp(camPos.x, cx, 16, dt);
    camPos.y = damp(camPos.y, cy, 16, dt);
    camPos.z = damp(camPos.z, cz, 16, dt);
  }

  camera.position.copy(camPos);
  viewerFill.position.set(camPos.x, camPos.y + 0.4, camPos.z);

  /* converge the crosshair onto the player's forward line ~3.4m ahead */
  const aimDist = 3.6;
  const pitchTan = Math.tan(clamp(pitch, -0.55, 0.65));
  const targetX = player.pos.x + fwdX * aimDist;
  const targetZ = player.pos.z + fwdZ * aimDist;
  const targetY = 1.48 + pitchTan * aimDist;
  camera.lookAt(targetX, targetY, targetZ);
  camera.getWorldDirection(aimDir);

  if (state.shake > 0.002) {
    const s = state.shake;
    camera.position.x += rand(-1, 1) * s * 0.035;
    camera.position.y += rand(-1, 1) * s * 0.03;
    camera.position.z += rand(-1, 1) * s * 0.035;
    camera.rotation.z += rand(-1, 1) * s * 0.008;
  }
  camera.updateMatrixWorld(true);
}

function updateMenuCamera(dt) {
  const t = state.menuT;
  const radius = 13.5;
  const a = t * 0.11;
  const x = Math.sin(a) * radius;
  const z = Math.cos(a) * radius;
  const y = 6.2 + Math.sin(t * 0.21) * 0.7;
  camPos.lerp(V.v1.set(x, y, z), 1 - Math.exp(-1.4 * dt));
  camera.position.copy(camPos);
  viewerFill.position.set(camPos.x, camPos.y, camPos.z);
  camera.lookAt(0, 2.0, 0);
}

/* ============================================================
   MAIN LOOP
   ============================================================ */
let lastTime = performance.now();

function frame(now) {
  requestAnimationFrame(frame);
  const realDt = Math.min(0.05, Math.max(0.0001, (now - lastTime) / 1000));
  lastTime = now;

  /* time scaling */
  if (state.slowT > 0) {
    state.slowT = Math.max(0, state.slowT - realDt);
    state.timeScale = damp(state.timeScale, 0.32, 14, realDt);
  } else {
    state.timeScale = damp(state.timeScale, 1, 7, realDt);
  }
  let dt = realDt * state.timeScale;
  if (state.hitStop > 0) {
    state.hitStop = Math.max(0, state.hitStop - realDt);
    dt = 0;
  }

  state.time += dt;
  state.menuT += realDt;
  state.shake = Math.max(0, state.shake - realDt * 2.1);
  state.flash = Math.max(0, state.flash - realDt * 3.6);
  state.blood = Math.max(0, state.blood - realDt * 0.16);
  state.comboT = Math.max(0, state.comboT - realDt);
  if (state.comboT <= 0 && state.combo !== 1) state.combo = 1;

  arena.update(realDt, state.menuT);

  if (state.mode === 'menu') {
    for (const f of menuFighters) animateFighter(f, realDt, state.menuT, {});
    updateMenuCamera(realDt);
    updateEffects(realDt * 0.5);
    updatePopups(realDt);
    renderer.render(scene, camera);
    return;
  }

  if (state.mode === 'playing') {
    if (player) {
      updatePlayer(dt, realDt);
      updateEnemies(dt);
      updateCamera(dt);
      updateWaves(dt);
      updateAimHint(realDt);
    }
    state.deathTimer = 0;
  } else if (state.mode === 'paused') {
    /* frozen */
  } else if (state.mode === 'dying' || state.mode === 'dead') {
    if (player) {
      animateFighter(player.fighter, dt, state.time, {});
      updateEnemies(dt);
      updateCamera(realDt, false);
    }
    if (state.mode === 'dying') {
      state.deathTimer -= realDt;
      if (state.deathTimer <= 0) {
        state.mode = 'dead';
        state.slowT = 0;
        showDeathScreen();
      }
    } else {
      updateEnemies(dt);
      updateCamera(realDt, false);
    }
    ui.bloodOverlay.style.opacity = Math.min(0.9, state.blood + 0.35).toFixed(3);
  }

  if (state.mode !== 'paused') {
    updateGibs(dt);
    updateEffects(dt);
    gore.update(dt);
    updatePopups(realDt);
    updateHUD();
    audio.update(realDt);
  }

  /* shake decay applied in camera; reduce excitation */
  renderer.render(scene, camera);
}

/* ============================================================
   BOOT
   ============================================================ */
initBloodSplatter();
setupMenuFighters();
updateMenuCamera(1);
resize();
requestAnimationFrame(frame);

/* expose a tiny debug handle for testing/inspection */
window.BLOODPIT = {
  state,
  scene,
  camera,
  gore,
  arena,
  get player() { return player; },
  get enemies() { return enemies; },
  get gibs() { return gibs; },
  start: (w) => startGame(w || 'sword'),
  startWave: (n) => { pendingSpawns = []; for (const e of enemies) if (!e.dead) killEnemy(e, 'wounds'); beginWave(n || 1); },
  win: () => { if (player) player.hp = 100; },
  killAll: () => { for (const e of enemies) if (!e.dead) killEnemy(e, 'wounds'); },
  damage: (n) => { if (player) damagePlayer(n || 0); }
};
