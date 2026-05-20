"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Problem() {
  const points = [
    {
      title: "The Information Trap",
      description: "Finding a scholarship link is only 10% of the journey. Most students stall when the complex documentation phase begins.",
      tag: "Incomplete",
      status: "STALLED",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "The Execution Gap",
      description: "Drafting a global-standard Statement of Purpose or formatting a research CV requires strategic insight most students lack.",
      tag: "Knowledge Gap",
      status: "CRITICAL",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "The Documentation Wall",
      description: "Securing Medium of Instruction letters or tracking institutional validations often leads to missed windows and deadlines.",
      tag: "Operational Fail",
      status: "ABORTED",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section id="problem" className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="problem-grid-light" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#problem-grid-light)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            CRITICAL INSIGHT: THE EXECUTION GAP
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-medium leading-[0.95] tracking-tighter mb-8 text-slate-900">
            Why most global <br />
            <span className="text-slate-300 italic">applications fail.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl font-medium">
            The hurdle isn't finding information—it's execution. Fragmentation, missing documents, 
            and zero strategy turn a global opportunity into a missed deadline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-slate-50 border border-slate-200 p-12 group relative transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-primary/30 rounded-[2rem]"
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500 shadow-sm">
                    {point.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">
                      {point.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {point.tag}
                    </span>
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold mb-4 tracking-tight text-slate-900">{point.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium mb-12">
                  {point.description}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Completion Rate</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Critical</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: i === 0 ? "25%" : i === 1 ? "15%" : "5%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-red-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 flex items-center gap-4 text-slate-200"
        >
          <div className="h-px flex-1 bg-slate-100" />
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">BRIDGING THE GAP TO GLOBAL SUCCESS</div>
          <div className="h-px flex-1 bg-slate-100" />
        </motion.div>
      </div>
    </section>
  );
}
