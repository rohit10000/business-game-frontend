import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BlurOverlay from './BlurOverlay';

const AmountSelectionModal = ({ visible, onClose, onNext }) => {
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const amounts = [5000, 10000, 15000, 20000, 25000];

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
            <Text style={styles.title}>SELECT PER{'\n'}PLAYER AMOUNT</Text>
            
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.selectedAmount}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.amountText}>{selectedAmount}</Text>
                <Ionicons 
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color="#FFD700" 
                />
              </TouchableOpacity>

              {isDropdownOpen && (
                <ScrollView style={styles.dropdownList}>
                  {amounts.map((amount) => (
                    <TouchableOpacity
                      key={amount}
                      style={[
                        styles.dropdownItem,
                        selectedAmount === amount && styles.selectedDropdownItem
                      ]}
                      onPress={() => {
                        setSelectedAmount(amount);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.amountText}>{amount}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={24} color="#FFD700" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => onNext(selectedAmount)}
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
  dropdownContainer: {
    width: '100%',
    marginVertical: 20,
    position: 'relative',
  },
  selectedAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d2444',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
  },
  dropdownList: {
    maxHeight: 200,
    backgroundColor: '#0d2444',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.3)',
  },
  selectedDropdownItem: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  amountText: {
    color: 'white',
    fontSize: 24,
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

export default AmountSelectionModal; 