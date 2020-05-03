const redis = require('redis');
const assert = require('assert');
const { AbortError, AggregateError, ReplyError } = require('redis');

let client = redis.createClient(database);
module.exports = {
  redis,
  client,
  connect: database => {
    client = redis.createClient(database);

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
  disconnect: (clientToDisconnect = client) => clientToDisconnect.quit(),
};
