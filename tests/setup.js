// Jest setup for DOM testing
import 'jest-environment-jsdom';

// Mock Alpine.js
global.Alpine = {
  data: jest.fn(),
  start: jest.fn(),
};

// Mock external APIs
global.emailjs = {
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200 }),
};

global.AOS = {
  init: jest.fn(),
  refresh: jest.fn(),
};

// Mock analytics
global.gtag = jest.fn();
global.fbq = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
