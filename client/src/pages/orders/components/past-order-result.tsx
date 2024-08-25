import { Link } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";

import { AvatarItem } from "@/components/common/avatar-item";
import { Button } from "@/components/ui/button";

export const PastOrderResult = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className="flex h-full w-full flex-row items-center justify-between border-y px-2 py-4">
      <div className="flex gap-x-2 md:gap-x-6">
        <AvatarItem
          imageUrl="/images/pizza.jpg"
          size={isMobile ? "default" : "lg"}
        />
        <div className="flex flex-col gap-y-1">
          <h5 className="font-mono text-sm font-semibold text-primary md:text-lg xl:text-2xl">
            Apple, Orange, ...
          </h5>
          <p className="text-xs text-muted-foreground md:text-sm xl:text-xl">
            3 items. $24.23
          </p>
          <p className="text-xs text-muted-foreground md:text-sm xl:text-xl">
            08 Aug . Completed
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
