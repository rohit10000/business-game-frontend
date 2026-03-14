import { 
  GAME_ACTIONS, 
  GAME_STATUS, 
  Player, 
  Board, 
  createBoard,
  createInitialGameState 
} from './gameTypes';

// Game Reducer
export const gameReducer = (state, action) => {
  switch (action.type) {
    // Player Actions
    case GAME_ACTIONS.ADD_PLAYER: {
      const { username, currentRoomId, color } = action.payload;
      const newPlayer = new Player(username, currentRoomId, color);
      
      // Check if player already exists
      const playerExists = state.players.some(p => p.username === username);
      if (playerExists) {
        console.warn('Player with this username already exists');
        return state;
      }

      return {
        ...state,
        players: [...state.players, newPlayer],
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.ADD_PLAYERS: {
      const { players } = action.payload;
      return {
        ...state,
        players: [...players],
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.REMOVE_PLAYER: {
      const { playerId } = action.payload;
      return {
        ...state,
        players: state.players.filter(player => player.id !== playerId),
        currentPlayerId: state.currentPlayerId === playerId ? null : state.currentPlayerId,
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.UPDATE_PLAYER: {
      const { playerId, updates } = action.payload;
      return {
        ...state,
        players: state.players.map(player => 
          player.id === playerId 
            ? { ...player, ...updates }
            : player
        ),
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.SET_PLAYERS: {
      const { players } = action.payload;
      return {
        ...state,
        players: players.map(p => p instanceof Player ? p : Player.fromObject(p)),
        lastAction: action.type
      };
    }

    // Board Actions
    case GAME_ACTIONS.INITIALIZE_BOARD: {
      const { size, type } = action.payload || {};
      return {
        ...state,
        board: createBoard(size || 8, type || 'standard'),
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.UPDATE_BOARD: {
      const { boardUpdates } = action.payload;
      
      return {
        ...state,
        board: { ...state.board, ...boardUpdates },
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.RESET_BOARD: {
      return {
        ...state,
        board: createBoard(state.board?.size || 8, state.board?.type || 'standard'),
        lastAction: action.type
      };
    }

    // Turn Actions
    case GAME_ACTIONS.NEXT_TURN: {
      const nextTurn = (state.turn + 1) % state.players.length;
      const nextPlayer = state.players[nextTurn];
      
      return {
        ...state,
        turn: nextTurn,
        currentPlayerId: nextPlayer ? nextPlayer.id : null,
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.SET_TURN: {
      const { turn, playerId } = action.payload;
      return {
        ...state,
        turn: turn !== undefined ? turn : state.turn,
        currentPlayerId: playerId !== undefined ? playerId : state.currentPlayerId,
        lastAction: action.type
      };
    }

    // Game Actions
    case GAME_ACTIONS.START_GAME: {
      const { roomId, gameSettings } = action.payload || {};
      
      // Set first player as current if players exist
      const firstPlayer = state.players[0];
      
      return {
        ...state,
        gameStatus: GAME_STATUS.IN_PROGRESS,
        turn: 0,
        currentPlayerId: firstPlayer ? firstPlayer.id : null,
        roomId: roomId || state.roomId,
        gameSettings: { ...state.gameSettings, ...gameSettings },
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.END_GAME: {
      return {
        ...state,
        gameStatus: GAME_STATUS.FINISHED,
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.SET_GAME_STATUS: {
      const { status } = action.payload;
      return {
        ...state,
        gameStatus: status,
        lastAction: action.type
      };
    }

    case GAME_ACTIONS.RESET_GAME: {
      return {
        ...createInitialGameState(),
        roomId: state.roomId, // Preserve room ID if it exists
        lastAction: action.type
      };
    }

    default:
      console.warn('Unknown action type:', action.type);
      return state;
  }
};

// Action Creators
export const gameActions = {
  // Player actions
  addPlayer: (username, currentRoomId = null, color = null) => ({
    type: GAME_ACTIONS.ADD_PLAYER,
    payload: { username, currentRoomId, color }
  }),

  addPlayers: (players) => ({
    type: GAME_ACTIONS.ADD_PLAYERS,
    payload: { players }
  }),

  removePlayer: (playerId) => ({
    type: GAME_ACTIONS.REMOVE_PLAYER,
    payload: { playerId }
  }),

  updatePlayer: (playerId, updates) => ({
    type: GAME_ACTIONS.UPDATE_PLAYER,
    payload: { playerId, updates }
  }),

  setPlayers: (players) => ({
    type: GAME_ACTIONS.SET_PLAYERS,
    payload: { players }
  }),

  // Board actions
  initializeBoard: (size = 8, type = 'standard') => ({
    type: GAME_ACTIONS.INITIALIZE_BOARD,
    payload: { size, type }
  }),

  updateBoard: (boardUpdates) => ({
    type: GAME_ACTIONS.UPDATE_BOARD,
    payload: { boardUpdates }
  }),

  resetBoard: () => ({
    type: GAME_ACTIONS.RESET_BOARD
  }),

  // Turn actions
  nextTurn: () => ({
    type: GAME_ACTIONS.NEXT_TURN
  }),

  setTurn: (turn, playerId = null) => ({
    type: GAME_ACTIONS.SET_TURN,
    payload: { turn, playerId }
  }),

  // Game actions
  startGame: (roomId = null, gameSettings = {}) => ({
    type: GAME_ACTIONS.START_GAME,
    payload: { roomId, gameSettings }
  }),

  endGame: () => ({
    type: GAME_ACTIONS.END_GAME
  }),

  setGameStatus: (status) => ({
    type: GAME_ACTIONS.SET_GAME_STATUS,
    payload: { status }
  }),

  resetGame: () => ({
    type: GAME_ACTIONS.RESET_GAME
  })
}; 