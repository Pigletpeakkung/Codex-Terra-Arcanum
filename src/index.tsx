/**
 * =============================================================================
 * THANATSITT PORTFOLIO - REACT TYPESCRIPT WITH GSAP
 * Main application entry point with enhanced animations
 * =============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Styles
import './styles/index.css';
import './styles/animations.css';
import './styles/components.css';

// Components
import App from './App';
import ErrorFallback from './components/common/ErrorFallback';

// Utils
import { initializeAnalytics } from './utils/analytics';
import { registerServiceWorker } from './utils/serviceWorker';

/**
 * Initialize application services
 */
const initializeApp = async () => {
  try {
    // Initialize analytics
    await initializeAnalytics();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      await registerServiceWorker();
    }
    
    console.log('✅ Application services initialized');
  } catch (error) {
    console.error('❌ Failed to initialize app services:', error);
  }
};

/**
 * Error handler for the error boundary
 */
const handleError = (error: Error, errorInfo: { componentStack: string }) => {
  console.error('Application Error:', error);
  console.error('Component Stack:', errorInfo.componentStack);
  
  // Track error in analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false
    });
  }
};

/**
 * Main application wrapper with providers
 */
const AppWrapper: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

/**
 * Render application
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// Initialize app services
initializeApp();

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  import('./utils/performance').then(({ startPerformanceMonitoring }) => {
    startPerformanceMonitoring();
  });
}
