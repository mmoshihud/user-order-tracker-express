import express from "express";
import { UserController } from "../controller/UserController";
import { OrderController } from "../controller/OrderController";

const router = express.Router();

router.get("", (req, res, next) => {
  UserController.getAllUsers(req, res).catch(next);
});

router.post("", (req, res, next) => {
  UserController.createUser(req, res).catch(next);
});

router.put("/:userId", (req, res, next) => {
  UserController.updateUser(req, res).catch(next);
});

router.get("/:userId", (req, res, next) => {
  UserController.getSingleUser(req, res).catch(next);
});

router.delete("/:userId", (req, res, next) => {
  UserController.deleteUser(req, res).catch(next);
});

router.put("/:userId/orders", (req, res, next) => {
  OrderController.addOrderToUser(req, res).catch(next);
});

router.get("/:userId/orders", (req, res, next) => {
  OrderController.getAllOrdersForUser(req, res).catch(next);
});

router.get("/:userId/orders/total-price", (req, res, next) => {
  OrderController.calculateTotalPriceForUser(req, res).catch(next);
});

export const UserRoutes = router;
