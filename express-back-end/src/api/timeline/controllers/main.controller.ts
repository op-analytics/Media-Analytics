import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function home(_: Request, res: Response) {
  res.json({ message: 'You reached timeline' });
}
