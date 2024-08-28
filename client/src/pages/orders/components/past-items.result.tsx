import { PlusSquare } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { AvatarItem } from "@/components/common/avatar-item";
import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { CardItem } from "@/components/common/card-item";
import { OrderItem } from "@/interfaces/IOrder";

interface PastItemResultProps {
  imageUrl: string;
  items: [{ item: OrderItem }];
}

export const PastItemsResult = ({ imageUrl, items }: PastItemResultProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const orderNames = items.map((i) => i.item.product.name);
  const uniqueNames = [...new Set(orderNames)];

  const orderName = `${uniqueNames[0]}, ...`;

  return (
    <div className="flex h-full w-full flex-col gap-y-4 border-y px-2 py-4">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex gap-x-2 md:gap-x-6">
          <AvatarItem imageUrl={imageUrl} size={isMobile ? "default" : "lg"} />
          <div className="flex flex-col justify-center">
            <h5 className="font-mono text-sm font-semibold text-primary md:text-lg xl:text-2xl">
              {orderName}
            </h5>
            <p className="text-xs text-muted-foreground md:text-sm xl:text-xl">
              Add Items to Cart
            </p>
          </div>
        </div>
        <div>
          <ToolTipHint asChild side="left" label="Order Again">
            <Button variant="ghost" size="icon">
              <PlusSquare className={isMobile ? "size-4" : "size-8"} />
            </Button>
          </ToolTipHint>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map(({ item }, id) => (
          <CardItem
            key={id}
            imageUrl={item.product.image.url}
            label={item.product.name}
            price={`${item.price}`}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};
