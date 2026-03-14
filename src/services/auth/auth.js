import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const TOKEN_TYPE_KEY = '@token_type';
const TOKEN_EXPIRY_KEY = '@token_expiry';
const USER_KEY = '@user';

export const saveAuthTokens = async (tokenResponse) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, tokenResponse.accessToken],
      [REFRESH_TOKEN_KEY, tokenResponse.refreshToken],
      [TOKEN_TYPE_KEY, tokenResponse.tokenType],
      [TOKEN_EXPIRY_KEY, tokenResponse.expiresIn.toString()],
    ]);
  } catch (error) {
    console.error('Error saving auth tokens:', error);
    throw error;
  }
};

export const getAuthTokens = async () => {
  try {
    const [accessToken, refreshToken, tokenType, expiresIn] = await AsyncStorage.multiGet([
      TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      TOKEN_TYPE_KEY,
      TOKEN_EXPIRY_KEY,
    ]);

    return {
      accessToken: accessToken[1],
      refreshToken: refreshToken[1],
      tokenType: tokenType[1],
      expiresIn: expiresIn[1] ? parseInt(expiresIn[1]) : null,
    };
  } catch (error) {
    console.error('Error getting auth tokens:', error);
    return null;
  }
};

export const clearAuthTokens = async () => {
  try {
    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      TOKEN_TYPE_KEY,
      TOKEN_EXPIRY_KEY,
      USER_KEY,
    ]);
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
    throw error;
  }
};

export const saveUser = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  try {
    const tokens = await getAuthTokens();
    if (!tokens?.accessToken) return false;

    // Check if token is expired
    const expiryTime = tokens.expiresIn;
    if (!expiryTime) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime < expiryTime;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}; 