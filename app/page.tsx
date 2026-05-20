import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Story from "@/components/landing/Story";
import Solution from "@/components/landing/Solution";
import Trust from "@/components/landing/Trust";
import Impact from "@/components/landing/Impact";
import Footer from "@/components/landing/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Trust />
      <Story />
      <Problem />
      <Solution />
      <Impact />
      
      {/* Final CTA Section */}
      <section className="py-48 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-12">
              READY TO DIVE?
            </div>
            <h2 className="text-7xl md:text-[100px] font-display font-medium leading-[0.95] tracking-tighter mb-12 text-slate-900">
              Your next chapter <br />
              <span className="text-primary italic">begins with a Dive.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              Join Nigeria's preparatory elite. Stop searching fragmented blogs. 
              Start your mission-critical roadmap today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/signup" 
                className="group relative w-full sm:w-auto px-12 py-6 bg-primary text-white font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-700 hover:-translate-y-1 shadow-xl shadow-primary/20"
              >
                GET STARTED NOW
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-12 py-6 border border-slate-200 bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-sm"
              >
                ACCESS ACCOUNT
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full">
            <pattern id="cta-grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-grid-light)" />
          </svg>
        </div>
      </section>

      <Footer />
    </main>
  );
}

