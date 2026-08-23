import express from 'express';

const router = express.Router();

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

// GET /api/datasets/districts
router.get('/districts', (req, res) => {
  res.json(DISTRICTS);
});

// GET /api/datasets/sub-districts/:districtId
router.get('/sub-districts/:districtId', (req, res) => {
  const { districtId } = req.params;
  const list = SUB_DISTRICT_PRESETS[districtId] || [];
  res.json(list);
});

export default router;
