"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Scale } from "lucide-react";

export default function SLAPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-20 relative">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />

        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-electric-cyan">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Legal Document</span>
              <h1 className="text-3xl font-black font-outfit text-white tracking-tight mt-1">
                SLA AGREEMENTS
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: May 30, 2026</p>
            </div>
          </div>

          {/* Document Content */}
          <article className="space-y-8 text-xs text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                1. Code Standards & Architecture
              </h2>
              <p>
                We guarantee all custom software builds will adhere to high-level architecture rules:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Strict TypeScript type-safety configuration.</li>
                <li>Next.js framework compilation optimized for static/dynamic rendering.</li>
                <li>Responsive layout testing across core viewport boundaries.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                2. Milestone Timelines
              </h2>
              <p>
                We agree to deliver agency builds according to the timelineChoice configured during project booking. Delay in deliverables beyond 5 working days from estimated milestone dates without prior notification entitles clients to SLA adjustments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                3. Deployment & Launch Guarantee
              </h2>
              <p>
                Milestone 4 (Final Review & Deployment) includes DNS configuration, staging deployment, SSL installation, and server speed audit reviews. We guarantee a minimum 90+ score on Google Lighthouse page speed metrics for static landing structures.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                4. Support Ticket Response SLAs
              </h2>
              <p>
                Inquiries dispatched through our system support contact are prioritized as follows:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Critical Security Vulnerabilities:</strong> &lt;12-Hour response.</li>
                <li><strong>Active Project Consultations:</strong> &lt;24-Hour response.</li>
                <li><strong>Hardware Catalog & Sales Inquiries:</strong> &lt;48-Hour response.</li>
              </ul>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
