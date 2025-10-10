import mongoose from "mongoose";

// Cache da conexão para Vercel serverless
let cachedConnection = null;

const connectDB = async () => {
	// Se já existe conexão ativa, reutiliza
	if (cachedConnection && mongoose.connection.readyState === 1) {
		console.log("✅ Usando conexão MongoDB em cache");
		return cachedConnection;
	}

	try {
		// Desconectar qualquer conexão anterior
		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
		}

		// Nova conexão com configurações otimizadas para serverless
		const connection = await mongoose.connect(process.env.MONGODB_URI, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 10000,
			maxPoolSize: 1,
			minPoolSize: 1,
		});
		
		cachedConnection = connection;
		console.log("✅ MongoDB conectado com sucesso!");
		return connection;
	} catch (error) {
		console.error("❌ Erro ao conectar ao MongoDB:", error.message);
		cachedConnection = null;
		throw error;
	}
};

export default connectDB;
