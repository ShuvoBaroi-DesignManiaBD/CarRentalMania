/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _doc: { [x: string]: unknown; password: unknown; };
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}

export interface UserModel extends Model<TUser> {
  //// Instance method for checking if the user exists or not
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TUser>;

  //// Instance method for checking if the given password is matching or not
  isPasswordMatched(
    originalPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
