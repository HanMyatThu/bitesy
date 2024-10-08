import { Router } from "express";

import {
  CreateNewProduct,
  DeleteProduct,
  DeleteProductImage,
  getProductByCategory,
  getSingleProduct,
  UpdateProduct,
  getAllProductsBySorting,
} from "@/controllers/productController";
import { isAuth } from "@/middlewares/auth";
import { fileUpload } from "@/middlewares/file-upload";
import { validate } from "@/middlewares/validator";
import { createNewProductSchema } from "@/validationSchemas/productSchema";

const productRouter = Router();

productRouter.post(
  "/",
  isAuth,
  fileUpload,
  validate(createNewProductSchema),
  CreateNewProduct
);

productRouter.get("/latest", getAllProductsBySorting);
productRouter.get("/:id", isAuth, getSingleProduct);
productRouter.patch("/:id", isAuth, fileUpload, UpdateProduct);
productRouter.delete("/:id", isAuth, DeleteProduct);
productRouter.delete("/:id/image/:imageId", isAuth, DeleteProductImage);
productRouter.get("/by-category/:category", getProductByCategory);

export default productRouter;
