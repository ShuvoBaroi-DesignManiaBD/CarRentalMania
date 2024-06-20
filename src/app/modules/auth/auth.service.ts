import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TSignInUser } from "./auth.interface";


const signUp = async(payload: TUser)=>{
    const result = await User.create(payload);
    return result?._doc;
}

const signIn = async (payload: TSignInUser) => {
    // checking if the user is exists or not
    const user = await User.isUserExistsByEmail(payload.email);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
  
    //checking if the password is correct or not
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    return user?._doc;
  };

export const authServices = {
    signUp,
    signIn
} 