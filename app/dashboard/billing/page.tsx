import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BillingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: profile } = await (supabase
    .from("users") as any)
    .select("*")
    .eq("id", user?.id || '')
    .single();

  const isPro = profile?.tier === "pro";

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-medium tracking-tight text-slate-900">Subscription & Billing</h1>
        <p className="text-muted-foreground text-sm">Manage your Dive tier, billing history, and upcoming invoices.</p>
      </div>

      {/* Current Plan Section */}
      <div className="bg-white border border-border/50 rounded-[2.5rem] p-10 relative overflow-hidden shadow-sm">
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 ${isPro ? 'bg-indigo-500/10' : 'bg-slate-200/50'}`} />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Plan</span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-display font-medium text-slate-900">
                Dive {isPro ? 'Pro' : 'Free'}
              </h2>
              {isPro && (
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground max-w-sm mt-2">
              {isPro 
                ? "You have full access to targeted AI roadmaps, the deep CRM tracking system, and premium templates." 
                : "You are on the basic plan with generic checklists and standard tracking features."}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            {isPro ? (
              <>
                <button className="w-full py-3 px-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all">
                  Manage Subscription
                </button>
                <p className="text-[10px] text-center text-muted-foreground">Next billing date: 14 days from now</p>
              </>
            ) : (
              <button className="w-full py-3 px-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all">
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Plan Features</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Tier */}
          <div className={`p-8 rounded-3xl border transition-all ${!isPro ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100'}`}>
            <h4 className="text-xl font-display font-medium mb-2">Free</h4>
            <div className="text-2xl font-bold mb-6">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-green-500">✓</span> Global Opportunity Feed
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-green-500">✓</span> Basic Saved Lists
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="text-green-500">✓</span> Generic Application Checklists
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <span>×</span> AI Targeted Roadmaps
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <span>×</span> Deep CRM Panel & Tracking
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <span>×</span> Direct Flight Director Support
              </li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className={`p-8 rounded-3xl border transition-all ${isPro ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'}`}>
            <h4 className="text-xl font-display font-medium text-indigo-900 mb-2">Dive Pro</h4>
            <div className="text-2xl font-bold text-indigo-900 mb-6">$15<span className="text-sm font-normal text-indigo-700/60">/mo</span></div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-indigo-900/80">
                <span className="text-indigo-600">✓</span> Everything in Free
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-900/80">
                <span className="text-indigo-600">✓</span> <strong>AI Targeted Roadmaps</strong>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-900/80">
                <span className="text-indigo-600">✓</span> <strong>Deep CRM Panel & Notes</strong>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-900/80">
                <span className="text-indigo-600">✓</span> Unlimited Saved Opportunities
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-900/80">
                <span className="text-indigo-600">✓</span> Direct Flight Director Support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
