import mongoose, { Document } from "mongoose";

import { ETier } from "@/enum/tier";

interface TierDocument extends Document {
  type: ETier;
  point: number;
  user: mongoose.Schema.Types.ObjectId;
}

const TierSchema = new mongoose.Schema<TierDocument, {}, null>({
  type: {
    type: String,
    enum: ETier,
    default: ETier.NONE,
  },
  point: {
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

export const TierModal = mongoose.model("tiers", TierSchema);
