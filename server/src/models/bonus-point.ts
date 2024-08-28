import mongoose, { Document } from "mongoose";

interface BonusPointDocument extends Document {
  bonus_point: number;
  user: mongoose.Schema.Types.ObjectId;
}

const BonusPointSchema = new mongoose.Schema<BonusPointDocument>({
  bonus_point: {
    type: Number,
    min: 0,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const BonusPoint = mongoose.model("bonus_points", BonusPointSchema);
