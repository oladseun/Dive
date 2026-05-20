"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-white text-slate-900">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hero-grid-light" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-light)" />
        </svg>
      </div>

      {/* Soft Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center mb-32">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 mb-12 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
              The Elite Preparatory Platform
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-[110px] font-display font-medium leading-[0.9] tracking-tighter mb-10 text-slate-900"
          >
            Launch Your <br />
            <span className="text-primary italic">Global Career.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-16 max-w-3xl mx-auto font-medium"
          >
            Stop searching fragmented blogs. Dive gives you the curated feed 
            and the step-by-step roadmap to win your next global opportunity.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/signup" 
              className="group relative w-full sm:w-auto px-12 py-6 bg-primary text-white font-bold text-sm uppercase tracking-widest transition-all hover:bg-blue-700 hover:-translate-y-1 shadow-xl shadow-primary/20"
            >
              Start Your Roadmap
            </Link>
            <Link 
              href="#problem" 
              className="w-full sm:w-auto px-12 py-6 border border-slate-200 bg-white text-slate-900 font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-sm"
            >
              How it works
            </Link>
          </motion.div>
        </div>

        {/* Hero Product Visual - Premium Light Dashboard */}
        <motion.div 
          variants={itemVariants} 
          className="relative max-w-6xl mx-auto group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000" />
          
          <div className="relative z-10 aspect-[16/9] bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden p-8 md:p-12 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-slate-100 pb-12">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 relative overflow-hidden group">
                  <img src="https://placehold.co/64x64/002999/white?text=C" alt="Chevening" className="w-16 h-16 relative z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-4xl tracking-tight text-slate-900">Chevening Scholarship</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                      Optimal Match
                    </span>
                  </div>
                  <p className="text-slate-400 font-medium flex items-center gap-2">
                    UK Government Fellowship • Cycle 2025/2026 • 12 Weeks Remaining
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-2">Readiness Score</span>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-display font-medium text-primary">72%</span>
                    <div className="w-12 h-12 rounded-full border-[3px] border-primary border-t-slate-100 animate-spin-slow" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Roadmap Progress</span>
                    <span className="text-[10px] font-bold text-primary italic">3 of 5 Actions Complete</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Institutional Profile Optimization", status: "complete" },
                      { title: "Leadership Narrative Synthesis", status: "in-progress" },
                      { title: "Referee Validation Request", status: "pending" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          item.status === 'complete' ? 'bg-primary border-primary text-white' : 
                          item.status === 'in-progress' ? 'border-primary' : 'border-slate-200'
                        }`}>
                          {item.status === 'complete' && <span className="text-[10px] font-bold">✓</span>}
                          {item.status === 'in-progress' && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <span className={`text-sm font-bold ${item.status === 'pending' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-3xl p-10 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">Target Analytics</h4>
                    <div className="space-y-6">
                      {[
                        { label: "Narrative Alignment", value: 92 },
                        { label: "Document Compliance", value: 54 },
                        { label: "Strategic Timing", value: 85 },
                      ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-400">{stat.label}</span>
                            <span className="text-primary">{stat.value}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 1.5, delay: 1 + (i * 0.2) }}
                              className="h-full bg-primary" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-xs font-medium italic text-slate-500 leading-relaxed">
                      "System Alert: Your 'Networking' essay for Chevening lacks institutional-grade evidence. 
                      Integrate your current internship at Flutterwave to increase alignment score."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Shadows */}
          <div className="absolute -bottom-20 inset-x-20 h-20 bg-slate-200/40 blur-[100px] -z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
}

