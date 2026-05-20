import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function TemplatesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: templates } = await (supabase
    .from('templates') as any)
    .select('*')
    .order('created_at', { ascending: false }) as { data: Database['public']['Tables']['templates']['Row'][] | null }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Expert <span className="text-primary">Templates</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed">
            High-converting document frameworks and verified drafts optimized for high-impact professional applications.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/10">
            {templates?.length || 0} Assets Available
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates?.map((template) => (
          <div key={template.id} className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Type: {template.type}</span>
              {template.is_premium ? (
                <span className="px-2 py-1 rounded bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-widest border border-amber-100">Premium</span>
              ) : (
                <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-widest border border-emerald-100">Public</span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-snug">
                {template.title}
              </h3>
            </div>
            
            <div className="flex-1 space-y-6 mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100 bg-slate-50/50 px-3 py-1.5 w-fit rounded-lg">
                <span className="text-primary">Ref:</span> {template.category}
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2">Framework Architecture</p>
                <div className="space-y-3">
                  {(template.content_outline as any)?.sections?.slice(0, 3).map((s: string, idx: number) => (
                    <div key={s} className="text-xs font-semibold text-slate-500 flex items-center gap-3 group/item">
                      <span className="text-[10px] text-slate-300 font-bold">0{idx + 1}</span>
                      <span className="group-hover/item:text-slate-900 transition-colors line-clamp-1">{s}</span>
                    </div>
                  ))}
                  {(template.content_outline as any)?.sections?.length > 3 && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary italic pl-8">
                      +{(template.content_outline as any).sections.length - 3} Additional Modules
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 group/btn overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {template.is_premium ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Unlock Premium
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Template
                  </>
                )}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* AI Generator Promo */}
      <div className="p-10 bg-white border border-slate-100 rounded-3xl relative overflow-hidden group shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">AI Content Engine</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                Personalized <span className="text-primary">Draft Generation</span>
              </h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xl">
                Our Expert Synthesis Engine can generate personalized document drafts based on your profile data and specific opportunity requirements.
              </p>
            </div>
          </div>
          <Link href="/dashboard" className="px-10 py-4 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary transition-all shadow-2xl shadow-slate-900/10 border border-white/5 group/lab relative overflow-hidden whitespace-nowrap">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/lab:animate-[shimmer_2s_infinite]" />
            <span className="relative z-10">Launch AI Generator</span>
          </Link>
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-700" />
      </div>
    </div>
  )
}
