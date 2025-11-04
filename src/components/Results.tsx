import React from 'react';
import './Results.css';

interface ResultsProps {
  cpm: number;
  wpm: number;
  accuracy: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ cpm, wpm, accuracy, onRestart }) => {
  return (
    <div className="results-container">
      <h1 className="results-title">Level Complete!</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{wpm}</div>
          <div className="stat-label">Words Per Minute</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{cpm}</div>
          <div className="stat-label">Characters Per Minute</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>

      <button className="restart-button" onClick={onRestart}>
        Start New Level
      </button>
    </div>
  );
};

export default Results;
