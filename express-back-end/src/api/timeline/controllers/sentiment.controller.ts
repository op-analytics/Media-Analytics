import { Response } from 'express';

import TokenHelper from '@/api/auth/helpers/TokenHelper';
import UserRequest from '@/api/auth/interfaces/UserRequest';

import { GetSentiment } from '../lib/sentiment';

export async function getData(req: UserRequest, res: Response): Promise<void> {
  if (!(await TokenHelper.userHasTokens(req.user!!))) {
    res.status(429).json({
      message: 'No tokens available to make this request',
    });
    return;
  }

  const { word: dirtyWord, year_from: yearFrom, year_to: yearTo } = req.body;
  const word = dirtyWord.trim().toLowerCase();
  const sentimentData = await GetSentiment(word, yearFrom, yearTo);
  if (sentimentData.length > 0) {
    TokenHelper.useToken(req.user!!);
    res.json({ data: sentimentData });
    return;
  }
  res.status(404).json({
    error: 'No sentiment data was found for given parameters',
  });
}
