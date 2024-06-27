import mongoose, { Schema} from 'mongoose';
import { TCar } from './car.interface';


// the car schema
const carSchema = new Schema<TCar>({
  name: { type: String, required: true, unique: true},
  description: { type: String, required: true },
  color: { type: String, required: true },
  isElectric: { type: Boolean, required: true },
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
  features: { type: [String], required: true },
  pricePerHour: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

// the car model
export const Car = mongoose.model<TCar>('Car', carSchema);
