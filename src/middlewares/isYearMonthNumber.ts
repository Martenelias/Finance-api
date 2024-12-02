import { Request, Response, NextFunction } from 'express';

const isYearMonthNumber = (req: Request, res: Response, next: NextFunction) => {
  const { year, month } = req.params;
  if (isNaN(Number(year)) || isNaN(Number(month))) {
    return res.status(400).json({
      success: false,
      message: 'Year and month must be valid numbers',
    });
  }
  next();
};

export default { isYearMonthNumber };