/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  // Wrapped by catchAsync utility function to handle the async operations
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // trying to parse the input data from the body/cookie by Schema
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
  });
};

export default validateRequest;
