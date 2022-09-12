import Koa from 'koa';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Role } from '../entity/User';

export type JwtPayload = {
  sub?: number;
  role?: Role;
  iat?: number;
  exp?: number;
};

export const signJwt = (payload: JwtPayload, options?: SignOptions) => {
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(payload, secretKey, { ...(options && options) });
};

export const getTokenFromCookies = (ctx: Koa.Context) => {
  const { token = '' } = ctx.cookie || {};
  return token;
};
