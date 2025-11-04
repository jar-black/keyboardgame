import React, { useEffect, useRef } from 'react';
import './TypingArea.css';

interface TypingAreaProps {
  text: string;
  typedText: string;
  currentIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, typedText, currentIndex }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const currentChar = scrollRef.current.querySelector('.current-char');
      if (currentChar) {
        currentChar.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  }, [currentIndex]);

  const getCharClass = (index: number): string => {
    if (index < currentIndex) {
      // Already typed
      if (typedText[index] === text[index]) {
        return 'char correct';
      } else {
        return 'char incorrect';
      }
    } else if (index === currentIndex) {
      return 'char current-char';
    } else {
      return 'char';
    }
  };

  return (
    <div className="typing-area" ref={scrollRef}>
      <div className="text-display">
        {text.split('').map((char, index) => (
          <span key={index} className={getCharClass(index)}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingArea;
