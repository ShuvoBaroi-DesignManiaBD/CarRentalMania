export interface TCar {
  name: string;
  thumbnail: string;                          // Car's name (e.g., Tesla Model S)
  description: string;                   // Detailed description of the car
  color: string;                         // Car's color
  isElectric: boolean;                   // Indicates if the car is electric
  status: 'available' | 'unavailable';   // Availability status of the car
  features: string[];                    // Array of features (e.g., Sunroof, Bluetooth, etc.)
  pricePerHour: number;                  // Rental price per hour
  isDeleted: boolean;                    // Soft delete flag for the car
  images: string[];                      // Array of image URLs (high-quality images for the car)
  customerReviews: Review[];             // Array of customer reviews
  additionalFeatures: AdditionalFeature[];  // Array of optional add-ons like insurance, GPS, child seat
  availabilityDates: {                   // Availability details for specific dates
    from: Date;
    to: Date;
  };
}

// Define the Review interface for customer reviews
export interface Review {
  reviewerName: string;                   // Name of the reviewer
  rating: number;                         // Rating (e.g., out of 5)
  comment: string;                        // Customer's review comment
  reviewDate: Date;                       // Date of the review
}

// Define the AdditionalFeature interface for extra options
export interface AdditionalFeature {
  featureName: string;                    // Name of the additional feature (e.g., Insurance, GPS)
  price: number;                          // Price of the additional feature
  selected: boolean;                      // Whether the feature is selected by the user
}
