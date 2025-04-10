import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComputerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Computer Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a75ff',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
}); 