import type IUser from "../Interface/UserInterface";
import UserModel from "../model/User";

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  return await UserModel.find({}, "-password");
};

const createUserInToDB = async (user: IUser): Promise<IUser> => {
  return await UserModel.create(user);
};

const updateUserInToDB = async (
  _id: string,
  user: IUser,
): Promise<IUser | null> => {
  return await UserModel.findByIdAndUpdate({ _id }, user, { new: true });
};

const getSingleUserFromDB = async (_id: string): Promise<IUser | null> => {
  return await UserModel.findOne({ _id }, "-password");
};

const deleteUserFromDB = async (_id: string): Promise<IUser | null> => {
  return await UserModel.findOneAndDelete({ _id });
};

export const UserServices = {
  getAllUsersFromDB,
  createUserInToDB,
  updateUserInToDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
