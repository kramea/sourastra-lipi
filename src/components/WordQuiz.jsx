import { useState, useEffect } from 'react';
import { generateWordQuiz } from '../utils/wordQuizLogic';
import { recordQuizCompletion } from '../utils/progressTracker';

function WordQuiz({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showFullWord, setShowFullWord] = useState(false);

  useEffect(() => {
    // Generate word quiz on component mount
    const quiz = generateWordQuiz(10);
    setQuestions(quiz);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answerObj) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerObj);
    setShowResult(true);
    setShowFullWord(true);

    // Check if answer is correct based on question type
    let isCorrect;
    if (currentQuestion.questionType === 'word-to-pronunciation') {
      isCorrect = answerObj.englishPronunciation === currentQuestion.correctAnswer;
    } else {
      isCorrect = answerObj.sourashtra === currentQuestion.correctAnswer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowFullWord(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      saveQuizScore();
    }
  };

  const saveQuizScore = () => {
    const percentage = Math.round(((score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)) / questions.length) * 100);

    // Save to localStorage
    const scores = JSON.parse(localStorage.getItem('wordQuizScores') || '[]');
    scores.push({
      score: percentage,
      date: new Date().toISOString(),
      total: questions.length
    });
    localStorage.setItem('wordQuizScores', JSON.stringify(scores));

    // Update best score
    const bestScore = Math.max(...scores.map(s => s.score));
    localStorage.setItem('bestWordScore', bestScore.toString());

    // Record completion
    recordQuizCompletion();
  };

  const handleTryAgain = () => {
    const quiz = generateWordQuiz(10);
    setQuestions(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
    setShowFullWord(false);
  };

  if (questions.length === 0) {
    return <div className="loading">Loading word quiz...</div>;
  }

  if (quizFinished) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="results-card">
          <h2>Word Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <div className="score-percentage">{finalScore}%</div>
              <div className="score-fraction">{score}/{questions.length}</div>
            </div>
          </div>
          <div className="results-message">
            {finalScore >= 90 && <p>Excellent! You know your words! 🎉</p>}
            {finalScore >= 70 && finalScore < 90 && <p>Great job! Keep learning words! 👍</p>}
            {finalScore >= 50 && finalScore < 70 && <p>Good effort! Practice more words! 📚</p>}
            {finalScore < 50 && <p>Keep learning! Words take practice! 💪</p>}
          </div>
          <div className="results-buttons">
            <button className="quiz-button secondary" onClick={onBack}>
              Back to Home
            </button>
            <button className="quiz-button primary" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="quiz-progress">
          Word {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="quiz-score">Score: {score}</div>
        {showResult && (
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? 'Next →' : 'Finish'}
          </button>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-card">
        {currentQuestion.questionType === 'word-to-pronunciation' ? (
          <>
            <div className="question-text">
              How do you pronounce this word?
            </div>
            <div className="question-character">
              {currentQuestion.question}
            </div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'option-button';

                if (showResult) {
                  if (option.englishPronunciation === currentQuestion.correctAnswer) {
                    buttonClass += ' correct';
                  } else if (selectedAnswer && option.englishPronunciation === selectedAnswer.englishPronunciation) {
                    buttonClass += ' incorrect';
                  } else {
                    buttonClass += ' disabled';
                  }
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    <div>{option.englishPronunciation}</div>
                    <div style={{ fontSize: '1.1rem', color: '#666', marginTop: '4px' }}>{option.tamilPronunciation}</div>
                  </button>
                );
              })}
            </div>

            {showFullWord && (
              <div className={`word-details ${selectedAnswer.englishPronunciation === currentQuestion.correctAnswer ? 'correct-word' : 'incorrect-word'}`}>
                <div className="word-sourashtra">{currentQuestion.fullWord.sourashtra}</div>
                <div className="word-pronunciation">
                  {currentQuestion.fullWord.englishPronunciation} / {currentQuestion.fullWord.tamilPronunciation}
                </div>
                <div className="word-meaning">
                  {currentQuestion.fullWord.englishMeaning} / {currentQuestion.fullWord.tamilMeaning}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="question-text">
              Which word is pronounced like this?
            </div>
            <div className="question-character" style={{ fontSize: '2.5rem' }}>
              {currentQuestion.questionEnglish}
              <div style={{ fontSize: '2rem', color: '#666', marginTop: '8px' }}>{currentQuestion.questionTamil}</div>
            </div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'option-button';

                if (showResult) {
                  if (option.sourashtra === currentQuestion.correctAnswer) {
                    buttonClass += ' correct';
                  } else if (selectedAnswer && option.sourashtra === selectedAnswer.sourashtra) {
                    buttonClass += ' incorrect';
                  } else {
                    buttonClass += ' disabled';
                  }
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    <div style={{ fontSize: '2.5rem' }}>{option.sourashtra}</div>
                  </button>
                );
              })}
            </div>

            {showFullWord && (
              <div className={`word-details ${selectedAnswer.sourashtra === currentQuestion.correctAnswer ? 'correct-word' : 'incorrect-word'}`}>
                <div className="word-sourashtra">{currentQuestion.fullWord.sourashtra}</div>
                <div className="word-pronunciation">
                  {currentQuestion.fullWord.englishPronunciation} / {currentQuestion.fullWord.tamilPronunciation}
                </div>
                <div className="word-meaning">
                  {currentQuestion.fullWord.englishMeaning} / {currentQuestion.fullWord.tamilMeaning}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WordQuiz;
