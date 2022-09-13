import Koa from 'koa';
import { getTokenFromCookies, verifyJwt } from '../utils/jwt';
import type { DecodedToken } from '../types/jwt';

export const checkToken = async (ctx: Koa.Context, next: Koa.Next) => {
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
