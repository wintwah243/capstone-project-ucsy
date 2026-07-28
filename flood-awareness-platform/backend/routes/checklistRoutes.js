const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');
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

// checklist route for guest users 
router.get('/guest', async (req, res) => {
  try {
    // Only get tasks that don't have a user field (default/guest tasks)
    const tasks = await Checklist.find({ user: { $exists: false } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logged-in user's checklist items and default guest items
router.get('/my', authMiddleware, async (req, res) => {
  try {
    // Get user's personal tasks and default tasks
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

// Create new checklist item 
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { task, description, category } = req.body;
    
    const newChecklist = new Checklist({
      task,
      description,
      category: category || 'Before Flood',
      user: req.user.id  
    });

    const savedChecklist = await newChecklist.save();
    res.status(201).json(savedChecklist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update checklist item 
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { task, description, category } = req.body;
    
    // Find the checklist item and verify ownership
    const checklist = await Checklist.findById(req.params.id);
    
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist item မတွေ့ရှိပါ' });
    }
    
    // Check if the logged-in user owns this checklist item
    if (checklist.user && checklist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'ဤ checklist item ကို ပြင်ဆင်ခွင့်မရှိပါ' });
    }
    
    // Update fields
    checklist.task = task || checklist.task;
    checklist.description = description !== undefined ? description : checklist.description;
    checklist.category = category || checklist.category;
    
    const updatedChecklist = await checklist.save();
    res.json(updatedChecklist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete checklist item 
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    
    if (!checklist) {
      return res.status(404).json({ message: 'Checklist item မတွေ့ရှိပါ' });
    }
    
    // Check if the logged-in user owns this checklist item
    if (checklist.user && checklist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'ဤ checklist item ကို ဖျက်ခွင့်မရှိပါ' });
    }
    
    await Checklist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Checklist item ဖျက်ပြီးပါပြီ' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;