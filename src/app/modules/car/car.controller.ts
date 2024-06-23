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

const getACar = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.getACar(req?.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const updateACar = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.updateACar(req?.params?.id, req?.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

export const carControllers = {
  createCar,
  getAllCars,
  getACar,
  updateACar
};
