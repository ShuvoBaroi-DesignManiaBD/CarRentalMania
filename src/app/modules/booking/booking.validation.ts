import { z } from 'zod';

const bookingValidationFullDataSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required.',
    }),
    user: z.string({
      required_error: 'User is required.',
    }),
    car: z.string({
      required_error: 'Car is required.',
    }),
    startTime: z.string({
      required_error: 'Start time is required.',
    }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Start time must be in 24hr format.',
    }),
    endTime: z.union([
      z.string({
        required_error: 'End time is required.',
      }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in 24hr format.',
      }),
      z.null()
    ]).default(null),
    totalCost: z.number().default(0),
  }),
});

const initialBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required.',
    }),
    carId: z.string({
      required_error: 'Car is required.',
    }),
    startTime: z.string({
      required_error: 'Start time is required.',
    }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Start time must be in 24hr format.',
    })
  }),
});


export const bookingValidation = {
  bookingValidationFullDataSchema,
  initialBookingValidationSchema
};
