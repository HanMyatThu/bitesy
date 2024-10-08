import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

import { EUserRole } from "@/enum/user-role";
import { IOrderItem } from "@/interfaces/IOrderItem";
import { Order } from "@/models/order";
import { OrderItem } from "@/models/orderitem";
import { toJson } from "@/resources/responseResource";
import { TierModal } from "@/models/tier";
import {
  BONUS_POINT_MULTIPLER,
  TIER_POINT_MULTIPLER,
} from "@/constants/constants";
import { BonusPoint } from "@/models/bonus-point";

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

    if (!req.body.items.length)
      return toJson(null, 400, "Invalid Request", res);
    // looping an items array
    const items: IOrderItem[] = req.body.items;
    const orderItemPromises = items.map((item) => {
      const data = new OrderItem({ ...item });
      return data.save();
    });
    const orderResults = await Promise.all(orderItemPromises);
    const orderItems = orderResults.map((res) => ({
      item: res._id,
    }));
    const order = new Order({
      customer_id: id,
      items: orderItems,
      ...req.body,
    });
    order.items = orderItems;
    await order.save();

    //create tier points
    const tier = await TierModal.findOne({ user: id });
    if (tier) {
      const tierPoint =
        (order.price + order.promotion_amount) * TIER_POINT_MULTIPLER;
      tier.point = parseFloat(
        (tier.point + Number(tierPoint.toFixed(2))).toFixed(2)
      );
      await tier.save();
    }

    //update bonus points
    const bonus = await BonusPoint.findOne({ user: id });
    if (bonus) {
      const bonuspoint =
        (order.price + order.promotion_amount) * BONUS_POINT_MULTIPLER;

      bonus.bonus_point = parseFloat(
        (bonus.bonus_point + Number(bonuspoint.toFixed(2))).toFixed(2)
      );
      await bonus.save();
    }

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
    const { id } = req.user;
    const orders = await Order.find({ customer_id: id })
      .sort("-createdAt")
      .populate({
        path: "items.item",
        populate: {
          path: "product",
          model: "products",
          select: ["image", "name"],
        },
      });

    toJson(orders, 200, null, res);
  } catch (e) {
    toJson(null, 500, "Server Error", res);
  }
};

/**
 * Get ALl Orders For Admin
 * 1. check if user is authenticated and role is ADMIN
 * 2. find orders from database
 * 3. return the order response
 */
export const getAllOrders: RequestHandler = async (_, res) => {
  try {
    const orders = await Order.find()
      .sort("-createdAt")
      .populate("promotion")
      .populate({
        path: "customer_id",
        select: ["name", "id"],
      })
      .populate({
        path: "items.item",
        populate: {
          path: "product",
          model: "products",
          select: ["image", "name"],
        },
      });

    toJson(orders, 200, null, res);
  } catch {
    toJson(null, 50, "Sever Error", res);
  }
};
