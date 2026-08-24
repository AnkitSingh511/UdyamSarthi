import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_PROFILES } from '../data/mockDatasets';
import { api } from '../services/api';
import { X, UserCheck, ShieldCheck, Sprout, Milk, ShoppingBag, Factory, Lock, UserPlus } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, t } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('farmer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        const res = await api.register({
          username: username.trim(),
          password: password.trim(),
          name: name.trim(),
          category,
          districtId: 'karnal'
        });
        loginUser(res.user);
      } else {
        // Try Backend Login
        try {
          const res = await api.login(username.trim(), password.trim());
          loginUser(res.user);
        } catch (apiErr) {
          // Fallback check if user matches offline demo profile
          const matched = DEMO_PROFILES.find(p => p.username.toLowerCase() === username.trim().toLowerCase());
          if (matched) {
            loginUser(matched);
          } else {
            throw apiErr;
          }
        }
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Check your credentials or backend server status.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = async (profile) => {
    setLoading(true);
    try {
      // Attempt backend authentication for demo user (default password: password123)
      const res = await api.login(profile.username, 'password123');
      loginUser(res.user);
    } catch (err) {
      // Fallback offline login
      loginUser(profile);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'farmer': return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'dairy': return <Milk className="w-5 h-5 text-sky-400" />;
      case 'retail': return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'food_vendor':
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
            <h2 className="text-lg font-bold text-white">
              {isRegister ? 'Register' : t.login} - UdyamSarthi
            </h2>
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
          {!isRegister && (
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
          )}

          {!isRegister && (
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-800"></div>
              <span className="px-3 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with JWT auth</span>
              <div className="flex-1 border-t border-slate-800"></div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                {error}
              </div>
            )}

            {isRegister && (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="farmer">Farmer / Crop Producer</option>
                    <option value="dairy">Dairy & Livestock</option>
                    <option value="retail">Kirana & Retail Store</option>
                    <option value="food_vendor">Food Processing & Vendor</option>
                    <option value="artisan">Handicraft & Artisan</option>
                    <option value="apparel">Textile & Apparel</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Username / Phone
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. ramesh_farmer or 9812345678"
                className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
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
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : isRegister ? 'Create Account & Sign In' : t.login}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsRegister(!isRegister); setError(''); }}
                className="text-xs text-brand-400 hover:underline inline-flex items-center space-x-1"
              >
                {isRegister ? (
                  <span>Already have an account? Sign In</span>
                ) : (
                  <span>New user? Create a MongoDB user account</span>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
