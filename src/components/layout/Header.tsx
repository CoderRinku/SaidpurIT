"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<"services" | "shop" | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-deep/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-outfit text-2xl font-black tracking-tighter text-white">
            SAIDPUR<span className="text-electric-cyan">IT</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-neon-purple animate-pulse" />
        </div>

        {/* Mega Menu Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("services")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center space-x-1 font-outfit text-sm font-semibold tracking-wider text-slate-300 hover:text-white transition-colors py-2 uppercase">
              <span>Services</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {activeMenu === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-80 rounded-xl border border-white/10 bg-background-surface p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                >
                  <h4 className="font-outfit text-xs font-bold uppercase tracking-widest text-electric-cyan mb-4">
                    Digital Solutions
                  </h4>
                  <ul className="space-y-4">
                    {["Web Development", "App Reverse Engineering", "Search Engine Optimization", "Creative UI/UX Design"].map((item) => (
                      <li key={item}>
                        <a href="/services" className="group flex flex-col">
                          <span className="text-sm font-semibold text-white group-hover:text-electric-cyan transition-colors">
                            {item}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            Tailored enterprise solutions
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("shop")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center space-x-1 font-outfit text-sm font-semibold tracking-wider text-slate-300 hover:text-white transition-colors py-2 uppercase">
              <span>Hardware Shop</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {activeMenu === "shop" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-80 rounded-xl border border-white/10 bg-background-surface p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                >
                  <h4 className="font-outfit text-xs font-bold uppercase tracking-widest text-neon-purple mb-4">
                    Components Categories
                  </h4>
                  <ul className="space-y-4">
                    {["Processors & CPUs", "Graphics Cards (GPU)", "High-Speed Memory (RAM)", "Premium Cooling Systems"].map((item) => (
                      <li key={item}>
                        <a href="/shop" className="group flex flex-col">
                          <span className="text-sm font-semibold text-white group-hover:text-neon-purple transition-colors">
                            {item}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            Top tier hardware components
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="/about" className="font-outfit text-sm font-semibold tracking-wider text-slate-300 hover:text-white transition-colors uppercase">
            About
          </a>
        </nav>

        {/* Search bar & E-commerce interactions */}
        <div className="flex items-center space-x-6">
          
          {/* Dynamic Search Box */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search hardware..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`h-10 rounded-full border border-white/10 bg-white/5 px-5 py-2 pl-10 text-xs text-white placeholder-slate-500 outline-none transition-all duration-300 ${
                searchFocused ? "w-64 border-electric-cyan/40 bg-white/10 shadow-[0_0_15px_rgba(0,243,255,0.1)]" : "w-44"
              }`}
            />
            <svg
              className={`absolute left-3.5 top-3 h-4.5 w-4.5 transition-colors ${searchFocused ? "text-electric-cyan" : "text-slate-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Cart Icon */}
          <button className="relative p-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 text-white hover:text-electric-cyan hover:bg-white/10 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-electric-cyan text-[10px] font-bold text-background-deep">
              3
            </span>
          </button>

          {/* User Profile / CTA */}
          <a href="/portal" className="hidden sm:block">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-electric-cyan/10 to-neon-purple/10 border border-electric-cyan/30 text-xs font-bold text-white hover:border-electric-cyan/60 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all uppercase tracking-wider font-outfit cursor-pointer">
              Portal
            </button>
          </a>
        </div>

      </div>
    </header>
  );
}
