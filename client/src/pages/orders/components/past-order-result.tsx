import { Link } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";

import { AvatarItem } from "@/components/common/avatar-item";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/interfaces/IOrder";
import { getDateValue } from "@/lib/common";

interface PastOrderResultProps {
  imageUrl: string;
  items: [{ item: OrderItem }];
  purchaseDate: {
    year: string;
    month: string;
    date: string;
  };
  price: number;
  promotion_amount: number;
}

export const PastOrderResult = ({
  imageUrl,
  items,
  purchaseDate,
  price,
  promotion_amount,
}: PastOrderResultProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { year, month, date } = purchaseDate;

  const orderNames = items.map((i) => i.item.product.name);
  const uniqueNames = [...new Set(orderNames)];

  const orderName = `${uniqueNames[0]}, ...`;

  return (
    <div className="flex h-full w-full flex-row items-center justify-between border-y px-2 py-4">
      <div className="flex gap-x-2 md:gap-x-6">
        <AvatarItem imageUrl={imageUrl} size={isMobile ? "default" : "lg"} />
        <div className="flex flex-col gap-y-1">
          <h5 className="font-mono text-sm font-semibold text-primary md:text-lg xl:text-2xl">
            {orderName}
          </h5>
          <p className="text-xs text-muted-foreground md:text-sm xl:text-xl">
            {items.length} items. ${price}{" "}
            <span className="text-xs text-green-700 dark:text-green-400">
              Discount: ${promotion_amount}
            </span>
          </p>
          <p className="text-xs text-muted-foreground md:text-sm xl:text-xl">
            {getDateValue(+year, +month, +date)} . Completed
          </p>
        </div>
      </div>
      <div className="flex justify-center text-center">
        <Link to="/">
          <Button
            variant="secondary"
            size={isMobile ? "sm" : "lg"}
            className="rounded-full hover:bg-[#29612a] hover:text-white/80"
          >
            Order Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
