# AGENTS.md - AI Agent Guide

This document provides essential information for AI agents (like Claude Code) to quickly understand and work with this repository.

## Project Overview

**Keyboard Master** - A web-based typing speed game built with React and TypeScript. Users practice typing skills across 5 difficulty levels with real-time feedback, visual keyboard highlighting, and performance metrics (WPM, CPM, accuracy).

### Core Functionality
- 60-second typing challenges
- 5 difficulty levels (lowercase → all keyboard characters)
- Real-time visual keyboard feedback
- Performance tracking (WPM, CPM, accuracy)
- Dockerized for easy deployment

## Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite (rolldown-vite 7.1.14)
- **Styling**: CSS (component-scoped)
- **Deployment**: Docker + Nginx
- **Development**: ESLint for linting

## Project Structure

```
keyboardgame/
├── src/
│   ├── App.tsx                    # Main application component & game logic
│   ├── main.tsx                   # React entry point
│   ├── components/                # React components
│   │   ├── VisualKeyboard.tsx     # Keyboard visualization with key highlighting
│   │   ├── TypingArea.tsx         # Text display with correct/incorrect highlighting
│   │   ├── Results.tsx            # End-game statistics display
│   │   └── LevelSelector.tsx      # Difficulty level selector (1-5)
│   └── utils/
│       └── textGenerator.ts       # Text generation for all difficulty levels
├── public/                        # Static assets
├── Dockerfile                     # Container image definition
├── docker-compose.yml             # Container orchestration
├── nginx.conf                     # Nginx server configuration
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite build configuration
```

## Key Files & Components

### Core Application Logic
- **src/App.tsx** (206 lines)
  - Main game state management
  - Timer logic (60-second countdown)
  - Keyboard event handling
  - Statistics calculation (WPM, CPM, accuracy)
  - Game states: `ready`, `playing`, `finished`

### Text Generation System
- **src/utils/textGenerator.ts** (95 lines)
  - 5 difficulty levels:
    1. Lowercase letters with spaces
    2. Mixed case letters with spaces
    3. Letters, spaces, and punctuation
    4. All shift special characters
    5. All visible keyboard characters
  - Levels 1-3: Sentence-based generation
  - Levels 4-5: Random character generation

### Components
- **VisualKeyboard.tsx**: Displays QWERTY keyboard with real-time key press highlighting
- **TypingArea.tsx**: Shows target text with color-coded feedback (correct/incorrect)
- **Results.tsx**: End-game statistics screen
- **LevelSelector.tsx**: Difficulty selection UI (right sidebar)

## State Management

Uses React hooks (no external state library):
- `useState` for all state management
- `useEffect` for side effects (timer, keyboard events)
- `useCallback` for memoized functions

### Key State Variables (App.tsx)
- `gameState`: 'ready' | 'playing' | 'finished'
- `text`: Target text to type
- `typedText`: User's typed input
- `currentIndex`: Current character position
- `timeLeft`: Countdown timer (seconds)
- `difficultyLevel`: 1-5
- `correctChars`, `incorrectChars`: Performance tracking

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:50627
```

## Architecture Patterns

1. **Component-Based**: Each UI element is a separate React component with scoped CSS
2. **Event-Driven**: Keyboard events trigger game state updates
3. **Stateful Parent**: App.tsx manages all state and passes props down
4. **Pure Functions**: Text generation and calculations are side-effect-free
5. **Type Safety**: Full TypeScript coverage with explicit types

## Key Design Decisions

- **Single Page Application**: No routing, single App component
- **60-Second Timer**: Fixed game duration for consistency
- **Real-Time Feedback**: Immediate visual feedback on key presses
- **Character-Level Accuracy**: Each character press tracked separately
- **No Backspace Penalty**: Backspace allowed without accuracy penalty
- **Progressive Difficulty**: 5 levels from beginner to expert

## Common Modifications

### Adding New Difficulty Levels
1. Update `DifficultyLevel` type in `textGenerator.ts`
2. Add character set or sentence pool
3. Update `levelDescriptions` object
4. Modify generation logic

### Changing Game Duration
- Modify `GAME_DURATION` constant in `App.tsx` (line 13)

### Adjusting Text Length
- Change length parameter in `generateRandomText()` calls (default: 150)

## Testing & Linting

- ESLint configured for React + TypeScript
- No test framework currently configured
- Run `npm run lint` before committing

## Environment Notes

- Port: 50627 (configurable in docker-compose.yml)
- No backend/API - fully client-side
- No persistence - statistics not saved
- No authentication - open access

## Dependencies Overview

**Production:**
- `react` + `react-dom`: UI framework

**Development:**
- `@vitejs/plugin-react`: React support for Vite
- `typescript` + `typescript-eslint`: Type safety
- `eslint`: Code quality

## Quick Start for AI Agents

1. **To understand the game flow**: Read `src/App.tsx` (main logic)
2. **To modify text generation**: Edit `src/utils/textGenerator.ts`
3. **To change UI components**: Check `src/components/` directory
4. **To adjust build config**: See `vite.config.ts`
5. **To modify deployment**: Edit `Dockerfile` or `docker-compose.yml`

## Git Workflow

- Main branch: Default branch for stable code
- Feature branches: `claude/*` prefix for AI agent work
- Current branch: `claude/create-c-file-011CUzB65GTM6oMmbdefdYFg`

---

**Last Updated**: 2025-11-10
**Project Status**: Active development
**License**: See LICENSE file
