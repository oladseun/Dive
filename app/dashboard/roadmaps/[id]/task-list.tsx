'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toggleTask } from './actions'

interface Task {
  id: string
  title: string
  is_complete: boolean
  day_number: number
}

export default function TaskList({ 
  tasks: initialTasks, 
  opportunityId, 
  userId 
}: { 
  tasks: Task[], 
  opportunityId: string, 
  userId: string 
}) {
  const [tasks, setTasks] = useState(initialTasks)

  const handleToggle = async (taskId: string, currentStatus: boolean) => {
    // Optimistic UI
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, is_complete: !currentStatus } : t
    ))

    await toggleTask(taskId, !currentStatus)
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, i) => (
        <motion.div 
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex items-center gap-6 p-4 rounded-xl border transition-all ${
            task.is_complete ? 'bg-surface border-border opacity-70' : 'bg-white border-border hover:border-primary/30'
          }`}
        >
          <div className="flex flex-col items-center gap-1 min-w-[40px]">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Day</span>
            <span className="text-sm font-bold">{task.day_number}</span>
          </div>

          <button 
            onClick={() => handleToggle(task.id, task.is_complete)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.is_complete ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary'
            }`}
          >
            {task.is_complete && <span className="text-xs">✓</span>}
          </button>

          <span className={`flex-1 font-medium ${task.is_complete ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </span>

          <div className="text-xs font-bold text-muted-foreground bg-surface px-2 py-1 rounded">
            {task.is_complete ? 'Completed' : 'To Do'}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
