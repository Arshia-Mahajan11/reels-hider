# 📱 Instagram Reels Hider

A lightweight Chrome extension to hide Instagram Reels, Stories, and short video content from your feed and discover page.

## Features ✨

- ✅ Hide Reels from your main feed
- ✅ Hide the Reels navigation tab
- ✅ Hide Stories sections
- ✅ Hide Reels from Explore/Discover page
- ✅ Hide short videos and shorts
- ✅ Beautiful toggle UI
- ✅ Works with infinite scroll
- ✅ Easy reset to default settings

## Installation 📥

### Option 1: From GitHub (Easiest)
1. Click **Code** → **Download ZIP**
2. Extract the zip file
3. Go to `chrome://extensions/`
4. Enable **Developer mode** (top right)
5. Click **Load unpacked**
6. Select the extracted folder
7. Done! ✅

### Option 2: Manual Setup
1. Create a folder called `instagram-reels-hider`
2. Copy all files from this repo into that folder
3. Go to `chrome://extensions/`
4. Enable **Developer mode**
5. Click **Load unpacked**
6. Select the folder

## How to Use 🎯

1. Click the extension icon in your Chrome toolbar
2. Toggle features on/off as needed:
   - Hide Reels in Feed
   - Hide Reels Tab
   - Hide Stories
   - Hide Explore Reels
   - Hide Shorts in Discover
3. Click **Reset to Default** to restore all settings

## Files Included 📂

- `manifest.json` - Extension configuration
- `popup.html` - Settings popup UI
- `popup.css` - Styling for popup
- `popup.js` - Popup functionality
- `content.js` - Main hiding logic
- `README.md` - This file

## How It Works 🔧

The extension uses JavaScript to:
1. Detect reel content using DOM selectors and attributes
2. Hide identified reels using CSS display property
3. Monitor page changes for new content
4. Apply settings across Instagram and Explore pages

## Browser Support 🌐

- ✅ Google Chrome
- ✅ Chromium-based browsers (Edge, Brave, Opera, etc.)

## Troubleshooting 🔧

**Reels still showing?**
- Refresh the page
- Disable and re-enable the extension
- Make sure you're on instagram.com (not the app)

**Settings not saving?**
- Clear browser cache
- Reinstall the extension

## Contributing 🤝

Feel free to suggest improvements or report bugs!

## License 📄

This project is open source and available for personal use.

## Disclaimer ⚠️

This extension is not affiliated with Meta/Instagram. Use at your own risk. Instagram may update their site structure, which could affect functionality.

---

Made with ❤️ for a better Instagram experience
