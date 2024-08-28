import { EUserRole } from "@/enum/user-role";
import { IOrderItem } from "@/interfaces/IOrderItem";
import { Order } from "@/models/order";
import { OrderItem } from "@/models/orderitem";
import { toJson } from "@/resources/responseResource";
import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

/**
 * Create an order
 * 1. check if user is authenticated
 * 2. check if user has a user role
 * 3. check order has valid data
 * 4. create order items by looping an items[]
 * 4. create a order and save into database
 * 5. return the response back
 */
export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { role, id } = req.user;
    const isUser = role === EUserRole.USER;
    if (!isUser) return toJson(null, 401, "Unauthorized access!", res);

    // looping an items array
    const items: IOrderItem[] = req.body.items;
    const orderPromises = items.map((item) => {
      const orderitem = new OrderItem({ ...item });
      return orderitem.save();
    });
    const orderResults = await Promise.all(orderPromises);
    const orderItems = orderResults.map((result) => ({
      item: result._id,
    }));

    const order = new Order({
      customer_id: id,
      items: orderItems,
      ...req.body,
    });
    await order.save();

    toJson(
      {
        order,
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
 * Update Order Status
 * 1. check if User is Admin
 * 2. if not admin, return error
 * 3. check if id is a valid and return response
 * 4. update order status and save in DB
 * 5. return the response
 */
export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const isAdmin = req.user.role === EUserRole.ADMIN;
    if (!isAdmin) return toJson(null, 401, "Unauthorized access!", res);

    const { id } = req.params;
    if (!isValidObjectId(id))
      return toJson(null, 422, "Invalid Order Id!", res);

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!order) return toJson(null, 404, "Order Not Found!", res);

    toJson({ order }, 200, null, res);
  } catch {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Get Orders by Users
 * 1. check if user is authenticated user
 * 2. find orders from database by user
 * 3. return the order response
 */
export const getLatestOrderlist: RequestHandler = async (req, res) => {
  try {
    console.log("hi");
    const { id } = req.user;
    const orders = await Order.find({ customer_id: id })
      .sort("-createdAt")
      .populate("items.item");

    toJson(orders, 200, null, res);
  } catch (e) {
    console.log(e, "e");
    toJson(null, 500, "Server Error", res);
  }
};
