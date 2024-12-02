import express from 'express';
import usersControllers from './usersControllers';
import validatorMiddleware from '../../middlewares/validatorMiddleware';

const router = express.Router();

router.get('/', usersControllers.getAllUsers);
router.get(
  '/:id',
  validatorMiddleware.isIdNumber,
  usersControllers.getUserById
);
router.post('/', usersControllers.createUser);
router.delete(
  '/:id',
  validatorMiddleware.isIdNumber,
  usersControllers.deleteUser
);

export default router;