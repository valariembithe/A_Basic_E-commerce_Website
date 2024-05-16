import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './db';

dotenv.config();

async function startServer() {
  const app = express();

  app.use(express.json());

  try {
    const db = await connectToDatabase();

    process.on('SIGINT', async () => {
      console.log('Closing MongoDB connection');
      await db.client.close();
      process.exit();
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();