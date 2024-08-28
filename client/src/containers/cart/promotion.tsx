import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPromotion } from "@/interfaces/IPromotion";
import { getPromotionDetail } from "@/lib/order-promotion";
import { useState } from "react";

interface PromotionProps {
  promotions: IPromotion[];
}

export const Promotion = ({ promotions }: PromotionProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full flex-col gap-y-1">
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Your Promotion ..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"none"}>No Promotion .. </SelectItem>
            {promotions.map((promo) => (
              <SelectItem value={promo._id}>{promo.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <p className="text-sm font-semibold text-green-700 dark:text-green-500">
          {getPromotionDetail(promotions, value)}
        </p>
      </div>
    </div>
  );
};
