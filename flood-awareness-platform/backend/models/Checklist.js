const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'Before Flood' } 
});

module.exports = mongoose.model('Checklist', checklistSchema);