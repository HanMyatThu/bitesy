import express, { Application } from "express";
import "dotenv/config";

import { connectDB } from "@/db";

const PORT = process.env.PORT!;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bitesy",
  });
});

app.listen(PORT, () => {
  console.log(`Server is connected to ${PORT}`);
});
