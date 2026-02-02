
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="text-2xl font-bold text-blue-600">SmartHealth</div>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Sign In</Link>
          <Link to="/emergency-scan" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200">Emergency Scan</Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            Next-Gen Medical Access
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Scan QR. Get patient details. <br/><span className="text-blue-600">Save lives.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            The Smart Digital Health Card System provides instantaneous access to critical medical information for emergency responders and doctors, ensuring better patient outcomes through faster data delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/emergency-scan" className="flex flex-col items-center p-8 bg-white rounded-2xl border border-red-100 shadow-xl shadow-red-50 hover:border-red-300 transition-all group">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Emergency Scan</h3>
              <p className="text-sm text-slate-500">Instant access for responders. No login required.</p>
            </Link>

            <Link to="/login" className="flex flex-col items-center p-8 bg-white rounded-2xl border border-blue-100 shadow-xl shadow-blue-50 hover:border-blue-300 transition-all group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Doctor Login</h3>
              <p className="text-sm text-slate-500">Access full history, reports and AI summaries.</p>
            </Link>

            <Link to="/login" className="flex flex-col items-center p-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-50 hover:border-slate-300 transition-all group">
              <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Admin Login</h3>
              <p className="text-sm text-slate-500">Manage patients and generate security cards.</p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-slate-200 text-center text-slate-400 text-sm bg-white">
        &copy; 2024 Smart Digital Health Card System. Secure & Confidential.
      </footer>
    </div>
  );
};

export default Home;
