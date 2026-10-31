import * as THREE from '../vendor/three.module.js';
import {
  rand, randInt, makeSandTexture, makeStoneTexture, makeRadialTexture,
  makeBannerTexture
} from './utils.js';

export function createArena(scene, renderer, isMobile = false) {
  const group = new THREE.Group();
  scene.add(group);

  scene.background = new THREE.Color(0x140606);
  scene.fog = new THREE.FogExp2(0x1a0707, 0.016);

  /* ---------------- lights ---------------- */
  const hemi = new THREE.HemisphereLight(0x9a6650, 0x3a241c, 1.9);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0x5a332a, 0.55);
  scene.add(ambient);

  const fill = new THREE.DirectionalLight(0x9a7568, 0.75);
  fill.position.set(-7, 6, 12);
  scene.add(fill);

  const key = new THREE.DirectionalLight(0xffb37a, 2.35);
  key.position.set(9, 17, 7);
  key.castShadow = !isMobile;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -22;
  key.shadow.camera.right = 22;
  key.shadow.camera.top = 22;
  key.shadow.camera.bottom = -22;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 55;
  key.shadow.bias = -0.0012;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x5f7fa8, 0.8);
  rim.position.set(-10, 8, -12);
  scene.add(rim);

  const torchLights = [];
  for (let i = 0; i < 4; i++) {
    const pl = new THREE.PointLight(0xff6a20, 26, 17, 2);
    torchLights.push(pl);
    scene.add(pl);
  }

  /* ---------------- sky & moon ---------------- */
  const starGeo = new THREE.BufferGeometry();
  const starPos = [];
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2;
    const y = rand(8, 70);
    const r = Math.sqrt(Math.max(0, 1 - (y / 80) ** 2)) * 120;
    starPos.push(Math.cos(a) * r, y, Math.sin(a) * r);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xd9b9a0, size: 0.55, sizeAttenuation: true, transparent: true, opacity: 0.55, fog: false, depthWrite: false
  }));
  scene.add(stars);

  const moonTex = makeRadialTexture('rgba(255,120,80,.95)', 'rgba(180,20,10,0)');
  const moon = new THREE.Sprite(new THREE.SpriteMaterial({
    map: moonTex, color: 0xff9a6a, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false
  }));
  moon.scale.set(34, 34, 1);
  moon.position.set(38, 34, -86);
  scene.add(moon);
  const moonCore = new THREE.Sprite(new THREE.SpriteMaterial({
    map: moonTex, color: 0xfff0d0, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false
  }));
  moonCore.scale.set(12, 12, 1);
  moonCore.position.copy(moon.position);
  scene.add(moonCore);

  /* ---------------- sand ---------------- */
  const sandTex = makeSandTexture();
  const sandMat = new THREE.MeshStandardMaterial({
    map: sandTex, color: 0xd8c39a, roughness: 1, metalness: 0
  });
  const sand = new THREE.Mesh(new THREE.CircleGeometry(19.4, 96), sandMat);
  sand.rotation.x = -Math.PI / 2;
  sand.receiveShadow = true;
  group.add(sand);

  // dark earth beyond the arena
  const outside = new THREE.Mesh(
    new THREE.CircleGeometry(90, 48),
    new THREE.MeshStandardMaterial({ color: 0x211310, roughness: 1 })
  );
  outside.rotation.x = -Math.PI / 2;
  outside.position.y = -0.03;
  group.add(outside);

  // central summoning stain
  const stainTex = makeRadialTexture('rgba(60,2,2,.65)', 'rgba(40,0,0,0)');
  const stain = new THREE.Mesh(
    new THREE.CircleGeometry(5.5, 48),
    new THREE.MeshBasicMaterial({ map: stainTex, transparent: true, opacity: 0.8, depthWrite: false })
  );
  stain.rotation.x = -Math.PI / 2;
  stain.position.y = 0.012;
  group.add(stain);

  // ring etched into the sand
  const runeRing = new THREE.Mesh(
    new THREE.RingGeometry(7.4, 7.55, 64),
    new THREE.MeshBasicMaterial({ color: 0x3b0a08, transparent: true, opacity: 0.7, depthWrite: false })
  );
  runeRing.rotation.x = -Math.PI / 2;
  runeRing.position.y = 0.014;
  group.add(runeRing);

  /* ---------------- arena wall ---------------- */
  const stoneTex = makeStoneTexture();
  const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTex, color: 0x6b5c54, roughness: 0.95 });
  const stoneDark = new THREE.MeshStandardMaterial({ map: stoneTex, color: 0x40332e, roughness: 1 });

  const segs = 46;
  const blockGeo = new THREE.BoxGeometry(2.55, 1, 1.0);
  const blocks = new THREE.InstancedMesh(blockGeo, stoneMat, segs);
  blocks.castShadow = !isMobile;
  blocks.receiveShadow = true;
  const dummy = new THREE.Object3D();
  const wallR = 19.3;
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    const h = rand(1.9, 2.35);
    dummy.position.set(Math.sin(a) * wallR, h / 2, Math.cos(a) * wallR);
    dummy.rotation.set(0, a, 0);
    dummy.scale.set(1, h, 1);
    dummy.updateMatrix();
    blocks.setMatrixAt(i, dummy.matrix);
  }
  group.add(blocks);

  const cap = new THREE.Mesh(
    new THREE.TorusGeometry(wallR, 0.42, 8, 72),
    stoneMat
  );
  cap.rotation.x = -Math.PI / 2;
  cap.position.y = 2.3;
  cap.castShadow = !isMobile;
  group.add(cap);

  // columns
  const colGeo = new THREE.BoxGeometry(0.95, 4.6, 0.95);
  const capGeo = new THREE.BoxGeometry(1.5, 0.4, 1.5);
  const columnPoints = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    const x = Math.sin(a) * 19.35, z = Math.cos(a) * 19.35;
    const col = new THREE.Mesh(colGeo, stoneDark);
    col.position.set(x, 2.5, z);
    col.rotation.y = a;
    col.castShadow = !isMobile;
    group.add(col);
    const c = new THREE.Mesh(capGeo, stoneMat);
    c.position.set(x, 4.85, z);
    c.rotation.y = a;
    group.add(c);
    columnPoints.push(new THREE.Vector3(x, 5.15, z));
  }

  /* ---------------- stands & crowd ---------------- */
  const standMat = new THREE.MeshStandardMaterial({ map: stoneTex, color: 0x5a4b43, roughness: 1 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x332a26, roughness: 1 });
  for (let tier = 0; tier < 3; tier++) {
    const rIn = 20.6 + tier * 1.65;
    const ring = new THREE.Mesh(new THREE.RingGeometry(rIn, rIn + 1.65, 64), seatMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 2.3 + tier * 1.0;
    ring.receiveShadow = true;
    group.add(ring);
    const lip = new THREE.Mesh(
      new THREE.CylinderGeometry(rIn + 1.65, rIn + 1.65, 0.7, 64, 1, true),
      standMat
    );
    lip.position.y = 2.3 + tier * 1.0 - 0.35;
    group.add(lip);
  }

  const crowdCount = isMobile ? 150 : 270;
  const crowdMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, flatShading: true });
  const crowdBodies = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.17, 0.34, 2, 6), crowdMat, crowdCount);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
  const crowdHeads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.125, 6, 5), headMat, crowdCount);
  crowdBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  crowdHeads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const crowd = [];
  const clothColors = [0x2b1c1a, 0x3a2a20, 0x241e26, 0x3d2b1d, 0x1f1a22, 0x4a2b22, 0x2f3336, 0x553326];
  const skinColors = [0xc98f6b, 0xa87050, 0x8a5a3f, 0xd7a47c, 0x6b4634, 0xbb8060];
  for (let i = 0; i < crowdCount; i++) {
    const tier = i % 3;
    const a = Math.random() * Math.PI * 2;
    const r = 20.9 + tier * 1.65 + rand(0.2, 1.3);
    const baseY = 3.05 + tier * 1.0 + rand(0, 0.12);
    const x = Math.sin(a) * r, z = Math.cos(a) * r;
    crowd.push({ a, r, x, z, y: baseY, phase: Math.random() * 7, speed: rand(1.1, 2.3), amp: rand(0.02, 0.09), tier });
    crowdBodies.setColorAt(i, new THREE.Color(clothColors[randInt(0, clothColors.length - 1)]));
    crowdHeads.setColorAt(i, new THREE.Color(skinColors[randInt(0, skinColors.length - 1)]));
    dummy.position.set(x, baseY, z);
    dummy.rotation.set(0, a, 0);
    dummy.scale.setScalar(rand(0.92, 1.15));
    dummy.updateMatrix();
    crowdBodies.setMatrixAt(i, dummy.matrix);
    dummy.position.y = baseY + 0.44;
    dummy.updateMatrix();
    crowdHeads.setMatrixAt(i, dummy.matrix);
  }
  crowdBodies.instanceColor.needsUpdate = true;
  crowdHeads.instanceColor.needsUpdate = true;
  group.add(crowdBodies, crowdHeads);

  /* ---------------- banners ---------------- */
  const bannerTex = makeBannerTexture();
  const bannerMat = new THREE.MeshStandardMaterial({
    map: bannerTex, color: 0xffffff, roughness: 0.95, side: THREE.DoubleSide
  });
  const bannerGeo = new THREE.PlaneGeometry(2.1, 3.0, 1, 4);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const b = new THREE.Mesh(bannerGeo, bannerMat);
    b.position.set(Math.sin(a) * 18.75, 3.6, Math.cos(a) * 18.75);
    b.rotation.y = a;
    group.add(b);
  }

  /* ---------------- torches ---------------- */
  const torchGroup = new THREE.Group();
  group.add(torchGroup);
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x2b1b10, roughness: 1 });
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
  const glowTex = makeRadialTexture('rgba(255,150,60,.9)', 'rgba(255,60,0,0)');
  const torches = [];
  const torchPositions = [];
  for (let i = 0; i < 8; i++) {
    const p = columnPoints[i];
    const t = new THREE.Group();
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 1.1, 6), woodMat);
    stick.position.y = 0.55;
    t.add(stick);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.16, 0.32, 8), new THREE.MeshStandardMaterial({ color: 0x22201e, metalness: 0.7, roughness: 0.5 }));
    bowl.position.y = 1.15;
    t.add(bowl);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.9, 6), flameMat.clone());
    flame.position.y = 1.68;
    t.add(flame);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: 0xff7a2a, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(1.35, 1.35, 1);
    glow.position.y = 1.65;
    t.add(glow);
    t.position.copy(p);
    t.position.y = 5.0;
    torchGroup.add(t);
    torches.push({ flame, glow, seed: Math.random() * 10 });
    torchPositions.push(t.position.clone());
    if (i % 2 === 0) {
      const light = torchLights[i / 2];
      light.position.copy(t.position);
      light.position.y += 1.4;
    }
  }

  /* ---------------- bones & debris ---------------- */
  const boneMat = new THREE.MeshStandardMaterial({ color: 0xcfc1a2, roughness: 0.85 });
  const boneGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.62, 5);
  const skullGeo = new THREE.SphereGeometry(0.16, 6, 5);
  for (let i = 0; i < 16; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = rand(14.5, 18.2);
    const bone = new THREE.Mesh(boneGeo, boneMat);
    bone.position.set(Math.sin(a) * r, 0.06, Math.cos(a) * r);
    bone.rotation.set(Math.PI / 2 + rand(-0.2, 0.2), rand(0, 7), 0);
    bone.castShadow = !isMobile;
    group.add(bone);
    if (Math.random() > 0.5) {
      const skull = new THREE.Mesh(skullGeo, boneMat);
      skull.position.set(bone.position.x + rand(-0.4, 0.4), 0.1, bone.position.z + rand(-0.4, 0.4));
      skull.scale.set(1, 0.9, 1.15);
      skull.castShadow = !isMobile;
      group.add(skull);
    }
  }

  /* ---------------- dust & embers ---------------- */
  const dustCount = isMobile ? 120 : 260;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustSeed = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = rand(-18, 18);
    dustPos[i * 3 + 1] = rand(0.1, 5.5);
    dustPos[i * 3 + 2] = rand(-18, 18);
    dustSeed[i] = Math.random() * 100;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xc9a173, size: 0.055, transparent: true, opacity: 0.5, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  }));
  group.add(dust);

  const emberCount = 80;
  const emberGeo = new THREE.BufferGeometry();
  const emberPos = new Float32Array(emberCount * 3);
  const emberData = [];
  for (let i = 0; i < emberCount; i++) {
    const src = torchPositions[i % torchPositions.length];
    emberPos[i * 3] = src.x + rand(-0.4, 0.4);
    emberPos[i * 3 + 1] = src.y + rand(0.5, 2.2);
    emberPos[i * 3 + 2] = src.z + rand(-0.4, 0.4);
    emberData.push({ x: emberPos[i * 3], y: emberPos[i * 3 + 1], z: emberPos[i * 3 + 2], vy: rand(0.2, 0.8), seed: Math.random() * 10 });
  }
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
  const embers = new THREE.Points(emberGeo, new THREE.PointsMaterial({
    color: 0xff8a3a, size: 0.1, transparent: true, opacity: 0.85, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  }));
  group.add(embers);

  /* ---------------- crowd excitement ---------------- */
  let excitement = 0;
  let time = 0;

  function cheer(amount = 1) {
    excitement = Math.min(2.4, excitement + amount);
  }

  function update(dt, t) {
    time = t;
    excitement = Math.max(0, excitement - dt * 0.42);

    // crowd bob
    const ex = 1 + excitement * 0.9;
    for (let i = 0; i < crowdCount; i++) {
      const c = crowd[i];
      const bob = Math.sin(t * c.speed * ex + c.phase) * c.amp * ex;
      dummy.position.set(c.x, c.y + 0.18 + bob, c.z);
      const lean = Math.sin(t * 0.7 + c.phase) * 0.05 * ex;
      dummy.rotation.set(0, c.a, lean);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      crowdBodies.setMatrixAt(i, dummy.matrix);
      dummy.position.y = c.y + 0.62 + bob;
      dummy.updateMatrix();
      crowdHeads.setMatrixAt(i, dummy.matrix);
    }
    crowdBodies.instanceMatrix.needsUpdate = true;
    crowdHeads.instanceMatrix.needsUpdate = true;

    // torches
    for (let i = 0; i < torches.length; i++) {
      const tr = torches[i];
      const f = 0.82 + Math.sin(t * 11 + tr.seed) * 0.1 + Math.sin(t * 23 + tr.seed * 2) * 0.06;
      tr.flame.scale.set(1 + Math.sin(t * 17 + tr.seed) * 0.12, f * 1.2, 1 + Math.cos(t * 13 + tr.seed) * 0.12);
      tr.flame.material.opacity = 0.72 + Math.sin(t * 19 + tr.seed) * 0.18;
      tr.glow.material.opacity = 0.4 + Math.sin(t * 9 + tr.seed) * 0.12;
      tr.glow.scale.setScalar(1.4 + Math.sin(t * 7 + tr.seed) * 0.22);
    }
    for (let i = 0; i < torchLights.length; i++) {
      torchLights[i].intensity = 22 + Math.sin(t * 13 + i * 2.1) * 5 + Math.sin(t * 29 + i) * 3;
    }

    // dust
    const dp = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      dp[i * 3 + 1] += dt * 0.12;
      dp[i * 3] += Math.sin(t * 0.35 + dustSeed[i]) * dt * 0.08;
      if (dp[i * 3 + 1] > 5.8) dp[i * 3 + 1] = 0.1;
    }
    dustGeo.attributes.position.needsUpdate = true;

    // embers
    const ep = emberGeo.attributes.position.array;
    for (let i = 0; i < emberCount; i++) {
      const d = emberData[i];
      d.y += d.vy * dt;
      ep[i * 3] = d.x + Math.sin(t * 1.3 + d.seed) * 0.35;
      ep[i * 3 + 1] = d.y;
      ep[i * 3 + 2] = d.z + Math.cos(t * 1.1 + d.seed) * 0.35;
      if (d.y > 9) {
        d.y = torchPositions[i % torchPositions.length].y + 0.8;
      }
    }
    emberGeo.attributes.position.needsUpdate = true;

    stars.rotation.y = t * 0.004;
  }

  return {
    group, update, cheer,
    key, hemi,
    get excitement() { return excitement; },
    torchLights
  };
}
