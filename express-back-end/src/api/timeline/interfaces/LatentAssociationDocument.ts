import { Document } from 'mongoose';

export default interface LatentAssociationDocument extends Document {
  word: string;
  vectors: number[];
  // eslint-disable-next-line camelcase
  year_from: number;
  // eslint-disable-next-line camelcase
  year_to: number;
}
