import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBookingInitial } from './booking.interface';
import Booking from './booking.model';
import { Car } from '../car/car.model';
import { JwtPayload } from 'jsonwebtoken';

const createABooking = async (payload: TBookingInitial, user:JwtPayload) => {
  const carId = payload?.carId?.toString();
  const {date, startTime} = payload;
  const userData = await User.isUserExistsById(user?.id?.toString() as string);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const car = await Car.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }

  const dataForDb = {
    date,
    startTime,
    user: user?.id as string,
    car: carId,
    endTime: null,
    totalCost: 0
  }
  const booking = await Booking.create(dataForDb);
  const searchBooking = await Booking.findById(booking?.id).populate('user').populate('car');
  return searchBooking;
};

export const bookingServices = {
  createABooking,
};
