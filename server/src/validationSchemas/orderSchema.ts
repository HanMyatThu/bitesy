import categories from "@/enum/categories";
import { orderStatuses } from "@/enum/order-status";
import { IDateObject } from "@/interfaces/IDateObject";
import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const createOrderSchema = yup.object({
  date: yup
    .object<IDateObject>()
    .required("Date is requried in correct format"),
  price: yup
    .string()
    .transform((value) => {
      if (!isNaN(+value)) return "";
      return +value;
    })
    .required("Price is missing"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        product: yup.string().test({
          name: "valid-id",
          message: "Invalid user id",
          test: (value) => {
            return isValidObjectId(value);
          },
        }),
        price: yup
          .string()
          .transform((value) => {
            if (!isNaN(+value)) return "";
            return +value;
          })
          .required("Price is missing"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "At least one item is required to add"),
        category: yup
          .string()
          .oneOf(categories, "Invalid Category")
          .required("Category is missing"),
      })
    )
    .min(1, "Items Array shouldn't be empty to create a order"),
});

export const updateOrderSchema = yup.object({
  status: yup
    .string()
    .oneOf(orderStatuses, "Invalid Status")
    .required("Status is required"),
});
