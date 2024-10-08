import { RequestHandler } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import { toJson } from "src/resources/responseResource";
import { User } from "src/models/user";
import { PasswordResetTokenModel } from "src/models/passwordResetToken";

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return toJson(null, 401, "Unauthorized Error", res);
    const token = authToken?.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(payload.id);
    if (!user) return toJson(null, 401, "Unauthorized Error", res);

    req.user = {
      id: payload.id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      role: user.role,
    };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return toJson(null, 401, "Token is expired", res);
    } else {
      return toJson(null, 500, "Unknown Error", res);
    }
  }
};

export const isValidPassResetToken: RequestHandler = async (req, res, next) => {
  const { id, token } = req.body;
  const resetPassToken = await PasswordResetTokenModel.findOne({ owner: id });

  if (!resetPassToken) return toJson(null, 403, "Unauthorized Requesst!", res);

  const matched = resetPassToken.compareToken(token);
  if (!matched) return toJson(null, 403, "Unauthorized Requesst!", res);

  next();
};
