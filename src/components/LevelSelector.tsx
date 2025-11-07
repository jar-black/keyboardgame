import type { DifficultyLevel } from '../utils/textGenerator';
import { levelDescriptions } from '../utils/textGenerator';
import './LevelSelector.css';

interface LevelSelectorProps {
  currentLevel: DifficultyLevel;
  onLevelChange: (level: DifficultyLevel) => void;
  disabled?: boolean;
}

function LevelSelector({ currentLevel, onLevelChange, disabled = false }: LevelSelectorProps) {
  const levels: DifficultyLevel[] = [1, 2, 3, 4, 5];

  return (
    <div className="level-selector">
      <h3 className="level-selector-title">Difficulty Level</h3>
      <div className="level-buttons">
        {levels.map((level) => (
          <button
            key={level}
            className={`level-button ${currentLevel === level ? 'active' : ''}`}
            onClick={() => onLevelChange(level)}
            disabled={disabled}
            title={levelDescriptions[level]}
          >
            <span className="level-number">Level {level}</span>
            <span className="level-description">{levelDescriptions[level]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LevelSelector;
