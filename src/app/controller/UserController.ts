import { UserServices } from "../services/userServices";
import { type Request, type Response } from "express";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users are retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserController = {
  getAllUsers,
};
