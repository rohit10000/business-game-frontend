import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './components/LandingScreen';
import HomeScreen from './components/HomeScreen';
import OnlineMultiplayerScreen from './components/OnlineMultiplayerScreen';
import ComputerScreen from './components/ComputerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
