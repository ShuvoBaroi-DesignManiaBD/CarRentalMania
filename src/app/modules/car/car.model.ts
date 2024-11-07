import mongoose, { Schema } from 'mongoose';
import { TCar } from './car.interface';

// the car schema
const carSchema = new Schema<TCar>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  isElectric: { type: Boolean, required: true },
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
  features: { type: [String], required: true },
  pricePerHour: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  images: { type: [String], required: true }, // Array of image URLs
  customerReviews: { type: [String], default: [] }, // Array for customer reviews (modify type based on your review model)
  additionalFeatures: [
    {
      featureName: { type: String, required: true },
      price: { type: Number, required: true },
      selected: { type: Boolean, default: false },
    }
  ], // Array of additional features with price and selection status
  availabilityDates: {
    from: { type: Date, required: true }, // Availability start date
    to: { type: Date, required: true } // Availability end date
  }
});

// the car model
export const Car = mongoose.model<TCar>('Car', carSchema);
