/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBookingInitial } from './booking.interface';
import Booking from './booking.model';
import { Car } from '../car/car.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';

const createABooking = async (payload: TBookingInitial, user: JwtPayload) => {
  const carId = payload?.carId?.toString();
  const { date, startTime } = payload;
  const userData = await User.isUserExistsById(user?.id?.toString() as string);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const car = await Car.findByIdAndUpdate(carId, { status: 'unavailable' });
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }

  const dataForDb = {
    date,
    startTime,
    user: user?.id as string,
    car: carId,
    endTime: null,
    totalCost: 0,
  };
  const booking = await Booking.create(dataForDb);
  const searchBooking = await Booking.findById(booking?.id)
    .populate('user')
    .populate('car');
  return searchBooking;
};

const myBookings = async (user: JwtPayload) => {
  const carsQuery = new QueryBuilder(
    Booking.find({ user: user?.id })
      .populate('user')
      .populate('car'),
    {},
  );
  const result = await carsQuery.modelQuery;
  return result;
};

const bookingsWithQueries = async (queries: any) => {
  let carsQuery = null;
  if (queries.length > 0) {
    carsQuery = new QueryBuilder(
      Booking.find({ car: queries.carId || null, date: queries.date || null })
        .populate('user')
        .populate('car'),
      {},
    );
  } else {
    carsQuery = new QueryBuilder(
      Booking.find().populate('user').populate('car'),
      {},
    );
  }
  const result = await carsQuery.modelQuery;
  return result;
};


export const bookingServices = {
  createABooking,
  myBookings,
  bookingsWithQueries,
};
