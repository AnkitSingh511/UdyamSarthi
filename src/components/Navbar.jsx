import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS } from '../data/mockDatasets';
import { 
  Sprout, 
  Globe, 
  MapPin, 
  Wifi, 
  WifiOff, 
  User, 
  History, 
  LogOut, 
  LogIn,
  ChevronDown,
  Navigation,
  Loader2
} from 'lucide-react';

export const Navbar = ({ onOpenAuth, onOpenActivity }) => {
  const { 
    lang, 
    setLang, 
    t, 
    isOnline, 
    toggleOnlineMode, 
    user, 
    logoutUser, 
    district, 
    setDistrictById,
    gpsActive,
    gpsLoading,
    requestGpsLocation
  } = useApp();

  const [distDropdownOpen, setDistDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-earth-400 p-0.5 shadow-lg shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-brand-400 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 uppercase tracking-wider">
                  v1.0 AI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center Actions: Location & Hybrid Online/Offline */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* District & Geolocation Picker */}
            <div className="relative">
              <button
                onClick={() => setDistDropdownOpen(!distDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 transition-all"
              >
                {gpsLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ) : (
                  <MapPin className={`w-3.5 h-3.5 ${gpsActive ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                )}
                <span className="font-medium">
                  {gpsLoading ? (t.gpsAcquiring || "Locating...") : `${district.name}, ${district.state}`}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {distDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2">
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Rural District
                  </div>
                  {DISTRICTS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDistrictById(d.id);
                        setDistDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        district.id === d.id && !gpsActive ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{d.name}, {d.state}</span>
                      {district.id === d.id && !gpsActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>}
                    </button>
                  ))}
                  <div className="border-t border-slate-800 mt-2 pt-2">
                    <button
                      onClick={() => {
                        requestGpsLocation();
                        setDistDropdownOpen(false);
                      }}
                      disabled={gpsLoading}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors font-medium"
                    >
                      {gpsLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      ) : (
                        <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{gpsActive ? (t.gpsRecalibrate || "Recalibrate Live GPS") : (t.gpsDetect || "Detect My Live GPS")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hybrid Online / Offline Status Button */}
            <button
              onClick={toggleOnlineMode}
              title="Click to toggle hybrid online/offline simulation mode"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isOnline 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isOnline ? t.online : t.offline}</span>
            </button>

          </div>

          {/* Right Actions: Language Switcher, Activity Log, Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>

            {/* User Activity Trail Drawer Trigger */}
            <button
              onClick={onOpenActivity}
              title={t.activityLog}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors relative"
            >
              <History className="w-4 h-4 text-emerald-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            {/* Auth Profile / Login Button */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                  <span className="text-[10px] text-brand-400 capitalize">{user.category}</span>
                </div>
                <button
                  onClick={logoutUser}
                  title={t.logout}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
