import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { bookingValidation } from './booking.validation';
import { bookingControllers } from './booking.controller';

const router = Router();

router.post(
  '',
  auth('user', 'admin'),
  validateRequest(bookingValidation.initialBookingValidationSchema),
  bookingControllers.createABooing,
);

export const bookingRoutes = router;
