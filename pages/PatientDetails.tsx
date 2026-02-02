
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '../constants';
import { Patient } from '../types';
import { getMedicalSummary } from '../services/geminiService';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEmergency = searchParams.get('mode') === 'emergency';
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    const found = MOCK_PATIENTS.find(p => p.id === id);
    setPatient(found || null);
  }, [id]);

  const handleGenerateSummary = async () => {
    if (!patient) return;
    setIsGeneratingSummary(true);
    try {
      const dataStr = JSON.stringify(patient);
      const summary = await getMedicalSummary(dataStr);
      setAiSummary(summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setAiSummary('Error generating AI summary. Please check your API key.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  if (!patient) return (
    <div className="p-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
      <Link to="/" className="text-blue-600 underline">Return Home</Link>
    </div>
  );

  return (
    <div className={`min-h-screen ${isEmergency ? 'bg-red-50 p-6' : 'bg-slate-50'}`}>
      <div className={`max-w-4xl mx-auto ${isEmergency ? '' : 'py-8'}`}>
        
        {isEmergency && (
          <div className="bg-red-600 text-white p-4 rounded-xl mb-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center font-bold">!</div>
               <span className="font-bold uppercase tracking-tight">Emergency Information Interface</span>
            </div>
            <Link to="/emergency-scan" className="text-sm border border-white/40 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">Close</Link>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Info */}
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <img 
              src={patient.profileImage} 
              alt={patient.name} 
              className="w-32 h-32 rounded-3xl border-4 border-slate-50 object-cover shadow-sm" 
            />
            <div className="flex-1">
              <h1 className="text-3xl font-black text-slate-900 mb-1">{patient.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                <span>Age: {patient.age}</span>
                <span>•</span>
                <span>Gender: {patient.gender}</span>
                <span>•</span>
                <span>ID: {patient.id}</span>
              </div>
            </div>
            <div className="bg-blue-600 px-6 py-4 rounded-2xl text-white text-center shadow-lg shadow-blue-100 min-w-[120px]">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Blood Group</p>
              <p className="text-3xl font-black">{patient.bloodGroup}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Critical Info Panel */}
            <div className="p-8 space-y-8 border-r border-slate-100">
              
              {/* Red for Allergies */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                   <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                   Drug & Food Allergies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map(a => (
                    <span key={a} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm font-bold">
                      {a}
                    </span>
                  ))}
                </div>
              </section>

              {/* Yellow for Conditions */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-4 flex items-center gap-2">
                   <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                   Medical Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalConditions.map(c => (
                    <span key={c} className="px-3 py-1.5 bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-lg text-sm font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </section>

              {!isEmergency && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Current Medications</h3>
                  <ul className="space-y-2">
                    {patient.medications.map(m => (
                      <li key={m} className="flex items-center gap-3 text-slate-700 font-medium">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        {m}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* AI Summary / Interaction Panel */}
            <div className="p-8 bg-slate-50/50">
              {!isEmergency ? (
                <>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Gemini AI Intelligence</h3>
                  {aiSummary ? (
                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mb-6">
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
                      <button 
                         onClick={handleGenerateSummary}
                         className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-800"
                         disabled={isGeneratingSummary}
                      >
                         Refresh AI Analysis
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/80 p-10 rounded-2xl border-2 border-dashed border-blue-100 text-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Need a medical summary?</h4>
                      <p className="text-xs text-slate-500 mb-6">Our AI can analyze patient history to provide a concise overview of health risks.</p>
                      <button 
                        onClick={handleGenerateSummary}
                        disabled={isGeneratingSummary}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
                      >
                        {isGeneratingSummary ? (
                          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
                        ) : (
                          'Analyze with Gemini Pro'
                        )}
                      </button>
                    </div>
                  )}
                  
                  <div className="p-4 bg-slate-100 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last System Sync</p>
                    <p className="text-xs font-medium text-slate-600">{patient.lastUpdate}</p>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                   <div className="p-6 bg-red-100 rounded-full text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                   </div>
                   <div>
                     <h4 className="text-xl font-black text-slate-900 mb-2">Rescuer Directives</h4>
                     <p className="text-sm text-slate-600">Proceed with standard emergency protocol. Patient blood type and allergies are verified as of today.</p>
                   </div>
                   <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-200">Call Emergency Hub</button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {!isEmergency && (
          <div className="mt-8 flex justify-between items-center text-slate-400 text-xs px-2">
            <p>Confidential: For Authorized Medical Personnel Only</p>
            <p>Session ID: {Math.random().toString(16).slice(2, 10)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
