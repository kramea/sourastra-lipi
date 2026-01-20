// Progress tracking utilities

// Time-based decay configuration (in days)
const DECAY_CONFIG = {
  mastered: 7,   // 7 days of no practice degrades mastered
  practiced: 5,  // 5 days of no practice degrades practiced
  learning: 3    // 3 days of no practice degrades learning
};

function applyTimeDecay(progress) {
  if (!progress.lastPracticed) {
    return progress;
  }

  const lastPracticedDate = new Date(progress.lastPracticed);
  const now = new Date();
  const daysSinceLastPractice = Math.floor((now - lastPracticedDate) / (1000 * 60 * 60 * 24));

  let newMasteryLevel = progress.masteryLevel;

  // Apply decay based on mastery level and days inactive
  if (progress.masteryLevel === 'mastered' && daysSinceLastPractice >= DECAY_CONFIG.mastered) {
    newMasteryLevel = 'practiced';
  } else if (progress.masteryLevel === 'practiced' && daysSinceLastPractice >= DECAY_CONFIG.practiced) {
    newMasteryLevel = 'learning';
  } else if (progress.masteryLevel === 'learning' && daysSinceLastPractice >= DECAY_CONFIG.learning) {
    newMasteryLevel = 'new';
  }

  return {
    ...progress,
    masteryLevel: newMasteryLevel
  };
}

export function getCharacterProgress(characterId) {
  const allProgress = JSON.parse(localStorage.getItem('characterProgress') || '{}');
  const progress = allProgress[characterId] || {
    viewed: false,
    quizAttempts: 0,
    quizCorrect: 0,
    lastPracticed: null,
    masteryLevel: 'new' // new, learning, practiced, mastered
  };

  // Apply time-based decay
  const decayedProgress = applyTimeDecay(progress);

  // If mastery level changed due to decay, update localStorage
  if (decayedProgress.masteryLevel !== progress.masteryLevel) {
    allProgress[characterId] = decayedProgress;
    localStorage.setItem('characterProgress', JSON.stringify(allProgress));
  }

  return decayedProgress;
}

export function updateCharacterProgress(characterId, updates) {
  const allProgress = JSON.parse(localStorage.getItem('characterProgress') || '{}');
  const current = allProgress[characterId] || {
    viewed: false,
    quizAttempts: 0,
    quizCorrect: 0,
    lastPracticed: null,
    masteryLevel: 'new'
  };

  const updated = { ...current, ...updates, lastPracticed: new Date().toISOString() };

  // Calculate mastery level
  if (updated.quizAttempts > 0) {
    const accuracy = updated.quizCorrect / updated.quizAttempts;
    if (updated.quizAttempts >= 5 && accuracy >= 0.9) {
      updated.masteryLevel = 'mastered';
    } else if (updated.quizAttempts >= 3 && accuracy >= 0.7) {
      updated.masteryLevel = 'practiced';
    } else if (updated.quizAttempts >= 1) {
      updated.masteryLevel = 'learning';
    }
  } else if (updated.viewed) {
    updated.masteryLevel = 'learning';
  }

  allProgress[characterId] = updated;
  localStorage.setItem('characterProgress', JSON.stringify(allProgress));
  return updated;
}

export function markAsViewed(characterId) {
  return updateCharacterProgress(characterId, { viewed: true });
}

export function recordQuizAttempt(characterId, wasCorrect) {
  const current = getCharacterProgress(characterId);
  return updateCharacterProgress(characterId, {
    viewed: true,
    quizAttempts: current.quizAttempts + 1,
    quizCorrect: current.quizCorrect + (wasCorrect ? 1 : 0)
  });
}

export function getProgressColor(masteryLevel) {
  switch (masteryLevel) {
    case 'new':
      return '#F5FBE6'; // Light cream - not practiced
    case 'learning':
      return '#FFE8B8'; // Light orange/peach - learning
    case 'practiced':
      return '#90E0A1'; // Light green - practiced
    case 'mastered':
      return '#A8DADC'; // Light teal - mastered
    default:
      return '#F5FBE6';
  }
}

export function getProgressStats() {
  const allProgress = JSON.parse(localStorage.getItem('characterProgress') || '{}');
  const stats = {
    total: 0,
    new: 0,
    learning: 0,
    practiced: 0,
    mastered: 0
  };

  Object.values(allProgress).forEach(char => {
    stats.total++;
    stats[char.masteryLevel]++;
  });

  return stats;
}

// Track consecutive quiz completions for unlocking word quiz
export function recordQuizCompletion() {
  const stats = JSON.parse(localStorage.getItem('quizStats') || '{ "consecutiveCompletions": 0, "totalCompletions": 0 }');
  stats.consecutiveCompletions = (stats.consecutiveCompletions || 0) + 1;
  stats.totalCompletions = (stats.totalCompletions || 0) + 1;
  stats.lastCompletion = new Date().toISOString();
  localStorage.setItem('quizStats', JSON.stringify(stats));
  return stats;
}

export function resetConsecutiveQuizzes() {
  const stats = JSON.parse(localStorage.getItem('quizStats') || '{ "consecutiveCompletions": 0, "totalCompletions": 0 }');
  stats.consecutiveCompletions = 0;
  localStorage.setItem('quizStats', JSON.stringify(stats));
}

export function getQuizStats() {
  return JSON.parse(localStorage.getItem('quizStats') || '{ "consecutiveCompletions": 0, "totalCompletions": 0 }');
}

export function isWordQuizUnlocked() {
  const stats = getQuizStats();
  return stats.consecutiveCompletions >= 3;
}
