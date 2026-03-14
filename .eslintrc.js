module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  rules: {
    // Disable some strict rules for easier development
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off', // Allow console for debugging
    'prettier/prettier': 'off', // Disable prettier integration for now
  },
};