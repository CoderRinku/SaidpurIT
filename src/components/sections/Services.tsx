"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Architecture",
    description: "Next-gen SSR applications built using React, Next.js, and high-performance server architectures.",
    badge: "Web Dev",
    gridClass: "lg:col-span-8",
    color: "cyan",
    features: ["Server-Side Rendering (SSR)", "Global CDN Distribution", "Tailwind Custom Design"],
  },
  {
    title: "App Reverse Engineering",
    description: "In-depth code decompilation, security auditing, protocol mapping, and API extraction.",
    badge: "Security",
    gridClass: "lg:col-span-4",
    color: "purple",
    features: ["Decompilation audits", "Binary vulnerability search", "Protocol reconstruction"],
  },
  {
    title: "SEO Auditing & Speeds",
    description: "Algorithmic search positioning audits, page weight minimization, and core web vitals optimization.",
    badge: "Growth",
    gridClass: "lg:col-span-4",
    color: "purple",
    features: ["Core Web Vitals", "Semantic schema indexing", "Automated tracking integrations"],
  },
  {
    title: "Sleek UI/UX & Brand Design",
    description: "Award-winning vector layouts, spatial high-fidelity prototypes, and cohesive premium identity systems.",
    badge: "Creative",
    gridClass: "lg:col-span-8",
    color: "cyan",
    features: ["Figma Design Systems", "Interactive motion models", "Custom design asserts"],
  },
];

export default function Services() {
  return (
    <section className="relative py-24 bg-background-deep px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="px-3 py-1 rounded-full border border-neon-purple/20 bg-background-surface/80 backdrop-blur-md w-fit">
            <span className="text-xs uppercase tracking-widest font-outfit text-neon-purple font-semibold">
              Agency Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-outfit text-white">
            WE ENGINEER THE FUTURE
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            Our specialized tech division works on deploying production-level code, cracking app structures, and creating digital interfaces that stand out.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {services.map((service, idx) => {
            const isCyan = service.color === "cyan";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl border border-white/5 bg-background-surface/50 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden group hover:border-${isCyan ? "electric-cyan" : "neon-purple"}/20 transition-all duration-300 ${service.gridClass}`}
              >
                {/* Floating Glow on Hover */}
                <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${isCyan ? "bg-electric-cyan/5" : "bg-neon-purple/5"} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div>
                  {/* Badge */}
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider border bg-background-deep w-fit ${
                    isCyan ? "border-electric-cyan/20 text-electric-cyan" : "border-neon-purple/20 text-neon-purple"
                  }`}>
                    {service.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-outfit text-white mt-6 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* Features Listing */}
                <div className="mt-8 border-t border-white/5 pt-6 flex flex-wrap gap-3">
                  {service.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-medium text-slate-300 border border-white/5 flex items-center space-x-1.5"
                    >
                      <span className={`w-1 h-1 rounded-full ${isCyan ? "bg-electric-cyan" : "bg-neon-purple"}`} />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
