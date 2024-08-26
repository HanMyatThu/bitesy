import mongoose, { Document } from "mongoose";

interface PromotionDocument extends Document {
  name: string;
  config: mongoose.Schema.Types.ObjectId;
}

const PromotionSchema = new mongoose.Schema<PromotionDocument>({
  name: {
    type: String,
    required: true,
  },
  config: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "promotion-types",
    required: true,
  },
});

export const Promotion = mongoose.model("promotions", PromotionSchema);
