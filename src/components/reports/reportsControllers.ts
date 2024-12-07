import { NextFunction, Request, Response } from 'express';
import reportsServices from './reportsServices';
import CustomError from '../helpers/CustomError';

// Controller to get all monthly reports
const getAllMonthlyReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    const reports = await reportsServices.getAllMonthlyReports(userId);
    return res.status(200).json({
      success: true,
      message: 'List of monthly reports',
      reports,
    });
  } catch (error) {
    return next(error);
  }
};

// Controller to get a specific monthly report by month
const getMonthlyReportByMonth = async (req: Request, res: Response, next: NextFunction) => {
  const { month } = req.params;  // Expecting 'YYYY-MM' format, like '2024-11'
  const { year } = req.query;    // 'year' from query, expecting a number like '2024'
  const userId = Number(req.params.userId);  // User ID, converting to a number

  try {
    // Extract the month number from the 'YYYY-MM' format
    const monthNumber = parseInt(month.split('-')[1]);  // Split 'YYYY-MM' and get the month part (e.g. '11' -> 11)

    // Make sure the 'year' is a number as well, in case it's needed for any validation
    const yearNumber = year ? Number(year) : new Date().getFullYear(); // Default to current year if not provided

    // Call the service with the correct parameters
    const report = await reportsServices.getMonthlyReportByMonth(monthNumber, yearNumber, userId);
    
    if (!report) {
      const error = new CustomError('Report not found', 404);
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: 'Monthly report found',
        report,
      });
    }
  } catch (error) {
    const customError = new CustomError('Failed to retrieve monthly report', 500);
    return next(customError);
  }
};


// Get the savings report
const getSavingsReport = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const report = await reportsServices.getSavingsReport(parseInt(userId));
    if (!userId) {
      const error = new CustomError('Missing required fields', 400);
      throw error;
    } else {
      if (report) {
        res.status(200).json({
          success: true,
          message: 'Savings report found',
          report,
        });
      } else {
        const error = new CustomError('Report not found', 404);
        throw error;
      }
    }

  } catch (error) {
    const customError = new CustomError('Failed to retrieve savings report', 500);
    return next(customError);
  }
};

// Get the year-end summary report
const getYearEndSummaryReport = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, year } = req.params;
  try {
    const report = await reportsServices.getYearEndSummaryReport(parseInt(userId), parseInt(year));
    if (!report) {
      const error = new CustomError('Report not found', 404);
    } else {
      res.status(200).json(report);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      message: 'Failed to retrieve year-end summary report', error: errorMessage
    });
    return next(error);
  }
};

// Get the transaction frequency report
const getTransactionFrequencyReport = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, year } = req.params;
  try {
    const report = await reportsServices.getTransactionFrequencyReport(parseInt(userId), parseInt(year));
    if (!report) {
      const error = new CustomError('Report not found', 404);
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: 'Transaction frequency report found',
        report,
      });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({
      message: 'Failed to retrieve transaction frequency report',
      error: errorMessage
    });
    return next(error);
  }
};

export default { 
  getAllMonthlyReports, 
  getMonthlyReportByMonth,
  getSavingsReport,
  getYearEndSummaryReport,
  getTransactionFrequencyReport,
};
