import { Document } from 'mongoose';

export default interface LatentAssociationDocument extends Document {
  word: string;
  vectors: number[];
  year_from: number;
  year_to: number;
  media_outlet: string;
}
