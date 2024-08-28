import { EOrderCategory } from "@/interfaces/IProduct";

export interface IPromotionConfig {
  _id: string;
  type: EPromotionType;
  min_order_item_quantity?: number;
  min_order_total_price_usd?: number;
  item_category?: EOrderCategory;
  day?: number;
}

export enum EPromotionType {
  ORDER_MIN_QUANTITY = "order_min_quantity",
  ORDER_MIN_TOTAL_PRICE = "order_min_total_price",
  ITEM_CATEGORY = "item_category",
  ORDER_DAY_OF_PURCAHSE = "order_day_of_purchase",
}

export const getPrmotionConfig = [
  { config: EPromotionType.ORDER_DAY_OF_PURCAHSE, key: "day" },
  {
    config: EPromotionType.ORDER_DAY_OF_PURCAHSE,
    key: "min_order_item_quantity",
  },
  {
    config: EPromotionType.ORDER_MIN_TOTAL_PRICE,
    key: "min_order_total_price_usd",
  },
  { config: EPromotionType.ITEM_CATEGORY, key: "item_category" },
];

export interface IPromotion {
  _id: string;
  name: string;
  amount: number;
  config: IPromotionConfig;
}
