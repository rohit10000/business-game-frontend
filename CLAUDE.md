# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser (if supported)
```

**Dependencies:**
```bash
npm install        # Install all dependencies
```

## Architecture Overview

This is a React Native multiplayer business board game (similar to Monopoly) built with Expo. The app supports both single-player (vs computer) and real-time multiplayer modes via WebSocket connections.

### Core Architecture

**Navigation:** React Navigation v6 with stack navigator
- Entry: `LandingScreen` → `HomeScreen` → Game modes (`OnlineMultiplayerScreen`, `ComputerScreen`, `GameScreen`)

**State Management:** 
- Global game state managed via React Context API (`utils/GameContext.js`)
- Reducer pattern with `utils/gameReducer.js` for game state mutations
- Game entities defined in `utils/gameTypes.js` (Player, Board classes)
- AsyncStorage for game state persistence (currently disabled)

**Real-time Communication:**
- WebSocket service (`utils/WebSocketService.js`) using STOMP over SockJS
- Handles room creation, joining, leaving, and real-time game updates
- Message handlers in `handlers/onlineMultiplayerHandlers.js`

### Key Components Structure

```
components/
├── screens/                 # Main game screens
│   ├── LandingScreen.js    # App entry point
│   ├── HomeScreen.js       # Game mode selection
│   ├── OnlineMultiplayerScreen.js  # Multiplayer lobby
│   ├── ComputerScreen.js   # Single player setup
│   ├── GameScreen.js       # Active game board
│   └── WaitingScreen.js    # Room waiting area
├── game/
│   └── MonopolyBoard.js    # Game board component
└── utils/modals/           # Reusable modal components
```

### Server Configuration

Server endpoints configured in `config/server.js`:
- WebSocket: `BASE_URL:9000/ws` (STOMP protocol)
- REST API: `BASE_URL:8080/api/*`
- Room management, authentication endpoints

**Important:** Update `BASE_URL` in `config/server.js` to match your backend server IP.

### Game State Management

The game uses a centralized state management pattern:

**Game Context (`utils/GameContext.js`):**
- Provides `useGame()`, `useGameActions()`, `useGameSelectors()` hooks
- Manages players, board state, turn management, room info

**Game Reducer (`utils/gameReducer.js`):**
- Handles all game state mutations via action dispatching
- Actions: player management, board updates, turn progression, game status

**Game Types (`utils/gameTypes.js`):**
- Defines Player and Board classes with serialization methods
- Contains game constants and initial state creators

### Multiplayer Flow

1. User creates/joins room via WebSocket (`OnlineMultiplayerScreen`)
2. Players added to game state automatically when joining
3. Real-time updates synchronized via room-specific topics (`/topic/room.{code}`)
4. Game state managed locally with WebSocket synchronization
5. Authentication handled via JWT tokens (`utils/auth.js`)

### Authentication

- JWT-based authentication with access/refresh tokens
- Token storage via AsyncStorage
- Authentication service in `utils/auth.js`
- Required for multiplayer room operations

### Testing & Deployment

No specific test commands found in package.json. This is an Expo-managed React Native project, so use standard Expo development workflow.

## Common Development Patterns

When working with this codebase:

1. **Adding new screens:** Register in `App.js` Stack.Navigator and follow existing screen patterns
2. **Game state changes:** Always use `useGameActions()` hooks, never mutate state directly
3. **WebSocket integration:** Extend `WebSocketService.js` and add handlers in `onlineMultiplayerHandlers.js`
4. **Player management:** Use existing Player class methods for serialization/deserialization
5. **Styling:** Follow existing inline StyleSheet patterns used throughout components