import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/board-background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>INDIAN</Text>
          <Text style={styles.businessTitle}>BUSINESS</Text>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 75, 142, 0.85)', // Dark blue with 85% opacity
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  businessTitle: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
    marginTop: -5, // Bring the second line closer to the first
  },
  playButton: {
    marginTop: 50,
    backgroundColor: '#ff5733',
    paddingHorizontal: 70,
    paddingVertical: 18,
    borderRadius: 35,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  playButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default LandingScreen; 