import serverless from 'serverless-http';
import app from '../src/app-simple.js';

console.log('🚀 [SERVERLESS] Iniciando...');

export default serverless(app);
