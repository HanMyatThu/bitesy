import mongoose, { Document } from "mongoose";

const BonusPointSchema = new mongoose.Schema({
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
