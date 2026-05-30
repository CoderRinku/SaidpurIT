"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Briefcase, 
  GitBranch, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  RefreshCw,
  Compass
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string | null;
  completedAt: string | null;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
}

interface ServiceBooking {
  id: string;
  projectBrief: string;
  budgetRange: string;
  timelineChoice: string;
  status: string;
  createdAt: string;
  service: Service;
}

interface AgencyProject {
  id: string;
  repositoryUrl: string | null;
  stagingUrl: string | null;
  progressPercent: number;
  createdAt: string;
  booking: ServiceBooking;
  milestones: Milestone[];
}

interface ClientData {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  projects: AgencyProject[];
  bookings: ServiceBooking[];
}

export default function ClientPortal() {
  const [emailInput, setEmailInput] = useState("");
  const [emailParam, setEmailParam] = useState<string | null>(null);
  const [data, setData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract email from query params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");
      if (email) {
        setEmailParam(email);
        setEmailInput(email);
      }
    }
  }, []);

  // Fetch client data whenever emailParam changes
  const fetchPortalData = async (targetEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portal?email=${encodeURIComponent(targetEmail)}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to load tracking data");
        setData(null);
      }
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (emailParam) {
      fetchPortalData(emailParam);
    }
  }, [emailParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailParam(emailInput.trim());
      // Update browser URL query parameter without full reload
      if (typeof window !== "undefined") {
        const newUrl = `${window.location.pathname}?email=${encodeURIComponent(emailInput.trim())}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-16 relative">
        {/* Dynamic Glowing Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

        {/* Search Header for Lookup */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-outfit text-electric-cyan font-bold px-3 py-1 rounded-full border border-electric-cyan/20 bg-background-surface/80 backdrop-blur-md">
              Agency Tracking Portal
            </span>
            <h1 className="text-4xl font-black font-outfit tracking-tighter mt-3">
              CLIENT WORKSPACE
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Real-time monitoring of your custom codebases, design blueprints, and project milestones.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
            <div className="flex-grow flex h-11 rounded-xl bg-white/5 border border-white/10 px-3 items-center focus-within:border-electric-cyan/40 transition-colors">
              <Search className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
              <input
                type="email"
                required
                placeholder="Enter registered client email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className="px-5 h-11 rounded-xl bg-electric-cyan text-background-deep text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex-shrink-0 flex items-center justify-center gap-1.5"
            >
              Track
            </button>
          </form>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-96 flex-col items-center justify-center space-y-4"
            >
              <RefreshCw className="h-10 w-10 text-electric-cyan animate-spin" />
              <span className="text-slate-400 text-xs tracking-wider animate-pulse">
                RETRIEVING CLIENT DATA REGISTRY...
              </span>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto py-16 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-outfit text-white">Tracking Registry Lookup Failed</h3>
                <p className="text-slate-400 text-xs px-4">
                  {error === "Client user not found in tracking registry."
                    ? "We couldn't find any account matching this email. Check your spelling or book a service first."
                    : error}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setEmailInput("client@saidpurit.com");
                    setEmailParam("client@saidpurit.com");
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Load Demo Client
                </button>
                <a
                  href="/services"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-electric-cyan text-background-deep hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" /> Book Service
                </a>
              </div>
            </motion.div>
          ) : data ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Client Profile Intro */}
              <div className="p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-background-surface/30 to-purple-950/10 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-electric-cyan/5 blur-2xl" />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black font-outfit text-white">
                      Welcome Back, {data.user.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan uppercase tracking-wider">
                      {data.user.role}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Account: <span className="text-white font-medium">{data.user.email}</span>
                  </p>
                </div>

                <button
                  onClick={() => emailParam && fetchPortalData(emailParam)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh Board
                </button>
              </div>

              {/* ACTIVE PROJECTS SECTION */}
              <div className="space-y-6">
                <h3 className="text-lg font-black font-outfit tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-electric-cyan" /> Active Development Cores
                </h3>

                {data.projects.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/2">
                    <p className="text-slate-400 text-xs">No active development projects. Book an agency service to launch one.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-3xl border border-white/5 bg-background-surface/20 p-8 flex flex-col gap-8 shadow-2xl hover:border-electric-cyan/10 transition-colors"
                      >
                        {/* Project Header details */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 border-b border-white/5 pb-6">
                          <div className="space-y-2">
                            <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase rounded border border-[#00ff88]/20 text-[#00ff88] bg-[#00ff88]/5">
                              Active Build
                            </span>
                            <h4 className="text-2xl font-bold font-outfit text-white">
                              {proj.booking.service.name}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                              Brief: {proj.booking.projectBrief}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {proj.repositoryUrl ? (
                              <a
                                href={proj.repositoryUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                              >
                                <GitBranch className="w-3.5 h-3.5 text-purple-400" /> Git Repository
                              </a>
                            ) : (
                              <span className="px-3.5 py-2 rounded-xl bg-white/2 border border-white/5 text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <GitBranch className="w-3.5 h-3.5" /> Code Repo Pending
                              </span>
                            )}

                            {proj.stagingUrl ? (
                              <a
                                href={proj.stagingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-electric-cyan/10 hover:bg-electric-cyan/20 border border-electric-cyan/20 text-[10px] font-bold text-electric-cyan uppercase tracking-wider transition-all flex items-center gap-1.5"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> View Staging
                              </a>
                            ) : (
                              <span className="px-3.5 py-2 rounded-xl bg-white/2 border border-white/5 text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <ExternalLink className="w-3.5 h-3.5" /> Staging Pending
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress Tracker Slider bar */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="uppercase font-bold text-slate-400 tracking-wider">Compile Progression</span>
                            <span className="font-mono font-black text-electric-cyan text-sm">{proj.progressPercent}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${proj.progressPercent}%` }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-purple-500 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                            />
                          </div>
                        </div>

                        {/* Milestone Timeline Checklist */}
                        <div className="space-y-4">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Milestone Tracking Trees:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {proj.milestones.map((ms, msIdx) => (
                              <div
                                key={ms.id}
                                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                                  ms.isCompleted 
                                    ? "bg-[#00ff88]/3 border-[#00ff88]/10" 
                                    : msIdx === proj.milestones.findIndex(m => !m.isCompleted)
                                    ? "bg-electric-cyan/3 border-electric-cyan/20 shadow-[0_0_15px_rgba(0,243,255,0.05)] animate-pulse"
                                    : "bg-white/2 border-white/5 opacity-60"
                                }`}
                              >
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                                      Stage {msIdx + 1}
                                    </span>
                                    {ms.isCompleted ? (
                                      <CheckCircle2 className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                                    ) : (
                                      <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                    )}
                                  </div>
                                  <h5 className="text-sm font-bold text-white font-outfit">
                                    {ms.title}
                                  </h5>
                                  <p className="text-[11px] text-slate-400 leading-snug">
                                    {ms.description}
                                  </p>
                                </div>
                                
                                {ms.isCompleted ? (
                                  <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-[#00ff88] font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-[#00ff88]" /> Verified & Completed
                                  </div>
                                ) : msIdx === proj.milestones.findIndex(m => !m.isCompleted) ? (
                                  <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-electric-cyan font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-ping" /> Currently In Build
                                  </div>
                                ) : (
                                  <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                    Scheduled Core
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PENDING BOOKINGS SECTION */}
              {data.bookings.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-black font-outfit tracking-widest text-slate-400 uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" /> Pending Consultations & Requests
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-2xl border border-white/5 bg-background-surface/10 p-6 flex flex-col justify-between hover:border-purple-500/20 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded border border-purple-500/30 text-purple-400 bg-purple-500/5">
                              {booking.status}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold font-outfit text-white">
                              {booking.service.name}
                            </h4>
                            <p className="text-slate-400 text-xs mt-1.5 line-clamp-3">
                              Brief: {booking.projectBrief}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                          <span className="uppercase">Budget: <strong className="text-white">{booking.budgetRange}</strong></span>
                          <span className="uppercase">Timeline: <strong className="text-white">{booking.timelineChoice}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto py-24 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-electric-cyan/10 border border-electric-cyan/20 rounded-full flex items-center justify-center mx-auto text-electric-cyan">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-outfit text-white">Track Workspace Build</h3>
                <p className="text-slate-400 text-xs px-4">
                  Please enter your client email address above to pull active project metrics, milestones, and consultation statuses.
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEmailInput("client@saidpurit.com");
                    setEmailParam("client@saidpurit.com");
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Load Demo Client
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
