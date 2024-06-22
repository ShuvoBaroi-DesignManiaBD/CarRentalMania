import { Router } from 'express';
import { CarValidation } from './car.validation';
import validateRequest from '../../middlewares/validateRequest';
import { carControllers } from './car.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '',
  auth('admin'),
  validateRequest(CarValidation.carValidationSchema),
  carControllers.createCar,
);

router.get(
  '',
  carControllers.getAllCars,
);

export const carRoutes = router;
