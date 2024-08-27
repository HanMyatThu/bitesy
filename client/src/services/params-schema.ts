import * as z from "zod";

export const productSearchSchema = z.object({
  pageNo: z.string().default("1").optional(),
  category: z.string().catch("").optional(),
  limit: z.string().default("8").optional(),
});

export const verifyUserSchema = z.object({
  id: z.string().optional(),
  token: z.string().optional(),
});
