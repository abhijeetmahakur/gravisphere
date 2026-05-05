const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['GravityChange', 'Emergency'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
  zoneId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Zone',
    required: false, // Not all logs belong to a zone (e.g. global emergency)
  },
  details: {
    type: Object, // Can contain { oldValue, newValue } or { action }
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Log', LogSchema);
