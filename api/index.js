import serverless from 'serverless-http';
import app from '../src/app-simple.js';
import connectDB from '../src/config/DbConnect.js';

const handler = serverless(app);

export default async (req, res) => {
  try {
    await connectDB();
    await handler(req, res);
  } catch (error) {
    console.error('Erro no handler:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Erro interno', message: error.message });
    }
  }
};
