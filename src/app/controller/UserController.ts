import type IUser from "../Interface/UserInterface";
import { UserServices } from "../services/userServices";
import { type Request, type Response } from "express";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: IUser[] = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body as IUser;
    const user = await UserServices.createUserInToDB(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const result = await UserServices.updateUserInToDB(userId, updatedUser);
  res.status(200).json({
    success: true,
    message: "User Updated successfully!",
    data: result,
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await UserServices.getSingleStudentFromDB(userId);

  res.status(200).json({
    success: true,
    message: "User fetched successfully!",
    data: result,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await UserServices.deleteUserFromDB(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
    data: null,
  });
};

export const UserController = {
  getAllUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
