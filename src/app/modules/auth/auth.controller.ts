/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.signUp(req.body);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const {password, ...resultExcludingpassword} = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: resultExcludingpassword,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await authServices.signIn(req.body);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const {password, ...resultExcludingpassword} = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: resultExcludingpassword,
  });
});

export const authControllers = {
  signUp,
  signIn
};
