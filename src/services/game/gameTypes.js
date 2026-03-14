// Game State Types and Enums

// Player Colors
export const PLAYER_COLORS = {
  RED: '#FF0000',
  BLUE: '#00B0FF', 
  GREEN: '#00FF00',
  YELLOW: '#FFD700',
  PURPLE: '#9C27B0',
  ORANGE: '#FF9800'
};

// Game Actions
export const GAME_ACTIONS = {
  // Player actions
  ADD_PLAYER: 'ADD_PLAYER',
  ADD_PLAYERS: 'ADD_PLAYERS',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  SET_PLAYERS: 'SET_PLAYERS',
  
  // Board actions
  INITIALIZE_BOARD: 'INITIALIZE_BOARD',
  UPDATE_BOARD: 'UPDATE_BOARD',
  RESET_BOARD: 'RESET_BOARD',
  
  // Turn actions
  NEXT_TURN: 'NEXT_TURN',
  SET_TURN: 'SET_TURN',
  
  // Game actions
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_GAME_STATUS: 'SET_GAME_STATUS'
};

// Game Status
export const GAME_STATUS = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
  PAUSED: 'PAUSED'
};

// Player Class
export class Player {
  constructor(username, currentRoomId = null, color = null) {
    this.id = Math.random().toString(36).substr(2, 9); // Generate unique ID
    this.username = username;
    this.currentRoomId = currentRoomId;
    this.color = color;
    this.isActive = true;
    this.score = 0;
    this.joinedAt = new Date().toISOString();
  }

  // Update player properties
  updatePlayer(updates) {
    const updatedPlayer = new Player(
      updates.username || this.username,
      updates.currentRoomId !== undefined ? updates.currentRoomId : this.currentRoomId,
      updates.color || this.color
    );
    updatedPlayer.id = this.id;
    updatedPlayer.isActive = updates.isActive !== undefined ? updates.isActive : this.isActive;
    updatedPlayer.score = updates.score !== undefined ? updates.score : this.score;
    updatedPlayer.joinedAt = this.joinedAt;
    return updatedPlayer;
  }

  // Convert to plain object for serialization
  toObject() {
    return {
      id: this.id,
      username: this.username,
      currentRoomId: this.currentRoomId,
      color: this.color,
      isActive: this.isActive,
      score: this.score,
      joinedAt: this.joinedAt
    };
  }

  // Create Player from object
  static fromObject(obj) {
    const player = new Player(obj.username, obj.currentRoomId, obj.color);
    player.id = obj.id;
    player.isActive = obj.isActive;
    player.score = obj.score;
    player.joinedAt = obj.joinedAt;
    return player;
  }
}

// Board utility functions
export const createBoard = (size = 8, type = 'standard') => {
  const cells = [];
  for (let row = 0; row < size; row++) {
    cells[row] = [];
    for (let col = 0; col < size; col++) {
      cells[row][col] = {
        row,
        col,
        piece: null,
        isHighlighted: false,
        isValidMove: false
      };
    }
  }
  
  return {
    size,
    type,
    cells,
    lastMove: null,
    moveHistory: []
  };
};

// Board Class (simplified)
export class Board {
  constructor(size = 8, type = 'standard') {
    const boardData = createBoard(size, type);
    Object.assign(this, boardData);
  }

  // Update a specific cell
  updateCell(row, col, updates) {
    const newCells = [...this.cells];
    newCells[row][col] = { ...newCells[row][col], ...updates };
    this.cells = newCells;
    return this;
  }

  // Reset board to initial state
  reset() {
    const boardData = createBoard(this.size, this.type);
    Object.assign(this, boardData);
    return this;
  }

  // Convert to plain object
  toObject() {
    return {
      size: this.size,
      type: this.type,
      cells: this.cells,
      lastMove: this.lastMove,
      moveHistory: this.moveHistory
    };
  }

  // Create Board from object
  static fromObject(obj) {
    const board = new Board(obj.size, obj.type);
    board.cells = obj.cells || [];
    board.lastMove = obj.lastMove;
    board.moveHistory = obj.moveHistory || [];
    return board;
  }
}

// Initial Game State
export const createInitialGameState = () => ({
  players: [],
  board: {
    size: 8,
    type: 'standard',
    cells: [],
    lastMove: null,
    moveHistory: []
  },
  turn: 0,
  currentPlayerId: null,
  gameStatus: GAME_STATUS.WAITING,
  roomId: null,
  gameSettings: {
    maxPlayers: 4,
    timeLimit: null,
    startingAmount: 1500
  },
  lastAction: null,
  createdAt: new Date().toISOString()
}); 