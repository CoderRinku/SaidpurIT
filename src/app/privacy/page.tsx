"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-20 relative">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />

        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-electric-cyan">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Legal Document</span>
              <h1 className="text-3xl font-black font-outfit text-white tracking-tight mt-1">
                PRIVACY POLICY
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: May 30, 2026</p>
            </div>
          </div>

          {/* Document Content */}
          <article className="space-y-8 text-xs text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                1. System Data Collection
              </h2>
              <p>
                We collect personal configuration details necessary to compile services and hardware orders. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Identification metadata (name, registered email address).</li>
                <li>Client briefs, budget ranges, and project targets.</li>
                <li>Delivery information (shipping address, billing details).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                2. Encrypted Data Storage
              </h2>
              <p>
                Security is our core engineering principle. All credentials, passwords, and client databases are processed using one-way cryptographic hashing algorithms. We do not store raw credentials on our local SQLite files or deployment systems.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                3. Tracking Portal Confidentiality
              </h2>
              <p>
                Repository URLs, staging environments, and milestone logs shown in the **Client Workspace Portal** are bound to specific client emails. We restrict database queries so that only authorized client emails can pull related milestone structures.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                4. Cookies & System Telemetry
              </h2>
              <p>
                We utilize essential storage cookies to maintain state metrics (such as your shopping cart state in Zustand). These cookies are stored locally in your browser and are never transmitted to third-party data broker networks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                5. System Support Contact
              </h2>
              <p>
                For questions regarding data removal or tracking portal queries, please dispatch a ticket through our [Contact Page](/contact) or contact support at `support@saidpurit.com`.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
