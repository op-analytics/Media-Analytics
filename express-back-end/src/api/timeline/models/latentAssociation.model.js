const { Schema, model } = require('mongoose');

const Latent_Association = new Schema({
  word: {
    type: String,
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
  media_outlet:{
    type: String,
    required: true,
  },
  vectors: {
    type: Array,
    required: true,
  },
});

Latent_Association.set('collection', 'latent_association');

module.exports = model('latent_association', Latent_Association);
