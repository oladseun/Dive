import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Badge, Button } from "@/components/ui"
import { generateGoogleCalendarUrl, downloadIcsFile } from '@/lib/calendar'

export default async function SavedOpportunitiesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch saved opportunities with the linked opportunity data
  const { data: savedOpps, error } = await supabase
    .from('saved_opportunities')
    .select(`
      id,
      status,
      created_at,
      opportunity_id,
      opportunities (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved opportunities:', error)
  }

  const items = savedOpps || []

  // Helper for status badge styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'won': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').toUpperCase()
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Saved <span className="text-primary">Opportunities</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-md">
            Track the status of your applications and manage your requirements checklists here.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item: any) => {
            const opp = item.opportunities || {}
            return (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col relative group">
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">{opp.type || 'Opportunity'}</Badge>
                  </div>
                  <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border font-mono ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </div>
                </div>
                
                <div className="mb-8 flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-snug line-clamp-2">
                    {opp.title || 'Untitled'}
                  </h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">Deadline</p>
                      <p className="text-xs font-bold text-slate-700">
                        {(() => {
                          if (!opp.deadline) return 'Rolling Basis'
                          const date = new Date(opp.deadline)
                          return isNaN(date.getTime()) ? 'Rolling Basis' : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        })()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">Scope</p>
                      <p className="text-xs font-bold text-slate-700">{opp.region || 'Global Reach'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-6 border-t border-slate-50 mt-auto">
                  <Button 
                    href={`/dashboard/tracker/${item.id}`}
                    className="w-full"
                  >
                    Open Tracker
                  </Button>
                </div>

              </div>
            )
          })
        ) : (
          <div className="col-span-full py-32 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
              📋
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">No Tracked Opportunities</h3>
            <p className="text-slate-500 text-sm font-medium mb-8 max-w-xs mx-auto">You haven't saved any opportunities yet. Browse the feed and save items to track them here.</p>
            <Link href="/dashboard/feed" className="inline-block px-10 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
              Go to Feed
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
