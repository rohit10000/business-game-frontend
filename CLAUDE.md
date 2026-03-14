# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start              # Start Expo development server
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator
npm run web            # Run in web browser
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint errors
npm run format         # Format with Prettier
npm run format:check   # Check Prettier formatting
npm test               # Run Jest tests
npm run test:watch     # Jest in watch mode
npm run test:coverage  # Jest with coverage
npm run clean          # Clear Expo cache (expo r -c)
```

## Architecture Overview

React Native multiplayer business board game (Monopoly-style) built with Expo. Supports single-player (vs computer) and real-time online multiplayer via WebSocket/STOMP.

**Important:** `BASE_URL` in `src/config/server.js` must match your backend IP. WebSocket runs on port 9000, REST API on port 8080.

### Source Layout

All application code lives in `src/`:

```
src/
├── screens/            # LandingScreen, HomeScreen, OnlineMultiplayerScreen,
│                       # ComputerScreen, GameScreen, WaitingScreen
├── components/
│   ├── game/           # MonopolyBoard
│   ├── ui/             # ErrorBoundary, BlurOverlay, LoadingSpinner
│   └── modals/         # LoginModal, JoinRoomModal, ErrorModal,
│                       # AmountSelectionModal, ColorSelectionModal, PlayerSelectionModal
├── services/
│   ├── game/           # GameContext.js, GameContextOptimized.js, gameReducer.js, gameTypes.js
│   ├── websocket/      # WebSocketService.js (STOMP over SockJS)
│   ├── auth/           # auth.js (JWT access/refresh tokens via AsyncStorage)
│   ├── logging/        # logger.js
│   └── monitoring/     # analytics.js, performance.js
├── hooks/              # useAuth.js, useWebSocket.js, useModal.js
├── handlers/           # onlineMultiplayerHandlers.js
├── utils/              # validation.js, helpers.js, styles.js
├── constants/          # gameConstants.js, theme.js (design tokens)
└── config/             # environment.js (Config object), server.js (endpoints)
```

### Navigation

`App.js` → `NavigationContainer` → Stack: `Landing` → `Home` → `OnlineMultiplayer` / `Computer` / `Game`

`WaitingScreen` is not yet registered in the navigator stack in `App.js`.

### State Management

Two context implementations exist — use `GameContextOptimized.js` for new work:

- **`GameContext.js`** — original single context (used by current `App.js`)
- **`GameContextOptimized.js`** — split into three contexts for performance (used by `AppRefactored.js`):
  - `useGameState()` — read-only game state
  - `useGameActions()` — dispatch actions (never mutate state directly)
  - `useGameSelectors()` — memoized derived values

`gameReducer.js` handles all mutations. `gameTypes.js` defines `Player` and `Board` classes with serialization.

### WebSocket / Multiplayer

`WebSocketService.js` wraps `@stomp/stompjs` + `sockjs-client`. Room updates arrive on `/topic/room.{code}`. Message handling lives in `handlers/onlineMultiplayerHandlers.js`. Custom hook `useWebSocket()` exposes connection management with auto-reconnect.

### Design System

`src/constants/theme.js` is the single source of truth for colors, typography, spacing, and shadows. `src/utils/styles.js` provides `createStyles()`, `commonStyles`, and `responsive` helpers. Import from there rather than hardcoding values.

### Logging & Monitoring

Use structured logging throughout: `logger.debug/info/warn/error(message, context)`. Analytics and performance monitoring hooks (`analytics.trackScreenView`, `performanceMonitor.startTiming`) are wired up in `AppRefactored.js` on mount.

## Code Style

Only add comments for complex or non-obvious logic. Self-evident code should have no comments.
