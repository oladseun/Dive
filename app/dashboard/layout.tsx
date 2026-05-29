"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "../(auth)/actions";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "@/components/dashboard/ErrorBoundary";
import { toast } from "sonner";
import { NotificationBell } from "@/components/dashboard/NotificationBell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const navItems = [
    { 
      name: "Overview", 
      href: "/dashboard", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      name: "Opportunities", 
      href: "/dashboard/feed", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    { 
      name: "My Applications", 
      href: "/dashboard/roadmaps", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      name: "Documents", 
      href: "/dashboard/readiness", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      name: "Assets & Templates", 
      href: "/dashboard/templates", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      name: "Upgrade to Pro ✨", 
      href: "/dashboard/upgrade", 
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
  ];

  const initials = profile?.name 
    ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "OP";

  return (
    <div className="flex h-screen bg-white text-slate-900 selection:bg-primary/10 selection:text-primary font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-100 bg-white flex flex-col relative z-20 overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" 
             style={{ backgroundImage: `radial-gradient(circle at center, #002999 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
        
        {/* Branding */}
        <div className="p-8 pb-12 relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden mix-blend-multiply bg-white">
              <Image 
                src="/logo.png" 
                alt="Dive Logo" 
                width={48} 
                height={48} 
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tight text-slate-900 leading-none">DIVE<span className="text-primary italic">.</span></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Platform</span>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 relative z-10 custom-scrollbar overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  isActive 
                    ? 'bg-primary/5 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-active-bar"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                  />
                )}
                <div className={`${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Profile / Footer */}
        <div className="p-6 border-t border-slate-50 relative z-10">
          <div className="space-y-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white transition-all duration-300 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold border border-white/10 group-hover:bg-primary transition-all">
                {initials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold text-slate-900 tracking-tight">{profile?.name || "Member"}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="truncate text-[10px] text-slate-500 font-bold uppercase tracking-widest">{profile?.tier === 'pro' ? 'PRO' : 'FREE'} Account</p>
                </div>
              </div>
            </Link>
            
            {/* Quick Toggle for Testing Free/Pro */}
            {profile && (
              <button
                onClick={async () => {
                  const newTier = profile.tier === 'pro' ? 'free' : 'pro';
                  setProfile({ ...profile, tier: newTier });
                  await (supabase.from("users") as any).update({ tier: newTier }).eq("id", profile.id);
                  toast.success(`Account switched to ${newTier.toUpperCase()}`);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                  profile.tier === 'pro' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {profile.tier === 'pro' ? 'Pro Active' : 'Free Active'}
                </span>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${profile.tier === 'pro' ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${profile.tier === 'pro' ? 'left-[18px]' : 'left-0.5'}`} />
                </div>
              </button>
            )}

            <div className="flex items-center justify-between pt-2">
              <Link href="/dashboard/billing" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                Billing
              </Link>
              <form action={signOut}>
                <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-50 flex items-center justify-between px-10 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Workspace</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell />
            
            <Link 
              href="/dashboard/feed"
              className="px-6 py-2.5 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <span>Search Opportunities</span>
            </Link>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-white relative z-10 custom-scrollbar scroll-smooth">
          {/* Subtle Background Textures */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
          </div>

          <div className="p-10 lg:p-12 max-w-6xl mx-auto min-h-full">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}
