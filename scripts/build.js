const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

console.log(`🚀 Building for ${env} environment...`);

// Environment configuration
const config = {
  NODE_ENV: env,
  APP_NAME: process.env.APP_NAME || 'Thanatsitt Portfolio',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  CDN_URL: process.env.CDN_URL || '',
  
  // Analytics
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || '',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  HOTJAR_ID: process.env.HOTJAR_ID || '',
  
  // Contact
  CONTACT_FORM_ENDPOINT: process.env.CONTACT_FORM_ENDPOINT || '',
  
  // Social Media
  LINKEDIN_URL: process.env.LINKEDIN_URL || '',
  TWITTER_URL: process.env.TWITTER_URL || '',
  GITHUB_URL: process.env.GITHUB_URL || '',
  
  // Feature Flags
  ENABLE_BLOG: process.env.ENABLE_BLOG === 'true',
  ENABLE_PORTFOLIO_FILTER: process.env.ENABLE_PORTFOLIO_FILTER === 'true',
  ENABLE_DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
  ENABLE_ANIMATIONS: process.env.ENABLE_ANIMATIONS === 'true',
  
  // Performance
  CACHE_DURATION: process.env.CACHE_DURATION || '86400',
  ENABLE_SERVICE_WORKER: process.env.ENABLE_SERVICE_WORKER === 'true',
  ENABLE_PWA: process.env.ENABLE_PWA === 'true',
  
  // Debug
  DEBUG: isDev || process.env.LOG_LEVEL === 'debug'
};

function processHTML() {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Replace environment variables
  Object.keys(config).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, config[key]);
  });

  // Process conditionals
  html = processConditionals(html, config);

  // Development-specific modifications
  if (isDev) {
    html = addDevelopmentFeatures(html);
  }

  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  fs.writeFileSync('dist/index.html', html);
  console.log('✅ HTML processed with environment variables');
}

function processConditionals(html, config) {
  // Handle {{#if CONDITION}} blocks
  const conditionalRegex = /{{#if\s+([^}]+)}}([\s\S]*?){{\/if}}/g;
  
  html = html.replace(conditionalRegex, (match, condition, content) => {
    // Evaluate the condition
    const shouldInclude = evaluateCondition(condition, config);
    return shouldInclude ? content : '';
  });

  return html;
}

function evaluateCondition(condition, config) {
  // Handle simple conditions
  if (config.hasOwnProperty(condition)) {
    return config[condition];
  }
  
  // Handle negation
  if (condition.startsWith('!')) {
    const key = condition.substring(1);
    return !config[key];
  }
  
  // Handle comparisons
  if (condition.includes('===')) {
    const [key, value] = condition.split('===').map(s => s.trim());
    return config[key] === value.replace(/['"]/g, '');
  }
  
  if (condition.includes('!==')) {
    const [key, value] = condition.split('!==').map(s => s.trim());
    return config[key] !== value.replace(/['"]/g, '');
  }
  
  return false;
}

function addDevelopmentFeatures(html) {
  // Add development indicator
  const devIndicator = `
  <div class="fixed top-0 left-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold z-50 rounded-br-md">
    DEV MODE
  </div>`;
  
  html = html.replace('<body', `<body>${devIndicator}`);
  
  // Add debug console
  const debugScript = `
  <script>
    window.ENV_CONFIG = ${JSON.stringify(config, null, 2)};
    console.log('🔧 Development Mode Active');
    console.log('Environment Config:', window.ENV_CONFIG);
  </script>`;
  
  html = html.replace('</body>', `${debugScript}\n</body>`);
  
  return html;
}

function generateManifest() {
  const manifest = {
    name: config.APP_NAME,
    short_name: 'Thanatsitt',
    description: 'Cultural Navigator bridging ancient wisdom with modern technology',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1A2E',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/assets/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/assets/icons/android-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };

  fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ Manifest generated with environment config');
}

function copyAssets() {
  if (fs.existsSync('assets')) {
    copyDirectory('assets', 'dist/assets');
    console.log('✅ Assets copied');
  }
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

// Run build process
try {
  processHTML();
  generateManifest();
  copyAssets();
  console.log(`🎉 ${env} build completed successfully!`);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
