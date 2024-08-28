import express, { Router } from "express";

import {
  createOrder,
  getLatestOrderlist,
  updateOrder,
} from "@/controllers/orderController";
import { validate } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import {
  createOrderSchema,
  updateOrderSchema,
} from "@/validationSchemas/orderSchema";

const orderRouter: Router = express.Router();

orderRouter.get("/listing", isAuth, getLatestOrderlist);
orderRouter.post("/", isAuth, validate(createOrderSchema), createOrder);
orderRouter.patch("/:id", validate(updateOrderSchema), isAuth, updateOrder);

export default orderRouter;
