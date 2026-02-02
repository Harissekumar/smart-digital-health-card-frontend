import React from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;

  const isAdmin = user.role === UserRole.ADMIN;
  const menuItems = isAdmin 
    ? [
        { label: 'Overview', path: '/admin' },
        { label: 'Add Patient', path: '/admin/add' },
        { label: 'Patient List', path: '/admin/list' },
      ]
    : [
        { label: 'Scanner', path: '/doctor' },
        { label: 'Manual Input', path: '/doctor/manual' },
      ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">S</span>
            SmartHealth
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {isAdmin ? 'Admin Portal' : 'Doctor Portal'}
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
          </div>
          <Link to="/settings" className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
            Settings
          </Link>
          <button 
            onClick={() => { onLogout(); navigate('/'); }}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <Link to="/" className="text-lg font-bold text-blue-600">SmartHealth</Link>
          <div className="flex gap-4">
             <Link to="/settings" className="text-slate-600 text-sm font-medium">Profile</Link>
             <button onClick={onLogout} className="text-red-600 text-sm font-medium">Logout</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;