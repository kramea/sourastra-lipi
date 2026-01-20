import React, { useState, useEffect } from 'react';
import { characters } from '../data/characters';
import { generateQuiz } from '../utils/quizLogic';
import { recordQuizAttempt, recordQuizCompletion } from '../utils/progressTracker';

function Quiz({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    // Generate quiz on component mount
    const quiz = generateQuiz(characters, 10);
    setQuestions(quiz);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answerObj) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerObj);
    setShowResult(true);

    // Check if answer is correct based on question type
    let isCorrect;
    if (currentQuestion.questionType === 'char-to-sound') {
      isCorrect = answerObj.english === currentQuestion.correctAnswer;
    } else {
      isCorrect = answerObj.sourashtra === currentQuestion.correctAnswer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    // Store user's answer for review
    setUserAnswers(prev => [...prev, {
      question: currentQuestion,
      userAnswer: answerObj,
      isCorrect
    }]);

    // Record this attempt for progress tracking
    recordQuizAttempt(currentQuestion.characterId, isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      saveQuizScore();
    }
  };

  const saveQuizScore = () => {
    const percentage = Math.round(((score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)) / questions.length) * 100);

    // Save to localStorage
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    scores.push({
      score: percentage,
      date: new Date().toISOString(),
      total: questions.length
    });
    localStorage.setItem('quizScores', JSON.stringify(scores));

    // Update best score
    const bestScore = Math.max(...scores.map(s => s.score));
    localStorage.setItem('bestScore', bestScore.toString());

    // Record quiz completion for word quiz unlock
    recordQuizCompletion();
  };

  const handleTryAgain = () => {
    const quiz = generateQuiz(characters, 10);
    setQuestions(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
    setUserAnswers([]);
    setShowReview(false);
  };

  if (questions.length === 0) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (quizFinished) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="results-card">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <div className="score-percentage">{finalScore}%</div>
              <div className="score-fraction">{score}/{questions.length}</div>
            </div>
          </div>
          <div className="results-message">
            {finalScore >= 90 && <p>Excellent work! 🎉</p>}
            {finalScore >= 70 && finalScore < 90 && <p>Great job! 👍</p>}
            {finalScore >= 50 && finalScore < 70 && <p>Good effort! Keep practicing! 📚</p>}
            {finalScore < 50 && <p>Keep learning! Practice makes perfect! 💪</p>}
          </div>
          <div className="results-buttons">
            <button className="quiz-button secondary" onClick={onBack}>
              Back to Home
            </button>
            <button className="quiz-button secondary" onClick={() => setShowReview(!showReview)}>
              {showReview ? 'Hide Review' : 'Review Answers'}
            </button>
            <button className="quiz-button primary" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>

        {showReview && (
          <div className="review-section">
            <h3>Answer Review</h3>
            {userAnswers.map((item, index) => (
              <div key={index} className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="review-question-number">Question {index + 1}</div>
                <div className="review-content">
                  {item.question.questionType === 'char-to-sound' ? (
                    <>
                      <div className="review-question">
                        <span className="review-char">{item.question.question}</span>
                      </div>
                      <div className="review-answers">
                        <div className="review-answer-row">
                          <span className="review-label">Your answer:</span>
                          <span className={item.isCorrect ? 'answer-correct' : 'answer-wrong'}>
                            {item.userAnswer.english} / {item.userAnswer.tamil}
                          </span>
                        </div>
                        {!item.isCorrect && (
                          <div className="review-answer-row">
                            <span className="review-label">Correct answer:</span>
                            <span className="answer-correct">
                              {item.question.correctAnswer} / {item.question.correctTamil}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="review-question">
                        <span className="review-sound">{item.question.question} / {item.question.questionTamil}</span>
                      </div>
                      <div className="review-answers">
                        <div className="review-answer-row">
                          <span className="review-label">Your answer:</span>
                          <span className={item.isCorrect ? 'answer-correct' : 'answer-wrong'}>
                            {item.userAnswer.sourashtra}
                          </span>
                        </div>
                        {!item.isCorrect && (
                          <div className="review-answer-row">
                            <span className="review-label">Correct answer:</span>
                            <span className="answer-correct">
                              {item.question.correctAnswer}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="review-status">
                  {item.isCorrect ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>
        )}
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
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="quiz-score">Score: {score}</div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-card">
        {currentQuestion.questionType === 'char-to-sound' ? (
          <>
            <div className="question-text">
              What is this character?
            </div>
            <div className="question-character">
              {currentQuestion.question}
            </div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = 'option-button';

                if (showResult) {
                  if (option.english === currentQuestion.correctAnswer) {
                    buttonClass += ' correct';
                  } else if (selectedAnswer && option.english === selectedAnswer.english) {
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
                    <div>{option.english}</div>
                    <div style={{ fontSize: '1.25rem', color: '#666', marginTop: '4px' }}>{option.tamil}</div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <>
                <div className={`feedback ${selectedAnswer.english === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
                  {selectedAnswer.english === currentQuestion.correctAnswer ? (
                    <>✓ Correct!</>
                  ) : (
                    <>✗ Incorrect. The answer is: {currentQuestion.correctAnswer} / {currentQuestion.correctTamil}</>
                  )}
                </div>
                <button className="next-button-card" onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next →' : 'Finish'}
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <div className="question-text">
              Which character makes this sound?
            </div>
            <div className="question-character" style={{ fontSize: '3.5rem' }}>
              {currentQuestion.question}
              <div style={{ fontSize: '2.5rem', color: '#666', marginTop: '8px' }}>{currentQuestion.questionTamil}</div>
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
                    <div style={{ fontSize: '3rem' }}>{option.sourashtra}</div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <>
                <div className={`feedback ${selectedAnswer.sourashtra === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
                  {selectedAnswer.sourashtra === currentQuestion.correctAnswer ? (
                    <>✓ Correct!</>
                  ) : (
                    <>✗ Incorrect. The answer is: {currentQuestion.correctAnswer}</>
                  )}
                </div>
                <button className="next-button-card" onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next →' : 'Finish'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
