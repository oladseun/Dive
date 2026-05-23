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
  opportunity?: any
  profile?: any
  onClose: () => void
}

export function TaskDetailPanel({ task, opportunity, profile, onClose }: Props) {
  const [status, setStatus] = useState(task.status || (task.is_complete ? 'completed' : 'todo'))
  const [notes, setNotes] = useState(task.notes || '')
  const [linkUrl, setLinkUrl] = useState(task.link_url || '')
  const [isSaving, setIsSaving] = useState(false)

  // Sub-state for Essay Architect
  const [activeTab, setActiveTab] = useState<'outline' | 'draft' | 'polish'>('draft')

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

  const titleLower = task.title.toLowerCase()
  let category = 'generic'
  if (titleLower.includes('eligibility') || titleLower.includes('requirements')) {
    category = 'eligibility'
  } else if (titleLower.includes('transcript') || titleLower.includes('cv') || titleLower.includes('resume') || titleLower.includes('document')) {
    category = 'document'
  } else if (titleLower.includes('essay') || titleLower.includes('statement') || titleLower.includes('proposal') || titleLower.includes('sop')) {
    category = 'essay'
  } else if (titleLower.includes('recommendation') || titleLower.includes('email') || titleLower.includes('outreach')) {
    category = 'outreach'
  }

  // Common UI elements
  const StatusSelector = () => (
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
  )

  const renderEligibilityPanel = () => {
    let regionMatch = true
    if (opportunity?.region && profile?.country) {
      const regionLower = opportunity.region.toLowerCase()
      const countryLower = profile.country.toLowerCase()
      regionMatch = regionLower.includes(countryLower) || regionLower.includes('global') || regionLower.includes('remote') || regionLower.includes('any')
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Eligibility Check</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-medium text-slate-600">Region Target: <span className="font-bold text-slate-900">{opportunity?.region || 'Global'}</span></span>
              {regionMatch ? (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">✅ Match ({profile?.country || 'N/A'})</span>
              ) : (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">⚠️ Mismatch ({profile?.country || 'N/A'})</span>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <span className="text-xs font-medium text-slate-600">Opportunity Requirements:</span>
              <ul className="list-disc list-inside space-y-1">
                {opportunity?.requirements?.map((req: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700">{req}</li>
                ))}
                {(!opportunity?.requirements || opportunity.requirements.length === 0) && (
                  <li className="text-xs text-slate-500 italic">No specific requirements listed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {!regionMatch && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <p className="text-xs font-medium text-red-800 leading-relaxed">
              Based on your profile, you may not be eligible for this opportunity due to regional constraints. Please review the official guidelines carefully before proceeding.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Personal Notes</label>
          <textarea 
            placeholder="Document any additional eligibility checks you performed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>
      </div>
    )
  }

  const renderDocumentPanel = () => {
    return (
      <div className="space-y-6">
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
            <span>📎</span> Document Assembly
          </h4>
          <p className="text-xs text-indigo-700/80 leading-relaxed">
            Upload or link your specific document below. Ensure it meets the required formats (usually PDF).
          </p>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 font-mono">Secure Document Link</label>
            <input 
              type="url"
              placeholder="e.g. Google Drive link to Transcript..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Document Status Notes</label>
          <textarea 
            placeholder="Waiting on university to send official copies..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>
      </div>
    )
  }

  const renderEssayArchitect = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-1 shadow-lg">
          <div className="bg-white rounded-xl overflow-hidden flex flex-col h-[400px]">
            <div className="border-b border-slate-100 p-2 flex items-center justify-between bg-slate-50">
              <div className="flex gap-1">
                {['outline', 'draft', 'polish'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                onClick={async () => {
                  try {
                    toast.loading('AI is crafting your draft...', { id: 'drafting' });
                    const { draftWithAI } = await import('@/app/dashboard/tracker/ai-actions');
                    const draft = await draftWithAI(task.id);
                    setNotes(draft);
                    setActiveTab('draft');
                    toast.success('Draft generated successfully!', { id: 'drafting' });
                  } catch (e) {
                    toast.error('Failed to generate draft', { id: 'drafting' });
                  }
                }}
                className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
              >
                <span>✨</span> AI Generate
              </button>
            </div>
            <div className="flex-1 bg-white p-4">
              <textarea 
                placeholder={activeTab === 'outline' ? "Jot down your key points and themes here..." : activeTab === 'draft' ? "Your essay draft goes here. Click 'AI Generate' to get a head start based on the opportunity requirements." : "Refine your final essay here. Check for tone, grammar, and word count."}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-full text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none resize-none leading-relaxed font-serif"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Final Document Link</label>
          <input 
            type="url"
            placeholder="Link to your polished Google Doc or PDF..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
    )
  }

  const renderOutreachPanel = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-blue-100/50 px-4 py-3 border-b border-blue-100 flex items-center justify-between">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-widest flex items-center gap-2">
              <span>✉️</span> Email Composer
            </h4>
            <button
              onClick={async () => {
                try {
                  toast.loading('AI is drafting email...', { id: 'drafting' });
                  const { draftWithAI } = await import('@/app/dashboard/tracker/ai-actions');
                  const draft = await draftWithAI(task.id);
                  setNotes(draft);
                  toast.success('Draft generated successfully!', { id: 'drafting' });
                } catch (e) {
                  toast.error('Failed to generate draft', { id: 'drafting' });
                }
              }}
              className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              <span>✨</span> Auto-Draft
            </button>
          </div>
          <div className="p-4 bg-white">
            <textarea 
              placeholder="Subject: Recommendation Request...&#10;&#10;Dear Professor,&#10;&#10;I hope this email finds you well..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              className="w-full text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderGenericPanel = () => {
    return (
      <>
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
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Personal Notes & Updates</label>
          </div>
          <textarea 
            placeholder="Add any relevant notes or updates here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-100">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-900 tracking-tight">Task View</h2>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md">
              {category}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-2xl font-display font-medium text-slate-900 mb-2 leading-tight">{task.title}</h3>
            <p className="text-sm text-slate-500 font-medium">
              {category === 'eligibility' && "Let's make sure you meet the criteria before investing time."}
              {category === 'document' && "Gathering the right documents early prevents last-minute stress."}
              {category === 'essay' && "Your personal statement is the most critical part of the application. Let's draft it."}
              {category === 'outreach' && "Clear communication is key. Let's draft an effective outreach message."}
              {category === 'generic' && "Update your progress and attach relevant documents here."}
            </p>
          </div>

          <StatusSelector />

          {category === 'eligibility' && renderEligibilityPanel()}
          {category === 'document' && renderDocumentPanel()}
          {category === 'essay' && renderEssayArchitect()}
          {category === 'outreach' && renderOutreachPanel()}
          {category === 'generic' && renderGenericPanel()}
          
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <Button 
            className="w-full sm:w-auto px-8" 
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
