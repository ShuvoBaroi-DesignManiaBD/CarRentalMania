import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await authServices.signUp(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
export const authControllers = {
  signUp,
};
