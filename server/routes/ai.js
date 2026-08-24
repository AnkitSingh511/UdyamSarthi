import express from 'express';

const router = express.Router();

const ADVISORY_TEMPLATES = {
  farmer: [
    { title: 'Harvest Storage Strategy', desc: 'Hold 30% of wheat in registered cold storage to gain 15-20% higher seasonal pricing during peak market deficit.' },
    { title: 'Subsidized Solar Pump', desc: 'Apply under PM-KUSUM scheme for 60% subsidy on 7.5 HP solar irrigation pumpset.' },
    { title: 'Soil Testing & Micro-Nutrients', desc: 'Conduct soil testing at Karnal Krishi Vigyan Kendra to optimize DAP fertilizer application.' }
  ],
  dairy: [
    { title: 'Breed Quality & Milk Yield', desc: 'Invest in high-fat Murrah buffaloes or HF cows to increase daily milk collection to 110+ liters.' },
    { title: 'Direct Dairy Co-op Payout', desc: 'Register direct bank account linking with Amul co-op chilling hub for 0% transaction fee payments.' },
    { title: 'Bypass Fat Feed Subsidies', desc: 'Procure bypass fat cattle feed through government FPOs to reduce feed cost by ₹180/bag.' }
  ],
  retail: [
    { title: 'Digital Inventory Management', desc: 'Implement digital POS system to manage fast-moving FMCG inventory and avoid stockouts.' },
    { title: 'Mudra Kishor Working Capital', desc: 'Avail ₹2.5 Lakh Kishor Mudra loan for bulk festival stocking at low interest rate.' }
  ]
};

// POST /api/ai/recommend
router.post('/recommend', (req, res) => {
  try {
    const { category = 'farmer', monthlyRevenue = 50000 } = req.body;
    const recommendations = ADVISORY_TEMPLATES[category] || ADVISORY_TEMPLATES.farmer;

    res.json({
      category,
      generatedAt: new Date().toISOString(),
      insightsCount: recommendations.length,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating AI recommendations', error: error.message });
  }
});

export default router;
