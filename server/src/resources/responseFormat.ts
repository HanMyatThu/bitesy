import { ProductDocument } from "src/models/product";

export const productResource = (products: ProductDocument[]) => {
  return products.map((product) => {
    return {
      id: product._id,
      ...product,
    };
  });
};
