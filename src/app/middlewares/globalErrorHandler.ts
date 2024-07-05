/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleCastError from '../errors/handleCastError';
import handleZodError from '../errors/handleZodError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import DataNotFoundError from '../errors/DataNotFoundError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  
  // default error source
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError){
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof DataNotFoundError) {
    const simplifiedError = new DataNotFoundError();
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } 

  if(err instanceof DataNotFoundError) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: []
    });
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages: config.node_env === 'development' ? errorSources : null, //If the project is not in development mood, error source & stack will be null
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
