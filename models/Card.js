const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  businessName: String,
  ownerName: String,
  email: String,
  phone: String,
  website: String,
  address: String,
  
  // Design settings
  design: {
    primaryColor: { type: String, default: '#000000' },
    secondaryColor: { type: String, default: '#FFFFFF' },
    logo: String, // base64 or URL
    backgroundImage: String,
    font: { type: String, default: 'Arial' }
  },
  
  // Front card elements
  frontElements: [{
    id: String,
    type: String, // 'text', 'image', 'qrcode'
    content: String,
    position: { x: Number, y: Number },
    size: { width: Number, height: Number },
    style: {
      fontSize: Number,
      fontWeight: String,
      color: String,
      fontFamily: String
    }
  }],
  
  // Back card elements
  backElements: [{
    id: String,
    type: String,
    content: String,
    position: { x: Number, y: Number },
    size: { width: Number, height: Number },
    style: {
      fontSize: Number,
      fontWeight: String,
      color: String,
      fontFamily: String
    }
  }],
  
  // QR Code settings
  qrCode: {
    enabled: { type: Boolean, default: true },
    position: { x: Number, y: Number },
    size: { type: Number, default: 100 },
    label: { type: String, default: 'Scan Me' }
  },
  
  // Card settings
  cardSettings: {
    width: { type: Number, default: 3.5 }, // inches
    height: { type: Number, default: 2 },
    dpi: { type: Number, default: 300 }
  },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Card', cardSchema);