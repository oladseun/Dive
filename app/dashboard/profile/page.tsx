import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditProfileForm from '@/components/profile/EditProfileForm'
import InterestTagsEditor from '@/components/profile/InterestTagsEditor'

export default async function ProfilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  let { data: profile } = await (supabase
    .from('users') as any)
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    profile = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      created_at: user.created_at,
      tier: 'free',
      interest_tags: [],
    }
  } else {
    // Fill in missing email or name from auth if they are missing in public.users
    profile.email = profile.email || user.email;
    profile.name = profile.name || user.user_metadata?.full_name || user.user_metadata?.name || '';
    profile.created_at = profile.created_at || user.created_at;
  }

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
          <EditProfileForm profile={profile} />
          <InterestTagsEditor initialTags={profile?.interest_tags || []} />
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
