import type User from "../Interface/UserInterface";
import UserModel from "../model/User";

const getAllUsersFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find();
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
};
