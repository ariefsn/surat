import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../helper';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const requestId = req.headers['x-request-id'] || randomUUID();

    // Save the requestId in response locals so that it can be used in the controller
    res.locals.requestId = requestId;

    logger.info(
      {
        requestId,
        inbound: true,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      },
      'Incoming request',
    );

    res.on('finish', () => {
      const duration = Date.now() - start;

      logger.info(
        {
          requestId,
          outbound: true,
          method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          contentLength: res.get('content-length') || 0,
        },
        'Outgoing response',
      );
    });

    next();
  }
}
