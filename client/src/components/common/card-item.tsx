import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { ToolTipHint } from "@/components/common/tooltip-hint";

interface CardItemProps {
  imageUrl: string;
  onClick?: () => void;
  label: string;
  price?: string;
}

export const CardItem = ({
  imageUrl,
  onClick,
  label,
  price,
}: CardItemProps) => {
  const { t } = useTranslation();
  return (
    <div className="group flex flex-col gap-y-2 transition-all">
      <div className="relative" onClick={onClick}>
        <img
          src={imageUrl}
          alt="product-items"
          className="aspect-video object-cover transition-all group-hover:opacity-70 group-hover:shadow-lg"
        />
        {onClick && (
          <div className="absolute bottom-2 right-2">
            <ToolTipHint asChild side="bottom" label={t("ADD_TO_CART")}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:bg-white/80 dark:bg-orange-500 dark:hover:bg-orange-700"
              >
                <Plus className="size-4" />
              </Button>
            </ToolTipHint>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{label}</p>
        {price && <p className="text-xs text-muted-foreground"> $ {price}</p>}
      </div>
    </div>
  );
};
