"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Badge, Button } from "@/components/ui";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [savedOpps, setSavedOpps] = useState<any[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [readinessPercent, setReadinessPercent] = useState(0);
  const [coreDocs, setCoreDocs] = useState<any[]>([]);
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      const { data: profileData } = await (supabase
        .from("users")
        .select("interest_tags, name")
        .eq("id", user.id)
        .single() as any);
      setProfile(profileData);

      const { data: savedData } = await supabase
        .from("saved_opportunities")
        .select("*, opportunities(*)")
        .eq("user_id", user.id);
      setSavedOpps(savedData || []);

      const userInterests = profileData?.interest_tags || [];
      const userCountry = profileData?.country || '';
      const userEducation = profileData?.education_level || '';
      
      const { data: allOpps } = await supabase
        .from("opportunities")
        .select("tags, region, title, requirements")
        .eq("is_active", true);
      
      const matches = (allOpps?.filter((opp: any) => {
        let score = 0;
        
        // Tag matching (up to 40)
        const oppTags = Array.isArray(opp.tags) ? opp.tags : [];
        const interests = Array.isArray(userInterests) ? userInterests : [];
        if (oppTags.length > 0) {
          const overlap = oppTags.filter((tag: string) => interests.includes(tag));
          if (overlap.length > 0) score += Math.min(40, overlap.length * 15);
        } else {
          score += 20;
        }

        // Region matching (30)
        if (opp.region && userCountry) {
          const regionLower = opp.region.toLowerCase();
          const countryLower = userCountry.toLowerCase();
          if (regionLower.includes(countryLower) || regionLower.includes('global') || regionLower.includes('remote') || regionLower.includes('any')) {
            score += 30;
          }
        } else if (!opp.region) {
          score += 15;
        }

        // Education matching (30)
        if (userEducation) {
          const eduLower = userEducation.toLowerCase();
          const titleLower = opp.title?.toLowerCase() || '';
          const reqsLower = Array.isArray(opp.requirements) ? opp.requirements.join(' ').toLowerCase() : '';
          
          let eduKeyword = '';
          if (eduLower.includes('undergrad') || eduLower.includes('bachelor')) eduKeyword = 'undergrad';
          else if (eduLower.includes('postgrad') || eduLower.includes('master')) eduKeyword = 'postgrad';
          else if (eduLower.includes('phd') || eduLower.includes('doctorate')) eduKeyword = 'phd';
          else if (eduLower.includes('high school')) eduKeyword = 'high school';

          if (eduKeyword && (titleLower.includes(eduKeyword) || reqsLower.includes(eduKeyword))) {
            score += 30;
          } else {
            score += 15;
          }
        } else {
          score += 15;
        }

        return score >= 60; // Highly curated threshold
      }) || []).length;
      setMatchCount(matches);

      const { data: docs } = await supabase
        .from("documents")
        .select("doc_type")
        .eq("user_id", user.id);
      
      const docTypes = docs?.map((d: any) => d.doc_type) || [];
      const docsList = [
        { name: "Valid Passport", type: "passport", ready: docTypes.includes('passport') },
        { name: "Degree Transcript", type: "transcript", ready: docTypes.includes('transcript') },
        { name: "Personal Statement", type: "statement", ready: docTypes.includes('statement') },
        { name: "Letter of Recommendation", type: "recommendation", ready: docTypes.includes('recommendation') },
        { name: "English Proficiency (MOI)", type: "moi", ready: docTypes.includes('moi') },
      ];
      setCoreDocs(docsList);
      setReadinessPercent(Math.round((docsList.filter(d => d.ready).length / docsList.length) * 100));
      
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("opportunity_id, is_complete")
        .eq("user_id", user.id);
      setAllTasks(tasksData || []);

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Syncing Intelligence...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { 
      name: "Active Apps", 
      value: savedOpps.length, 
      label: "Tracking",
      icon: (
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      name: "Readiness", 
      value: `${readinessPercent}%`, 
      label: "Profile",
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Missing Core Docs", 
      value: coreDocs.filter(d => !d.ready).length, 
      label: "Action Required",
      icon: (
        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    { 
      name: "Matches", 
      value: matchCount, 
      label: "Curated",
      icon: (
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, <span className="text-primary">{profile?.name?.split(' ')[0] || 'Member'}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm tracking-wide">
            Your preparatory workspace is synced. <span className="text-primary font-bold">{matchCount} opportunities</span> match your profile.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.name}</span>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Active Applications */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-slate-100 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Applications</h3>
            <Link href="/dashboard/roadmaps" className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-blue-700 transition-colors">
              View All
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            {savedOpps.length > 0 ? (
              savedOpps.map((saved: any) => {
                const opp = saved.opportunities;
                if (!opp) return null;
                const oppTasks = allTasks.filter((t: any) => t.opportunity_id === opp.id);
                const progress = oppTasks.length > 0 
                  ? Math.round((oppTasks.filter((t: any) => t.is_complete).length / oppTasks.length) * 100) 
                  : 0; 
                const deadline = opp.deadline ? new Date(opp.deadline) : null;
                
                return (
                  <div key={saved.id} className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="primary">{opp.category || 'Scholarship'}</Badge>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                            {saved.status || 'Active'}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                          {opp.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-bold text-slate-600 font-mono">
                            {deadline ? deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Rolling'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-bold text-slate-600 font-mono">{opp.region || 'Global'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary tracking-tight leading-none font-mono">{progress}%</div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 font-mono">Complete</p>
                      </div>
                      <Button 
                        href={`/dashboard/roadmaps/${opp.id}`} 
                        variant="primary"
                        size="md"
                      >
                        Resume
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl py-20 text-center">
                <div className="space-y-4 max-w-xs mx-auto">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl mx-auto shadow-sm">
                    🔍
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">No Active Applications</h4>
                  <p className="text-slate-500 text-xs font-medium">Explore the discovery feed to find opportunities and build your roadmap.</p>
                  <Button href="/dashboard/feed" variant="primary">
                    Find Opportunities
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Readiness Suite Sidebar */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-slate-100 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Readiness Suite</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Synced</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-slate-100 p-8 rounded-2xl space-y-8 shadow-sm">
            <div className="flex justify-between items-end border-b border-slate-50 pb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Documentation</p>
                <p className="text-sm font-bold text-slate-900 tracking-tight">Missing Core Assets</p>
              </div>
              <span className="text-3xl font-bold text-primary tracking-tight">{readinessPercent}%</span>
            </div>
            
            <div className="space-y-4">
              {coreDocs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${doc.ready ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200'}`}>
                      {doc.ready && <span className="text-[10px]">✓</span>}
                    </div>
                    <span className={`text-xs font-semibold tracking-tight ${doc.ready ? 'text-slate-900' : 'text-slate-400'}`}>{doc.name}</span>
                  </div>
                  {doc.ready && (
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Ready</span>
                  )}
                </div>
              ))}
            </div>
            
            <Button href="/dashboard/readiness" variant="outline" className="w-full">
              Manage Vault
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-primary p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/20 border border-white/30 text-[10px] font-bold text-white uppercase tracking-widest">
                Success Strategy
              </div>
              <h4 className="font-bold text-lg tracking-tight leading-tight">Master the Narrative</h4>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Applications with <span className="text-white font-bold italic">institutional MOI validation</span> show a significantly higher acceptance rate.
              </p>
              <Link href="/dashboard/templates" className="inline-flex items-center gap-2 text-[11px] font-bold text-white uppercase tracking-widest hover:translate-x-1 transition-transform">
                Browse Vault Templates →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
