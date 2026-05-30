import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaidpurIT | Premium Agency & E-Commerce Tech Hub",
  description: "Next-gen web development, custom software design, application reverse-engineering, and high-performance computing hardware under a single, neon-lit digital core.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050505] text-[#f8fafc] font-sans selection:bg-[#00f3ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
