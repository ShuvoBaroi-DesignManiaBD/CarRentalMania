import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { carRoutes } from '../modules/car/car.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/cars',
    route: carRoutes,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
