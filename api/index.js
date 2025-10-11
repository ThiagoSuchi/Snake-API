import serverless from 'serverless-http';
import app from '../src/app.js';

console.log('🚀 [API/INDEX] Iniciando serverless function...');
console.log('📍 [API/INDEX] Environment:', process.env.NODE_ENV || 'development');
console.log('🔗 [API/INDEX] MongoDB URI configurada:', process.env.MONGODB_URI ? 'SIM ✅' : 'NÃO ❌');

const handler = serverless(app);

console.log('✅ [API/INDEX] Handler serverless criado com sucesso!');

export default handler;
