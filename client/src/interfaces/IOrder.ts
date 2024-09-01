import { IPromotion } from "./IPromotion";

type CustomerType = {
  _id: string;
  name: string;
};
export interface IOrder {
  _id: string;
  customer_id: string | CustomerType;
  date: {
    year: string;
    month: string;
    date: string;
  };
  promotion: IPromotion;
  promotion_amount: number;
  price: number;
  items: [
    {
      item: OrderItem;
    },
  ];
  status: string;
  createdAt: Date;
}

type OrderItemProduct = {
  _id: string;
  image: {
    url: string;
    id: string;
  };
  name: string;
};

export interface OrderItem {
  _id: string;
  product: OrderItemProduct;
  price: number;
  quantity: number;
  category: string;
}
