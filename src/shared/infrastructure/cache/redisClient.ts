import { createClient } from 'redis';
import logger from '../logger/logger';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('✅ Connected to Redis');
  } catch (error) {
    logger.error('Failed to connect to Redis', error);
  }
};

export default redisClient;
