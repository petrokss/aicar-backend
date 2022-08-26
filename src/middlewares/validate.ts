import Koa from 'koa';
import { AnyZodObject, ZodError } from 'zod';

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
      }
      await next();
    }
  };
