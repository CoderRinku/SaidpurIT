"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Clock, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    // Mock API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-20 relative">
        {/* Neon Blurs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-electric-cyan/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-bold px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-surface/85 backdrop-blur-md">
            System Operations
          </span>
          <h1 className="text-5xl font-black font-outfit tracking-tighter">
            CONNECT WITH SUPPORT
          </h1>
          <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed">
            Submit a support ticket or dispatch general questions directly to our engineering coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <section className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-white/5 bg-background-surface/40 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full flex items-center justify-center mx-auto text-[#00ff88]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-outfit text-white">Ticket Created</h3>
                      <p className="text-slate-400 text-xs max-w-xs mx-auto">
                        Your inquiry has been successfully queued. Our coordinators will contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      New Ticket
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold font-outfit text-white">Submit Ticket</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Inquiry topic"
                        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message Description</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide details about your project, hardware request, or system issues..."
                        rows={6}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-electric-cyan/40 outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-[#00a6ff] hover:opacity-90 text-background-deep text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-background-deep border-t-transparent" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Dispatch Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Details Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-white/5 bg-background-surface/30 space-y-6 shadow-xl">
              <h3 className="font-outfit text-lg font-bold text-white">Registry Locations</h3>
              
              <div className="space-y-4">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 h-fit text-electric-cyan">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Office Location</h4>
                    <p className="text-xs text-white leading-relaxed">
                      Saidpur IT, Saidpur Main Road,<br />
                      Nilphamari, Bangladesh
                    </p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 h-fit text-electric-cyan">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Electronic Support</h4>
                    <p className="text-xs text-white">
                      <a href="mailto:support@saidpurit.com" className="hover:underline">support@saidpurit.com</a><br />
                      <a href="mailto:sales@saidpurit.com" className="hover:underline">sales@saidpurit.com</a>
                    </p>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 h-fit text-[#b026ff]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Response SLAs</h4>
                    <p className="text-xs text-white leading-relaxed">
                      Security Audits: &lt;12-Hour response<br />
                      Custom Hardware: &lt;24-Hour response
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
