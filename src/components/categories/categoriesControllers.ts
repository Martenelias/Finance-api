import { Request, Response, NextFunction } from 'express';
import categoriesServices from './categoriesServices';
import CustomError from '../helpers/CustomError';

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesServices.getAllCategories();
    return res.status(200).json(
      {
        success: true,
        message: 'List of categories',
        categories,
      }
    );
  } catch (err) {
    return next(err);
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const category = await categoriesServices.getCategoryById(id);

    if (!category) {
      const err = new CustomError('Category not found', 404);
      throw err;
    }

    return res.status(200).json(
      {
        success: true,
        message: 'Category found',
        category,
      }
    );
  } catch (err) {
    return next(err);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const newCategoryId = await categoriesServices.createCategory(name, type);

    if (!newCategoryId) {
      const err = new CustomError('Category already exists', 400);
      throw err;
    }

    return res.status(201).json(
      {
        success: true,
        message: 'Category created',
        id: newCategoryId,
      }
    );
  } catch (err) {
    return next(err);
  }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { name, type } = req.body;

    if (!name || !type) {
      const err = new CustomError('Missing required fields', 400);
      throw err;
    }

    const updated = await categoriesServices.updateCategory(id, { name, type });

    if (!updated) {
      const err = new CustomError('Category not found', 404);
      throw err;
    }

    return res.status(200).json(
      {
        success: true,
        message: 'Category updated',
      }
    );
  } catch (err) {
    return next(err);
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await categoriesServices.deleteCategory(id);

    if (!deleted) {
      const err = new CustomError('Category not found', 404);
      throw err;
    }

    return res.status(200).json(
      {
        success: true,
        message: 'Category deleted',
      }
    );
  } catch (err) {
    return next(err);
  }
};

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };