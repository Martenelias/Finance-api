import { Request, Response, NextFunction } from 'express';
import usersServices from '../users/usersServices';
import hashServices from '../helpers/hashServices';
import jwtServices from '../helpers/jwtServices';
import errorFactory from '../helpers/errorFactory';

const signup = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return next(errorFactory.badRequest('Missing required fields'));
    }

    const existingUser = await usersServices.getUserByEmail(email);

    if (existingUser) {
      return next(errorFactory.conflict('User already exists'));
    }

    const newUser = await usersServices.createUser(
      email,
      password,
      firstName,
      lastName
    );

    return res.status(201).json({
      success: true,
      message: 'User created',
      user: newUser,
    });
  } catch (error) {
    return next(errorFactory.serverError('Internal Server Error'));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorFactory.badRequest('Missing email or password'));
    }

    const user = await usersServices.getUserByEmail(email);

    if (!user) {
      return next(errorFactory.notFound('User not found'));
    }

    const match = await hashServices.comparePasswords(password, user.password);

    if (!match) {
      return next(errorFactory.unauthorized('Invalid password'));
    }

    const token = jwtServices.generateToken({
      id: user.id,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      message: 'Logged in',
      token,
    });
  } catch (error) {
    return next(errorFactory.serverError('Internal Server Error'));
  }
};

export default { signup, login };