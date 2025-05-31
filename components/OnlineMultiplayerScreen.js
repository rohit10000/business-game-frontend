import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnlineMultiplayerScreen() {
  const handleCreateRoom = () => {
    // TODO: Implement create room functionality
    console.log('Create Room pressed');
  };

  const handleJoinRoom = () => {
    // TODO: Implement join room functionality
    console.log('Join Room pressed');
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a75ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 