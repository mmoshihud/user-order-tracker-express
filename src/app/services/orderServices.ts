import UserModel from "../model/User";
import httpErrors from "http-errors";
import type IUser from "../Interface/UserInterface";

const createOrderInToDB = async (
  _id: string,
  orderData: { productName: string; price: number; quantity: number },
): Promise<IUser | null> => {
  const user = await UserModel.findOne({ _id });

  if (!user) {
    throw new httpErrors.NotFound("User not found");
  }

  if (!user.orders) {
    user.orders = [];
  }

  const { productName, price, quantity } = orderData;

  user.orders.push({ productName, price, quantity });

  const order = await user.save();

  return order;
};

const getSingleOrderFromDB = async (_id: string): Promise<IUser | null> => {
  return await UserModel.findOne({ _id });
};

export const OrderService = { createOrderInToDB, getSingleOrderFromDB };
