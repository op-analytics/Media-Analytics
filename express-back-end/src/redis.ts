import { createHandyClient } from 'handy-redis';

import config from './config';

// Create a redis client
const client = createHandyClient(config.redisURI);

// Log when redis is ready
client.redis.on('ready', () => {
  // eslint-disable-next-line
  console.log('Redis is ready');
});

// Crash the app if there was a redis error
client.redis.on('error', (err: Error) => {
  // eslint-disable-next-line
  console.log('Error in Redis');
  throw err;
});

export default client;
