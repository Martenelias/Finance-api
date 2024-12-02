import { Request, Response, NextFunction } from 'express';
import budgetsServices from './budgetsServices';
import { IBudget } from './budgetsModels';
import CustomError from '../helpers/CustomError';

const getAllBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const budgets = await budgetsServices.getAllBudgets();
    return res.status(200).json({
      success: true,
      message: 'List of budgets',
      budgets,
    });
  } catch (err) {
    return next(err);
  }
};

const getBudgetByMonth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const budget = await budgetsServices.getBudgetByMonth(year, month);

    if (!budget) {
      const err = new CustomError('Budget not found', 404);
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: 'Budget found',
      budget,
    });
  } catch (err) {
    return next(err);
  }
};

const createBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, monthly_limit, year, month } = req.body;

    if (!userId || !year || !month || monthly_limit == null) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const newBudgetId = await budgetsServices.addBudget(userId, monthly_limit, year, month);

    return res.status(201).json({
      success: true,
      message: 'Budget created',
      id: newBudgetId,
    });
  } catch (err) {
    return next(err);
  }
};

const updateBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const { monthly_limit } = req.body;

    if (monthly_limit == null) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const updatedData = {
      monthly_limit,
      year,
      month,
    } as Partial<IBudget>;

    const updated = await budgetsServices.updateBudget(year, month, updatedData);

    if (!updated) {
      const err = new CustomError('Failed to update budget', 500);
      throw err;
    } else {
      return res.status(200).json({
        success: true,
        message: 'Budget updated',
      });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { year, month } = req.params;
    const budget = await budgetsServices.getBudgetByMonth(Number(year), Number(month));

    if (!budget) {
      const err = new CustomError('Budget not found', 404);
      throw err;
    }

    const deleteResult = await budgetsServices.deleteBudget(budget.id);

    if (!deleteResult) {
      const err = new CustomError('Failed to delete budget', 500);
      throw err;
    } else {
      return res.status(200).json({
        success: true,
        message: 'Budget deleted',
      });
    }
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllBudgets,
  getBudgetByMonth,
  createBudget,
  updateBudget,
  deleteBudget,
};
