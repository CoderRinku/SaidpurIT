"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track global page scroll progress for 3D synchronization
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  // Framer Motion spring parallax setup for mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[180vh] w-full bg-background-deep"
    >
      {/* 3D background sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroCanvas scrollProgress={scrollProgress} />

        {/* Foreground glass layer elements overlay */}
        <div className="relative z-10 grid h-full w-full max-w-7xl mx-auto grid-cols-1 lg:grid-cols-12 px-6 items-center pointer-events-none">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-electric-cyan/20 bg-background-surface/80 backdrop-blur-md w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan">
                Next-Gen IT Agency & Hardware Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter font-outfit text-white leading-none"
            >
              CRAFTING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-[#4982ff] to-neon-purple">
                DIGITAL CORE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              className="text-slate-400 text-lg max-w-lg leading-relaxed font-sans"
            >
              SaidpurIT engineers digital architectures, software solutions, app reverse-engineering,
              and premium system-tier hardware under a single, unified neon-lit umbrella.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex space-x-4 pt-4"
            >
              <button className="px-8 py-4 rounded-xl font-outfit text-sm tracking-wider uppercase bg-gradient-to-r from-electric-cyan to-[#00a6ff] text-background-deep font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Book Service
              </button>
              <button className="px-8 py-4 rounded-xl font-outfit text-sm tracking-wider uppercase border border-white/10 hover:border-white/30 text-white bg-white/5 backdrop-blur-md transition-all hover:bg-white/10">
                Explore Shop
              </button>
            </motion.div>
          </div>

          {/* Right Floating Glass Cards (3D Parallax effect) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center pointer-events-auto">
            <motion.div
              style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
              className="relative w-80 h-96 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group overflow-hidden"
            >
              {/* Internal neon color overlays */}
              <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-neon-purple/20 blur-[60px]" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-electric-cyan/20 blur-[60px]" />

              <div className="flex justify-between items-start">
                <span className="text-3xl font-bold font-outfit text-white">01</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white/10 rounded-md text-white border border-white/10">
                  SYSTEM CORE
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-outfit group-hover:text-electric-cyan transition-colors">
                  Agency & Assembly
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Web Architecture, Cyber Audit, Graphic Assets, and Dedicated Hardware Solutions.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-xs font-medium text-white/50">EST. BUDGETS START AT</span>
                <span className="text-sm font-bold text-electric-cyan">$999.00</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Absolute Bottom Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
          <span className="text-xs uppercase font-outfit text-white/40 tracking-widest font-semibold">Scroll To Disassemble</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-electric-cyan rounded-full"
            />
          </div>
        </div>
      </div>
      
      {/* Spacer buffer to enable scroll triggers */}
      <div className="h-20 w-full" />
    </div>
  );
}
