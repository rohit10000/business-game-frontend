import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import OnlineMultiplayerScreen from './src/screens/OnlineMultiplayerScreen';
import ComputerScreen from './src/screens/ComputerScreen';
import GameScreen from './src/screens/GameScreen';

// Context and Services
import { GameProvider } from './src/services/game/GameContextOptimized';
import ErrorBoundary from './src/components/ui/ErrorBoundary';
import { logger } from './src/services/logging/logger';
import { analytics } from './src/services/monitoring/analytics';
import { performanceMonitor } from './src/services/monitoring/performance';

// Configuration
import Config from './src/config/environment';
import theme from './src/constants/theme';

const Stack = createNativeStackNavigator();

// Error handler for the app
const handleAppError = (error, errorInfo) => {
  logger.error('App-level error caught by ErrorBoundary', error, { errorInfo });
  analytics.trackError(error, { context: 'app_error_boundary' });
};

// Custom fallback component for errors
const ErrorFallback = (error, retry) => (
  <ErrorBoundary
    fallback={() => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.error.main, marginBottom: 16 }}>
          Something went wrong
        </Text>
        <Text style={{ fontSize: 14, color: theme.colors.text.secondary, textAlign: 'center', marginBottom: 24 }}>
          The app encountered an unexpected error. Please try restarting the app.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary.main,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={retry}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);

export default function App() {
  useEffect(() => {
    // Initialize services
    const initializeApp = async () => {
      try {
        logger.info('App starting', { version: Config.APP.APP_VERSION });
        
        // Initialize analytics
        if (Config.FEATURE_FLAGS.ENABLE_ANALYTICS) {
          await analytics.initialize();
        }

        // Start performance monitoring
        if (Config.DEV.SHOW_PERFORMANCE_METRICS) {
          performanceMonitor.measureBundleLoadTime();
          performanceMonitor.startFrameRateMonitoring();
          
          if (Config.IS_DEVELOPMENT) {
            performanceMonitor.startMemoryMonitoring();
          }
        }

        // Set up global error handlers
        if (Config.ERROR.ERROR_REPORTING_ENABLED) {
          logger.setErrorHandler((logEntry) => {
            analytics.trackError(new Error(logEntry.message), logEntry.context);
          });
        }

        logger.info('App initialization completed');
      } catch (error) {
        logger.error('App initialization failed', error);
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      if (Config.DEV.SHOW_PERFORMANCE_METRICS) {
        performanceMonitor.cleanup();
      }
      
      if (Config.FEATURE_FLAGS.ENABLE_ANALYTICS) {
        analytics.endSession();
      }
    };
  }, []);

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary.main,
    },
    headerTintColor: theme.colors.primary.contrastText,
    headerTitleStyle: {
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.lg,
    },
    headerBackTitleVisible: false,
    animation: 'slide_from_right',
  };

  return (
    <ErrorBoundary
      onError={handleAppError}
      fallback={ErrorFallback}
      showDetails={Config.IS_DEVELOPMENT}
      showHomeButton={true}>
      <GameProvider>
        <NavigationContainer
          onReady={() => {
            logger.debug('Navigation ready');
            analytics.trackEvent('navigation_ready');
          }}
          onStateChange={(state) => {
            if (Config.IS_DEVELOPMENT) {
              logger.debug('Navigation state changed', { state });
            }
          }}>
          <Stack.Navigator 
            initialRouteName="Landing"
            screenOptions={screenOptions}>
            <Stack.Screen 
              name="Landing" 
              component={LandingScreen} 
              options={{ 
                headerShown: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                headerShown: false,
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen 
              name="OnlineMultiplayer" 
              component={OnlineMultiplayerScreen}
              options={{ 
                title: 'Online Multiplayer',
                headerBackTitle: 'Home',
              }}
            />
            <Stack.Screen 
              name="Computer" 
              component={ComputerScreen}
              options={{ 
                title: 'vs Computer',
                headerBackTitle: 'Home',
              }}
            />
            <Stack.Screen 
              name="Game" 
              component={GameScreen}
              options={({ route }) => ({
                title: route.params?.title || 'Game',
                headerLeft: null, // Prevent going back during active game
                gestureEnabled: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </ErrorBoundary>
  );
}

// Development-only components
if (Config.IS_DEVELOPMENT && Config.DEV.ENABLE_DEBUG_MENU) {
  // You can add debug overlay components here
  // For example: Flipper, Reactotron, or custom debug tools
}