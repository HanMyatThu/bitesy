import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromotionItemsProps {
  image: string;
  className: string;
  label: string;
  amount: number;
  onCLick: () => void;
}

export const PromotionItem = ({
  image,
  className,
  label,
  amount,
  onCLick,
}: PromotionItemsProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "flex h-[200px] w-full flex-row justify-between rounded-2xl p-4 shadow-lg transition-shadow hover:shadow-xl",
        className,
      )}
    >
      <div className="group-hover:bg flex h-full flex-col justify-between">
        <p className="flex-nowrap text-pretty text-sm font-semibold text-black/80">
          {label} <span>{amount}$</span>
        </p>
        <Button
          onClick={onCLick}
          variant="outline"
          size="sm"
          className="w-fit rounded-full hover:bg-secondary/80"
        >
          {t("DEAL")}
        </Button>
      </div>
      <div className="h-full">
        <img
          src={image}
          alt="promotion-icon"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};
