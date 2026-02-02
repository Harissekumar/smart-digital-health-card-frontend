
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '../constants';

const EmergencyScan: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedPatient, setScannedPatient] = useState<any>(null);
  const navigate = useNavigate();

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedPatient(MOCK_PATIENTS[0]); // Always find the first mock patient for the demo
    }, 2000);
  };

  const handleFullAccess = () => {
    navigate(`/patient/${scannedPatient.id}?mode=emergency`);
  };

  return (
    <div className="min-h-screen bg-red-600 flex flex-col p-6 animate-in fade-in duration-700">
      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-white font-black text-2xl tracking-tighter">SmartHealth<span className="text-red-300">.SOS</span></Link>
        <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Active Emergency Ops</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center text-white max-w-lg mx-auto w-full">
        {!scannedPatient ? (
          <>
            <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 relative">
               <div className="absolute inset-0 bg-white rounded-[2rem] animate-ping opacity-20"></div>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            
            <h1 className="text-4xl font-black mb-4 tracking-tight uppercase">Critical Scan</h1>
            <p className="text-red-100 text-lg mb-12 font-medium">Point camera at patient's Health Card QR to unlock life-critical data instantly.</p>

            <div className="w-full aspect-square bg-red-900/30 border-4 border-dashed border-red-300/50 rounded-[3rem] relative flex items-center justify-center overflow-hidden shadow-2xl group">
              {isScanning ? (
                <div className="z-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white font-black uppercase tracking-widest text-xs">Accessing Satellite Registry...</p>
                </div>
              ) : (
                 <button 
                    onClick={simulateScan}
                    className="w-full h-full flex flex-col items-center justify-center group-hover:bg-white/5 transition-all"
                 >
                    <div className="w-20 h-20 bg-white text-red-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="font-black uppercase tracking-[0.2em] text-[10px] opacity-60">Tap to Scan</span>
                 </button>
              )}
              {isScanning && <div className="absolute top-0 left-0 w-full h-[3px] bg-white shadow-[0_0_20px_white] animate-[ SOS_scan 2s infinite ]"></div>}
            </div>
          </>
        ) : (
          <div className="w-full animate-in zoom-in-95 duration-500">
             <div className="bg-white rounded-[3rem] p-8 text-slate-900 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16"></div>
                
                <div className="flex items-center gap-6 mb-8">
                   <img src={scannedPatient.profileImage} className="w-24 h-24 rounded-3xl object-cover shadow-lg border-4 border-slate-50" />
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Authenticated Identity</p>
                      <h2 className="text-3xl font-black">{scannedPatient.name}</h2>
                      <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-black uppercase">{scannedPatient.bloodGroup}</span>
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase">Age {scannedPatient.age}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-6 text-left">
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Critical Allergies</h4>
                      <div className="flex flex-wrap gap-2">
                        {scannedPatient.allergies.map((a: string) => (
                          <span key={a} className="px-4 py-2 bg-red-50 text-red-700 rounded-xl text-sm font-black border border-red-100">{a}</span>
                        ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Known Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {scannedPatient.medicalConditions.map((c: string) => (
                          <span key={c} className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-xl text-sm font-black border border-yellow-100">{c}</span>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="mt-10 space-y-3">
                   <button 
                     onClick={handleFullAccess}
                     className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
                   >
                     Unlock Comprehensive Record
                   </button>
                   <button 
                     onClick={() => setScannedPatient(null)}
                     className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                   >
                     Clear and Rescan
                   </button>
                </div>
             </div>
             
             <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div className="text-left">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Emerg. Contact</p>
                   <p className="font-bold">+1 (555) 902-1010</p>
                </div>
             </div>
          </div>
        )}
      </main>

      <footer className="mt-auto text-center text-red-200 py-8">
        <Link to="/" className="text-xs font-bold opacity-60 hover:opacity-100 transition-opacity underline underline-offset-4">Return to Public Site</Link>
      </footer>

      <style>{`
        @keyframes SOS_scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default EmergencyScan;
