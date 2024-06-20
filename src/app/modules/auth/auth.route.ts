import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { authControllers } from './auth.controller';
const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidation.newUserValidation),
  authControllers.signUp,
);

export const authRoutes = router;
