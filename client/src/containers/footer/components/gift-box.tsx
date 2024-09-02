import { Gift, Star } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";
import { Button } from "@/components/ui/button";

interface GiftBoxProps {
  price: number;
  point: number;
  disabled: boolean;
}

export const GiftBox = ({ price, point, disabled }: GiftBoxProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-1 rounded-xl border border-black/15 bg-white/55 p-4 shadow-lg dark:bg-primary">
        <Gift className="size-12" stroke="pink" fill="orange" />
        <p className="text-sm text-muted-foreground">Vouncher of</p>
        <p className="text-pretty text-sm font-semibold text-primary">
          $ {price}
        </p>
        <ToolTipHint
          asChild
          label={disabled ? "Unable to Purchase" : "Purchase"}
          side="bottom"
        >
          <Button
            variant="outline"
            disabled={disabled}
            size="sm"
            className="mt-2 flex flex-row items-center justify-center gap-x-1 rounded-full"
          >
            <Star
              className="size-3 rounded-full bg-white p-0.5 ring-1 ring-black"
              fill="black"
            />
            {point}
          </Button>
        </ToolTipHint>
      </div>
    </>
  );
};
