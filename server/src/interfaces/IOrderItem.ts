import { EOrderCategory } from "@/enum/categories";
import { ObjectId } from "mongodb";

export interface IOrderItem {
  product: ObjectId;
  price_usd: number;
  quantity: number;
  category: EOrderCategory;
}
