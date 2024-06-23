import { Request, Response } from 'express';
import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createACar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async () => {
  const result = await Car.find();
  return result;
};

const getACar = async (id: string) => {
  const car = await Car.findById(id);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  return car;
};

const updateACar = async (id: string, payload: Partial<TCar>) => {
  const car = await Car.findById(id);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  if (payload && car) {
    for (const [key, value] of Object.entries(payload)) {
      car[key] = value;
    }
  }

  const result = await Car.findByIdAndUpdate(id, car, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteACar = async (id: string) => {
  const deletedCar = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedCar) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete car');
  }
  return deletedCar;
};

export const carServices = {
  createACar,
  getAllCars,
  getACar,
  updateACar,
  deleteACar,
};
