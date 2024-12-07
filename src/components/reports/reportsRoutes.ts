import express from 'express';
import reportsControllers from './reportsControllers';

const router = express.Router();

router.get('/:userId', reportsControllers.getAllMonthlyReports);

router.get(
  '/:month',
  reportsControllers.getMonthlyReportByMonth
);

router.get(
  '/savings/:userId',
  reportsControllers.getSavingsReport
);

router.get(
  '/year-summary/:userId/:year',
  reportsControllers.getYearEndSummaryReport
);

router.get(
  '/transaction-frequency/:userId/:year',
  reportsControllers.getTransactionFrequencyReport
);

export default router;