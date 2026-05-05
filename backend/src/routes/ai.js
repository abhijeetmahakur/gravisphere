const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');
const { protect } = require('../middleware/auth');

// @route   GET /api/ai/suggestions
// @desc    Generate AI suggestions based on current gravity levels
router.get('/suggestions', protect, async (req, res) => {
  try {
    const zones = await Zone.find();
    const suggestions = [];

    zones.forEach(zone => {
      const g = zone.currentGravity;
      
      if (zone.name === 'Gym Zone') {
        if (g < 1.5) suggestions.push('Consider increasing gravity in Gym Zone for high-resistance training.');
        if (g > 2.0) suggestions.push('Gravity in Gym Zone is very high. Ensure crew members are monitored for strain.');
      }
      
      if (zone.name === 'Medical Zone') {
        if (g > 0.5) suggestions.push('Reducing gravity in Medical Zone to 0.3g could accelerate recovery for trauma patients.');
      }
      
      if (zone.name === 'Living Zone') {
        if (g !== 1.0) suggestions.push('Living Zone gravity is not optimal (1.0g). Return to 1.0g to prevent bone density issues or sleep disruption.');
      }
      
      if (zone.name === 'Farming Zone') {
        if (g < 0.8) suggestions.push('Hydroponics yield in Farming Zone might decrease below 0.8g.');
      }

      if (zone.status === 'Critical') {
        suggestions.push(`CRITICAL ALERT: ${zone.name} is operating outside safe parameters! Immediate stabilization recommended.`);
      }
    });

    if (suggestions.length === 0) {
      suggestions.push('All systems nominal. No immediate actions required.');
    }

    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const AiQuery = require('../models/AiQuery');

// @route   POST /api/ai/query
// @desc    Interactive chat for AI suggestions based on complex logic
router.post('/query', protect, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, error: 'Please provide a question.' });
    }

    const q = question.toLowerCase();
    let answer = '';

    // Heuristic Matching Logic
    if (q.includes('gym') && q.includes('winter')) {
      answer = 'For gym training in winter, use 1.2g for better resistance and warming up muscle activity.';
    } else if (q.includes('gym') || q.includes('exercise')) {
      answer = 'For exercise and high active training, maintaining gravity between 1.1g and 1.3g is highly recommended to build bone density.';
    } else if (q.includes('medical') || q.includes('recovery')) {
      answer = 'For medical recovery, reduce gravity to 0.3g to minimize physical stress and support fast tissue recovery.';
    } else if (q.includes('farming') || q.includes('plants')) {
      answer = 'Farming works best at 0.9g for stable plant growth and ensuring optimal root hydro-distribution.';
    } else if (q.includes('living') || q.includes('sleep')) {
      answer = 'Living zones should be kept as close to Earth standard (1.0g) as possible to prevent circadian rhythm disruption.';
    } else if (q.includes('summer')) {
      answer = 'During summer biological cycles, normal or slightly reduced gravity (0.95g) reduces cardiovascular load.';
    } else if (q.includes('winter')) {
      answer = 'Winter cycles often require slightly higher baseline gravity to encourage physical exertion and heat generation.';
    } else if (q.includes('pressure')) {
      answer = 'Simulated atmospheric pressure is directly proportional to gravity. A higher simulated gravity state requires thicker atmospheric resistance modeling, while lower gravity simulates thin, low-pressure environments.';
    } else {
      answer = 'I am the GraviSphere Assistant. I monitor environmental systems across all sectors. How can I help you adjust the habitat today?';
    }

    // Delay to simulate AI "thinking"
    await new Promise(resolve => setTimeout(resolve, 800));

    // Save to DB
    const log = await AiQuery.create({
      userId: req.user.id,
      question,
      answer
    });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
