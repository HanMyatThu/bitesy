import express, { Router } from "express";

import { createOrder, updateOrder } from "@/controllers/orderController";
import { validate } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import { createOrderSchema } from "@/validationSchemas/orderSchema";

const orderRouter: Router = express.Router();

orderRouter.post("/", isAuth, validate(createOrderSchema), createOrder);

orderRouter.patch("/update/status", isAuth, updateOrder);

export default orderRouter;
