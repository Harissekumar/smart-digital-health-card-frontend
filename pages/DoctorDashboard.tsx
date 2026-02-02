
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS } from '../constants';

const DoctorDashboard: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [manualId, setManualId] = useState('');
  const [view, setView] = useState<'camera' | 'manual'>('camera');
  const navigate = useNavigate();

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      navigate('/patient/P001');
    }, 2000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId) {
      navigate(`/patient/${manualId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900">Patient Lookup</h1>
        <p className="text-slate-500">Scan physical medical card or enter Health ID manually.</p>
      </header>

      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 w-fit">
        <button 
          onClick={() => setView('camera')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'camera' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Camera Scan
        </button>
        <button 
          onClick={() => setView('manual')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'manual' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Manual Entry
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
        {view === 'camera' ? (
          <div className="space-y-8">
            <div className="max-w-md mx-auto aspect-square bg-slate-900 rounded-[2rem] border-8 border-slate-800 flex flex-col items-center justify-center relative group shadow-2xl overflow-hidden">
              {/* Camera Simulation Feed */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"></div>
                 <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              </div>

              {scanning ? (
                <div className="z-10 flex flex-col items-center">
                  <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs">Decrypting Card...</p>
                </div>
              ) : (
                <div className="z-10 flex flex-col items-center p-8 text-center">
                  <div className="w-24 h-24 mb-6 relative">
                     <div className="absolute inset-0 border-t-4 border-l-4 border-blue-500 w-8 h-8 rounded-tl-xl"></div>
                     <div className="absolute top-0 right-0 border-t-4 border-r-4 border-blue-500 w-8 h-8 rounded-tr-xl"></div>
                     <div className="absolute bottom-0 left-0 border-b-4 border-l-4 border-blue-500 w-8 h-8 rounded-bl-xl"></div>
                     <div className="absolute bottom-0 right-0 border-b-4 border-r-4 border-blue-500 w-8 h-8 rounded-br-xl"></div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                  </div>
                  <p className="text-slate-500 text-sm mb-8">Secure Optical Authorization Interface Ready</p>
                  <button 
                    onClick={handleSimulateScan}
                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    Activate Camera
                  </button>
                </div>
              )}
              
              {/* Scanning line effect */}
              {scanning && <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_15px_blue] animate-[scan_2s_infinite]"></div>}
            </div>
            
            <div className="text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Hardware acceleration enabled
               </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto py-12">
            <h3 className="text-xl font-black text-slate-900 mb-6">Enter Health ID</h3>
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. P001" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  required
                />
                <span className="absolute right-4 top-4 text-xs font-bold text-slate-400">ID#</span>
              </div>
              <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-black transition-all active:scale-95">
                Retrieve Records
              </button>
            </form>
            <p className="mt-8 text-center text-xs text-slate-400">Manual entry requires verified network credentials.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DoctorDashboard;
