'use client'

import { useState, useEffect } from 'react'
import { TaskDetailPanel } from './TaskDetailPanel'
import { generateGoogleCalendarUrl } from '@/lib/calendar'

type RoadmapTask = {
  id: string
  title: string
  day_number: number | null
  due_date: string | null
  is_complete: boolean
  status: string
  notes: string | null
  link_url: string | null
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function RoadmapView({ tasks }: { tasks: RoadmapTask[] }) {
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null)
  const [localTasks, setLocalTasks] = useState<RoadmapTask[]>(tasks)

  useEffect(() => {
    setLocalTasks(tasks)
  }, [tasks])

  // Sort tasks by day_number, then due_date
  const sortedTasks = [...localTasks].sort((a, b) => {
    if (a.day_number !== null && b.day_number !== null) {
      return a.day_number - b.day_number
    }
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    }
    return 0
  })

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900">Actionable Roadmap</h3>
          <p className="text-sm text-slate-500">Your step-by-step guide to applying.</p>
        </div>

        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
          {sortedTasks.map((task, idx) => {
            const isPast = task.due_date && new Date(task.due_date) < new Date() && !task.is_complete

            return (
              <div 
                key={task.id} 
                className="relative pl-8 cursor-pointer group"
                onClick={() => setSelectedTask(task)}
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white transition-all group-hover:scale-125 ${
                  task.is_complete 
                    ? 'bg-emerald-500' 
                    : task.status === 'in_progress'
                      ? 'bg-orange-500'
                      : isPast 
                        ? 'bg-red-500' 
                        : 'bg-primary'
                }`} />
                
                <div className="flex flex-col gap-1 p-3 -mt-3 rounded-xl transition-colors group-hover:bg-slate-50 border border-transparent group-hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                      {task.day_number ? `Day ${task.day_number}` : 'Milestone'}
                    </span>
                    {task.due_date && (
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                          isPast ? 'text-red-500' : 'text-slate-400'
                        }`}>
                          {formatDate(task.due_date)}
                        </span>
                        {!task.is_complete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(generateGoogleCalendarUrl({
                                title: task.title,
                                description: task.notes || undefined,
                                date: new Date(task.due_date!)
                              }), '_blank');
                            }}
                            className="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 font-bold uppercase tracking-widest transition-colors font-mono"
                          >
                            + Cal
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <h4 className={`text-base font-semibold ${
                    task.is_complete ? 'text-slate-400 line-through' : 'text-slate-900'
                  }`}>
                    {task.title}
                  </h4>
                  
                  {(task.notes || task.link_url) && !task.is_complete && (
                    <div className="flex gap-2 mt-1">
                      {task.notes && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md">Has Notes</span>
                      )}
                      {task.link_url && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md">Has Link</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {sortedTasks.length === 0 && (
            <p className="text-sm text-slate-500 italic pl-8">Your roadmap is being generated...</p>
          )}
        </div>
      </div>

      {selectedTask && (
        <TaskDetailPanel 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onSave={(updatedTask) => {
            setLocalTasks(prev => prev.map(t => t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
          }}
        />
      )}
    </>
  )
}
