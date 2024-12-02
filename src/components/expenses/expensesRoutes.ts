import express from 'express';
import expensesControllers from './expensesControllers';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import transactionsValidatorMiddleware from '../../middlewares/transactionsValidatorMiddleware';

const router = express.Router();

router.get('/', expensesControllers.getAllExpenses);

router.get(
  '/:id',
  validatorMiddleware.isIdNumber,
  expensesControllers.getExpenseById
);

router.post(
  '/',
  transactionsValidatorMiddleware.validateTransactionData,
  expensesControllers.createExpense
);

router.put(
  '/:id',
  transactionsValidatorMiddleware.validateTransactionData,
  validatorMiddleware.isIdNumber,
  expensesControllers.updateExpense
);

router.delete(
  '/:id',
  validatorMiddleware.isIdNumber,
  expensesControllers.deleteExpense
);

export default router;