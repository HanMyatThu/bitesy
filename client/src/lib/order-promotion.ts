import { ICartItem } from "@/interfaces/ICartItem";
import { EPromotionType, IPromotion } from "@/interfaces/IPromotion";
import { getDayNameValue } from "./common";

export const getTotalPrice = (promotions: IPromotion[], items: ICartItem[]) => {
  console.log(promotions, "promotions");
  if (promotions.length === 0) {
    const totalPrice = items.reduce((accumulator, item) => {
      const price = parseFloat(item.price);
      return accumulator + price * item.quantity;
    }, 0);
    return totalPrice.toFixed(2);
  }
};

export const getPromotionDetail = (
  promotions: IPromotion[],
  selected: string,
) => {
  if (!selected.length || selected === "none") {
    return "No Promotion Selected";
  }
  const promotion = promotions.find((prom) => prom._id === selected);
  if (!promotion) {
    return "No Promotion Selected";
  }

  switch (promotion.config.type) {
    case EPromotionType.ITEM_CATEGORY:
      return `Get $ ${promotion.amount} Discount on Purchasing ${promotion.config.item_category} items`;
    case EPromotionType.ORDER_DAY_OF_PURCAHSE:
      return `Get $ ${promotion.amount} Discount on Purchasing on ${getDayNameValue(promotion.config.day)}`;
    case EPromotionType.ORDER_MIN_QUANTITY:
      return `Get $ ${promotion.amount} Discount on Purchasing at least ${Number(promotion.config.min_order_item_quantity)} items`;
    case EPromotionType.ORDER_MIN_TOTAL_PRICE:
      return `Get $ ${promotion.amount} Discount on Purchasing equal or more than $ ${Number(promotion.config.min_order_total_price_usd)}`;
    default:
      return "No Promotion Selected";
  }
};
