import { Response } from 'express';

import TokenHelper from '@/api/auth/helpers/TokenHelper';
import UserRequest from '@/api/auth/interfaces/UserRequest';

import { GetSentiment } from '../lib/sentiment';

/**
 * Get sentiment data
 * @param req - Express' request object with a user
 * @param res - Express' response object
 */
export async function getData(req: UserRequest, res: Response): Promise<void> {
  const { word: dirtyWord, year_from: yearFrom, year_to: yearTo } = req.body;

  // Clean the words in the request
  const word = dirtyWord.trim().toLowerCase();

  // Get the sentiment data for the given parameters
  const sentimentData = await GetSentiment(word, yearFrom, yearTo);

  // If we found data use a users token and respond with the data
  if (sentimentData.length > 0) {
    TokenHelper.useToken(req.user!!);
    res.json({ data: sentimentData });
    return;
  }

  // If we found no data let the user know
  res.status(404).json({
    error: 'No sentiment data was found for given parameters',
  });
}
