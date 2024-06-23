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

router.get(
  '/:id',
  carControllers.getACar,
);

router.patch(
  '/:id',
  auth('admin'),
  carControllers.updateACar,
);

router.delete(
  '/:id',
  auth('admin'),
  carControllers.deleteACar,
);

export const carRoutes = router;
