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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const result = await UserServices.updateUserInToDB(userId, updatedUser);

    if (result) {
      res.status(200).json({
        success: true,
        message: "User Updated successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.deleteUserFromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "Internal Server Error",
      },
    });
  }
};

export const UserController = {
  getAllUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
