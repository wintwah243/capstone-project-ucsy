const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

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

// checklist route for guest users (no login) - only returns default tasks with no user field
router.get('/guest', async (req, res) => {
  try {
    // Only get tasks that don't have a user field (default/guest tasks)
    const tasks = await Checklist.find({ user: { $exists: false } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logged-in user's checklist items AND default guest items
router.get('/my', authMiddleware, async (req, res) => {
  try {
    // Get user's personal tasks AND default tasks (no user field)
    const tasks = await Checklist.find({
      $or: [
        { user: req.user.id },
        { user: { $exists: false } }
      ]
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new checklist item (protected route - requires login)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { task, description, category } = req.body;
    
    const newChecklist = new Checklist({
      task,
      description,
      category: category || 'Before Flood',
      user: req.user.id  // Associate with logged-in user
    });

    const savedChecklist = await newChecklist.save();
    res.status(201).json(savedChecklist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;