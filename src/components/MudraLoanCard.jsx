import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PM_MUDRA_SCHEME_DATA } from '../data/mockDatasets';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Percent, 
  Calendar, 
  FileText, 
  Sparkles, 
  IndianRupee,
  ArrowRight,
  Download,
  Info,
  ChevronRight
} from 'lucide-react';

export const MudraLoanCard = () => {
  const { calculateMudraEligibility, profileData, updateProfileData, t, logActivity } = useApp();
  const eligibility = calculateMudraEligibility();

  const [customLoanAmount, setCustomLoanAmount] = useState(profileData.loanRequiredAmount || 150000);
  const [tenureYears, setTenureYears] = useState(5);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // Recalculate on slider change
  const annualRate = 0.095; // 9.5% average rate
  const r = annualRate / 12;
  const n = tenureYears * 12;
  const simulatedEmi = Math.round((customLoanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) || 0;

  let currentTier = PM_MUDRA_SCHEME_DATA.tiers[0];
  if (customLoanAmount > 500000) {
    currentTier = PM_MUDRA_SCHEME_DATA.tiers[2]; // Tarun
  } else if (customLoanAmount > 50000) {
    currentTier = PM_MUDRA_SCHEME_DATA.tiers[1]; // Kishor
  }

  const handleGenerateDraft = () => {
    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowDraftModal(true);
    logActivity('MUDRA Draft Generated', `Generated application draft for ₹${customLoanAmount.toLocaleString('en-IN')} under ${currentTier.name}`);
  };

  const getTierColor = (tierId) => {
    switch (tierId) {
      case 'shishu': return 'from-blue-500/20 to-blue-700/10 border-blue-500/40 text-blue-400';
      case 'kishor': return 'from-amber-500/20 to-amber-700/10 border-amber-500/40 text-amber-400';
      case 'tarun': return 'from-emerald-500/20 to-emerald-700/10 border-emerald-500/40 text-emerald-400';
      default: return 'from-slate-800 to-slate-900 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-100">{t.mudraSchemeTitle}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PMMY GOVT SCHEME
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.mudraSchemeSubtitle}</p>
          </div>
        </div>

        {/* Collateral Guarantee Badge */}
        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-400">Collateral Requirement</div>
            <div>{t.noCollateral}</div>
          </div>
        </div>
      </div>

      {/* Interactive Loan Requirement Slider */}
      <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">
            Adjust Loan Requirement Amount
          </label>
          <div className="text-lg font-extrabold font-mono text-amber-400">
            ₹{customLoanAmount.toLocaleString('en-IN')}
          </div>
        </div>

        <input
          type="range"
          min="10000"
          max="1000000"
          step="10000"
          value={customLoanAmount}
          onChange={(e) => {
            const val = Number(e.target.value);
            setCustomLoanAmount(val);
            updateProfileData({ loanRequiredAmount: val });
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>₹10,000 (Shishu Min)</span>
          <span>₹5,00,000 (Kishor Max)</span>
          <span>₹10,00,000 (Tarun Max)</span>
        </div>
      </div>

      {/* Recommended MUDRA Tier Card */}
      <div className={`p-5 rounded-2xl bg-gradient-to-r ${getTierColor(currentTier.id)} border space-y-3`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
              {t.mudraCategory}
            </span>
            <h4 className="text-lg font-black text-white">{currentTier.name}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-300 block">Max Limit</span>
            <span className="text-sm font-mono font-bold text-white">
              Up to ₹{currentTier.maxAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed">
          {currentTier.targetUser}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-slate-300 block">Est. Interest Rate</span>
            <span className="font-bold text-white">8.5% - 9.5% p.a.</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 block">Simulated Monthly EMI</span>
            <span className="font-bold text-amber-300 font-mono">₹{simulatedEmi.toLocaleString('en-IN')}/mo</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 block">Tenure Period</span>
            <span className="font-bold text-white">{tenureYears} Years (60 Mo)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-300 block">Processing Fee</span>
            <span className="font-bold text-emerald-300">ZERO (Waived)</span>
          </div>
        </div>
      </div>

      {/* Grid: Document Checklist & Application Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Checklist */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Required Documents Checklist</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {PM_MUDRA_SCHEME_DATA.documentChecklist.map((doc, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Guidance */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>5-Step Application Process</span>
          </h4>
          <div className="space-y-2.5">
            {PM_MUDRA_SCHEME_DATA.stepByStepApplication.map((item) => (
              <div key={item.step} className="flex items-start space-x-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/40 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <span className="font-bold text-slate-200">{item.title}: </span>
                  <span className="text-slate-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Generate Application Draft Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400 flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Apply directly at any Public Sector Bank (SBI, PNB, BOB) or online via jansamarth.in</span>
        </div>

        <button
          onClick={handleGenerateDraft}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{t.generateDraft}</span>
        </button>
      </div>

      {/* Modal Draft Preview */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  PM MUDRA Loan Proposal Draft
                </h3>
              </div>
              <button
                onClick={() => setShowDraftModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono space-y-2">
              <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
                APPLICATION DETAILS & FINANCIAL SUMMARY
              </div>
              <div>Applicant Name: {profileData.name || 'Micro Entrepreneur'}</div>
              <div>Category: {profileData.cropType || profileData.processingUnitType || 'Rural Micro Enterprise'}</div>
              <div>Recommended Tier: {currentTier.name}</div>
              <div>Requested Credit: ₹{customLoanAmount.toLocaleString('en-IN')}</div>
              <div>Estimated Monthly EMI: ₹{simulatedEmi.toLocaleString('en-IN')} (at 9.5% p.a., 5 Years)</div>
              <div>Security / Guarantee: Collateral-Free (Covered by CGTMSE)</div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed">
              Present this drafted summary along with your Aadhaar, Udyam Registration, and quotation at your nearest bank branch for fast-track 7-day approval.
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowDraftModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('MUDRA Loan draft downloaded successfully to local storage!');
                  setShowDraftModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Save Proposal PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
