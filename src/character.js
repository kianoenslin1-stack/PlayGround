import * as THREE from '../vendor/three.module.js';
import { damp, lerp, easeOut, easeIn, clamp } from './utils.js';

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();

function makeMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.85,
    metalness: opts.metalness ?? 0.05,
    flatShading: true,
    emissive: 0x000000,
    ...opts
  });
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0, 'rgba(0,0,0,.6)');
  g.addColorStop(0.55, 'rgba(0,0,0,.32)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let SHADOW_TEX = null;

function buildSword(mats) {
  const g = new THREE.Group();
  const steel = mats.weapon;
  const leather = mats.leather;

  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.042, 0.26, 8), leather);
  grip.position.y = 0.02;
  g.add(grip);

  const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.065, 7, 5), steel);
  pommel.position.y = -0.12;
  g.add(pommel);

  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.07), steel);
  guard.position.y = 0.17;
  g.add(guard);

  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.98, 0.024), steel);
  blade.position.y = 0.68;
  g.add(blade);

  const fuller = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 0.9, 0.028),
    new THREE.MeshStandardMaterial({ color: 0x6a6f73, roughness: 0.4, metalness: 0.95 })
  );
  fuller.position.set(0, 0.68, 0.001);
  g.add(fuller);

  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.2, 4), steel);
  tip.position.y = 1.26;
  tip.rotation.y = Math.PI / 4;
  g.add(tip);

  const bloodEdge = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.94, 0.026),
    new THREE.MeshStandardMaterial({ color: 0x3a3532, roughness: 0.55, metalness: 0.7 })
  );
  bloodEdge.position.set(0.042, 0.68, 0);
  g.add(bloodEdge);

  g.userData.tipLocal = new THREE.Vector3(0, 1.36, 0);
  return g;
}

function buildHammer(mats) {
  const g = new THREE.Group();
  const steel = mats.weapon;
  const iron = new THREE.MeshStandardMaterial({ color: 0x5b5d61, roughness: 0.6, metalness: 0.85, flatShading: true });
  const leather = mats.leather;

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.062, 1.08, 8), leather);
  shaft.position.y = 0.4;
  g.add(shaft);

  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.26, 8), new THREE.MeshStandardMaterial({ color: 0x2a1c14, roughness: 0.95, flatShading: true }));
  wrap.position.y = 0.05;
  g.add(wrap);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.3, 0.32), iron);
  head.position.y = 0.94;
  g.add(head);

  const bandGeo = new THREE.BoxGeometry(0.55, 0.055, 0.35);
  for (const y of [0.82, 1.06]) {
    const band = new THREE.Mesh(bandGeo, steel);
    band.position.y = y;
    g.add(band);
  }

  const spike = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.34, 4), iron);
  spike.position.set(0, 0.94, 0.31);
  spike.rotation.x = Math.PI / 2;
  g.add(spike);
  const spike2 = spike.clone();
  spike2.position.z = -0.31;
  spike2.rotation.x = -Math.PI / 2;
  g.add(spike2);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 5), new THREE.MeshStandardMaterial({ color: 0xb9a98b, roughness: 0.9, flatShading: true }));
  skull.position.set(0.22, 0.94, 0);
  skull.scale.set(1, 1.1, 1);
  g.add(skull);

  g.userData.tipLocal = new THREE.Vector3(0, 1.12, 0);
  return g;
}

function buildClub(mats) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a3220, roughness: 1, flatShading: true });
  const iron = mats.weapon;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 1.0, 7), wood);
  shaft.position.y = 0.32;
  g.add(shaft);
  const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.19, 0), wood);
  head.position.y = 0.88;
  head.scale.set(1, 1.5, 1);
  g.add(head);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const stud = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 4), iron);
    stud.position.set(Math.cos(a) * 0.17, 0.88 + Math.sin(a) * 0.22, Math.sin(a) * 0.05);
    stud.rotation.z = -a + Math.PI / 2;
    g.add(stud);
  }
  g.userData.tipLocal = new THREE.Vector3(0, 1.02, 0);
  return g;
}

function buildAxe(mats) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x3d2a18, roughness: 1, flatShading: true });
  const bladeMat = mats.weapon;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.02, 7), wood);
  shaft.position.y = 0.35;
  g.add(shaft);

  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.05), bladeMat);
  blade.position.set(0.19, 0.9, 0);
  g.add(blade);
  const edge = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.3, 4), bladeMat);
  edge.position.set(0.38, 0.9, 0);
  edge.rotation.z = -Math.PI / 2;
  edge.scale.set(1, 1, 0.4);
  g.add(edge);
  const backSpike = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.26, 4), bladeMat);
  backSpike.position.set(-0.18, 0.9, 0);
  backSpike.rotation.z = Math.PI / 2;
  g.add(backSpike);

  g.userData.tipLocal = new THREE.Vector3(0.42, 0.92, 0);
  return g;
}

/**
 * Builds a fully rigged low-poly gladiator.
 * Returns { root, parts, hitMeshes, mats, weapon, tip, shadow, ... }
 */
export function makeFighter(opts = {}) {
  const skinColor = opts.skin ?? 0xc98f6b;
  const clothColor = opts.cloth ?? 0x5a2620;
  const armorColor = opts.armor ?? 0x6f6a5f;
  const scale = opts.scale ?? 1;
  const isBrute = !!opts.brute;

  const mats = {
    skin: makeMat(skinColor, { roughness: 0.9 }),
    cloth: makeMat(clothColor, { roughness: 0.95 }),
    armor: makeMat(armorColor, { roughness: 0.55, metalness: 0.55 }),
    leather: makeMat(0x2e2016, { roughness: 1 }),
    hair: makeMat(opts.hair ?? 0x1c1210, { roughness: 1 }),
    weapon: makeMat(0x9aa2a8, { roughness: 0.32, metalness: 0.9 }),
    metal: makeMat(0x8b9096, { roughness: 0.45, metalness: 0.8 })
  };

  const root = new THREE.Group();
  root.scale.setScalar(scale);

  const hips = new THREE.Group();
  hips.position.y = 1.04;
  root.add(hips);

  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.29), mats.cloth);
  pelvis.castShadow = true;
  hips.add(pelvis);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.09, 0.32), mats.leather);
  belt.position.y = 0.14;
  belt.castShadow = true;
  hips.add(belt);

  const beltPlate = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.05), mats.metal);
  beltPlate.position.set(0, 0.11, -0.17);
  hips.add(beltPlate);

  function makeLeg(side) {
    const hip = new THREE.Group();
    hip.position.set(0.135 * side, -0.1, 0);
    hips.add(hip);

    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.48, 0.21), mats.skin);
    thigh.position.y = -0.23;
    thigh.castShadow = true;
    hip.add(thigh);

    const loin = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.24), mats.cloth);
    loin.position.y = -0.1;
    hip.add(loin);

    const knee = new THREE.Group();
    knee.position.y = -0.46;
    hip.add(knee);

    const shin = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.42, 0.19), mats.skin);
    shin.position.y = -0.21;
    shin.castShadow = true;
    knee.add(shin);

    const shinGuard = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.3, 0.06), mats.leather);
    shinGuard.position.set(0, -0.17, -0.1);
    knee.add(shinGuard);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.11, 0.32), mats.leather);
    foot.position.set(0, -0.44, -0.06);
    foot.castShadow = true;
    knee.add(foot);

    for (const m of [thigh, loin, shin, shinGuard, foot]) m.userData.partKey = side < 0 ? 'legL' : 'legR';
    return { node: hip, knee };
  }

  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  const torso = new THREE.Group();
  torso.position.y = 0.12;
  hips.add(torso);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.68, 0.32), mats.cloth);
  chest.position.y = 0.32;
  chest.castShadow = true;
  torso.add(chest);

  const abs = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.29), mats.skin);
  abs.position.y = 0.08;
  torso.add(abs);

  const chestArmor = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.46, 0.36), mats.armor);
  chestArmor.position.y = 0.38;
  chestArmor.castShadow = true;
  torso.add(chestArmor);

  const strap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.105, 0.375), mats.leather);
  strap.position.y = 0.43;
  strap.rotation.z = 0.62;
  torso.add(strap);
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.045), mats.metal);
  buckle.position.set(0, 0.43, -0.19);
  torso.add(buckle);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.14, 6), mats.skin);
  neck.position.y = 0.69;
  torso.add(neck);

  for (const m of [pelvis, belt, beltPlate, chest, abs, chestArmor, neck, strap, buckle]) {
    m.userData.partKey = 'torso';
  }

  const head = new THREE.Group();
  head.position.y = 0.72;
  torso.add(head);

  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.34, 0.29), mats.skin);
  skull.position.y = 0.16;
  skull.castShadow = true;
  head.add(skull);

  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.24), mats.skin);
  jaw.position.set(0, 0.005, -0.01);
  head.add(jaw);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.06), mats.skin);
  nose.position.set(0, 0.15, -0.165);
  head.add(nose);

  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xf5e8d8, emissive: 0x3a2a20, roughness: 0.6, flatShading: true });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x120808 });
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.045, 0.03), eyeMat);
    eye.position.set(0.075 * s, 0.19, -0.155);
    head.add(eye);
    const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.03, 0.02), pupilMat);
    pupil.position.set(0.075 * s, 0.19, -0.172);
    head.add(pupil);
  }

  const hair = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.1, 0.31), mats.hair);
  hair.position.y = 0.34;
  head.add(hair);

  if (isBrute) {
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.2, 0.36), mats.armor);
    helmet.position.y = 0.31;
    helmet.castShadow = true;
    head.add(helmet);
    const hornGeo = new THREE.ConeGeometry(0.06, 0.26, 5);
    for (const s of [-1, 1]) {
      const horn = new THREE.Mesh(hornGeo, mats.metal);
      horn.position.set(0.2 * s, 0.34, 0);
      horn.rotation.z = -0.7 * s;
      head.add(horn);
    }
    const beard = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.16, 0.12), mats.hair);
    beard.position.set(0, -0.02, -0.17);
    head.add(beard);
  }

  for (const m of head.children) {
    if (m.isMesh) m.userData.partKey = 'head';
  }

  function makeArm(side) {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.34 * side, 0.58, 0);
    shoulder.rotation.z = 0.1 * side;
    torso.add(shoulder);

    const pauldron = new THREE.Mesh(new THREE.SphereGeometry(0.15, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2), mats.armor);
    pauldron.position.y = 0.01;
    pauldron.scale.set(1.15, 0.8, 1.1);
    pauldron.userData.partKey = 'torso';
    shoulder.add(pauldron);

    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.17), mats.skin);
    upper.position.y = -0.2;
    upper.castShadow = true;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.4;
    shoulder.add(elbow);

    const fore = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 0.15), mats.skin);
    fore.position.y = -0.18;
    fore.castShadow = true;
    elbow.add(fore);

    const bracer = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.18, 0.18), mats.leather);
    bracer.position.y = -0.24;
    elbow.add(bracer);

    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.14, 0.15), mats.skin);
    hand.position.y = -0.4;
    elbow.add(hand);

    for (const m of [upper, fore, bracer, hand]) m.userData.partKey = side < 0 ? 'armL' : 'armR';
    return { node: shoulder, elbow, hand };
  }

  const armL = makeArm(-1);
  const armR = makeArm(1);

  // weapon
  const weaponType = opts.weapon ?? 'sword';
  let weapon = null;
  if (weaponType === 'sword') weapon = buildSword(mats);
  else if (weaponType === 'hammer') weapon = buildHammer(mats);
  else if (weaponType === 'axe') weapon = buildAxe(mats);
  else if (weaponType === 'club') weapon = buildClub(mats);
  if (weapon) {
    weapon.position.set(0.03, -0.42, 0);
    weapon.rotation.x = weaponType === 'hammer' ? -0.95 : weaponType === 'club' ? -0.72 : -0.68;
    weapon.rotation.z = weaponType === 'axe' ? -0.15 : weaponType === 'sword' ? -0.14 : 0;
    armR.elbow.add(weapon);
    if (weaponType === 'hammer' || weaponType === 'club') weapon.scale.setScalar(0.94);
    weapon.traverse(o => { if (o.isMesh) o.userData.partKey = 'armR'; });
  }

  const tip = new THREE.Object3D();
  if (weapon) {
    tip.position.copy(weapon.userData.tipLocal);
    weapon.add(tip);
  }

  const hitMeshes = [];
  root.traverse(o => {
    if (o.isMesh && o.userData.partKey) hitMeshes.push(o);
  });

  head.traverse(o => { if (o.isMesh) o.userData.partKey = 'head'; });

  const parts = {
    head: { node: head, hp: 38, maxHp: 38, key: 'head' },
    torso: { node: torso, hp: 120, maxHp: 120, key: 'torso' },
    armL: { node: armL.node, hp: 34, maxHp: 34, key: 'armL' },
    armR: { node: armR.node, hp: 34, maxHp: 34, key: 'armR' },
    legL: { node: legL.node, hp: 46, maxHp: 46, key: 'legL' },
    legR: { node: legR.node, hp: 46, maxHp: 46, key: 'legR' }
  };
  if (isBrute) {
    for (const k of Object.keys(parts)) {
      parts[k].hp *= 1.9;
      parts[k].maxHp *= 1.9;
    }
  }

  if (!SHADOW_TEX) SHADOW_TEX = shadowTexture();
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({ map: SHADOW_TEX, transparent: true, opacity: 0.75, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;

  return {
    root, hips, torso, head, legL, legR, armL, armR,
    parts, hitMeshes, mats, weapon, tip, shadow, scale, isBrute,
    weaponType,
    hp: isBrute ? 260 : 100,
    maxHp: isBrute ? 260 : 100,
    dead: false,
    deathT: 0,
    walkPhase: Math.random() * 7,
    attackT: -1,
    attackDur: 0.5,
    attackCombo: 0,
    staggerT: 0,
    flashT: 0,
    moving: 0,
    radius: 0.42 * scale,
    height: 2.14 * scale,
    baseHipsY: 1.04,
    lastPos: new THREE.Vector3()
  };
}

export function setHurtFlash(f, amount) {
  f.flashT = Math.max(f.flashT, amount);
}

export function animateFighter(f, dt, t, opts = {}) {
  if (f.dead) {
    f.deathT += dt;
    const k = Math.min(1, f.deathT * 3.2);
    f.root.rotation.x = damp(f.root.rotation.x, -1.42, 9, dt);
    f.hips.position.y = damp(f.hips.position.y, f.baseHipsY * 0.28, 7, dt);
    f.hips.rotation.z = damp(f.hips.rotation.z, 0.12, 3, dt);
    f.shadow.position.set(f.root.position.x, 0.022, f.root.position.z);
    return;
  }

  if (f.flashT > 0) {
    f.flashT = Math.max(0, f.flashT - dt * 3.4);
    const e = f.flashT * 0.65;
    f.mats.skin.emissive.setRGB(e, e * 0.09, e * 0.05);
    f.mats.cloth.emissive.setRGB(e, e * 0.09, e * 0.05);
    f.mats.armor.emissive.setRGB(e * 0.6, e * 0.05, e * 0.03);
  } else {
    f.mats.skin.emissive.setRGB(0, 0, 0);
    f.mats.cloth.emissive.setRGB(0, 0, 0);
    f.mats.armor.emissive.setRGB(0, 0, 0);
  }

  const moving = f.moving;
  f.walkPhase += dt * (2.2 + moving * 1.45);
  const stride = Math.min(1, moving / 4.2);
  const swing = Math.sin(f.walkPhase);
  const swing2 = Math.sin(f.walkPhase + Math.PI);

  let bob = Math.abs(Math.sin(f.walkPhase)) * 0.045 * stride;
  f.hips.position.y = f.baseHipsY + bob;
  f.hips.rotation.z = Math.sin(f.walkPhase) * 0.025 * stride;
  f.hips.rotation.y = Math.sin(f.walkPhase) * 0.06 * stride;

  f.legL.node.rotation.x = swing * 0.72 * stride;
  f.legR.node.rotation.x = swing2 * 0.72 * stride;
  f.legL.knee.rotation.x = Math.max(0, -swing) * 0.65 * stride;
  f.legR.knee.rotation.x = Math.max(0, -swing2) * 0.65 * stride;

  // arms rest
  let armLX = swing2 * 0.45 * stride;
  let armRX = swing * 0.3 * stride;
  let armLZ = -0.1, armRZ = 0.1;
  let torsoY = 0;
  let torsoX = 0;
  let lean = 0;

  if (f.attackT >= 0) {
    const p = clamp(f.attackT / f.attackDur, 0, 1);
    const heavy = f.weaponType === 'hammer' || f.weaponType === 'club';
    if (heavy) {
      if (p < 0.38) {
        const q = easeOut(p / 0.38);
        armRX = lerp(armRX, -2.75, q);
        armLX = lerp(armLX, -2.45, q);
        torsoX = lerp(0, 0.2, q);
        f.hips.position.y += q * 0.07;
      } else if (p < 0.58) {
        const q = easeIn((p - 0.38) / 0.2);
        armRX = lerp(-2.75, 0.85, q);
        armLX = lerp(-2.45, 0.55, q);
        torsoX = lerp(0.2, -0.35, q);
        f.hips.position.y -= q * 0.12;
        f.hips.rotation.x = -0.12 * q;
      } else {
        const q = easeOut((p - 0.58) / 0.42);
        armRX = lerp(0.85, swing * 0.3 * stride, q);
        armLX = lerp(0.55, swing2 * 0.45 * stride, q);
        torsoX = lerp(-0.35, 0, q);
        f.hips.rotation.x = lerp(-0.12, 0, q);
      }
    } else {
      if (p < 0.26) {
        const q = easeOut(p / 0.26);
        armRX = lerp(armRX, -2.35, q);
        armRZ = lerp(0.1, 0.75, q);
        torsoY = lerp(0, 0.55, q);
      } else if (p < 0.52) {
        const q = easeIn((p - 0.26) / 0.26);
        armRX = lerp(-2.35, 0.75, q);
        armRZ = lerp(0.75, -0.55, q);
        torsoY = lerp(0.55, -0.5, q);
      } else {
        const q = easeOut((p - 0.52) / 0.48);
        armRX = lerp(0.75, swing * 0.3 * stride, q);
        armRZ = lerp(-0.55, 0.1, q);
        torsoY = lerp(-0.5, 0, q);
      }
    }
  }

  if (f.staggerT > 0) {
    f.staggerT -= dt;
    lean = Math.sin(f.staggerT * 22) * 0.16;
  }

  f.armL.node.rotation.x = damp(f.armL.node.rotation.x, armLX, 18, dt);
  f.armR.node.rotation.x = damp(f.armR.node.rotation.x, armRX, 22, dt);
  f.armL.node.rotation.z = damp(f.armL.node.rotation.z, armLZ, 12, dt);
  f.armR.node.rotation.z = damp(f.armR.node.rotation.z, armRZ, 18, dt);
  f.torso.rotation.y = damp(f.torso.rotation.y, torsoY, 16, dt);
  f.torso.rotation.x = damp(f.torso.rotation.x, torsoX + lean, 14, dt);

  f.shadow.position.set(f.root.position.x, 0.022, f.root.position.z);
  f.shadow.material.opacity = 0.72;

  if (f.attackT >= 0) {
    f.attackT += dt;
    if (f.attackT > f.attackDur + 0.14) f.attackT = -1;
  }
  if (f.staggerT < -1) f.staggerT = 0;
}

export function disposeFighter(f, scene) {
  if (f.root.parent) f.root.parent.remove(f.root);
  if (f.shadow.parent) f.shadow.parent.remove(f.shadow);
  f.shadow.geometry.dispose();
  f.shadow.material.dispose();
}

export function getWeaponTipWorld(f, out = _v) {
  if (!f.tip) return out.set(f.root.position.x, 1.4, f.root.position.z);
  f.tip.getWorldPosition(out);
  return out;
}
