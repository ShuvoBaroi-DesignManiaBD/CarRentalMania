import { z } from 'zod';
import { Types } from 'mongoose';

const bookingValidationSchema = z.object({
  date: z.date({
    required_error: 'Date is required.',
  }),
  user: z.instanceof(Types.ObjectId, {
    message: 'Invalid user ID.',
  }),
  car: z.instanceof(Types.ObjectId, {
    message: 'Invalid car ID.',
  }),
  startTime: z.string({
    required_error: 'Start time is required.',
  }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Start time must be in 24hr format.',
  }),
  endTime: z.string({
    required_error: 'End time is required.',
  }).regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'End time must be in 24hr format.',
  }),
  totalCost: z.number().default(0),
});

export default bookingValidationSchema;
