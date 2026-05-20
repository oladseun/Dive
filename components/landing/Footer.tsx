"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="footer-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid-light)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-display font-medium tracking-tighter text-slate-900 mb-6 block">
              DIVE<span className="text-primary italic">.</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Propelling the next generation of global leaders through 
              strategic execution and documentation readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h5 className="font-bold text-[10px] mb-8 uppercase tracking-[0.3em] text-slate-300">Protocols</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Trajectory</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Diagnostics</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Vault</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] mb-8 uppercase tracking-[0.3em] text-slate-300">System</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">About</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Privacy</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] mb-8 uppercase tracking-[0.3em] text-slate-300">Frequency</h5>
              <ul className="space-y-4">
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Twitter</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Instagram</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} DIVE OPPORTUNITY MANAGEMENT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 
              SYSTEM_OPERATIONAL
            </span>
            <span className="text-slate-200 hidden md:block">|</span>
            <span className="hidden md:block">LATENCY: 12MS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
