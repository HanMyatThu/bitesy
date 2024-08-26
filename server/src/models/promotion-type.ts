import mongoose, { Document } from "mongoose";

import { EPromotionType } from "@/enum/promotion-type";
import { EOrderCategory } from "@/enum/categories";

interface PromotionTypeDocument extends Document {
  type: string;
  min_order_item_quantity: number | null;
  min_order_total_price_usd: number | null;
  item_category: EOrderCategory | null;
  day: number | null;
}

const PromotionTypeSchema = new mongoose.Schema<PromotionTypeDocument>({
  type: {
    type: String,
    required: true,
    enum: EPromotionType,
  },
  min_order_item_quantity: Number,
  min_order_total_price_usd: Number,
  item_category: {
    type: String,
    enum: EOrderCategory,
  },
  day: Number, // sun: 0, mon: 1, tue: 2, ...sat: 6
});

export const PromotionType = mongoose.model(
  "promotion-types",
  PromotionTypeSchema
);
