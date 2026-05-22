'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toggleTask } from './actions'
import { TaskDetailPanel } from '@/components/tracker/TaskDetailPanel'
import { toast } from 'sonner'

interface Task {
  id: string
  title: string
  is_complete: boolean
  status: string
  notes: string | null
  link_url: string | null
  day_number: number
}

export default function TaskList({ 
  tasks: initialTasks, 
  opportunityId, 
  userId,
  userTier = 'free'
}: { 
  tasks: Task[], 
  opportunityId: string, 
  userId: string,
  userTier?: string
}) {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleToggle = async (e: React.MouseEvent, taskId: string, currentStatus: boolean) => {
    e.stopPropagation()
    // Optimistic UI
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, is_complete: !currentStatus, status: !currentStatus ? 'completed' : 'todo' } : t
    ))

    await toggleTask(taskId, !currentStatus)
  }

  const handleTaskClick = (task: Task) => {
    if (userTier === 'pro') {
      setSelectedTask(task)
    } else {
      toast.error('Premium Feature', { description: 'Upgrade to Pro to access Deep CRM task tracking and notes.' })
    }
  }

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task, i) => (
          <motion.div 
            key={task.id}
            onClick={() => handleTaskClick(task)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-6 p-4 rounded-xl border transition-all ${userTier === 'pro' ? 'cursor-pointer' : 'cursor-default'} ${
              task.is_complete 
                ? 'bg-surface border-border opacity-70' 
                : task.status === 'in_progress'
                  ? 'bg-orange-50/50 border-orange-200'
                  : 'bg-white border-border hover:border-primary/30'
            }`}
          >
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Day</span>
              <span className="text-sm font-bold">{task.day_number}</span>
            </div>

            <button 
              onClick={(e) => handleToggle(e, task.id, task.is_complete)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.is_complete ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary'
              }`}
            >
              {task.is_complete && <span className="text-xs">✓</span>}
            </button>

            <div className="flex-1 flex flex-col gap-1">
              <span className={`font-medium ${task.is_complete ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </span>
              {(task.notes || task.link_url) && !task.is_complete && userTier === 'pro' && (
                <div className="flex gap-2">
                  {task.notes && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-surface border border-border px-2 py-0.5 rounded-md">Notes</span>
                  )}
                  {task.link_url && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-surface border border-border px-2 py-0.5 rounded-md">Link</span>
                  )}
                </div>
              )}
            </div>

            <div className="text-xs font-bold text-muted-foreground bg-surface px-2 py-1 rounded flex gap-2">
              {task.status === 'in_progress' && !task.is_complete ? 'In Progress' : task.is_complete ? 'Completed' : 'To Do'}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTask && userTier === 'pro' && (
        <TaskDetailPanel 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </>
  )
}
