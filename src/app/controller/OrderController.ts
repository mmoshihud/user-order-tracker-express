import { type Request, type Response } from "express";
import { OrderService } from "../services/orderServices";
import { UserServices } from "../services/userServices";
import { validateOrder } from "../validation/orderValidation";

const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;
    const validatedData = validateOrder(orderData);
    const order = await OrderService.createOrderInToDB(
      parseInt(userId),
      validatedData,
    );

    if (order) {
      res.status(201).json({
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
      error,
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await OrderService.getSingleOrderFromDB(parseInt(userId));

    if (user?.orders) {
      const formattedOrders = user.orders.map((order) => ({
        productName: order.productName,
        price: order.price,
        quantity: order.quantity,
      }));

      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: {
          orders: formattedOrders,
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

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await UserServices.getSingleUserFromDB(parseInt(userId));

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
      return;
    }

    const totalPrice = (user.orders || []).reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    );

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
      error,
    });
  }
};

export const OrderController = {
  addOrderToUser,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
