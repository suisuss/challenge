import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils';

export const isUserAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const { roleId } = req.user!;
  if (roleId !== 1) {
    throw new ApiError(403, 'You do not have permission to this resource');
  }
  next();
};
