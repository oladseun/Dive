'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateProfile } from './actions'

const INTERESTS = [
  "STEM", "Humanities", "Arts", "Business", "Social Sciences", 
  "Tech", "Creative Writing", "Music", "Leadership",
  "Research", "Entrepreneurship"
]

const EDUCATION_LEVELS = [
  "High_School", "Undergraduate", "Graduate_Masters", "Doctorate_PhD", "Vocational"
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [educationLevel, setEducationLevel] = useState("")
  const [country, setCountry] = useState("Nigeria")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('interests', JSON.stringify(selectedInterests))
    formData.append('education_level', educationLevel)
    formData.append('country', country)
    
    await updateProfile(formData)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/10 selection:text-blue-600 font-sans overflow-hidden flex flex-col items-center justify-center relative">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" 
           style={{ backgroundImage: `radial-gradient(circle at center, #0066ff 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
      
      <div className="max-w-xl w-full px-8 relative z-10">
        {/* Header / Progress */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center shadow-2xl shadow-slate-900/10 border border-white/10">
                <div className="w-4 h-4 border-2 border-white/90 rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tightest text-slate-900 uppercase leading-none italic">Dive.</span>
                <span className="text-[9px] font-mono text-blue-600 font-black tracking-[0.4em] uppercase leading-none mt-1">OPERATOR_SETUP</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-slate-300">Phase_Sequence</p>
              <p className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-slate-900 mt-1">0{step}_of_03</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1 flex-1 transition-all duration-700 ease-out ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-12"
            >
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-slate-100 bg-slate-50/50 rounded mb-8">
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">[0x01]</span>
                  <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.3em]">DOMAIN_PREFERENCES</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tightest text-slate-900 leading-none uppercase italic mb-6">
                  Select <span className="text-blue-600">Specializations.</span>
                </h1>
                <p className="text-slate-400 font-mono text-[11px] uppercase tracking-widest font-bold leading-relaxed max-w-md">
                  Targeted opportunity alignment requires precise interest mapping. Select all applicable domains.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-5 py-3 rounded border text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-500 relative group ${
                      selectedInterests.includes(interest)
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <span className="ml-3 opacity-50">/✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-50">
                <button
                  onClick={handleNext}
                  disabled={selectedInterests.length === 0}
                  className="w-full py-5 bg-slate-900 text-white font-mono font-black uppercase tracking-[0.4em] text-[11px] rounded disabled:opacity-20 disabled:grayscale transition-all duration-500 hover:bg-blue-600 shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-4 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">CONFIRM_AND_CONTINUE</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-12"
            >
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-slate-100 bg-slate-50/50 rounded mb-8">
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">[0x02]</span>
                  <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.3em]">ACADEMIC_TIER</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tightest text-slate-900 leading-none uppercase italic mb-6">
                  Current <span className="text-blue-600">Status.</span>
                </h1>
                <p className="text-slate-400 font-mono text-[11px] uppercase tracking-widest font-bold leading-relaxed max-w-md">
                  Define your current operational level to calibrate eligibility filters.
                </p>
              </div>

              <div className="grid gap-3">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setEducationLevel(level)}
                    className={`w-full p-5 rounded border transition-all duration-500 text-left relative group ${
                      educationLevel === level
                        ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm'
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-mono font-black transition-colors ${educationLevel === level ? 'text-blue-400' : 'text-slate-200'}`}>
                          [{EDUCATION_LEVELS.indexOf(level) + 1}]
                        </span>
                        <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">{level}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        educationLevel === level ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-slate-100'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-50">
                <button
                  onClick={handleBack}
                  className="flex-1 py-5 border border-slate-100 text-slate-300 font-mono font-black uppercase tracking-[0.4em] text-[10px] rounded hover:bg-slate-50 hover:text-slate-900 transition-all duration-500"
                >
                  [ REVERT ]
                </button>
                <button
                  onClick={handleNext}
                  disabled={!educationLevel}
                  className="flex-[2] py-5 bg-slate-900 text-white font-mono font-black uppercase tracking-[0.4em] text-[11px] rounded disabled:opacity-20 transition-all duration-500 hover:bg-blue-600 shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-4 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">CONTINUE_SETUP</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="space-y-12"
            >
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-slate-100 bg-slate-50/50 rounded mb-8">
                  <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">[0x03]</span>
                  <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.3em]">GEOGRAPHIC_LOCALIZATION</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tightest text-slate-900 leading-none uppercase italic mb-6">
                  Final <span className="text-blue-600">Verification.</span>
                </h1>
                <p className="text-slate-400 font-mono text-[11px] uppercase tracking-widest font-bold leading-relaxed max-w-md">
                  Regional prioritization ensures optimal network performance and opportunity latency.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-8 border border-slate-100 bg-slate-50/30 rounded group transition-all duration-500 hover:border-blue-500/20 relative overflow-hidden">
                  <label className="block text-[9px] font-mono font-black text-slate-300 uppercase tracking-[0.4em] mb-4">
                    Target_Region
                  </label>
                  <div className="relative">
                    <select 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-transparent text-slate-900 text-sm font-mono font-black uppercase tracking-widest focus:outline-none appearance-none cursor-pointer relative z-10"
                    >
                      <option value="Nigeria">Nigeria_NG</option>
                      <option value="Ghana">Ghana_GH</option>
                      <option value="Kenya">Kenya_KE</option>
                      <option value="South Africa">South_Africa_ZA</option>
                      <option value="Other">External_Region</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600 opacity-50 font-mono font-black">
                      [SELECT]
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-100 overflow-hidden">
                    <motion.div 
                      layoutId="input-glow"
                      className="h-full bg-blue-600 w-1/3"
                      animate={{ x: ["0%", "200%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 px-6 py-4 bg-emerald-50/30 border border-emerald-100 rounded">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest italic">Protocol_Readiness: OPTIMAL</span>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-50">
                <button
                  onClick={handleBack}
                  className="flex-1 py-5 border border-slate-100 text-slate-300 font-mono font-black uppercase tracking-[0.4em] text-[10px] rounded hover:bg-slate-50 hover:text-slate-900 transition-all duration-500"
                >
                  [ REVERT ]
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] py-5 bg-slate-900 text-white font-mono font-black uppercase tracking-[0.4em] text-[11px] rounded disabled:opacity-20 transition-all duration-500 hover:bg-blue-600 shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-4 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? "CALIBRATING_SYSTEM..." : "INITIALIZE_COMMAND_CENTER"}
                    {isSubmitting && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer Technical Readout */}
        <div className="mt-20 pt-8 border-t border-slate-50 flex items-center justify-between opacity-20">
          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-slate-400">Dive_OS // ver_0.1.0</span>
          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-slate-400">Secure_Encryption: AES_256</span>
        </div>
      </div>
    </div>
  )
}
