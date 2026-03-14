import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

let BlurView = null;
if (Platform.OS === 'ios') {
  try {
    BlurView = require('@react-native-community/blur').BlurView;
  } catch (e) {
    // BlurView not available, will use fallback
  }
}

const BlurOverlay = ({ visible }) => {
  if (!visible) return null;

  if (Platform.OS === 'ios' && BlurView) {
    return (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
      />
    );
  }

  // Fallback for Android and Web (or iOS without blur package)
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.fallbackBlur
      ]}
    />
  );
};

const styles = StyleSheet.create({
  fallbackBlur: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
});

export default BlurOverlay; 