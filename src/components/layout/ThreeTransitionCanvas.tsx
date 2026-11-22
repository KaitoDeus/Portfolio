'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeTransitionCanvasProps {
  activeIndex: number;
  direction: 1 | -1;
  isTransitioning: boolean;
}

const SECTION_SPACING_X = 18;

export default function ThreeTransitionCanvas({
  activeIndex,
  direction,
  isTransitioning,
}: ThreeTransitionCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync latest state into refs so the WebGL scene never re-mounts during navigation
  const targetIndexRef = useRef(activeIndex);
  const directionRef = useRef(direction);
  const transitionImpulseRef = useRef(0);

  useEffect(() => {
    targetIndexRef.current = activeIndex;
    directionRef.current = direction;
    if (isTransitioning) {
      transitionImpulseRef.current = 1;
    }
  }, [activeIndex, direction, isTransitioning]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;

    try {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / Math.max(window.innerHeight, 1),
        0.1,
        150
      );
      camera.position.set(targetIndexRef.current * SECTION_SPACING_X, 0.5, 11);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Theme detection helpers
      const getIsDark = () => document.documentElement.classList.contains('dark');

      const getPalette = (isDark: boolean) => ({
        particleColor: isDark ? 0x7dd3fc : 0x2563eb,
        wireColorPrimary: isDark ? 0x38bdf8 : 0x1d4ed8,
        wireColorSecondary: isDark ? 0xa78bfa : 0x6366f1,
        gridMain: isDark ? 0x38bdf8 : 0x3b82f6,
        gridSub: isDark ? 0x1e293b : 0x94a3b8,
      });

      let palette = getPalette(getIsDark());

      // 1. Wide 3D Particle Corridor across all 5 horizontal sections
      const particleCount = 460;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.15) * 110 - 16; // x spanning -32..+94
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;    // y
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 24 - 8; // z
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        color: palette.particleColor,
        size: 0.13,
        transparent: true,
        opacity: getIsDark() ? 0.55 : 0.38,
        depthWrite: false,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // 2. Five Spatial 3D Wireframe Geometric Landmarks (one per portfolio tab)
      const landmarkGeometries: THREE.BufferGeometry[] = [
        new THREE.IcosahedronGeometry(2.3, 0),
        new THREE.OctahedronGeometry(2.2, 0),
        new THREE.TorusKnotGeometry(1.5, 0.42, 64, 10),
        new THREE.DodecahedronGeometry(2.1, 0),
        new THREE.TorusGeometry(1.85, 0.45, 14, 40),
      ];

      const landmarkMeshes: THREE.Mesh[] = [];
      const landmarkMaterials: THREE.MeshBasicMaterial[] = [];

      landmarkGeometries.forEach((geom, idx) => {
        const mat = new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? palette.wireColorPrimary : palette.wireColorSecondary,
          wireframe: true,
          transparent: true,
          opacity: getIsDark() ? 0.18 : 0.12,
        });
        const mesh = new THREE.Mesh(geom, mat);
        // Offset landmarks cleanly behind each tab plane
        mesh.position.set(
          idx * SECTION_SPACING_X + (idx % 2 === 0 ? 5.2 : -5.2),
          idx % 2 === 0 ? 1.4 : -1.2,
          -9.5
        );
        scene.add(mesh);
        landmarkMeshes.push(mesh);
        landmarkMaterials.push(mat);
      });

      // 3. Subtle Spatial Perspective Floor Grid
      const gridHelper = new THREE.GridHelper(180, 48, palette.gridMain, palette.gridSub);
      gridHelper.position.set(SECTION_SPACING_X * 2, -6.8, -10);
      const gridMaterials = Array.isArray(gridHelper.material)
        ? gridHelper.material
        : [gridHelper.material];
      gridMaterials.forEach((m) => {
        m.transparent = true;
        m.opacity = getIsDark() ? 0.12 : 0.08;
      });
      scene.add(gridHelper);

      // Observe theme class changes on <html>
      const updateThemeColors = () => {
        const isDark = getIsDark();
        palette = getPalette(isDark);
        particleMaterial.color.setHex(palette.particleColor);
        particleMaterial.opacity = isDark ? 0.55 : 0.38;
        landmarkMaterials.forEach((mat, idx) => {
          mat.color.setHex(idx % 2 === 0 ? palette.wireColorPrimary : palette.wireColorSecondary);
          mat.opacity = isDark ? 0.18 : 0.12;
        });
        gridMaterials.forEach((m) => {
          m.opacity = isDark ? 0.12 : 0.08;
        });
      };

      const themeObserver = new MutationObserver(updateThemeColors);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Mouse parallax tracking
      const pointer = { x: 0, y: 0 };
      const handlePointerMove = (e: MouseEvent) => {
        pointer.x = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        pointer.y = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
      };
      window.addEventListener('mousemove', handlePointerMove, { passive: true });

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      let currentCamX = targetIndexRef.current * SECTION_SPACING_X;
      let currentCamZ = 11;
      let currentRotY = 0;
      const clock = new THREE.Clock();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        const targetX = targetIndexRef.current * SECTION_SPACING_X;
        const deltaX = targetX - currentCamX;

        // Smooth camera horizontal fly-through
        currentCamX += deltaX * 0.085;

        // Dynamic Z pull-back & Y-banking proportional to horizontal flight speed
        const speedNorm = Math.min(Math.abs(deltaX) / SECTION_SPACING_X, 1);
        transitionImpulseRef.current *= 0.92;

        const targetZ = 11 + speedNorm * 4.2 + transitionImpulseRef.current * 1.4;
        currentCamZ += (targetZ - currentCamZ) * 0.1;

        const targetRotY = -Math.sign(deltaX || 0) * speedNorm * 0.16 - pointer.x * 0.045;
        currentRotY += (targetRotY - currentRotY) * 0.08;

        camera.position.x = currentCamX + pointer.x * 0.85;
        camera.position.y = 0.5 - pointer.y * 0.55;
        camera.position.z = currentCamZ;
        camera.rotation.y = currentRotY;
        camera.rotation.x = -pointer.y * 0.03;

        // Gentle continuous rotation + active boost on landmarks
        landmarkMeshes.forEach((mesh, idx) => {
          const isTarget = idx === targetIndexRef.current;
          const speedMult = isTarget ? 1.45 : 0.7;
          mesh.rotation.x = elapsed * 0.14 * speedMult + idx * 0.5;
          mesh.rotation.y = elapsed * 0.22 * speedMult + idx * 0.9;
          mesh.position.y = (idx % 2 === 0 ? 1.4 : -1.2) + Math.sin(elapsed * 0.9 + idx) * 0.35;
        });

        // Subtle particle drift
        particles.rotation.z = Math.sin(elapsed * 0.08) * 0.03;
        particles.position.y = Math.cos(elapsed * 0.25) * 0.25;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(frameId);
        themeObserver.disconnect();
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);

        particleGeometry.dispose();
        particleMaterial.dispose();
        landmarkGeometries.forEach((g) => g.dispose());
        landmarkMaterials.forEach((m) => m.dispose());
        gridHelper.geometry.dispose();
        gridMaterials.forEach((m) => m.dispose());

        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch {
      // Fallback silently if WebGL context is unavailable
      return;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    />
  );
}
