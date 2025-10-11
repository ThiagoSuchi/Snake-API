import serverless from 'serverless-http';
import app from '../src/app-simple.js';

console.log('� [HANDLER] Criando handler serverless...');

const handler = serverless(app, {
  binary: false,
  request: null,
  response: null,
});

console.log('✅ [HANDLER] Handler criado');

export default async (req, res) => {
  console.log(`📨 [HANDLER] ${req.method} ${req.url}`);
  try {
    await handler(req, res);
    console.log('✅ [HANDLER] Resposta processada');
  } catch (error) {
    console.error('❌ [HANDLER] Erro:', error);
    res.status(500).json({ error: 'Handler error', message: error.message });
  }
};
