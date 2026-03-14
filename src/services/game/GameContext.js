import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gameReducer, gameActions } from './gameReducer';
import { createInitialGameState, Player, Board } from './gameTypes';

// Create Game Context
const GameContext = createContext();

// Storage key for persisting game state
const GAME_STATE_STORAGE_KEY = 'gameState';

// Game Provider Component
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialGameState());

  // Load persisted game state on app start (commented out to prevent initialization issues)
  // useEffect(() => {
  //   loadGameState();
  // }, []);

  // Save game state to AsyncStorage whenever it changes (commented out to prevent initialization issues)
  // useEffect(() => {
  //   saveGameState(gameState);
  // }, [gameState]);

  // Load game state from AsyncStorage
  const loadGameState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(GAME_STATE_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Restore the saved state with proper class instantiation
        if (parsedState.players && parsedState.players.length > 0) {
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
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  // Save game state to AsyncStorage
  const saveGameState = async (state) => {
    try {
      // Only save essential state to avoid storage bloat
      const stateToSave = {
        players: state.players.map(p => p.toObject ? p.toObject() : p),
        board: state.board.toObject ? state.board.toObject() : state.board,
        turn: state.turn,
        currentPlayerId: state.currentPlayerId,
        gameStatus: state.gameStatus,
        roomId: state.roomId,
        gameSettings: state.gameSettings
      };
      
      await AsyncStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Clear persisted game state
  const clearGameState = async () => {
    try {
      await AsyncStorage.removeItem(GAME_STATE_STORAGE_KEY);
      dispatch(gameActions.resetGame());
    } catch (error) {
      console.error('Error clearing game state:', error);
    }
  };

  // Context value
  const value = {
    gameState,
    dispatch,
    gameActions,
    clearGameState,
    loadGameState,
    
    // Convenience getters
    players: gameState.players,
    board: gameState.board,
    turn: gameState.turn,
    currentPlayer: gameState.players.find(p => p.id === gameState.currentPlayerId),
    gameStatus: gameState.gameStatus,
    roomId: gameState.roomId,
    gameSettings: gameState.gameSettings
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use Game Context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Custom hooks for specific game operations
export const useGameActions = () => {
  const { dispatch, gameActions } = useGame();
  
  return {
    // Player actions
    addPlayers: (players) => 
      dispatch(gameActions.addPlayers(players)),

    // Player actions
    addPlayer: (username, currentRoomId, color) => 
      dispatch(gameActions.addPlayer(username, currentRoomId, color)),
    
    removePlayer: (playerId) => 
      dispatch(gameActions.removePlayer(playerId)),
    
    updatePlayer: (playerId, updates) => 
      dispatch(gameActions.updatePlayer(playerId, updates)),
    
    setPlayers: (players) => 
      dispatch(gameActions.setPlayers(players)),

    // Board actions
    initializeBoard: (size, type) => 
      dispatch(gameActions.initializeBoard(size, type)),
    
    updateBoard: (boardUpdates) => 
      dispatch(gameActions.updateBoard(boardUpdates)),
    
    resetBoard: () => 
      dispatch(gameActions.resetBoard()),

    // Turn actions
    nextTurn: () => 
      dispatch(gameActions.nextTurn()),
    
    setTurn: (turn, playerId) => 
      dispatch(gameActions.setTurn(turn, playerId)),

    // Game actions
    startGame: (roomId, gameSettings) => 
      dispatch(gameActions.startGame(roomId, gameSettings)),
    
    endGame: () => 
      dispatch(gameActions.endGame()),
    
    setGameStatus: (status) => 
      dispatch(gameActions.setGameStatus(status)),
    
    resetGame: () => 
      dispatch(gameActions.resetGame())
  };
};

// Custom hook for game selectors
export const useGameSelectors = () => {
  const { gameState } = useGame();
  
  return {
    // Player selectors
    getPlayerById: (playerId) => 
      gameState.players.find(p => p.id === playerId),
    
    getPlayerByUsername: (username) => 
      gameState.players.find(p => p.username === username),
    
    getActivePlayers: () => 
      gameState.players.filter(p => p.isActive),
    
    getPlayerCount: () => 
      gameState.players.length,
    
    // Board selectors
    getBoardSize: () => 
      gameState.board?.size || 8,
    
    getBoardCell: (row, col) => 
      gameState.board?.cells?.[row]?.[col],
    
    // Turn selectors
    getCurrentPlayer: () => 
      gameState.players.find(p => p.id === gameState.currentPlayerId),
    
    getNextPlayer: () => {
      const nextTurn = (gameState.turn + 1) % gameState.players.length;
      return gameState.players[nextTurn];
    },
    
    // Game selectors
    isGameActive: () => 
      gameState.gameStatus === 'IN_PROGRESS',
    
    isGameWaiting: () => 
      gameState.gameStatus === 'WAITING',
    
    isGameFinished: () => 
      gameState.gameStatus === 'FINISHED',
    
    canStartGame: () => 
      gameState.players.length >= 2 && gameState.gameStatus === 'WAITING'
  };
}; 