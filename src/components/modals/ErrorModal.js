import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ErrorModal({ visible, onClose, message = 'Unable to join' }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.errorModalBox}>
          <Text style={styles.errorModalText}>{message}</Text>
          <TouchableOpacity
            style={[styles.modalButton, styles.enterButton, { marginTop: 24 }]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.modalButtonText}>Okay</Text>
          </TouchableOpacity>
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
  errorModalBox: {
    backgroundColor: '#231a4a',
    borderRadius: 28,
    padding: 32,
    width: width * 0.75,
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  errorModalText: {
    color: '#f7e6b7',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterButton: {
    backgroundColor: '#2346d6',
  },
  modalButtonText: {
    color: '#f7e6b7',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 