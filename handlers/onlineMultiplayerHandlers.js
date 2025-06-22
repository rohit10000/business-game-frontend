import wsService from '../utils/WebSocketService';
import { API_ENDPOINTS } from '../config/server';
import { Alert } from 'react-native';
import { getAuthTokens, getUser } from '../utils/auth';
import { WS_CREATE_ROOM, WS_JOIN_ROOM } from '../config/server';

export const handleCreateRoom = async (setState, messageHandler = null, gameActions = null) => {
  try {
    // Check if user is authenticated
    const tokens = await getAuthTokens();
    console.log('Retrieved tokens:', tokens);
    if (!tokens?.accessToken) {
      console.log('User not authenticated, showing login modal');
      setState(prev => ({ ...prev, showLoginModal: true }));
      return;
    }

    console.log('Creating room with auth token');
    const response = await fetch(API_ENDPOINTS.CREATE_ROOM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.log('Token expired or invalid, showing login modal');
        // Token expired or invalid
        setState(prev => ({ ...prev, showLoginModal: true }));
        return;
      }
      console.log(response);
      throw new Error('Failed to create room');
    }
    
    const { code, createdBy } = await response.json();
    console.log('Room created successfully:', { code, createdBy });
    
    // Connect to WebSocket with the room code
    wsService.connect(
      createdBy,
      code,
      () => {
        wsService.sendMessage({
          eventType: 'CREATE_ROOM',
          from: createdBy,
          code: code,
          authToken: tokens.accessToken
        }, WS_CREATE_ROOM);
        setState(prev => ({ ...prev, waiting: true, roomCode: code }));
        
        // Set room code in game state
        if (gameActions) {
          gameActions.startGame(code);
        }
        
        // Subscribe to messages with custom handler if provided
        setState(prev => ({ 
          ...prev, 
          unsubscribeRef: wsService.subscribe(messageHandler || ((msg) => 
            setState(prev => ({ ...prev, wsMessage: msg.text }))
          ))
        }));
      },
      () => {
        setState(prev => ({ ...prev, errorModalVisible: true }));
      },
      () => {
        setState(prev => ({ ...prev, errorModalVisible: true }));
      }
    );
  } catch (error) {
    console.error('Error creating room:', error);
    setState(prev => ({ ...prev, errorModalVisible: true }));
  }
};

export const handleJoinRoom = async (setState) => {
  try {
    // Check if user is authenticated
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) {
      console.log('User not authenticated, showing login modal');
      setState(prev => ({ ...prev, showLoginModal: true }));
      return;
    }

    setState(prev => ({ ...prev, isModalVisible: true }));
  } catch (error) {
    console.error('Error checking authentication:', error);
    setState(prev => ({ ...prev, errorModalVisible: true }));
  }
};

export const handleModalCancel = (setState) => {
  setState(prev => ({ 
    ...prev, 
    isModalVisible: false,
    roomCode: ''
  }));
};

export const handleModalEnter = async (setState, currentState, messageHandler = null, gameActions = null) => {
  try {
    const { roomCode } = currentState;
    const userData = await getUser();
    const playerName = userData?.username;
    
    console.log('Player name:', playerName, ' and Room code:', roomCode);
    
    if (!playerName || !playerName.trim()) {
      console.log('Player name is empty. Login in first');
      setState(prev => ({ ...prev, showLoginModal: true }));
      return;
    }

    if (!roomCode || !roomCode.trim()) {
      Alert.alert('Error', 'Please enter a room code');
      return;
    }

    // Check if user is authenticated
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) {
      console.log('User not authenticated, showing login modal');
      setState(prev => ({ ...prev, showLoginModal: true }));
      return;
    }

    // Try to connect to WebSocket using wsService
    wsService.connect(
      playerName,
      roomCode,
      () => {
        wsService.sendMessage({
          eventType: 'JOIN_ROOM',
          from: playerName,
          code: roomCode
        }, WS_JOIN_ROOM);
        setState(prev => ({
          ...prev,
          isModalVisible: false,
          roomCode: roomCode, // Keep the room code for reference
          waiting: true
        }));
        
        // Set room code in game state
        if (gameActions) {
          gameActions.startGame(roomCode);
        }
        
        // Subscribe to messages with custom handler if provided
        setState(prev => ({ 
          ...prev, 
          unsubscribeRef: wsService.subscribe(messageHandler || ((msg) => 
            setState(prev => ({ ...prev, wsMessage: msg.text }))
          ))
        }));
      },
      () => {
        setState(prev => ({
          ...prev,
          isModalVisible: false,
          errorModalVisible: true
        }));
      },
      () => {
        setState(prev => ({
          ...prev,
          isModalVisible: false,
          errorModalVisible: true
        }));
      }
    );
  } catch (error) {
    console.error('Error joining room:', error);
    setState(prev => ({ ...prev, errorModalVisible: true }));
  }
};

export const handlePlayRandom = async (setState) => {
  try {
    // Check if user is authenticated
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) {
      console.log('User not authenticated, showing login modal');
      setState(prev => ({ ...prev, showLoginModal: true }));
      return;
    }

    // TODO: Implement play random functionality
    console.log('Play Random pressed');
  } catch (error) {
    console.error('Error checking authentication:', error);
    setState(prev => ({ ...prev, errorModalVisible: true }));
  }
};