'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { updateTaskDetails } from '@/app/dashboard/tracker/actions'
import { toast } from 'sonner'

type Task = {
  id: string
  title: string
  status: string
  notes: string | null
  link_url: string | null
  is_complete: boolean
}

interface Props {
  task: Task
  onClose: () => void
}

export function TaskDetailPanel({ task, onClose }: Props) {
  const [status, setStatus] = useState(task.status || (task.is_complete ? 'completed' : 'todo'))
  const [notes, setNotes] = useState(task.notes || '')
  const [linkUrl, setLinkUrl] = useState(task.link_url || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateTaskDetails(task.id, { status, notes, link_url: linkUrl })
      toast.success('Task updated')
      onClose()
    } catch (e) {
      toast.error('Failed to update task')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="font-bold text-slate-900 tracking-tight">Task Details</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{task.title}</h3>
            <p className="text-xs text-slate-500 font-medium">Update your progress and attach relevant documents here.</p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setStatus('todo')}
                className={`px-3 py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all ${status === 'todo' ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
              >
                To Do
              </button>
              <button
                onClick={() => setStatus('in_progress')}
                className={`px-3 py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all ${status === 'in_progress' ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-white text-slate-500 border-slate-200 hover:border-orange-200'}`}
              >
                In Progress
              </button>
              <button
                onClick={() => setStatus('completed')}
                className={`px-3 py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all ${status === 'completed' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200'}`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Asset Link</label>
            <input 
              type="url"
              placeholder="e.g. Google Doc link, portal URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Personal Notes & Updates</label>
            <textarea 
              placeholder="Emailed the professor today, waiting for response..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <Button 
            className="w-full" 
            onClick={handleSave}
            loading={isSaving}
          >
            Save Updates
          </Button>
        </div>
      </div>
    </>
  )
}
