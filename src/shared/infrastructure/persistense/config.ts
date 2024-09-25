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
    await client.end();
  }
};

export default pgConnect;
