import Koa from 'koa';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import type { CustomJwtPayload, DecodedToken } from '../types/jwt';

export const signJwt = (payload: CustomJwtPayload, options?: SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(payload, secretKey, { ...(options && options) });
};

export const verifyJwt = (token: string): DecodedToken =>
  jwt.verify(token, config.jwtSecretKey);

export const getTokenFromCookies = (ctx: Koa.Context): string => {
  const { token = '' } = ctx.cookie || {};
  return token;
};
