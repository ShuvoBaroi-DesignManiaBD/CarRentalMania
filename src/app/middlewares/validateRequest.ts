import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors,
      });
    });

    next();
  });
};

export default validateRequest;
