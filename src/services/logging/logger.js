import React from 'react';
import { Platform } from 'react-native';

class Logger {
  constructor() {
    this.isDevelopment = __DEV__;
    this.logLevel = this.isDevelopment ? 'debug' : 'error';
    this.logs = [];
    this.maxLogs = 1000;
  }

  setLogLevel(level) {
    this.logLevel = level;
  }

  shouldLog(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  formatMessage(level, message, context = {}) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      context,
      stack: new Error().stack
    };
  }

  addToHistory(logEntry) {
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message, context = {}) {
    if (!this.shouldLog('debug')) return;
    
    const logEntry = this.formatMessage('debug', message, context);
    this.addToHistory(logEntry);
    
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, context);
    }
  }

  info(message, context = {}) {
    if (!this.shouldLog('info')) return;
    
    const logEntry = this.formatMessage('info', message, context);
    this.addToHistory(logEntry);
    
    console.info(`[INFO] ${message}`, context);
  }

  warn(message, context = {}) {
    if (!this.shouldLog('warn')) return;
    
    const logEntry = this.formatMessage('warn', message, context);
    this.addToHistory(logEntry);
    
    console.warn(`[WARN] ${message}`, context);
  }

  error(message, error = null, context = {}) {
    const errorContext = {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null
    };
    
    const logEntry = this.formatMessage('error', message, errorContext);
    this.addToHistory(logEntry);
    
    console.error(`[ERROR] ${message}`, errorContext);
    
    if (this.onError) {
      this.onError(logEntry);
    }
  }

  setErrorHandler(handler) {
    this.onError = handler;
  }

  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  async sendLogs(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logs: this.logs,
          timestamp: new Date().toISOString(),
          device: {
            platform: Platform.OS,
            version: Platform.Version
          }
        })
      });
      
      if (response.ok) {
        this.info('Logs sent successfully');
        return true;
      } else {
        this.error('Failed to send logs', null, { status: response.status });
        return false;
      }
    } catch (error) {
      this.error('Error sending logs', error);
      return false;
    }
  }
}

export const logger = new Logger();

export const withLogging = (component, componentName) => {
  return class extends React.Component {
    componentDidMount() {
      logger.debug(`${componentName} mounted`);
    }

    componentWillUnmount() {
      logger.debug(`${componentName} unmounted`);
    }

    componentDidCatch(error, errorInfo) {
      logger.error(`Error in ${componentName}`, error, { errorInfo });
    }

    render() {
      return React.createElement(component, this.props);
    }
  };
};

export default logger;