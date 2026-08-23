import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import datasetRoutes from './routes/datasets.js';
import schemeRoutes from './routes/schemes.js';
import activityRoutes from './routes/activity.js';
import aiRoutes from './routes/ai.js';

dotenv.config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/udyamsarthi';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// Connect to MongoDB & Start Express server
let isDbConnected = false;

mongoose.connect(MONGODB_URI)
  .then(() => {
    isDbConnected = true;
    console.log(`[MongoDB] Connected successfully to ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.warn(`[MongoDB] Warning: Failed to connect to ${MONGODB_URI}.`);
    console.warn(`[MongoDB] Reason: ${err.message}`);
    console.warn('[MongoDB] Server will start in standalone mode. Connect MongoDB or set MONGODB_URI in server/.env to enable DB persistence.');
  });

app.listen(PORT, () => {
  console.log(`[UdyamSarthi Backend] Server running on http://localhost:${PORT}`);
});
