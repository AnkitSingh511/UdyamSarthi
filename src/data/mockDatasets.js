export const DISTRICTS = [
  { id: 'anand', name: 'Anand', state: 'Gujarat', lat: 22.5645, lng: 72.9289 },
  { id: 'karnal', name: 'Karnal', state: 'Haryana', lat: 29.6857, lng: 76.9905 },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { id: 'mandya', name: 'Mandya', state: 'Karnataka', lat: 12.5218, lng: 76.8951 },
  { id: 'bathinda', name: 'Bathinda', state: 'Punjab', lat: 30.2110, lng: 74.9455 }
];

export const SUB_DISTRICT_PRESETS = {
  karnal: [
    { name: 'Karnal Town & Anaj Mandi Hub', lat: 29.6857, lng: 76.9905 },
    { name: 'Gharaunda Agricultural Block', lat: 29.5412, lng: 76.9723 },
    { name: 'Nilokheri Farming Sector', lat: 29.8351, lng: 76.9214 },
    { name: 'Indri Rice Processing Belt', lat: 29.8812, lng: 77.0581 },
    { name: 'Assandh Dairy & Grain Hub', lat: 29.5185, lng: 76.6021 }
  ],
  anand: [
    { name: 'Anand City & Amul Dairy Complex', lat: 22.5645, lng: 72.9289 },
    { name: 'Petlad Farming Block', lat: 22.4744, lng: 72.8021 },
    { name: 'Borsad Agro Trade Zone', lat: 22.4112, lng: 72.9012 },
    { name: 'Umreth Organic Compost Belt', lat: 22.6981, lng: 73.1154 }
  ],
  nashik: [
    { name: 'Nashik APMC Onion Market Yard', lat: 19.9975, lng: 73.7898 },
    { name: 'Lasalgaon Onion Auction Hub', lat: 20.1478, lng: 74.2281 },
    { name: 'Pimpalgaon Spice Processing Zone', lat: 20.1712, lng: 73.9854 },
    { name: 'Sinnar Industrial & Grain Park', lat: 19.8451, lng: 73.9981 }
  ],
  varanasi: [
    { name: 'Varanasi Central Grain Mandi', lat: 25.3176, lng: 82.9739 },
    { name: 'Pindra Vegetable & Agri Belt', lat: 25.4851, lng: 82.8512 },
    { name: 'Sevapuri Milk Collection Hub', lat: 25.3412, lng: 82.7812 }
  ],
  mandya: [
    { name: 'Mandya Sugarcane Co-op Hub', lat: 12.5218, lng: 76.8951 },
    { name: 'Maddur Jaggery & Drip Irrigation Hub', lat: 12.5841, lng: 77.0421 },
    { name: 'Srirangapatna Farming Belt', lat: 12.4212, lng: 76.6854 }
  ],
  bathinda: [
    { name: 'Bathinda Dana Mandi Yard', lat: 30.2110, lng: 74.9455 },
    { name: 'Talwandi Sabo Cotton Procurement', lat: 29.9812, lng: 75.0851 },
    { name: 'Rampur Phul Dairy Chilling Center', lat: 30.2712, lng: 75.2381 }
  ]
};

export const DEMO_PROFILES = [
  {
    username: 'ramesh_farmer',
    name: 'Ramesh Kumar',
    category: 'farmer',
    districtId: 'karnal',
    phone: '+91 98123 45678',
    details: {
      landSizeAcres: 4.5,
      cropType: 'Wheat & Mustard',
      expectedYieldQuintals: 110,
      currentStorageQuintals: 40,
      monthlyRevenue: 65000,
      monthlyExpenses: 28000,
      existingDebt: 15000,
      loanRequiredAmount: 180000,
      loanPurpose: 'Pesticide sprayer, quality seed procurement & harvest labor'
    }
  },
  {
    username: 'sunita_dairy',
    name: 'Sunita Patel',
    category: 'dairy',
    districtId: 'anand',
    phone: '+91 98765 12345',
    details: {
      herdSize: 9, // 5 cows, 4 buffaloes
      dailyMilkProductionLiters: 92,
      fatPercentage: 6.8,
      dairyCoopRatePerLiter: 46.5,
      monthlyRevenue: 128340,
      monthlyExpenses: 64000,
      existingDebt: 45000,
      loanRequiredAmount: 350000,
      loanPurpose: 'Purchase 2 high-yield Murrah buffaloes & automatic milking machine'
    }
  },
  {
    username: 'vikram_kirana',
    name: 'Vikram Sharma',
    category: 'retail',
    districtId: 'varanasi',
    phone: '+91 94150 98765',
    details: {
      shopSizeSqFt: 350,
      dailySales: 8500,
      monthlyRevenue: 255000,
      monthlyExpenses: 212000,
      workingCapitalGap: 80000,
      existingDebt: 20000,
      loanRequiredAmount: 250000,
      loanPurpose: 'Stocking bulk festive FMCG inventory & installing digital POS/refrigerator'
    }
  },
  {
    username: 'anita_processing',
    name: 'Anita Verma',
    category: 'food_processing',
    districtId: 'nashik',
    phone: '+91 98220 54321',
    details: {
      processingUnitType: 'Chilli & Turmeric Powder Grinding Unit',
      dailyCapacityKg: 250,
      rawMaterialSource: 'Local Nashik Farmers Market',
      monthlyRevenue: 340000,
      monthlyExpenses: 245000,
      existingDebt: 100000,
      loanRequiredAmount: 650000,
      loanPurpose: 'Automatic stainless steel pulverizer machine & eco-friendly pouch sealing line'
    }
  }
];

export const SPATIAL_ENTITIES = {
  karnal: [
    {
      id: 'k1',
      name: 'Karnal Anaj Mandi Wholesalers (Govt Gate 2)',
      category: 'buyers',
      businessType: 'Grain Procurement Mandi',
      distanceKm: 2.1,
      latOffset: 0.012,
      lngOffset: 0.015,
      rating: 4.8,
      phone: '+91 98120 11223',
      rateInfo: 'Wheat Buying: ₹2,425/quintal | Mustard: ₹5,650/quintal',
      verified: true,
      description: 'Official MSP procurement center with immediate direct-bank transfer.'
    },
    {
      id: 'k2',
      name: 'Kisan Bio-Fertilizer & Hybrid Seeds Store',
      category: 'suppliers',
      businessType: 'Agri-Inputs & Bio-Nutrients',
      distanceKm: 1.4,
      latOffset: -0.008,
      lngOffset: 0.009,
      rating: 4.6,
      phone: '+91 98120 44556',
      rateInfo: 'DAP: ₹1,350/bag | Certified Wheat Seed: ₹1,100/40kg',
      verified: true,
      description: 'Government authorized seed distributor with 5% discount for FPO members.'
    },
    {
      id: 'k3',
      name: 'Gharaunda Cold Storage & Logistics Hub',
      category: 'services',
      businessType: 'Cold Storage & Warehousing',
      distanceKm: 5.4,
      latOffset: 0.035,
      lngOffset: -0.022,
      rating: 4.9,
      phone: '+91 98120 77889',
      rateInfo: 'Storage Fee: ₹35/bag/month | Temperature controlled 4°C',
      verified: true,
      description: 'Solar-powered cold storage facility within 6km for potato, mustard and grains.'
    },
    {
      id: 'k4',
      name: 'Haryana Cattle Feed Mill & Mineral Mixture',
      category: 'suppliers',
      businessType: 'Dairy Feed & Supplements',
      distanceKm: 3.8,
      latOffset: -0.021,
      lngOffset: -0.014,
      rating: 4.7,
      phone: '+91 98120 99001',
      rateInfo: 'Bypass Fat Feed: ₹1,850/50kg | Mineral Mix: ₹120/kg',
      verified: true,
      description: 'High fat yield booster feed formulated with NDDB standards.'
    },
    {
      id: 'k5',
      name: 'Modern Rice & Flour Processing Mill',
      category: 'buyers',
      businessType: 'B2B Grain Buyer',
      distanceKm: 6.2,
      latOffset: 0.042,
      lngOffset: 0.031,
      rating: 4.5,
      phone: '+91 98120 33445',
      rateInfo: 'Bulk Paddy Procurement: ₹2,300/quintal',
      verified: true,
      description: 'Direct mill gate buying without middleman commission.'
    }
  ],
  anand: [
    {
      id: 'a1',
      name: 'Amul District Dairy Chilling Hub (Anand Unit)',
      category: 'buyers',
      businessType: 'Dairy Co-op Procurement',
      distanceKm: 1.8,
      latOffset: 0.009,
      lngOffset: -0.011,
      rating: 4.9,
      phone: '+91 98760 11100',
      rateInfo: 'Cow Milk (3.5/8.5): ₹38/L | Buffalo Milk (6.5/9.0): ₹49.5/L',
      verified: true,
      description: 'Automated fat & SNF testing center with twice-daily direct bank payout.'
    },
    {
      id: 'a2',
      name: 'Charotar Cattle Nutrition & Feed Depot',
      category: 'suppliers',
      businessType: 'Livestock Feed Supplier',
      distanceKm: 2.7,
      latOffset: -0.015,
      lngOffset: 0.018,
      rating: 4.7,
      phone: '+91 98760 22211',
      rateInfo: 'Amul Dan Cattle Feed: ₹1,420/50kg bag',
      verified: true,
      description: 'Balanced compound cattle feed supplier within 3 km.'
    },
    {
      id: 'a3',
      name: 'Anand Farmers Organic Compost & Vermicompost',
      category: 'suppliers',
      businessType: 'Organic Fertilizer & Seeds',
      distanceKm: 4.5,
      latOffset: 0.028,
      lngOffset: 0.024,
      rating: 4.8,
      phone: '+91 98760 33322',
      rateInfo: 'Vermi-compost: ₹6/kg | Neem Cake: ₹22/kg',
      verified: true,
      description: 'Certified bio-fertilizer unit supporting organic crop transition.'
    },
    {
      id: 'a4',
      name: 'Gujarat Agro Food Packaging Industries',
      category: 'services',
      businessType: 'Packaging & Pouch Supplier',
      distanceKm: 5.9,
      latOffset: -0.038,
      lngOffset: -0.029,
      rating: 4.6,
      phone: '+91 98760 44433',
      rateInfo: 'Vacuum Pouches: ₹0.85/pc | Milk Pouches: ₹0.40/pc',
      verified: true,
      description: 'Custom printing and food-grade packaging supplier for local micro-processors.'
    },
    {
      id: 'a5',
      name: 'Vasna Vegetable Wholesale Mandi',
      category: 'buyers',
      businessType: 'Produce Wholesale Market',
      distanceKm: 6.8,
      latOffset: 0.045,
      lngOffset: -0.035,
      rating: 4.5,
      phone: '+91 98760 55544',
      rateInfo: 'Tomato Bulk: ₹18/kg | Green Chilli: ₹34/kg',
      verified: true,
      description: 'Early morning wholesale auction market for farmers and retailers.'
    }
  ],
  nashik: [
    {
      id: 'n1',
      name: 'Nashik APMC Onion & Spice Market Yard',
      category: 'buyers',
      businessType: 'Agricultural APMC Yard',
      distanceKm: 3.2,
      latOffset: 0.018,
      lngOffset: 0.022,
      rating: 4.8,
      phone: '+91 98220 11999',
      rateInfo: 'Red Onion: ₹2,100/quintal | Dry Red Chilli: ₹16,500/quintal',
      verified: true,
      description: 'Asia’s largest onion mandi with high daily trade volume.'
    },
    {
      id: 'n2',
      name: 'Sahyadri Agro Processing & Cold Logistics',
      category: 'services',
      businessType: 'Pre-cooling & B2B Aggregation',
      distanceKm: 5.1,
      latOffset: -0.031,
      lngOffset: -0.028,
      rating: 4.9,
      phone: '+91 98220 22888',
      rateInfo: 'Pre-cooling: ₹1.2/kg | Packhouse grading line available',
      verified: true,
      description: 'Export quality packhouse offering grading, sorting and cold storage.'
    },
    {
      id: 'n3',
      name: 'Godavari Stainless Machinery & Fabricators',
      category: 'suppliers',
      businessType: 'Processing Equipment Manufacturer',
      distanceKm: 4.8,
      latOffset: 0.029,
      lngOffset: -0.019,
      rating: 4.7,
      phone: '+91 98220 33777',
      rateInfo: 'Pulverizer Machines from ₹45,000 | Stainless Tanks: ₹250/L',
      verified: true,
      description: 'Local fabrication shop specializing in micro-food processing equipment.'
    },
    {
      id: 'n4',
      name: 'Panchavati Wholesale FMCG & Grocery Depot',
      category: 'suppliers',
      businessType: 'Retail Wholesale Supplier',
      distanceKm: 2.1,
      latOffset: -0.012,
      lngOffset: 0.011,
      rating: 4.6,
      phone: '+91 98220 44666',
      rateInfo: 'Edible Oil Bulk: ₹112/L | Atta 10kg: ₹310',
      verified: true,
      description: 'Direct distributor rates for Kirana store owners.'
    }
  ],
  varanasi: [
    {
      id: 'v1',
      name: 'Varanasi Central Vegetable & Grain Mandi (Chandua)',
      category: 'buyers',
      businessType: 'Central Regional Mandi',
      distanceKm: 1.9,
      latOffset: 0.011,
      lngOffset: -0.009,
      rating: 4.7,
      phone: '+91 94150 11222',
      rateInfo: 'Mustard Oil: ₹138/L | Wheat: ₹2,380/quintal',
      verified: true,
      description: 'High daily footfall regional market for farmers and retailers.'
    },
    {
      id: 'v2',
      name: 'Kashi FMCG Distributors & Kirana Depot',
      category: 'suppliers',
      businessType: 'Kirana Store Supplier',
      distanceKm: 2.5,
      latOffset: -0.014,
      lngOffset: 0.016,
      rating: 4.8,
      phone: '+91 94150 33444',
      rateInfo: 'FMCG Goods: 8-14% trade margin on MRP items',
      verified: true,
      description: 'Doorstep delivery for local retailers within 5km.'
    },
    {
      id: 'v3',
      name: 'Purvanchal Dairy & Chilling Plant',
      category: 'buyers',
      businessType: 'Milk Collection Center',
      distanceKm: 4.2,
      latOffset: 0.026,
      lngOffset: 0.021,
      rating: 4.6,
      phone: '+91 94150 55666',
      rateInfo: 'Milk Purchase: ₹44/L base + Fat bonus',
      verified: true,
      description: 'Reliable dairy procurement unit operating 365 days.'
    }
  ],
  mandya: [
    {
      id: 'm1',
      name: 'Mandya Sugarcane & Jaggery Processing Co-op',
      category: 'buyers',
      businessType: 'Processing & Buyer Co-op',
      distanceKm: 3.5,
      latOffset: 0.020,
      lngOffset: 0.018,
      rating: 4.8,
      phone: '+91 98450 11223',
      rateInfo: 'Jaggery Bulk Purchase: ₹3,800/quintal',
      verified: true,
      description: 'Organic jaggery procurement hub for Karnataka farmers.'
    },
    {
      id: 'm2',
      name: 'Cauvery Bio Inputs & Drip Irrigation Hub',
      category: 'suppliers',
      businessType: 'Irrigation & Bio-Inputs',
      distanceKm: 2.8,
      latOffset: -0.016,
      lngOffset: -0.012,
      rating: 4.7,
      phone: '+91 98450 44556',
      rateInfo: 'Drip Kit 1 Acre: ₹18,500 (Subsidy applicable)',
      verified: true,
      description: 'Authorized PMKSY drip irrigation dealer.'
    }
  ],
  bathinda: [
    {
      id: 'b1',
      name: 'Bathinda New Grain Market (Dana Mandi)',
      category: 'buyers',
      businessType: 'Primary Cotton & Wheat Mandi',
      distanceKm: 2.4,
      latOffset: 0.014,
      lngOffset: 0.012,
      rating: 4.9,
      phone: '+91 98140 11999',
      rateInfo: 'Wheat MSP: ₹2,425/quintal | Cotton: ₹7,100/quintal',
      verified: true,
      description: 'Fully paved grain market with electronic weighbridges.'
    },
    {
      id: 'b2',
      name: 'Verka Milk Chilling Plant & Animal Feed',
      category: 'buyers',
      businessType: 'Cooperative Dairy Hub',
      distanceKm: 3.9,
      latOffset: -0.022,
      lngOffset: -0.019,
      rating: 4.8,
      phone: '+91 98140 22888',
      rateInfo: 'Verka Buying: ₹48/L | Feed Bag 50kg: ₹1,410',
      verified: true,
      description: 'State co-op milk collection unit with daily payout.'
    }
  ]
};

export const PM_MUDRA_SCHEME_DATA = {
  name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
  ministry: 'Ministry of Finance, Govt of India',
  objective: 'Funding the Unfunded - Collateral-free institutional credit up to ₹10 Lakhs for micro-enterprises in non-farm sector (including allied agricultural activities like dairy, food processing, and retail shops).',
  guaranteeMechanism: '100% covered under Credit Guarantee Fund for Micro Units (CGFMU) / CGTMSE. No third-party guarantor required.',
  interestRateRange: '8.40% - 11.25% per annum (varies by bank & category)',
  repaymentTenure: '3 to 5 Years with 6 months moratorium period',
  processingFee: 'ZERO fee for Shishu and Kishor loans; nominal 0.5% for Tarun loans',
  
  tiers: [
    {
      id: 'shishu',
      name: 'Shishu (शिशु)',
      maxAmount: 50000,
      minAmount: 5000,
      targetUser: 'Startups & micro setup requiring initial cash for seeds, cattle feed, small store inventory, basic hand tools.',
      suitableForCategories: ['farmer', 'dairy', 'retail'],
      typicalEmiPer50k: 1045, // at 9.5% for 5 years
      features: [
        'No processing fee',
        'No collateral or third-party guarantee',
        'MUDRA Card (Rupay Debit Card) provided for cash credit limits',
        'Ideal for small emergency working capital needs'
      ]
    },
    {
      id: 'kishor',
      name: 'Kishor (किशोर)',
      maxAmount: 500000,
      minAmount: 50001,
      targetUser: 'Established micro-units seeking expansion, purchase of 2-5 high-yield dairy animals, store renovation, or diesel pulverizers.',
      suitableForCategories: ['farmer', 'dairy', 'retail', 'food_processing'],
      typicalEmiPer3Lakh: 6290, // at 9.5% for 5 years
      features: [
        'Term loan for machinery + Working capital overdraft',
        'Subsidized interest rate via PSBs',
        'Quick 7-day approval through JanSamarth portal',
        'Direct disbursement to equipment vendor or merchant account'
      ]
    },
    {
      id: 'tarun',
      name: 'Tarun (तरुण)',
      maxAmount: 1000000,
      minAmount: 500001,
      targetUser: 'Commercial micro-units, food processing plants, bulk FMCG kirana distribution, milk chilling centers & mechanization.',
      suitableForCategories: ['dairy', 'retail', 'food_processing'],
      typicalEmiPer8Lakh: 16780, // at 9.5% for 5 years
      features: [
        'Higher credit line for scaling up capacity',
        'Working capital limit up to ₹10 Lakhs',
        'Custom moratorium period up to 1 year for agri-processing setup',
        'Digital monitoring via PMMY online portal'
      ]
    }
  ],

  documentChecklist: [
    'Self-attested Aadhaar Card & PAN Card',
    'Proof of business identity/address (Udyam Aadhaar Registration - Free online)',
    'Bank account statement for the last 6 months',
    'Quotation/Price list of machinery/feed/inventory to be purchased',
    '2 passport size photographs of applicant',
    'Category certificate (SC/ST/OBC/Minority if claiming priority allocation)'
  ],

  stepByStepApplication: [
    { step: 1, title: 'Check MUDRA Tier Eligibility', desc: 'Determine whether your requirement falls under Shishu (≤₹50k), Kishor (≤₹5L), or Tarun (≤₹10L).' },
    { step: 2, title: 'Obtain Udyam Registration', desc: 'Register your micro-business online at udyamregistration.gov.in (100% free and takes 5 minutes).' },
    { step: 3, title: 'Collect Vendor Quotations', desc: 'Get written price quotes for cattle purchase, machinery, seed stock, or shop inventory.' },
    { step: 4, title: 'Apply on JanSamarth Portal', desc: 'Submit application online via jansamarth.in or visit any nearby Public Sector Bank (SBI, PNB, BOB, Bank of India, etc.).' },
    { step: 5, title: 'Receive MUDRA Card', desc: 'Upon sanction, receive your Rupay MUDRA Card for instant ATM cash access & digital purchase of business inventory.' }
  ]
};
