"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Solution() {
  const features = [
    {
      title: "Opportunity Curation",
      description: "A high-fidelity feed of global scholarships, grants, and fellowships. Filtered by your unique profile.",
      code: "FEED",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Step-by-Step Roadmaps",
      description: "We break down complex applications into bite-sized daily milestones. You're never lost.",
      code: "MAPS",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "The Readiness Vault",
      description: "Professional templates, CV frameworks, and AI-assisted drafting to get you submission-ready.",
      code: "VAULT",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <section id="solution" className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="solution-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="black" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#solution-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                 The Success Blueprint
              </div>
              <h3 className="text-6xl md:text-8xl font-display font-medium leading-[0.95] tracking-tighter mb-8 text-slate-900">
                Your global <br />
                <span className="text-primary italic">command center.</span>
              </h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-16 max-w-xl font-medium">
                Dive isn&apos;t just a directory. It&apos;s your execution partner. We don&apos;t just show you where to go; 
                we give you the map and the equipment to ensure you arrive.
              </p>
            </motion.div>
            
            <div className="space-y-12">
              {features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold tracking-tight text-slate-900">{feature.title}</h4>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase border border-slate-200 px-2 py-0.5 rounded-lg bg-white shadow-sm">{feature.code}</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 aspect-square bg-slate-50 border border-slate-200 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-2xl"
            >
               <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
                  {[
                    { label: "Opportunities", icon: "FEED", color: "bg-white", textColor: "text-slate-900", border: "border-slate-200" },
                    { label: "Roadmaps", icon: "MAP", color: "bg-primary", textColor: "text-white", pulse: true, border: "border-primary/50" },
                    { label: "Checklists", icon: "LIST", color: "bg-white", textColor: "text-slate-900", border: "border-slate-200" },
                    { label: "Data Vault", icon: "VAULT", color: "bg-white", textColor: "text-slate-900", border: "border-slate-200" }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                      className={`${item.color} ${item.textColor} border ${item.border} rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group shadow-sm`}
                    >
                      {item.pulse && (
                        <div className="absolute top-0 right-0 p-4">
                          <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                        </div>
                      )}
                      
                      <div className="text-[10px] font-bold tracking-widest opacity-40 uppercase">{item.icon}</div>
                      <div className="font-display font-bold text-2xl tracking-tight leading-none group-hover:text-primary transition-colors">{item.label}</div>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            {/* Soft decorative glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}



