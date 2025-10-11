import app from '../src/app-simple.js';
import connectDB from '../src/config/DbConnect.js';

export default async (req, res) => {
  console.log(`📥 [${req.method}] ${req.url}`);
  
  try {
    // Conectar ao banco ANTES de processar a requisição
    await connectDB();
    console.log('✅ [DB] Conectado');
    
    // Processar a requisição com Express
    app(req, res);
    
  } catch (error) {
    console.error('❌ [HANDLER] Erro:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }
};
