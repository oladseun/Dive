import Link from 'next/link';

export default function UpgradePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl lg:text-5xl font-display font-medium tracking-tight text-slate-900">
          Upgrade your <span className="text-primary italic">Trajectory.</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Unlock the full power of Dive's Intelligence Engine. Get AI-curated matches, automated application essays, and advanced tracking.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
        
        {/* Basic Tier */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
          <div className="space-y-6 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Explorer</h3>
              <p className="text-slate-500 mt-2">Essential tools for navigating opportunities.</p>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-bold text-slate-900">Free</span>
            </div>

            <div className="w-full h-px bg-slate-100 my-8" />

            <ul className="space-y-4">
              {[
                "Access to the Global Opportunity Feed",
                "Basic filtering by region and type",
                "Save up to 5 opportunities",
                "Standard checklist tracking"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <button className="w-full py-4 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-xl cursor-not-allowed">
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Pro Tier */}
        <div className="bg-slate-900 text-white border border-primary/20 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group transform transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Flight Ops Pro <span className="text-primary">✦</span>
                </h3>
                <p className="text-slate-400 mt-2">The ultimate advantage for serious applicants.</p>
              </div>
              <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                Popular
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-bold text-white">$15</span>
              <span className="text-slate-400">/ month</span>
            </div>

            <div className="w-full h-px bg-white/10 my-8" />

            <ul className="space-y-4">
              {[
                "AI-Powered Match Engine (Score > 85%)",
                "Instant AI Essay & Statement Architect",
                "Unlimited Opportunity Tracking",
                "Automated Calendar Sync & Deadlines",
                "Priority Support from Flight Directors"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Initiate Upgrade
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ or Trust Section */}
      <div className="text-center pt-16">
        <p className="text-sm text-slate-500">Secure payments powered by Stripe. Cancel anytime.</p>
      </div>

    </div>
  );
}
