const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a zone name'],
    unique: true,
  },
  currentGravity: {
    type: Number,
    required: true,
    default: 1.0,
  },
  temperature: {
    type: Number,
    required: true,
    default: 22.0, // Celsius
  },
  oxygen: {
    type: Number,
    required: true,
    default: 21.0, // Percentage
  },
  pressure: {
    type: Number,
    required: true,
    default: 1.0, // atm
  },
  autoMode: {
    type: Boolean,
    default: false,
  },
  safeRange: {
    min: { type: Number, default: 0.0 },
    max: { type: Number, default: 3.0 },
  },
  status: {
    type: String,
    enum: ['Optimal', 'Warning', 'Critical'],
    default: 'Optimal',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Zone', ZoneSchema);
