/* eslint-disable no-console */
import "dotenv/config";
import { Client } from "pg";

const pgConnect = async (): Promise<void> => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URI,
  });

  try {
    await client.connect();
    console.log(`✅ Connected to PostgreSQL database`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  } finally {
    // Puedes elegir si cerrar la conexión aquí o mantenerla abierta dependiendo de tu uso
    await client.end();
  }
};

export default pgConnect;
