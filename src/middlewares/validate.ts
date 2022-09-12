import Koa from 'koa';
import { AnyZodObject, ZodError } from 'zod';
import { Role } from '../entity/User';
import { JwtPayload } from '../utils/jwt';

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
          error: error.issues
        };
      } else {
        throw error;
      }
    }
  };

// must be called after `checkToken` middleware
export const validateUserRole =
  (role: Role) => async (ctx: Koa.Context, next: Koa.Next) => {
    const { userToken }: { userToken: JwtPayload } = ctx.state;
    if (userToken && userToken.role === role) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {
        error: 'You do not have permissions to access this resource'
      };
    }
  };
