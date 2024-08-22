import * as yup from "yup";

import categories from "@/enum/categories";

export const createNewProductSchema = yup.object({
  name: yup.string().required("Product's Name is missing"),
  description: yup.string().required("Product's Description is missing"),
  category: yup
    .string()
    .oneOf(categories, "Invalid Category")
    .required("Category is missing"),
  price: yup
    .string()
    .transform((value) => {
      if (!isNaN(+value)) return "";
      return +value;
    })
    .required("Price is missing"),
});
