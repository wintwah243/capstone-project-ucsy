const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'အကောင့်ဝင်ရန် လိုအပ်ပါသည်' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token မမှန်ကန်ပါ' });
    }
    req.user = user;
    next();
  });
};

// Get user's saved pins
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pins = await Pin.find({ user: req.user.id });
    res.json(pins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new pin
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { township, lat, lng, riskLevel, colorCode, weather, temp } = req.body;
    
    // Check if pin already exists for this township for this user
    const existingPin = await Pin.findOne({ user: req.user.id, township });
    if (existingPin) {
      // Update existing pin
      existingPin.lat = lat;
      existingPin.lng = lng;
      existingPin.riskLevel = riskLevel;
      existingPin.colorCode = colorCode;
      existingPin.weather = weather;
      existingPin.temp = temp;
      await existingPin.save();
      return res.json(existingPin);
    }

    const newPin = new Pin({
      user: req.user.id,
      township,
      lat,
      lng,
      riskLevel,
      colorCode,
      weather,
      temp
    });

    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a pin
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pin = await Pin.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!pin) {
      return res.status(404).json({ message: 'Pin မတွေ့ရှိပါ' });
    }
    res.json({ message: 'Pin ဖျက်ပြီးပါပြီ' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;