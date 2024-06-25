import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

const createACar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async () => {
  const carsQuery = new QueryBuilder(Car.find(), {})
  const result = await carsQuery.modelQuery;
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
  // Finding the car by ID
  const car = await Car.findById(id)
  
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  // Define valid fields
  const validFields = [
    'name', 'description', 'color', 'isElectric', 'status', 'features', 'pricePerHour', 'isDeleted'
  ];

  // Check for invalid fields in the payload
  for (const key of Object.keys(payload)) {
    if (!validFields.includes(key)) {
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid field: ${key}`);
    }
  }

  // Perform the update
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update the car!');
  }

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
