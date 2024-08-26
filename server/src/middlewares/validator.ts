import { RequestHandler } from "express";
import { toJson } from "src/resources/responseResource";
import * as yup from "yup";

export const validate = (schema: yup.Schema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.validate(
        { ...req.body },
        { strict: true, abortEarly: true }
      );
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toJson(null, 422, error.message, res);
      } else {
        toJson(null, 422, "Server Error", res);
      }
    }
  };
};
