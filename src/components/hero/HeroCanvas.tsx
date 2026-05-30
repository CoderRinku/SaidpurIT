"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Motherboard from "./Motherboard";

interface HeroCanvasProps {
  scrollProgress: number;
}

export default function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-background-deep overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        {/* Glow helper lights */}
        <pointLight position={[-4, 2, 2]} intensity={2.0} color="#b026ff" />
        <pointLight position={[4, -2, 2]} intensity={2.5} color="#00f3ff" />

        <Motherboard scrollProgress={scrollProgress} />
        
        {/* Enable subtle mouse orbiting without hijacking wheel scrolls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      {/* Backdrop glowing grid overlay for scale */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}
