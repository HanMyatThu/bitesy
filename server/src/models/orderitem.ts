import { EOrderCategory } from "@/enum/categories";
import mongoose, { Document } from "mongoose";

interface OrderItemDocument extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
  category: EOrderCategory;
}

const OrderItemSchema = new mongoose.Schema<OrderItemDocument, {}, null>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
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
