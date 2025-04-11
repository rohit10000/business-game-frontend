import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={40} color="white" />
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
          onPress={() => navigation.navigate('Computer')}
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