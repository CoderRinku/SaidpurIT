"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "480+", label: "Projects Completed" },
  { value: "99.8%", label: "SLA Uptime Audited" },
  { value: "1.2k+", label: "Custom PCs Assembled" },
];

const reviews = [
  {
    quote: "SaidpurIT constructed our enterprise database and reverse-engineered our old binary files with zero downtime. Exceptional tech capabilities.",
    author: "CEO, NexaCorp Systems",
    rating: 5,
  },
  {
    quote: "Ordered a custom liquid-cooled RTX 5090 system. Built, tuned, and shipped in perfect order. Truly high-end hardware service.",
    author: "Lead Tech Engineer, Apex Labs",
    rating: 5,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-background-deep px-6 overflow-hidden">
      {/* Background neon radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div className="px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-surface/80 backdrop-blur-md w-fit">
              <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-semibold">
                By The Numbers
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-outfit text-white leading-tight">
              WHY SYSTEMS TRUST SAIDPURIT
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We build systems that scale. From clean website frameworks to complex assembly benchmarks, our precision speaks for itself.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-2xl md:text-3xl font-black font-outfit text-white block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Customer Reviews / Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-2xl border border-white/5 bg-background-surface/40 p-8 flex flex-col justify-between space-y-6 shadow-lg"
              >
                {/* Rating Stars */}
                <div className="flex space-x-1">
                  {Array.from({ length: rev.rating }).map((_, rIdx) => (
                    <svg key={rIdx} className="w-4 h-4 text-electric-cyan" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>

                <div className="flex items-center space-x-3 border-t border-white/5 pt-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="font-outfit text-xs font-bold text-white">
                      {rev.author[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-outfit">
                      {rev.author}
                    </h4>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">
                      Verified Client
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
