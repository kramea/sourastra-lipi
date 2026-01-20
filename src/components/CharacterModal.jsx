import { useState, useEffect } from 'react';
import { markAsViewed } from '../utils/progressTracker';

function CharacterModal({ character, onClose }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Mark character as viewed when modal opens
    if (character) {
      markAsViewed(character.id);
    }
  }, [character]);

  if (!character) return null;

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-card-wrapper">
          <div
            className={`modal-card ${flipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="modal-card-front">
              <div className="modal-character">{character.sourashtra}</div>
              {character.description && (
                <div className="modal-hint">{character.description}</div>
              )}
              <div className="modal-tap-hint">Click to flip</div>
            </div>
            <div className="modal-card-back">
              <div className="modal-english">{character.english} / {character.tamil}</div>
              <div className="modal-character-small">{character.sourashtra}</div>
              {character.description && (
                <div className="modal-explanation">
                  This is a combination character
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-info">
          <div className="info-item">
            <span className="info-label">Category:</span>
            <span className="info-value">{character.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
