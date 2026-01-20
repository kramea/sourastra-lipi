# Quick Start Guide

## Step 1: Install Node.js

If you don't have Node.js installed yet:

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify installation by opening Terminal and running:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Install Dependencies

Open Terminal and navigate to the project:

```bash
cd /Users/kalairamea/Documents/Libi_project/sourashtra-learning
```

Install all required packages:

```bash
npm install
```

This will take 1-2 minutes to download and install React, Vite, and other dependencies.

## Step 3: Run the App

Start the development server:

```bash
npm run dev
```

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 4: Open in Browser

Open your web browser and go to:
```
http://localhost:5173
```

You should see the "Learn Sourashtra" home page!

## Step 5: Test the Features

1. Click **Flashcards** to browse through all 63 characters
   - Click the card to flip it
   - Use Previous/Next buttons
   - Try the Shuffle button
   - Filter by category

2. Click **Quiz** to test your knowledge
   - Answer 10 multiple choice questions
   - Get immediate feedback
   - See your final score

## Making Changes

The app will automatically reload when you edit files. Try it:

1. Open `src/App.css` in a text editor
2. Change a color or style
3. Save the file
4. The browser will automatically update!

## Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

## Deploying to the Web (Free!)

### Option 1: Netlify (Recommended)

1. Go to https://app.netlify.com/drop
2. Run `npm run build` first
3. Drag the `dist/` folder to the upload area
4. Get a free URL like: `https://your-site-name.netlify.app`

### Option 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

Follow the prompts to link to your Netlify account.

### Option 3: Vercel

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (will prompt for account setup)
vercel --prod
```

## Troubleshooting

### Port 5173 already in use?

If you see an error about the port being in use:
- Close any other Vite apps running
- Or run: `npm run dev -- --port 3000` to use a different port

### Module not found errors?

Make sure you ran `npm install` first!

### Still having issues?

1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Run `npm run dev`

## Next Steps

- Customize the colors in `src/App.css`
- Add more features to the quiz
- Share with friends and family!
- Deploy it online for free

Enjoy building your language learning app! 🎉
