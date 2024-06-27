import mongoose, { Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
    unique: false
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: false,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

const Booking = mongoose.model<TBooking>('Booking', bookingSchema);

export default Booking;
