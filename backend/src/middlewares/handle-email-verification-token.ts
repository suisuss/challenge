import { Request, Response, NextFunction } from "express";
import { env } from "../config";
import { ApiError, verifyToken } from "../utils";

export const handleEmailVerificationToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.params.token;
  if (!token) {
    throw new ApiError(404, "Invalid token");
  }

  const decodeToken = verifyToken(token, env.EMAIL_VERIFICATION_TOKEN_SECRET!);
  if (!decodeToken || !decodeToken.id) {
    throw new ApiError(400, "Invalid token");
  }

  req.user = decodeToken as Express.Request["user"];
  next();
};
