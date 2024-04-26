// success-handler.ts
import { Response } from 'express';
import { ErrorDto, SuccessDto } from '../types/success-error.dto';

export function handleSuccess<T>(res: Response, message: string, data?: T) {
  const successDto = new SuccessDto<T>(message, data);
  return res.status(200).json(successDto);
}

export function handleError(
  res: Response,
  message: string,
  statusCode: number,
  error: string = 'Internal Server Error',
) {
  const errorDto = new ErrorDto(message, statusCode, error);
  return res.status(statusCode).json(errorDto);
}
