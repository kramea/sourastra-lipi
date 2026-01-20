# How to Install Node.js

Since Node.js isn't currently installed on your system, here's how to get it:

## macOS Installation (Recommended Method)

### Option 1: Download from Official Website (Easiest)

1. **Go to the Node.js website:**
   - Visit: https://nodejs.org/

2. **Download the LTS version:**
   - Click the big green button that says "LTS" (Long Term Support)
   - This is the stable, recommended version
   - The file will be something like: `node-v20.x.x.pkg`

3. **Run the installer:**
   - Open the downloaded `.pkg` file
   - Follow the installation wizard
   - Click "Continue" → "Agree" → "Install"
   - Enter your Mac password when prompted

4. **Verify installation:**
   - Open Terminal (press Cmd+Space, type "Terminal", press Enter)
   - Type: `node --version`
   - You should see something like: `v20.10.0`
   - Type: `npm --version`
   - You should see something like: `10.2.3`

### Option 2: Using Homebrew (If you have it)

If you have Homebrew installed:

```bash
brew install node
```

Then verify:
```bash
node --version
npm --version
```

## After Installing Node.js

Once Node.js is installed, navigate to your project and install dependencies:

```bash
# Go to the project folder
cd /Users/kalairamea/Documents/Libi_project/sourashtra-learning

# Install all dependencies
npm install
```

This will download React, Vite, and all other required packages.

## Then Start Your App!

```bash
npm run dev
```

Open your browser to: http://localhost:5173

## Troubleshooting

### "Command not found: node" after installation

Close and reopen Terminal. The PATH needs to update.

### Permission errors during npm install

Try running with sudo:
```bash
sudo npm install
```

### Still having issues?

1. Make sure you closed and reopened Terminal after installing Node.js
2. Try running: `which node` - it should show a path like `/usr/local/bin/node`
3. If nothing works, restart your Mac

## What Gets Installed?

- **Node.js**: JavaScript runtime (lets you run JavaScript outside the browser)
- **npm**: Node Package Manager (installs libraries and tools)
- **npx**: Package runner (runs packages without installing globally)

## Disk Space Required

- Node.js itself: ~50 MB
- Your project dependencies: ~200-300 MB
- Total: ~350 MB

## Quick Check Before Installing

Check if Node.js is already installed:

```bash
node --version
npm --version
```

If these commands work, you already have Node.js! Skip installation and go straight to:

```bash
cd /Users/kalairamea/Documents/Libi_project/sourashtra-learning
npm install
npm run dev
```

---

**Questions?** Just follow the on-screen instructions during installation. It's very straightforward!
