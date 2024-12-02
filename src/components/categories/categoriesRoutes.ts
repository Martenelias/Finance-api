import express from 'express';
import categoriesControllers from './categoriesControllers';
import validatorMiddleware from '../../middlewares/validatorMiddleware';

const router = express.Router();

router.get('/', categoriesControllers.getAllCategories);

router.get(
  '/:id',
  validatorMiddleware.isIdNumber,
  categoriesControllers.getCategoryById
);

router.post('/', categoriesControllers.createCategory);

router.put(
  '/:id',
  validatorMiddleware.isIdNumber,
  categoriesControllers.updateCategory
);

router.delete(
  '/:id',
  validatorMiddleware.isIdNumber,
  categoriesControllers.deleteCategory
);

export default router;