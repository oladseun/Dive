"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function Trust() {
  const partners = [
    { 
      name: "Chevening", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
        </svg>
      )
    },
    { 
      name: "MasterCard", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
          <path d="M12 8v8" strokeDasharray="2 2" />
        </svg>
      )
    },
    { 
      name: "DAAD", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M9 9h6v6H9z" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 4v16M4 12h16" strokeOpacity="0.3" />
        </svg>
      )
    },
    { 
      name: "Fulbright", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
          <circle cx="12" cy="12" r="10" strokeDasharray="1 3" />
        </svg>
      )
    },
    { 
      name: "Erasmus+", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
          <path d="M16 4l-4 4-4-4" />
        </svg>
      )
    },
    { 
      name: "Commonwealth", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <path d="M4 22V15" />
          <circle cx="12" cy="12" r="8" strokeOpacity="0.2" />
        </svg>
      )
    },
    { 
      name: "Opportunity Desk", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    { 
      name: "Youth Opportunities", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
              OPTIMIZED FOR THE WORLD'S ELITE SCHOLARSHIPS
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-12">
            {partners.map((partner, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
              >
                <div className="w-8 h-8 flex items-center justify-center text-slate-400 group-hover:text-primary">
                  {partner.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


