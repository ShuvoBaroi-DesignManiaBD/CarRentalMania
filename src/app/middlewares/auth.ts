// import { NextFunction, Request, Response } from "express";
// import catchAsync from "../utils/catchAsync";
// import { TUserRole } from "../modules/user/user.interface";
// import AppError from "../errors/AppError";
// import httpStatus from "http-status";
// import { JwtPayload } from "jsonwebtoken";
// import config from "../config";
// import { User } from "../modules/user/user.model";
// import { verifyToken } from "../modules/auth/auth.utils";


// const auth = (...requiredRoles: TUserRole[]) => {
//   // Wrapped by catchAsync utility function to handle the async operations
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req?.headers?.authorization?.split(" ")[1]
    
//     // checking if the token is missing
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for this route!');
//     }

//     // checking if the given token is valid or not
//     const decoded = verifyToken(token, config.jwt_access_key as string)

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
//     const { id, role, email} = decoded;

//     // checking if the user is exist or not
//     const user = await User.isUserExistsByEmail(email);

//     // Throwing an error if user is not exist
//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'Sorry! You are not a valid user.');
//     }

//     // Checking authorization in routes for the given user role
//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         'You have no access to this route!',
//       );
//     }

//     // setting the user data into the global Request object
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default auth;




import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/user/user.interface";
import { createToken, verifyToken } from "../modules/auth/auth.utils";
import { User } from "../modules/user/user.model";
import config from "../config";


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('cookies ==>',req.cookies);
    
    let user;
    let userRole;
    let userDeleted = false;
    let JwtPayload;
    let accessToken = req.headers?.accesstoken || req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken || req.headers?.refreshToken;
    // console.log(accessToken, '/----/', refreshToken);
    // checking if the token is missing
    if (!accessToken && !refreshToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    } else if (!accessToken && refreshToken) {
      const decodedFromRefreshToken = verifyToken(
        refreshToken,
        config.jwt_refresh_key as string
      );
      // console.log('refreshToken =>', decodedFromRefreshToken );
      const { role, email } = decodedFromRefreshToken;
      userRole = role;
      // checking if the user is exist
      user = await User.isUserExistsByEmail(email);

      // checking if the user is already deleted
      userDeleted = user?.isDeleted;

      JwtPayload = {
        role: role,
        email: email,
      };
    } else if (accessToken) {
      // console.log('line 47',refreshToken);
      let decoded;
      // checking if the given token is valid
      try {
        decoded = jwt.verify(
          accessToken as string,
          config.jwt_access_key as string
        ) as JwtPayload;
        // console.log('line 55',accessToken);
      } catch (error) {
        console.log(error);
        
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized !")
      }

      console.log('line 60',decoded);
      const { role, email } = decoded;
      
      // checking if the user is exist
      user = await User.isUserExistsByEmail(email);

      userRole = role;
      // checking if the user is already deleted
      userDeleted = user?.isDeleted;
    }

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (userDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    if (JwtPayload) {
      // Creating access token
      accessToken = createToken(
        JwtPayload,
        config.jwt_access_key as string,
        config.jwt_access_expires_in as string
      );
    }

    req.user = JwtPayload as JwtPayload;
    console.log(req.user);
    
    next();
  });
};

export default auth;
