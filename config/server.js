
export const BASE_URL = 'http://192.168.20.168';
// WebSocket configuration
export const WS_PORT = 9000;
export const WS_SERVER_URL =  BASE_URL + ':' + WS_PORT + '/ws';
export const WS_TOPIC_PUBLIC = '/topic/public';
export const WS_APP_PREFIX = '/app';
export const WS_CHAT_SEND = '/chat.send';
export const WS_CREATE_ROOM = '/room.create';
export const WS_JOIN_ROOM = '/room.join';
export const WS_LEAVE_ROOM = '/room.leave';

// API endpoints
export const SERVER_PORT = 8080;
export const SERVER_URL = BASE_URL + ':' + SERVER_PORT;
export const API_ENDPOINTS = {
  LOGIN: `${SERVER_URL}/api/auth/login`,
  REGISTER: `${SERVER_URL}/api/auth/register`,
  CREATE_ROOM: `${SERVER_URL}/api/rooms/create`,
  JOIN_ROOM: `${SERVER_URL}/api/rooms/join`,
  GET_ROOM: (code) => `${SERVER_URL}/api/rooms/${code}`
};