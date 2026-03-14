import { Platform } from 'react-native';

const isDevelopment = __DEV__;
const isProduction = !__DEV__;

// Environment-specific configurations
const environments = {
  development: {
    API_BASE_URL: 'http://192.168.1.100:8080',
    WEBSOCKET_URL: 'http://192.168.1.100:9000/ws',
    LOG_LEVEL: 'debug',
    ENABLE_LOGGING: true,
    ENABLE_CRASHLYTICS: false,
    WEBSOCKET_RECONNECT_ATTEMPTS: 5,
    WEBSOCKET_RECONNECT_DELAY: 1000,
    API_TIMEOUT: 10000,
    CACHE_ENABLED: true,
    ANALYTICS_ENABLED: false,
  },
  production: {
    API_BASE_URL: 'https://api.yourgame.com',
    WEBSOCKET_URL: 'https://ws.yourgame.com/ws',
    LOG_LEVEL: 'error',
    ENABLE_LOGGING: true,
    ENABLE_CRASHLYTICS: true,
    WEBSOCKET_RECONNECT_ATTEMPTS: 3,
    WEBSOCKET_RECONNECT_DELAY: 2000,
    API_TIMEOUT: 15000,
    CACHE_ENABLED: true,
    ANALYTICS_ENABLED: true,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.yourgame.com',
    WEBSOCKET_URL: 'https://staging-ws.yourgame.com/ws',
    LOG_LEVEL: 'info',
    ENABLE_LOGGING: true,
    ENABLE_CRASHLYTICS: true,
    WEBSOCKET_RECONNECT_ATTEMPTS: 5,
    WEBSOCKET_RECONNECT_DELAY: 1500,
    API_TIMEOUT: 12000,
    CACHE_ENABLED: true,
    ANALYTICS_ENABLED: true,
  }
};

// Get current environment
const getCurrentEnvironment = () => {
  // You can override this with environment variables or build configurations
  if (isProduction) {
    return 'production';
  }
  return 'development';
};

const currentEnv = getCurrentEnvironment();
const config = environments[currentEnv];

// Platform-specific overrides
const platformConfig = {
  ...config,
  PLATFORM: Platform.OS,
  PLATFORM_VERSION: Platform.Version,
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
};

// Feature flags
const featureFlags = {
  ENABLE_COMPUTER_MODE: true,
  ENABLE_MULTIPLAYER: true,
  ENABLE_VOICE_CHAT: false,
  ENABLE_VIDEO_CALLS: false,
  ENABLE_IN_APP_PURCHASES: false,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_BETA_FEATURES: isDevelopment,
  ENABLE_DEBUG_MENU: isDevelopment,
};

// App configuration
const appConfig = {
  APP_NAME: 'Business Game',
  APP_VERSION: '1.0.0',
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 8,
  DEFAULT_GAME_DURATION: 3600, // 1 hour in seconds
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  SESSION_TIMEOUT: 1800000, // 30 minutes in milliseconds
  MAX_RECONNECT_ATTEMPTS: 3,
  STORAGE_ENCRYPTION_KEY: isDevelopment ? 'dev-key-123' : 'prod-encryption-key',
};

// API endpoints
const apiEndpoints = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  ROOMS: {
    CREATE: '/api/rooms/create',
    JOIN: '/api/rooms/join',
    LEAVE: '/api/rooms/leave',
    LIST: '/api/rooms/list',
  },
  GAME: {
    START: '/api/game/start',
    MOVE: '/api/game/move',
    STATE: '/api/game/state',
    END: '/api/game/end',
  },
  USER: {
    PROFILE: '/api/user/profile',
    STATS: '/api/user/stats',
    SETTINGS: '/api/user/settings',
  }
};

// WebSocket topics
const wsTopics = {
  ROOM: (roomCode) => `/topic/room.${roomCode}`,
  USER: (userId) => `/topic/user.${userId}`,
  GLOBAL: '/topic/global',
  GAME_UPDATES: (gameId) => `/topic/game.${gameId}`,
};

// Error configurations
const errorConfig = {
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  NETWORK_TIMEOUT: 30000,
  ERROR_REPORTING_ENABLED: isProduction,
  CRASH_REPORTING_ENABLED: isProduction,
};

// Development tools
const devConfig = {
  ENABLE_REDUX_DEVTOOLS: isDevelopment,
  ENABLE_FLIPPER: isDevelopment,
  ENABLE_REACTOTRON: isDevelopment,
  SHOW_PERFORMANCE_METRICS: isDevelopment,
  MOCK_API_CALLS: false,
};

export const Config = {
  ...platformConfig,
  ENVIRONMENT: currentEnv,
  IS_DEVELOPMENT: isDevelopment,
  IS_PRODUCTION: isProduction,
  FEATURE_FLAGS: featureFlags,
  APP: appConfig,
  API: {
    BASE_URL: platformConfig.API_BASE_URL,
    ENDPOINTS: apiEndpoints,
    TIMEOUT: platformConfig.API_TIMEOUT,
  },
  WEBSOCKET: {
    URL: platformConfig.WEBSOCKET_URL,
    TOPICS: wsTopics,
    RECONNECT_ATTEMPTS: platformConfig.WEBSOCKET_RECONNECT_ATTEMPTS,
    RECONNECT_DELAY: platformConfig.WEBSOCKET_RECONNECT_DELAY,
  },
  LOGGING: {
    LEVEL: platformConfig.LOG_LEVEL,
    ENABLED: platformConfig.ENABLE_LOGGING,
  },
  ERROR: errorConfig,
  DEV: devConfig,
};

// Helper functions
export const isFeatureEnabled = (featureName) => {
  return Config.FEATURE_FLAGS[featureName] || false;
};

export const getApiUrl = (endpoint) => {
  return `${Config.API.BASE_URL}${endpoint}`;
};

export const getWebSocketTopic = (topicName, identifier = null) => {
  if (typeof Config.WEBSOCKET.TOPICS[topicName] === 'function') {
    return Config.WEBSOCKET.TOPICS[topicName](identifier);
  }
  return Config.WEBSOCKET.TOPICS[topicName];
};

export default Config;