import { z } from 'zod';

const carValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    color: z.string({
      required_error: 'Color is required',
    }),
    isElectric: z.boolean({
      required_error: 'isElectric is required',
    }),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(
      z.string({
        required_error: 'Each feature must be a string',
      }),
      {
        required_error: 'Features are required',
      }
    ),
    pricePerHour: z.number({
      required_error: 'Price per hour is required',
    }),
    isDeleted: z.boolean().default(false),
  }),
});

// partial version of the car schema for updates
const carUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable']).optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
    isDeleted: z.boolean().optional(),
  })
});

// partial version of the car schema for updates
const returnCar = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: 'Booking Id is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
  }),
});


export const CarValidation = {
  carValidationSchema,
  carUpdateValidationSchema,
  returnCar
};