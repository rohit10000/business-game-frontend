import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import OnlineMultiplayerScreen from './src/screens/OnlineMultiplayerScreen';
import ComputerScreen from './src/screens/ComputerScreen';
import GameScreen from './src/screens/GameScreen';
import { GameProvider } from './src/services/game/GameContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Landing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a75ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="OnlineMultiplayer" 
            component={OnlineMultiplayerScreen}
            options={{ title: 'Online Multiplayer' }}
          />
          <Stack.Screen 
            name="Computer" 
            component={ComputerScreen}
            options={{ title: 'Computer Mode' }}
          />
          <Stack.Screen 
            name="Game" 
            component={GameScreen}
            options={{ title: 'Game State Demo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
