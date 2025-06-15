# Game State Management with useReducer

This document explains how to use the game state management system that replaces `useState` with `useReducer` for better state management.

## Overview

The game state management system consists of:

1. **Player Class** - Represents a player with username, room ID, and color
2. **Board Class** - Represents the game board with cells and moves
3. **Game State** - Overall game state including players, board, turn, and status
4. **Game Reducer** - Handles all state mutations
5. **Game Context** - Provides state throughout the app
6. **Custom Hooks** - Easy-to-use hooks for common operations

## Core Components

### 1. Player Class (`utils/gameTypes.js`)

```javascript
import { Player, PLAYER_COLORS } from '../utils/gameTypes';

// Create a new player
const player = new Player('Alice', 'room123', PLAYER_COLORS.RED);

// Player properties
player.id          // Unique ID
player.username    // Player name
player.currentRoomId // Room ID
player.color       // Player color
player.isActive    // Active status
player.score       // Player score
```

### 2. Board Class (`utils/gameTypes.js`)

```javascript
import { Board } from '../utils/gameTypes';

// Create a new board
const board = new Board(8, 'standard');

// Board properties
board.size         // Board size (8x8)
board.type         // Board type
board.cells        // 2D array of cells
board.lastMove     // Last move made
board.moveHistory  // History of moves
```

### 3. Game Context (`utils/GameContext.js`)

Wrap your app with `GameProvider`:

```javascript
import { GameProvider } from '../utils/GameContext';

export default function App() {
  return (
    <GameProvider>
      <YourAppContent />
    </GameProvider>
  );
}
```

## Using the Game State

### 1. Basic Usage

```javascript
import { useGame, useGameActions, useGameSelectors } from '../utils/GameContext';

const MyComponent = () => {
  // Access game state
  const { players, board, turn, currentPlayer, gameStatus } = useGame();
  
  // Access actions
  const gameActions = useGameActions();
  
  // Access selector functions
  const selectors = useGameSelectors();
  
  return (
    <View>
      <Text>Current Turn: {turn + 1}</Text>
      <Text>Players: {players.length}</Text>
      <Text>Game Status: {gameStatus}</Text>
    </View>
  );
};
```

### 2. Player Actions

```javascript
const gameActions = useGameActions();

// Add a player
gameActions.addPlayer('Alice', 'room123', '#FF0000');

// Remove a player
gameActions.removePlayer(playerId);

// Update a player
gameActions.updatePlayer(playerId, { score: 100 });

// Set all players at once
gameActions.setPlayers([player1, player2, player3]);
```

### 3. Board Actions

```javascript
const gameActions = useGameActions();

// Initialize board
gameActions.initializeBoard(8, 'standard');

// Update board
gameActions.updateBoard({ lastMove: { row: 3, col: 4 } });

// Reset board
gameActions.resetBoard();
```

### 4. Turn Management

```javascript
const gameActions = useGameActions();

// Move to next turn
gameActions.nextTurn();

// Set specific turn
gameActions.setTurn(2, playerId);
```

### 5. Game Control

```javascript
const gameActions = useGameActions();

// Start game
gameActions.startGame('room123', { maxPlayers: 4, timeLimit: 30 });

// End game
gameActions.endGame();

// Reset game
gameActions.resetGame();

// Set game status
gameActions.setGameStatus('IN_PROGRESS');
```

### 6. Selectors

```javascript
const selectors = useGameSelectors();

// Player selectors
const player = selectors.getPlayerById(playerId);
const player = selectors.getPlayerByUsername('Alice');
const activePlayers = selectors.getActivePlayers();
const playerCount = selectors.getPlayerCount();

// Board selectors
const boardSize = selectors.getBoardSize();
const cell = selectors.getBoardCell(row, col);

// Turn selectors
const currentPlayer = selectors.getCurrentPlayer();
const nextPlayer = selectors.getNextPlayer();

// Game selectors
const isActive = selectors.isGameActive();
const isWaiting = selectors.isGameWaiting();
const isFinished = selectors.isGameFinished();
const canStart = selectors.canStartGame();
```

## Game States

The game can be in one of these states:

- `WAITING` - Waiting for players to join
- `IN_PROGRESS` - Game is active
- `FINISHED` - Game has ended
- `PAUSED` - Game is paused

## Player Colors

Pre-defined colors are available:

```javascript
import { PLAYER_COLORS } from '../utils/gameTypes';

PLAYER_COLORS.RED      // '#FF0000'
PLAYER_COLORS.BLUE     // '#00B0FF'
PLAYER_COLORS.GREEN    // '#00FF00'
PLAYER_COLORS.YELLOW   // '#FFD700'
PLAYER_COLORS.PURPLE   // '#9C27B0'
PLAYER_COLORS.ORANGE   // '#FF9800'
```

## Persistence

Game state is automatically saved to AsyncStorage and restored when the app loads.

## Example: Complete Game Flow

```javascript
const MyGameComponent = () => {
  const gameActions = useGameActions();
  const selectors = useGameSelectors();
  
  const startNewGame = () => {
    // Reset game
    gameActions.resetGame();
    
    // Add players
    gameActions.addPlayer('Alice', 'room123', PLAYER_COLORS.RED);
    gameActions.addPlayer('Bob', 'room123', PLAYER_COLORS.BLUE);
    
    // Initialize board
    gameActions.initializeBoard(8, 'standard');
    
    // Start game
    gameActions.startGame('room123');
  };
  
  const makeMove = () => {
    // Game logic here...
    
    // Move to next turn
    gameActions.nextTurn();
  };
  
  return (
    <View>
      <Button title="Start New Game" onPress={startNewGame} />
      <Button 
        title="Make Move" 
        onPress={makeMove}
        disabled={!selectors.isGameActive()}
      />
    </View>
  );
};
```

## Benefits of Using useReducer

1. **Predictable State Updates** - All state changes go through the reducer
2. **Complex State Logic** - Better for managing complex state relationships
3. **Debugging** - Easier to debug with action types and payloads
4. **Performance** - Avoids unnecessary re-renders
5. **Testability** - Pure functions are easier to test
6. **Time Travel Debugging** - Can implement undo/redo functionality

## Migration from useState

Instead of:
```javascript
const [players, setPlayers] = useState([]);
const [board, setBoard] = useState(null);
const [turn, setTurn] = useState(0);
```

Use:
```javascript
const { players, board, turn } = useGame();
const gameActions = useGameActions();
```

This provides better organization and makes the state management more predictable and maintainable. 