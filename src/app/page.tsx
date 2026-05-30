import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import Hardware from "@/components/sections/Hardware";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background-deep text-white">
      {/* Premium Frosted Header */}
      <Header />

      <main className="flex-grow">
        {/* $2M Animated Hero Section */}
        <Hero />

        {/* Agency Services Bento Grid */}
        <Services />

        {/* Hardware Store Masonry/Grid */}
        <Hardware />

        {/* Statistics & Client Trust */}
        <WhyChooseUs />
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
