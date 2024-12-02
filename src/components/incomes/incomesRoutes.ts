import express from 'express';
import incomesControllers from './incomesControllers';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import transactionsValidation from '../../middlewares/transactionsValidatorMiddleware';

const router = express.Router();

router.get('/', incomesControllers.getAllIncomes);

router.get(
  '/:id',
  validatorMiddleware.isIdNumber,
  incomesControllers.getIncomeById
);

router.post(
  '/',
  transactionsValidation.validateTransactionData,
  incomesControllers.createIncome
);

router.put(
  '/:id',
  transactionsValidation.validateTransactionData,
  validatorMiddleware.isIdNumber,
  incomesControllers.updateIncome
);

router.delete(
  '/:id',
  validatorMiddleware.isIdNumber,
  incomesControllers.deleteIncome
);

export default router;