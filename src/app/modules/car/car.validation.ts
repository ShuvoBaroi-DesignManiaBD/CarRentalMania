import { z } from 'zod';

const carValidationSchema = z.object({
    body: z.object(
        {
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
            features: z.array(z.string({
              required_error: 'Each feature must be a string',
            }), {
              required_error: 'Features are required',
            }),
            pricePerHour: z.number({
              required_error: 'Price per hour is required',
            }),
            isDeleted: z.boolean().default(false),
          }
    )
});

export const CarValidation = {
  carValidationSchema,
};
