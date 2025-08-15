import { Response } from 'express';

type ResponseData<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
};

export const sendSuccess = <T = any>(
  res: Response,
  data: T,
  message: string = 'Operation successful',
  statusCode: number = 200
) => {
  const response: ResponseData<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string = 'Something went wrong',
  errors: any = null,
  statusCode: number = 500
) => {
  const response: ResponseData = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};
