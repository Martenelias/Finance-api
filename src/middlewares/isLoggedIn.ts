import { Request, Response, NextFunction } from 'express';
import jwtServices from '../components/helpers/jwtServices';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const decoded = jwtServices.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  res.locals.user = decoded;

  return next();

};

export default isLoggedIn;