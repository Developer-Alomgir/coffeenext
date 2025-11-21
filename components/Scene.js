\
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    scene.fog = new THREE.FogExp2(0x0b1220, 0.015);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 500);
    camera.position.set(0, 4, 16);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.5;
    controls.panSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.enablePan = true;
    controls.minDistance = 8;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 1.2;

    const ambient = new THREE.AmbientLight(0xb0c6ff, 0.35);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(-5, 10, 5);
    directional.castShadow = true;
    directional.shadow.mapSize.set(2048,2048);
    scene.add(directional);

    const interiorLight = new THREE.PointLight(0xffe0b0, 1.6, 20);
    interiorLight.position.set(0, 3.5, 3);
    scene.add(interiorLight);

    const accent1 = new THREE.PointLight(0xff69b4, 0.9, 12);
    accent1.position.set(-6, 4, 2);
    scene.add(accent1);
    const accent2 = new THREE.PointLight(0x00ffff, 0.9, 12);
    accent2.position.set(6, 4, 2);
    scene.add(accent2);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({ color: 0x0f1724, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI/2;
    ground.receiveShadow = true;
    scene.add(ground);

    const snowCount = 1200;
    const snowGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      positions[i*3+0] = (Math.random()-0.5) * 60;
      positions[i*3+1] = Math.random() * 30 + 2;
      positions[i*3+2] = (Math.random()-0.5) * 30;
    }
    snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const snowMat = new THREE.PointsMaterial({ size: 0.12, color: 0xffffff, transparent: true, opacity: 0.9 });
    const snow = new THREE.Points(snowGeo, snowMat);
    scene.add(snow);

    const box = (w,h,d,col,opts={})=>{
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: opts.r ?? 0.6, metalness: opts.m ?? 0.1, emissive: opts.e ?? 0x000000, emissiveIntensity: opts.ei ?? 0 });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    };
    const cyl = (rt,rb,h,col,seg=24,opts={})=>{
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: opts.r ?? 0.6, metalness: opts.m ?? 0.2, emissive: opts.e ?? 0x000000, emissiveIntensity: opts.ei ?? 0 });
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg), mat);
      m.castShadow = true; m.receiveShadow = true;
      return m;
    };

    const shop = new THREE.Group();
    const backWall = box(10,6,0.4,0x2a2f36,{r:0.8});
    backWall.position.set(0,3,-3);
    shop.add(backWall);
    const leftWall = box(0.4,6,8,0x1f242b,{r:0.85});
    leftWall.position.set(-5,3,1);
    shop.add(leftWall);
    const rightWall = box(0.4,6,8,0x1f242b,{r:0.85});
    rightWall.position.set(5,3,1);
    shop.add(rightWall);
    const floor = box(10,0.2,8,0x0b0f14,{r:0.95});
    floor.position.set(0,0.1,1);
    shop.add(floor);

    const counterTop = box(6,0.28,1.6,0xd6b89a,{r:0.3,m:0.05});
    counterTop.position.set(0,1.3,2.6);
    shop.add(counterTop);
    const counterBody = box(6,1.5,1.5,0x6b3f2b,{r:0.7});
    counterBody.position.set(0,0.5,2.6);
    shop.add(counterBody);

    const machine = new THREE.Group();
    const mbody = box(1.2,1.4,0.9,0xc0c0c0,{m:0.9,r:0.15});
    mbody.position.y = 0.7;
    machine.add(mbody);
    const mtop = box(1.25,0.18,0.95,0x8b0000);
    mtop.position.y = 1.35;
    machine.add(mtop);
    for (let i=0;i<3;i++){
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.06,16), new THREE.MeshStandardMaterial({color:0x222222}));
      knob.rotation.x = Math.PI/2;
      knob.position.set(-0.3 + i*0.3, 1.05, 0.45);
      machine.add(knob);
    }
    machine.position.set(-1.8,1.3,2.2);
    shop.add(machine);

    const oven = box(1.6,1.2,0.9,0x333333,{r:0.6});
    oven.position.set(2.2,0.6,2.2);
    shop.add(oven);

    const tray = new THREE.Group();
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.28,32), new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.05, metalness:0.0, transparent:true, opacity:0.9 }));
    glass.position.set(-0.7,1.45,2.9);
    tray.add(glass);
    const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.4,32), new THREE.MeshStandardMaterial({ color:0x2f6b2f, roughness:0.4 }));
    bottle.position.set(-0.3,1.6,2.9);
    tray.add(bottle);
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.04,64), new THREE.MeshStandardMaterial({ color:0xf2f2f2, roughness:0.8 }));
    plate.position.set(0.6,1.42,2.9);
    tray.add(plate);
    const fruitColors = [0xff6347, 0xffd700, 0xff8c00];
    for (let i=0;i<3;i++){
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.12,24,24), new THREE.MeshStandardMaterial({ color: fruitColors[i], roughness:0.6 }));
      f.position.set(0.45 + i*0.18,1.55,2.9);
      tray.add(f);
    }
    shop.add(tray);

    const keeper = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32,32), new THREE.MeshStandardMaterial({ color:0x8b5a2b, roughness:0.6 }));
    body.position.y = 1.15;
    keeper.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32,32), new THREE.MeshStandardMaterial({ color:0xffe0bd, roughness:0.7 }));
    head.position.y = 1.9;
    keeper.add(head);
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.08,0.16,16), new THREE.MeshStandardMaterial({ color:0x6b3f2b }));
    earL.position.set(-0.15,2.12,0);
    earL.rotation.z = 0.2;
    keeper.add(earL);
    const earR = earL.clone();
    earR.position.x = 0.15; earR.rotation.z = -0.2;
    keeper.add(earR);
    keeper.position.set(0,0.4,1.2);
    scene.add(keeper);

    function makeBanner(title, subtitle) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#071028';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#00ffa3';
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(title, canvas.width/2, 110);
      ctx.fillStyle = '#ffffff';
      ctx.font = '28px Arial';
      ctx.fillText(subtitle, canvas.width/2, 170);
      return new THREE.CanvasTexture(canvas);
    }
    const banglaTitle = 'কফি মামা';
    const banglaSub = 'চা • কফি • গরম টিফিন — স্বাদে গুণগত মান';
    const bannerTex = makeBanner(banglaTitle, banglaSub);
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(6,1.2), new THREE.MeshBasicMaterial({ map: bannerTex, toneMapped: false, transparent: true }));
    banner.position.set(0,5.8,3.5);
    scene.add(banner);
    const bannerLight = new THREE.PointLight(0x00ffa3, 2.2, 10);
    bannerLight.position.set(0,5.8,3.8);
    scene.add(bannerLight);

    const stools = [];
    const createStool = (x,z)=>{
      const s = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.35,0.15,32), new THREE.MeshStandardMaterial({ color:0xcd853f }));
      seat.position.y = 0.9; s.add(seat);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.12,0.9,12), new THREE.MeshStandardMaterial({ color:0x3a2510 }));
      leg.position.y = 0.45; s.add(leg);
      s.position.set(x,0,z); scene.add(s); stools.push(s);
    };
    createStool(-1.8,4); createStool(0,4.3); createStool(1.8,4);

    scene.add(shop);

    let time = 0;
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      time += delta;

      const pos = snow.geometry.attributes.position.array;
      for (let i=0;i<snowCount;i++){
        pos[i*3+1] -= 0.4 * delta;
        if (pos[i*3+1] < -2) pos[i*3+1] = Math.random()*30 + 10;
      }
      snow.geometry.attributes.position.needsUpdate = true;

      keeper.position.y = 0.4 + Math.sin(time*1.2)*0.02;
      keeper.rotation.y = Math.sin(time*0.8)*0.05;

      accent1.intensity = 0.8 + Math.sin(time*1.5)*0.3;
      accent2.intensity = 0.8 + Math.cos(time*1.2)*0.3;
      bannerLight.intensity = 1.4 + Math.sin(time*2.3)*0.6;

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
