
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-black text-slate-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8">The health record or page you're looking for doesn't exist or has been relocated.</p>
        <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
