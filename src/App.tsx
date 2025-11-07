import { useState, useEffect, useCallback } from 'react';
import './App.css';
import VisualKeyboard from './components/VisualKeyboard';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import LevelSelector from './components/LevelSelector';
import { generateRandomText } from './utils/textGenerator';
import type { DifficultyLevel } from './utils/textGenerator';

type GameState = 'ready' | 'playing' | 'finished';

function App() {
  const GAME_DURATION = 60; // 60 seconds = 1 minute

  const [gameState, setGameState] = useState<GameState>('ready');
  const [text, setText] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pressedKey, setPressedKey] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(1);

  // Stats
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [incorrectChars, setIncorrectChars] = useState<number>(0);

  // Initialize game
  const initializeGame = useCallback(() => {
    const newText = generateRandomText(150, difficultyLevel);
    setText(newText);
    setTypedText('');
    setCurrentIndex(0);
    setTimeLeft(GAME_DURATION);
    setCorrectChars(0);
    setIncorrectChars(0);
    setGameState('ready');
  }, [difficultyLevel]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default for space and other keys
      if (event.key === ' ' || event.key === 'Backspace') {
        event.preventDefault();
      }

      if (gameState === 'ready') {
        setGameState('playing');
      }

      if (gameState !== 'playing') return;

      setPressedKey(event.key);

      if (event.key === 'Backspace') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
          setTypedText((prev) => prev.slice(0, -1));
        }
        return;
      }

      // Only process printable characters
      if (event.key.length === 1) {
        const expectedChar = text[currentIndex];
        const isCorrect = event.key === expectedChar;

        if (isCorrect) {
          setCorrectChars((prev) => prev + 1);
        } else {
          setIncorrectChars((prev) => prev + 1);
        }

        setTypedText((prev) => prev + event.key);
        setCurrentIndex((prev) => prev + 1);

        // Check if we've reached the end of the text
        if (currentIndex >= text.length - 1) {
          setGameState('finished');
        }
      }
    };

    const handleKeyUp = () => {
      setPressedKey('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, currentIndex, text]);

  // Calculate statistics
  const calculateStats = () => {
    const totalChars = correctChars + incorrectChars;
    const timeElapsed = (GAME_DURATION - timeLeft) || GAME_DURATION;
    const minutes = timeElapsed / 60;

    const cpm = Math.round(correctChars / minutes);
    const wpm = Math.round(cpm / 5); // Standard: 5 characters per word
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    return { cpm, wpm, accuracy };
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Keyboard Master</h1>
        <p className="app-subtitle">Improve your typing speed and accuracy</p>
      </header>

      {gameState === 'finished' ? (
        <Results
          {...calculateStats()}
          onRestart={initializeGame}
        />
      ) : (
        <div className="game-container">
          <LevelSelector
            currentLevel={difficultyLevel}
            onLevelChange={(level) => {
              setDifficultyLevel(level);
              if (gameState === 'ready') {
                const newText = generateRandomText(150, level);
                setText(newText);
              }
            }}
            disabled={gameState === 'playing'}
          />

          <div className="game-info">
            <div className="info-item">
              <span className="info-label">Time Left:</span>
              <span className={`info-value ${timeLeft <= 10 ? 'warning' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Progress:</span>
              <span className="info-value">
                {currentIndex} / {text.length}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Accuracy:</span>
              <span className="info-value">
                {calculateStats().accuracy}%
              </span>
            </div>
          </div>

          {gameState === 'ready' && (
            <div className="start-message">
              Start typing to begin the 1-minute challenge!
            </div>
          )}

          <TypingArea
            text={text}
            typedText={typedText}
            currentIndex={currentIndex}
          />

          <VisualKeyboard pressedKey={pressedKey} />
        </div>
      )}
    </div>
  );
}

export default App;
