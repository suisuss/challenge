import 'express';

interface AuthUser {
  id: number;
  role: string;
  roleId: number;
  csrf_hmac?: string;
  iat?: number;
  exp?: number;
}

interface TokenPayload {
  id: number;
  role: string;
  roleId: number;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      refreshToken?: TokenPayload;
    }
  }
}
