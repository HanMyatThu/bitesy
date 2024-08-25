import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ToolTipHint } from "./tooltip-hint";

interface CardItemProps {
  imageUrl: string;
  onClick: () => void;
  label: string;
  price: string;
}

export const CardItem = ({
  imageUrl,
  onClick,
  label,
  price,
}: CardItemProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative" onClick={onClick}>
        <img
          src={imageUrl}
          alt="product-items"
          className="aspect-video object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <ToolTipHint asChild side="bottom" label="Add to Cart">
            <Button
              variant="ghost"
              className="rounded-full bg-white hover:bg-white/80"
            >
              <Plus className="size-4" />
            </Button>
          </ToolTipHint>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{label}</p>
        <p className="text-xs text-muted-foreground"> $ {price}</p>
      </div>
    </div>
  );
};
