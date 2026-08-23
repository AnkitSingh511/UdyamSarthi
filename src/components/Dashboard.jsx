import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategorySelector } from './CategorySelector';
import { DynamicBusinessForm } from './DynamicBusinessForm';
import { HyperLocalMap } from './HyperLocalMap';
import { MudraLoanCard } from './MudraLoanCard';
import { FinancialEngine } from './FinancialEngine';
import { AIAdvisor } from './AIAdvisor';
import { 
  BarChart2, 
  Map, 
  Building2, 
  Bot, 
  Sliders, 
  WifiOff, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Dashboard = () => {
  const { isOnline, category, district, user, t } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Offline Mode Banner when offline */}
      {!isOnline && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-between shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Offline Cache Active: Operating with local cached mandi rates & PM MUDRA loan guidelines for {district.name}.
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
            Local Sync Ready
          </span>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyper-Local Advisory Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome, {user?.name || 'Micro Entrepreneur'} 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Personalized intelligence for rural businesses in <span className="text-amber-400 font-semibold">{district.name}, {district.state}</span>. Get real-time 5-7km local market connections, non-hallucinated financial calculations, and PM MUDRA collateral-free loan advisory.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Current Category</span>
              <span className="text-sm font-extrabold text-brand-400 capitalize">{category.replace('_', ' ')}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">5-7km Network</span>
              <span className="text-sm font-extrabold text-amber-400">Verified Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Category Selection Bar */}
      <CategorySelector />

      {/* Navigation View Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Full Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('spatial')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'spatial'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>5-7km Local Network</span>
        </button>

        <button
          onClick={() => setActiveTab('mudra')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mudra'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>PM MUDRA Loan</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ai'
              ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Voice & AI Advisory</span>
        </button>
      </div>

      {/* Tab Views Content */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Dynamic Business Form */}
          <DynamicBusinessForm />

          {/* 5-7km Spatial Network Map */}
          <HyperLocalMap />

          {/* PM MUDRA Loan Advisory Deck */}
          <MudraLoanCard />

          {/* Financial Engine & Analytics */}
          <FinancialEngine />

          {/* AI Advisor Chat & Voice */}
          <AIAdvisor />
        </div>
      )}

      {activeTab === 'spatial' && (
        <div className="space-y-6">
          <HyperLocalMap />
        </div>
      )}

      {activeTab === 'mudra' && (
        <div className="space-y-6">
          <MudraLoanCard />
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-6">
          <AIAdvisor />
        </div>
      )}

    </div>
  );
};
