import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile and Coins Section */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={require('../assets/business-india-board.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.guestText}>Guest1234</Text>
        </View>
        <View style={styles.coins}>
          <Image
            source={require('../assets/business-india-board.jpeg')}
            style={styles.coinIcon}
          />
          <Text style={styles.coinText}>0</Text>
        </View>
      </View>

      {/* Ludo King Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/business-india-board.jpeg')}
          style={styles.logo}
        />
      </View>

      {/* Game Mode Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('OnlineMultiplayer')}
        >
          <Text style={styles.buttonText}>ONLINE MULTIPLAYER</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Computer')}
        >
          <Text style={styles.buttonText}>COMPUTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a75ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  guestText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 20,
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  coinText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  buttonContainer: {
    padding: 20,
    gap: 20,
  },
  button: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8b4513',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 