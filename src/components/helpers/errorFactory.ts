import CustomError from './CustomError';

const errorFactory = {
  notFound: (message: string = 'Not found') => new CustomError(message, 404),
  serverError: (message: string = 'Server error') =>
    new CustomError(message, 500),
  forbidden: (message: string = 'Forbidden') => new CustomError(message, 403),
  badRequest: (message: string = 'Bad request') =>
    new CustomError(message, 400),
  unauthorized: (message: string = 'Unauthorized') =>
    new CustomError(message, 401),
  conflict: (message: string = 'Conflict') => new CustomError(message, 409),
};

export default errorFactory;