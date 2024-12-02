import express from 'express';
import budgetsControllers from './budgetsControllers';
import isYearMonthNumber from '../../middlewares/isYearMonthNumber';

const router = express.Router();

router.get('/', budgetsControllers.getAllBudgets);

router.get(
  '/:year/:month',
  isYearMonthNumber.isYearMonthNumber,
  budgetsControllers.getBudgetByMonth
);

router.post(
  '/',
  budgetsControllers.createBudget
);

router.put(
  '/:year/:month',
  isYearMonthNumber.isYearMonthNumber,
  budgetsControllers.updateBudget
);

router.delete(
  '/:year/:month',
  isYearMonthNumber.isYearMonthNumber,
  budgetsControllers.deleteBudget
);

export default router;