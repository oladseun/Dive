'use client'

import { useState } from 'react'

type Task = {
  id: string
  title: string
  is_complete: boolean
}

interface Props {
  tasks: Task[]
  onToggle: (taskId: string, isComplete: boolean) => Promise<void>
}

export function RequirementChecklist({ tasks, onToggle }: Props) {
  const [optimisticTasks, setOptimisticTasks] = useState(tasks)

  const handleToggle = async (taskId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus
    
    // Optimistic update
    setOptimisticTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, is_complete: newStatus } : t)
    )

    try {
      await onToggle(taskId, newStatus)
    } catch (err) {
      // Revert on error
      setOptimisticTasks(tasks)
      console.error(err)
    }
  }

  const progress = optimisticTasks.length > 0 
    ? Math.round((optimisticTasks.filter(t => t.is_complete).length / optimisticTasks.length) * 100)
    : 0

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Requirements</h3>
          <p className="text-sm text-slate-500">Track your required documents and tasks.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary">{progress}%</span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Complete</p>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-3">
        {optimisticTasks.map((task) => (
          <label 
            key={task.id}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              task.is_complete 
                ? 'bg-emerald-50/50 border-emerald-100' 
                : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="relative flex items-center pt-1">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={task.is_complete}
                onChange={() => handleToggle(task.id, task.is_complete)}
              />
              <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                task.is_complete 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'border-slate-300 peer-hover:border-primary'
              }`}>
                {task.is_complete && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <p className={`text-sm font-semibold transition-colors ${
                task.is_complete ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'
              }`}>
                {task.title}
              </p>
            </div>
          </label>
        ))}
        {optimisticTasks.length === 0 && (
          <p className="text-sm text-slate-500 italic text-center py-4">No requirements listed.</p>
        )}
      </div>
    </div>
  )
}
