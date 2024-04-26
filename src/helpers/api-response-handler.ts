// success-handler.ts
import { Response } from 'express';
import { ErrorDto, SuccessDto } from '../types/success-error.dto';
import { INTERNAL_SERVER_ERROR } from '../constants/messages.constants';

export function handleSuccess<T>(res: Response, message: string, data?: T) {
  const successDto = new SuccessDto<T>(message, data);
  return res.status(200).json(successDto);
}

export function handleError(
  res: Response,
  message: string,
  statusCode: number,
  error: string = INTERNAL_SERVER_ERROR,
) {
  const errorDto = new ErrorDto(message, statusCode, error);
  return res.status(statusCode).json(errorDto);
}
