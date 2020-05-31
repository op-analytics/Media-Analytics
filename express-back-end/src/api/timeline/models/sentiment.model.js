const { Schema, model } = require('mongoose');

const Sentiment = new Schema({
  word: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  sentiment: {
    type: Number,
    required: true,
  }
});

Sentiment.set('collection', 'sentiment');

module.exports = model('sentiment', Sentiment);
