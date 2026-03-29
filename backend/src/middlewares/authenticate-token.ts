import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils';
import { env } from '../config';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, 'Unauthorized. Please provide valid tokens.');
  }

  try {
    const user = jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    req.user = user as Express.Request['user'];
    req.refreshToken = decodedRefreshToken as Express.Request['refreshToken'];
    next();
  } catch (err) {
    throw new ApiError(401, 'Unauthorized. Please provide valid tokens.');
  }
};
