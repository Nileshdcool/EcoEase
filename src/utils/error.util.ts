export class ApiError extends Error {
  statusCode: any = null;
  errorKey: any = null;
  constructor(
    message: string,
    statusCode: any,
    errorKey: any = 'unknown',
    stack: string = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorKey = errorKey;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
