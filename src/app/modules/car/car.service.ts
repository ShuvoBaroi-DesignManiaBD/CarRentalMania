import { TCar } from './car.interface';
import { Car } from './car.model';

const createACar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async () => {
  const result = await Car.find();
  return result;
};

export const carServices = {
  createACar,
  getAllCars
};
