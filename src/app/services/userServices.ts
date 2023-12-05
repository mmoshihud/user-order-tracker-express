import type IUser from "../Interface/UserInterface";
import UserModel from "../model/User";

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  return await UserModel.find({}, "-password");
};

const createUserInToDB = async (user: IUser): Promise<IUser> => {
  return await UserModel.create(user);
};

const updateUserInToDB = async (
  userId: number,
  user: IUser,
): Promise<IUser | null> => {
  return await UserModel.findOneAndUpdate({ userId }, user, { new: true });
};

const getSingleUserFromDB = async (userId: number): Promise<IUser | null> => {
  return await UserModel.findOne({ userId }, "-password");
};

const deleteUserFromDB = async (userId: number): Promise<IUser | null> => {
  return await UserModel.findOneAndDelete({ userId });
};

export const UserServices = {
  getAllUsersFromDB,
  createUserInToDB,
  updateUserInToDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
