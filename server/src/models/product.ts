import mongoose from "mongoose";
import { EOrderCategory } from "@/enum/categories";

type productImage = { url: string; id: string };

export interface ProductDocument extends mongoose.Document {
  name: string;
  price: number;
  category: EOrderCategory;
  image: productImage | null;
  description: string;
}

const ProductSchema = new mongoose.Schema<ProductDocument, {}, null>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: EOrderCategory,
      required: true,
    },
    image: {
      type: Object,
      nullable: true,
      url: String,
      id: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("products", ProductSchema);
