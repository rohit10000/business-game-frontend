import { Platform } from 'react-native';
import Config from '../../config/environment';
import { logger } from '../logging/logger';

class AnalyticsService {
  constructor() {
    this.isEnabled = Config.FEATURE_FLAGS.ENABLE_ANALYTICS;
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.deviceInfo = this.getDeviceInfo();
    this.eventQueue = [];
    this.isInitialized = false;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getDeviceInfo() {
    return {
      platform: Platform.OS,
      platformVersion: Platform.Version,
      appVersion: Config.APP.APP_VERSION,
      timestamp: new Date().toISOString(),
    };
  }

  async initialize(userId = null) {
    if (!this.isEnabled) {
      logger.debug('Analytics disabled, skipping initialization');
      return;
    }

    try {
      this.userId = userId;
      this.isInitialized = true;
      
      // Track app start
      this.trackEvent('app_started', {
        sessionId: this.sessionId,
        ...this.deviceInfo,
      });

      logger.info('Analytics service initialized', { userId, sessionId: this.sessionId });
    } catch (error) {
      logger.error('Failed to initialize analytics', error);
    }
  }

  setUserId(userId) {
    this.userId = userId;
    this.trackEvent('user_identified', { userId });
  }

  trackEvent(eventName, properties = {}) {
    if (!this.isEnabled) return;

    const event = {
      eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: new Date().toISOString(),
        ...this.deviceInfo,
      },
    };

    this.eventQueue.push(event);
    
    if (Config.IS_DEVELOPMENT) {
      logger.debug('Analytics event tracked', event);
    }

    // In a real app, you would send this to your analytics service
    this.flushEvents();
  }

  trackScreen(screenName, properties = {}) {
    this.trackEvent('screen_view', {
      screenName,
      ...properties,
    });
  }

  trackGameEvent(eventType, gameData = {}) {
    this.trackEvent('game_event', {
      eventType,
      ...gameData,
    });
  }

  trackUserInteraction(action, element, properties = {}) {
    this.trackEvent('user_interaction', {
      action,
      element,
      ...properties,
    });
  }

  trackError(error, context = {}) {
    this.trackEvent('error_occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      errorName: error.name,
      ...context,
    });
  }

  trackPerformance(metricName, value, unit = 'ms') {
    this.trackEvent('performance_metric', {
      metricName,
      value,
      unit,
    });
  }

  async flushEvents() {
    if (this.eventQueue.length === 0) return;

    try {
      if (Config.IS_DEVELOPMENT) {
        // In development, just log the events
        logger.debug('Analytics events to send', { count: this.eventQueue.length });
        this.eventQueue = [];
        return;
      }

      // In production, send to analytics endpoint
      const events = [...this.eventQueue];
      this.eventQueue = [];

      const response = await fetch(`${Config.API.BASE_URL}/api/analytics/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API returned ${response.status}`);
      }

      logger.debug('Analytics events sent successfully', { count: events.length });
    } catch (error) {
      logger.error('Failed to send analytics events', error);
      // Re-add events to queue for retry (implement retry logic as needed)
    }
  }

  // Game-specific tracking methods
  trackGameStart(gameMode, playerCount, roomId = null) {
    this.trackGameEvent('game_started', {
      gameMode,
      playerCount,
      roomId,
    });
  }

  trackGameEnd(gameMode, duration, winner, playerStats) {
    this.trackGameEvent('game_ended', {
      gameMode,
      duration,
      winner,
      playerStats,
    });
  }

  trackPlayerAction(action, actionData = {}) {
    this.trackGameEvent('player_action', {
      action,
      ...actionData,
    });
  }

  trackRoomAction(action, roomData = {}) {
    this.trackGameEvent('room_action', {
      action,
      ...roomData,
    });
  }

  trackConnectionEvent(eventType, connectionData = {}) {
    this.trackEvent('connection_event', {
      eventType,
      ...connectionData,
    });
  }

  // User journey tracking
  trackOnboarding(step, completed = false) {
    this.trackEvent('onboarding', {
      step,
      completed,
    });
  }

  trackFeatureUsage(featureName, properties = {}) {
    this.trackEvent('feature_usage', {
      featureName,
      ...properties,
    });
  }

  // Session management
  startSession() {
    this.sessionId = this.generateSessionId();
    this.trackEvent('session_started', {
      sessionId: this.sessionId,
    });
  }

  endSession() {
    this.trackEvent('session_ended', {
      sessionId: this.sessionId,
    });
    this.flushEvents();
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// React hook for analytics
export const useAnalytics = () => {
  const trackScreenView = (screenName, properties = {}) => {
    analytics.trackScreen(screenName, properties);
  };

  const trackButtonPress = (buttonName, properties = {}) => {
    analytics.trackUserInteraction('button_press', buttonName, properties);
  };

  const trackFormSubmission = (formName, success = true, properties = {}) => {
    analytics.trackUserInteraction('form_submit', formName, {
      success,
      ...properties,
    });
  };

  return {
    trackScreenView,
    trackButtonPress,
    trackFormSubmission,
    trackGameEvent: analytics.trackGameEvent.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
  };
};

export default analytics;