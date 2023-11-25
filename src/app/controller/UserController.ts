import type IUser from "../Interface/UserInterface";
import { UserServices } from "../services/userServices";
import { type Request, type Response } from "express";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: IUser[] = await UserServices.getAllUsersFromDB();
    const data = result.map((user) => ({
      _id: user._id,
      userId: user.userId,
      username: user.username,
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      age: user.age,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city,
        country: user.address.country,
      },
    }));
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body as IUser;
    const createdUser = await UserServices.createUserIntoDB(newUser);
    const data = {
      userId: createdUser.userId,
      username: createdUser.username,
      fullName: {
        firstName: createdUser.fullName.firstName,
        lastName: createdUser.fullName.lastName,
      },
      age: createdUser.age,
      email: createdUser.email,
      isActive: createdUser.isActive,
      hobbies: createdUser.hobbies,
      address: {
        street: createdUser.address.street,
        city: createdUser.address.city,
        country: createdUser.address.country,
      },
    };
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserController = {
  getAllUsers,
  createUser,
};
