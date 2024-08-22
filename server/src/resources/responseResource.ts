import { Response } from "express";

export const toJson = (
  data: any,
  code: number,
  errorMsg: string | null,
  res: Response
) => {
  return res.status(code).send({
    data,
    error: errorMsg
      ? {
          code,
          message: errorMsg,
        }
      : null,
  });
};
