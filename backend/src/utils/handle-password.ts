import argon2 from 'argon2';
import { ApiError } from './api-error';

export const generateHashedPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  passwordFromDb: string,
  passwordFromUser: string
): Promise<void> => {
  const isPasswordValid = await argon2.verify(passwordFromDb, passwordFromUser);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid credential');
  }
};
