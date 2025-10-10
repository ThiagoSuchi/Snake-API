import mongoose from "mongoose";

// Cache da conexão para Vercel serverless
let cachedConnection = null;

const connectDB = async () => {
	if (cachedConnection) {
		console.log("Usando conexão MongoDB em cache");
		return cachedConnection;
	}

	try {
		const connection = await mongoose.connect(process.env.MONGODB_URI, {
			serverSelectionTimeoutMS: 5000,
		});
		
		cachedConnection = connection;
		console.log("MongoDB conectado com sucesso!");
		return connection;
	} catch (error) {
		console.error("Erro ao conectar ao MongoDB:", error);
		throw error;
	}
};

export default connectDB;
