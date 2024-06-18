import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/', router);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
