import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { getTokenFromCookies } from '../utils/jwt';
import config from '../config';

export const checkToken = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    const token = getTokenFromCookies(ctx);
    const decodedToken = jwt.verify(token, config.jwtSecretKey);
    ctx.state.userToken = decodedToken;
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Jwt token is invalid or expired' };
  }
};
