import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Portfolio from './components/portfolio';
import './App.css';

// Loading Component
const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loading-content">
        {/* Animated Logo */}
        <motion.div
          className="loading-logo"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="logo-moon">
            <div className="moon-crater crater-1" />
            <div className="moon-crater crater-2" />
            <div className="moon-crater crater-3" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          className="loading-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Thanatsitt
        </motion.h1>

        {/* Loading Subtitle */}
        <motion.p
          className="loading-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Bridging Cultures, Creating Futures
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          className="loading-bar-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="loading-particles">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="loading-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <motion.div
              className="error-icon"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌙
            </motion.div>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">
              The portfolio encountered an unexpected error. Please refresh the page to try again.
            </p>
            <motion.button
              className="error-button"
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh Page
            </motion.button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Component
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading time and ensure all resources are loaded
    const loadingTimer = setTimeout(() => {
      setIsReady(true);
    }, 3000); // 3 seconds loading time

    // Additional loading completion after animations
    const completionTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Preload any critical assets here
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn('Resource preloading failed:', error);
      }
    };

    preloadResources();

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(completionTimer);
    };
  }, []);

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <ErrorBoundary>
      <div className="app">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="app-content"
            >
              <Portfolio />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Background Effects */}
        <div className="app-background">
          <div className="cosmic-gradient" />
          <div className="star-field">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
