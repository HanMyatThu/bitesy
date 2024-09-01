import React from "react";

import { OrderItem as IOrderItem } from "@/interfaces/IOrder";

type OrderItemType = [
  {
    item: IOrderItem;
  },
];
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface OrderItemProps {
  children: React.ReactNode;
  items: OrderItemType;
}

export const OrderItem = ({ children, items }: OrderItemProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="flex w-fit flex-col items-start justify-start gap-y-1">
        {items.map((item) => (
          <p key={item.item._id}>
            {item.item.product.name} ({item.item.quantity}) item
            {item.item.quantity > 1 ? "s" : ""}
          </p>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};
