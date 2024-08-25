import { PlusSquare } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { AvatarItem } from "@/components/common/avatar-item";
import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { CardItem } from "@/components/common/card-item";

export const PastItemsResult = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className="flex h-full w-full flex-col gap-y-4 border-y px-2 py-4">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex gap-x-2 md:gap-x-6">
          <AvatarItem
            imageUrl="/images/pizza.jpg"
            size={isMobile ? "default" : "lg"}
          />
          <div className="flex flex-col justify-center">
            <h5 className="font-mono text-sm font-semibold text-primary md:text-lg xl:text-2xl">
              Apple, Orange, ...
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
      <div className="flex flex-row gap-x-3">
        {[...Array(3)].map((_, id) => (
          <CardItem
            key={id}
            imageUrl="/images/pizza.jpg"
            label="Pizza Funghi"
            price={"10.49"}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};
