"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="py-32 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              THE JOURNEY TO SUCCESS
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium leading-[0.95] tracking-tight mb-8 text-slate-900">
              The application gap <br />
              <span className="text-primary italic">is where dreams stall.</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-12 font-medium">
              Every year, over 50,000 Nigerian graduates search for global scholarships. 
              They find the links. They bookmark the pages. But most never finish the application.
            </p>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="text-4xl font-display font-bold text-primary/20">01</div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-slate-900">The Discovery Phase</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Finding links is easy. This creates a false sense of progress. 
                    Most students stop here, thinking the journey is halfway done.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-4xl font-display font-bold text-primary/20">02</div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-slate-900">The Documentation Wall</h4>
                  <p className="text-slate-500 leading-relaxed">
                    The real work involves 4-part essays, institutional validations, 
                    and complex criteria that require precise strategy and timing.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-4xl font-display font-bold text-primary/20">03</div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-tight text-slate-900">The Dropout Zone</h4>
                  <p className="text-slate-500 leading-relaxed">
                    98% of candidates hit the "90-day wall"—where documentation 
                    complexity outweighs their capacity to execute without a roadmap.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-50 rounded-[3rem] border border-slate-200 overflow-hidden p-12 relative group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
              
              {/* Tactical Visualization of the "Wall" */}
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Statistical Analysis</span>
                    <h3 className="text-2xl font-bold mt-1 uppercase tracking-tight italic text-slate-900">Candidate Drop-off</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-5xl font-display font-bold text-red-500">98%</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-1">Abandonment Rate</p>
                  </div>
                </div>

                <div className="relative h-64 flex items-end gap-2 px-4">
                  {[40, 65, 85, 100, 30, 20, 15, 10, 5, 2].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`flex-1 rounded-t-sm ${i < 4 ? 'bg-primary/40' : 'bg-red-500/40'} relative group/bar border-t border-x border-slate-200`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-[8px] font-bold whitespace-nowrap text-slate-900">
                        DAY {i * 10}
                      </div>
                    </motion.div>
                  ))}
                  <div className="absolute left-[40%] top-0 bottom-0 w-px bg-red-200 border-l border-dashed border-red-400" />
                  <div className="absolute left-[42%] top-0 text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50/50 border border-red-200 px-2 py-1 rotate-90 origin-left">
                    THE EXECUTION WALL
                  </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <p className="text-sm font-medium leading-relaxed text-slate-600 italic">
                    "We observed a critical drop-off in candidate activity between Discovery and Documentation. 
                    Dive was built to stabilize this journey."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating metrics */}
            <div className="absolute -bottom-10 -right-10 bg-slate-900 p-6 rounded-2xl shadow-2xl text-white max-w-[200px] border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">The Mission</span>
              <p className="text-sm font-bold mt-2 leading-snug uppercase">Enabling success through structured preparation.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern id="story-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#story-grid-light)" />
        </svg>
      </div>
    </section>
  );
}

