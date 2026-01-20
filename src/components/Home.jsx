import { useState, useEffect, useMemo } from 'react';
import { characters, rareVowels, generateVowelSignsWithRandomConsonant, generateSpecialCharsWithRandomConsonant } from '../data/characters';
import { getCharacterProgress, getProgressColor, isWordQuizUnlocked, getQuizStats } from '../utils/progressTracker';

function Home({ onCharacterClick, onQuizClick, onWordQuizClick }) {
  const [characterProgress, setCharacterProgress] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    0: true, // Vowels expanded by default
    1: false,
    2: false,
    3: false,
    4: false
  });

  // Generate vowel signs and special chars with random consonants on each render
  const randomVowelSigns = useMemo(() => generateVowelSignsWithRandomConsonant(), []);
  const randomSpecialChars = useMemo(() => generateSpecialCharsWithRandomConsonant(), []);

  // Load progress for all characters
  useEffect(() => {
    const progress = {};
    characters.forEach(char => {
      progress[char.id] = getCharacterProgress(char.id);
    });
    setCharacterProgress(progress);
  }, []);

  // Organize characters by category
  const vowels = characters.filter(c => c.category === 'vowel');
  const consonants = characters.filter(c => c.category === 'consonant');

  const sections = [
    { title: 'Vowels', chars: vowels, gridStyle: 'auto' },
    { title: 'Rare Vowels (Less Common)', chars: rareVowels, gridStyle: 'auto', note: 'These vowels are rarely used' },
    { title: 'Consonants', chars: consonants, gridStyle: 'fixed-5' },
    { title: 'Vowel Signs', chars: randomVowelSigns, gridStyle: 'auto' },
    { title: 'Special Characters', chars: randomSpecialChars, gridStyle: 'auto' }
  ];

  // Toggle section expansion
  const toggleSection = (sectionIndex) => {
    // Check if at least one section will remain expanded
    const currentlyExpanded = Object.values(expandedSections).filter(Boolean).length;
    const isCurrentlyExpanded = expandedSections[sectionIndex];

    // Prevent collapsing if this is the only expanded section
    if (currentlyExpanded === 1 && isCurrentlyExpanded) {
      return;
    }

    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  // Calculate stats
  const stats = {
    total: characters.length,
    new: Object.values(characterProgress).filter(p => p.masteryLevel === 'new').length,
    learning: Object.values(characterProgress).filter(p => p.masteryLevel === 'learning').length,
    practiced: Object.values(characterProgress).filter(p => p.masteryLevel === 'practiced').length,
    mastered: Object.values(characterProgress).filter(p => p.masteryLevel === 'mastered').length
  };

  return (
    <div className="home-grid-container">
      <header className="grid-header">
        <h1 className="grid-title">Learn Sourashtra <i>Lipi</i></h1>
        <p className="grid-subtitle">Uncollapse the sections to see all the letters. Practice everyday for mastering the Lipi</p>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-badge new">New</div>
          <span className="stat-count">{stats.total - stats.learning - stats.practiced - stats.mastered}</span>
        </div>
        <div className="stat-item">
          <div className="stat-badge learning">Learning</div>
          <span className="stat-count">{stats.learning}</span>
        </div>
        <div className="stat-item">
          <div className="stat-badge practiced">Practiced</div>
          <span className="stat-count">{stats.practiced}</span>
        </div>
        <div className="stat-item">
          <div className="stat-badge mastered">Mastered</div>
          <span className="stat-count">{stats.mastered}</span>
        </div>
      </div>

      {/* Character Grid Sections */}
      {sections.map((section, sectionIndex) => {
        const isExpanded = expandedSections[sectionIndex];
        const isOnlyExpanded = Object.values(expandedSections).filter(Boolean).length === 1 && isExpanded;

        return (
          <div key={sectionIndex} className="character-section">
            <div
              className="section-header"
              onClick={() => toggleSection(sectionIndex)}
              style={{ cursor: isOnlyExpanded ? 'not-allowed' : 'pointer' }}
            >
              <h2 className="section-title">
                <span className="section-toggle-icon">{isExpanded ? '▼' : '▶'}</span>
                {section.title}
              </h2>
            </div>
            {section.note && isExpanded && <p className="section-note">{section.note}</p>}
            {isExpanded && (
              <div className={`character-grid ${section.gridStyle}`}>
                {section.chars.map(char => {
                  const progress = characterProgress[char.id] || { masteryLevel: 'new' };
                  const bgColor = getProgressColor(progress.masteryLevel);

                  return (
                    <button
                      key={char.id}
                      className="character-tile"
                      style={{ backgroundColor: bgColor }}
                      onClick={() => onCharacterClick(char)}
                      title={`${char.english} - ${progress.masteryLevel}`}
                    >
                      <div className="tile-character">{char.sourashtra}</div>
                      <div className="tile-english">{char.english} / {char.tamil}</div>
                      {progress.quizAttempts > 0 && (
                        <div className="tile-accuracy">
                          {Math.round((progress.quizCorrect / progress.quizAttempts) * 100)}%
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Quiz Buttons (Fixed) */}
      <button className="quiz-fab" onClick={onQuizClick}>
        <span className="fab-icon">📝</span>
        <span className="fab-text">Practice</span>
      </button>

      {/* Word Quiz Button (appears after 3 consecutive completions) */}
      {isWordQuizUnlocked() && (
        <button className="word-quiz-fab" onClick={onWordQuizClick}>
          <span className="fab-icon">📚</span>
          <span className="fab-text">Words</span>
        </button>
      )}

      {/* Progress indicator for unlocking word quiz */}
      {!isWordQuizUnlocked() && getQuizStats().consecutiveCompletions > 0 && (
        <div className="unlock-progress">
          Complete {3 - getQuizStats().consecutiveCompletions} more quiz{3 - getQuizStats().consecutiveCompletions > 1 ? 'zes' : ''} to unlock word quiz!
        </div>
      )}

      {/* Legend */}
      <div className="progress-legend">
        <h3>Progress Levels:</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color new"></div>
            <span>New - Not practiced yet</span>
          </div>
          <div className="legend-item">
            <div className="legend-color learning"></div>
            <span>Learning - Viewed or &lt;70% accuracy</span>
          </div>
          <div className="legend-item">
            <div className="legend-color practiced"></div>
            <span>Practiced - 3+ attempts, ≥70% accuracy</span>
          </div>
          <div className="legend-item">
            <div className="legend-color mastered"></div>
            <span>Mastered - 5+ attempts, ≥90% accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
