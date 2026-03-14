import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

// Common style utilities
export const createStyles = (styleFunction) => {
  return StyleSheet.create(styleFunction(theme));
};

// Helper functions for responsive design
export const responsive = {
  width: (percentage) => `${percentage}%`,
  height: (percentage) => `${percentage}%`,
  
  // Responsive font sizes
  fontSize: (size) => {
    const { layout, typography } = theme;
    const baseSize = typography.fontSize[size] || size;
    
    if (layout.isSmallScreen) {
      return Math.max(baseSize * 0.9, 12);
    }
    if (layout.isLargeScreen) {
      return baseSize * 1.1;
    }
    return baseSize;
  },
  
  // Responsive spacing
  spacing: (space) => {
    const { layout, spacing } = theme;
    const baseSpacing = spacing[space] || space;
    
    if (layout.isSmallScreen) {
      return baseSpacing * 0.8;
    }
    if (layout.isLargeScreen) {
      return baseSpacing * 1.2;
    }
    return baseSpacing;
  },
};

// Common layout styles
export const commonStyles = StyleSheet.create({
  // Flex layouts
  flex1: {
    flex: 1,
  },
  
  flexRow: {
    flexDirection: 'row',
  },
  
  flexColumn: {
    flexDirection: 'column',
  },
  
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  flexBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  flexAround: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  flexStart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  
  // Containers
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    paddingTop: theme.layout.safeArea.top,
    paddingBottom: theme.layout.safeArea.bottom,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.default,
  },
  
  paddedContainer: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.default,
  },
  
  // Cards and surfaces
  card: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  
  surface: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  
  // Buttons
  button: {
    height: theme.layout.buttonHeight,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: theme.colors.primary.main,
  },
  
  buttonSecondary: {
    backgroundColor: theme.colors.secondary.main,
  },
  
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
  },
  
  buttonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary.contrastText,
  },
  
  buttonTextOutlined: {
    color: theme.colors.primary.main,
  },
  
  // Inputs
  input: {
    height: theme.layout.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.paper,
  },
  
  inputFocused: {
    borderColor: theme.colors.primary.main,
    ...theme.shadows.sm,
  },
  
  inputError: {
    borderColor: theme.colors.error.main,
  },
  
  // Text styles
  textPrimary: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.regular,
  },
  
  textSecondary: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
  },
  
  textHeading: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  textSubheading: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    fontWeight: theme.typography.fontWeight.medium,
  },
  
  textCaption: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.regular,
  },
  
  textCenter: {
    textAlign: 'center',
  },
  
  textBold: {
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  // Spacing utilities
  marginTop: {
    marginTop: theme.spacing.md,
  },
  
  marginBottom: {
    marginBottom: theme.spacing.md,
  },
  
  marginHorizontal: {
    marginHorizontal: theme.spacing.md,
  },
  
  marginVertical: {
    marginVertical: theme.spacing.md,
  },
  
  paddingTop: {
    paddingTop: theme.spacing.md,
  },
  
  paddingBottom: {
    paddingBottom: theme.spacing.md,
  },
  
  paddingHorizontal: {
    paddingHorizontal: theme.spacing.md,
  },
  
  paddingVertical: {
    paddingVertical: theme.spacing.md,
  },
  
  // Border utilities
  border: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
  },
  
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey[300],
  },
  
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
  
  // Position utilities
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },
  
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // Visibility utilities
  hidden: {
    opacity: 0,
  },
  
  visible: {
    opacity: 1,
  },
  
  // Game-specific styles
  gameBoard: {
    backgroundColor: theme.colors.game.board.background,
    borderColor: theme.colors.game.board.border,
    borderWidth: 2,
    borderRadius: theme.borderRadius.lg,
  },
  
  gameCell: {
    backgroundColor: theme.colors.game.board.cell,
    borderColor: theme.colors.game.board.cellBorder,
    borderWidth: 1,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  playerToken: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  
  moneyText: {
    color: theme.colors.game.money,
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  propertyText: {
    color: theme.colors.game.property,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

// Utility functions for creating styles
export const createButtonStyle = (variant = 'primary', size = 'medium') => {
  const baseStyle = commonStyles.button;
  let variantStyle = {};
  let sizeStyle = {};
  
  switch (variant) {
    case 'primary':
      variantStyle = commonStyles.buttonPrimary;
      break;
    case 'secondary':
      variantStyle = commonStyles.buttonSecondary;
      break;
    case 'outlined':
      variantStyle = commonStyles.buttonOutlined;
      break;
  }
  
  switch (size) {
    case 'small':
      sizeStyle = { height: 36, paddingHorizontal: theme.spacing.md };
      break;
    case 'large':
      sizeStyle = { height: 56, paddingHorizontal: theme.spacing.xl };
      break;
  }
  
  return [baseStyle, variantStyle, sizeStyle];
};

export const createTextStyle = (variant = 'body', color = 'primary') => {
  let baseStyle = commonStyles.textPrimary;
  
  switch (variant) {
    case 'heading':
      baseStyle = commonStyles.textHeading;
      break;
    case 'subheading':
      baseStyle = commonStyles.textSubheading;
      break;
    case 'caption':
      baseStyle = commonStyles.textCaption;
      break;
  }
  
  let colorStyle = {};
  if (color !== 'primary') {
    colorStyle = { color: theme.colors.text[color] || color };
  }
  
  return [baseStyle, colorStyle];
};

export const createSpacingStyle = (type, size) => {
  const spacing = theme.spacing[size] || size;
  
  switch (type) {
    case 'margin':
      return { margin: spacing };
    case 'marginTop':
      return { marginTop: spacing };
    case 'marginBottom':
      return { marginBottom: spacing };
    case 'marginHorizontal':
      return { marginHorizontal: spacing };
    case 'marginVertical':
      return { marginVertical: spacing };
    case 'padding':
      return { padding: spacing };
    case 'paddingTop':
      return { paddingTop: spacing };
    case 'paddingBottom':
      return { paddingBottom: spacing };
    case 'paddingHorizontal':
      return { paddingHorizontal: spacing };
    case 'paddingVertical':
      return { paddingVertical: spacing };
    default:
      return {};
  }
};

export default commonStyles;