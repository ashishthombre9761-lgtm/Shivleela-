# Shivleela - Apology Letter Creator (Website A)

## 📝 Overview
This is the **Data Entry Website** where users can create and submit their apology letters with text, photos, and audio.

## ✨ Features
✅ Beautiful form to input name and message  
✅ Photo upload with live preview  
✅ Audio upload with live preview  
✅ Generates unique QR code for permanent sharing  
✅ Lifetime access - data persists forever  
✅ Smooth UI with animations  
✅ Mobile-friendly design  

## 🎯 How It Works

### Step 1: Fill the Form
- Enter your name
- Write your heartfelt message
- Upload a photo (optional)
- Upload audio/voice message (optional)

### Step 2: Create Letter
- Click "Create Letter" button
- Data is saved to database with a unique ID

### Step 3: Share
- Get a permanent QR code
- Share with others via QR code
- Anyone can scan and view your letter with animation

## 🚀 Setup Instructions

### Step 1: Firebase Setup (For Lifetime Access)

1. Go to https://console.firebase.google.com/
2. Click "Create a new project"
3. Name it: `shivleela-letters`
4. Complete the setup
5. Go to **Realtime Database**
6. Click "Create Database"
7. Start in **test mode** (for development)
8. Set database rules to:
   ```json
   {
     "rules": {
       "letters": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

9. Get your Firebase config:
   - Go to Project Settings (⚙️)
   - Copy the config object
   - Replace the `firebaseConfig` in `script.js`

### Step 2: Update Firebase Config
Open `script.js` and replace this:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 3: Deploy Website A
Deploy to GitHub Pages:
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch
4. Your site will be at: `https://ashishthombre9761-lgtm.github.io/Shivleela-/`

Or use Vercel/Netlify for easier deployment.

### Step 4: Update Website B URL
In `script.js`, update this line with your Website B URL:
```javascript
const websiteBUrl = `https://ashishthombre9761-lgtm.github.io/ashishthombre9761-gmail.com/?id=${uniqueId}`;
```

## 📁 Files
- `index.html` - Main form structure
- `styles.css` - Beautiful styling with animations
- `script.js` - Firebase integration & QR code generation

## 🎨 Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling & animations
- **JavaScript (ES6+)** - Functionality
- **Firebase Realtime Database** - Permanent data storage
- **QR Code Library** (qrcodejs) - QR code generation

## 🔗 Related
- **Website B (Letter Display):** https://github.com/ashishthombre9761-lgtm/ashishthombre9761-gmail.com

## 📞 Support
For issues or questions, create an issue in this repository.

---

**Built with ❤️ for Shivleela**
