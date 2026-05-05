const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');
const Log = require('../models/Log');
const { protect } = require('../middleware/auth');

// @route   GET /api/zones
// @desc    Get all zones
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.status(200).json({ success: true, count: zones.length, data: zones });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   PUT /api/zones/:id/gravity
// @desc    Update gravity for a specific zone
router.put('/:id/gravity', protect, async (req, res) => {
  try {
    let zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ success: false, error: 'Zone not found' });
    }

    const { gravity, temperature, oxygen, autoMode } = req.body;
    let updates = {};

    if (gravity !== undefined) {
      updates.currentGravity = gravity;
      // Evaluate new gravity status
      if (gravity < zone.safeRange.min || gravity > zone.safeRange.max) {
        updates.status = 'Critical';
      } else if (gravity === zone.safeRange.min || gravity === zone.safeRange.max) {
        updates.status = 'Warning';
      } else {
        updates.status = 'Optimal';
      }
      
      // Auto-calculate Pressure based on Gravity Formula (Simulation: Higher G = denser atmosphere compression)
      updates.pressure = parseFloat((1.0 * (gravity / 1.0)).toFixed(2));
    }

    if (temperature !== undefined) updates.temperature = temperature;
    if (oxygen !== undefined) updates.oxygen = oxygen;
    if (autoMode !== undefined) updates.autoMode = autoMode;

    zone = await Zone.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    // Determine log type if gravity changed directly
    if (gravity !== undefined) {
      await Log.create({
        type: 'GravityChange',
        userId: req.user.id,
        zoneId: zone._id,
        details: { oldValue: req.body.oldValue || 1.0, newValue: gravity },
      });
    }

    res.status(200).json({ success: true, data: zone });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   POST /api/zones/emergency-reset
// @desc    Reset all zones to 1.0g safe mode
router.post('/emergency-reset', protect, async (req, res) => {
  try {
    const zones = await Zone.find();
    
    // Update all zones
    await Zone.updateMany({}, { currentGravity: 1.0, status: 'Optimal', lastUpdated: Date.now() });
    
    // Log emergency
    await Log.create({
      type: 'Emergency',
      userId: req.user.id,
      details: { action: 'Emergency reset all zones to 1.0g' }
    });

    res.status(200).json({ success: true, data: 'All zones stabilized' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
