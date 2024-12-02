import { Request, Response, NextFunction } from 'express';
import incomeServices from './incomesServices';
import { IIncome } from './incomesModels';
import CustomError from '../helpers/CustomError';

const getAllIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomes = await incomeServices.getAllIncomes();
    return res.status(200).json({
      success: true,
      message: 'List of incomes',
      incomes,
    });
  } catch (err) {
    return next(err);
  }
};

const getIncomeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const income = await incomeServices.getIncomeById(id);

    if (!income) {
      const err = new CustomError('Income not found', 404);
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: 'Income found',
      income,
    });
  } catch (err) {
    return next(err);
  }
};

const createIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, categoryId, amount, transactionDate, description } = req.body;

    if (!categoryId || amount == null || !description || !transactionDate) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const newIncome: number =await incomeServices.createIncome(
      userId,
      categoryId,
      amount,
      transactionDate,
      description
    );

    return res.status(201).json({
      success: true,
      message: 'Income created',
      id: newIncome,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes('Invalid categoryId')) {
      return next(new CustomError(err.message, 400));
    }
    return next(err);
  }
};

const updateIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { categoryId, amount, transactionDate, description } = req.body;

    if (!categoryId || amount == null || !description || !transactionDate) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const updatedData = {
      categoryId,
      amount,
      transactionDate,
      description,
    } as Partial<IIncome>;

    const updated = await incomeServices.updateIncome(id, updatedData);

    if (!updated) {
      const err = new CustomError('Income not found', 404);
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: 'Income updated',
    });
  } catch (err) {
    return next(err);
  }
};

const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await incomeServices.deleteIncome(id);

    if (!deleted) {
      const err = new CustomError('Income not found', 404);
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: 'Income deleted',
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};