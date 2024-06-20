import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { authControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidation.newUserValidation),
  authControllers.signUp,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.signIn,
);

export const authRoutes = router;
