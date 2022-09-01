import Koa from 'koa';
import { AnyZodObject, ZodError } from 'zod';
import { Role } from '../entity/User';
import { getErrorMessage, isErrorWithProperty } from '../utils/error.handling';
import { verifyJwt, JwtPayload } from '../utils/jwt';

export const validate =
  (schema: AnyZodObject) => async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      schema.parse({
        query: ctx.request.query,
        body: ctx.request.body
      });
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.status = 400;
        ctx.body = {
          error: error.errors
        };
      } else {
        throw error;
      }
    }
  };

export const validateUserRole =
  (role: Role) => async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      const cookiesAccessToken = ctx.cookies.get('access_token') || '';
      const decoded = verifyJwt(cookiesAccessToken) as JwtPayload;

      if (decoded && decoded.role === role) {
        await next();
      } else {
        ctx.status = 403;
        ctx.body = {
          error: 'You do not have permissions to access this resource'
        };
      }
    } catch (error) {
      if (
        isErrorWithProperty(error, 'message') &&
        error.message === 'Jwt token is invalid or expired'
      ) {
        ctx.status = 401;
        ctx.body = { error: getErrorMessage(error) };
      } else {
        throw error;
      }
    }
  };
