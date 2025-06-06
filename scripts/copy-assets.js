const fs = require('fs');
const path = require('path');

console.log('📁 Copying assets...');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory ${src} does not exist, skipping...`);
    return;
  }

  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(src, dest);
  }
}

// Copy assets
if (fs.existsSync('assets')) {
  copyRecursive('assets', 'dist/assets');
  console.log('✅ Assets copied successfully');
} else {
  // Create placeholder assets for development
  const placeholderAssets = [
    'dist/assets/thanatsitt-profile.jpg',
    'dist/assets/portfolio-preview.jpg',
    'dist/assets/og-image.jpg',
    'dist/assets/twitter-card.jpg'
  ];

  placeholderAssets.forEach(assetPath => {
    const dir = path.dirname(assetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create a simple placeholder file
    fs.writeFileSync(assetPath, 'placeholder');
  });
  
  console.log('✅ Placeholder assets created');
}

// Copy favicon and other root assets
const rootAssets = ['favicon.ico', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png'];
rootAssets.forEach(asset => {
  if (fs.existsSync(asset)) {
    fs.copyFileSync(asset, `dist/${asset}`);
  }
});

console.log('✅ Root assets copied');
