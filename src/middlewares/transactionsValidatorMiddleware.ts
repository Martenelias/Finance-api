import { Request, Response, NextFunction } from 'express';

// Middleware to validate transaction data (amount, date, categoryId, userId)
const validateTransactionData = (req: Request, res: Response, next: NextFunction) => {
  const { amount, transactionDate, categoryId, userId } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount is required and must be a positive number'
    });
  }

  if (!transactionDate || isNaN(Date.parse(transactionDate))) {
    return res.status(400).json({
      success: false,
      message: 'A valid date is required'
    });
  }

  if (!categoryId || isNaN(categoryId)) {
    return res.status(400).json({
      success: false,
      message: 'A valid category ID is required'
    });
  }

  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: 'A valid user ID is required'
    });
  }

  next();
};

export default { validateTransactionData };