import wsService from '../utils/WebSocketService';
import { API_CREATE_ROOM_URL } from '../config/server';
import { Alert } from 'react-native';

export const handleCreateRoom = async (setState) => {
  try {
    const response = await fetch(API_CREATE_ROOM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) throw new Error('Failed to create room');
    
    const { code, createdBy } = await response.json();
    
    // Connect to WebSocket with the room code
    wsService.connect(
      createdBy,
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

export const handleJoinRoom = (setState) => {
  setState(prev => ({ ...prev, isModalVisible: true }));
};

export const handleModalCancel = (setState) => {
  setState(prev => ({ 
    ...prev, 
    isModalVisible: false,
    roomCode: ''
  }));
};

export const handleModalEnter = (setState) => {
  const { playerName, roomCode } = setState(prev => prev);
  
  if (!playerName.trim()) {
    Alert.alert('Error', 'Please enter your name');
    return;
  }

  // Try to connect to WebSocket using wsService
  wsService.connect(
    playerName,
    () => {
      wsService.sendMessage({
        type: 'JOIN',
        from: playerName,
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
};

export const handlePlayRandom = () => {
  // TODO: Implement play random functionality
  console.log('Play Random pressed');
}; 