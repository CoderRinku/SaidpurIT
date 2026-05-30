"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 2000);
  };

  return (
    <footer className="relative bg-background-deep border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Info and Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-outfit text-2xl font-black tracking-tighter text-white block">
              SAIDPUR<span className="text-electric-cyan">IT</span>
            </span>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              SaidpurIT combines bleeding-edge web/security agency services with high-tier computer hardware distribution under a single, unified digital shell.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                SUBSCRIBE TO THE SYSTEM UPDATE
              </span>
              <div className="flex h-12 rounded-xl bg-white/5 border border-white/10 p-1 focus-within:border-electric-cyan/40 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="flex-grow bg-transparent px-4 text-xs text-white placeholder-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-6 rounded-lg bg-gradient-to-r from-electric-cyan to-[#00a6ff] text-background-deep text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                >
                  {subscribed ? "Syncing..." : "Sync"}
                </button>
              </div>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-outfit text-xs font-bold uppercase tracking-widest text-slate-400">
              Agency
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="/services" className="hover:text-electric-cyan transition-colors">Web Apps</a></li>
              <li><a href="/services" className="hover:text-electric-cyan transition-colors">Reverse Audit</a></li>
              <li><a href="/services" className="hover:text-electric-cyan transition-colors">SEO Optimizations</a></li>
              <li><a href="/services" className="hover:text-electric-cyan transition-colors">Graphic Assets</a></li>
            </ul>
          </div>

          {/* Column 3: Hardware Shop */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-outfit text-xs font-bold uppercase tracking-widest text-slate-400">
              Hardware
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="/shop" className="hover:text-neon-purple transition-colors">Processors</a></li>
              <li><a href="/shop" className="hover:text-neon-purple transition-colors">Graphics Cards</a></li>
              <li><a href="/shop" className="hover:text-neon-purple transition-colors">DDR5 Memory</a></li>
              <li><a href="/shop" className="hover:text-neon-purple transition-colors">Custom Liquid Kits</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-outfit text-xs font-bold uppercase tracking-widest text-slate-400">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/sla" className="hover:text-white transition-colors">SLA Agreements</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">System Support</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
          <span>&copy; {new Date().getFullYear()} SaidpurIT. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://github.com" className="hover:text-electric-cyan transition-colors">GitHub</a>
            <a href="https://twitter.com" className="hover:text-electric-cyan transition-colors">Twitter</a>
            <a href="https://discord.com" className="hover:text-electric-cyan transition-colors">Discord</a>
          </div>
        </div>

        {/* Large Animated Marquee Background text at the very bottom */}
        <div className="absolute -bottom-16 left-0 right-0 pointer-events-none select-none overflow-hidden h-36 opacity-[0.01]">
          <span className="font-outfit text-[120px] font-black text-white whitespace-nowrap block animate-marquee uppercase tracking-tighter">
            SaidpurIT - System Architecture - Custom Assemblies - Agency Core - 
          </span>
        </div>

      </div>
    </footer>
  );
}
