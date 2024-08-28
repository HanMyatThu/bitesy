import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { EUserRole } from "@/enum/user-role";
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  address: string | null;
  tokens: string[];
  role: EUserRole;
  avatar: {
    id: string;
    url: string;
  };
  promotions: [string];
}
interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    tokens: [String],
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
    role: {
      type: String,
      enum: EUserRole,
      default: EUserRole.USER,
    },
    promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: "promotions" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export const User = mongoose.model("users", UserSchema);
