
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '../constants';
import { Patient } from '../types';

const AdminOverview = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-black mb-2 text-slate-900">Admin Overview</h1>
    <p className="text-slate-500 mb-8">System performance and registry statistics.</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Patients</p>
        <p className="text-4xl font-black text-slate-900">{MOCK_PATIENTS.length}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Active Cards</p>
        <p className="text-4xl font-black text-blue-600">1,248</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sync Status</p>
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
           <p className="text-lg font-bold text-slate-900">Healthy</p>
        </div>
      </div>
    </div>
    
    <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <h2 className="text-2xl font-black mb-2">Registration Portal</h2>
        <p className="text-slate-400 mb-8 text-sm max-w-md">Onboard new citizens into the SmartHealth network and generate their unique cryptographic QR identity.</p>
        <Link to="/admin/add" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95">Register New Patient</Link>
      </div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full"></div>
    </div>
  </div>
);

const AddPatient = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <h1 className="text-3xl font-black text-slate-900">Add Patient</h1>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 font-bold rounded-xl flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          Patient added successfully to the registry.
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
              <input type="text" placeholder="John Doe" required className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Date of Birth</label>
              <input type="date" required className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Blood Group</label>
              <select className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Emergency Contact</label>
              <input type="tel" placeholder="+1 234 567 8900" required className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Allergies</label>
            <input type="text" placeholder="e.g. Penicillin, Peanuts (separate with commas)" className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Known Medical Conditions</label>
            <textarea rows={4} placeholder="Summarize chronic illnesses or recent surgeries..." className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/admin" className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Discard</Link>
            <button type="submit" className="px-10 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Commit to Registry</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PatientList = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Patient Directory</h1>
        <p className="text-slate-500">View and manage all registered health profiles.</p>
      </div>
      <div className="flex gap-2">
         <div className="relative">
            <input type="text" placeholder="Search ID..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         </div>
         <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">Export CSV</button>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Profile</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient ID</th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Blood Group</th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {MOCK_PATIENTS.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" src={p.profileImage} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500">Last updated {p.lastUpdate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{p.id}</code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-black rounded-lg ${
                  p.bloodGroup.includes('O') ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.bloodGroup}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-4 font-bold">QR Gen</button>
                <Link to={`/patient/${p.id}`} className="text-slate-900 hover:text-blue-600 font-bold underline underline-offset-4">View Record</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminOverview />} />
      <Route path="/add" element={<AddPatient />} />
      <Route path="/list" element={<PatientList />} />
    </Routes>
  );
};

export default AdminDashboard;
