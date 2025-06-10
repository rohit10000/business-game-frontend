import wsService from '../utils/WebSocketService';
import { API_ENDPOINTS } from '../config/server';
import { Alert } from 'react-native';
import { getAuthTokens } from '../utils/auth';

export const handleCreateRoom = async (setState) => {
  try {
    // Check if user is authenticated
    const tokens = await getAuthTokens();
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
      if (response.status === 401) {
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
          type: 'JOIN',
          from: createdBy,
          code: code,
          text: `${createdBy} created room ${code}!`
        });
        setState(prev => ({ ...prev, waiting: true }));
        // Subscribe to messages
        setState(prev => ({ 
          ...prev, 
          unsubscribeRef: wsService.subscribe((msg) => 
            setState(prev => ({ ...prev, wsMessage: msg.text }))
          )
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

export const handleModalEnter = async (setState) => {
  try {
    const { playerName, roomCode } = setState(prev => prev);
    
    if (!playerName.trim()) {
      Alert.alert('Error', 'Please enter your name');
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
          type: 'JOIN',
          from: playerName,
          code: roomCode,
          text: `${playerName} joined room ${roomCode}!`
        });
        setState(prev => ({
          ...prev,
          isModalVisible: false,
          roomCode: '',
          waiting: true
        }));
        // Subscribe to messages
        setState(prev => ({ 
          ...prev, 
          unsubscribeRef: wsService.subscribe((msg) => 
            setState(prev => ({ ...prev, wsMessage: msg.text }))
          )
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