"use client";

import { useState } from "react";
import { updateNotificationPrefs } from "@/app/dashboard/profile/actions";
import { Button } from "@/components/ui";

export default function NotificationSettingsForm({
  profile,
}: {
  profile: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 'email', 'whatsapp', 'both', or 'none'
  const currentPref = profile?.notification_pref || 'email';
  const [pref, setPref] = useState(currentPref);
  const [whatsappNumber, setWhatsappNumber] = useState(profile?.whatsapp_number || '');

  const isPro = profile?.tier === 'pro';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('notification_pref', pref);
    formData.append('whatsapp_number', whatsappNumber);

    try {
      await updateNotificationPrefs(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPrefLabel = (p: string) => {
    switch (p) {
      case 'email': return 'Email Only';
      case 'whatsapp': return 'WhatsApp Only (PRO)';
      case 'both': return 'Email & WhatsApp (PRO)';
      case 'none': return 'None (Disabled)';
      default: return 'Email Only';
    }
  };

  if (!isEditing) {
    return (
      <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Notifications & Alerts</h3>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            Edit Settings
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Channels</p>
            <p className="text-sm font-bold text-slate-900">{getPrefLabel(currentPref)}</p>
          </div>
          {(currentPref === 'whatsapp' || currentPref === 'both') && (
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Number</p>
              <p className="text-sm font-bold text-slate-900">{profile?.whatsapp_number || 'Not provided'}</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Edit Notifications</h3>
        <button 
          onClick={() => setIsEditing(false)}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Notification Channels</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['email', 'whatsapp', 'both', 'none'].map((option) => {
              const disabled = (option === 'whatsapp' || option === 'both') && !isPro;
              return (
                <button
                  key={option}
                  type="button"
                  disabled={disabled}
                  onClick={() => setPref(option)}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    pref === option 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : disabled 
                        ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${pref === option ? 'text-primary' : 'text-slate-900'}`}>
                      {option === 'email' && 'Email Only'}
                      {option === 'whatsapp' && 'WhatsApp Only'}
                      {option === 'both' && 'Email & WhatsApp'}
                      {option === 'none' && 'None (Disabled)'}
                    </span>
                    {(option === 'whatsapp' || option === 'both') && (
                      <span className="text-[8px] font-black uppercase tracking-widest bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {option === 'email' && 'Receive reminders via your primary email.'}
                    {option === 'whatsapp' && 'Get instant reminders on WhatsApp.'}
                    {option === 'both' && 'Stay updated across all channels.'}
                    {option === 'none' && 'Pause all automated reminders.'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {(pref === 'whatsapp' || pref === 'both') && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. +2348012345678"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
            />
            <p className="text-[10px] text-slate-400 ml-1">Please include your country code (e.g., +234 for Nigeria).</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-50">
          <Button type="submit" disabled={isLoading} className="px-8 text-[11px] font-bold uppercase tracking-widest">
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </section>
  );
}
