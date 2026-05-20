import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { toggleDocument } from './actions'

export default async function ReadinessSuite() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const { data: docs } = await (supabase
    .from('documents') as any)
    .select('doc_type')
    .eq('user_id', user.id)
  
  const docTypes = docs?.map((d: any) => d.doc_type) || []

  const categories = [
    {
      title: "Identity & Academic Records",
      items: [
        { name: "International Passport", type: "passport", description: "Standard identification for all global opportunity applications." },
        { name: "Degree Transcript", type: "transcript", description: "Certified record of your full academic history." },
        { name: "Degree Certificate", type: "certificate", description: "Official confirmation of your academic graduation." },
      ]
    },
    {
      title: "Narrative & Support",
      items: [
        { name: "Personal Statement", type: "statement", description: "Your unique story, professional goals, and application rationale." },
        { name: "Academic Recommendation", type: "recommendation_acad", description: "Formal endorsement from university faculty members." },
        { name: "Professional Recommendation", type: "recommendation_work", description: "Performance validation from a supervisor or employer." },
        { name: "Curriculum Vitae (CV)", type: "cv", description: "A detailed summary of your professional and academic trajectory." },
      ]
    },
    {
      title: "Language & Auxiliary",
      items: [
        { name: "Medium of Instruction", type: "moi", description: "Official verification of English as your primary language of study." },
        { name: "English Proficiency Test", type: "english_test", description: "IELTS, TOEFL, or standardized English proficiency results." },
        { name: "Police Clearance", type: "police", description: "Certified security clearance often required for visa processing." },
      ]
    }
  ]

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0)
  const readyCount = docTypes.length
  const progressPercent = Math.round((readyCount / totalItems) * 100)

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Professional <span className="text-primary">Readiness</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed">
            Manage and verify your core application assets. We recommend 100% readiness to maximize your success rate.
          </p>
        </div>
        
        {/* Progress Display */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center gap-8 shadow-2xl shadow-slate-900/20">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Overall Status</span>
            <span className="text-3xl font-bold text-primary tracking-tight">{progressPercent}%</span>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Assets Verified</span>
            <span className="text-3xl font-bold tracking-tight">{readyCount}<span className="text-slate-500 text-xl">/{totalItems}</span></span>
          </div>
        </div>
      </div>

      {/* Document Groups */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.title} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {category.title}
              </h3>
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                {category.items.filter(i => docTypes.includes(i.type)).length}/{category.items.length} Ready
              </div>
            </div>
            
            <div className="grid gap-4">
              {category.items.map((item) => {
                const isReady = docTypes.includes(item.type)
                return (
                  <div key={item.type} className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full border-2 ${isReady ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-white border-slate-200'}`} />
                        <h4 className={`text-base font-bold tracking-tight ${isReady ? 'text-slate-900' : 'text-slate-400'}`}>{item.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-medium ml-6">{item.description}</p>
                    </div>
                    
                    <form action={toggleDocument.bind(null, item.type, !isReady)}>
                      <button 
                        type="submit"
                        className={`w-full sm:w-auto px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all border ${
                          isReady 
                            ? 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100' 
                            : 'bg-primary text-white border-primary hover:bg-blue-700 shadow-lg shadow-primary/20'
                        }`}
                      >
                        {isReady ? 'Remove' : 'Mark as Ready'}
                      </button>
                    </form>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-sm text-slate-600 font-medium leading-relaxed flex gap-5 items-center">
        <div className="w-12 h-12 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-2xl shadow-sm">
          💡
        </div>
        <div className="space-y-1">
          <p className="text-slate-900 font-bold tracking-tight">Pro Tip</p>
          <p className="text-slate-500 text-xs">Maintain your documentation vault regularly. Many top-tier scholarships require recommendation letters and transcripts updated within the current academic cycle.</p>
        </div>
      </div>
    </div>
  )
}
