import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      const zodError = error as ZodError;
      const formattedErrors = zodError.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        error: "Validation error",
        detail: formattedErrors,
      });
    }
  };
