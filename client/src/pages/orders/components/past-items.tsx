import { IOrder } from "@/interfaces/IOrder";
import { PastItemsResult } from "./past-items.result";

interface PastItemsProps {
  data: IOrder[];
}
export const PastItems = ({ data }: PastItemsProps) => {
  return (
    <div className="mb-16">
      {data.map((order) => (
        <PastItemsResult
          key={order._id}
          imageUrl={order.items[0].item.product.image.url}
          items={order.items}
        />
      ))}
    </div>
  );
};
