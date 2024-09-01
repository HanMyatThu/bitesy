import express, { Router } from "express";

import {
  createOrder,
  getAllOrders,
  getLatestOrderlist,
  updateOrder,
} from "@/controllers/orderController";
import { validate } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import {
  createOrderSchema,
  updateOrderSchema,
} from "@/validationSchemas/orderSchema";
import { isAdmin } from "@/middlewares/admin";

const orderRouter: Router = express.Router();

orderRouter.get("/listing", isAuth, getLatestOrderlist);
orderRouter.post("/", isAuth, validate(createOrderSchema), createOrder);

//admin
orderRouter.get("/all", isAuth, isAdmin, getAllOrders);
orderRouter.patch(
  "/:id",
  validate(updateOrderSchema),
  isAuth,
  isAdmin,
  updateOrder
);

export default orderRouter;
