import { IOrder } from "@/interfaces/IOrder";
import { PastOrderResult } from "./past-order-result";

interface PastOrderProps {
  data: IOrder[];
}

export const PastOrder = ({ data }: PastOrderProps) => {
  if (!data.length) {
    return null;
  }
  return (
    <div className="mb-16">
      {data.map((order) => (
        <PastOrderResult
          key={order._id}
          imageUrl={order.items[0].item.product.image.url}
          items={order.items}
          purchaseDate={order.date}
          price={order.price}
          promotion_amount={order.promotion_amount}
        />
      ))}
    </div>
  );
};
