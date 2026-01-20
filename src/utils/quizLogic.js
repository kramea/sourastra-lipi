// Utility functions for quiz generation
import { baseCharacters, vowelSigns, combineConsonantWithVowelSign } from '../data/characters';

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomCharacters(characters, count, excludeIndex) {
  const available = characters.filter((_, index) => index !== excludeIndex);
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, count);
}

// Generate a random consonant+vowel sign combination
export function generateRandomCombination() {
  const consonants = baseCharacters.filter(c => c.category === 'consonant');
  const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
  const randomVowelSign = vowelSigns[Math.floor(Math.random() * vowelSigns.length)];

  const combined = combineConsonantWithVowelSign(randomConsonant, randomVowelSign);

  return {
    id: `combo-${randomConsonant.id}-${randomVowelSign.id}`,
    sourashtra: combined.sourashtra,
    english: combined.english,
    tamil: combined.tamil,
    category: 'combination',
    consonantId: randomConsonant.id,
    vowelSignId: randomVowelSign.id
  };
}

export function generateQuestion(characters, correctIndex, questionType = 'char-to-sound') {
  const correct = characters[correctIndex];
  const wrongAnswers = getRandomCharacters(characters, 3, correctIndex);

  if (questionType === 'char-to-sound') {
    // Show Sourashtra character, ask for pronunciation
    const allOptions = shuffleArray([
      { english: correct.english, tamil: correct.tamil },
      ...wrongAnswers.map(char => ({ english: char.english, tamil: char.tamil }))
    ]);

    return {
      questionType: 'char-to-sound',
      question: correct.sourashtra,
      correctAnswer: correct.english,
      correctTamil: correct.tamil,
      options: allOptions,
      characterId: correct.id
    };
  } else {
    // Show pronunciation, ask for Sourashtra character
    const allOptions = shuffleArray([
      { sourashtra: correct.sourashtra },
      ...wrongAnswers.map(char => ({ sourashtra: char.sourashtra }))
    ]);

    return {
      questionType: 'sound-to-char',
      question: correct.english,
      questionTamil: correct.tamil,
      correctAnswer: correct.sourashtra,
      options: allOptions,
      characterId: correct.id
    };
  }
}

export function generateQuiz(characters, questionCount = 10) {
  const allQuestions = [];

  // Mix: 50% from existing characters, 50% random consonant+vowel combinations
  const fromCharactersCount = Math.floor(questionCount / 2);
  const fromCombinationsCount = questionCount - fromCharactersCount;

  // Filter characters: exclude rare vowels and special characters most of the time (20% chance)
  const commonCharacters = characters.filter(c =>
    c.category !== 'rare-vowel' && c.category !== 'special'
  );
  const rareCharacters = characters.filter(c =>
    c.category === 'rare-vowel' || c.category === 'special'
  );

  // Generate questions from existing characters (50/50 split between both question types)
  const selectedCharacters = [];

  // Pick mostly common characters, with occasional rare ones (20% chance for rare)
  for (let i = 0; i < fromCharactersCount; i++) {
    const useRare = Math.random() < 0.2 && rareCharacters.length > 0;
    const pool = useRare ? rareCharacters : commonCharacters;
    const randomChar = pool[Math.floor(Math.random() * pool.length)];
    selectedCharacters.push(randomChar);
  }

  selectedCharacters.forEach((char, i) => {
    // Alternate between question types
    const questionType = i % 2 === 0 ? 'char-to-sound' : 'sound-to-char';
    const charIndex = characters.indexOf(char);
    allQuestions.push(generateQuestion(characters, charIndex, questionType));
  });

  // Generate questions from random combinations (also mixed)
  for (let i = 0; i < fromCombinationsCount; i++) {
    const combination = generateRandomCombination();
    const questionType = i % 2 === 0 ? 'char-to-sound' : 'sound-to-char';

    if (questionType === 'char-to-sound') {
      // Get 3 wrong answers (other random combinations)
      const wrongAnswers = [];
      for (let j = 0; j < 3; j++) {
        const wrongCombo = generateRandomCombination();
        wrongAnswers.push({ english: wrongCombo.english, tamil: wrongCombo.tamil });
      }

      const allOptions = shuffleArray([
        { english: combination.english, tamil: combination.tamil },
        ...wrongAnswers
      ]);

      allQuestions.push({
        questionType: 'char-to-sound',
        question: combination.sourashtra,
        correctAnswer: combination.english,
        correctTamil: combination.tamil,
        options: allOptions,
        characterId: combination.id
      });
    } else {
      // Sound-to-char: show pronunciation, ask for character
      const wrongAnswers = [];
      for (let j = 0; j < 3; j++) {
        const wrongCombo = generateRandomCombination();
        wrongAnswers.push({ sourashtra: wrongCombo.sourashtra });
      }

      const allOptions = shuffleArray([
        { sourashtra: combination.sourashtra },
        ...wrongAnswers
      ]);

      allQuestions.push({
        questionType: 'sound-to-char',
        question: combination.english,
        questionTamil: combination.tamil,
        correctAnswer: combination.sourashtra,
        options: allOptions,
        characterId: combination.id
      });
    }
  }

  // Shuffle all questions
  return shuffleArray(allQuestions);
}
