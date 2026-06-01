"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden selection:bg-blue-600/10 selection:text-blue-900">
      {/* Left Side: Form Container */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 bg-white">
        {/* Soft Background Gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f1f5f9,transparent_70%)] opacity-70" />
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 1) 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <header className="p-8 md:p-12 relative z-20">
          <Link href="/" className="inline-block group">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-xl relative overflow-hidden shadow-lg shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                <div className="w-4 h-4 border-2 border-white rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tighter text-slate-900 leading-none">
                  Dive
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase leading-none mt-1">Platform</span>
              </div>
            </motion.div>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </main>

        <footer className="p-8 md:p-12 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-slate-400 flex items-center gap-2 font-medium">
              © {new Date().getFullYear()} Dive Opportunity Management.
            </p>
            <div className="hidden md:flex gap-6 text-[11px] text-slate-400 font-medium">
              <Link href="#" className="hover:text-slate-600 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-slate-600 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-slate-600 transition-colors">Support</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Right Side: Narrative Visual (Desktop Only) */}
      <div className="hidden lg:flex flex-1 bg-slate-50 relative overflow-hidden items-center justify-center p-12 lg:p-24 border-l border-slate-100">
        {/* Soft Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.08),transparent)] opacity-100" />
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          {/* Decorative Elements */}
          <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] border border-slate-200/50 pointer-events-none rounded-[2rem]" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-200/60 to-transparent" />
          <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="mb-10 inline-flex items-center px-4 py-2 rounded-full bg-blue-600/5 border border-blue-600/10 text-blue-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-3 animate-pulse" />
              Your New Chapter Starts Here
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-display font-black text-slate-900 leading-[1.05] tracking-tightest mb-8">
              Never miss out on<br />
              <span className="text-blue-600">opportunities.</span>
            </h2>
            
            <p className="text-xl text-slate-500 leading-relaxed mb-12 font-medium max-w-sm">
              Join thousands of high-achievers using Dive to find, prepare, and win life-changing opportunities.
            </p>

            {/* Premium Data Elements */}
            <div className="grid grid-cols-2 gap-10 border-t border-slate-200 pt-10">
              <div className="space-y-1">
                <div className="text-4xl font-display font-bold text-slate-900 tracking-tighter">150+</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="text-xs font-medium text-slate-400">Daily Listings</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-display font-bold text-slate-900 tracking-tighter">98%</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="text-xs font-medium text-slate-400">User Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
