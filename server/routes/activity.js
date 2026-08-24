import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/activity - Retrieve activity logs
router.get('/', optionalAuth, async (req, res) => {
  try {
    let query = {};
    if (req.user) {
      query = { user: req.user.id };
    }
    const logs = await ActivityLog.find(query).sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving activity logs', error: error.message });
  }
});

// POST /api/activity - Log new activity
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { action, details } = req.body;
    if (!action || !details) {
      return res.status(400).json({ message: 'Action and details are required' });
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString();

    const logEntry = new ActivityLog({
      user: req.user ? req.user.id : null,
      username: req.user ? req.user.username : 'Guest',
      action,
      details,
      time: timeStr,
      date: dateStr
    });

    await logEntry.save();
    res.status(201).json(logEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error recording activity log', error: error.message });
  }
});

export default router;
