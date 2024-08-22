import express, { Application } from "express";
import { connectDb } from "src/db";
import "dotenv/config";

import authRouter from "@/routes/auth";
import productRouter from "@/routes/product";

const app: Application = express();
const PORT = process.env.PORT!;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();

// api routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Server",
  });
});

app.listen(PORT, () => {
  console.log("Server is connected to port 8080");
});
