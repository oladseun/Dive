import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { saveOpportunity } from './actions'
import { Badge, Button } from "@/components/ui"
import { RealtimeOpps } from "@/components/dashboard/RealtimeOpps"
import { RefreshButton } from "@/components/dashboard/RefreshButton"

export default async function DiscoveryFeed({
  searchParams,
}: {
  searchParams: { q?: string; type?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch user profile to get interest tags
  const { data: profile, error: profileError } = await (supabase
    .from('users') as any)
    .select('interest_tags')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.warn('Profile fetch warning (might be new user):', profileError.message)
  }

  const userInterests = profile?.interest_tags || []

  // Fetch opportunities
  let query = (supabase
    .from('opportunities') as any)
    .select('*')
    .eq('is_active', true)

  if (searchParams.q) {
    query = query.ilike('title', `%${searchParams.q}%`)
  }

  if (searchParams.type) {
    query = query.eq('type', searchParams.type)
  }

  const { data: opportunities, error: oppsError } = await query.order('created_at', { ascending: false })

  if (oppsError) {
    console.error('Error fetching opportunities:', oppsError)
    // Don't crash, just show empty
  }

  // Fetch saved opportunities to hide save button
  const { data: savedOpps, error: savedError } = await (supabase
    .from('saved_opportunities') as any)
    .select('opportunity_id')
    .eq('user_id', user.id)
  
  if (savedError) {
    console.warn('Saved opportunities fetch warning:', savedError.message)
  }

  const savedIds = savedOpps?.map((s: any) => s.opportunity_id) || []

  // Matching logic
  const matchedOpportunities = (opportunities?.map((opp: any) => {
    const oppTags = Array.isArray(opp.tags) ? opp.tags : []
    const interests = Array.isArray(userInterests) ? userInterests : []
    const overlap = oppTags.filter((tag: string) => interests.includes(tag))
    const matchScore = overlap.length
    return { ...opp, matchScore }
  }) || []).sort((a: any, b: any) => (b.matchScore || 0) - (a.matchScore || 0))

  const types = ['Scholarship', 'Grant', 'Fellowship', 'Competition']

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <RealtimeOpps />
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Opportunity <span className="text-primary">Feed</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm max-w-md">
            Discover and track curated opportunities tailored to your professional profile and career goals.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <RefreshButton />
          <form className="relative min-w-[300px] group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder="Search opportunities..."
              className="w-full pl-11 pr-4 py-3 text-sm font-medium border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-slate-400"
            />
          </form>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Filter by Category</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{matchedOpportunities?.length || 0} Results Found</span>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Link
            href="/dashboard/feed"
            className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
              !searchParams.type 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            All Types
          </Link>
          {types.map((type) => (
            <Link
              key={type}
              href={`/dashboard/feed?type=${type}${searchParams.q ? `&q=${searchParams.q}` : ''}`}
              className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap font-mono ${
                searchParams.type === type 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedOpportunities && matchedOpportunities.length > 0 ? (
          matchedOpportunities.map((opp: any) => (
            <div key={opp.id} className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col group relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{opp.type}</Badge>
                  {(() => {
                    const createdDate = new Date(opp.created_at);
                    const now = new Date();
                    const diffInHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
                    if (diffInHours <= 24) {
                      return (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md animate-pulse shadow-lg shadow-blue-600/20">
                          NEW
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
                {opp.matchScore > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-mono">Strong Match</span>
                  </div>
                )}
              </div>
              
              <div className="mb-8 flex-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-snug">
                  {opp.title}
                </h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
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

                {opp.fee_naira && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Est. Value</span>
                    <span className="text-sm font-bold text-emerald-700">₦{opp.fee_naira.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {opp.tags?.slice(0, 3).map((tag: string) => (
                  <Badge key={tag}>
                    {tag.split(' ').slice(0, 3).join(' ') + (tag.split(' ').length > 3 ? '...' : '')}
                  </Badge>
                ))}
              </div>
              
                <div className="flex gap-3 pt-6 border-t border-slate-50 mt-auto">
                  <Button 
                    href={`/dashboard/feed/${opp.id}`}
                    variant="secondary"
                    className="flex-1"
                  >
                    Details
                  </Button>
                  
                  {!savedIds.includes(opp.id) ? (
                    <form action={saveOpportunity.bind(null, opp.id)} className="flex-1">
                      <Button 
                        type="submit"
                        className="w-full"
                      >
                        TRACK
                      </Button>
                    </form>
                  ) : (
                    <div className="flex-1 py-3 bg-emerald-50 text-emerald-600 text-center text-[11px] font-bold uppercase tracking-widest rounded-xl border border-emerald-100 flex items-center justify-center gap-2 font-mono">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Saved
                    </div>
                  )}
                </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
              📡
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">No Opportunities Found</h3>
            <p className="text-slate-500 text-sm font-medium mb-8 max-w-xs mx-auto">Try adjusting your search filters or check back later for new listings.</p>
            <Link href="/dashboard/feed" className="inline-block px-10 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
              Clear Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
