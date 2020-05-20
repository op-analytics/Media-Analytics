import { Schema, model } from 'mongoose';

const LatentAssociation = new Schema({
  word: {
    type: String,
    required: true,
  },
  vectors: {
    type: Array,
    required: true,
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_from: {
    type: Number,
    required: true,
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  year_to: {
    type: Number,
    required: true,
  },
});

LatentAssociation.set('collection', 'latent_association');

export default model('latent_association', LatentAssociation);
