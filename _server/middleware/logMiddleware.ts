import { Request, Response, NextFunction } from 'express';

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  console.log('[TEST]', req.headers['x-test-name'], `[REQ]: ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });

  next();
};
