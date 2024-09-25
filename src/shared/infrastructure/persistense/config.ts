import "dotenv/config";
import { Client } from "pg";
import logger from "../logger/logger";
const pgConnect = async (): Promise<void> => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URI,
  });

  try {
    await client.connect();
    logger.info(`✅ Connected to PostgreSQL database`);
  } catch (error) {
    logger.error("❌ Failed to connect to the database:", { error });
  } finally {
    await client.end();
  }
};

export default pgConnect;
