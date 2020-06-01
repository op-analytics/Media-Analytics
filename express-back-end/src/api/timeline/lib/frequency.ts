import Frequency from '../models/frequency.model';
import FrequencyDocument from '../interfaces/FrequencyDocument';

async function GetFrequency(
  words: string[],
  outlets: string[],
  yearFrom: number,
  yearTo: number,
): Promise<FrequencyDocument[]> {
  const frequencyData = await Frequency.find({
    word: { $in: words },
    media_outlet: { $in: outlets },
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();

  frequencyData.sort((x, y) => x.year - y.year);
  return frequencyData;
}

export { GetFrequency };
