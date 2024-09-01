import { EUserRole } from "@/enum/user-role";
import { toJson } from "@/resources/responseResource";
import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next) => {
  try {
    const role = req.user.role;

    if (!role || role !== EUserRole.ADMIN) {
      return toJson(null, 401, "Unauthorized Access!", res);
    }

    next();
  } catch {
    return toJson(null, 401, "Unauthorized Access!", res);
  }
};
