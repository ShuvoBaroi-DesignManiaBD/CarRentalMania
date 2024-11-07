import { Router } from 'express';
import { CarValidation } from './car.validation';
import validateRequest from '../../middlewares/validateRequest';
import { carControllers } from './car.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-car',
  auth('admin'),
  validateRequest(CarValidation.carValidationSchema),
  carControllers.createCar,
);

router.post(
  '/return',
  auth('admin'),
  validateRequest(CarValidation.returnCar),
  carControllers.returnACar,
);

router.get(
  '/all-cars',
  carControllers.getAllCars,
);

router.get(
  '/:id',
  carControllers.getACar,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CarValidation.carUpdateValidationSchema),
  carControllers.updateACar,
);

router.delete(
  '/:id',
  auth('admin'),
  carControllers.deleteACar,
);

export const carRoutes = router;
