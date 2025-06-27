import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Sharper on HiDPI screens
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Make sure the canvas always fills the parent
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.minHeight = "100vh";
    renderer.domElement.style.minWidth = "100vw";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.overflow = "hidden";

    mountRef.current.appendChild(renderer.domElement);

    // --- NEXT LEVEL DESIGN: Floating Neon Polyhedra & Energy Waves ---

    // Neon Polyhedra
    const polyhedra = [];
    const polyColors = [0x00fff7, 0x007bff, 0xff6ec4, 0x00ffb8, 0xffffff];
    const polyTypes = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.TetrahedronGeometry(1.3, 0),
      new THREE.DodecahedronGeometry(1.0, 0),
    ];
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: polyColors[i % polyColors.length],
        emissive: polyColors[i % polyColors.length],
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.18,
        transmission: 0.85,
        thickness: 1.2,
        transparent: true,
        opacity: 0.82,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      });
      const mesh = new THREE.Mesh(
        polyTypes[i % polyTypes.length],
        mat
      );
      // Spread polyhedra across the whole viewport
      mesh.position.x = (Math.random() - 0.5) * 36;
      mesh.position.y = (Math.random() - 0.5) * 22;
      mesh.position.z = (Math.random() - 0.5) * 18;
      mesh.userData = {
        speed: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        baseY: mesh.position.y,
      };
      scene.add(mesh);
      polyhedra.push(mesh);
    }

    // Energy Wave (sinusoidal line) - fill horizontally
    const wavePoints = [];
    const waveCount = 220;
    for (let i = 0; i < waveCount; i++) {
      wavePoints.push(new THREE.Vector3((i - waveCount / 2) * 0.32, 0, 0));
    }
    const waveGeometry = new THREE.BufferGeometry().setFromPoints(wavePoints);
    const waveMaterial = new THREE.LineBasicMaterial({
      color: 0x00fff7,
      linewidth: 3,
      transparent: true,
      opacity: 0.7,
    });
    const wave = new THREE.Line(waveGeometry, waveMaterial);
    wave.position.z = -2;
    wave.scale.x = 2.2; // Stretch wave to fill width
    scene.add(wave);

    // Floating glowing particles - fill whole space
    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.13, 12, 12);
    for (let i = 0; i < 90; i++) {
      const color = polyColors[i % polyColors.length];
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      });
      const particle = new THREE.Mesh(particleGeometry, material);
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 28;
      particle.position.x = Math.cos(angle) * radius;
      particle.position.y = (Math.random() - 0.5) * 32;
      particle.position.z = Math.sin(angle) * radius;
      particle.userData = {
        baseY: particle.position.y,
        speed: 0.7 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        radius,
        angle,
      };
      scene.add(particle);
      particles.push(particle);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 30);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      // Polyhedra: float, rotate, and shimmer
      const t = Date.now() * 0.001;
      polyhedra.forEach((mesh, idx) => {
        mesh.position.y = mesh.userData.baseY + Math.sin(t * mesh.userData.speed + mesh.userData.phase) * 1.2;
        mesh.rotateOnAxis(mesh.userData.axis, 0.008 + idx * 0.0007);
      });

      // Energy wave: animate y of each point
      const positions = wave.geometry.attributes.position;
      for (let i = 0; i < waveCount; i++) {
        positions.setY(i, Math.sin(t * 2 + i * 0.18) * 1.1 + Math.cos(t + i * 0.09) * 0.5);
      }
      positions.needsUpdate = true;

      // Animate particles (float up and down, orbit)
      particles.forEach((p, idx) => {
        p.position.y = p.userData.baseY + Math.sin(t * p.userData.speed + p.userData.phase) * 0.9;
        p.position.x = Math.cos(t * 0.13 + p.userData.angle + idx) * p.userData.radius;
        p.position.z = Math.sin(t * 0.13 + p.userData.angle + idx) * p.userData.radius;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeBackground;