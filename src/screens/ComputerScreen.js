import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

const ComputerScreen = ({ route }) => {
  const { numberOfPlayers, playerColor, startingAmount } = route.params;

  const getColorName = (colorId) => {
    switch (colorId) {
      case 'blue':
        return { name: 'Blue', color: '#00B0FF' };
      case 'red':
        return { name: 'Red', color: '#FF0000' };
      case 'green':
        return { name: 'Green', color: '#00FF00' };
      case 'yellow':
        return { name: 'Yellow', color: '#FFD700' };
      default:
        return { name: 'Unknown', color: '#FFFFFF' };
    }
  };

  const selectedColor = getColorName(playerColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Settings</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Number of Players:</Text>
            <Text style={styles.value}>{numberOfPlayers}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Selected Color:</Text>
            <View style={styles.colorDisplay}>
              <View style={[styles.colorCircle, { backgroundColor: selectedColor.color }]} />
              <Text style={styles.value}>{selectedColor.name}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Starting Amount:</Text>
            <Text style={styles.value}>₹{startingAmount.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a4275',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: 'rgba(13, 36, 68, 0.9)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  infoItem: {
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  colorDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
});

export default ComputerScreen; 