// Base characters (vowels and consonants)
export const baseCharacters = [
  { id: 1, sourashtra: "ꢂ", english: "a", tamil: "அ", category: "vowel" },
  { id: 2, sourashtra: "ꢃ", english: "aa", tamil: "ஆ", category: "vowel" },
  { id: 3, sourashtra: "ꢄ", english: "i", tamil: "இ", category: "vowel" },
  { id: 4, sourashtra: "ꢅ", english: "ii", tamil: "ஈ", category: "vowel" },
  { id: 5, sourashtra: "ꢆ", english: "u", tamil: "உ", category: "vowel" },
  { id: 6, sourashtra: "ꢇ", english: "uu", tamil: "ஊ", category: "vowel" },
  { id: 11, sourashtra: "ꢌ", english: "ye", tamil: "எ", category: "vowel" },
  { id: 12, sourashtra: "ꢍ", english: "yE", tamil: "ஏ", category: "vowel" },
  { id: 13, sourashtra: "ꢎ", english: "ai", tamil: "ஐ", category: "vowel" },
  { id: 14, sourashtra: "ꢏ", english: "o", tamil: "ஒ", category: "vowel" },
  { id: 15, sourashtra: "ꢐ", english: "oo", tamil: "ஓ", category: "vowel" },
  { id: 16, sourashtra: "ꢑ", english: "au", tamil: "ஔ", category: "vowel" },
  { id: 17, sourashtra: "ꢒ", english: "ka", tamil: "க", category: "consonant", baseSound: "k" },
  { id: 18, sourashtra: "ꢓ", english: "kha", tamil: "க\u00B2", category: "consonant", baseSound: "kh" },
  { id: 19, sourashtra: "ꢔ", english: "ga", tamil: "க\u00B3", category: "consonant", baseSound: "g" },
  { id: 20, sourashtra: "ꢕ", english: "gha", tamil: "க\u2074", category: "consonant", baseSound: "gh" },
  { id: 21, sourashtra: "ꢖ", english: "nga", tamil: "ங", category: "consonant", baseSound: "ng" },
  { id: 22, sourashtra: "ꢗ", english: "ca", tamil: "ச", category: "consonant", baseSound: "c" },
  { id: 23, sourashtra: "ꢘ", english: "cha", tamil: "ச\u00B2", category: "consonant", baseSound: "ch" },
  { id: 24, sourashtra: "ꢙ", english: "ja", tamil: "ஜ", category: "consonant", baseSound: "j" },
  { id: 25, sourashtra: "ꢚ", english: "jha", tamil: "ஜ\u00B2", category: "consonant", baseSound: "jh" },
  { id: 26, sourashtra: "ꢛ", english: "nya", tamil: "ஞ", category: "consonant", baseSound: "ny" },
  { id: 27, sourashtra: "ꢜ", english: "Ta", tamil: "ட", category: "consonant", baseSound: "T" },
  { id: 28, sourashtra: "ꢝ", english: "Tha", tamil: "ட\u00B2", category: "consonant", baseSound: "Th" },
  { id: 29, sourashtra: "ꢞ", english: "Da", tamil: "ட\u00B3", category: "consonant", baseSound: "D" },
  { id: 30, sourashtra: "ꢟ", english: "Dha", tamil: "ட\u2074", category: "consonant", baseSound: "Dh" },
  { id: 31, sourashtra: "ꢠ", english: "Na", tamil: "ண", category: "consonant", baseSound: "N" },
  { id: 32, sourashtra: "ꢡ", english: "ta", tamil: "த", category: "consonant", baseSound: "t" },
  { id: 33, sourashtra: "ꢢ", english: "tha", tamil: "த\u00B2", category: "consonant", baseSound: "th" },
  { id: 34, sourashtra: "ꢣ", english: "da", tamil: "த\u00B3", category: "consonant", baseSound: "d" },
  { id: 35, sourashtra: "ꢤ", english: "dha", tamil: "த\u2074",category: "consonant", baseSound: "dh" },
  { id: 36, sourashtra: "ꢥ", english: "na", tamil: "ந", category: "consonant", baseSound: "n" },
  { id: 37, sourashtra: "ꢦ", english: "pa", tamil: "ப", category: "consonant", baseSound: "p" },
  { id: 38, sourashtra: "ꢧ", english: "pha", tamil: "ப\u00B2", category: "consonant", baseSound: "ph" },
  { id: 39, sourashtra: "ꢨ", english: "ba", tamil: "ப\u00B3", category: "consonant", baseSound: "b" },
  { id: 40, sourashtra: "ꢩ", english: "bha", tamil: "ப\u2074", category: "consonant", baseSound: "bh" },
  { id: 41, sourashtra: "ꢪ", english: "ma", tamil: "ம", category: "consonant", baseSound: "m" },
  { id: 42, sourashtra: "ꢫ", english: "ya", tamil: "ய", category: "consonant", baseSound: "y" },
  { id: 43, sourashtra: "ꢬ", english: "ra", tamil: "ர", category: "consonant", baseSound: "r" },
  { id: 44, sourashtra: "ꢭ", english: "la", tamil: "ல", category: "consonant", baseSound: "l" },
  { id: 45, sourashtra: "ꢳ", english: "La", tamil: "ள", category: "consonant", baseSound: "L" },
  { id: 46, sourashtra: "ꢮ", english: "va", tamil: "வ", category: "consonant", baseSound: "v" },
  { id: 47, sourashtra: "ꢲ", english: "ha", tamil: "ஹ", category: "consonant", baseSound: "h" },
  { id: 48, sourashtra: "ꢯ", english: "sa", tamil: "ஶ", category: "consonant", baseSound: "s" },
  { id: 49, sourashtra: "ꢰ", english: "sha", tamil: "ஷ", category: "consonant", baseSound: "sh" },
  { id: 50, sourashtra: "ꢱ", english: "sa", tamil: "ஸ",category: "consonant", baseSound: "s" },
  { id: 52, sourashtra: "ꢒ꣄‍ꢰ", english: "ksa", tamil: "க்ஷ",category: "consonant", baseSound: "ks" },
];

// Rare vowels (used less frequently)
export const rareVowels = [
  { id: 7, sourashtra: "ꢈ", english: "rru", tamil: "ர்ரு", category: "rare-vowel" },
  { id: 8, sourashtra: "ꢉ", english: "rruu", tamil: "ர்ரூ", category: "rare-vowel" },
  { id: 9, sourashtra: "ꢊ", english: "lu", tamil: "லு", category: "rare-vowel" },
  { id: 10, sourashtra: "ꢋ", english: "luu", tamil: "லூ", category: "rare-vowel" },
];

// Special characters (h-modifier combinations with valid consonants only)
export const specialCharacters = [
  { id: 71, sourashtra: "ꢪꢴ", english: "mha", tamil: "ம:", category: "special", baseConsonant: "ma", description: "ma + h-modifier" },
  { id: 72, sourashtra: "ꢥꢴ", english: "nha", tamil: "ந:", category: "special", baseConsonant: "na", description: "na + h-modifier" },
  { id: 73, sourashtra: "ꢬꢴ", english: "rha", tamil: "ர:", category: "special", baseConsonant: "ra", description: "ra + h-modifier" },
  { id: 74, sourashtra: "ꢭꢴ", english: "lha", tamil: "ல:", category: "special", baseConsonant: "la", description: "la + h-modifier" },
  { id: 75, sourashtra: "ꢮꢴ", english: "vha", tamil: "வ:", category: "special", baseConsonant: "va", description: "va + h-modifier" }
];

// Vowel signs (diacritical marks that modify consonants)
export const vowelSigns = [
  { id: 51, sourashtra: "ꢵ", english: "a", vowelSound: "a", tamilSign: "ா", category: "vowel-sign" },
  { id: 52, sourashtra: "ꢶ", english: "i", vowelSound: "i", tamilSign: "ி", category: "vowel-sign" },
  { id: 53, sourashtra: "ꢷ", english: "ii", vowelSound: "ii", tamilSign: "ீ", category: "vowel-sign" },
  { id: 54, sourashtra: "ꢸ", english: "u", vowelSound: "u", tamilSign: "ு", category: "vowel-sign" },
  { id: 55, sourashtra: "ꢹ", english: "uu", vowelSound: "uu", tamilSign: "ூ", category: "vowel-sign" },
  { id: 56, sourashtra: "ꢾ", english: "e", vowelSound: "e", tamilSign: "ெ", category: "vowel-sign" },
  { id: 57, sourashtra: "ꢿ", english: "ee", vowelSound: "ee", tamilSign: "ே", category: "vowel-sign" },
  { id: 58, sourashtra: "ꣀ", english: "ai", vowelSound: "ai", tamilSign: "ை", category: "vowel-sign" },
  { id: 59, sourashtra: "ꣁ", english: "o", vowelSound: "o", tamilSign: "ொ", category: "vowel-sign" },
  { id: 60, sourashtra: "ꣂ", english: "oo", vowelSound: "oo", tamilSign: "ோ", category: "vowel-sign" },
  { id: 61, sourashtra: "ꣃ", english: "au", vowelSound: "au", tamilSign: "ௌ", category: "vowel-sign" }
];

// Additional modifier signs (shown in vowel signs section)
export const modifierSigns = [
  { id: 65, sourashtra: "꣄", english: "virama", tamil: "்", modifierType: "vowel-killer", description: "Removes inherent 'a' vowel" },
  { id: 63, sourashtra: "ꢀ", english: "m", tamil: "ம்", modifierType: "m-modifier", description: "Adds 'm' sound" },
  { id: 62, sourashtra: "ꢁ", english: "ha", tamil: "ஹ", modifierType: "ha-modifier", description: "Adds 'ha' sound" }
];

// Helper function to get a sample consonant for vowel signs
export function getSampleConsonant() {
  return baseCharacters[16]; // "ka" (ꢒ)
}

// Helper function to get a random consonant
export function getRandomConsonant() {
  const consonants = baseCharacters.filter(c => c.category === 'consonant');
  return consonants[Math.floor(Math.random() * consonants.length)];
}

// Generate vowel sign characters with a random consonant (same consonant for all)
export function generateVowelSignsWithRandomConsonant() {
  const randomConsonant = getRandomConsonant(); // Pick ONE random consonant for all vowel signs

  // Generate vowel signs
  const vowelSignsWithConsonant = vowelSigns.map(vowelSign => {
    const combined = combineConsonantWithVowelSign(randomConsonant, vowelSign);
    return {
      id: vowelSign.id,
      sourashtra: combined.sourashtra,
      english: combined.english,
      tamil: combined.tamil,
      category: "vowel-sign",
      vowelSignOnly: vowelSign.sourashtra,
      description: `${randomConsonant.english.slice(0, -1)}${vowelSign.vowelSound} (${randomConsonant.sourashtra} + ${vowelSign.sourashtra})`
    };
  });

  // Generate modifier signs
  const modifierSignsWithConsonant = modifierSigns.map(modifier => {
    const combined = combineConsonantWithSpecial(randomConsonant, modifier);
    return {
      id: modifier.id,
      sourashtra: combined.sourashtra,
      english: combined.english,
      tamil: combined.tamil,
      category: "vowel-sign",
      modifierOnly: modifier.sourashtra,
      description: `${combined.english} (${randomConsonant.sourashtra} + ${modifier.sourashtra}) - ${modifier.description}`,
      modifierType: modifier.modifierType
    };
  });

  return [...vowelSignsWithConsonant, ...modifierSignsWithConsonant];
}

// Generate special characters (h-modifier combinations - already complete)
export function generateSpecialCharsWithRandomConsonant() {
  // Special characters are now pre-defined h-modifier combinations
  // Just return them as-is since they're already complete characters
  return specialCharacters.map(special => ({
    ...special,
    id: special.id,
    sourashtra: special.sourashtra,
    english: special.english,
    tamil: special.tamil,
    category: "special",
    description: special.description
  }));
}

// Helper function to combine consonant with vowel sign
export function combineConsonantWithVowelSign(consonant, vowelSign) {
  if (!consonant.baseSound || !vowelSign.vowelSound) return null;

  // Combine Tamil if available
  let tamilCombined = consonant.tamil || '';
  if (vowelSign.tamilSign && consonant.tamil) {
    // Tamil vowel signs must be placed in proper order with the consonant
    // The Unicode combining order matters - always consonant first, then combining marks

    // Check if the Tamil consonant has a superscript (², ³, ⁴)
    const superscriptRegex = /([²³⁴])$/;
    const match = consonant.tamil.match(superscriptRegex);

    if (match) {
      // If there's a superscript, insert vowel sign before it
      // e.g., "க²" + "ொ" = "கொ²"
      const baseTamil = consonant.tamil.replace(superscriptRegex, '');
      const superscript = match[1];
      tamilCombined = baseTamil + vowelSign.tamilSign + superscript;
    } else {
      // No superscript, just append the vowel sign
      tamilCombined = consonant.tamil + vowelSign.tamilSign;
    }
  }

  return {
    sourashtra: consonant.sourashtra + vowelSign.sourashtra,
    english: consonant.baseSound + vowelSign.vowelSound,
    tamil: tamilCombined,
    consonantId: consonant.id,
    vowelSignId: vowelSign.id
  };
}

// Helper function to combine consonant with special character
export function combineConsonantWithSpecial(consonant, special) {
  if (!consonant.baseSound) return null;

  let combined = {
    sourashtra: consonant.sourashtra + special.sourashtra,
    consonantId: consonant.id,
    specialId: special.id
  };

  // Check if the Tamil consonant has a superscript (², ³, ⁴)
  const superscriptRegex = /([²³⁴])$/;
  const match = consonant.tamil ? consonant.tamil.match(superscriptRegex) : null;
  const baseTamil = match ? consonant.tamil.replace(superscriptRegex, '') : consonant.tamil;
  const superscript = match ? match[1] : '';

  if (special.modifierType === 'vowel-killer') {
    // Virama removes the inherent 'a' vowel
    combined.english = consonant.baseSound; // Just the consonant sound
    // Tamil: Add virama (்) before superscript (e.g., க்² , ங்)
    combined.tamil = baseTamil + '்' + superscript;
  } else if (special.modifierType === 'ha-modifier') {
    // Ha-modifier adds 'ha' to the consonant
    combined.english = consonant.english + special.english; // e.g., "ka" + "ha" = "kaha"
    // Tamil: Add ஹ before superscript (e.g., கஹ²)
    combined.tamil = baseTamil + 'ஹ' + superscript;
  } else if (special.modifierType === 'h-modifier') {
    // h-modifier: Only works with specific consonants (ma, na, ra, la, va)
    // Replaces 'a' with 'ha': ma → mha, na → nha, ra → rha, la → lha, va → vha
    const validConsonants = ['m', 'n', 'r', 'l', 'v'];
    if (validConsonants.includes(consonant.baseSound)) {
      combined.english = consonant.baseSound + 'ha'; // e.g., "m" + "ha" = "mha"
      combined.tamil = baseTamil + 'ஹ' + superscript;
    } else {
      // For invalid consonants, just combine as-is (won't be used in practice)
      combined.english = consonant.english + 'h';
      combined.tamil = baseTamil + 'ஹ' + superscript;
    }
  } else if (special.modifierType === 'm-modifier') {
    // m-modifier: Adds 'm' sound after the consonant
    // ka → kam, la → lam, etc.
    combined.english = consonant.english + 'm'; // e.g., "ka" + "m" = "kam"
    combined.tamil = baseTamil + 'ம்' + superscript;
  }

  return combined;
}

// Generate all characters including vowel sign combinations, modifier signs, and special characters
export const characters = [
  ...baseCharacters,
  ...vowelSigns.map(vowelSign => {
    const sampleConsonant = getSampleConsonant();
    const combined = combineConsonantWithVowelSign(sampleConsonant, vowelSign);
    return {
      id: vowelSign.id,
      sourashtra: combined.sourashtra,
      english: combined.english,
      tamil: combined.tamil,
      category: "vowel-sign",
      vowelSignOnly: vowelSign.sourashtra,
      description: `${sampleConsonant.english.slice(0, -1)}${vowelSign.vowelSound} (${sampleConsonant.sourashtra} + ${vowelSign.sourashtra})`
    };
  }),
  ...modifierSigns.map(modifier => {
    const sampleConsonant = getSampleConsonant();
    const combined = combineConsonantWithSpecial(sampleConsonant, modifier);
    return {
      id: modifier.id,
      sourashtra: combined.sourashtra,
      english: combined.english,
      tamil: combined.tamil,
      category: "vowel-sign",
      modifierOnly: modifier.sourashtra,
      description: `${combined.english} (${sampleConsonant.sourashtra} + ${modifier.sourashtra}) - ${modifier.description}`,
      modifierType: modifier.modifierType
    };
  }),
  ...specialCharacters
];

export const categories = {
  all: "All Characters",
  vowel: "Vowels",
  consonant: "Consonants",
  "vowel-sign": "Vowel Signs",
  special: "Special Characters",
  "rare-vowel": "Rare Vowels"
};
