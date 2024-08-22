import { EOrderStatus } from "@/enum/order-status";
import { IOrderItem } from "@/interfaces/IOrderItem";
import mongoose, { Document } from "mongoose";

type DateObject = {
  year: number;
  month: number;
  date: number;
};

interface OrderDocument extends Document {
  customer_id: mongoose.Schema.Types.ObjectId;
  date: DateObject;
  status: EOrderStatus;
  items: IOrderItem[];
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
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderitems" }],
  status: {
    type: String,
    enum: EOrderStatus,
    default: EOrderStatus.PAYMENT_PROCESSING,
  },
});

export const Order = mongoose.model("orders", OrderSchema);
