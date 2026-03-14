import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Color palette
export const colors = {
  // Primary colors
  primary: {
    main: '#1a75ff',
    light: '#4d94ff',
    dark: '#0052cc',
    contrastText: '#ffffff',
  },
  
  // Secondary colors
  secondary: {
    main: '#6c757d',
    light: '#adb5bd',
    dark: '#495057',
    contrastText: '#ffffff',
  },
  
  // Semantic colors
  success: {
    main: '#28a745',
    light: '#71dd8a',
    dark: '#1e7e34',
    contrastText: '#ffffff',
  },
  
  error: {
    main: '#dc3545',
    light: '#f1b2b5',
    dark: '#bd2130',
    contrastText: '#ffffff',
  },
  
  warning: {
    main: '#ffc107',
    light: '#ffeb3b',
    dark: '#ff8f00',
    contrastText: '#000000',
  },
  
  info: {
    main: '#17a2b8',
    light: '#58d3e5',
    dark: '#138496',
    contrastText: '#ffffff',
  },
  
  // Neutral colors
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Background colors
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    disabled: '#f5f5f5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd',
    hint: '#9e9e9e',
    inverse: '#ffffff',
  },
  
  // Game-specific colors
  game: {
    playerColors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'
    ],
    board: {
      background: '#f8f9fa',
      border: '#dee2e6',
      cell: '#ffffff',
      cellBorder: '#e9ecef',
    },
    money: '#28a745',
    property: '#17a2b8',
  },
  
  // Status colors
  status: {
    online: '#28a745',
    offline: '#6c757d',
    away: '#ffc107',
    busy: '#dc3545',
  },
};

// Typography
export const typography = {
  fontFamily: {
    regular: Platform.select({
      ios: 'SF Pro Text',
      android: 'Roboto',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'SF Pro Text Medium',
      android: 'Roboto Medium',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'SF Pro Text Bold',
      android: 'Roboto Bold',
      default: 'System',
    }),
    monospace: Platform.select({
      ios: 'SF Mono',
      android: 'Roboto Mono',
      default: 'monospace',
    }),
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Layout
export const layout = {
  screenWidth,
  screenHeight,
  isSmallScreen: screenWidth < 375,
  isMediumScreen: screenWidth >= 375 && screenWidth < 768,
  isLargeScreen: screenWidth >= 768,
  
  // Safe areas
  safeArea: {
    top: Platform.select({ ios: 44, android: 0 }),
    bottom: Platform.select({ ios: 34, android: 0 }),
  },
  
  // Common dimensions
  headerHeight: 56,
  tabBarHeight: Platform.select({ ios: 83, android: 56 }),
  buttonHeight: 48,
  inputHeight: 48,
  
  // Breakpoints
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

// Animation timing
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Z-index levels
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
  zIndex,
};

export default theme;