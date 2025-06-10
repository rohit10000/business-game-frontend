import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlayerSelectionModal from './PlayerSelectionModal';
import ColorSelectionModal from './ColorSelectionModal';
import AmountSelectionModal from './AmountSelectionModal';
import LoginModal from './utils/modals/LoginModal';
import { getUser, isAuthenticated, clearAuthTokens } from '../utils/auth';

const HomeScreen = ({ navigation }) => {
  const [isPlayerSelectionVisible, setPlayerSelectionVisible] = useState(false);
  const [isColorSelectionVisible, setColorSelectionVisible] = useState(false);
  const [isAmountSelectionVisible, setAmountSelectionVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [selectedColor, setSelectedColor] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('HomeScreen mounted');
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log('Checking auth status...');
    const isLoggedIn = await isAuthenticated();
    console.log('Is logged in:', isLoggedIn);
    if (isLoggedIn) {
      const userData = await getUser();
      console.log('User data:', userData);
      setUser(userData);
    }
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    await clearAuthTokens();
    setUser(null);
    console.log('Logout complete');
  };

  const handlePlayerSelection = (numberOfPlayers) => {
    console.log('Selected players:', numberOfPlayers);
    setSelectedPlayers(numberOfPlayers);
    setPlayerSelectionVisible(false);
    setColorSelectionVisible(true);
  };

  const handleColorSelection = (color) => {
    console.log('Selected color:', color);
    setSelectedColor(color);
    setColorSelectionVisible(false);
    setAmountSelectionVisible(true);
  };

  const handleAmountSelection = (amount) => {
    console.log('Selected amount:', amount);
    setAmountSelectionVisible(false);
    navigation.navigate('Computer', {
      numberOfPlayers: selectedPlayers,
      playerColor: selectedColor,
      startingAmount: amount
    });
  };

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    setUser(userData);
  };

  const handleLoginPress = () => {
    debugger;
    if (user) {
      handleLogout();
    } else {
      setLoginModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleLoginPress}
        >
          <Ionicons 
            name={user ? "person-circle" : "person-circle-outline"} 
            size={40} 
            color="white" 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/indian-business.png')}
          style={styles.businessImage}
          resizeMode="contain"
        />

        <TouchableOpacity 
          style={styles.gameOption}
          onPress={() => setPlayerSelectionVisible(true)}
        >
          <Image
            source={require('../assets/vs-computer.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gameOption}
          onPress={() => navigation.navigate('OnlineMultiplayer')}
        >
          <Image
            source={require('../assets/online-multiplayer.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <PlayerSelectionModal
          visible={isPlayerSelectionVisible}
          onClose={() => setPlayerSelectionVisible(false)}
          onNext={handlePlayerSelection}
        />

        <ColorSelectionModal
          visible={isColorSelectionVisible}
          onClose={() => {
            setColorSelectionVisible(false);
            setPlayerSelectionVisible(true);
          }}
          onPlay={handleColorSelection}
          numberOfPlayers={selectedPlayers}
        />

        <AmountSelectionModal
          visible={isAmountSelectionVisible}
          onClose={() => {
            setAmountSelectionVisible(false);
            setColorSelectionVisible(true);
          }}
          onNext={handleAmountSelection}
        />

        <LoginModal
          visible={isLoginModalVisible}
          onClose={() => setLoginModalVisible(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a4275', // Deep blue background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 15,
  },
  gameOption: {
    width: '85%',
    aspectRatio: 2,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    backgroundColor: 'rgba(26, 66, 117, 0.95)',
    marginVertical: 5,
  },
  businessImage: {
    width: '100%',
    height: '40%',
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen; 