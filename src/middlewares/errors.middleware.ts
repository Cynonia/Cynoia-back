import { Request, Response, NextFunction } from 'express';
import { logger } from '@sonatel-os/juf-xpress-logger';
import { HttpError } from 'http-errors-plus';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Si c'est une erreur http-errors-plus
  const statusCode = (err as HttpError).meta.status || 500;
  const message = (err as HttpError).message || 'Internal Server Error';

  // Logger l'erreur
  logger.writeLog({
    params: {
      logFrom: req.ip || 'unknown',
      userIp: req.ip || 'unknown',
      method: req.method,
      payload: req.body || {},
      headers: req.headers,
      logTarget: req.originalUrl,
      userAgent: req.headers['user-agent'] || 'unknown',
      logStatus: statusCode,
      logStatusCode: message
    },
    userName: (req as any).user?.username || 'anonymous',
    logLevel: 'ERROR',
    action: `${req.method} ${req.originalUrl} - ERROR`,
    duration: 0
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

