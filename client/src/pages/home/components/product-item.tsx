import { ToolTipHint } from "@/components/common/tooltip-hint";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const ProductItem = () => {
  return (
    <div className="mt-4 h-full w-full space-y-4">
      <div>
        <img
          src="/images/logo.png"
          alt="product"
          className="aspect-video object-cover"
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="pl-2">
          <p className="text-md font-semibold hover:text-blue-600">KFC</p>
          <p className="text-xs font-light text-muted-foreground">$25</p>
          <p className="text-xs font-semibold text-muted-foreground">4.0 ★</p>
        </div>
        <div>
          <ToolTipHint label="add to cart" asChild side="left">
            <Button
              className="hover:bg-white dark:bg-background"
              variant="ghost"
              size="icon"
            >
              <PlusCircle className="size-5" stroke="orange" />
            </Button>
          </ToolTipHint>
        </div>
      </div>
    </div>
  );
};
