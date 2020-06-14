import { Document } from 'mongoose';

export default interface FrequencyDocument extends Document {
  word: string;
  media_outlet: string;
  year: number;
  rank: number;
  count: number;
  freq: number;
}
