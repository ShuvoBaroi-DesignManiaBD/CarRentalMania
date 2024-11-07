import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import Booking from '../booking/booking.model';
import convertTimeToHours from './car.utils';
import DataNotFoundError from '../../errors/DataNotFoundError';
import { CarSearchableFields } from './car.constant';

const createACar = async (payload: TCar) => {
  const isCarExist = await Car.find({ name: payload?.name });

  if (isCarExist.length !== 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'A car with this name already exist!',
    );
  }
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async (query: Record<string, unknown>) => {
  const baseQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .search(CarSearchableFields)
    .filter()
    .sort()
    .fields();

    console.log(baseQuery.modelQuery);
    
  // Clone the query for counting documents
  const countQuery = baseQuery.modelQuery.clone();

  // Count the total number of documents matching the criteria
  const totalMatchingDocuments = await countQuery.countDocuments().exec();

  // Apply pagination to the original query
  baseQuery.paginate();

  // Get the final result with pagination
  const result = await baseQuery.modelQuery.exec();

  return result && { result, totalCars: totalMatchingDocuments };
};

const getACar = async (id: string) => {
  const car = await Car.findById(id);

  if (!car || car.isDeleted) {
    throw new DataNotFoundError()
  }

  return car;
};

const updateACar = async (id: string, payload: Partial<TCar>) => {
  // Finding the car by ID
  const car = await Car.findById(id);

  if (!car) {
    throw new DataNotFoundError()
  }

  // Define valid fields
  const validFields = [
    'name',
    'description',
    'color',
    'isElectric',
    'status',
    'features',
    'pricePerHour',
    'isDeleted',
  ];

  // Check for invalid fields in the payload
  for (const key of Object.keys(payload)) {
    if (!validFields.includes(key)) {
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid field: ${key}`);
    }
  }

  // Perform the update
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update the car!',
    );
  }

  return result;
};

const deleteACar = async (id: string) => {
  const deletedCar = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedCar) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete car');
  }
  return deletedCar;
};

const returnACar = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId);
  const car = await Car.findById(booking?.car);
  
  if (!booking) {
    throw new DataNotFoundError()
  }

  await Car.findByIdAndUpdate(booking?.car?._id, {
    status: 'available',
  }, {new: true, runValidators:true});

  const timeSpent = convertTimeToHours([booking?.startTime, endTime]);

  const totalCost = Math.round(timeSpent * (car?.pricePerHour as number))
  
 
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      endTime: endTime,
      totalCost: totalCost
    },
    { new: true },
  );

  return updatedBooking;
};

export const carServices = {
  createACar,
  getAllCars,
  getACar,
  updateACar,
  deleteACar,
  returnACar,
};
