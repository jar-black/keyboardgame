export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

// Sentence pools for levels 1-3
const sentencePools = {
  1: [
    'the quick brown fox jumps over the lazy dog',
    'a journey of a thousand miles begins with a single step',
    'practice makes perfect when you work hard every day',
    'the sun rises in the east and sets in the west',
    'learning to type fast takes time and dedication',
    'every great achievement starts with small steps',
    'the best time to start is right now today',
    'success comes to those who never give up trying',
    'hard work and patience lead to great results',
    'believe in yourself and your dreams will come true',
  ],
  2: [
    'The Quick Brown Fox Jumps Over The Lazy Dog Again',
    'Practice Makes Perfect When You Work Hard Every Day',
    'Success Comes To Those Who Never Give Up Trying Hard',
    'Learning New Skills Takes Time Patience And Dedication',
    'The Journey Of Life Is Full Of Amazing Adventures',
    'Every Great Achievement Starts With A Single Small Step',
    'Believe In Yourself And Dreams Will Become Reality Soon',
    'Hard Work Today Brings Success Tomorrow Without Doubt',
    'The Best Time To Start Something New Is Right Now',
    'Keep Pushing Forward And Never Look Back At Failures',
  ],
  3: [
    'Practice makes perfect, so keep trying every day!',
    'Success comes to those who work hard, stay focused.',
    'The quick brown fox jumps over the lazy dog; amazing!',
    'Life is full of surprises: embrace them all, always.',
    'Learning new skills takes time, patience, and effort.',
    'Every journey begins with one step; start now, today!',
    'Believe in yourself! Your dreams are worth fighting for.',
    'Hard work pays off: never give up on your goals.',
    'The best time to start is right now, not tomorrow.',
    'Keep moving forward; success is just around the corner!',
  ],
};

// Character sets for levels 4-5 (random characters)
const characterSets: Record<4 | 5, string> = {
  4: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}\\|;:\'",.<>?/', // + all shift special signs
  5: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}\\|;:\'",.<>?/`~ ', // All visible characters
};

export const levelDescriptions: Record<DifficultyLevel, string> = {
  1: 'Lowercase letters with spaces',
  2: 'Mixed case letters with spaces',
  3: 'Letters, spaces, and punctuation',
  4: 'All shift special characters',
  5: 'All visible keyboard characters',
};

// Generate text from sentences for levels 1-3
const generateSentenceText = (length: number, level: 1 | 2 | 3): string => {
  const sentences = sentencePools[level];
  let result = '';

  while (result.length < length) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[randomIndex];

    if (result.length > 0) {
      result += ' ';
    }
    result += sentence;
  }

  return result.substring(0, length);
};

// Generate random text for levels 4-5
const generateRandomCharacters = (length: number, level: 4 | 5): string => {
  const chars = characterSets[level];
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
};

export const generateRandomText = (length: number = 150, level: DifficultyLevel = 1): string => {
  if (level <= 3) {
    return generateSentenceText(length, level as 1 | 2 | 3);
  } else {
    return generateRandomCharacters(length, level as 4 | 5);
  }
};
