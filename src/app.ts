import express from "express";
import cors from "cors";
import { UserRoutes } from "./app/routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", UserRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
