import React, { useState } from 'react';
import marketData from './mocks/marketRates.json';
import shopData from './mocks/shopStatus.json';
import aiData from './mocks/aiAdvisory.json';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ActivityLogDrawer } from './components/ActivityLogDrawer';
import { Dashboard } from './components/Dashboard';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';
import './index.css'; // Tailwind CSS file (Vite me usually index.css ya App.css hoti hai)

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  // Yahan hum browser console mein data test kar rahe hain
  console.log("1. Mandi Data: ", marketData);
  console.log("2. Dukaan Data: ", shopData);
  console.log("3. AI Salah Data: ", aiData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      <div>
        <Navbar
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenActivity={() => setIsActivityOpen(true)}
        />
        <main>
          <Dashboard />
        </main>
      </div>

      {/* Modals & Slide-over Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <ActivityLogDrawer
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />

      {/* 🔴 APNA MASTER DATA UI YAHAN SE SHURU HAI 🔴 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        
        {/* 1. SHOP STATUS (Digital Khata) */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Dashboard: {shopData.owner_name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Liquid Cash (Haath me)</p>
              <p className="text-2xl font-bold text-emerald-400">₹{shopData.financials.liquid_cash_in_hand}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Udhaari (Market me)</p>
              <p className="text-2xl font-bold text-red-400">₹{shopData.financials.total_market_credit}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Low Stock Alert</p>
              <p className="text-lg font-medium text-orange-400">{shopData.inventory_alerts.low_stock.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* 2. MARKET RATES */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Local Mandi Bhav ({marketData.location})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.items.map((item) => (
              <div key={item.item_id} className="bg-slate-700 border border-slate-600 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-slate-300 mt-1">₹{item.current_price}</p>
                <p className={`mt-1 font-medium text-sm ${item.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {item.trend === 'up' ? '↑ Bhaari Demand' : '↓ Sasta Hua'} ({item.trend_percentage}%)
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AI ADVISORY CARDS */}
        <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            ✨ AI Vyapar Salah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(aiData.advisory).map((advice, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-lg font-bold text-white mb-2">{advice.icon} {advice.title}</h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{advice.message}</p>
                <button className="bg-emerald-500/20 text-emerald-400 text-sm font-semibold py-2 px-4 rounded hover:bg-emerald-500/30 w-full transition-colors">
                  {advice.action_item}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* 🔴 APNA MASTER DATA UI YAHAN KHATAM 🔴 */}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">UdyamSarthi</span>
            <span>— AI-Driven Hyper-Local Business Advisory Platform</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Rule Engine + ML Intelligence</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}