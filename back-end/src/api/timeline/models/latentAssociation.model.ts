import { model, Schema } from 'mongoose';

import LatentAssociationDocument from '../interfaces/LatentAssociationDocument';

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
  media_outlet: {
    type: String,
    required: true
  },
});

LatentAssociation.set('collection', 'latent_association');

export default model<LatentAssociationDocument>(
  'latent_association',
  LatentAssociation,
);
