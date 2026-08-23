import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, Milk, ShoppingBag, Factory, ArrowRight } from 'lucide-react';

export const CategorySelector = () => {
  const { category, updateCategory, t } = useApp();

  const categories = [
    {
      id: 'farmer',
      title: t.categoryFarmer,
      desc: t.categoryFarmerDesc,
      icon: Sprout,
      color: 'from-emerald-500/20 to-emerald-700/10 border-emerald-500/30 text-emerald-400',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
      tag: 'Crops & Mandi'
    },
    {
      id: 'dairy',
      title: t.categoryDairy,
      desc: t.categoryDairyDesc,
      icon: Milk,
      color: 'from-sky-500/20 to-blue-700/10 border-sky-500/30 text-sky-400',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/20',
      tag: 'Livestock & Fat Rate'
    },
    {
      id: 'retail',
      title: t.categoryRetail,
      desc: t.categoryRetailDesc,
      icon: ShoppingBag,
      color: 'from-amber-500/20 to-orange-700/10 border-amber-500/30 text-amber-400',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
      tag: 'Inventory & Credit'
    },
    {
      id: 'food_processing',
      title: t.categoryFoodProc,
      desc: t.categoryFoodProcDesc,
      icon: Factory,
      color: 'from-purple-500/20 to-indigo-700/10 border-purple-500/30 text-purple-400',
      activeBorder: 'border-purple-500 ring-2 ring-purple-500/20',
      tag: 'B2B & Machinery'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <span>{t.selectCategory}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Platform data collection and AI recommendations adapt dynamically based on your category
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = category === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => updateCategory(cat.id)}
              className={`relative text-left p-5 rounded-2xl bg-gradient-to-b ${cat.color} border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-full group ${
                isSelected ? `${cat.activeBorder} shadow-xl` : 'hover:border-slate-600'
              }`}
            >
              {/* Category Badge Tag */}
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-300">
                  {cat.tag}
                </span>
              </div>

              {/* Text Information */}
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {cat.desc}
                </p>
              </div>

              {/* Selection Status indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-slate-100 font-bold' : 'text-slate-500'}>
                  {isSelected ? 'Active Category' : 'Select Category'}
                </span>
                <div className={`p-1 rounded-full transition-transform ${isSelected ? 'bg-white text-slate-900 translate-x-1' : 'bg-slate-800 text-slate-400 group-hover:translate-x-1'}`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
