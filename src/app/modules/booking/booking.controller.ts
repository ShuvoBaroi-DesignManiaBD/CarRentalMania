import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { bookingServices } from './booking.service';

const createABooing = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.createABooking(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const myBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.myBookings(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

const searchMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.bookingsWithQueries(req?.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});


export const bookingControllers = {
  createABooing,
  myBookings,
  searchMyBookings,
};
