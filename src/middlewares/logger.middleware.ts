import { Request, Response, NextFunction } from 'express';
import { logger } from '@sonatel-os/juf-xpress-logger-edge';

// Middleware pour logger chaque requête HTTP
export const logRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Event de fin de réponse pour mesurer durée
  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.writeLog({
      params: {
        logFrom: req.ip || 'unknown',
        userIp: req.ip || 'unknown',
        method: req.method,
        payload: req.body || {},
        headers: req.headers,
        logTarget: req.originalUrl,
        userAgent: req.headers['user-agent'] || 'unknown',
        logStatus: res.statusCode,
        logStatusCode: res.statusMessage
      },
      logLevel: 'INFO',
      action: `${req.method} ${req.originalUrl}`,
      duration
    });
  });

  next();
};

