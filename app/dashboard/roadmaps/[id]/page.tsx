import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import TaskList from './task-list'
import { generateGoogleCalendarUrl } from '@/lib/calendar'

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch opportunity details
  const { data: opportunity } = await (supabase
    .from('opportunities') as any)
    .select('*')
    .eq('id', id)
    .single()

  if (!opportunity) {
    return notFound()
  }

  // Check if saved
  const { data: saved } = await (supabase
    .from('saved_opportunities') as any)
    .select('*')
    .eq('user_id', user.id)
    .eq('opportunity_id', id)
    .single()

  if (!saved) {
    return redirect('/dashboard/feed')
  }

  // Fetch user profile to check tier
  const { data: profile } = await (supabase
    .from('users') as any)
    .select('tier')
    .eq('id', user.id)
    .single()

  // Fetch tasks
  let { data: tasks } = await (supabase
    .from('tasks') as any)
    .select('*')
    .eq('user_id', user.id)
    .eq('opportunity_id', id)
    .order('day_number', { ascending: true })

  // If no tasks, generate them
  if (tasks && tasks.length === 0) {
    let defaultTasks: any[] = []

    if (profile?.tier === 'pro') {
      // Dynamic AI Generation for PRO users
      const { generateTargetedTasks } = await import('@/lib/ai/task-generator')
      const generatedTasks = await generateTargetedTasks(opportunity)
      defaultTasks = generatedTasks.map((t: any) => ({
        opportunity_id: id,
        user_id: user.id,
        title: t.title,
        day_number: t.day_number,
        notes: t.notes || null,
        link_url: t.link_url || null,
        status: 'todo'
      }))
    } else {
      // Generic Generation for FREE users
      defaultTasks = [
        { opportunity_id: id, user_id: user.id, title: "Review Scholarship Requirements", day_number: 1 },
        { opportunity_id: id, user_id: user.id, title: "Check Eligibility (Age, Region, Academic)", day_number: 2 },
        { opportunity_id: id, user_id: user.id, title: "Gather Academic Transcripts", day_number: 4 },
        { opportunity_id: id, user_id: user.id, title: "Draft Personal Statement / SOP", day_number: 7 },
        { opportunity_id: id, user_id: user.id, title: "Request Recommendations", day_number: 10 },
        { opportunity_id: id, user_id: user.id, title: "Final Review and Editing", day_number: 14 },
        { opportunity_id: id, user_id: user.id, title: "Submit Application", day_number: 15 },
      ]
    }

    const { data: newTasks, error } = await (supabase
      .from('tasks') as any)
      .insert(defaultTasks)
      .select()
    
    if (!error) {
      tasks = newTasks
    }
  }

  const completedCount = tasks?.filter((t: any) => t.is_complete).length || 0
  const progress = tasks && tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/roadmaps" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Flight Ops</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">Sync Online</span>
        </div>
      </div>

      {/* Hero Mission Control Card */}
      <div className="relative overflow-hidden bg-white border border-border/50 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl shadow-black/5">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                {opportunity.type}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Mission ID: {id.slice(0, 8).toUpperCase()}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-display font-medium leading-[1.1] tracking-tight text-foreground">
              {opportunity.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl grayscale">📅</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Launch Window</span>
                  <span className="text-sm font-bold text-foreground">
                    {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'Rolling Enrollment'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl grayscale">📍</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Target Orbit</span>
                  <span className="text-sm font-bold text-foreground">{opportunity.region || 'Global Reach'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-72 space-y-4">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Propulsion Status</span>
              <span className="text-4xl font-display font-medium text-primary leading-none">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-border/50 p-0.5">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] font-bold text-center text-muted-foreground/60 italic tracking-wide">
              {progress === 100 ? 'Mission Objectives Secured' : 'Systems initializing... full burn required.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Task Sequence */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-medium flex items-center gap-4">
              <span className="p-2 bg-primary/5 rounded-xl border border-primary/10">🚀</span>
              <span>Launch Sequence</span>
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              {completedCount}/{tasks?.length} Completed
            </span>
          </div>
          
          <div className="bg-white border border-border/50 rounded-[2rem] p-4 shadow-sm">
            <TaskList tasks={tasks || []} opportunityId={id} userId={user.id} userTier={profile?.tier || 'free'} opportunity={opportunity} profile={profile} />
          </div>
        </div>

        {/* Payload / Context */}
        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Payload Requirements</h4>
            </div>
            
            <div className="bg-surface/30 border border-border/50 rounded-3xl p-8 space-y-6">
              {opportunity.requirements && opportunity.requirements.length > 0 ? (
                opportunity.requirements.map((req: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1 w-6 h-6 rounded-lg border-2 border-border flex items-center justify-center text-[10px] font-black group-hover:border-primary group-hover:text-primary transition-all flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      {req}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No specific documentation requirements listed for this path.</p>
              )}
            </div>
          </div>

          {/* Calendar Sync */}
          {opportunity.deadline && (
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors rounded-3xl" />
              <div className="relative bg-white border border-blue-500/10 rounded-3xl p-8 space-y-4">
                <div className="flex items-center gap-3 text-blue-500">
                  <span className="text-xl">📅</span>
                  <h4 className="font-black text-[10px] uppercase tracking-widest">Calendar Sync</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Never miss the launch window. Add the final deadline to your calendar now.
                </p>
                <div className="pt-2">
                  <a 
                    href={generateGoogleCalendarUrl({
                      title: `Deadline: ${opportunity.title}`,
                      description: `Opportunity Deadline: ${opportunity.title}\n\nReview Requirements: https://dive-seven.vercel.app/dashboard/roadmaps/${id}`,
                      date: new Date(opportunity.deadline)
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Calendar
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Intelligence Brief */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors rounded-3xl" />
            <div className="relative bg-white border border-primary/10 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="text-xl">💡</span>
                <h4 className="font-black text-[10px] uppercase tracking-widest">Intelligence Brief</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Applying early increases your chances by up to 40%. Our trajectory models suggest aiming for 100% completion at least 5 days prior to the launch window.
              </p>
              <div className="pt-4">
                <div className="w-full h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-black rounded-3xl text-white space-y-4 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-xs font-black uppercase tracking-widest relative z-10">Need Assistance?</h4>
            <p className="text-xs text-white/60 leading-relaxed relative z-10">Connect with an flight director to review your payload before final ignition.</p>
            <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all relative z-10">
              Request Director Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
