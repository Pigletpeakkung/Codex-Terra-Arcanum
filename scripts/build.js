const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

class EnvironmentBuilder {
    constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.config = this.loadEnvironmentConfig();
    }

    loadEnvironmentConfig() {
        const envFile = `.env.${this.env}`;
        if (fs.existsSync(envFile)) {
            require('dotenv').config({ path: envFile });
        }
        return process.env;
    }

    processTemplate(templatePath, outputPath) {
        let template = fs.readFileSync(templatePath, 'utf8');
        
        // Replace environment variables
        Object.keys(this.config).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, this.config[key] || '');
        });

        // Handle conditional blocks
        template = this.processConditionals(template);

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, template);
        console.log(`✅ Built ${outputPath} for ${this.env} environment`);
    }

    processConditionals(template) {
        // Process {{#if condition}} blocks
        const ifRegex = /{{#if\s+(.+?)}}([\s\S]*?){{\/if}}/g;
        
        return template.replace(ifRegex, (match, condition, content) => {
            try {
                // Simple condition evaluation
                const result = this.evaluateCondition(condition);
                return result ? content : '';
            } catch (error) {
                console.warn(`Warning: Could not evaluate condition "${condition}"`);
                return '';
            }
        });
    }

    evaluateCondition(condition) {
        // Handle simple comparisons
        if (condition.includes('===')) {
            const [left, right] = condition.split('===').map(s => s.trim());
            const leftValue = this.getValue(left);
            const rightValue = this.getValue(right);
            return leftValue === rightValue;
        }
        
        if (condition.includes('!==')) {
            const [left, right] = condition.split('!==').map(s => s.trim());
            const leftValue = this.getValue(left);
            const rightValue = this.getValue(right);
            return leftValue !== rightValue;
        }

        // Handle simple boolean checks
        return this.getValue(condition);
    }

    getValue(expression) {
        // Remove quotes
        if (expression.startsWith('"') && expression.endsWith('"')) {
            return expression.slice(1, -1);
        }
        if (expression.startsWith("'") && expression.endsWith("'")) {
            return expression.slice(1, -1);
        }

        // Get environment variable
        return this.config[expression];
    }

    generateServiceWorker() {
        const swTemplate = `
const CACHE_NAME = 'thanatsitt-portfolio-v1-${this.env}';
const CACHE_DURATION = ${this.config.CACHE_DURATION || 86400};

const urlsToCache = [
    '/',
    '/manifest.json',
    '${this.config.CDN_URL || ''}/css/styles.min.css',
    '${this.config.CDN_URL || ''}/js/bundle.min.js',
    '${this.config.CDN_URL || ''}/assets/thanatsitt-profile.jpg'
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
        `;

        fs.writeFileSync('dist/sw.js', swTemplate.trim());
        console.log(`✅ Generated service worker for ${this.env} environment`);
    }

    generateManifest() {
        const manifest = {
            name: this.config.APP_NAME || 'Thanatsitt Portfolio',
            short_name: 'Thanatsitt',
            description: 'Cultural Navigator bridging ancient wisdom with modern technology',
            start_url: '/',
            display: 'standalone',
            background_color: '#1A1A2E',
            theme_color: '#D4AF37',
            icons: [
                {
                    src: `${this.config.CDN_URL || ''}/icons/android-icon-192x192.png`,
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: `${this.config.CDN_URL || ''}/icons/android-icon-512x512.png`,
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        };

        fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
        console.log(`✅ Generated manifest for ${this.env} environment`);
    }

    build() {
        console.log(`🚀 Building for ${this.env} environment...`);
        
        // Process HTML template
        this.processTemplate('index.html', 'dist/index.html');
        
        // Generate PWA files
        if (this.env !== 'development') {
            this.generateServiceWorker();
            this.generateManifest();
        }

        console.log(`✅ Build completed for ${this.env} environment`);
    }
}

// Run the build
const builder = new EnvironmentBuilder();
builder.build();
