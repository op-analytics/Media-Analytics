import Frequency from '../models/frequency.model';
import FrequencyData from '../interfaces/FrequencyData';

async function GetFrequency(
  words: string[],
  outlets: string[],
  yearFrom: number,
  yearTo: number,
): Promise<FrequencyData[]> {
  const frequencyData = await Frequency.find({
    word: { $in: words },
    media_outlet: { $in: outlets },
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();

  const cleanedFrequencyData = frequencyData.map(frequency => ({
    word: frequency.word,
    outlet: frequency.media_outlet,
    year: frequency.year,
    count: frequency.count,
    rank: frequency.rank,
    freq: frequency.freq,
  }));

  cleanedFrequencyData.sort((x, y) => x.year - y.year);

  return cleanedFrequencyData;
}

export { GetFrequency };
