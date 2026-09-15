const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// Get card by ID
router.get('/:cardId', async (req, res) => {
  try {
    const card = await Card.findOne({ cardId: req.params.cardId });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    // Increment view count
    card.views += 1;
    await card.save();
    
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new card
router.post('/', async (req, res) => {
  try {
    const cardId = uuidv4().substring(0, 8);
    const cardData = {
      ...req.body,
      cardId
    };
    
    const card = new Card(cardData);
    await card.save();
    
    // Generate QR code with permanent link
    const cardLink = `${process.env.BASE_URL || 'http://localhost:5000'}/card/${cardId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(cardLink);
    
    res.json({
      success: true,
      cardId,
      permanentLink: cardLink,
      qrCode: qrCodeDataUrl,
      card
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update card
router.put('/:cardId', async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { cardId: req.params.cardId },
      { $set: { ...req.body, updatedAt: new Date() } },
      { new: true }
    );
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete card
router.delete('/:cardId', async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ cardId: req.params.cardId });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json({ success: true, message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;