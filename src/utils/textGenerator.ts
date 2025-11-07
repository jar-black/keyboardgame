export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

// Character sets for each difficulty level
const characterSets: Record<DifficultyLevel, string> = {
  1: 'abcdefghijklmnopqrstuvwxyz', // Lowercase only
  2: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // Lower and uppercase
  3: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?.,*;:', // + basic punctuation
  4: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}\\|;:\'",.<>?/', // + all shift special signs
  5: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}\\|;:\'",.<>?/`~ ', // All visible characters
};

export const levelDescriptions: Record<DifficultyLevel, string> = {
  1: 'Lowercase letters only',
  2: 'Lowercase and uppercase letters',
  3: 'Letters + Basic punctuation (!?.,*;:)',
  4: 'Letters + All shift special characters',
  5: 'All visible keyboard characters',
};

export const generateRandomText = (length: number = 150, level: DifficultyLevel = 1): string => {
  const chars = characterSets[level];
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
};
