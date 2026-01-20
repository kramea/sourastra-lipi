import { useState, useEffect } from 'react';
import Home from './components/Home';
import CharacterModal from './components/CharacterModal';
import Quiz from './components/Quiz';
import WordQuiz from './components/WordQuiz';
import InstallPrompt from './components/InstallPrompt';
import './App.css';
import './mobile.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    // Refresh the home view to update progress colors
    setRefreshKey(prev => prev + 1);
  };

  const handleQuizClick = () => {
    setCurrentView('quiz');
  };

  const handleWordQuizClick = () => {
    setCurrentView('wordQuiz');
  };

  const handleQuizBack = () => {
    setCurrentView('home');
    // Refresh the home view to update progress colors
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      {/* Install App Button */}
      <InstallPrompt />

      {currentView === 'home' && (
        <>
          <Home
            key={refreshKey}
            onCharacterClick={handleCharacterClick}
            onQuizClick={handleQuizClick}
            onWordQuizClick={handleWordQuizClick}
          />
          {selectedCharacter && (
            <CharacterModal
              character={selectedCharacter}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
      {currentView === 'quiz' && (
        <Quiz onBack={handleQuizBack} />
      )}
      {currentView === 'wordQuiz' && (
        <WordQuiz onBack={handleQuizBack} />
      )}
    </div>
  );
}

export default App;
