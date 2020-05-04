const redis = require('redis');
const config = require('./config');
const { promisify } = require('util');

const client = redis.createClient(config.redisURI);

client.on('ready', function() {
  //eslint-disable-next-line
  console.log('Redis is ready');
});

client.on('error', function(err) {
  //eslint-disable-next-line
  console.log('Error in Redis');
  throw err;
});

client.get = promisify(client.get).bind(client);

module.exports = client;
