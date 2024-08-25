import { TPromotionConfig } from "./../interfaces/IPromotion";
import mongoose, { Document } from "mongoose";

interface PromotionDocument extends Document {
  name: string;
  config: TPromotionConfig;
  points_multiplier: number;
}

const PromotionSchema = new mongoose.Schema<PromotionDocument>({
  name: {
    type: String,
    required: true,
  },
  config: {
    type: Object,
  },
});
