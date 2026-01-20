# Learn Sourashtra - Language Learning App

A simple, interactive web application for learning the Sourashtra script through flashcards and quizzes.

## Features

- **Flashcards**: Learn all 63 Sourashtra characters with flip animations
  - Click to flip between Sourashtra character and English transliteration
  - Navigate with Previous/Next buttons
  - Filter by category (Vowels, Consonants, Vowel Signs, Special)
  - Shuffle for random practice
  - Progress tracking

- **Quiz Mode**: Test your knowledge with interactive quizzes
  - 10 random questions per quiz
  - Multiple choice format
  - Immediate feedback
  - Score tracking
  - View results and retry

- **Progress Tracking**: Simple localStorage-based progress tracking
  - Cards viewed count
  - Best quiz score

## Getting Started

### Prerequisites

You need to have Node.js installed on your computer. Download it from [nodejs.org](https://nodejs.org/)

### Installation

1. Open Terminal and navigate to the project folder:
```bash
cd /Users/kalairamea/Documents/Libi_project/sourashtra-learning
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to: http://localhost:5173

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

## Deployment

### Deploy to Netlify (Free & Easy)

**Option 1: Drag & Drop**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the deploy zone
4. Done! You'll get a free URL

**Option 2: Using Netlify CLI**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Deploy to Vercel (Alternative)

```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
sourashtra-learning/
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Home menu
│   │   ├── Flashcard.jsx     # Flashcard component
│   │   └── Quiz.jsx          # Quiz component
│   ├── data/
│   │   └── characters.js     # All 63 Sourashtra characters
│   ├── utils/
│   │   └── quizLogic.js      # Quiz generation logic
│   ├── App.jsx               # Main app component
│   ├── App.css               # Main styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Base styles
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js           # Vite configuration
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **localStorage** - Progress persistence

## Data Source

The character data was converted from the `libi_db` CSV file containing:
- 16 Vowels (standalone vowel sounds)
- 34 Consonants (consonants with inherent 'a' sound)
- 11 Vowel Signs (diacritical marks that modify consonants)
- 2 Special Characters

Total: 63 characters

### About Vowel Signs

Vowel signs are **diacritical marks** that combine with consonants to change their vowel sound. For example:
- `ꢒ` (ka) + `ꢶ` (i-vowel-sign) = `ꢒꢶ` (ki)
- `ꢒ` (ka) + `ꢸ` (u-vowel-sign) = `ꢒꢸ` (ku)

In the app, vowel signs are shown combined with the consonant `ꢒ` (ka) as examples, demonstrating how they modify the base consonant sound.

### About Special Characters

The 2 special characters are modifier marks with specific functions:

**Virama (꣄) - Vowel Killer:**
- Removes the inherent 'a' vowel from consonants
- Example: `ꢒ` (ka) + `꣄` = `ꢒ꣄` (k)
- Used to create pure consonant sounds

**Ha-modifier (ꢁ):**
- Adds 'ha' sound to consonants
- Example: `ꢒ` (ka) + `ꢁ` = `ꢒꢁ` (kaha)
- Creates compound consonant sounds

## Browser Support

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential additions (not in current MVP):
- Audio pronunciation for each character
- Reverse quiz (English → Sourashtra)
- Typing practice mode
- Words and phrases beyond single characters
- User accounts and cloud sync
- Mobile app version (React Native/Capacitor)
- Spaced repetition algorithm
- Progress charts and analytics

## License

MIT License - Feel free to use and modify

## Author

Built with Claude Code
