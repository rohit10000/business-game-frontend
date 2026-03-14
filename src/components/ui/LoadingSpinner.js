import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({ 
  size = 'large', 
  color = '#1a75ff', 
  message = 'Loading...', 
  overlay = false,
  transparent = false 
}) => {
  const containerStyle = [
    styles.container,
    overlay && styles.overlay,
    transparent && styles.transparent
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const LoadingOverlay = ({ visible, ...props }) => {
  if (!visible) return null;
  return <LoadingSpinner overlay transparent {...props} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export { LoadingSpinner, LoadingOverlay };
export default LoadingSpinner;