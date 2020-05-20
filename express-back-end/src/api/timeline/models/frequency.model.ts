import { Schema, model } from 'mongoose';

const Frequency = new Schema({
  word: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  freq: {
    type: Number,
    required: true,
  },
});

Frequency.set('collection', 'frequency');

export default model('frequency', Frequency);
