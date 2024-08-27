import mongoose, { Document } from "mongoose";

import { EOrderStatus } from "@/enum/order-status";
import { IOrderItem } from "@/interfaces/IOrderItem";
import { IDateObject } from "@/interfaces/IDateObject";

interface OrderDocument extends Document {
  customer_id: mongoose.Schema.Types.ObjectId;
  date: IDateObject;
  status: EOrderStatus;
  price: number;
  items: IOrderItem[];
  promotions: [
    {
      promotion: mongoose.Schema.Types.ObjectId;
    },
  ];
  promotion_amount: number | 0;
}

const OrderSchema = new mongoose.Schema<OrderDocument>({
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
        ref: "orderitems",
      },
    },
  ],
  status: {
    type: String,
    enum: EOrderStatus,
    default: EOrderStatus.PAYMENT_PROCESSING,
  },
  promotions: [
    {
      promotion: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

export const Order = mongoose.model("orders", OrderSchema);
