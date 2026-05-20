import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await (supabase
    .from('users') as any)
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
            Professional <span className="text-primary">Profile</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed">
            Manage your personal identity, academic interests, and account preferences within your professional workspace.
          </p>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/20">
             {profile?.tier?.toUpperCase() || 'FREE'} Membership
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Account Identity</h3>
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified
              </span>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Legal Name</p>
                <p className="text-sm font-bold text-slate-900">{profile?.name || 'Not specified'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Primary Email</p>
                <p className="text-sm font-bold text-slate-900 truncate">{profile?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Residence</p>
                <p className="text-sm font-bold text-slate-900">{profile?.country || 'Global'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Academic Status</p>
                <p className="text-sm font-bold text-slate-900">{profile?.education_level || 'Not specified'}</p>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Strategic Interests</h3>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-blue-700 transition-colors">Edit Mapping</button>
            </div>
            
            <div className="p-8 flex flex-wrap gap-2.5">
              {profile?.interest_tags?.map((tag: string) => (
                <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-600 rounded-xl hover:border-primary/20 hover:text-primary transition-all">
                  {tag}
                </span>
              ))}
              {!profile?.interest_tags?.length && <p className="text-xs text-slate-400 font-medium italic">No strategic interests mapped yet.</p>}
            </div>
          </section>
        </div>

        {/* Right Column: Account Status */}
        <div className="space-y-8">
          <section className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="relative z-10 space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Membership Tier</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Plan</p>
                  <p className="text-3xl font-bold tracking-tight text-white">{profile?.tier?.toUpperCase() || 'FREE'}</p>
                </div>

                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Since</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">
                    {new Date(profile?.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="pt-4">
                  <button className="w-full py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20">
                    Upgrade Workspace
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <div className="w-24 h-24 border-2 border-white rounded-full translate-x-12 -translate-y-12" />
               <div className="w-24 h-24 border-2 border-white rounded-full translate-x-8 -translate-y-8" />
            </div>
          </section>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Privacy & Security</p>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Your professional data is encrypted at rest and in transit. Document access is restricted solely to your authenticated session.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
