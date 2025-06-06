// =============================================================================
// SERVICE WORKER - THANATSITT PORTFOLIO (CODEX TERRA ARCANUM)
// Advanced caching, offline support, and performance optimization
// =============================================================================

const CACHE_NAME = 'thanatsitt-portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
const IMAGES_CACHE = 'images-v1.0.0';
const API_CACHE = 'api-v1.0.0';

// =============================================================================
// CACHE STRATEGIES
// =============================================================================

// Critical assets that must be cached immediately
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/apple-touch-icon.png'
];

// Static assets with long cache duration
const STATIC_ASSETS = [
    // CSS Files
    '/css/style.css',
    '/css/style.min.css',
    
    // JavaScript Files
    '/js/app.js',
    '/js/app.min.js',
    '/js/config.js',
    
    // External CDN Assets (cached locally)
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdn.emailjs.com/dist/email.min.js',
    
    // Fonts
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2'
];

// Image patterns to cache
const IMAGE_PATTERNS = [
    '/images/',
    '/gallery/',
    '/voice-samples/',
    '/assets/',
    'https://voice-samples.thanatsitt.com/',
    'https://fashion.thanatsitt.com/'
];

// API endpoints to cache
const API_PATTERNS = [
    '/api/',
    'https://api.thanatsitt.com/',
    'https://formspree.io/',
    'https://api.emailjs.com/'
];

// Assets to exclude from caching
const EXCLUDE_PATTERNS = [
    '/admin/',
    '/analytics/',
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    '.map'
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if URL should be cached
 */
function shouldCache(url) {
    const urlObj = new URL(url);
    
    // Exclude certain patterns
    if (EXCLUDE_PATTERNS.some(pattern => url.includes(pattern))) {
        return false;
    }
    
    // Only cache HTTP/HTTPS requests
    if (!urlObj.protocol.startsWith('http')) {
        return false;
    }
    
    return true;
}

/**
 * Get cache name for URL
 */
function getCacheName(url) {
    if (STATIC_ASSETS.includes(url) || CRITICAL_ASSETS.includes(url)) {
        return STATIC_CACHE;
    }
    
    if (IMAGE_PATTERNS.some(pattern => url.includes(pattern))) {
        return IMAGES_CACHE;
    }
    
    if (API_PATTERNS.some(pattern => url.includes(pattern))) {
        return API_CACHE;
    }
    
    return DYNAMIC_CACHE;
}

/**
 * Clean old caches
 */
async function cleanOldCaches() {
    const cacheNames = await caches.keys();
    const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGES_CACHE, API_CACHE];
    
    return Promise.all(
        cacheNames
            .filter(cacheName => !validCaches.includes(cacheName))
            .map(cacheName => {
                console.log('🗑️ Deleting old cache:', cacheName);
                return caches.delete(cacheName);
            })
    );
}

/**
 * Preload critical resources
 */
async function preloadCriticalResources() {
    try {
        const cache = await caches.open(STATIC_CACHE);
        
        // Add critical assets first
        await cache.addAll(CRITICAL_ASSETS);
        console.log('✅ Critical assets cached');
        
        // Add static assets in batches to avoid overwhelming the browser
        const batchSize = 5;
        for (let i = 0; i < STATIC_ASSETS.length; i += batchSize) {
            const batch = STATIC_ASSETS.slice(i, i + batchSize);
            try {
                await cache.addAll(batch);
                console.log(`✅ Static assets batch ${Math.floor(i/batchSize) + 1} cached`);
            } catch (error) {
                console.warn('⚠️ Failed to cache batch:', batch, error);
                // Try to cache individually
                for (const asset of batch) {
                    try {
                        await cache.add(asset);
                    } catch (individualError) {
                        console.warn('⚠️ Failed to cache asset:', asset, individualError);
                    }
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Failed to preload critical resources:', error);
    }
}

/**
 * Network first strategy with fallback
 */
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(getCacheName(request.url));
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📦 Serving from cache:', request.url);
            return cachedResponse;
        }
        
        // Return offline fallback
        return getOfflineFallback(request);
    }
}

/**
 * Cache first strategy with network fallback
 */
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        console.log('📦 Serving from cache:', request.url);
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok && shouldCache(request.url)) {
            const cache = await caches.open(getCacheName(request.url));
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        return getOfflineFallback(request);
    }
}

/**
 * Stale while revalidate strategy
 */
async function staleWhileRevalidateStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    const networkResponsePromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok && shouldCache(request.url)) {
            const cache = caches.open(getCacheName(request.url));
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    }).catch(() => null);
    
    return cachedResponse || networkResponsePromise || getOfflineFallback(request);
}

/**
 * Get offline fallback response
 */
function getOfflineFallback(request) {
    const url = new URL(request.url);
    
    // HTML pages - return cached index.html
    if (request.destination === 'document') {
        return caches.match('/index.html') || new Response(
            '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
        );
    }
    
    // Images - return placeholder SVG
    if (request.destination === 'image') {
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#1A1A2E"/>
                <text x="200" y="150" text-anchor="middle" fill="#D4AF37" font-family="Arial" font-size="16">
                    Image Unavailable Offline
                </text>
            </svg>`,
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
    
    // API requests - return error response
    if (url.pathname.startsWith('/api/')) {
        return new Response(
            JSON.stringify({ 
                error: 'Offline', 
                message: 'This feature requires an internet connection' 
            }),
            { 
                status: 503,
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
    
    // Default fallback
    return new Response('Offline', { status: 503 });
}

// =============================================================================
// SERVICE WORKER EVENT HANDLERS
// =============================================================================

/**
 * Install Event - Cache critical resources
 */
self.addEventListener('install', event => {
    console.log('🚀 Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            preloadCriticalResources(),
            self.skipWaiting() // Activate immediately
        ])
    );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', event => {
    console.log('✅ Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            cleanOldCaches(),
            self.clients.claim() // Take control immediately
        ])
    );
});

/**
 * Fetch Event - Handle all network requests
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Skip if shouldn't cache
    if (!shouldCache(request.url)) {
        return;
    }
    
    // Choose caching strategy based on request type
    if (CRITICAL_ASSETS.some(asset => request.url.endsWith(asset)) || 
        STATIC_ASSETS.includes(request.url)) {
        // Critical and static assets: Cache first
        event.respondWith(cacheFirstStrategy(request));
    } else if (IMAGE_PATTERNS.some(pattern => request.url.includes(pattern))) {
        // Images: Cache first with long expiry
        event.respondWith(cacheFirstStrategy(request));
    } else if (API_PATTERNS.some(pattern => request.url.includes(pattern))) {
        // API requests: Network first
        event.respondWith(networkFirstStrategy(request));
    } else if (request.destination === 'document') {
        // HTML pages: Stale while revalidate
        event.respondWith(staleWhileRevalidateStrategy(request));
    } else {
        // Everything else: Stale while revalidate
        event.respondWith(staleWhileRevalidateStrategy(request));
    }
});

/**
 * Background Sync - Handle offline form submissions
 */
self.addEventListener('sync', event => {
    console.log('🔄 Service Worker: Background sync triggered');
    
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(handleOfflineFormSubmissions());
    }
    
    if (event.tag === 'analytics-sync') {
        event.waitUntil(handleOfflineAnalytics());
    }
});

/**
 * Push Notifications
 */
self.addEventListener('push', event => {
    console.log('📱 Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/android-chrome-192x192.png',
        badge: '/favicon-32x32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 'portfolio-update'
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/favicon-32x32.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/favicon-32x32.png'
            }
        ],
        requireInteraction: false,
        silent: false
    };
    
    event.waitUntil(
        self.registration.showNotification('Thanatsitt Portfolio', options)
    );
});

/**
 * Notification Click Handler
 */
self.addEventListener('notificationclick', event => {
    console.log('🔔 Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

/**
 * Message Handler - Communication with main thread
 */
self.addEventListener('message', event => {
    console.log('💬 Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => 
                Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
            )
        );
    }
});

// =============================================================================
// BACKGROUND TASKS
// =============================================================================

/**
 * Handle offline form submissions
 */
async function handleOfflineFormSubmissions() {
    try {
        const cache = await caches.open(API_CACHE);
        const requests = await cache.keys();
        
        for (const request of requests) {
            if (request.url.includes('/api/contact') || request.url.includes('formspree.io')) {
                try {
                    const response = await fetch(request);
                    if (response.ok) {
                        await cache.delete(request);
                        console.log('✅ Offline form submission sent successfully');
                        
                        // Notify the main thread
                        const clients = await self.clients.matchAll();
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'FORM_SYNC_SUCCESS',
                                message: 'Your message was sent successfully!'
                            });
                        });
                    }
                } catch (error) {
                    console.error('❌ Failed to send offline form submission:', error);
                }
            }
        }
    } catch (error) {
        console.error('❌ Background sync failed:', error);
    }
}

/**
 * Handle offline analytics
 */
async function handleOfflineAnalytics() {
    try {
        const cache = await caches.open(API_CACHE);
        const requests = await cache.keys();
        
        for (const request of requests) {
            if (request.url.includes('/api/analytics') || request.url.includes('google-analytics.com')) {
                try {
                    await fetch(request);
                    await cache.delete(request);
                    console.log('✅ Offline analytics data sent');
                } catch (error) {
                    console.warn('⚠️ Failed to send offline analytics:', error);
                }
            }
        }
    } catch (error) {
        console.error('❌ Analytics sync failed:', error);
    }
}

// =============================================================================
// PERIODIC BACKGROUND SYNC (if supported)
// =============================================================================

self.addEventListener('periodicsync', event => {
    if (event.tag === 'portfolio-update-check') {
        event.waitUntil(checkForPortfolioUpdates());
    }
});

async function checkForPortfolioUpdates() {
    try {
        const response = await fetch('/api/version');
        const data = await response.json();
        
        if (data.version !== CACHE_NAME) {
            // New version available
            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                client.postMessage({
                    type: 'UPDATE_AVAILABLE',
                    message: 'A new version of the portfolio is available!'
                });
            });
        }
    } catch (error) {
        console.warn('⚠️ Failed to check for updates:', error);
    }
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

self.addEventListener('error', event => {
    console.error('❌ Service Worker Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('❌ Service Worker Unhandled Rejection:', event.reason);
});

// =============================================================================
// INITIALIZATION
// =============================================================================

console.log('🎯 Service Worker: Thanatsitt Portfolio SW loaded successfully!');
console.log('📦 Cache Version:', CACHE_NAME);
console.log('🚀 Ready to serve offline content and enhance performance!');
