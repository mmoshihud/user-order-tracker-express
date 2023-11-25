import type IUser from "../Interface/UserInterface";
import UserModel from "../model/User";

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await UserModel.find();
  return result;
};

const createUserIntoDB = async (user: IUser): Promise<IUser> => {
  return await UserModel.create(user);
};

export const UserServices = {
  getAllUsersFromDB,
  createUserIntoDB,
};
