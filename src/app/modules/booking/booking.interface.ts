import { Types } from 'mongoose';

export interface TBooking {
  date: Date;
  user: Types.ObjectId; // reference to user model
  car: Types.ObjectId; // reference to car model
  startTime: string; // in 24hr format
  endTime: string; // in 24hr format
  totalCost: number; 
}
