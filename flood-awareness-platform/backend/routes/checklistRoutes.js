const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');

// checklist route for user with no login or register
router.get('/guest', async (req, res) => {
  try {
    const tasks = await Checklist.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;