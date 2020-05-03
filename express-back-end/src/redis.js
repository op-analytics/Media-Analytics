const redis = require('redis');
const assert = require('assert');
const { AbortError, AggregateError, ReplyError } = require('redis');

module.exports = {
  redis,
  connect: database => {
    const client = redis.createClient(database);

    client.on('ready', function() {
      //eslint-disable-next-line
      console.log('Redis is ready');
    });

    client.on('error', function(err) {
      //eslint-disable-next-line
      console.log('Error in Redis');
      throw err;
    });

    return client;
  },
  disconnect: client => client.quit(),
};
