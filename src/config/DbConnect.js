import mongoose from "mongoose";

console.log('💾 [DB] Módulo de conexão carregado');

// Cache da conexão para Vercel serverless
let cachedConnection = null;

const connectDB = async () => {
	console.log('🔗 [DB] Tentando conectar ao MongoDB...');
	console.log('🔍 [DB] ReadyState atual:', mongoose.connection.readyState);
	
	// Se já existe conexão ativa, reutiliza
	if (cachedConnection && mongoose.connection.readyState === 1) {
		console.log("✅ [DB] Usando conexão MongoDB em cache");
		return cachedConnection;
	}

	try {
		// Desconectar qualquer conexão anterior
		if (mongoose.connection.readyState !== 0) {
			console.log('🔄 [DB] Desconectando conexão anterior...');
			await mongoose.disconnect();
		}

		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error('MONGODB_URI não definida nas variáveis de ambiente');
		}
		
		console.log('🌐 [DB] URI do MongoDB encontrada');
		console.log('🔗 [DB] Conectando ao MongoDB Atlas...');

		// Nova conexão com configurações otimizadas para serverless
		const connection = await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 10000,
			maxPoolSize: 1,
			minPoolSize: 1,
		});
		
		cachedConnection = connection;
		console.log("✅ [DB] MongoDB conectado com sucesso!");
		console.log("📊 [DB] Banco:", connection.connection.db.databaseName);
		return connection;
	} catch (error) {
		console.error("❌ [DB] Erro ao conectar ao MongoDB:", error.message);
		console.error("🔍 [DB] Detalhes do erro:", error);
		cachedConnection = null;
		throw error;
	}
};

export default connectDB;
