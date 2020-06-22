import { Document } from 'mongoose';

export default interface SentimentDocument extends Document {
  word: string;
  year: number;
  sentiment: number;
}
