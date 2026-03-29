import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        role: string;
        roleId: number;
        csrf_hmac?: string;
        iat?: number;
        exp?: number;
      };
      refreshToken: {
        id: number;
        role: string;
        roleId: number;
        iat?: number;
        exp?: number;
      };
    }
  }
}
