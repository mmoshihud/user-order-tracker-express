import type IUser from "../Interface/UserInterface";
import { UserServices } from "../services/userServices";
import { type Request, type Response } from "express";
import { validateUser } from "../validation/userValidation";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: IUser[] = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result.map((user) => ({
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
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body as IUser;
    const validatedData = validateUser(newUser);
    const user = await UserServices.createUserInToDB(validatedData);

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
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const validatedData = validateUser(updatedUser);
    const result = await UserServices.updateUserInToDB(
      parseInt(userId),
      validatedData,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "User Updated successfully!",
        data: {
          userId: result.userId,
          username: result.username,
          fullName: result.fullName,
          age: result.age,
          email: result.email,
          isActive: result.isActive,
          hobbies: result.hobbies,
          address: result.address,
        },
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
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(parseInt(userId));

    if (result) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: {
          userId: result.userId,
          username: result.username,
          fullName: result.fullName,
          age: result.age,
          email: result.email,
          isActive: result.isActive,
          hobbies: result.hobbies,
          address: result.address,
        },
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
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.deleteUserFromDB(parseInt(userId));

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
      error,
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
