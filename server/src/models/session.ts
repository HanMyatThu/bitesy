import { authToken } from "./authToken";
import mongoose, { Document } from "mongoose";

interface SessionDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  broswerId: string;
  authToken: string;
}

const SessionSchema = new mongoose.Schema<SessionDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    broswerId: {
      type: String,
      required: true,
    },
    authToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("sessions", SessionSchema);
