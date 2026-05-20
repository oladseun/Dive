"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Impact() {
  const stats = [
    {
      label: "Success Rate",
      value: "94%",
      subtext: "Application Finalization",
      color: "primary"
    },
    {
      label: "Documentation",
      value: "100%",
      subtext: "Compliance Guaranteed",
      color: "slate"
    },
    {
      label: "Global Reach",
      value: "40+",
      subtext: "Host Institutions",
      color: "slate"
    }
  ];

  return (
    <section id="impact" className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="impact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#impact-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/[0.03] text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Performance Metrics
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-medium leading-[0.95] tracking-tighter mb-12 text-slate-900">
              Validated results. <br />
              <span className="text-slate-300 italic">Global mobility.</span>
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className={`text-4xl font-display font-medium mb-2 ${stat.color === 'primary' ? 'text-primary' : 'text-slate-900'}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 italic">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-slate-50 border border-slate-200 p-12 md:p-16 relative overflow-hidden rounded-[2.5rem]">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-tight mb-12 tracking-tight">
                  "The bridge between my potential and the institution was the documentation. 
                  Dive didn't just tell me what to do—they built the application for me."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      JD
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 tracking-tight">Jared Dawson</div>
                    <div className="text-sm font-medium text-slate-500 italic">Commonwealth Scholar, 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-6 -right-6 bg-white border border-slate-100 shadow-xl p-6 rounded-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  +1.2k Students Enrolled
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
