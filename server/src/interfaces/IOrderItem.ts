import { EOrderCategory } from "@/enum/categories";
import { ObjectId } from "mongodb";

export interface IOrderItem {
  _id: ObjectId;
  product: ObjectId;
  price_usd: number;
  quantity: number;
  category: EOrderCategory;
}
