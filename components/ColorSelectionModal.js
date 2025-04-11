import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BlurOverlay from './BlurOverlay';

const ColorSelectionModal = ({ visible, onClose, onPlay, numberOfPlayers }) => {
  const [selectedColor, setSelectedColor] = useState('blue');

  const colors = [
    { id: 'blue', color: '#00B0FF' },
    { id: 'red', color: '#FF0000' },
    { id: 'green', color: '#00FF00' },
    { id: 'yellow', color: '#FFD700' }
  ];

  return (
    <>
      <BlurOverlay visible={visible} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>SELECT YOUR COLOR</Text>
            
            <View style={styles.colorGrid}>
              <View style={styles.markerRow}>
                {colors.map((color) => (
                  <View key={`marker-${color.id}`} style={styles.markerContainer}>
                    <View style={[styles.marker, { backgroundColor: 'white' }]}>
                      <View style={[styles.markerDot, { backgroundColor: color.color }]} />
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.selectionRow}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={`select-${color.id}`}
                    style={styles.colorContainer}
                    onPress={() => setSelectedColor(color.id)}
                  >
                    <View 
                      style={[
                        styles.colorCircle,
                        { borderColor: color.color },
                        selectedColor === color.id && { backgroundColor: color.color }
                      ]}
                    >
                      {selectedColor === color.id && (
                        <Ionicons name="checkmark" size={24} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={() => onPlay(selectedColor)}
              >
                <Text style={styles.playButtonText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1a4275',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  title: {
    fontSize: 28,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  colorGrid: {
    marginVertical: 20,
    gap: 20,
  },
  markerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorContainer: {
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a4275',
    borderWidth: 2,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#1a4275',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ColorSelectionModal; 