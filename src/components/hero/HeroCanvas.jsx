import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- PARTICLE SYSTEM (Per ui-ux-pro-max guidelines) ---
    const COUNT = 2600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const originalPositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);

    const cyanColor = new THREE.Color(0x00F5FF);
    const violetColor = new THREE.Color(0x7B2CBF);
    const whiteColor = new THREE.Color(0xF8F9FA);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Spread across 3D planar wave volume
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Color gradient between Cyan and Violet
      const mixRatio = (x + 30) / 60;
      const pointColor = new THREE.Color().lerpColors(cyanColor, violetColor, mixRatio);
      if (Math.random() > 0.88) {
        pointColor.lerp(whiteColor, 0.7); // occasional star glint
      }

      colors[i3] = pointColor.r;
      colors[i3 + 1] = pointColor.g;
      colors[i3 + 2] = pointColor.b;

      scales[i] = Math.random() * 0.8 + 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle particle texture to avoid square artifacts
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 245, 255, 0.8)');
    grad.addColorStop(0.8, 'rgba(123, 44, 191, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- INTERACTIVE MOUSE PHYSICS ---
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Harmonic wave oscillation
        const wave = Math.sin(elapsedTime * 1.2 + ox * 0.15 + oy * 0.15) * 1.5;
        const wave2 = Math.cos(elapsedTime * 0.8 + ox * 0.1) * 1.2;

        // Mouse displacement
        const dx = ox - mouse.x * 25;
        const dy = oy - mouse.y * 18;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let mouseInfluence = 0;

        if (dist < 12) {
          mouseInfluence = (12 - dist) * 0.45;
        }

        posArray[i3 + 1] = oy + wave + (mouse.y * 3) + (dy < 0 ? -mouseInfluence : mouseInfluence);
        posArray[i3 + 2] = oz + wave2 + mouseInfluence * 2;
      }

      posAttr.needsUpdate = true;

      // Gentle global rotation
      particles.rotation.y = elapsedTime * 0.04 + mouse.x * 0.15;
      particles.rotation.x = mouse.y * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
