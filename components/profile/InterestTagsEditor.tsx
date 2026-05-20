"use client";

import { useState } from "react";
import { updateInterestTags } from "@/app/dashboard/profile/actions";
import { Button } from "@/components/ui";

export default function InterestTagsEditor({
  initialTags,
}: {
  initialTags: string[];
}) {
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateInterestTags(tags);
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
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Strategic Interests</h3>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            Edit Mapping
          </button>
        </div>
        
        <div className="p-8 flex flex-wrap gap-2.5">
          {tags.map((tag: string) => (
            <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-600 rounded-xl hover:border-primary/20 hover:text-primary transition-all">
              {tag}
            </span>
          ))}
          {!tags.length && <p className="text-xs text-slate-400 font-medium italic">No strategic interests mapped yet.</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Map Interests</h3>
        <button 
          onClick={() => {
            setTags(initialTags || []);
            setIsEditing(false);
          }}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-700 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag: string) => (
              <span key={tag} className="px-4 py-2 bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary rounded-xl flex items-center gap-2">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type an interest (e.g. STEM, Europe, Undergrad) and press Enter"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
          />
          <p className="text-[10px] text-slate-400 font-medium">Press Enter to add a tag. Map your interests to receive curated opportunities.</p>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-50">
          <Button onClick={handleSave} disabled={isLoading} className="px-8 text-[11px] font-bold uppercase tracking-widest">
            {isLoading ? 'Saving...' : 'Save Mapping'}
          </Button>
        </div>
      </div>
    </section>
  );
}
