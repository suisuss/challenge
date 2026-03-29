import { Request, Response } from 'express';

export const handle404Error = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Resource not found'
  });
};
