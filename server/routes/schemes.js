import express from 'express';

const router = express.Router();

export const PM_MUDRA_SCHEME_DATA = {
  name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
  tiers: [
    {
      category: 'Shishu',
      maxAmount: 50000,
      description: 'Loans up to ₹50,000 for early micro-entrepreneurs & micro activities.',
      interestRate: '8.4% - 9.5% p.a.',
      subsidy: 'Interest subvention of 2% under Mudra special incentive scheme'
    },
    {
      category: 'Kishor',
      maxAmount: 500000,
      minAmount: 50001,
      description: 'Loans above ₹50,000 and up to ₹5 Lakhs for business expansion.',
      interestRate: '9.2% - 10.5% p.a.',
      subsidy: 'CGTMSE credit guarantee coverage with zero collateral'
    },
    {
      category: 'Tarun',
      maxAmount: 1000000,
      minAmount: 500001,
      description: 'Loans above ₹5 Lakhs and up to ₹10 Lakhs for established enterprises.',
      interestRate: '9.8% - 11.2% p.a.',
      subsidy: 'Priority sector lending speed clearance & digital processing'
    }
  ]
};

// GET /api/schemes/mudra
router.get('/mudra', (req, res) => {
  res.json(PM_MUDRA_SCHEME_DATA);
});

// POST /api/schemes/evaluate - Evaluates loan eligibility and DSCR
router.post('/evaluate', (req, res) => {
  try {
    const { monthlyRevenue = 0, monthlyExpenses = 0, existingDebt = 0, requestedLoan = 50000 } = req.body;

    const rev = Number(monthlyRevenue) || 0;
    const exp = Number(monthlyExpenses) || 0;
    const debt = Number(existingDebt) || 0;
    const loan = Number(requestedLoan) || 50000;

    const netMonthlyProfit = rev - exp;
    const annualNetIncome = netMonthlyProfit * 12;

    // Estimate monthly EMI (at ~9.5% p.a. over 36 months)
    const annualInterestRate = 0.095;
    const monthlyRate = annualInterestRate / 12;
    const tenureMonths = 36;
    
    const emi = loan > 0 ? Math.round(
      (loan * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    ) : 0;

    // Debt Service Coverage Ratio (DSCR)
    const existingMonthlyDebtService = debt > 0 ? Math.round(debt * 0.04) : 0; // ~4% monthly debt service estimate
    const totalDebtService = existingMonthlyDebtService + emi;

    const dscr = totalDebtService > 0 ? (netMonthlyProfit / totalDebtService).toFixed(2) : '3.50';

    // Determine Mudra Category
    let category = 'Shishu';
    if (loan > 500000) {
      category = 'Tarun';
    } else if (loan > 50000) {
      category = 'Kishor';
    }

    const isEligible = netMonthlyProfit > emi && dscr >= 1.25;

    res.json({
      netMonthlyProfit,
      annualNetIncome,
      estimatedEmi: emi,
      totalDebtService,
      dscr: parseFloat(dscr),
      recommendedCategory: category,
      isEligible,
      maxRecommendedLoan: isEligible ? Math.min(loan, netMonthlyProfit * 24) : Math.max(50000, netMonthlyProfit * 10)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating scheme eligibility', error: error.message });
  }
});

export default router;
