import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gameReducer, gameActions } from './gameReducer';
import { createInitialGameState, Player, Board } from './gameTypes';
import { logger } from '../logging/logger';
import Config from '../../config/environment';

// Separate contexts for better performance
const GameStateContext = createContext();
const GameActionsContext = createContext();
const GameSelectorsContext = createContext();

// Storage key for persisting game state
const GAME_STATE_STORAGE_KEY = 'gameState_v2';

// Game Provider Component
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialGameState());

  // Auto-save game state (if enabled in config)
  useEffect(() => {
    if (Config.APP.AUTO_SAVE_INTERVAL && gameState.gameStatus === 'IN_PROGRESS') {
      const interval = setInterval(() => {
        saveGameState(gameState);
      }, Config.APP.AUTO_SAVE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [gameState.gameStatus]);

  // Load persisted game state on app start
  useEffect(() => {
    if (Config.FEATURE_FLAGS.ENABLE_OFFLINE_MODE) {
      loadGameState();
    }
  }, []);

  // Memoized actions to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    // Player actions
    addPlayer: useCallback((username, roomId, color) => {
      logger.debug('Adding player', { username, roomId, color });
      dispatch(gameActions.addPlayer(username, roomId, color));
    }, []),

    addPlayers: useCallback((players) => {
      logger.debug('Adding multiple players', { count: players.length });
      dispatch(gameActions.addPlayers(players));
    }, []),

    removePlayer: useCallback((playerId) => {
      logger.debug('Removing player', { playerId });
      dispatch(gameActions.removePlayer(playerId));
    }, []),

    updatePlayer: useCallback((playerId, updates) => {
      logger.debug('Updating player', { playerId, updates });
      dispatch(gameActions.updatePlayer(playerId, updates));
    }, []),

    setPlayers: useCallback((players) => {
      logger.debug('Setting players', { count: players.length });
      dispatch(gameActions.setPlayers(players));
    }, []),

    // Board actions
    initializeBoard: useCallback((size, type) => {
      logger.debug('Initializing board', { size, type });
      dispatch(gameActions.initializeBoard(size, type));
    }, []),

    updateBoard: useCallback((boardUpdates) => {
      logger.debug('Updating board', { updates: boardUpdates });
      dispatch(gameActions.updateBoard(boardUpdates));
    }, []),

    resetBoard: useCallback(() => {
      logger.debug('Resetting board');
      dispatch(gameActions.resetBoard());
    }, []),

    // Turn actions
    nextTurn: useCallback(() => {
      logger.debug('Next turn');
      dispatch(gameActions.nextTurn());
    }, []),

    setTurn: useCallback((turn, playerId) => {
      logger.debug('Setting turn', { turn, playerId });
      dispatch(gameActions.setTurn(turn, playerId));
    }, []),

    // Game actions
    startGame: useCallback((roomId, gameSettings) => {
      logger.info('Starting game', { roomId, gameSettings });
      dispatch(gameActions.startGame(roomId, gameSettings));
    }, []),

    endGame: useCallback(() => {
      logger.info('Ending game');
      dispatch(gameActions.endGame());
    }, []),

    setGameStatus: useCallback((status) => {
      logger.debug('Setting game status', { status });
      dispatch(gameActions.setGameStatus(status));
    }, []),

    resetGame: useCallback(() => {
      logger.info('Resetting game');
      dispatch(gameActions.resetGame());
      if (Config.FEATURE_FLAGS.ENABLE_OFFLINE_MODE) {
        clearGameState();
      }
    }, []),

    // Storage actions
    saveGame: useCallback(() => saveGameState(gameState), [gameState]),
    loadGame: useCallback(() => loadGameState(), []),
    clearStoredGame: useCallback(() => clearGameState(), []),
  }), [gameState]);

  // Memoized selectors to prevent unnecessary re-calculations
  const selectors = useMemo(() => ({
    // Player selectors
    getPlayerById: (playerId) => 
      gameState.players.find(p => p.id === playerId),

    getPlayerByUsername: (username) => 
      gameState.players.find(p => p.username === username),

    getActivePlayers: () => 
      gameState.players.filter(p => p.isActive),

    getPlayerCount: () => 
      gameState.players.length,

    getCurrentPlayer: () => 
      gameState.players.find(p => p.id === gameState.currentPlayerId),

    getNextPlayer: () => {
      const activePlayers = gameState.players.filter(p => p.isActive);
      if (activePlayers.length === 0) return null;
      
      const currentIndex = activePlayers.findIndex(p => p.id === gameState.currentPlayerId);
      const nextIndex = (currentIndex + 1) % activePlayers.length;
      return activePlayers[nextIndex];
    },

    getPlayerRanking: () => 
      [...gameState.players]
        .filter(p => p.isActive)
        .sort((a, b) => (b.money || 0) - (a.money || 0)),

    // Board selectors
    getBoardSize: () => 
      gameState.board?.size || 8,

    getBoardCell: (row, col) => 
      gameState.board?.cells?.[row]?.[col],

    getBoardProperties: () => 
      gameState.board?.properties || [],

    // Game state selectors
    isGameActive: () => 
      gameState.gameStatus === 'IN_PROGRESS',

    isGameWaiting: () => 
      gameState.gameStatus === 'WAITING',

    isGameFinished: () => 
      gameState.gameStatus === 'FINISHED',

    canStartGame: () => 
      gameState.players.length >= Config.APP.MIN_PLAYERS && 
      gameState.gameStatus === 'WAITING',

    getGameDuration: () => {
      if (!gameState.startTime) return 0;
      return Date.now() - gameState.startTime;
    },

    // Room selectors
    getRoomInfo: () => ({
      roomId: gameState.roomId,
      playerCount: gameState.players.length,
      maxPlayers: Config.APP.MAX_PLAYERS,
      gameStatus: gameState.gameStatus,
    }),
  }), [gameState]);

  // Async storage operations
  const loadGameState = async () => {
    try {
      logger.debug('Loading game state from storage');
      const savedState = await AsyncStorage.getItem(GAME_STATE_STORAGE_KEY);
      
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // Validate saved state version
        if (parsedState.version !== Config.APP.APP_VERSION) {
          logger.warn('Saved game state version mismatch, clearing state');
          await clearGameState();
          return;
        }

        // Restore state with proper class instantiation
        if (parsedState.players?.length > 0) {
          const players = parsedState.players.map(p => Player.fromObject(p));
          dispatch(gameActions.setPlayers(players));
        }

        if (parsedState.board) {
          const board = Board.fromObject(parsedState.board);
          dispatch(gameActions.updateBoard(board));
        }

        if (parsedState.turn !== undefined) {
          dispatch(gameActions.setTurn(parsedState.turn, parsedState.currentPlayerId));
        }

        if (parsedState.gameStatus) {
          dispatch(gameActions.setGameStatus(parsedState.gameStatus));
        }

        logger.info('Game state loaded successfully');
      }
    } catch (error) {
      logger.error('Error loading game state', error);
    }
  };

  const saveGameState = async (state) => {
    try {
      const stateToSave = {
        version: Config.APP.APP_VERSION,
        timestamp: Date.now(),
        players: state.players.map(p => p.toObject ? p.toObject() : p),
        board: state.board.toObject ? state.board.toObject() : state.board,
        turn: state.turn,
        currentPlayerId: state.currentPlayerId,
        gameStatus: state.gameStatus,
        roomId: state.roomId,
        gameSettings: state.gameSettings,
        startTime: state.startTime,
      };

      await AsyncStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(stateToSave));
      logger.debug('Game state saved successfully');
    } catch (error) {
      logger.error('Error saving game state', error);
    }
  };

  const clearGameState = async () => {
    try {
      await AsyncStorage.removeItem(GAME_STATE_STORAGE_KEY);
      logger.debug('Game state cleared from storage');
    } catch (error) {
      logger.error('Error clearing game state', error);
    }
  };

  return (
    <GameStateContext.Provider value={gameState}>
      <GameActionsContext.Provider value={actions}>
        <GameSelectorsContext.Provider value={selectors}>
          {children}
        </GameSelectorsContext.Provider>
      </GameActionsContext.Provider>
    </GameStateContext.Provider>
  );
};

// Optimized hooks
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

export const useGameActions = () => {
  const context = useContext(GameActionsContext);
  if (!context) {
    throw new Error('useGameActions must be used within a GameProvider');
  }
  return context;
};

export const useGameSelectors = () => {
  const context = useContext(GameSelectorsContext);
  if (!context) {
    throw new Error('useGameSelectors must be used within a GameProvider');
  }
  return context;
};

// Convenience hook for backwards compatibility
export const useGame = () => {
  const gameState = useGameState();
  const actions = useGameActions();
  const selectors = useGameSelectors();

  return {
    gameState,
    ...actions,
    ...selectors,
    // Legacy convenience getters
    players: gameState.players,
    board: gameState.board,
    turn: gameState.turn,
    currentPlayer: selectors.getCurrentPlayer(),
    gameStatus: gameState.gameStatus,
    roomId: gameState.roomId,
    gameSettings: gameState.gameSettings,
  };
};

// Higher-order component for game state
export const withGameState = (Component) => {
  return React.memo((props) => {
    const game = useGame();
    return <Component {...props} game={game} />;
  });
};