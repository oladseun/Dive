import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function RoadmapsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: savedOpps } = await (supabase
    .from('saved_opportunities') as any)
    .select('*, opportunities(*)')
    .eq('user_id', user.id)

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Success <span className="text-primary">Roadmap</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed">
            Track your milestones across all saved opportunities and manage your application lifecycle in one professional workspace.
          </p>
        </div>
        
        <Link 
          href="/dashboard/feed" 
          className="group flex items-center gap-3 px-8 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20"
        >
          <span>Explore Feed</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Trajectories Grid */}
      {savedOpps && savedOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {savedOpps.map((saved: any) => {
            const opp = saved.opportunities
            if (!opp) return null
            
            const progress = 35; // Mock progress

            return (
              <div key={saved.id} className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col min-h-[320px] group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                    {opp.type || 'Scholarship'}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Active Pipeline</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="mb-auto space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-snug">
                    {opp.title}
                  </h3>
                  
                  <div className="flex items-center gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Target Region</p>
                      <p className="text-xs font-bold text-slate-700">{opp.region || 'Global'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Submission Date</p>
                      <p className="text-xs font-bold text-slate-700">
                        {opp.deadline ? new Date(opp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Rolling'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-10 space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roadmap Completion</span>
                    <span className="text-sm font-bold text-primary tracking-tight">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Assets Ready</span>
                  </div>
                  
                  <Link 
                    href={`/dashboard/roadmaps/${opp.id}`} 
                    className="px-8 py-3 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary transition-all shadow-lg shadow-slate-900/10"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center py-40">
          <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm grayscale opacity-30">
            📋
          </div>
          <p className="text-slate-500 text-sm font-medium mb-8 text-center max-w-xs leading-relaxed">
            Your Success Roadmap is empty. Begin your journey by discovering opportunities that match your goals.
          </p>
          <Link 
            href="/dashboard/feed" 
            className="px-10 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20"
          >
            Find Opportunities
          </Link>
        </div>
      )}
    </div>
  )
}
