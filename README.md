# 🎨 NFC Business Cards - Professional Digital Card Platform

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

A complete, modern solution for creating, designing, and sharing NFC business cards with **permanent links**, **QR codes**, **drag-and-drop editing**, and **beautiful animations**.

## ✨ Features

### 🎯 Core Features
- ✅ **Create Beautiful Business Cards** - Drag-and-drop editor with real-time preview
- ✅ **Permanent Links** - Same URL forever, update content anytime
- ✅ **Auto-Generated QR Codes** - Scans link directly to the card
- ✅ **Front & Back Design** - Full customization on both sides
- ✅ **Color Customization** - Pick primary and secondary colors
- ✅ **Logo Upload** - Add your business logo
- ✅ **Background Images** - Custom background support
- ✅ **Font Selection** - Choose from multiple font families
- ✅ **Drag & Drop Positioning** - Move, resize, and customize elements
- ✅ **Text Customization** - Font size, weight, and color for each text element
- ✅ **Analytics** - Track views and engagement
- ✅ **Professional Admin Panel** - Sleek, modern design
- ✅ **Responsive Design** - Works on all devices
- ✅ **Share & Download** - Multiple sharing options

### 🎨 Design Customization
- Multiple professionally designed templates
- Real-time card preview
- Color picker with hex values
- Logo and background image support
- Font family selection
- Element positioning with pixel precision
- Duplicate elements feature
- Delete elements

### 📊 Admin Dashboard
- View total cards created
- Track total views
- See recent popular cards
- Manage all your cards
- Edit existing cards
- Delete cards

### 📱 Card Display
- Beautiful flip animation
- Print support
- Share functionality
- Download option (coming soon)
- Contact information display
- Permanent link showcase
- View counter

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mike152025/nfc-business-cards.git
   cd nfc-business-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/nfc-cards
   BASE_URL=http://localhost:5000
   PORT=5000
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker (recommended)
   docker run -d -p 27017:27017 --name mongodb mongo
   
   # Or start your local MongoDB server
   ```

5. **Run the server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

6. **Access the application**
   - Admin Panel: http://localhost:5000/admin
   - Homepage: http://localhost:5000

## 📖 Usage Guide

### Creating a Business Card

1. **Go to Admin Panel**
   - Click "Create Card" in the sidebar

2. **Fill Basic Information**
   - Business Name
   - Owner Name
   - Email
   - Phone
   - Website
   - Address

3. **Customize Design**
   - Select primary color (card front)
   - Select secondary color (card back)
   - Choose font family
   - Upload logo
   - Upload background image (optional)

4. **Design Front Side**
   - Click "+ Text" to add text elements
   - Click "+ QR Code" to add QR code
   - Click elements to select them
   - Drag to move elements
   - Edit properties in the right panel

5. **Design Back Side**
   - Switch to "Back" tab
   - Add elements for the back of the card
   - Add contact information

6. **Save Card**
   - Click "Save Card" button
   - Get your permanent link
   - Share with customers!

### Viewing a Card

1. **Share the link** with customers
2. **Flip the card** using the button
3. **Download or print** the card
4. **Share** via social media or messaging

### Managing Cards

1. **Go to "My Cards"**
2. **View all your cards**
3. **Edit** any card
4. **Delete** cards you don't need
5. **See statistics** for each card

## 🏗️ Project Structure

```
nfc-business-cards/
├── public/
│   ├── index.html           # Homepage
│   ├── admin.html          # Admin panel
│   ├── card.html           # Card display page
│   ├── js/
│   │   ├── admin.js        # Admin panel logic
│   │   └── card-display.js # Card display logic
│   └── styles/
│       ├── admin.css       # Admin panel styles
│       ├── card.css        # Card display styles
│       └── index.css       # Homepage styles
├── models/
│   └── Card.js             # MongoDB Card schema
├── routes/
│   ├── cards.js            # Card API routes
│   └── admin.js            # Admin API routes
├── server.js               # Express server
├── package.json            # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

## 🔌 API Endpoints

### Card Management

**GET `/api/cards/:cardId`**
- Get a specific card by ID
- Returns card data with all elements

**POST `/api/cards`**
- Create a new card
- Body: Card object with all details
- Returns: Card ID, permanent link, and QR code

**PUT `/api/cards/:cardId`**
- Update an existing card
- Body: Updated card data

**DELETE `/api/cards/:cardId`**
- Delete a card

### Admin Operations

**GET `/api/admin/cards`**
- Get all cards (admin only)

**GET `/api/admin/stats`**
- Get dashboard statistics
- Returns: Total cards, total views, top cards

## 🎨 Customization Guide

### Adding New Colors
Edit `admin.css` and `card.css` to modify the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding Font Options
Edit `admin.html` to add more fonts in the select dropdown:
```html
<option value="Your Font">Your Font</option>
```

### Changing Card Dimensions
Edit `Card.js` model to modify default card size:
```javascript
cardSettings: {
    width: { type: Number, default: 3.5 }, // inches
    height: { type: Number, default: 2 }
}
```

## 📦 Dependencies

- **Express.js** - Web server framework
- **Mongoose** - MongoDB object modeling
- **QRCode** - QR code generation
- **Sharp** - Image processing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation

## 🔐 Security Features

- Input validation
- CORS protection
- File upload limits (50MB)
- Unique card IDs
- Error handling

## 🚀 Deployment

### Deploy to Heroku

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set BASE_URL=https://your-app-name.herokuapp.com
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Vercel + Atlas

1. Connect MongoDB Atlas for database
2. Push to GitHub
3. Connect Vercel to GitHub repo
4. Set environment variables in Vercel
5. Deploy!

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly interface
- Mobile-optimized card display
- Mobile-optimized admin panel
- Works on all screen sizes

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB credentials

### Cards Not Saving
- Check browser console for errors
- Verify MongoDB is connected
- Check file upload size limits

### QR Code Not Generated
- Check that QR enabled is checked
- Verify card is saved
- Check console for errors

## 🎯 Future Enhancements

- [ ] NFC tag writing integration
- [ ] PDF export with print-ready format
- [ ] Advanced analytics with charts
- [ ] Email verification
- [ ] User accounts and authentication
- [ ] Team management
- [ ] Bulk card creation
- [ ] Template marketplace
- [ ] Social media integration
- [ ] AI-powered design suggestions

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

## 👨‍💻 Author

**Mike** - [GitHub Profile](https://github.com/mike152025)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by modern card design platforms
- Built with love for small businesses and entrepreneurs
- Special thanks to the open-source community

---

**Made with ❤️ for creative businesses**