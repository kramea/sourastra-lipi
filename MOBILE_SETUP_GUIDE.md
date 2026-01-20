# Mobile App Conversion Guide - Capacitor

## Quick Overview
This guide shows how to convert the Sourashtra Learning web app into iOS and Android mobile apps using Capacitor.

**Estimated time**: 2-3 hours for basic setup
**Cost**: FREE (unless you want to publish to App Store, which requires $99/year Apple Developer account)

---

## Option 1: Capacitor (Recommended)

### Step 1: Install Capacitor
```bash
cd /Users/kalairamea/Documents/Libi_project/sourashtra-learning

# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init
# When prompted:
# - App name: Sourashtra Learning
# - App ID: com.yourname.sourashtra (use reverse domain format)
# - Web directory: dist
```

### Step 2: Add Mobile Platforms
```bash
# Add iOS (requires Mac)
npm install @capacitor/ios
npx cap add ios

# Add Android
npm install @capacitor/android
npx cap add android
```

### Step 3: Build Your Web App
```bash
npm run build
```

### Step 4: Sync to Mobile Platforms
```bash
# Copy web app to native projects
npx cap sync
```

### Step 5: Open in Native IDEs

**For iOS:**
```bash
npx cap open ios
```
- Opens Xcode
- Click the Play button to run in iOS Simulator
- For real device: Connect iPhone, select it as target, click Play

**For Android:**
```bash
npx cap open android
```
- Opens Android Studio
- Click Run button to launch in emulator or connected device

---

## Code Changes Needed

### 1. Update `vite.config.js`
Your app needs a base path for mobile:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Add this for mobile compatibility
})
```

### 2. Update localStorage for Mobile
No changes needed - localStorage works perfectly in Capacitor!

### 3. Add Mobile-Specific Styling (Optional)
Create `src/mobile.css` for safe areas (iPhone notch, etc.):

```css
/* Add padding for iPhone notch */
.app {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

Import in `App.jsx`:
```javascript
import './mobile.css';
```

---

## Testing on Real Devices

### iOS (Requires Mac + iPhone)
1. Open project: `npx cap open ios`
2. In Xcode, select your iPhone as target
3. Click Play button
4. First time: Trust developer certificate in iPhone Settings

### Android
1. Enable Developer Mode on Android phone
2. Enable USB Debugging
3. Connect phone via USB
4. Run: `npx cap run android`

---

## App Store Deployment

### iOS App Store
**Requirements:**
- Mac with Xcode
- Apple Developer Account ($99/year)
- App icons and screenshots

**Steps:**
1. Open in Xcode: `npx cap open ios`
2. Set signing team (your Apple Developer account)
3. Create app in App Store Connect
4. Archive app: Product → Archive
5. Upload to App Store Connect
6. Submit for review

### Google Play Store
**Requirements:**
- Google Play Developer Account ($25 one-time)
- App icons and screenshots

**Steps:**
1. Generate signed APK/AAB in Android Studio
2. Create app listing in Google Play Console
3. Upload APK/AAB
4. Submit for review

---

## Development Workflow

### Day-to-day development:
```bash
# 1. Make changes to your React code
# 2. Build
npm run build

# 3. Sync to mobile
npx cap sync

# 4. Test in simulator/device
npx cap open ios  # or android
```

### Live Reload (Faster Development):
```bash
# Run dev server
npm run dev

# In capacitor.config.json, add:
{
  "server": {
    "url": "http://localhost:5173",
    "cleartext": true
  }
}

# Rebuild and run - now changes appear instantly!
npx cap sync
npx cap run ios
```

---

## Alternative Option 2: React Native (More Complex)

**If you want truly native UI and performance:**

### Pros:
- Better performance for complex animations
- More native "feel"
- Better access to platform-specific features

### Cons:
- Complete rewrite required
- Two separate codebases (iOS and Android) in some cases
- Steeper learning curve
- Can't reuse your existing React web code directly

### Steps:
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init SourashtraLearning

# Then manually port your components to React Native syntax
# (this is significant work - estimate 1-2 weeks)
```

**Changes needed:**
- `<div>` → `<View>`
- `<button>` → `<TouchableOpacity>` or `<Pressable>`
- CSS → StyleSheet
- localStorage → AsyncStorage
- Manual recreation of all components

---

## Alternative Option 3: PWA (Progressive Web App)

**Simplest option - no app stores needed!**

### What it does:
- Users visit your website on mobile
- Browser prompts to "Add to Home Screen"
- Launches like a native app

### Steps:
1. Add `manifest.json`:
```json
{
  "name": "Sourashtra Learning",
  "short_name": "Sourashtra",
  "description": "Learn Sourashtra Libi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#233D4D",
  "theme_color": "#215E61",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. Add service worker for offline support
3. Deploy to Netlify/Vercel
4. Users install from browser

**Limitations:**
- Not in App Store/Play Store
- Fewer native features
- Users must find it via web first

---

## Recommendation

**For your use case (Sourashtra Learning app):**

✅ **Use Capacitor** because:
1. Minimal code changes (2-3 hours setup)
2. Your existing React code works as-is
3. localStorage already works
4. Can publish to both App Stores
5. Can still deploy as website too
6. Easy to maintain single codebase

**Start with Capacitor, then later:**
- If you need better performance → migrate to React Native
- If you don't want App Store approval → use PWA

---

## Quick Start Commands

```bash
# Full setup in one go:
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Sourashtra Learning" "com.yourname.sourashtra" --web-dir=dist
npx cap add ios
npx cap add android
npm run build
npx cap sync
npx cap open ios  # Test on iOS
```

That's it! Your web app is now a mobile app.
