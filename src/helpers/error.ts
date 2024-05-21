import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  name: string;
  message: string;
}

const ErrorHandler = (
  error: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  switch (error.name) {
  case 'CastError':
    return res.status(400).send({ error: 'malformatted id' });
  default:
    next(error);
  }
};

export default ErrorHandler;
