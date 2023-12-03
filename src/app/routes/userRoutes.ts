import express from "express";
import { UserController } from "../controller/UserController";
import { OrderController } from "../controller/OrderController";

const router = express.Router();

router.get("", UserController.getAllUsers);

router.post("", UserController.createUser);

router.put("/:userId", UserController.updateUser);

router.get("/:userId", UserController.getSingleUser);

router.delete("/:userId", UserController.deleteUser);

router.put("/:userId/orders", OrderController.addOrderToUser);

router.get("/:userId/orders", OrderController.getAllOrdersForUser);

router.get(
  "/:userId/orders/total-price",
  OrderController.calculateTotalPriceForUser,
);

export const UserRoutes = router;
