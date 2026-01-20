# Vowel Signs Update

## What Changed

I've updated the app to properly handle **vowel signs** (diacritical marks) in Sourashtra script.

## Understanding Vowel Signs

In Sourashtra (like many Indian scripts), vowel signs are **combining marks** that modify consonants:

### How It Works

**Consonants** have an inherent 'a' sound:
- `ꢒ` = ka
- `ꢮ` = va
- `ꢪ` = ma

**Vowel signs** modify the consonant's vowel:
- `ꢵ` = a-vowel-sign
- `ꢶ` = i-vowel-sign
- `ꢸ` = u-vowel-sign
- `ꢾ` = e-vowel-sign
- etc.

**Combinations** create new sounds:
- `ꢒ` (ka) + `ꢶ` (i) = `ꢒꢶ` (ki)
- `ꢒ` (ka) + `ꢸ` (u) = `ꢒꢸ` (ku)
- `ꢒ` (ka) + `ꢾ` (e) = `ꢒꢾ` (ke)

The consonant sound (k, v, m, etc.) stays the same, but the vowel sound changes!

## What the App Does Now

### In Flashcards

When you view a **vowel sign** card, you'll see:

**Front of card:**
- The combined character (e.g., `ꢒꢶ`)
- A description: "ki (ꢒ + ꢶ)"

**Back of card:**
- The transliteration (e.g., "ki")
- The combined character
- Explanation: "This is a consonant + vowel sign combination"

### Example Consonant Used

For demonstration purposes, all vowel signs are shown combined with `ꢒ` (ka):
- `ꢒꢵ` = ka (k + a)
- `ꢒꢶ` = ki (k + i)
- `ꢒꢷ` = kii (k + ii)
- `ꢒꢸ` = ku (k + u)
- `ꢒꢹ` = kuu (k + uu)
- `ꢒꢾ` = ke (k + e)
- `ꢒꢿ` = kee (k + ee)
- `ꢒꣀ` = kai (k + ai)
- `ꢒꣁ` = ko (k + o)
- `ꢒꣂ` = koo (k + oo)
- `ꢒꣃ` = kau (k + au)

### Why "ka" (ꢒ)?

I chose `ꢒ` (ka) as the sample consonant because:
1. It's the first consonant in the dataset
2. It's simple and easy to recognize
3. It clearly demonstrates how vowel signs modify the sound

## Technical Implementation

### Data Structure

The code now has:

1. **Base Characters** - Standalone vowels, consonants, and special characters
2. **Vowel Signs** - The 11 diacritical marks
3. **Combined Characters** - Generated combinations of ka + each vowel sign

### New Fields

Consonants now have a `baseSound` field:
```javascript
{
  id: 17,
  sourashtra: "ꢒ",
  english: "ka",
  category: "consonant",
  baseSound: "k"  // NEW: just the consonant sound
}
```

Vowel signs have a `vowelSound` field:
```javascript
{
  id: 52,
  sourashtra: "ꢶ",
  english: "i",
  vowelSound: "i",  // NEW: just the vowel sound
  category: "vowel-sign"
}
```

### Helper Functions

Added utility functions in `characters.js`:
- `getSampleConsonant()` - Returns ka (ꢒ) for examples
- `combineConsonantWithVowelSign()` - Creates combined characters

## Future Enhancements

### Potential Additions

1. **Interactive Vowel Sign Builder**
   - Let users select any consonant
   - Then select any vowel sign
   - See the combination in real-time

2. **All Combinations Quiz**
   - Quiz on any consonant + vowel sign combo
   - Not just the ka combinations

3. **Practice Mode**
   - Specifically practice vowel sign combinations
   - Learn the pattern across all consonants

4. **Visual Breakdown**
   - Highlight the consonant and vowel sign separately
   - Show how they combine visually

## Files Modified

1. **src/data/characters.js**
   - Split into `baseCharacters` and `vowelSigns`
   - Added `baseSound` and `vowelSound` fields
   - Generate combined characters for vowel signs
   - Added helper functions

2. **src/components/Flashcard.jsx**
   - Display vowel sign descriptions
   - Show combination explanation on back

3. **src/App.css**
   - Added `.vowel-sign-hint` styling
   - Added `.vowel-sign-explanation` styling

4. **README.md**
   - Added "About Vowel Signs" section
   - Explained how combinations work

## Testing the Changes

To see the vowel signs in action:

1. Start the app: `npm run dev`
2. Go to Flashcards
3. Filter by "Vowel Signs"
4. You'll now see combined characters like `ꢒꢶ` (ki)
5. Flip the card to see the explanation

## Summary

The app now properly represents vowel signs as **consonant modifiers** rather than standalone characters. Each vowel sign is shown combined with `ꢒ` (ka) to demonstrate how it changes the vowel sound of a consonant.

This is more linguistically accurate and helps learners understand how Sourashtra script actually works!
