"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-display font-medium tracking-tighter text-slate-900">
            DIVE<span className="text-primary italic">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 border-l border-slate-200 pl-8">
            <Link href="#problem" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              The Gap
            </Link>
            <Link href="#solution" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              Roadmap
            </Link>
            <Link href="#impact" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              Impact
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors">
            Login
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-3 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-slate-800 shadow-lg shadow-slate-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}


