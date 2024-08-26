import { EOrderCategory } from "@/enum/categories";
import mongoose, { Document } from "mongoose";

interface OrderItemDocument extends Document {
  product: mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
  category: EOrderCategory;
  order: mongoose.Schema.Types.ObjectId;
}

const OrderItemSchema = new mongoose.Schema<OrderItemDocument>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "orders",
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: EOrderCategory,
    required: true,
  },
});

export const OrderItem = mongoose.model("order-items", OrderItemSchema);
