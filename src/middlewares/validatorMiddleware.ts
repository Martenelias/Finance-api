import { Request, Response, NextFunction } from 'express';

// Middleware to validate that the ID provided in the request params is a number
const isIdNumber = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Id is not a number',
    });
  }
  next();
};

export default { isIdNumber };