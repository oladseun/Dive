import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { saveOpportunity } from "../actions";
import { Database } from "@/types/database";

type Opportunity = Database["public"]["Tables"]["opportunities"]["Row"];

export default async function OpportunityDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: opp, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !opp) {
    notFound();
  }

  const opportunity = opp as Opportunity;

  const { data: savedOpp } = await supabase
    .from("saved_opportunities")
    .select("id")
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunity.id)
    .single();

  const isSaved = !!savedOpp;

  return (
    <div className="w-full space-y-12">
      <Link 
        href="/dashboard/feed" 
        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group font-mono"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Feed
      </Link>

      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="p-8 md:p-12 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">{opportunity.type}</Badge>
              {(() => {
                const createdDate = new Date(opportunity.created_at);
                const now = new Date();
                const diffInHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
                if (diffInHours <= 24) {
                  return (
                    <span className="px-2 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-md animate-pulse shadow-lg shadow-blue-600/20">
                      NEW OPPORTUNITY
                    </span>
                  );
                }
                return null;
              })()}
              <Badge variant="secondary">{opportunity.region}</Badge>
              {opportunity.fee_naira && opportunity.fee_naira > 0 && (
                <Badge variant="success">₦{opportunity.fee_naira.toLocaleString()} Value</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 leading-tight">
              {opportunity.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8 py-8 border-y border-slate-50">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Deadline</p>
              <p className="text-lg font-bold text-slate-900">
                {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Rolling Basis'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Eligibility</p>
              <p className="text-lg font-bold text-slate-900">{opportunity.region === 'Global' ? 'Open Worldwide' : `${opportunity.region} Students`}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Source</p>
              <a 
                href={opportunity.source_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-bold text-primary hover:underline flex items-center gap-2"
              >
                Official Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">About the Opportunity</h3>
                <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {opportunity.description || 'No detailed description provided. Please check the official source for more information.'}
                </div>
              </div>

              {opportunity.requirements && opportunity.requirements.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Key Requirements</h3>
                  <ul className="space-y-3">
                    {opportunity.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/5 text-primary flex items-center justify-center text-[10px] font-bold font-mono">
                          {i + 1}
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6 sticky top-8">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 tracking-tight">Ready to start?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Saving this to your roadmap will create a personalized checklist and document vault for this specific application.
                  </p>
                </div>

                {!isSaved ? (
                  <form action={saveOpportunity.bind(null, opportunity.id)}>
                    <Button type="submit" className="w-full">
                      Save to Roadmap
                    </Button>
                  </form>
                ) : (
                  <div className="w-full py-4 bg-emerald-50 text-emerald-600 text-center text-[11px] font-bold uppercase tracking-widest rounded-xl border border-emerald-100 flex items-center justify-center gap-2 font-mono">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Opportunity Saved
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">Quick Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags?.map((tag: string) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
