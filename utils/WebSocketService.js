class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = [];
  }

  connect(url, onOpen, onError, onClose) {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      if (onOpen) onOpen();
    };
    this.ws.onerror = (e) => {
      if (onError) onError(e);
    };
    this.ws.onclose = (e) => {
      if (onClose) onClose(e);
    };
    this.ws.onmessage = (event) => {
      this.listeners.forEach((cb) => cb(event.data));
    };
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }
}

const wsService = new WebSocketService();
export default wsService; 