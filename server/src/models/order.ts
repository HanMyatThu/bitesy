import mongoose, { Document } from "mongoose";

import { EOrderStatus } from "@/enum/order-status";
import { IDateObject } from "@/interfaces/IDateObject";

interface OrderDocument extends Document {
  customer_id: mongoose.Schema.Types.ObjectId;
  date: IDateObject;
  status: EOrderStatus;
  price: number;
  items: { item: mongoose.Schema.Types.ObjectId }[];
  promotion: mongoose.Schema.Types.ObjectId | null;
  promotion_amount: number | 0;
}

const OrderSchema = new mongoose.Schema<OrderDocument, {}, null>(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    date: {
      type: Object,
      year: {
        type: Number, // e.g. 2024
        required: true,
      },
      month: {
        type: Number, // range from 0-11
        required: true,
      },
      date: {
        type: Number, // range from 1-31
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    promotion_amount: {
      type: Number,
      default: 0,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order-items",
          required: true,
        },
        _id: false,
      },
    ],
    status: {
      type: String,
      enum: EOrderStatus,
      default: EOrderStatus.PREPARING,
    },
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "promotions",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", OrderSchema);
