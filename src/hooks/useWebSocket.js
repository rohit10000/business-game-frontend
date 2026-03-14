import { useState, useEffect, useRef, useCallback } from 'react';
import WebSocketService from '../services/websocket/WebSocketService';

export const useWebSocket = (roomCode = null) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsService = useRef(WebSocketService);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000;

  useEffect(() => {
    if (roomCode) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [roomCode]);

  const connect = useCallback(async () => {
    try {
      setConnectionError(null);
      const success = await wsService.current.connect();
      
      if (success) {
        setIsConnected(true);
        setReconnectAttempts(0);
        
        if (roomCode) {
          wsService.current.subscribe(`/topic/room.${roomCode}`, handleRoomMessage);
        }
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setConnectionError(error.message);
      setIsConnected(false);
      
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connect();
        }, reconnectDelay * Math.pow(2, reconnectAttempts));
      }
    }
  }, [roomCode, reconnectAttempts]);

  const disconnect = useCallback(() => {
    wsService.current.disconnect();
    setIsConnected(false);
    setConnectionError(null);
    setReconnectAttempts(0);
  }, []);

  const sendMessage = useCallback((destination, message) => {
    if (isConnected) {
      wsService.current.sendMessage(destination, message);
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }, [isConnected]);

  const handleRoomMessage = useCallback((message) => {
    console.log('Room message received:', message);
  }, []);

  const createRoom = useCallback(async (roomData) => {
    return wsService.current.createRoom(roomData);
  }, []);

  const joinRoom = useCallback(async (roomCode) => {
    return wsService.current.joinRoom(roomCode);
  }, []);

  const leaveRoom = useCallback(async (roomCode) => {
    return wsService.current.leaveRoom(roomCode);
  }, []);

  return {
    isConnected,
    connectionError,
    reconnectAttempts,
    connect,
    disconnect,
    sendMessage,
    createRoom,
    joinRoom,
    leaveRoom,
    wsService: wsService.current
  };
};

export const useGameMessages = (roomCode, gameActions) => {
  const { wsService, isConnected } = useWebSocket(roomCode);

  useEffect(() => {
    if (isConnected && roomCode) {
      const unsubscribe = wsService.subscribe(`/topic/room.${roomCode}`, (message) => {
        handleGameMessage(message, gameActions);
      });

      return unsubscribe;
    }
  }, [isConnected, roomCode, gameActions]);

  const handleGameMessage = (message, actions) => {
    try {
      const data = JSON.parse(message.body);
      
      switch (data.type) {
        case 'PLAYER_JOINED':
          actions.addPlayer(data.player);
          break;
        case 'PLAYER_LEFT':
          actions.removePlayer(data.playerId);
          break;
        case 'GAME_STATE_UPDATE':
          actions.updateGameState(data.gameState);
          break;
        case 'TURN_CHANGED':
          actions.setCurrentPlayer(data.playerId);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error handling game message:', error);
    }
  };

  return {
    isConnected
  };
};