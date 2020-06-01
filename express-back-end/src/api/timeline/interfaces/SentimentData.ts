export default interface SentimentData {
  word: string;
  data: {
    year: number;
    sentiment: number;
  }[];
}
