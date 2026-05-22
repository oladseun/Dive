'use client'

type RoadmapTask = {
  id: string
  title: string
  day_number: number | null
  due_date: string | null
  is_complete: boolean
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function RoadmapView({ tasks }: { tasks: RoadmapTask[] }) {
  // Sort tasks by day_number, then due_date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.day_number !== null && b.day_number !== null) {
      return a.day_number - b.day_number
    }
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    }
    return 0
  })

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900">Actionable Roadmap</h3>
        <p className="text-sm text-slate-500">Your step-by-step guide to applying.</p>
      </div>

      <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
        {sortedTasks.map((task, idx) => {
          const isPast = task.due_date && new Date(task.due_date) < new Date() && !task.is_complete

          return (
            <div key={task.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${
                task.is_complete 
                  ? 'bg-emerald-500' 
                  : isPast 
                    ? 'bg-red-500' 
                    : 'bg-primary'
              }`} />
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                    {task.day_number ? `Day ${task.day_number}` : 'Milestone'}
                  </span>
                  {task.due_date && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                      isPast ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {formatDate(task.due_date)}
                    </span>
                  )}
                </div>
                
                <h4 className={`text-base font-semibold ${
                  task.is_complete ? 'text-slate-400 line-through' : 'text-slate-900'
                }`}>
                  {task.title}
                </h4>
              </div>
            </div>
          )
        })}

        {sortedTasks.length === 0 && (
          <p className="text-sm text-slate-500 italic pl-8">Your roadmap is being generated...</p>
        )}
      </div>
    </div>
  )
}
