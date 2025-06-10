import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import WaitingScreen from './WaitingScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import wsService from '../utils/WebSocketService';
import JoinRoomModal from './utils/modals/JoinRoomModal';
import ErrorModal from './utils/modals/ErrorModal';
import LoginModal from './utils/modals/LoginModal';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: state.waiting ? 'Waiting Screen' : 'Online Multiplayer',
    });
  }, [navigation, state.waiting]);

  useEffect(() => {
    // Only clean up when leaving the screen completely
    return () => {
      if (!isFocused) {
        console.log('Leaving OnlineMultiplayerScreen, cleaning up WebSocket');
        wsService.disconnect();
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
          unsubscribeRef.current = null;
        }
      }
    };
  }, [isFocused]);

  const handleLoginSuccess = (userData) => {
    setState(prev => ({ ...prev, showLoginModal: false }));
    // Retry the last action that required authentication
    if (state.isModalVisible) {
      handleModalEnter(setState);
    } else {
      handleCreateRoom(setState);
    }
  };

  // Waiting screen UI
  if (state.waiting) {
    return <WaitingScreen message={state.wsMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => handleCreateRoom(setState)}
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
        onEnter={() => handleModalEnter(setState)}
        playerName={state.playerName}
        onPlayerNameChange={(text) => setState(prev => ({ ...prev, playerName: text }))}
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