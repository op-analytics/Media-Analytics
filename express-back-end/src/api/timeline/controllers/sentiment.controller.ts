import { Request, Response } from 'express';

import { GetSentiment } from '../lib/sentiment';

export async function getData(req: Request, res: Response): Promise<void> {
  const { word: dirtyWord, year_from: yearFrom, year_to: yearTo } = req.body;
  const word = dirtyWord.trim().toLowerCase();
  const sentimentData = await GetSentiment(word, yearFrom, yearTo);
  if (sentimentData.length > 0) {
    res.json({ data: sentimentData });
    return;
  }
  res.status(404).json({
    error: 'No sentiment data was found for given parameters',
  });
}
