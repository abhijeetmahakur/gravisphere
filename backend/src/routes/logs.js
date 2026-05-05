const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { protect } = require('../middleware/auth');

// @route   GET /api/logs/gravity
// @desc    Get recent gravity logs (for charts)
router.get('/gravity', protect, async (req, res) => {
  try {
    const logs = await Log.find({ type: 'GravityChange' })
      .populate('zoneId', 'name')
      .populate('userId', 'username')
      .sort('-createdAt')
      .limit(50);
      
    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   GET /api/logs/emergency
// @desc    Get emergency logs
router.get('/emergency', protect, async (req, res) => {
  try {
    const logs = await Log.find({ type: 'Emergency' })
      .populate('userId', 'username')
      .sort('-createdAt')
      .limit(20);
      
    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
