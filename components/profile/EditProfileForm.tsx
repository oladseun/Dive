"use client";

import { useState } from "react";
import { updateBasicProfile } from "@/app/dashboard/profile/actions";
import { Button } from "@/components/ui";

export default function EditProfileForm({
  profile,
}: {
  profile: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updateBasicProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Account Identity</h3>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            Edit Profile
          </button>
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
    );
  }

  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Edit Identity</h3>
        <button 
          onClick={() => setIsEditing(false)}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Legal Name</label>
            <input
              name="name"
              defaultValue={profile?.name || ''}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-1.5 opacity-50 cursor-not-allowed">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Email</label>
            <input
              disabled
              value={profile?.email || ''}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-sm font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Residence</label>
            <input
              name="country"
              defaultValue={profile?.country || ''}
              placeholder="e.g. United Kingdom"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Academic Status</label>
            <select
              name="education_level"
              defaultValue={profile?.education_level || ''}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium appearance-none"
            >
              <option value="">Select Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Postdoc">Postdoc</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-slate-50">
          <Button type="submit" disabled={isLoading} className="px-8 text-[11px] font-bold uppercase tracking-widest">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </section>
  );
}
