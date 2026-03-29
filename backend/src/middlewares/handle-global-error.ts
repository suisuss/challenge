import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";

export const handleGlobalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
};
