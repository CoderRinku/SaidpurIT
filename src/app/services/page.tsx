"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string; // Comma-separated list
  basePrice: number;
  estimatedDays: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Form states
  const [email, setEmail] = useState("client@saidpurit.com");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("$1k - $3k");
  const [timeline, setTimeline] = useState("Standard (30 days)");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    // Fetch products and categories to extract services (or write a separate fetch)
    // To keep it simple, we can fetch all products/categories, or we can just fetch from a static list fallback first
    const fetchServices = async () => {
      try {
        // Fallback static list in case seed hasn't run yet
        const fallbackServices = [
          {
            id: "web-architecture-id",
            name: "Web Architecture",
            slug: "web-architecture",
            description: "Next-gen SSR applications built using React, Next.js, and high-performance server architectures.",
            features: "Server-Side Rendering (SSR),Global CDN Distribution,Tailwind Custom Design,Responsive Mobile Layouts,SEO Semantic Structure",
            basePrice: 1499.00,
            estimatedDays: 14,
          },
          {
            id: "app-reverse-id",
            name: "App Reverse Engineering",
            slug: "app-reverse-engineering",
            description: "In-depth code decompilation, security auditing, protocol mapping, and API extraction.",
            features: "Decompilation audits,Binary vulnerability search,Protocol reconstruction,Security enhancement recommendations",
            basePrice: 2499.00,
            estimatedDays: 20,
          },
          {
            id: "seo-auditing-id",
            name: "SEO Auditing & Speeds",
            slug: "seo-auditing-speeds",
            description: "Algorithmic search positioning audits, page weight minimization, and core web vitals optimization.",
            features: "Core Web Vitals enhancement,Semantic schema indexing,Automated tracking integrations,Competitor keyword analysis",
            basePrice: 799.00,
            estimatedDays: 7,
          },
          {
            id: "uiux-brand-id",
            name: "Sleek UI/UX & Brand Design",
            slug: "uiux-brand-design",
            description: "Award-winning vector layouts, spatial high-fidelity prototypes, and cohesive premium identity systems.",
            features: "Figma Design Systems,Interactive motion models,Custom design assets,Brand guidelines & typography assets",
            basePrice: 999.00,
            estimatedDays: 10,
          }
        ];
        
        // Try fetching actual seeded services later if possible, but this works immediately
        setServices(fallbackServices);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load services:", err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    setBookingLoading(true);
    try {
      const response = await fetch("/api/services/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          projectBrief: brief,
          budgetRange: budget,
          timelineChoice: timeline,
          email: email,
        }),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setTimeout(() => {
          // Redirect to client portal, passing email as state query
          window.location.href = `/portal?email=${encodeURIComponent(email)}`;
        }, 2000);
      } else {
        alert("Failed to submit booking. Check if database seed was loaded.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-deep text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />

        {/* Hero Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-bold px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-surface/80 backdrop-blur-md">
            Design & Assemble Portal
          </span>
          <h1 className="text-5xl md:text-6xl font-black font-outfit tracking-tighter">
            DIGITAL AGENCY SERVICES
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Select an engineering core service below to configure your custom project brief and connect with our development team.
          </p>
        </div>

        {/* Services Listing */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-electric-cyan border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl border border-white/5 bg-background-surface/50 p-8 flex flex-col justify-between hover:border-electric-cyan/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-electric-cyan/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider border border-electric-cyan/20 text-electric-cyan bg-background-deep">
                      Core Service
                    </span>
                    <span className="text-2xl font-black font-outfit text-white">
                      Est. ${service.basePrice.toFixed(0)}+
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-outfit text-white group-hover:text-electric-cyan transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Included Deliverables:</span>
                    <ul className="grid grid-cols-1 gap-2 pt-2">
                      {service.features.split(",").map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-300 flex items-center space-x-2">
                          <span className="w-1 h-1 rounded-full bg-electric-cyan" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    TIMELINE: ~{service.estimatedDays} DAYS
                  </span>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setBookingSuccess(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-electric-cyan hover:text-background-deep hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Configure Brief
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Booking Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-background-surface p-8 shadow-2xl overflow-hidden"
              >
                {/* Neon blur backgrounds inside modal */}
                <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-electric-cyan/10 blur-[60px]" />

                {bookingSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#10b981]/20 border border-[#10b981]/40 rounded-full flex items-center justify-center mx-auto text-[#10b981] animate-bounce">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold font-outfit text-white">Brief Confirmed!</h3>
                    <p className="text-slate-400 text-xs">
                      Redirecting to your active Client Portal tracker...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold font-outfit text-white">
                        Configure Project Brief
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">
                        Service: <span className="text-electric-cyan font-bold">{selectedService.name}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Client Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors"
                        />
                      </div>

                      {/* Brief */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Project Requirements & Goals
                        </label>
                        <textarea
                          required
                          value={brief}
                          onChange={(e) => setBrief(e.target.value)}
                          placeholder="Describe what you want us to build, decompilation goals, target features..."
                          rows={4}
                          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Budget and Timeline grids */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Estimated Budget
                          </label>
                          <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs text-white focus:border-electric-cyan/40 outline-none transition-colors"
                          >
                            <option value="$1k - $3k">$1k - $3k</option>
                            <option value="$3k - $5k">$3k - $5k</option>
                            <option value="$5k - $10k">$5k - $10k</option>
                            <option value="$10k+">$10k+</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Timeline Target
                          </label>
                          <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs text-white focus:border-electric-cyan/40 outline-none transition-colors"
                          >
                            <option value="Standard (30 days)">Standard (30 days)</option>
                            <option value="Express (14 days)">Express (14 days)</option>
                            <option value="Urgent (7 days)">Urgent (7 days)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedService(null)}
                        className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-electric-cyan to-[#00a6ff] text-background-deep text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center"
                      >
                        {bookingLoading ? (
                          <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-background-deep border-t-transparent" />
                        ) : (
                          "Confirm Booking"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
