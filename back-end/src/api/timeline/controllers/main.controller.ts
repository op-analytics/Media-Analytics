import { Request, Response } from 'express';

export function home(_: Request, res: Response): void {
  res.json({ message: 'You reached timeline' });
}
