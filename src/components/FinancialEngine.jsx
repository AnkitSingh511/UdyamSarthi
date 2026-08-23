import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  IndianRupee, 
  Lightbulb, 
  ShieldCheck, 
  Target, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const FinancialEngine = () => {
  const { category, profileData, calculateMudraEligibility, district, t } = useApp();
  const eligibility = calculateMudraEligibility();

  const rev = Number(profileData.monthlyRevenue || 0);
  const exp = Number(profileData.monthlyExpenses || 0);
  const netProfit = Math.max(rev - exp, 0);
  const profitMarginPercent = rev > 0 ? Math.round((netProfit / rev) * 100) : 0;

  // Financial Health Score Calculation (0-100)
  let healthScore = 70;
  if (profitMarginPercent > 35) healthScore += 15;
  else if (profitMarginPercent < 15) healthScore -= 15;
  
  if (eligibility.debtServiceRatio < 30) healthScore += 10;
  else if (eligibility.debtServiceRatio > 50) healthScore -= 20;

  healthScore = Math.min(Math.max(healthScore, 20), 98);

  // Chart Data for Cash Flow Breakdown
  const cashFlowChartData = {
    labels: ['Monthly Revenue', 'Operating Cost', 'Net Profit', 'MUDRA EMI'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [rev, exp, netProfit, eligibility.monthlyEmi],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Emerald
          'rgba(244, 63, 94, 0.8)',  // Rose
          'rgba(245, 158, 11, 0.8)',  // Amber
          'rgba(59, 130, 246, 0.8)'   // Blue
        ],
        borderColor: [
          '#10b981',
          '#f43f5e',
          '#f59e0b',
          '#3b82f6'
        ],
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' }
      }
    }
  };

  // Actionable Insights depending on category
  const getActionableInsights = () => {
    switch (category) {
      case 'farmer':
        return {
          whatToProduce: "Hold 40% wheat harvest in dry storage for 30 days. Mandi prices in Karnal are projected to rise by ₹140/quintal after peak arrival ends.",
          pricing: `Target APMC Mandi price of ₹2,425/quintal. Direct mill selling within 6.2km saves ₹35/quintal transport cost.`,
          inventory: "Procure certified DAP fertilizer from authorized store within 1.4km before seasonal price hike.",
          growth: "Install solar dryer using PM MUDRA Kishor Loan to reduce post-harvest moisture losses from 8% to 1.5%."
        };
      case 'dairy':
        return {
          whatToProduce: "Increase buffalo milk proportion to maintain average fat content above 6.5%. Co-op pays +₹3.5/L bonus for high fat SNF.",
          pricing: `Supply directly to Amul Chilling Hub at 1.8km for ₹49.5/L buffalo milk rate with daily bank settlement.`,
          inventory: "Buy bypass-fat feed from local nutrition mill at 3.8km. Boosts daily milk yield by 1.2L per cow.",
          growth: "Use ₹3.5 Lakh MUDRA Kishor loan to buy 2 Murrah buffaloes. Adds estimated ₹28,000 net monthly cash flow."
        };
      case 'retail':
        return {
          whatToProduce: "Stock fast-moving packaged oil, tea & festive dry fruits. High margin category (14% gross margin).",
          pricing: "Offer bulk discount bundles for rural wedding season orders to outpace big city online deliveries.",
          inventory: "Reduce inventory hold time from 28 days to 14 days to free up ₹45,000 working capital.",
          growth: "Apply for ₹2.5 Lakh MUDRA loan to install commercial refrigerator and digital POS system."
        };
      case 'food_processing':
        return {
          whatToProduce: "Expand small consumer pouch packing (100g/250g turmeric & chilli powder) over 50kg bulk bags.",
          pricing: "Direct retail store supply gives ₹180/kg price vs ₹135/kg bulk wholesale price.",
          inventory: "Source raw spices directly from Nashik APMC Yard at 3.2km to cut raw material cost by 11%.",
          growth: "Utilize ₹6.5 Lakh MUDRA Tarun Loan to acquire automatic stainless steel pulverizer machine."
        };
      default:
        return {};
    }
  };

  const insights = getActionableInsights();

  return (
    <div className="space-y-6">
      
      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Health Score */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.financialHealth}</span>
            <div className="text-2xl font-black font-mono text-white mt-1 flex items-baseline space-x-1">
              <span>{healthScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
              {healthScore > 75 ? 'Excellent Capacity' : 'Stable Financial Health'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-black text-sm">
            {healthScore}%
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.monthlyRevenue}</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              ₹{rev.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Gross Earnings</span>
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.monthlyExpenses}</span>
            <div className="text-xl font-bold font-mono text-rose-400 mt-1">
              ₹{exp.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
              <TrendingDown className="w-3 h-3 text-rose-400" />
              <span>Input & Feed Expenses</span>
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <PieChart className="w-6 h-6" />
          </div>
        </div>

        {/* Net Profit Margin */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.netProfitMargin}</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">
              {profitMarginPercent}%
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Net Surplus: ₹{netProfit.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Chart & Financial Cash Flow Analysis */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Cash Flow & MUDRA Debt Capacity Analysis</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            District: {district.name}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <Bar data={cashFlowChartData} options={chartOptions} />
        </div>
      </div>

      {/* Actionable Non-Generic Advisory Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>{t.actionableTitle} ({category.toUpperCase()})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* What to Produce / Sell */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <Target className="w-4 h-4" />
              <span>{t.whatToProduce}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {insights.whatToProduce}
            </p>
          </div>

          {/* Pricing & Mandi Selection */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <IndianRupee className="w-4 h-4" />
              <span>{t.pricingDecision}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {insights.pricing}
            </p>
          </div>

          {/* Inventory & Feed Advice */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-2 text-xs font-bold text-sky-400">
              <PieChart className="w-4 h-4" />
              <span>{t.inventoryPlanning}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {insights.inventory}
            </p>
          </div>

          {/* 5-7km Growth Opportunities */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>{t.growthOpp}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {insights.growth}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
