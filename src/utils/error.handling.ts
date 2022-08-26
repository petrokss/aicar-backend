type ErrorWithMessage = {
  message: string;
};

type GenericError<T extends string> = Record<T, any>;

function isErrorAnObject(error: unknown): error is Record<any, any> {
  return typeof error === 'object' && error !== null;
}

export function isErrorWithProperty<T extends string>(
  error: unknown,
  property: T
): error is GenericError<T> {
  return (
    isErrorAnObject(error) &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithProperty<string>(maybeError, 'message'))
    return maybeError as ErrorWithMessage;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
