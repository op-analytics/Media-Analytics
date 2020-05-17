const { Schema, model } = require('mongoose');

const LatentAssociation = new Schema({
  word: {
    type: String,
    required: true,
  },
  vectors: {
    type: Array,
    required: true,
  },
  year_from: {
    type: Number,
    required: true,
  },
  year_to: {
    type: Number,
    required: true,
  },
});

LatentAssociation.set('collection', 'latent_association');

module.exports = model('latent_association', LatentAssociation);
