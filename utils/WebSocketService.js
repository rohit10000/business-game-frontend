import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WS_SERVER_URL, WS_APP_PREFIX, WS_CHAT_SEND, WS_CHAT_ADD_USER } from '../config/server';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.listeners = [];
  }

  connect(username, code, onConnect, onError, onClose) {
    console.log('Connecting to WebSocket:', WS_SERVER_URL);
    const socket = new SockJS(WS_SERVER_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('WebSocket connected successfully');
        this.connected = true;
        // Subscribe to room-specific topic with room code as payload
        console.log('Subscribing to room topic with code:', code);
        this.stompClient.subscribe("/topic/room." + code, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);
          this.listeners.forEach(callback => callback(receivedMessage));
        });
        if (onConnect) onConnect();
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        if (onError) onError(frame);
      },
      onWebSocketClose: () => {
        console.log('WebSocket connection closed');
        this.connected = false;
        if (onClose) onClose();
      }
    });

    this.stompClient.activate();
  }

  sendMessage(message, endpoint = WS_CHAT_SEND) {
    const destination = `${WS_APP_PREFIX}${endpoint}`;
    if (this.connected && this.stompClient) {
      console.log('Sending message to:', destination, message);
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message)
      });
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }

  disconnect() {
    if (this.stompClient) {
      console.log('Disconnecting WebSocket');
      this.stompClient.deactivate();
      this.stompClient = null;
      this.connected = false;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  isConnected() {
    return this.connected;
  }
}

const wsService = new WebSocketService();
export default wsService; 