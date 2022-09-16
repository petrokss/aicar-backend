import Koa from 'koa';
import { getTokenFromCookies, verifyJwt } from '../utils/jwt';
import type { DecodedToken } from '../types/jwt';

export const checkIfTokenPresent = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    const token = getTokenFromCookies(ctx);
    const decodedToken: DecodedToken = verifyJwt(token);
    ctx.state.user = decodedToken;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Jwt token is invalid or expired' };
  }
};

export const checkIfTokenAbsent = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = getTokenFromCookies(ctx);
  if (!token) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = { error: 'The user is already logged in' };
  }
};
