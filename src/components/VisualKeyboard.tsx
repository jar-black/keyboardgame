import React from 'react';
import './VisualKeyboard.css';

interface VisualKeyboardProps {
  pressedKey: string;
}

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

const VisualKeyboard: React.FC<VisualKeyboardProps> = ({ pressedKey }) => {
  const normalizeKey = (key: string): string => {
    return key.toUpperCase();
  };

  const isKeyPressed = (key: string): boolean => {
    const normalized = normalizeKey(key);
    const pressedNormalized = normalizeKey(pressedKey);

    if (key === 'Space' && pressedKey === ' ') return true;
    if (key === 'Shift' && (pressedKey === 'Shift' || pressedKey === 'ShiftLeft' || pressedKey === 'ShiftRight')) return true;

    return normalized === pressedNormalized;
  };

  const getKeyClass = (key: string): string => {
    let classes = 'key';

    if (key === 'Space') classes += ' space';
    else if (key === 'Backspace' || key === 'Tab' || key === 'CapsLock' || key === 'Enter' || key === 'Shift' || key === 'Ctrl' || key === 'Alt') {
      classes += ' special';
    }

    if (isKeyPressed(key)) {
      classes += ' pressed';
    }

    return classes;
  };

  return (
    <div className="visual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <div key={keyIndex} className={getKeyClass(key)}>
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VisualKeyboard;
