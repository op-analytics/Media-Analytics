import { Response } from 'express';
import { GetFrequency } from '../lib/frequency';
import { FrequencyRequest } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getData(req: FrequencyRequest, res: Response) {
  const { words: dirtyWords, year_from: yearFrom, year_to: yearTo } = req.body;
  const words = dirtyWords.map((word: string) => word.trim().toLowerCase());

  const frequencyData = await GetFrequency(words, yearFrom, yearTo);

  if (frequencyData.length > 0) return res.json({ data: frequencyData });

  return res.status(404).json({
    error: 'No frequency data was found for given parameters',
  });
}
