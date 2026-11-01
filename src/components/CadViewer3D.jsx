import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, Eye, Maximize2, Layers, Cpu, Compass } from 'lucide-react';
import { playCyberClick } from '../utils/sound';

export default function CadViewer3D({ onToggleScreenshot, showingScreenshot }) {
  const containerRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialType, setMaterialType] = useState('machined'); // machined, matte, wire
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const meshGroupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1c20);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4.5, 3.5, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x22cfb8, 0x123c42);
    gridHelper.position.y = -1.6;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xdcf5f2, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(6, 10, 6);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x22cfb8, 1.2);
    dirLight2.position.set(-6, -2, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38eed9, 1.5, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // Build CAD Actuator Manifold Mesh (Machined Block with bores & bevels)
    const group = new THREE.Group();
    meshGroupRef.current = group;

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x93b4be,
      metalness: 0.75,
      roughness: 0.28,
      wireframe: false,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d363d,
      metalness: 0.5,
      roughness: 0.5,
    });

    const cyanAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x22cfb8,
      emissive: 0x0f5b52,
      metalness: 0.4,
      roughness: 0.2,
    });

    // Main base cube
    const mainBoxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const mainBox = new THREE.Mesh(mainBoxGeo, metalMaterial);
    group.add(mainBox);

    // Central cylindrical actuator bore (hollow look)
    const boreOuterGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.45, 32);
    const boreOuter = new THREE.Mesh(boreOuterGeo, darkTrimMaterial);
    boreOuter.rotation.x = Math.PI / 2;
    group.add(boreOuter);

    const boreInnerGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.5, 32);
    const boreInner = new THREE.Mesh(boreInnerGeo, new THREE.MeshStandardMaterial({
      color: 0x09171a,
      roughness: 0.8,
    }));
    boreInner.rotation.x = Math.PI / 2;
    group.add(boreInner);

    // Corner mounting holes / bolt patterns
    const boltPositions = [
      [-0.85, 0.85],
      [0.85, 0.85],
      [-0.85, -0.85],
      [0.85, -0.85],
      [0, 0.95],
      [-0.95, 0],
      [0.95, 0],
    ];

    boltPositions.forEach(([x, y]) => {
      const holeGeo = new THREE.CylinderGeometry(0.14, 0.14, 2.44, 16);
      const hole = new THREE.Mesh(holeGeo, darkTrimMaterial);
      hole.position.set(x, y, 0);
      hole.rotation.x = Math.PI / 2;
      group.add(hole);

      // Top face bolt counterbore
      const topHoleGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.44, 16);
      const topHole = new THREE.Mesh(topHoleGeo, darkTrimMaterial);
      topHole.position.set(x, 0, y);
      group.add(topHole);
    });

    // Chamfered edges / side pockets
    const pocketGeo = new THREE.BoxGeometry(0.3, 1.4, 1.4);
    const leftPocket = new THREE.Mesh(pocketGeo, darkTrimMaterial);
    leftPocket.position.set(-1.1, 0, 0);
    group.add(leftPocket);

    const rightPocket = new THREE.Mesh(pocketGeo, darkTrimMaterial);
    rightPocket.position.set(1.1, 0, 0);
    group.add(rightPocket);

    // Cyan calibration ring
    const ringGeo = new THREE.TorusGeometry(0.85, 0.03, 16, 64);
    const ring = new THREE.Mesh(ringGeo, cyanAccentMaterial);
    ring.position.z = 1.22;
    group.add(ring);

    scene.add(group);

    // Mouse Interaction / Manual Orbit Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let spherical = {
      radius: 6,
      theta: Math.PI / 4,
      phi: Math.PI / 3,
    };

    const updateCamera = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 0, 0);
    };
    updateCamera();

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      spherical.theta -= deltaX * 0.008;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 0.008));

      prevMousePos = { x: e.clientX, y: e.clientY };
      updateCamera();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      spherical.radius = Math.max(3, Math.min(10, spherical.radius + e.deltaY * 0.005));
      updateCamera();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch controls
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      spherical.theta -= deltaX * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 0.01));
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      updateCamera();
    };
    const onTouchEnd = () => { isDragging = false; };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging) {
        spherical.theta += 0.004;
        updateCamera();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [autoRotate]);

  // Wireframe toggle effect
  useEffect(() => {
    if (!meshGroupRef.current) return;
    meshGroupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = wireframe;
      }
    });
  }, [wireframe]);

  return (
    <div className="relative w-full h-full min-h-[440px] rounded-2xl overflow-hidden bg-[#07191d] border border-[#1b4b53] shadow-2xl flex flex-col">
      {/* Top Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#091f24]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1e515b]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22cfb8] animate-pulse"></span>
          <span className="text-xs font-mono text-[#a5cbcf]">Onshape Part 2201 [Interactive 3D]</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              playCyberClick();
              setWireframe(!wireframe);
            }}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
              wireframe
                ? 'bg-[#22cfb8] text-[#071b1f] border-[#22cfb8] font-bold'
                : 'bg-[#0b242a]/90 text-[#8cb6bb] border-[#1e515b] hover:border-[#22cfb8]'
            }`}
            title="Toggle Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>

          <button
            onClick={() => {
              playCyberClick();
              setAutoRotate(!autoRotate);
            }}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-[#1a444c] text-[#38eed9] border-[#24cfba]'
                : 'bg-[#0b242a]/90 text-[#8cb6bb] border-[#1e515b] hover:border-[#22cfb8]'
            }`}
            title="Toggle Auto Rotation"
          >
            <Rotate3D className="w-3.5 h-3.5" />
            <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>

          <button
            onClick={() => {
              playCyberClick();
              onToggleScreenshot();
            }}
            className="px-2.5 py-1 text-xs font-mono rounded-lg border bg-[#0b242a]/90 text-[#8cb6bb] border-[#1e515b] hover:border-[#22cfb8] hover:text-[#38eed9] transition-all flex items-center gap-1.5"
            title="View Original Onshape CAD Screenshot"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Original UI</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Bottom status badge */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono text-[#6c989e] pointer-events-none">
        <span className="bg-[#081d22]/80 px-2.5 py-1 rounded border border-[#164249]">
          Drag to rotate • Scroll to zoom • CAD manifold
        </span>
        <span className="bg-[#081d22]/80 px-2.5 py-1 rounded border border-[#164249] text-[#22cfb8]">
          Extrude: 2.40mm • Bore: 1.70mm
        </span>
      </div>
    </div>
  );
}
