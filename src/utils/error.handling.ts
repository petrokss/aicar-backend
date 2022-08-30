import Koa from 'koa';

type ErrorWithMessage = {
  message: string;
};

type ErrorWithProperty<T extends string> = Record<T, any>;

function isErrorAnObject(error: unknown): error is Record<any, any> {
  return typeof error === 'object' && error !== null;
}

export function isErrorWithProperty<T extends string>(
  error: unknown,
  property: T
): error is ErrorWithProperty<T> {
  return (
    isErrorAnObject(error) &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  );
}

export function getErrorMessage(maybeError: unknown) {
  if (isErrorWithProperty<string>(maybeError, 'message'))
    return maybeError.message as ErrorWithMessage;

  try {
    return new Error(JSON.stringify(maybeError)).message;
  } catch {
    return new Error(String(maybeError)).message;
  }
}

export const checkSqlViolations = (ctx: Koa.Context, error: unknown) => {
  if (isErrorWithProperty(error, 'code') && error.code === '23505') {
    ctx.status = 409;
  } else {
    ctx.status = 500;
  }
  ctx.body = { error: getErrorMessage(error) };
};
