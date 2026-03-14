import { InteractionManager } from 'react-native';
import { logger } from '../logging/logger';
import { analytics } from './analytics';
import Config from '../../config/environment';

class PerformanceMonitor {
  constructor() {
    this.isEnabled = Config.DEV.SHOW_PERFORMANCE_METRICS;
    this.metrics = new Map();
    this.watchers = new Map();
    this.thresholds = {
      renderTime: 16, // 60fps = ~16ms per frame
      apiResponseTime: 2000, // 2 seconds
      asyncOperationTime: 5000, // 5 seconds
      memoryUsage: 100 * 1024 * 1024, // 100MB
    };
  }

  // Performance timing utilities
  startTiming(label) {
    if (!this.isEnabled) return null;

    const startTime = Date.now();
    this.metrics.set(label, { startTime, type: 'timing' });
    
    return {
      end: () => this.endTiming(label),
      label,
    };
  }

  endTiming(label) {
    if (!this.isEnabled) return;

    const metric = this.metrics.get(label);
    if (!metric || metric.type !== 'timing') {
      logger.warn('Performance timing not found or invalid', { label });
      return;
    }

    const endTime = Date.now();
    const duration = endTime - metric.startTime;
    
    this.recordMetric(label, duration, 'ms');
    this.metrics.delete(label);

    // Check against thresholds
    this.checkThreshold(label, duration);

    return duration;
  }

  recordMetric(name, value, unit = 'ms') {
    if (!this.isEnabled) return;

    const metric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
    };

    logger.debug('Performance metric recorded', metric);
    
    if (Config.FEATURE_FLAGS.ENABLE_ANALYTICS) {
      analytics.trackPerformance(name, value, unit);
    }
  }

  checkThreshold(metricName, value) {
    const threshold = this.thresholds[metricName];
    if (threshold && value > threshold) {
      logger.warn('Performance threshold exceeded', {
        metric: metricName,
        value,
        threshold,
        unit: 'ms',
      });

      analytics.trackEvent('performance_threshold_exceeded', {
        metric: metricName,
        value,
        threshold,
      });
    }
  }

  // React component performance monitoring
  measureComponentRender(componentName) {
    return {
      onRenderStart: () => this.startTiming(`${componentName}_render`),
      onRenderEnd: () => this.endTiming(`${componentName}_render`),
    };
  }

  // API performance monitoring
  measureApiCall(endpoint, method = 'GET') {
    const label = `api_${method}_${endpoint}`;
    const timer = this.startTiming(label);

    return {
      end: (success = true, statusCode = null) => {
        const duration = timer.end();
        
        this.recordMetric(`${label}_success`, success ? 1 : 0, 'boolean');
        if (statusCode) {
          this.recordMetric(`${label}_status_${statusCode}`, 1, 'count');
        }

        return duration;
      },
    };
  }

  // Async operation monitoring
  measureAsyncOperation(operationName) {
    const label = `async_${operationName}`;
    return this.startTiming(label);
  }

  // Memory usage monitoring
  startMemoryMonitoring(interval = 10000) {
    if (!this.isEnabled) return;

    const watcherId = setInterval(() => {
      // Note: React Native doesn't have direct memory access
      // This is a placeholder for when using performance monitoring libraries
      if (global.performance && global.performance.memory) {
        const memory = global.performance.memory;
        this.recordMetric('memory_used', memory.usedJSHeapSize, 'bytes');
        this.recordMetric('memory_total', memory.totalJSHeapSize, 'bytes');
        
        this.checkThreshold('memoryUsage', memory.usedJSHeapSize);
      }
    }, interval);

    this.watchers.set('memory', watcherId);
  }

  stopMemoryMonitoring() {
    const watcherId = this.watchers.get('memory');
    if (watcherId) {
      clearInterval(watcherId);
      this.watchers.delete('memory');
    }
  }

  // Frame rate monitoring
  startFrameRateMonitoring() {
    if (!this.isEnabled) return;

    let frameCount = 0;
    let lastTime = Date.now();

    const measureFrameRate = () => {
      frameCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        this.recordMetric('fps', fps, 'fps');
        
        if (fps < 30) {
          logger.warn('Low frame rate detected', { fps });
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrameRate);
    };

    requestAnimationFrame(measureFrameRate);
  }

  // Bundle size and loading performance
  measureBundleLoadTime() {
    if (!this.isEnabled) return;

    const navigationStart = Date.now();
    
    InteractionManager.runAfterInteractions(() => {
      const loadTime = Date.now() - navigationStart;
      this.recordMetric('bundle_load_time', loadTime, 'ms');
    });
  }

  // Network performance monitoring
  measureNetworkLatency() {
    if (!this.isEnabled) return Promise.resolve();

    const startTime = Date.now();
    
    return fetch(`${Config.API.BASE_URL}/api/health`, {
      method: 'HEAD',
      timeout: 5000,
    })
      .then(() => {
        const latency = Date.now() - startTime;
        this.recordMetric('network_latency', latency, 'ms');
        return latency;
      })
      .catch((error) => {
        logger.error('Network latency measurement failed', error);
        return null;
      });
  }

  // Performance summary
  getPerformanceSummary() {
    if (!this.isEnabled) return null;

    const summary = {
      totalMetrics: this.metrics.size,
      activeWatchers: this.watchers.size,
      timestamp: Date.now(),
    };

    logger.info('Performance summary', summary);
    return summary;
  }

  // Cleanup
  cleanup() {
    this.watchers.forEach((watcherId) => {
      clearInterval(watcherId);
    });
    this.watchers.clear();
    this.metrics.clear();
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hooks for performance monitoring
export const usePerformanceMonitor = () => {
  const measureRender = (componentName) => {
    const { onRenderStart, onRenderEnd } = performanceMonitor.measureComponentRender(componentName);
    
    React.useEffect(() => {
      onRenderStart();
      return onRenderEnd;
    });
  };

  const measureAsyncOperation = (operationName, operation) => {
    return async (...args) => {
      const timer = performanceMonitor.measureAsyncOperation(operationName);
      try {
        const result = await operation(...args);
        timer.end();
        return result;
      } catch (error) {
        timer.end();
        throw error;
      }
    };
  };

  return {
    measureRender,
    measureAsyncOperation,
    startTiming: performanceMonitor.startTiming.bind(performanceMonitor),
    recordMetric: performanceMonitor.recordMetric.bind(performanceMonitor),
  };
};

// Higher-order component for performance monitoring
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return React.memo((props) => {
    const renderTimer = performanceMonitor.measureComponentRender(componentName || WrappedComponent.name);
    
    React.useEffect(() => {
      renderTimer.onRenderStart();
      return renderTimer.onRenderEnd;
    });

    return <WrappedComponent {...props} />;
  });
};

export default performanceMonitor;