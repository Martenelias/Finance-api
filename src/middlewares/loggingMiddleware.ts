import { Request, Response, NextFunction } from 'express';

// Middleware to log the HTTP method, URL, and timestamp of the request
const logging = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}, ${new Date().toISOString()}`);
  next();
};

export default logging;