import { FilterQuery, Query } from 'mongoose';


class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query?: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query || {};
  }

  // Search method to search by certain fields
  search(searchFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    } else {
      this.modelQuery = this.modelQuery.find();
    }

    return this;
  }

  // Filter method to handle specific field filtering
  filter() {
    const queryObj = { ...this.query }; // Copy the query object
  
    // Exclude these fields from filtering logic
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
  
    // Filter by pricePerHour (using range)
    if (queryObj.pricePerHourFrom || queryObj.pricePerHourTo) {
      const priceFilter: { $gte?: number; $lte?: number } = {};
      if (queryObj.pricePerHourFrom) priceFilter.$gte = Number(queryObj.pricePerHourFrom);
      if (queryObj.pricePerHourTo) priceFilter.$lte = Number(queryObj.pricePerHourTo);
  
      queryObj['pricePerHour'] = priceFilter;
  
      // Clean up the range fields from query object
      delete queryObj.pricePerHourFrom;
      delete queryObj.pricePerHourTo;
    }
  
    // Apply filter for availabilityDate (if provided)
    if (queryObj.availabilityDate) {
      queryObj['availabilityDates.from'] = { $lte: new Date(queryObj.availabilityDate as string) };
      queryObj['availabilityDates.to'] = { $gte: new Date(queryObj.availabilityDate as string) };
    }
  
    // Additional feature filtering (e.g., insurance, GPS)
    if (queryObj.additionalFeature) {
      queryObj['additionalFeatures.featureName'] = {
        $in: queryObj.additionalFeature as string[],
      };
    }
  
    // Apply the filtering to the query
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  
    return this;
  }
  

  // Sort method
  sort() {
    const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  // Pagination method
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Fields method for selecting specific fields
  fields() {
    const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
