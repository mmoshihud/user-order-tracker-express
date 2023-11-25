import express from "express";
import cors from "cors";
import { UserRoutes } from "./app/routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", UserRoutes);

export default app;
