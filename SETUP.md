# 📚 NFC Business Cards - Setup & Documentation

## 🎯 Quick Reference

### What This Project Does
A web-based platform that allows businesses to create beautiful digital business cards with:
- QR codes that link to the card
- Permanent URLs that never change
- Full design customization (colors, fonts, logos)
- Front and back card design
- Professional admin panel
- Analytics and tracking

## 🚀 Getting Started

### Step 1: Clone & Setup
```bash
git clone https://github.com/mike152025/nfc-business-cards.git
cd nfc-business-cards
npm install
```

### Step 2: Configure Database
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/nfc-cards
BASE_URL=http://localhost:5000
PORT=5000
```

### Step 3: Start Services

**Terminal 1 - MongoDB**
```bash
mongod
# or with Docker:
docker run -d -p 27017:27017 mongo
```

**Terminal 2 - Server**
```bash
npm start
```

### Step 4: Access Application
- **Admin Panel**: http://localhost:5000/admin
- **Homepage**: http://localhost:5000
- **Card Example**: http://localhost:5000/card/[cardId]

## 📝 Workflow

### 1. Creating a Card
```
Admin Panel → Create Card → Fill Info → Design → Save
↓
Get Permanent Link + QR Code
↓
Share Link with Customer
```

### 2. Card Features
- **Front Side**: Business name, logo, decorative elements
- **Back Side**: Contact info (email, phone, website)
- **QR Code**: Scans to the permanent card link
- **Permanent Link**: Never changes, always shows latest design

### 3. Customization Options
- **Colors**: Primary (front) & Secondary (back)
- **Elements**: Text, QR codes, logos
- **Positioning**: Drag & drop, pixel-perfect placement
- **Typography**: Font family, size, weight, color
- **Images**: Logo and background uploads

## 🎨 Design Features

### Color Picker
- Select any color with hex values
- Real-time preview
- Live update on card

### Text Elements
- Add unlimited text elements
- Customize font, size, color
- Drag to position
- Resize from corners

### QR Code
- Auto-generates from permanent link
- Customizable size and position
- Optional label ("Scan Me")
- Works with any QR scanner

### Drag & Drop Editor
- Click element to select
- Drag to move
- Edit properties in right panel
- Delete or duplicate elements

## 📊 Dashboard

### Statistics Shown
- Total cards created
- Total views across all cards
- Recently created cards
- Most viewed cards
- QR scans (future feature)

### Card Management
- View all cards
- See view count per card
- Edit any card
- Delete cards
- Share card links

## 🔗 Permanent Links

### How They Work
1. Card gets unique ID (e.g., `a1b2c3d4`)
2. Link: `https://yourdomain.com/card/a1b2c3d4`
3. Customer bookmarks/shares link
4. You update card design anytime
5. Link shows latest version
6. View count tracked per link

### Benefits
- Update info without new links
- One link for life
- Track who views your card
- Easy to remember/share
- Works forever

## 📱 Card Display Page

### Features
- Beautiful card design
- Flip animation (front/back)
- Contact information
- Print support
- Share via social/email
- Download option
- View counter

### What Customers See
1. Your card with your design
2. Your contact info
3. Permanent link (to share)
4. Buttons to print/share
5. View count

## 🛠️ Technical Details

### Database Schema (Card)
```javascript
{
  cardId: String,           // Unique ID for URL
  businessName: String,
  ownerName: String,
  email: String,
  phone: String,
  website: String,
  address: String,
  
  design: {
    primaryColor: String,   // Hex color
    secondaryColor: String,
    logo: String,          // Base64 image
    backgroundImage: String,
    font: String           // Font family name
  },
  
  frontElements: Array,    // Text, images, QR codes
  backElements: Array,     // Same as front
  
  qrCode: {
    enabled: Boolean,
    position: { x, y },
    size: Number,
    label: String
  },
  
  views: Number,           // View counter
  createdAt: Date,
  updatedAt: Date
}
```

### API Flow
```
Client → Frontend → Express Server → MongoDB
  ↓
Data Validation
  ↓
Generate QR Code
  ↓
Save to Database
  ↓
Return Card ID + Link
  ↓
Display to User
```

## 🎨 Customization Examples

### Change Colors
Edit `public/styles/admin.css`:
```css
background: linear-gradient(135deg, #YourColor1, #YourColor2);
```

### Add More Templates
Edit `admin.html` templates section:
```html
<div class="template-card">
    <div class="template-preview" style="background: YOUR_GRADIENT;">
        <p>Your Template Name</p>
    </div>
</div>
```

### Change Card Size
Edit `models/Card.js`:
```javascript
width: { type: Number, default: 4.0 }, // inches
height: { type: Number, default: 2.5 }
```

## 🚀 Deployment Checklist

- [ ] Set up MongoDB (Atlas recommended)
- [ ] Set correct BASE_URL in .env
- [ ] Test all features
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS properly
- [ ] Set up backups
- [ ] Monitor performance
- [ ] Set up error logging
- [ ] Add rate limiting
- [ ] Test on mobile

## 📞 Common Issues

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check connection string
- Verify network access (if using Atlas)

### "QR Code not showing"
- Verify card is saved
- Check QR enabled in settings
- Refresh page

### "Images not uploading"
- Check file size (limit 50MB)
- Verify file format (JPG, PNG)
- Check browser console for errors

### "Drag and drop not working"
- Use Chrome/Firefox for best compatibility
- Try refreshing page
- Check browser console

## 🎓 Learning Path

1. **Understand the concept**
   - Read features section
   - Understand permanent links
   - Know QR code benefits

2. **Set up locally**
   - Follow Quick Start
   - Create first card
   - Test all features

3. **Customize**
   - Change colors
   - Add templates
   - Modify content

4. **Deploy**
   - Choose hosting
   - Set up database
   - Deploy to production

5. **Scale**
   - Add user authentication
   - Create team features
   - Add more templates
   - Implement advanced analytics

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [QRCode.js](https://davidshimjs.github.io/qrcodejs/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🎉 You're Ready!

Your NFC Business Card platform is ready to use. Start creating beautiful cards!

---

**Questions?** Open an issue on GitHub or check the README.md for more info.