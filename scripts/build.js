const fs = require('fs');
const path = require('path');

// Load environment variables from .env file (for local development)
if (fs.existsSync('.env')) {
  require('dotenv').config();
}

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

console.log(`🚀 Building Thanatsitt Portfolio for ${env} environment...`);

// Environment configuration with fallbacks
const config = {
  // Core App Settings
  NODE_ENV: env,
  APP_NAME: process.env.APP_NAME || 'Thanatsitt Portfolio',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  CDN_URL: process.env.CDN_URL || '',
  
  // Analytics & Tracking
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || '',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  HOTJAR_ID: process.env.HOTJAR_ID || '',
  
  // Contact & Communication
  CONTACT_FORM_ENDPOINT: process.env.CONTACT_FORM_ENDPOINT || '',
  NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || '',
  
  // GitHub Integration
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'thanatsitt',
  GITHUB_URL: process.env.GITHUB_URL || 'https://github.com/thanatsitt',
  
  // Social Media
  LINKEDIN_URL: process.env.LINKEDIN_URL || '',
  TWITTER_URL: process.env.TWITTER_URL || '',
  
  // Feature Flags
  ENABLE_BLOG: process.env.ENABLE_BLOG === 'true',
  ENABLE_PORTFOLIO_FILTER: process.env.ENABLE_PORTFOLIO_FILTER === 'true',
  ENABLE_DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
  ENABLE_ANIMATIONS: process.env.ENABLE_ANIMATIONS === 'true',
  
  // Performance & PWA
  CACHE_DURATION: process.env.CACHE_DURATION || '86400',
  ENABLE_SERVICE_WORKER: process.env.ENABLE_SERVICE_WORKER === 'true',
  ENABLE_PWA: process.env.ENABLE_PWA === 'true',
  
  // Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  
  // Debug & Development
  DEBUG: isDev || process.env.LOG_LEVEL === 'debug',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Log configuration in development
if (isDev) {
  console.log('🔧 Environment Configuration:');
  console.table(config);
}

function processHTML() {
  console.log('📝 Processing HTML with environment variables...');
  
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Replace environment variables
  Object.keys(config).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, config[key]);
  });

  // Process conditionals
  html = processConditionals(html, config);

  // Add environment-specific features
  if (isDev) {
    html = addDevelopmentFeatures(html);
  } else if (isProd) {
    html = addProductionFeatures(html);
  }

  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  fs.writeFileSync('dist/index.html', html);
  console.log('✅ HTML processed successfully');
}

function processConditionals(html, config) {
  // Handle {{#if CONDITION}} blocks
  const conditionalRegex = /{{#if\s+([^}]+)}}([\s\S]*?){{\/if}}/g;
  
  html = html.replace(conditionalRegex, (match, condition, content) => {
    const shouldInclude = evaluateCondition(condition.trim(), config);
    return shouldInclude ? content : '';
  });

  // Handle {{#unless CONDITION}} blocks
  const unlessRegex = /{{#unless\s+([^}]+)}}([\s\S]*?){{\/unless}}/g;
  
  html = html.replace(unlessRegex, (match, condition, content) => {
    const shouldInclude = !evaluateCondition(condition.trim(), config);
    return shouldInclude ? content : '';
  });

  return html;
}

function evaluateCondition(condition, config) {
  // Handle simple boolean checks
  if (config.hasOwnProperty(condition)) {
    return config[condition];
  }
  
  // Handle negation (!CONDITION)
  if (condition.startsWith('!')) {
    const key = condition.substring(1);
    return !config[key];
  }
  
  // Handle equality (CONDITION === 'value')
  if (condition.includes('===')) {
    const [key, value] = condition.split('===').map(s => s.trim());
    return config[key] === value.replace(/['"]/g, '');
  }
  
  // Handle inequality (CONDITION !== 'value')
  if (condition.includes('!==')) {
    const [key, value] = condition.split('!==').map(s => s.trim());
    return config[key] !== value.replace(/['"]/g, '');
  }
  
  return false;
}

function addDevelopmentFeatures(html) {
  console.log('🔧 Adding development features...');
  
  // Add development indicator
  const devIndicator = `
  <div id="dev-indicator" class="fixed top-0 left-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold z-50 rounded-br-md">
    🔧 DEV MODE
  </div>`;
  
  html = html.replace('<body', `<body>${devIndicator}`);
  
  // Add debug information
  const debugScript = `
  <script>
    // Development environment configuration
    window.ENV_CONFIG = ${JSON.stringify(config, null, 2)};
    window.IS_DEVELOPMENT = true;
    
    console.log('🔧 Development Mode Active');
    console.log('Environment Config:', window.ENV_CONFIG);
    
    // Add development helpers
    window.debugPortfolio = {
      config: window.ENV_CONFIG,
      toggleAnimations: () => {
        document.body.classList.toggle('no-animations');
      },
      showConfig: () => {
        console.table(window.ENV_CONFIG);
      }
    };
    
    console.log('Debug helpers available: window.debugPortfolio');
  </script>`;
  
  html = html.replace('</body>', `${debugScript}\n</body>`);
  
  return html;
}

function addProductionFeatures(html) {
  console.log('🚀 Adding production optimizations...');
  
  // Add production meta tags
  const prodMeta = `
  <meta name="robots" content="index, follow">
  <meta name="author" content="Thanatsitt Santisamranwilai">
  <meta property="og:url" content="${config.APP_URL}">
  <meta property="og:site_name" content="${config.APP_NAME}">`;
  
  html = html.replace('</head>', `${prodMeta}\n</head>`);
  
  // Add production analytics
  if (config.ENABLE_ANALYTICS && config.GOOGLE_ANALYTICS_ID) {
    const analyticsScript = `
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.GOOGLE_ANALYTICS_ID}');
    </script>`;
    
    html = html.replace('</head>', `${analyticsScript}\n</head>`);
  }
  
  return html;
}

function generateManifest() {
  console.log('📱 Generating PWA manifest...');
  
  const manifest = {
    name: config.APP_NAME,
    short_name: 'Thanatsitt',
    description: 'Cultural Navigator bridging ancient wisdom with modern technology',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1A2E',
    theme_color: '#D4AF37',
    orientation: 'portrait-primary',
    categories: ['portfolio', 'technology', 'culture'],
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/assets/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/assets/icons/android-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      }
    ]
  };

  fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ PWA manifest generated');
}

function generateServiceWorker() {
  if (!config.ENABLE_SERVICE_WORKER) {
    console.log('⏭️  Service Worker disabled');
    return;
  }
  
  console.log('⚙️  Generating Service Worker...');
  
  const sw = `
// Service Worker for Thanatsitt Portfolio
const CACHE_NAME = 'thanatsitt-portfolio-v1';
const CACHE_DURATION = ${config.CACHE_DURATION};

const urlsToCache = [
  '/',
  '/manifest.json',
  '/assets/thanatsitt-profile.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
  `.trim();

  fs.writeFileSync('dist/sw.js', sw);
  console.log('✅ Service Worker generated');
}

function copyAssets() {
  console.log('📁 Copying assets...');
  
  if (fs.existsSync('assets')) {
    copyDirectory('assets', 'dist/assets');
    console.log('✅ Assets copied');
  } else {
    console.log('⚠️  No assets directory found');
  }
  
  // Copy root files
  const rootFiles = ['favicon.ico', 'robots.txt', 'sitemap.xml'];
  rootFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, `dist/${file}`);
      console.log(`✅ Copied ${file}`);
    }
  });
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function generateEnvironmentReport() {
  const report = {
    timestamp: new Date().toISOString(),
    environment: env,
    features: {
      analytics: config.ENABLE_ANALYTICS,
      blog: config.ENABLE_BLOG,
      darkMode: config.ENABLE_DARK_MODE,
      animations: config.ENABLE_ANIMATIONS,
      pwa: config.ENABLE_PWA,
      serviceWorker: config.ENABLE_SERVICE_WORKER
    },
    urls: {
      app: config.APP_URL,
      cdn: config.CDN_URL,
      contact: config.CONTACT_FORM_ENDPOINT
    }
  };
  
  fs.writeFileSync('dist/build-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Build report generated');
}

// Main build process
try {
  console.log('🏗️  Starting build process...');
  
  processHTML();
  generateManifest();
  generateServiceWorker();
  copyAssets();
  generateEnvironmentReport();
  
  console.log(`🎉 ${config.APP_NAME} build completed successfully!`);
  console.log(`📍 Environment: ${env}`);
  console.log(`🌐 URL: ${config.APP_URL}`);
  
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
