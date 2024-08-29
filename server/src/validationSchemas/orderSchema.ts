import * as yup from "yup";

import categories from "@/enum/categories";
import { orderStatuses } from "@/enum/order-status";

const orderItemSchema = yup.object().shape({
  product: yup
    .string()
    .matches(
      /^[a-f\d]{24}$/,
      "Product must be a 24-character hexadecimal string"
    )
    .required("Product is required"),
  price: yup.string().required("Price is required"),
  quantity: yup
    .number()
    .integer("Quantity must be an integer")
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
  category: yup
    .string()
    .oneOf(categories, "Invalid Category")
    .required("Category is missing"),
});

const dateSchema = yup.object().shape({
  year: yup.number().required(),
  month: yup.number().required(),
  date: yup.number().required(),
});

export const createOrderSchema = yup.object({
  date: yup.object<typeof dateSchema>().required("date is required"),
  price: yup.string().required("Price is missing"),
  items: yup
    .array()
    .of(orderItemSchema)
    .required("item is required")
    .min(1, "Items Array shouldn't be empty to create a order"),
  promotion: yup.string().optional().nullable(),
  promotion_amount: yup.number().optional(),
});

export const updateOrderSchema = yup.object({
  status: yup
    .string()
    .oneOf(orderStatuses, "Invalid Status")
    .required("Status is required"),
});
