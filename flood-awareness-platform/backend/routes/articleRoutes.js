const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// to grab and display on frontend all the flood articles for knowledge hub
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// for testing api
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    source: req.body.source
  });
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;