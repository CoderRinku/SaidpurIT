"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    name: "AORUS RTX 5090 Xtreme Waterforce",
    category: "Graphics Cards",
    price: 2499.00,
    comparePrice: 2799.00,
    badge: "In Stock",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop", // placeholder or reference
  },
  {
    name: "Ryzen 9 9950X3D 16-Core Processor",
    category: "Processors",
    price: 699.00,
    comparePrice: 749.00,
    badge: "Hot Buy",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "G.Skill Trident Z5 Royal Neo 64GB DDR5",
    category: "Memory (RAM)",
    price: 289.00,
    comparePrice: 320.00,
    badge: "New Release",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Lian Li O11 Dynamic EVO RGB (Custom Tech)",
    category: "Chassis",
    price: 199.00,
    badge: "Restocked",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Hardware() {
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (name: string) => {
    setAddedItems((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [name]: false }));
    }, 1500);
  };

  return (
    <section className="relative py-24 bg-background-surface px-6 border-y border-white/5 overflow-hidden">
      {/* Background neon dots */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-electric-cyan/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <div className="px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-deep/80 backdrop-blur-md w-fit">
              <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-semibold">
                Rig Assembly Hub
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-outfit text-white">
              PREMIUM HARDWARE
            </h2>
          </div>
          <a href="/shop" className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-cyan hover:text-white transition-colors group">
            <span>View Full Catalog</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/5 bg-background-deep/50 p-4 flex flex-col justify-between group hover:border-white/15 hover:bg-background-deep/90 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Product Image Wrapper */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white/5 border border-white/5 mb-4">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                
                {/* Badge Overlay */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-background-deep/80 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  {prod.badge}
                </span>
              </div>

              {/* Product Info */}
              <div className="space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">
                    {prod.category}
                  </span>
                  <h3 className="font-outfit text-base font-bold text-white mt-1 group-hover:text-electric-cyan transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-white font-outfit">
                      ${prod.price.toFixed(2)}
                    </span>
                    {prod.comparePrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${prod.comparePrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={() => handleAddToCart(prod.name)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      addedItems[prod.name]
                        ? "bg-[#10b981] text-white"
                        : "bg-white/5 border border-white/10 hover:bg-electric-cyan hover:text-background-deep hover:border-transparent hover:scale-105"
                    }`}
                  >
                    {addedItems[prod.name] ? "Added!" : "Buy"}
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
