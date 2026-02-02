
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.DOCTOR);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Authentication Logic
    const isDoctor = email === 'doctor@example.com' && password === 'password' && role === UserRole.DOCTOR;
    const isAdmin = email === 'admin@example.com' && password === 'password' && role === UserRole.ADMIN;

    if (isDoctor || isAdmin) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: isDoctor ? 'Dr. Sarah Connor' : 'System Administrator',
        role
      };
      onLogin(mockUser);
      navigate(role === UserRole.ADMIN ? '/admin' : '/doctor');
    } else {
      setError('Invalid credentials or role selection. (Try doctor@example.com / password)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block text-3xl font-black text-blue-600 mb-2">SmartHealth</Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Professional Portal</h2>
        <p className="mt-2 text-sm text-slate-600">Enter your credentials to access clinical records.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200 rounded-3xl border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">I am signing in as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.DOCTOR)}
                  className={`py-2.5 px-4 text-sm font-bold rounded-xl border transition-all ${
                    role === UserRole.DOCTOR 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`py-2.5 px-4 text-sm font-bold rounded-xl border transition-all ${
                    role === UserRole.ADMIN 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-lg animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                required
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" id="pass-label" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98]"
            >
              Authorize Session
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">Return to Public Homepage</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest">
          Secure Biometric-Ready Encryption • HIPAA Compliant Placeholder
        </div>
      </div>
    </div>
  );
};

export default Login;
