export default interface FrequencyData {
  word: string;
  data: {
    year: number;
    rank: number;
    count: number;
    freq: number;
  }[];
}
