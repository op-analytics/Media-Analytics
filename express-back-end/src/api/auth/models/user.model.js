const { Schema, model } = require('mongoose');
const { client } = require('../../../redis');

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

User.methods.usedTokens = function() {
  const userId = this._id;
  return client.get(`${userId}_tokens`);
};

User.path('email').validate(value => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}, 'Invalid email');

module.exports = model('user', User);
