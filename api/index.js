import app from '../src/app-simple.js';

export default function handler(req, res) {
  console.log(`📨 [HANDLER] ${req.method} ${req.url}`);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    console.log('✅ [OPTIONS] Respondido');
    res.status(200).end();
    return;
  }

  try {
    app(req, res);
    console.log('✅ [HANDLER] Processado');
  } catch (error) {
    console.error('❌ [HANDLER] Erro:', error);
    res.status(500).json({ error: error.message });
  }
}
