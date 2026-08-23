import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ActivityLogDrawer } from './components/ActivityLogDrawer';
import { Dashboard } from './components/Dashboard';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

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
