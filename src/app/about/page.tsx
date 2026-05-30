"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Cpu, ShieldCheck, Zap, Globe, Heart, Award } from "lucide-react";

export default function AboutPage() {
  const capabilities = [
    {
      icon: <Cpu className="w-6 h-6 text-electric-cyan" />,
      title: "Hardware Core distribution",
      description: "Custom loop liquid cooling, panoramic gaming chassis, and elite-benched processors for extreme workflows."
    },
    {
      icon: <Globe className="w-6 h-6 text-electric-cyan" />,
      title: "Next-Gen Web Architecture",
      description: "Server-side rendered React and Next.js platforms compiled for lightning speeds and global CDNs."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#b026ff]" />,
      title: "Binary & Security Audits",
      description: "Decompilation, API extraction, protocol mapping, and software reverse engineering security reviews."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#b026ff]" />,
      title: "Spatial Prototypes",
      description: "UI/UX Figma design systems, brand guidelines, and interactive vector mockups for tech startups."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-20 relative">
        {/* Neon blur backdrops */}
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
          <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-bold px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-surface/85 backdrop-blur-md">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tighter">
            HYBRID ENGINEERING CORE
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            SaidpurIT is a next-generation tech hub combining high-tier custom computer hardware distribution with premium software development and reverse engineering audits under a single digital roof.
          </p>
        </div>

        {/* Capabilities Grid */}
        <section className="space-y-10 mb-28">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold font-outfit text-white tracking-widest uppercase">
              Our Digital Capabilities
            </h2>
            <p className="text-xs text-slate-500 mt-1">Four dimensions of system integration and development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-white/5 bg-background-surface/30 backdrop-blur-md flex gap-6 hover:border-electric-cyan/10 transition-colors group relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-electric-cyan/5 blur-xl group-hover:bg-electric-cyan/10 transition-colors" />
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 h-fit group-hover:bg-electric-cyan/10 group-hover:border-electric-cyan/20 transition-all">
                  {cap.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-outfit text-white group-hover:text-electric-cyan transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-background-surface/40 to-[#0c0c0c] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Heart className="w-8 h-8 text-[#00ff88]" />
              <h3 className="text-xl font-bold font-outfit text-white">Our Mission</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                To equip developers, compilers, and tech enthusiasts with the most robust, high-performance computing hardware while building custom software solutions that secure, accelerate, and highlight their digital presence.
              </p>
            </div>
            <span className="text-[9px] uppercase font-bold text-[#00ff88] tracking-wider block">
              Core Objective
            </span>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-background-surface/40 to-[#0c0c0c] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Award className="w-8 h-8 text-electric-cyan" />
              <h3 className="text-xl font-bold font-outfit text-white">Our Philosophy</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We believe that software compilation and graphics rendering shouldn't be bottlenecked by standard computing setups. Custom loop assemblies and next-gen SSR codebases go hand-in-hand to build a seamless future.
              </p>
            </div>
            <span className="text-[9px] uppercase font-bold text-electric-cyan tracking-wider block">
              System Engineering Values
            </span>
          </div>

          {/* Location details */}
          <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-background-surface/40 to-[#0c0c0c] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Cpu className="w-8 h-8 text-[#b026ff]" />
              <h3 className="text-xl font-bold font-outfit text-white">Our Headquarters</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Proudly operating from Saidpur, Nilphamari, Bangladesh. We serve clients locally and internationally, routing next-generation hardware setups and digital codes across the globe.
              </p>
            </div>
            <span className="text-[9px] uppercase font-bold text-[#b026ff] tracking-wider block">
              Bangladesh Hub
            </span>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
