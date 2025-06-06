require('dotenv').config();

console.log('🔍 Environment Variables Test');
console.log('================================');

const requiredVars = [
  'NODE_ENV',
  'APP_NAME',
  'APP_URL',
  'GITHUB_USERNAME',
  'LINKEDIN_URL'
];

const optionalVars = [
  'GOOGLE_ANALYTICS_ID',
  'SENDGRID_API_KEY',
  'DATABASE_URL'
];

console.log('\n✅ Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value ? '✓' : '❌'} ${value || 'NOT SET'}`);
});

console.log('\n🔧 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value ? '✓' : '○'} ${value ? 'SET' : 'not set'}`);
});

console.log('\n🏗️  Feature Flags:');
console.log(`ENABLE_ANALYTICS: ${process.env.ENABLE_ANALYTICS}`);
console.log(`ENABLE_BLOG: ${process.env.ENABLE_BLOG}`);
console.log(`ENABLE_DARK_MODE: ${process.env.ENABLE_DARK_MODE}`);
console.log(`ENABLE_ANIMATIONS: ${process.env.ENABLE_ANIMATIONS}`);
