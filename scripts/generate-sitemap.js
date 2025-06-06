const fs = require('fs');
const path = require('path');

const baseUrl = 'https://pigletpeakkung.github.io/Codex-Terra-Arcanum';
const currentDate = new Date().toISOString();

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/#about', priority: '0.8', changefreq: 'monthly' },
  { loc: '/#projects', priority: '0.9', changefreq: 'weekly' },
  { loc: '/#testimonials', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#contact', priority: '0.8', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ Sitemap generated successfully!');
