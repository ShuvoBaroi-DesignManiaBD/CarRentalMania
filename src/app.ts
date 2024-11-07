import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/noFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors({
    origin: ["https://rental-mania.shuvobaroi.com", "http://localhost:5173", "https://car-rental-mania.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  }));
  
  app.options("*", cors());
//parsers
app.use(express.json());
app.use(cookieParser());
// Middleware for application routes
app.use('/api/', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Mania Backend!");
});

// Global Error Handler Middleware
app.use(globalErrorHandler);

//Middleware for handeling undefined routes
app.use(notFound);

export default app;
