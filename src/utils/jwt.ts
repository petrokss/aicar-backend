import jwt, { SignOptions } from 'jsonwebtoken';
import { Role } from '../entity/User';

export type JwtPayload = {
  sub?: number;
  role?: Role;
};

export const signJwt = (payload: JwtPayload, options?: SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(payload, secretKey, { ...(options && options) });
};

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Jwt token is invalid or expired');
  }
};
