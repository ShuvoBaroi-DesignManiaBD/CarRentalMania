import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { bookingValidation } from './booking.validation';
import { bookingControllers } from './booking.controller';

const router = Router();

router.post(
  '',
  auth('user'),
  validateRequest(bookingValidation.initialBookingValidationSchema),
  bookingControllers.createABooing,
);

router.get(
  '/my-bookings',
  auth('user'),
  bookingControllers.myBookings,
);

export const bookingRoutes = router;
