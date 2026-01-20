// Utility functions for word quiz generation
import { words } from '../data/words';
import { shuffleArray } from './quizLogic';

// Get random words for wrong answers
export function getRandomWords(count, excludeId) {
  const available = words.filter(w => w.id !== excludeId);
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, count);
}

// Generate a word quiz question
export function generateWordQuestion(word, questionType = 'word-to-pronunciation') {
  const wrongWords = getRandomWords(3, word.id);

  if (questionType === 'word-to-pronunciation') {
    // Show Sourashtra word, ask for pronunciation
    const allOptions = shuffleArray([
      {
        englishPronunciation: word.englishPronunciation,
        tamilPronunciation: word.tamilPronunciation
      },
      ...wrongWords.map(w => ({
        englishPronunciation: w.englishPronunciation,
        tamilPronunciation: w.tamilPronunciation
      }))
    ]);

    return {
      questionType: 'word-to-pronunciation',
      question: word.sourashtra,
      correctAnswer: word.englishPronunciation,
      correctTamilAnswer: word.tamilPronunciation,
      options: allOptions,
      wordId: word.id,
      fullWord: word
    };
  } else {
    // Show pronunciation, ask for Sourashtra word
    const allOptions = shuffleArray([
      { sourashtra: word.sourashtra },
      ...wrongWords.map(w => ({ sourashtra: w.sourashtra }))
    ]);

    return {
      questionType: 'pronunciation-to-word',
      questionEnglish: word.englishPronunciation,
      questionTamil: word.tamilPronunciation,
      correctAnswer: word.sourashtra,
      options: allOptions,
      wordId: word.id,
      fullWord: word
    };
  }
}

// Generate word quiz (10 questions, mixed types)
export function generateWordQuiz(questionCount = 10) {
  const allQuestions = [];

  // Select random words (avoid duplicates)
  const selectedWords = shuffleArray([...words]).slice(0, Math.min(questionCount, words.length));

  selectedWords.forEach((word, i) => {
    // Alternate between question types
    const questionType = i % 2 === 0 ? 'word-to-pronunciation' : 'pronunciation-to-word';
    allQuestions.push(generateWordQuestion(word, questionType));
  });

  // Shuffle all questions
  return shuffleArray(allQuestions);
}
