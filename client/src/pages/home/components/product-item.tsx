import { useTranslation } from "react-i18next";
import { PlusCircle, ShoppingCart } from "lucide-react";

import { ToolTipHint } from "@/components/common/tooltip-hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/interfaces/IProduct";

interface ProductItemProps {
  data: IProduct;
  onClick: (product: IProduct) => void;
}

export const ProductItem = ({ data, onClick }: ProductItemProps) => {
  const { t } = useTranslation();
  const handleOnClick = () => {
    onClick(data);
  };
  return (
    <div className="mt-4 space-y-4">
      <div className="group relative hover:shadow-lg">
        <div
          onClick={handleOnClick}
          className="absolute top-[45%] flex h-6 w-full cursor-pointer flex-row justify-center text-center opacity-0 transition group-hover:bg-white/80 group-hover:opacity-90 dark:text-black/80"
        >
          <ShoppingCart className="mr-2 mt-1 size-4" /> {t("ADD")}
        </div>
        <img
          src={data.image?.url}
          alt={data.name}
          className="aspect-video object-cover"
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="pl-2">
          <p className="text-md font-semibold hover:text-blue-600">
            {data.name}
          </p>
          <p className="text-xs font-light text-muted-foreground">{`& ${data.price}`}</p>
          <p className="text-xs font-semibold text-muted-foreground">4.0 ★</p>
        </div>
        <div>
          <ToolTipHint label={t("ADD_TO_CART")} asChild side="left">
            <Button
              onClick={handleOnClick}
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

export const ProductItemSkeleton = () => {
  return (
    <div className="mt-4 flex h-full w-full flex-col space-y-4">
      <div className="h-30 aspect-video">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-y-1 pl-2">
          <Skeleton className="h-2 w-8" />
          <Skeleton className="h-2 w-8" />
          <Skeleton className="h-2 w-8" />
        </div>
        <div>
          <Skeleton className="size-4" />
        </div>
      </div>
    </div>
  );
};
