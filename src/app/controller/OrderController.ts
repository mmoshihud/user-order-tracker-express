import { type Request, type Response } from "express";
import { OrderService } from "../services/orderServices";
import { UserServices } from "../services/userServices";

const addOrderToUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productName, price, quantity } = req.body;

  try {
    const order = await OrderService.createOrderInToDB(
      userId,
      productName,
      price,
      quantity,
    );

    if (order) {
      res.json({
        success: true,
        message: "Order created successfully!",
        data: null,
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

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Orders retrieved successfully!",
        data: result.orders || [],
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

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.getSingleUserFromDB(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
        data: null,
      });
      return;
    }

    const totalPrice = user.orders
      ? user.orders.reduce(
          (acc, order) => acc + order.price * order.quantity,
          0,
        )
      : 0;

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const OrderController = {
  addOrderToUser,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
