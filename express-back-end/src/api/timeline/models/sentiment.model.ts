import { model, Schema } from 'mongoose';

import SentimentDocument from '../interfaces/SentimentDocument';

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
  },
});

Sentiment.set('collection', 'sentiment');

export default model<SentimentDocument>('sentiment', Sentiment);
