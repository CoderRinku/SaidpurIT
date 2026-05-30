"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-20 relative">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-electric-cyan">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Legal Document</span>
              <h1 className="text-3xl font-black font-outfit text-white tracking-tight mt-1">
                TERMS OF SERVICE
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: May 30, 2026</p>
            </div>
          </div>

          {/* Document Content */}
          <article className="space-y-8 text-xs text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                1. System Agreement & Registry
              </h2>
              <p>
                By configuring project briefs or buying products from the SaidpurIT platform, you agree to comply with our system terms. Accounts created automatically during the agency booking flow are for client tracking and compilation progression.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                2. Hardware Warranties & Distribution
              </h2>
              <p>
                All top-tier components (e.g. Graphics Cards, waterblocks, processors) distributed by SaidpurIT are subject to official manufacturer warranties. We do not provide additional coverage for liquid cooling loops assembled incorrectly by the user.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                3. Agency Deliverables & Milestones
              </h2>
              <p>
                Digital agency services (e.g. Web architectures, design guideline systems) are mapped into milestone checklists in the client portal. Development progresses based on milestone-by-milestone approval.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                4. Reverse Engineering Ethics Guidelines
              </h2>
              <p>
                Our binary audits and protocol reverse engineering services are strictly for security auditing, protocol mapping, API documentation, and code optimization. Clients must hold authorized ownership or licensing of target binaries.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
                5. System Modification
              </h2>
              <p>
                We reserve the right to modify system prices, estimated delivery days, and hardware stock logs without previous notification. All current SLAs will remain active until project compilation.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
