import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { ApiError } from "./api-error";

export const generateToken = (
  payload: object,
  secret: string,
  time: string | number
): string => {
  return jwt.sign(payload, secret as Secret, {
    expiresIn: time as SignOptions["expiresIn"],
  });
};

export const verifyToken = (
  token: string,
  secret: string
): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(400, "Token expired");
    }
    return null;
  }
};
