import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BlurOverlay from '../ui/BlurOverlay';

const PlayerSelectionModal = ({ visible, onClose, onNext }) => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);

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
            <Text style={styles.title}>SELECT PLAYERS</Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={styles.option}
                onPress={() => setSelectedPlayers(2)}
              >
                <View style={[styles.circle, selectedPlayers === 2 && styles.selectedCircle]}>
                  {selectedPlayers === 2 && (
                    <Ionicons name="checkmark" size={24} color="#FFD700" />
                  )}
                </View>
                <Text style={styles.optionText}>2 PLAYERS</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.option}
                onPress={() => setSelectedPlayers(4)}
              >
                <View style={[styles.circle, selectedPlayers === 4 && styles.selectedCircle]}>
                  {selectedPlayers === 4 && (
                    <Ionicons name="checkmark" size={24} color="#FFD700" />
                  )}
                </View>
                <Text style={styles.optionText}>4 PLAYERS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => onNext(selectedPlayers)}
              >
                <Text style={styles.nextButtonText}>NEXT</Text>
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
    width: '80%',
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
  optionsContainer: {
    marginVertical: 20,
    gap: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#1a4275',
  },
  optionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  nextButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#1a4275',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  nextButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PlayerSelectionModal; 