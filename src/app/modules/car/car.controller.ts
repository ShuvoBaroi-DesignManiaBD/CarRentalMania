import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { carServices } from './car.service';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.createACar(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.getAllCars();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

export const carControllers = {
  createCar,
  getAllCars,
};
