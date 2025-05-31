import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function WaitingScreen({ message }) {
  return (
    <View style={styles.waitingContainer}>
      <Text style={styles.waitingText}>Waiting for other players to join...</Text>
      {message ? (
        <Text style={styles.messageText}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  waitingContainer: {
    flex: 1,
    backgroundColor: '#0a1033',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingText: {
    color: '#f7e6b7',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 24,
  },
  messageText: {
    color: '#f7e6b7',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
}); 