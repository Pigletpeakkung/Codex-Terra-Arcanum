const fs = require('fs');
const path = require('path');

// Environment configuration
const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

console.log(`🚀 Building for ${env} environment...`);

const config = {
  NODE_ENV: env,
  APP_NAME: isDev ? 'Thanatsitt Portfolio (Preview)' : (process.env.APP_NAME || 'Thanatsitt Portfolio'),
  APP_URL: isDev ? 'http://localhost:3000' : (process.env.APP_URL || 'https://thannxai.netlify.app'),
  CDN_URL: isDev ? '' : (process.env.CDN_URL || 'https://thannxai.netlify.app'),
  GOOGLE_ANALYTICS_ID: isDev ? '' : (process.env.GOOGLE_ANALYTICS_ID || ''),
  CONTACT_FORM_ENDPOINT: isDev ? 'http://localhost:3000/.netlify/functions/contact' : (process.env.CONTACT_FORM_ENDPOINT || ''),
  ENABLE_ANALYTICS: isDev ? false : (process.env.ENABLE_ANALYTICS === 'true'),
  DEBUG: isDev ? true : (process.env.DEBUG === 'true'),
  CACHE_DURATION: isDev ? '0' : (process.env.CACHE_DURATION || '86400')
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
    // Add live reload script for development
    const liveReloadScript = `
    <script>
      // Live reload for development
      if (window.location.hostname === 'localhost') {
        document.write('<script src="http://localhost:35729/livereload.js"></' + 'script>');
      }
    </script>`;
    
    html = html.replace('</body>', `${liveReloadScript}\n</body>`);
    
    // Add development indicator
    const devIndicator = `
    <div class="fixed top-0 left-0 bg-green-500 text-black px-3 py-1 text-xs font-bold z-50 rounded-br-md">
      PREVIEW
    </div>`;
    
    html = html.replace('<body', `<body${devIndicator.includes('PREVIEW') ? '' : devIndicator}`);
  }

  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  fs.writeFileSync('dist/index.html', html);
  console.log('✅ HTML processed successfully');
}

function processConditionals(html, config) {
  // Handle analytics conditionals
  const analyticsRegex = /{{#if ENABLE_ANALYTICS}}([\s\S]*?){{\/if}}/g;
  html = html.replace(analyticsRegex, (match, content) => {
    return config.ENABLE_ANALYTICS ? content : '';
  });

  const gaRegex = /{{#if GOOGLE_ANALYTICS_ID}}([\s\S]*?){{\/if}}/g;
  html = html.replace(gaRegex, (match, content) => {
    return config.GOOGLE_ANALYTICS_ID ? content : '';
  });

  // Handle development conditionals
  const devRegex = /{{#if NODE_ENV !== 'production'}}([\s\S]*?){{\/if}}/g;
  html = html.replace(devRegex, (match, content) => {
    return config.NODE_ENV !== 'production' ? content : '';
  });

  return html;
}

function generateDevManifest() {
  const manifest = {
    name: config.APP_NAME,
    short_name: 'Thanatsitt Dev',
    description: 'Cultural Navigator Portfolio - Development Preview',
    start_url: '/',
    display: 'standalone',
    background_color: '#1A1A2E',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/assets/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  };

  fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ Development manifest generated');
}

// Run build process
try {
  processHTML();
  if (isDev) {
    generateDevManifest();
  }
  console.log(`🎉 ${env} build completed successfully!`);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
