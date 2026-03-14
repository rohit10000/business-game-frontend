import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import WaitingScreen from './WaitingScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import wsService from '../services/websocket/WebSocketService';
import JoinRoomModal from '../components/modals/JoinRoomModal';
import ErrorModal from '../components/modals/ErrorModal';
import LoginModal from '../components/modals/LoginModal';
import { useGame, useGameActions } from '../services/game/GameContext';
import { PLAYER_COLORS } from '../services/game/gameTypes';
import { getUser } from '../services/auth/auth';
import GameScreen from './GameScreen';

import { 
  handleCreateRoom,
  handleJoinRoom,
  handleModalCancel,
  handleModalEnter,
  handlePlayRandom 
} from '../handlers/onlineMultiplayerHandlers';

const { width } = Dimensions.get('window');

export default function OnlineMultiplayerScreen() {
  const [state, setState] = useState({
    isModalVisible: false,
    roomCode: '',
    errorModalVisible: false,
    waiting: false,
    wsMessage: '',
    playerName: '',
    showLoginModal: false,
  });
  const unsubscribeRef = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  // Game context
  const { gameState, roomId } = useGame();
  const gameActions = useGameActions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: state.waiting ? 'Waiting Screen' : 'Online Multiplayer',
    });
  }, [navigation, state.waiting]);

  useEffect(() => {
    // Close all websocket connections when landing on OnlineMultiplayerScreen
    if (isFocused) {
      console.log('Landing on OnlineMultiplayerScreen, cleaning up existing WebSocket connections');
      if (wsService.isConnected()) {
        wsService.disconnect();
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    }
  }, [isFocused]);

  // Handle WebSocket messages and update game state
  const handleWebSocketMessage = (message) => {
    console.log('Handling WebSocket message:', message);
    
    // Update the UI message
    const displayMessage = message.text || message.content || message.message || JSON.stringify(message);
    setState(prev => ({ ...prev, wsMessage: displayMessage }));
    
    // Handle different message types
    if (message.eventType) {
      switch (message.eventType) {
        case 'PLAYER_JOINED':
        case 'JOIN_ROOM':
        case 'ROOM_CREATED':
        case 'CREATE_ROOM':
        case 'LEAVE_ROOM':
          handlePlayersJoined(message);
          break;
        case 'PLAYER_LEFT':
          handlePlayerLeft(message);
          break;
        case 'GAME_STARTED':
          handleGameStarted(message);
          break;
        default:
          console.log('Unhandled message type:', message.eventType);
      }
    }
  };

  const handlePlayersJoined = (message) => {
    console.log('Player joined:', message);
    if (message.players) {
      addPlayersToGameState(message.players);
    }
  };

  const handlePlayerLeft = (message) => {   
    console.log('Player left:', message);
    // Find and remove player from game state
    const player = gameState.players.find(p => p.username === message.from);
    if (player) {
      gameActions.removePlayer(player.id);
    }
  };

  const handleRoomCreated = (message) => {
    console.log('Room created:', message);
    if (message.code) {
      // Set the room ID in game state and update local state
      gameActions.startGame(message.code);
      setState(prev => ({ ...prev, roomCode: message.code }));
    }
  };

  const handleGameStarted = (message) => {
    console.log('Game started:', message);
    // Navigate to game screen or update game status
    gameActions.setGameStatus('IN_PROGRESS');
  };
  
  const addPlayersToGameState = (players) => {
    // Add player to game state
    console.log('Adding players to game state:', players);
    gameActions.addPlayers(players);
  };

  const handleLoginSuccess = (userData) => {
    setState(prev => ({ ...prev, showLoginModal: false }));
    // Retry the last action that required authentication
    if (state.isModalVisible) {
      handleModalEnter(setState, state, handleWebSocketMessage, gameActions);
    } else {
      handleCreateRoom(setState, handleWebSocketMessage, gameActions);
    }
  };

  // Add current user to game state when they create or join a room
  // useEffect(() => {
  //   if (state.waiting && gameState.players.length === 0) {
  //     // Get current user and add them to game state
  //     const addCurrentUser = async () => {
  //       try {
  //         const userData = await getUser();
  //         if (userData?.username) {
  //           addPlayerToGameState(userData.username, state.roomCode || 'unknown');
  //         }
  //       } catch (error) {
  //         console.error('Error getting current user:', error);
  //       }
  //     };
  //     addCurrentUser();
  //   }
  // }, [state.waiting]);

  // Waiting screen UI
  if (state.waiting) {
    return <WaitingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => handleCreateRoom(setState, handleWebSocketMessage, gameActions)}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleJoinRoom(setState)} 
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Join Room</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handlePlayRandom(setState)} 
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Play Random</Text>
        </TouchableOpacity>
      </View>

      <JoinRoomModal
        visible={state.isModalVisible}
        onClose={() => handleModalCancel(setState)}
        roomCode={state.roomCode}
        onRoomCodeChange={(text) => setState(prev => ({ ...prev, roomCode: text }))}
        onEnter={() => handleModalEnter(setState, state, handleWebSocketMessage, gameActions)}
      />

      <ErrorModal
        visible={state.errorModalVisible}
        onClose={() => setState(prev => ({ ...prev, errorModalVisible: false }))}
      />

      <LoginModal
        visible={state.showLoginModal}
        onClose={() => setState(prev => ({ ...prev, showLoginModal: false }))}
        onLoginSuccess={handleLoginSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a1033', // deep navy
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 20,
  },
  button: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
}); 