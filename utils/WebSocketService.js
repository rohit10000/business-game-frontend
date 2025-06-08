import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WS_SERVER_URL, WS_TOPIC_PUBLIC, WS_APP_PREFIX, WS_CHAT_SEND, WS_CHAT_ADD_USER } from '../config/server';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.listeners = [];
    this.connected = false;
  }

  connect(username, code, onConnect, onError, onClose) {
    const socket = new SockJS(WS_SERVER_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        this.connected = true;
        // Subscribe to public topic
        this.stompClient.subscribe(WS_TOPIC_PUBLIC, (message) => {
          const receivedMessage = JSON.parse(message.body);
          this.listeners.forEach(callback => callback(receivedMessage));
        });

        // Send add user message
        this.sendMessage({
          type: 'JOIN',
          from: username,
          code: code,
          text: `${username} joined!`
        }, WS_CHAT_ADD_USER);

        if (onConnect) onConnect();
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        if (onError) onError(frame);
      },
      onWebSocketClose: () => {
        this.connected = false;
        if (onClose) onClose();
      }
    });

    this.stompClient.activate();
  }

  sendMessage(message, destination = WS_CHAT_SEND) {
    if (this.connected && this.stompClient) {
      this.stompClient.publish({
        destination: `${WS_APP_PREFIX}${destination}`,
        body: JSON.stringify(message)
      });
    }
  }

  disconnect() {
    if (this.stompClient) {
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