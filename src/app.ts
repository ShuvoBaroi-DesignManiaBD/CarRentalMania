import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/noFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Middleware for application routes
app.use('/api/', router);

// Global Error Handler Middleware
app.use(globalErrorHandler);

//Middleware for handeling undefined routes
app.use(notFound);

export default app;
