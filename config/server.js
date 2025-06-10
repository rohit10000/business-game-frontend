export const SERVER_URL = 'http://192.168.54.44:8080';

// WebSocket configuration
export const WS_SERVER_URL = 'http://192.168.54.44:9000/ws';
export const WS_TOPIC_PUBLIC = '/topic/public';
export const WS_APP_PREFIX = '/app';
export const WS_CHAT_SEND = '/chat.send';
export const WS_CHAT_ADD_USER = '/chat.addUser';

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${SERVER_URL}/api/auth/login`,
  REGISTER: `${SERVER_URL}/api/auth/register`,
  CREATE_ROOM: `${SERVER_URL}/api/rooms/create`,
  JOIN_ROOM: `${SERVER_URL}/api/rooms/join`,
}; 