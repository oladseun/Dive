import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { RequirementChecklist } from '@/components/tracker/RequirementChecklist'
import { RoadmapView } from '@/components/tracker/RoadmapView'
import { toggleTaskStatus } from '../actions'
import Link from 'next/link'

export default async function TrackerPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch the saved opportunity
  const { data: savedOpp, error } = await supabase
    .from('saved_opportunities')
    .select(`
      *,
      opportunities (*)
    `)
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error || !savedOpp) {
    return redirect('/dashboard/saved')
  }

  const opp = savedOpp.opportunities as any

  // Fetch tasks for this user & opportunity
  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('*')
    .eq('opportunity_id', opp.id)
    .eq('user_id', user.id)
    .order('day_number', { ascending: true })

  if (tasksError) {
    console.error('Error fetching tasks:', tasksError)
  }

  const allTasks = tasks || []

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <div>
        <Link href="/dashboard/saved" className="text-sm text-slate-500 hover:text-primary mb-4 inline-flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Saved
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-2">{opp.title}</h1>
        <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-mono text-[10px] uppercase tracking-wider font-bold">
            {savedOpp.status.replace('_', ' ')}
          </span>
          {opp.region && <span>• {opp.region}</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Requirements Checklist */}
        <div className="lg:col-span-5">
          <RequirementChecklist 
            tasks={allTasks} 
            onToggle={async (taskId, isComplete) => {
              'use server'
              await toggleTaskStatus(taskId, isComplete)
            }} 
          />
        </div>

        {/* Right Column: Roadmap View */}
        <div className="lg:col-span-7">
          <RoadmapView tasks={allTasks} />
        </div>
      </div>
    </div>
  )
}
