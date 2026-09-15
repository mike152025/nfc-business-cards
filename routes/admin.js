const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Get all cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find({}).sort({ createdAt: -1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get card statistics
router.get('/stats', async (req, res) => {
  try {
    const totalCards = await Card.countDocuments();
    const totalViews = await Card.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    
    const topCards = await Card.find({})
      .sort({ views: -1 })
      .limit(5);
    
    res.json({
      totalCards,
      totalViews: totalViews[0]?.totalViews || 0,
      topCards
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;