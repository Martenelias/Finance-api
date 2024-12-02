import { Request, Response, NextFunction } from 'express';
import CustomError from '../components/helpers/CustomError';

const errorMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    let messageForClient;
    if (error.statusCode) {
        messageForClient = error.message;
    } else {
        messageForClient = 'Internal server error';
    }

    return res.status(error.statusCode || 500).json({
    success: false,
    message: messageForClient,
  });
};

export default errorMiddleware;