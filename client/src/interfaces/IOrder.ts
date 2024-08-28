import { IPromotion } from "./IPromotion";

export interface IOrder {
  _id: string;
  customer_id: string;
  date: {
    year: string;
    month: string;
    date: string;
  };
  promotions: IPromotion[];
  promotion_amount: number;
  price: number;
  items: [
    {
      item: OrderItem;
    },
  ];
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
