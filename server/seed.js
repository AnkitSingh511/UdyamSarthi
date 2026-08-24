import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import ActivityLog from './models/ActivityLog.js';

dotenv.config({ path: './server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/udyamsarthi';

const SEED_PROFILES = [
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
      herdSize: 9,
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
    category: 'food_vendor',
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

async function seedDatabase() {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    const defaultPasswordHash = await bcrypt.hash('password123', 10);

    for (const profile of SEED_PROFILES) {
      const existing = await User.findOne({ username: profile.username });
      if (!existing) {
        await User.create({
          ...profile,
          password: defaultPasswordHash
        });
        console.log(`Seeded profile: ${profile.name} (${profile.username})`);
      } else {
        console.log(`Profile ${profile.username} already exists. Skipping.`);
      }
    }

    console.log('Database seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
