const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const { protect } = require('../middleware/auth');

// @route   GET /api/alerts
// @desc    Get all active alerts
router.get('/', protect, async (req, res) => {
  try {
    const alerts = await Alert.find({ resolved: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   POST /api/alerts/trigger
// @desc    Trigger a manual simulation alert
router.post('/trigger', protect, async (req, res) => {
  try {
    const { severity, message } = req.body;
    const alert = await Alert.create({
      userId: req.user.id,
      severity,
      message,
      resolved: false
    });
    res.status(201).json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   PUT /api/alerts/:id/resolve
// @desc    Resolve an alert
router.put('/:id/resolve', protect, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
    if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
    res.status(200).json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
