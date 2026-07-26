const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  township: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  riskLevel: {
    type: String
  },
  colorCode: {
    type: String
  },
  weather: {
    type: String
  },
  temp: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pin', pinSchema);