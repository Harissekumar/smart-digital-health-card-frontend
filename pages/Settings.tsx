import React, { useState } from 'react';
import { User } from '../types';
import { generateHealthPoster } from '../services/geminiService';

interface SettingsProps {
  user: User | null;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [posterPrompt, setPosterPrompt] = useState('Medical Awareness Card');
  const [posterSize, setPosterSize] = useState<'1K' | '2K' | '4K'>('1K');

  const handleGenerate = async () => {
    // Check if an API key has been selected as required for gemini-3-pro-image-preview.
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
      if (!(await aistudio.hasSelectedApiKey())) {
        await aistudio.openSelectKey();
        // Proceeding as per guideline: assume selection was successful to avoid race conditions.
      }
    }

    setIsGenerating(true);
    try {
      const url = await generateHealthPoster(posterPrompt, posterSize);
      setPosterUrl(url);
    } catch (e: any) {
      console.error(e);
      // Handle missing entity error by prompting for key selection again.
      if (e?.message?.includes('Requested entity was not found.')) {
        if (aistudio && typeof aistudio.openSelectKey === 'function') {
          await aistudio.openSelectKey();
        }
      } else {
        alert('Generation failed. Ensure your API key is configured with a paid billing account.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-black text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account and medical tools.</p>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold">Profile Information</h2>
          <button className="text-blue-600 font-bold text-sm">Edit Profile</button>
        </div>
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Full Name</label>
                <p className="text-slate-900 font-medium">{user?.name}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email Address</label>
                <p className="text-slate-900 font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Role</label>
                <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{user?.role}</span>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold">Medical ID Generator (Gemini AI)</h2>
          <p className="text-xs text-slate-500 mt-1">Create illustrative health posters or card designs using Gemini 3 Pro Image.</p>
          <p className="text-[10px] text-blue-600 mt-1 italic">Note: Advanced image models require selecting a billing-enabled API key. Visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline">billing documentation</a> for details.</p>
        </div>
        <div className="p-8 space-y-8">
          <div className="max-w-xl space-y-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Design Prompt</label>
                <input 
                  type="text" 
                  value={posterPrompt} 
                  onChange={(e) => setPosterPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Modern Health ID Card for Diabetic patients"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image Quality</label>
                <div className="flex gap-4">
                   {['1K', '2K', '4K'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => setPosterSize(s as any)}
                        className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${
                          posterSize === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                   ))}
                </div>
             </div>
             <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors disabled:opacity-50"
             >
                {isGenerating ? 'AI at work...' : 'Generate Design Concept'}
             </button>
          </div>

          {posterUrl && (
            <div className="pt-8 border-t border-slate-100">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Preview Result</p>
               <img src={posterUrl} alt="AI Generated Design" className="max-w-lg w-full rounded-2xl shadow-2xl" />
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end pt-8">
         <button 
            onClick={onLogout}
            className="px-8 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
         >
            Logout from Portal
         </button>
      </div>
    </div>
  );
};

export default Settings;