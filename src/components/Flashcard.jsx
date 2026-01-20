import React, { useState, useEffect } from 'react';
import { characters, categories } from '../data/characters';

function Flashcard({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(characters);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Filter characters based on category
    if (filter === 'all') {
      setDeck(characters);
    } else {
      setDeck(characters.filter(char => char.category === filter));
    }
    setCurrentIndex(0);
    setFlipped(false);
  }, [filter]);

  useEffect(() => {
    // Track cards viewed in localStorage
    const viewedCards = JSON.parse(localStorage.getItem('cardsViewed') || '[]');
    if (!viewedCards.includes(deck[currentIndex]?.id)) {
      viewedCards.push(deck[currentIndex]?.id);
      localStorage.setItem('cardsViewed', JSON.stringify(viewedCards));
    }
  }, [currentIndex, deck]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const currentChar = deck[currentIndex];

  if (!currentChar) {
    return <div>No characters available</div>;
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>Flashcards</h2>
        <div className="flashcard-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <button className="shuffle-button" onClick={handleShuffle}>
            🔀 Shuffle
          </button>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-text">
          {currentIndex + 1} / {deck.length}
        </div>
        <div className="progress-fill-container">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="card-wrapper">
        <div
          className={`card ${flipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="card-front">
            <div className="category-badge">{categories[currentChar.category]}</div>
            <div className="character-display">{currentChar.sourashtra}</div>
            {currentChar.description && (
              <div className="vowel-sign-hint">{currentChar.description}</div>
            )}
            <div className="tap-hint">Tap to flip</div>
          </div>
          <div className="card-back">
            <div className="category-badge">{categories[currentChar.category]}</div>
            <div className="tamil-display">{currentChar.tamil}</div>
            <div className="english-display">{currentChar.english}</div>
            <div className="character-small">{currentChar.sourashtra}</div>
            {currentChar.description && (
              <div className="vowel-sign-explanation">
                This is a consonant + vowel sign combination
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={deck.length <= 1}
        >
          ← Previous
        </button>
        <button
          className="nav-button primary"
          onClick={handleNext}
          disabled={deck.length <= 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
