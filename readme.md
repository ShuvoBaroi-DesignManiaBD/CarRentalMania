
---
## [Car Rental Mania Backend](https://car-rental-mania-backend.vercel.app/)

Car Rental Mania Backend is a backend application built with Express, TypeScript, and Mongoose. This project follows an industry-standard modular pattern for managing routes and functionalities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [Building the Application](#building-the-application)
- [Linting and Formatting](#linting-and-formatting)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Technology Stack](#technology-stack)

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ShuvoBaroi-DesignManiaBD/CarRentalMania.git
   cd car-rental-mania-backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=your-port
DB_URL=your-database-url
NODE_ENV=production or development (use development for development environment)
BCRYPT_SALT_ROUNDS=any number
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRES_IN=any-time
JWT_REFRESH_EXPIRES_IN=any-time
```

These secret keys should be in the `.env` file for running the app properly.

## Running the Application

### Development

To run the application in development mode with hot reloading:

```sh
npm run dev
```

### Production

To run the application in production mode:

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the application:

   ```sh
   npm run prod
   ```

## Building the Application

To build the TypeScript project:

```sh
npm run build
```

This will compile the TypeScript files into JavaScript and place them in the `dist` folder.

## Linting and Formatting

To lint the code:

```sh
npm run lint
```

To fix linting errors automatically:

```sh
npm run lint:fix
```

To format the code using Prettier:

```sh
npm run prettier
```

To fix formatting issues automatically:

```sh
npm run prettier:fix
```

## Folder Structure

The project structure is organized as follows:

```
car-rental-mania-backend/
├── dist/                   # Compiled output
├── node_modules/           # Node.js modules
├── src/                    # Source files
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│   └── modules/            # Modules for different features
│       ├── auth/           # Auth module
│       │   ├── auth.controller.ts
│       │   ├── auth.interface.ts
│       │   ├── auth.model.ts
│       │   ├── auth.routes.ts
│       │   ├── auth.services.ts
│       │   └── auth.validation.ts
│       ├── cars/           # Car module
│       │   ├── car.controller.ts
│       │   ├── car.interface.ts
│       │   ├── car.model.ts
│       │   ├── car.routes.ts
│       │   ├── car.services.ts
│       │   └── car.validation.ts
│       ├── bookings/       # Booking module
│       │   ├── booking.controller.ts
│       │   ├── booking.interface.ts
│       │   ├── booking.model.ts
│       │   ├── booking.routes.ts
│       │   ├── booking.services.ts
│       │   └── booking.validation.ts
│       ├── users/          # User module
│       │   ├── user.controller.ts
│       │   ├── user.interface.ts
│       │   ├── user.model.ts
│       │   ├── user.routes.ts
│       │   ├── user.services.ts
│       │   └── user.validation.ts
├── .env                    # Environment variables
├── .eslintignore           # ESLint ignore file
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── package.json            # npm scripts and dependencies
└── tsconfig.json           # TypeScript configuration
```

## API Endpoints

### Auth

- `POST /api/auth/signup` - Sign up a new user
- `POST /api/auth/signin` - Sign in an existing user

### Cars

- `POST /api/cars` - Create a new car
- `GET /api/cars/:id` - Get a car by ID
- `PUT /api/cars/:id` - Update a car by ID
- `DELETE /api/cars/:id` - Soft delete a car by ID

### Booking

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Book a car
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/cars/return` - Return a car

## Features

### Admin Actions

- **Car Management**: Admins can create new car entries in the system, specifying details like name, color, features, etc. They can also update existing car information to keep things accurate. Additionally, admins can perform "soft deletes" on cars that are no longer available for rent. This keeps a record of the car but removes it from active listings.
- **Booking Oversight**: Admins have a comprehensive view of all ongoing and past bookings within the system. This allows them to monitor rental activity and identify any potential issues.
- **Ride Cost Calculation**: For completed rentals (where the end time has been entered by admin), admins can calculate the total cost using startTime, endTime, and pricePerHour to ensure accurate billing.

### User Actions

- **Book a Ride**: Users can select their pick-up by entering carId and startTime to book the perfect car for their needs.
- **Rental History**: Users can easily access their booking history, allowing them to review past rentals.

## Technology Stack

- **TypeScript**: Used as the programming language.
- **Express.js**: Used as the web framework.
- **Mongoose**: Used as the Object Data Modeling (ODM) and validation library for MongoDB.
- **Zod**: Used for advanced data validations.
- **JWT**: Used for generating tokens for authentication and authorization.

---

Live link: [https://car-rental-mania-backend.vercel.app/](https://car-rental-mania-backend.vercel.app/)

GitHub Repo: [https://github.com/ShuvoBaroi-DesignManiaBD/CarRentalMania](https://github.com/ShuvoBaroi-DesignManiaBD/CarRentalMania)
```
