import Frequency from '../models/frequency.model';
import FrequencyData from '../interfaces/FrequencyData';

/**
 * Get frequency data from the database for a given set of parameters
 * @param words - The words to include in your search
 * @param outlets - The outlets to include in your search
 * @param yearFrom - The year to start your search from
 * @param yearTo - The year to end your search at
 * @returns The frequency data for the given parameters
 */
async function GetFrequency(
  words: string[],
  outlets: string[],
  yearFrom: number,
  yearTo: number,
): Promise<FrequencyData[]> {
  // Query for the data from the database that matches the arguments given
  const frequencyData = await Frequency.find({
    word: { $in: words },
    media_outlet: { $in: outlets },
    year: { $gte: yearFrom, $lte: yearTo },
  }).exec();

  //FIXME: We removed the ID here and probably shouldn't have
  //FIXME: We should probably rename the media_outlet field in the db instead
  // Rename media_outlet in the results
  const cleanedFrequencyData = frequencyData.map(frequency => ({
    word: frequency.word,
    outlet: frequency.media_outlet,
    year: frequency.year,
    count: frequency.count,
    rank: frequency.rank,
    freq: frequency.freq,
  }));

  //Sort the data by year before returning
  cleanedFrequencyData.sort((x, y) => x.year - y.year);

  return cleanedFrequencyData;
}

export { GetFrequency };
