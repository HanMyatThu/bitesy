import { UploadApiResponse } from "cloudinary";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

import categories from "@/enum/categories";
import { Product } from "@/models/product";
import { productResource } from "@/resources/responseFormat";
import { toJson } from "@/resources/responseResource";
import cloudUploader from "@/utils/cloudinary";

const uploadImage = (filePath: string): Promise<UploadApiResponse> => {
  return cloudUploader.upload(filePath, {
    width: 1280,
    height: 720,
    crop: "fill",
  });
};

/**
 * Create a new product
 * 1. get the data from req.body
 * 2. create a product in database
 * 3. check if image exists in req.body
 * 4. return error if a user try to upload multiple photos
 * 5. upload image to cloudinary and save the url in database
 * 6. return response
 */
export const CreateNewProduct: RequestHandler = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      owner: req.user.id,
    });
    await product.save();

    const { image } = req.files;

    const isMultipleImages = Array.isArray(image);

    if (isMultipleImages) {
      return toJson(null, 422, "Multiple file upload is not acceptable", res);
    }

    //check if we have multiple images
    let invalidFileTypes = false;

    if (image) {
      if (!image.mimetype?.startsWith("image")) {
        invalidFileTypes = true;
      }
    }

    if (invalidFileTypes)
      return toJson(null, 422, "Invalid file type, files must be images!", res);

    //  upload image
    if (image) {
      const { secure_url, public_id } = await uploadImage(image.filepath);
      product.image = { url: secure_url, id: public_id };
    }
    await product.save();

    toJson(
      {
        product,
      },
      200,
      null,
      res
    );
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. User Must be authenticated
 * 2. User can upload Image as well
 * 3. Validate Incoming Data
 * 4. Upload normal properties
 * 5. Upload and Upload Images (restrict images qty)
 * 6. send the response back
 */
export const UpdateProduct: RequestHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!isValidObjectId(productId))
      return toJson(null, 422, "Invalid Product Id!", res);
    delete req.body.image;
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!product) return toJson(null, 404, "Product Not Found", res);

    const { image } = req.files;

    const isMultipleImages = Array.isArray(image);

    if (isMultipleImages) {
      return toJson(null, 422, "Multiple images Upload is not acceptable", res);
    }

    if (image) {
      if (!image.mimetype?.startsWith("image")) {
        return toJson(
          null,
          422,
          "Invalid file type, files must be image!",
          res
        );
      }
      const { secure_url, public_id } = await uploadImage(image.filepath);
      (product.image = { url: secure_url, id: public_id }),
        await product.save();
    }

    toJson(
      {
        message: "Product Updated Successfully",
        product,
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. User must be authenticated
 * 2. Check if product exists
 * 3. delete a product from database
 * 4. delete images from cloudinary
 * 5. return the response back
 */
export const DeleteProduct: RequestHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!isValidObjectId(productId))
      return toJson(null, 422, "Invalid Product Id!", res);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return toJson(null, 404, "Product Not Found!", res);
    }

    const image = product.image;

    if (image) {
      await cloudUploader.destroy(image.id);
    }

    await product.deleteOne();

    toJson(
      {
        message: "Product is deleted",
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. User must be authenticated
 * 2. Check if product exists
 * 3. check if image exists
 * 4. delete a single image from cloudinary
 * 5. update the image array
 * 6. return the response back
 */
export const DeleteProductImage: RequestHandler = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    if (!isValidObjectId(id) || !isValidObjectId(imageId)) {
      return toJson(null, 422, "Invalid Image Id", res);
    }

    const product = await Product.findById(id);
    if (!product) return toJson(null, 404, "Product Not Found", res);

    const isImageExists = product.image?.id === imageId;
    if (!isImageExists) return toJson(null, 404, "Image Not Found", res);

    product.image = null;

    await product.save();
    await cloudUploader.destroy(imageId);

    toJson(
      {
        message: "Image removed successfully",
        product,
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. check if user is authenticated
 * 2. check if product is exists wit id
 * 3. return the response with format
 */
export const getSingleProduct: RequestHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!isValidObjectId(productId))
      return toJson(null, 422, "Product ID is not valid", res);

    const product = await Product.findById(productId);

    if (!product) return toJson(null, 404, "Product Not Found!", res);

    toJson({ product }, 200, null, res);
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. Validate the category
 * 2. find products by category (apply pagination if needed)
 * 3. format data
 * 4. return the response collection
 */
export const getProductByCategory: RequestHandler = async (req, res) => {
  try {
    const { category } = req.params;
    const { pageNo = "1", limit = "5" } = req.query;
    if (!categories.includes(category)) {
      return toJson([], 200, null, res);
    }

    //pagination
    const productsCount = await Product.find({ category }).countDocuments();
    const products = await Product.find({ category })
      .sort("-createdAt")
      .skip((Number(pageNo) - 1) * Number(limit))
      .limit(Number(limit));
    const productCollection = productResource(products);

    toJson(
      {
        products: productCollection,
        pagination: {
          currentPage: pageNo,
          limit,
          totalPage: Math.ceil(productsCount / Number(limit)),
        },
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * 1. get all products from database
 * 2. show the lastest data
 * 3. return the response back
 */
export const getAllProductsBySorting: RequestHandler = async (req, res) => {
  try {
    const { pageNo, limit, category } = req.query;
    //pagination
    let productsCount = 0;
    let products;
    if (category?.length) {
      productsCount = await Product.find({ category }).countDocuments();
      products = await Product.find({ category })
        .sort("-createdAt")
        .skip((Number(pageNo) - 1) * Number(limit))
        .limit(Number(limit));
    } else {
      productsCount = await Product.find().countDocuments();
      products = await Product.find()
        .sort("-createdAt")
        .skip((Number(pageNo) - 1) * Number(limit))
        .limit(Number(limit));
    }
    toJson(
      {
        products: products,
        pagination: {
          currentPage: pageNo,
          limit,
          totalPage: Math.ceil(productsCount / Number(limit)),
        },
      },
      200,
      null,
      res
    );
  } catch (error) {
    toJson(null, 500, "Server Error", res);
  }
};
