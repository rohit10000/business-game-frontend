
// Legacy server configuration - deprecated
// Use src/config/environment.js for new configurations

import Config from './environment';

// Maintain backward compatibility with existing code
export const BASE_URL = Config.API.BASE_URL;

// WebSocket configuration
export const WS_PORT = 9000;
export const WS_SERVER_URL = Config.WEBSOCKET.URL;
export const WS_TOPIC_PUBLIC = '/topic/public';
export const WS_APP_PREFIX = '/app';
export const WS_CHAT_SEND = '/chat.send';
export const WS_CREATE_ROOM = '/room.create';
export const WS_JOIN_ROOM = '/room.join';
export const WS_LEAVE_ROOM = '/room.leave';

// API endpoints
export const SERVER_PORT = 8080;
export const SERVER_URL = Config.API.BASE_URL;
export const API_ENDPOINTS = {
  LOGIN: Config.API.BASE_URL + Config.API.ENDPOINTS.AUTH.LOGIN,
  REGISTER: Config.API.BASE_URL + Config.API.ENDPOINTS.AUTH.REGISTER,
  CREATE_ROOM: Config.API.BASE_URL + Config.API.ENDPOINTS.ROOMS.CREATE,
  JOIN_ROOM: Config.API.BASE_URL + Config.API.ENDPOINTS.ROOMS.JOIN,
  GET_ROOM: (code) => `${Config.API.BASE_URL}/api/rooms/${code}`,
  REFRESH_TOKEN: Config.API.BASE_URL + Config.API.ENDPOINTS.AUTH.REFRESH,
  LEAVE_ROOM: Config.API.BASE_URL + Config.API.ENDPOINTS.ROOMS.LEAVE,
};