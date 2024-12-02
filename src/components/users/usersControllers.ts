import { Request, Response, NextFunction } from 'express';
import usersServices from './usersServices';
import CustomError from '../helpers/CustomError';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersServices.getAllUsers();
    return res.status(200).json({
      success: true,
      message: 'List of users',
      users,
    });
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await usersServices.getUserById(id);
    if (!user) throw new CustomError('User not found', 404);
    return res.status(200).json({
      success: true,
      message: 'User found',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email;
    const user = await usersServices.getUserByEmail(email);
    if (!user) throw new CustomError('User not found', 404);
    return res.status(200).json({
      success: true,
      message: 'User found',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      throw new CustomError('All fields are required', 400);
    }

    const userId = await usersServices.createUser(email, password, firstName, lastName);
    const user = await usersServices.getUserById(userId); // Fetch new user without password
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const user = await usersServices.getUserById(id);
    if (!user) throw new CustomError('User not found', 404);
    await usersServices.deleteUser(id);
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updateUser = req.body;
    const userExists = await usersServices.getUserById(id);
    if (!userExists) throw new CustomError('User not found', 404);
    
    const isUpdated = await usersServices.updateUser(id, updateUser);
    if (!isUpdated) throw new CustomError('Failed to update user', 400);

    const updatedUser = await usersServices.getUserById(id); // Fetch updated user without password
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    return next(err);
  }
};

export default { getAllUsers, getUserById, createUser, deleteUser, updateUser };
