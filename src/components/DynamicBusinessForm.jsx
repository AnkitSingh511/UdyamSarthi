import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SlidersHorizontal, Save, Sparkles, AlertCircle, IndianRupee, Layers } from 'lucide-react';

export const DynamicBusinessForm = () => {
  const { category, profileData, updateProfileData, t } = useApp();
  const [formData, setFormData] = useState(profileData);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync formData when category or context profile changes
  React.useEffect(() => {
    setFormData(profileData);
  }, [profileData, category]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileData(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">
            Adapted Data Collection Form ({category.toUpperCase().replace('_', ' ')})
          </h3>
        </div>
        {savedNotice && (
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.saveSuccess}</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Dynamic Fields per Category */}
        {category === 'farmer' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Land Size (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={formData.landSizeAcres || ''}
                onChange={(e) => handleChange('landSizeAcres', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Crop(s)</label>
              <input
                type="text"
                value={formData.cropType || ''}
                onChange={(e) => handleChange('cropType', e.target.value)}
                placeholder="e.g. Wheat, Mustard, Paddy"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Expected Yield (Quintals)</label>
              <input
                type="number"
                value={formData.expectedYieldQuintals || ''}
                onChange={(e) => handleChange('expectedYieldQuintals', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Current Stored Crop (Quintals)</label>
              <input
                type="number"
                value={formData.currentStorageQuintals || ''}
                onChange={(e) => handleChange('currentStorageQuintals', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {category === 'dairy' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Total Herd Count (Animals)</label>
              <input
                type="number"
                value={formData.herdSize || ''}
                onChange={(e) => handleChange('herdSize', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Milk Output (Liters)</label>
              <input
                type="number"
                value={formData.dailyMilkProductionLiters || ''}
                onChange={(e) => handleChange('dailyMilkProductionLiters', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Milk Fat Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.fatPercentage || ''}
                onChange={(e) => handleChange('fatPercentage', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Co-op Payout Rate (₹/Liter)</label>
              <input
                type="number"
                step="0.5"
                value={formData.dairyCoopRatePerLiter || ''}
                onChange={(e) => handleChange('dairyCoopRatePerLiter', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {category === 'retail' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Shop Floor Area (Sq. Ft.)</label>
              <input
                type="number"
                value={formData.shopSizeSqFt || ''}
                onChange={(e) => handleChange('shopSizeSqFt', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Average Daily Sales (₹)</label>
              <input
                type="number"
                value={formData.dailySales || ''}
                onChange={(e) => handleChange('dailySales', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Working Capital Gap (₹)</label>
              <input
                type="number"
                value={formData.workingCapitalGap || ''}
                onChange={(e) => handleChange('workingCapitalGap', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Existing Debt / Credit (₹)</label>
              <input
                type="number"
                value={formData.existingDebt || ''}
                onChange={(e) => handleChange('existingDebt', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {category === 'food_processing' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Processing Unit Type</label>
              <input
                type="text"
                value={formData.processingUnitType || ''}
                onChange={(e) => handleChange('processingUnitType', e.target.value)}
                placeholder="e.g. Flour & Spice Mill"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Capacity (Kg)</label>
              <input
                type="number"
                value={formData.dailyCapacityKg || ''}
                onChange={(e) => handleChange('dailyCapacityKg', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Raw Material Source</label>
              <input
                type="text"
                value={formData.rawMaterialSource || ''}
                onChange={(e) => handleChange('rawMaterialSource', e.target.value)}
                placeholder="e.g. Nearby Mandi / Direct Farmers"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Existing Machine Loans (₹)</label>
              <input
                type="number"
                value={formData.existingDebt || ''}
                onChange={(e) => handleChange('existingDebt', parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {/* Common Financial & PM MUDRA Requirements Section */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Gross Revenue (₹)</label>
            <input
              type="number"
              value={formData.monthlyRevenue || ''}
              onChange={(e) => handleChange('monthlyRevenue', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Operating Expenses (₹)</label>
            <input
              type="number"
              value={formData.monthlyExpenses || ''}
              onChange={(e) => handleChange('monthlyExpenses', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-rose-400 focus:border-rose-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">PM MUDRA Loan Requirement (₹)</label>
            <input
              type="number"
              value={formData.loanRequiredAmount || ''}
              onChange={(e) => handleChange('loanRequiredAmount', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 150000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-400 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Submit & Recalculate Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{t.submitProfile}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
