const { Schema, model } = require('mongoose');
const client = require('../../../redis');

const User = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
});

User.methods.usedTokens = async function() {
  const userId = this._id;
  const userTokens = await client.get(`${userId}_tokens`);
  return userTokens ? userTokens : 0;
};

User.methods.resetTokens = function() {
  const userId = this._id;
  client.set(`${userId}_tokens`, 0);
};

User.methods.useToken = async function() {
  const userId = this._id;
  const currentTokens = await this.usedTokens();
  if (currentTokens > 0) {
    client.set(`${userId}_tokens`, currentTokens - 1);
    return true;
  }
  console.log(`User ${userId}: Attempted to use tokens that did not exist`);
  return false;
};

User.path('email').validate(value => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}, 'Invalid email');

module.exports = model('user', User);
