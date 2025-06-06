// Global type definitions for your portfolio

// Alpine.js types
declare global {
  interface Window {
    Alpine: any;
    portfolioApp: () => any;
    CONFIG: {
      EMAILJS_PUBLIC_KEY: string;
      EMAILJS_SERVICE_ID: string;
      EMAILJS_TEMPLATE_ID: string;
      GA_TRACKING_ID: string;
      API_BASE_URL: string;
      ENABLE_ANALYTICS: boolean;
      ENABLE_SERVICE_WORKER: boolean;
      SOCIAL_LINKS: {
        linkedin: string;
        github: string;
        instagram: string;
        twitter: string;
      };
    };
    
    // Analytics
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    
    // EmailJS
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, data: any) => Promise<any>;
    };
    
    // AOS (Animate On Scroll)
    AOS: {
      init: (options?: any) => void;
      refresh: () => void;
    };
  }
  
  // Service Worker types
  interface ServiceWorkerGlobalScope {
    skipWaiting(): Promise<void>;
  }
  
  // Netlify types
  interface NetlifyIdentity {
    init: () => void;
    currentUser: () => any;
  }
}

// Portfolio specific types
export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  year: string;
  category: 'ai' | 'fashion' | 'web' | 'voice' | 'consulting';
  status: 'active' | 'completed' | 'in-progress';
  priority: number;
  tags: string[];
  technologies: string[];
  fullDescription: string;
  features: string[];
  metrics: Record<string, string | number>;
  links: {
    demo?: string;
    github?: string;
    case_study?: string;
    portfolio?: string;
    shop?: string;
    documentary?: string;
  };
  images: string[];
  testimonials?: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'design' | 'culture' | 'technology' | 'fashion';
  date: string;
  location: string;
  tags: string[];
  metadata: Record<string, string>;
  src: string;
}

export interface Testimonial {
  id: string;
  text: string;
  client: string;
  position: string;
  company: string;
  industry: string;
  projectType: string;
  icon: string;
  rating: number;
  date: string;
  project_duration: string;
  collaboration_type: string;
  location: string;
  linkedin?: string;
  company_logo?: string;
  project_value?: string;
  featured: boolean;
}

export interface PortfolioState {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  showModal: boolean;
  showGalleryModal: boolean;
  currentTheme: 'dark' | 'light';
  isLoading: boolean;
  currentSection: string;
  searchQuery: string;
  filterCategory: string;
}

export interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
}

export interface PerformanceMetrics {
  loadTime: number;
  interactionTracker: Map<string, number>;
  errorCount: number;
  lastInteraction: number;
}

// Utility types
export type EventName = 
  | 'app_initialized'
  | 'navigation'
  | 'portfolio_view'
  | 'gallery_view'
  | 'contact_form_submit'
  | 'theme_change'
  | 'error_occurred'
  | 'section_view'
  | 'filter_projects'
  | 'gallery_navigate';

export type Category = 'all' | 'ai' | 'fashion' | 'web' | 'voice' | 'consulting';

export type Theme = 'dark' | 'light';

export type ModalType = 'project' | 'gallery';

export type NavigationDirection = 'next' | 'prev';

// Environment types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'staging';
  APP_ENV: 'development' | 'production' | 'staging';
  ENABLE_ANALYTICS: boolean;
  ENABLE_SERVICE_WORKER: boolean;
  API_BASE_URL: string;
}

// External library types
declare module 'alpinejs' {
  const Alpine: any;
  export default Alpine;
}

declare module 'aos' {
  const AOS: {
    init: (options?: any) => void;
    refresh: () => void;
  };
  export default AOS;
}

export {};
