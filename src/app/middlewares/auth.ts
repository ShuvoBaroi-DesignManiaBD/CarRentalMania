import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/user/user.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for this route!');
    }

    // checking if the given token is valid
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_key as string,
    // ) as JwtPayload;
    const decoded = verifyToken(token, config.jwt_access_key as string)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, role, email} = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Sorry! You are not a valid user.');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
