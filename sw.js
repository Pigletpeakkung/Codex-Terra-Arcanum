// =============================================================================
// CONFIGURATION - THANATSITT PORTFOLIO (CODEX TERRA ARCANUM)
// Centralized configuration management with environment detection
// =============================================================================

/**
 * Environment Detection
 */
const ENV = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isStaging: window.location.hostname.includes('deploy-preview') || window.location.hostname.includes('staging'),
    isProduction: window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app') || window.location.hostname.includes('thanatsitt.com'),
    isNetlify: window.location.hostname.includes('netlify'),
    isGitHubPages: window.location.hostname.includes('github.io')
};

/**
 * Base Configuration
 */
const BASE_CONFIG = {
    // Application Info
    APP_NAME: 'Thanatsitt Portfolio',
    APP_VERSION: '1.0.0',
    APP_DESCRIPTION: 'Thai-British interdisciplinary creator bridging ancient wisdom with modern technology',
    
    // Personal Information
    PERSONAL: {
        name: 'Thanatsitt Santisamranwilai',
        title: 'Cultural Bridge Builder & Digital Innovator',
        email: 'thanattsitt.info@yahoo.co.uk',
        phone: '+44 123 456 7890', // Update with real number
        location: 'London, United Kingdom',
        timezone: 'Europe/London',
        languages: ['English', 'Thai', 'Mandarin'],
        pronouns: 'They/Them'
    },
    
    // URLs and Links
    URLS: {
        portfolio: 'https://pigletpeakkung.github.io/Codex-Terra-Arcanum',
        business: 'https://pegearts.com',
        repository: 'https://github.com/Pigletpeakkung/Codex-Terra-Arcanum',
        linkedin: 'https://linkedin.com/in/thanatsitt',
        github: 'https://github.com/thanatsitt',
        instagram: 'https://instagram.com/thanatsitt',
        twitter: 'https://twitter.com/thanatsitt',
        youtube: 'https://youtube.com/@thanatsitt',
        behance: 'https://behance.net/thanatsitt',
        dribbble: 'https://dribbble.com/thanatsitt'
    },
    
    // Feature Flags
    FEATURES: {
        analytics: true,
        serviceWorker: true,
        pushNotifications: false,
        offlineMode: true,
        darkMode: true,
        animations: true,
        soundEffects: false,
        blog: false,
        shop: false,
        booking: true,
        newsletter: true,
        testimonials: true,
        gallery: true,
        voiceSamples: true,
        aiDemo: true,
        fashionGallery: true,
        culturalConsulting: true,
        languageSwitcher: false,
        chatbot: false,
        videoBackground: false,
        parallaxEffects: true,
        lazyLoading: true,
        imageOptimization: true
    },
    
    // Performance Settings
    PERFORMANCE: {
        imageLazyLoading: true,
        preloadImages: true,
        cacheDuration: 86400000, // 24 hours in milliseconds
        debounceDelay: 300,
        throttleDelay: 100,
        animationDuration: 300,
        scrollThrottle: 16, // ~60fps
        intersectionThreshold: 0.1,
        maxImageSize: 2048,
        compressionQuality: 0.8
    },
    
    // UI/UX Settings
    UI: {
        theme: 'dark', // 'dark' | 'light' | 'auto'
        accentColor: '#D4AF37',
        primaryColor: '#1A1A2E',
        animationSpeed: 300,
        transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '8px',
        shadowLevel: 'medium',
        fontFamily: 'Inter, sans-serif',
        fontSize: {
            small: '14px',
            medium: '16px',
            large: '18px',
            xlarge: '24px'
        },
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1280,
            wide: 1920
        }
    }
};

/**
 * Development Configuration
 */
const DEVELOPMENT_CONFIG = {
    // API Configuration
    API: {
        baseUrl: 'http://localhost:3001',
        timeout: 10000,
        retries: 3,
        endpoints: {
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            analytics: '/api/analytics',
            gallery: '/api/gallery',
            testimonials: '/api/testimonials'
        }
    },
    
    // EmailJS Configuration (Development)
    EMAILJS: {
        publicKey: 'dev_public_key_here',
        serviceId: 'dev_service_gmail',
        templateId: 'dev_template_contact',
        newsletterTemplateId: 'dev_template_newsletter'
    },
    
    // Analytics (Disabled in development)
    ANALYTICS: {
        googleAnalytics: {
            trackingId: '',
            enabled: false
        },
        facebookPixel: {
            pixelId: '',
            enabled: false
        },
        hotjar: {
            hjid: '',
            hjsv: '',
            enabled: false
        },
        clarity: {
            projectId: '',
            enabled: false
        }
    },
    
    // Debug Settings
    DEBUG: {
        enableConsoleLog: true,
        enablePerformanceLog: true,
        enableErrorTracking: true,
        showDebugInfo: true,
        mockApiResponses: true,
        bypassCache: true
    }
};

/**
 * Staging Configuration
 */
const STAGING_CONFIG = {
    // API Configuration
    API: {
        baseUrl: 'https://staging-api.thanatsitt.com',
        timeout: 15000,
        retries: 2,
        endpoints: {
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            analytics: '/api/analytics',
            gallery: '/api/gallery',
            testimonials: '/api/testimonials'
        }
    },
    
    // EmailJS Configuration (Staging)
    EMAILJS: {
        publicKey: 'staging_public_key_here',
        serviceId: 'staging_service_gmail',
        templateId: 'staging_template_contact',
        newsletterTemplateId: 'staging_template_newsletter'
    },
    
    // Analytics (Limited in staging)
    ANALYTICS: {
        googleAnalytics: {
            trackingId: 'G-STAGING123',
            enabled: true
        },
        facebookPixel: {
            pixelId: '',
            enabled: false
        },
        hotjar: {
            hjid: '',
            hjsv: '',
            enabled: false
        },
        clarity: {
            projectId: '',
            enabled: false
        }
    },
    
    // Debug Settings
    DEBUG: {
        enableConsoleLog: true,
        enablePerformanceLog: true,
        enableErrorTracking: true,
        showDebugInfo: false,
        mockApiResponses: false,
        bypassCache: false
    }
};

/**
 * Production Configuration
 */
const PRODUCTION_CONFIG = {
    // API Configuration
    API: {
        baseUrl: 'https://api.thanatsitt.com',
        timeout: 20000,
        retries: 3,
        endpoints: {
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            analytics: '/api/analytics',
            gallery: '/api/gallery',
            testimonials: '/api/testimonials'
        }
    },
    
    // EmailJS Configuration (Production)
    EMAILJS: {
        publicKey: 'your_actual_public_key_here', // Replace with real key
        serviceId: 'service_gmail_prod', // Replace with real service ID
        templateId: 'template_contact_prod', // Replace with real template ID
        newsletterTemplateId: 'template_newsletter_prod' // Replace with real template ID
    },
    
    // Analytics (Full tracking in production)
    ANALYTICS: {
        googleAnalytics: {
            trackingId: 'G-XXXXXXXXXX', // Replace with real GA4 ID
            enabled: true
        },
        facebookPixel: {
            pixelId: '123456789012345', // Replace with real Pixel ID
            enabled: true
        },
        hotjar: {
            hjid: '1234567', // Replace with real Hotjar ID
            hjsv: '6',
            enabled: true
        },
        clarity: {
            projectId: 'abcdefghij', // Replace with real Clarity ID
            enabled: true
        }
    },
    
    // Debug Settings
    DEBUG: {
        enableConsoleLog: false,
        enablePerformanceLog: false,
        enableErrorTracking: true,
        showDebugInfo: false,
        mockApiResponses: false,
        bypassCache: false
    }
};

/**
 * CDN and External Resources
 */
const EXTERNAL_RESOURCES = {
    CDN: {
        tailwind: 'https://cdn.tailwindcss.com',
        alpinejs: 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
        aos: {
            css: 'https://unpkg.com/aos@2.3.1/dist/aos.css',
            js: 'https://unpkg.com/aos@2.3.1/dist/aos.js'
        },
        fontawesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        emailjs: 'https://cdn.emailjs.com/dist/email.min.js'
    },
    
    ASSETS: {
        voiceSamples: 'https://voice-samples.thanatsitt.com',
        fashionGallery: 'https://fashion.thanatsitt.com',
        aiDemo: 'https://ai-demo.thanatsitt.com',
        culturalAssets: 'https://cultural.thanatsitt.com'
    },
    
    FALLBACKS: {
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUExQTJFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRDRBRjM3IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K',
        avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjMUExQTJFIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0Q0QUYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5UPC90ZXh0Pgo8L3N2Zz4K'
    }
};

/**
 * Content Configuration
 */
const CONTENT_CONFIG = {
    // Portfolio Sections
    SECTIONS: {
        hero: {
            enabled: true,
            backgroundVideo: false,
            parallax: true,
            typewriter: true
        },
        about: {
            enabled: true,
            showSkills: true,
            showTimeline: true,
            showAchievements: true
        },
        projects: {
            enabled: true,
            showFilters: true,
            showSearch: true,
            itemsPerPage: 6,
            categories: ['all', 'ai', 'fashion', 'web', 'voice', 'consulting']
        },
        gallery: {
            enabled: true,
            showFilters: true,
            lightbox: true,
            infiniteScroll: false,
            itemsPerPage: 12
        },
        testimonials: {
            enabled: true,
            autoplay: true,
            showRatings: true,
            itemsPerSlide: 1
        },
        contact: {
            enabled: true,
            showMap: false,
            showSocial: true,
            showCalendly: true
        }
    },
    
    // Default Content
    DEFAULTS: {
        metaDescription: 'Thai-British interdisciplinary creator bridging ancient wisdom with modern technology. Specializing in AI development, sustainable fashion, cultural consulting, and voice acting.',
        metaKeywords: 'Cultural Consulting, AI Development, Fashion Design, Voice Acting, Thai-British, Digital Innovation',
        ogImage: '/og-image.jpg',
        twitterImage: '/twitter-image.jpg'
    }
};

/**
 * Security Configuration
 */
const SECURITY_CONFIG = {
    CSP: {
        'default-src': ["'self'"],
        'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://unpkg.com',
            'https://cdn.tailwindcss.com',
            'https://cdnjs.cloudflare.com',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com',
            'https://connect.facebook.net',
            'https://www.clarity.ms',
            'https://cdn.emailjs.com'
        ],
        'style-src': [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com'
        ],
        'font-src': [
            "'self'",
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ],
        'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https:'
        ],
        'connect-src': [
            "'self'",
            'https://api.emailjs.com',
            'https://www.google-analytics.com',
            'https://www.clarity.ms',
            'https://formspree.io'
        ]
    },
    
    RATE_LIMITING: {
        contactForm: {
            maxRequests: 5,
            windowMs: 900000 // 15 minutes
        },
        newsletter: {
            maxRequests: 3,
            windowMs: 3600000 // 1 hour
        }
    }
};

/**
 * Get Environment-Specific Configuration
 */
function getEnvironmentConfig() {
    if (ENV.isDevelopment) {
        return { ...BASE_CONFIG, ...DEVELOPMENT_CONFIG };
    } else if (ENV.isStaging) {
        return { ...BASE_CONFIG, ...STAGING_CONFIG };
    } else {
        return { ...BASE_CONFIG, ...PRODUCTION_CONFIG };
    }
}

/**
 * Configuration Manager
 */
class ConfigManager {
    constructor() {
        this.config = getEnvironmentConfig();
        this.external = EXTERNAL_RESOURCES;
        this.content = CONTENT_CONFIG;
        this.security = SECURITY_CONFIG;
        this.env = ENV;
        
        // Initialize configuration
        this.init();
    }
    
    init() {
        // Set global config
        window.CONFIG = this.config;
        window.EXTERNAL_RESOURCES = this.external;
        window.CONTENT_CONFIG = this.content;
        window.SECURITY_CONFIG = this.security;
        window.ENV = this.env;
        
        // Log configuration in development
        if (this.config.DEBUG?.enableConsoleLog) {
            console.log('🔧 Configuration loaded:', this.config);
            console.log('🌍 Environment:', this.env);
        }
    }
    
    get(key, defaultValue = null) {
        return this.getNestedValue(this.config, key, defaultValue);
    }
    
    getExternal(key, defaultValue = null) {
        return this.getNestedValue(this.external, key, defaultValue);
    }
    
    getContent(key, defaultValue = null) {
        return this.getNestedValue(this.content, key, defaultValue);
    }
    
    isFeatureEnabled(feature) {
        return this.config.FEATURES?.[feature] || false;
    }
    
    getApiUrl(endpoint = '') {
        const baseUrl = this.config.API?.baseUrl || '';
        const endpointPath = this.config.API?.endpoints?.[endpoint] || endpoint;
        return `${baseUrl}${endpointPath}`;
    }
    
    getNestedValue(obj, path, defaultValue = null) {
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }
        
        return current;
    }
    
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
        window.CONFIG = this.config;
        
        if (this.config.DEBUG?.enableConsoleLog) {
            console.log('🔄 Configuration updated:', updates);
        }
    }
}

// Initialize Configuration Manager
const configManager = new ConfigManager();

// Export for use in other modules
window.ConfigManager = configManager;

// Backward compatibility
window.getConfig = (key, defaultValue) => configManager.get(key, defaultValue);
window.isFeatureEnabled = (feature) => configManager.isFeatureEnabled(feature);
window.getApiUrl = (endpoint) => configManager.getApiUrl(endpoint);

// Development helpers
if (ENV.isDevelopment) {
    window.debugConfig = () => {
        console.table(configManager.config);
        console.log('External Resources:', configManager.external);
        console.log('Content Config:', configManager.content);
        console.log('Security Config:', configManager.security);
    };
}

console.log('⚙️ Configuration system initialized successfully!');
