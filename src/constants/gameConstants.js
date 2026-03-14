export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FECA57', // Yellow
  '#FF9FF3', // Pink
  '#54A0FF', // Light Blue
  '#5F27CD'  // Purple
];

export const GAME_STATES = {
  WAITING: 'waiting',
  IN_PROGRESS: 'inProgress',
  PAUSED: 'paused',
  FINISHED: 'finished'
};

export const PLAYER_STATES = {
  ACTIVE: 'active',
  BANKRUPT: 'bankrupt',
  DISCONNECTED: 'disconnected'
};

export const GAME_ACTIONS = {
  ROLL_DICE: 'ROLL_DICE',
  BUY_PROPERTY: 'BUY_PROPERTY',
  PAY_RENT: 'PAY_RENT',
  BUILD_HOUSE: 'BUILD_HOUSE',
  MORTGAGE_PROPERTY: 'MORTGAGE_PROPERTY',
  TRADE: 'TRADE',
  END_TURN: 'END_TURN'
};

export const WEBSOCKET_EVENTS = {
  PLAYER_JOINED: 'PLAYER_JOINED',
  PLAYER_LEFT: 'PLAYER_LEFT',
  GAME_STATE_UPDATE: 'GAME_STATE_UPDATE',
  TURN_CHANGED: 'TURN_CHANGED',
  ROOM_CREATED: 'ROOM_CREATED',
  ROOM_JOINED: 'ROOM_JOINED',
  ERROR: 'ERROR'
};

export const MODAL_TYPES = {
  LOGIN: 'login',
  JOIN_ROOM: 'joinRoom',
  ERROR: 'error',
  PLAYER_SELECTION: 'playerSelection',
  COLOR_SELECTION: 'colorSelection',
  AMOUNT_SELECTION: 'amountSelection'
};

export const BOARD_PROPERTIES = [
  { id: 1, name: 'Go', type: 'special' },
  { id: 2, name: 'Mediterranean Avenue', type: 'property', price: 60, color: 'brown' },
  { id: 3, name: 'Community Chest', type: 'special' },
  { id: 4, name: 'Baltic Avenue', type: 'property', price: 60, color: 'brown' },
  { id: 5, name: 'Income Tax', type: 'tax', amount: 200 },
  { id: 6, name: 'Reading Railroad', type: 'railroad', price: 200 },
  { id: 7, name: 'Oriental Avenue', type: 'property', price: 100, color: 'lightblue' },
  { id: 8, name: 'Chance', type: 'special' },
  { id: 9, name: 'Vermont Avenue', type: 'property', price: 100, color: 'lightblue' },
  { id: 10, name: 'Connecticut Avenue', type: 'property', price: 120, color: 'lightblue' }
];

export const INITIAL_GAME_STATE = {
  players: [],
  currentPlayerIndex: 0,
  gameState: GAME_STATES.WAITING,
  board: BOARD_PROPERTIES,
  roomCode: null,
  turnCount: 0
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  AUTH_FAILED: 'Authentication failed. Please login again.',
  ROOM_NOT_FOUND: 'Room not found. Please check the room code.',
  ROOM_FULL: 'Room is full. Cannot join.',
  INVALID_MOVE: 'Invalid move. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.'
};