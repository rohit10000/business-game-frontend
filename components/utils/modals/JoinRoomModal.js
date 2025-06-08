import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function JoinRoomModal({ 
  visible, 
  onClose, 
  roomCode, 
  onRoomCodeChange, 
  onEnter,
  playerName,
  onPlayerNameChange
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Join Room</Text>
          <Text style={styles.modalSubtitle}>Enter your name and room code</Text>
          
          <TextInput
            style={styles.modalInput}
            placeholder="Enter your name"
            placeholderTextColor="#f7e6b7"
            value={playerName}
            onChangeText={onPlayerNameChange}
          />

          <TextInput
            style={styles.modalInput}
            placeholder="Enter code"
            placeholderTextColor="#f7e6b7"
            value={roomCode}
            onChangeText={text => onRoomCodeChange(text.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="numeric"
            maxLength={6}
          />
          
          <View style={styles.modalButtonRow}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.enterButton, 
                (roomCode.length !== 6 || !playerName.trim()) && { opacity: 0.5 }]}
              onPress={onEnter}
              activeOpacity={0.8}
              disabled={roomCode.length !== 6 || !playerName.trim()}
            >
              <Text style={styles.modalButtonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 16,
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