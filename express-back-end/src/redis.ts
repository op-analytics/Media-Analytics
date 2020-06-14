import { createHandyClient } from 'handy-redis';

import config from './config';

const client = createHandyClient(config.redisURI);

client.redis.on('ready', () => {
  // eslint-disable-next-line
  console.log('Redis is ready');
});

client.redis.on('error', (err: Error) => {
  // eslint-disable-next-line
  console.log('Error in Redis');
  throw err;
});

export default client;
