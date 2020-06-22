import { Response } from 'express';

import TokenHelper from '@/api/auth/helpers/TokenHelper';
import UserRequest from '@/api/auth/interfaces/UserRequest';

import { GetFrequency } from '../lib/frequency';

/**
 * Get frequency data
 * @param req - Express' request object with a user
 * @param res - Express' response object
 */
export async function getData(req: UserRequest, res: Response): Promise<void> {
  const { words: dirtyWords, outlets, year_from: yearFrom, year_to: yearTo } = req.body;
  // Clean the words in the request
  const words = dirtyWords.map((word: string) => word.trim().toLowerCase());

  // Get the frequency data for the given parameters
  const frequencyData = await GetFrequency(words, outlets, yearFrom, yearTo);

  // If we found data use a users token and respond with the data
  if (frequencyData.length > 0) {
    TokenHelper.useToken(req.user!!);
    res.json(frequencyData);
    return;
  }

  // If we found no data let the user know
  res.status(404).json({
    error: 'No frequency data was found for given parameters',
  });
}
