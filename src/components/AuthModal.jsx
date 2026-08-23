import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_PROFILES } from '../data/mockDatasets';
import { X, UserCheck, ShieldCheck, Sprout, Milk, ShoppingBag, Factory, Lock } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, t } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a valid username');
      return;
    }
    
    // Check if matches demo or build new custom user
    const matched = DEMO_PROFILES.find(p => p.username.toLowerCase() === username.trim().toLowerCase());
    if (matched) {
      loginUser(matched);
    } else {
      loginUser({
        username: username.trim(),
        name: username.trim().replace('_', ' '),
        category: 'farmer',
        districtId: 'karnal',
        phone: '+91 98000 00000',
        details: {
          landSizeAcres: 3.0,
          cropType: 'Wheat',
          monthlyRevenue: 45000,
          monthlyExpenses: 20000,
          loanRequiredAmount: 100000,
          loanPurpose: 'Agri equipment & fertilizer purchase'
        }
      });
    }
    onClose();
  };

  const handleDemoSelect = (profile) => {
    loginUser(profile);
    onClose();
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'farmer': return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'dairy': return <Milk className="w-5 h-5 text-sky-400" />;
      case 'retail': return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'food_processing': return <Factory className="w-5 h-5 text-purple-400" />;
      default: return <UserCheck className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-brand-400" />
            <h2 className="text-lg font-bold text-white">{t.login} - UdyamSarthi</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Quick 1-Click Demo Profiles */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
              Fast Demo Login (Select Micro-Entrepreneur Profile)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {DEMO_PROFILES.map((profile) => (
                <button
                  key={profile.username}
                  onClick={() => handleDemoSelect(profile)}
                  className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-brand-500/50 text-left transition-all group"
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(profile.category)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-brand-300">
                      {profile.name}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      {profile.category.replace('_', ' ')}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-slate-800"></div>
            <span className="px-3 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with custom credentials</span>
            <div className="flex-1 border-t border-slate-800"></div>
          </div>

          {/* Custom Credentials Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Username / Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ramesh_farmer or 9812345678"
                  className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all"
            >
              {t.login}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
