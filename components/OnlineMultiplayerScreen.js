import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnlineMultiplayerScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = () => {
    // TODO: Implement create room functionality
    console.log('Create Room pressed');
  };

  const handleJoinRoom = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setRoomCode('');
  };

  const handleModalEnter = () => {
    // TODO: Validate and use roomCode
    setIsModalVisible(false);
    setRoomCode('');
    console.log('Enter pressed with code:', roomCode);
  };

  const handlePlayRandom = () => {
    // TODO: Implement play random functionality
    console.log('Play Random pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={handleCreateRoom} 
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleJoinRoom} 
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Join Room</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handlePlayRandom} 
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Play Random</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Join Room</Text>
            <Text style={styles.modalSubtitle}>Enter the code</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter code"
              placeholderTextColor="#f7e6b7"
              value={roomCode}
              onChangeText={text => setRoomCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
              keyboardType="numeric"
              maxLength={6}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleModalCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.enterButton]}
                onPress={handleModalEnter}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 16, 51, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#231a4a',
    borderRadius: 28,
    padding: 28,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f7e6b7',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 20,
    color: '#f7e6b7',
    marginBottom: 22,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#4b256d',
    color: '#f7e6b7',
    fontSize: 20,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
    marginBottom: 26,
    textAlign: 'left',
  },
  modalButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    marginRight: 8,
  },
  enterButton: {
    backgroundColor: '#2346d6',
    marginLeft: 8,
  },
  modalButtonText: {
    color: '#f7e6b7',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 