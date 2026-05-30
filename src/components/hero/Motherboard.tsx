"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MotherboardProps {
  scrollProgress: number; // Value from 0 to 1
}

export default function Motherboard({ scrollProgress }: MotherboardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const circuitCount = 60;

  // Generate random procedural glowing paths representing motherboard traces
  const circuits = useMemo(() => {
    const temp = [];
    for (let i = 0; i < circuitCount; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 8;
      const startY = (Math.random() - 0.5) * 8;
      const startZ = (Math.random() - 0.5) * 4;

      points.push(new THREE.Vector3(startX, startY, startZ));

      // Make circuit bend at 90-degree angles
      let currentX = startX;
      let currentY = startY;
      let currentZ = startZ;

      for (let j = 0; j < 3; j++) {
        const dir = Math.floor(Math.random() * 3);
        const distance = (Math.random() - 0.5) * 2;
        if (dir === 0) currentX += distance;
        else if (dir === 1) currentY += distance;
        else currentZ += distance;

        points.push(new THREE.Vector3(currentX, currentY, currentZ));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      temp.push(curve);
    }
    return temp;
  }, []);

  // Memoize circuits JSX to prevent re-instantiating TubeGeometry on every scroll/render
  const circuitsJSX = useMemo(() => {
    return circuits.map((curve, idx) => (
      <line key={idx}>
        <tubeGeometry args={[curve, 20, 0.008, 4, false]} />
        <meshBasicMaterial
          color={idx % 2 === 0 ? "#00f3ff" : "#b026ff"}
          transparent
          opacity={0.3 + Math.sin(idx + Math.random()) * 0.2}
        />
      </line>
    ));
  }, [circuits]);

  // Memoize particle positions to prevent recreation of Float32Array on every render
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  // Frame update loop
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Handle auto-rotation
    groupRef.current.rotation.y = time * 0.05 + scrollProgress * 1.5;
    groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1 + scrollProgress * 0.8;

    // 2. Disassemble parts on scroll
    // Children shift apart based on scrollProgress
    groupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        // Floating component index base
        const modifier = index % 2 === 0 ? 1 : -1;
        // Shift outward
        child.position.z = child.userData.initialZ + scrollProgress * 5 * modifier;
        // Increase spin on scroll
        child.rotation.y += 0.005 + scrollProgress * 0.02;
        child.rotation.x += 0.002;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Procedural Motherboard traces (Memoized to prevent lag) */}
      {circuitsJSX}

      {/* 2. Central Processing Unit (CPU) */}
      <mesh position={[0, 0, 0]} userData={{ initialZ: 0 }}>
        <boxGeometry args={[1.8, 1.8, 0.1]} />
        <meshPhysicalMaterial
          color="#0f0f0f"
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* CPU Heat sink / Outer shell */}
      <mesh position={[0, 0, 0.06]} userData={{ initialZ: 0.06 }}>
        <boxGeometry args={[1.2, 1.2, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          emissive="#b026ff"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* 3. High resolution graphics card (GPU) - Floating representation */}
      <mesh position={[2.2, 1.2, 0.5]} userData={{ initialZ: 0.5 }}>
        <boxGeometry args={[1.5, 0.8, 0.2]} />
        <meshPhysicalMaterial
          color="#0c0c0c"
          roughness={0.2}
          metalness={0.8}
          transmission={0.4} // Glass shader look
          thickness={0.5}
        />
      </mesh>

      {/* GPU Fan 1 */}
      <mesh position={[1.8, 1.2, 0.61]} userData={{ initialZ: 0.61 }}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 12]} />
        <meshBasicMaterial color="#00f3ff" wireframe />
      </mesh>

      {/* GPU Fan 2 */}
      <mesh position={[2.6, 1.2, 0.61]} userData={{ initialZ: 0.61 }}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 12]} />
        <meshBasicMaterial color="#00f3ff" wireframe />
      </mesh>

      {/* 4. RAM Modules */}
      {[-0.6, -0.4, -0.2, 0.0].map((offsetX, idx) => (
        <mesh
          key={idx}
          position={[-2.0 + offsetX, 0, 0.2]}
          userData={{ initialZ: 0.2 }}
        >
          <boxGeometry args={[0.1, 1.2, 0.15]} />
          <meshPhysicalMaterial
            color="#111"
            emissive={idx % 2 === 0 ? "#00f3ff" : "#b026ff"}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Ambient neural grid particles (Memoized Float32Array to save memory GC) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00f3ff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
