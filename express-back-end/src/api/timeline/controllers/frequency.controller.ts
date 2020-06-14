import { Response } from 'express';

import TokenHelper from '@/api/auth/helpers/TokenHelper';
import UserRequest from '@/api/auth/interfaces/UserRequest';

import { GetFrequency } from '../lib/frequency';

export async function getData(req: UserRequest, res: Response): Promise<void> {
  const { words: dirtyWords, outlets, year_from: yearFrom, year_to: yearTo } = req.body;
  const words = dirtyWords.map((word: string) => word.trim().toLowerCase());

  const frequencyData = await GetFrequency(words, outlets, yearFrom, yearTo);

  if (frequencyData.length > 0) {
    TokenHelper.useToken(req.user!!);
    res.json(frequencyData);
    return;
  }

  res.status(404).json({
    error: 'No frequency data was found for given parameters',
  });
}
