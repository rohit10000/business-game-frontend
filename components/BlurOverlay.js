import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const BlurOverlay = ({ visible }) => {
  if (!visible) return null;

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
      />
    );
  }

  // Fallback for Android
  return (
    <View 
      style={[
        StyleSheet.absoluteFill,
        styles.androidBlur
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  androidBlur: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
});

export default BlurOverlay; 