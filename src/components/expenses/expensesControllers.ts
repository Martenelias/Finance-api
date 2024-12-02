import { NextFunction, Request, Response } from 'express';
import expenseServices from './expensesServices';
import { IExpense } from './expensesModels';
import CustomError from '../helpers/CustomError';

const getAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await expenseServices.getAllExpenses();
    return res.status(200).json({
      success: true,
      message: 'List of expenses',
      expenses,
    });
  } catch (err) {
    return next(err);
  }
};

const getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const expense = await expenseServices.getExpenseById(id);

    if (!expense) {
      const err = new CustomError('Expense not found', 404);
      throw err;
    };

    return res.status(200).json({
      success: true,
      message: 'Expense found',
      expense,
    });
  } catch (err) {
    return next(err);
  }
};

const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updateData = req.body;

    if (!updateData) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    };

    const updated = await expenseServices.updateExpense(id, updateData);

    if (!updated) {
      const err = new CustomError('Expense not found', 404);
      throw err;
    };

    return res.status(200).json({
      success: true,
      message: 'Expense updated',
    });
  } catch (err) {
    return next(err);
  }
};

const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, categoryId, amount, transactionDate, description } = req.body;

    if (!userId || !categoryId || amount == null || !transactionDate || !description) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    };

    const newExpense = await expenseServices.createExpense(userId, categoryId, amount, transactionDate, description);

    return res.status(201).json({
      success: true,
      message: 'Expense created',
      id: newExpense,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes('Invalid categoryId')) {
      return next(new CustomError(err.message, 400));
    }
    return next(err);
  }
};

const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await expenseServices.deleteExpense(id);

    if (!deleted) {
      const err = new CustomError('Expense not found', 404);
      throw err;
    };

    return res.status(200).json({
      success: true,
      message: 'Expense deleted',
    });
  } catch (err) {
    return next(err);
  }
};

export default { getAllExpenses, getExpenseById, updateExpense, createExpense, deleteExpense };