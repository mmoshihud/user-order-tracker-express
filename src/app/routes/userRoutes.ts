import express from "express";
import { UserController } from "../controller/UserController";

const router = express.Router();

router.get("", UserController.getAllUsers);
router.post("", UserController.createUser);

export const UserRoutes = router;
