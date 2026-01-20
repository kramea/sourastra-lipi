# Mobile App Quick Start Guide

Your Sourashtra Learning app is now ready for iOS and Android! 🎉

## ✅ What's Done

- ✅ Capacitor installed and configured
- ✅ iOS platform added
- ✅ Android platform added
- ✅ Web app built and synced to native platforms
- ✅ Mobile-specific CSS added for safe areas
- ✅ App ID: `com.sourashtra.learning`
- ✅ App Name: `Sourashtra Learning`

---

## 🚀 Running on iOS Simulator

### Option 1: Using Xcode (Recommended)
```bash
npx cap open ios
```
- This opens Xcode
- Click the **Play** button (▶️) in the top-left corner
- Select iPhone simulator (default: iPhone 15)
- App will launch in simulator

### Option 2: Command Line
```bash
npx cap run ios
```

---

## 🤖 Running on Android Emulator

### Option 1: Using Android Studio (Recommended)
```bash
npx cap open android
```
- This opens Android Studio
- Wait for Gradle sync to complete
- Click the **Run** button (▶️) in the toolbar
- Select Android emulator
- App will launch in emulator

### Option 2: Command Line
```bash
npx cap run android
```

---

## 📱 Running on Real Devices

### iOS Device (iPhone/iPad)
1. Connect your iPhone via USB
2. Open project: `npx cap open ios`
3. In Xcode, select your iPhone from device dropdown (next to Play button)
4. Click Play button
5. **First time only**: On your iPhone, go to Settings → General → VPN & Device Management → Trust the developer certificate

**Note**: You need a free Apple Developer account. Sign in to Xcode with your Apple ID.

### Android Device
1. Enable Developer Mode on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging
3. Connect phone via USB
4. Run: `npx cap run android`
5. Accept USB debugging prompt on phone

---

## 🔄 Development Workflow

### After Making Code Changes:

```bash
# 1. Build the web app
npm run build

# 2. Sync to native platforms
npx cap sync

# 3. Open in simulator/device
npx cap open ios     # for iOS
# or
npx cap open android # for Android
```

### Live Reload (Faster Development)

For faster development with instant updates:

1. Start dev server:
```bash
npm run dev
```

2. Note the local URL (e.g., `http://localhost:5173`)

3. Update `capacitor.config.json`:
```json
{
  "appId": "com.sourashtra.learning",
  "appName": "Sourashtra Learning",
  "webDir": "dist",
  "server": {
    "url": "http://192.168.1.X:5173",
    "cleartext": true
  }
}
```
**Replace `192.168.1.X` with your computer's local IP address**

4. Sync and run:
```bash
npx cap sync
npx cap open ios
```

Now changes appear instantly when you save files!

**⚠️ Remember to remove the `server` block before building for production.**

---

## 📦 Building for App Stores

### iOS App Store

**Requirements:**
- Mac with Xcode
- Apple Developer account ($99/year)
- App icons and screenshots

**Steps:**
1. Open in Xcode: `npx cap open ios`
2. Select signing team (top-level project → Signing & Capabilities)
3. Create app in [App Store Connect](https://appstoreconnect.apple.com)
4. Archive: Product → Archive
5. Upload to App Store Connect
6. Submit for review

### Google Play Store

**Requirements:**
- Android Studio
- Google Play Developer account ($25 one-time)
- App icons and screenshots

**Steps:**
1. Open in Android Studio: `npx cap open android`
2. Build → Generate Signed Bundle / APK
3. Create keystore and sign
4. Upload AAB to [Google Play Console](https://play.google.com/console)
5. Create store listing
6. Submit for review

---

## 🔧 Troubleshooting

### iOS Issues

**"Unable to install app"**
- Clean build: Xcode → Product → Clean Build Folder
- Rebuild: `npm run build && npx cap sync`

**App crashes on launch**
- Check Xcode console for errors
- Verify `dist` folder exists and has files

### Android Issues

**Gradle sync fails**
- Update Android Studio
- File → Invalidate Caches → Invalidate and Restart

**App shows white screen**
- Check `dist/` folder exists
- Run: `npm run build && npx cap sync`
- Check Android Studio logcat for errors

### Both Platforms

**localStorage not working**
- localStorage works perfectly in Capacitor! No changes needed.
- Data persists between app launches automatically.

**Changes not showing**
- Always run `npm run build && npx cap sync` after code changes
- For live reload, use the server configuration above

---

## 📱 Testing Your App

### Things to Test:

- ✅ All characters display correctly
- ✅ Flashcard flip animation works
- ✅ Quiz functionality works
- ✅ Progress tracking persists (close and reopen app)
- ✅ Time-based decay works
- ✅ Tamil characters render properly
- ✅ Responsive on different screen sizes
- ✅ Safe areas work (no content behind notch/home indicator)

### Test on Multiple Devices:

**iOS:**
- iPhone SE (small screen)
- iPhone 15 (standard)
- iPhone 15 Pro Max (large)
- iPad (tablet layout)

**Android:**
- Small phone (4-5")
- Standard phone (6")
- Large phone (6.5"+)

---

## 🎨 App Icons

Your app currently uses default icons. To add custom icons:

1. Create icons in these sizes:
   - iOS: 1024×1024 PNG
   - Android: 512×512 PNG

2. Use a tool like [App Icon Generator](https://www.appicon.co/)

3. Replace icons in:
   - `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
   - `android/app/src/main/res/mipmap-*/`

4. Sync: `npx cap sync`

---

## 📚 Useful Commands

```bash
# Install a Capacitor plugin
npm install @capacitor/camera
npx cap sync

# Update Capacitor
npm install @capacitor/cli@latest @capacitor/core@latest
npm install @capacitor/ios@latest @capacitor/android@latest
npx cap sync

# Check Capacitor doctor (troubleshooting)
npx cap doctor

# List all Capacitor commands
npx cap --help
```

---

## 🎯 Next Steps

Your app is ready to use! Here's what you can do:

1. **Test on simulator** - Run on iOS/Android emulator
2. **Test on device** - Install on your phone
3. **Share with friends** - Send the APK/install on their devices
4. **Publish to stores** - Follow store submission guides above
5. **Add features** - Audio, more quiz types, etc.

---

## 📞 Need Help?

- Capacitor Docs: https://capacitorjs.com/docs
- iOS Setup: https://capacitorjs.com/docs/ios
- Android Setup: https://capacitorjs.com/docs/android
- Troubleshooting: https://capacitorjs.com/docs/basics/troubleshooting

---

**Congratulations! Your Sourashtra Learning app is now a mobile app! 🎉**
