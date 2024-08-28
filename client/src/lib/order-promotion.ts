import { ICartItem } from "@/interfaces/ICartItem";
import { EPromotionType, IPromotion } from "@/interfaces/IPromotion";
import { getDayNameValue, subtractNonNegative } from "./common";

export const getTotalPrice = (
  promotions: IPromotion[],
  items: ICartItem[],
  selected: string,
) => {
  if (promotions.length === 0 || !selected || selected === "none") {
    const totalPrice = items.reduce((accumulator, item) => {
      const price = parseFloat(item.price);
      return accumulator + price * item.quantity;
    }, 0);
    return {
      totalPrice: totalPrice,
      promotion_amount: 0,
    };
  } else {
    const selectedPromotion = promotions.find(
      (promo) => promo._id === selected,
    );
    // check if user use promotion.type === 'ITEM_CATEGORY'
    const categoryPromotion =
      selectedPromotion?.config.type === EPromotionType.ITEM_CATEGORY;
    if (categoryPromotion) {
      //find an item with same category in order items
      const getConfigValue = selectedPromotion.config.item_category;
      const validItems = items.filter(
        (item) => item.category === getConfigValue,
      );
      const totalPrice = items.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        return accumulator + price * item.quantity;
      }, 0);
      const totalPriceForItems = validItems.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        return accumulator + price * item.quantity;
      }, 0);
      const promotedPrice = subtractNonNegative(
        totalPriceForItems,
        selectedPromotion.amount,
      );
      const priceWithoutValidItems: number = Number(
        (totalPrice - totalPriceForItems).toFixed(2),
      );
      const orderAmount: number = priceWithoutValidItems + promotedPrice;
      return {
        totalPrice: orderAmount,
        promotion_amount: Number(
          Number(totalPriceForItems - promotedPrice).toFixed(2),
        ),
      };
    }

    //check if user use promotion.type === specific day
    const dayPromotion =
      selectedPromotion?.config.type === EPromotionType.ORDER_DAY_OF_PURCAHSE;
    if (dayPromotion) {
      const today = new Date();
      const dayIndex = today.getDay();

      const isValidPromotion = dayIndex === selectedPromotion.config.day;
      const totalPrice = items.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        return accumulator + price * item.quantity;
      }, 0);
      return {
        totalPrice: isValidPromotion
          ? totalPrice - selectedPromotion.amount
          : totalPrice,
        promotion_amount: isValidPromotion ? selectedPromotion.amount : 0,
      };
    }

    // check if user use promotion.type === min quantity
    const minQuantityPromotion =
      selectedPromotion?.config.type === EPromotionType.ORDER_MIN_QUANTITY;
    if (minQuantityPromotion) {
      const isValidPromotion =
        items.length >= selectedPromotion.config.min_order_item_quantity! || 0;
      const totalPrice = items.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        return accumulator + price * item.quantity;
      }, 0);
      return {
        totalPrice: isValidPromotion
          ? totalPrice - selectedPromotion.amount
          : totalPrice,
        promotion_amount: isValidPromotion ? selectedPromotion.amount : 0,
      };
    }

    // check if user promotion.type === min amount
    const minAmountPromotion =
      selectedPromotion?.config.type === EPromotionType.ORDER_MIN_TOTAL_PRICE;
    if (minAmountPromotion) {
      const totalPrice = items.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        return accumulator + price * item.quantity;
      }, 0);
      const isValidPrmotion =
        totalPrice >= selectedPromotion.config.min_order_total_price_usd! || 0;
      return {
        totalPrice: isValidPrmotion
          ? totalPrice - selectedPromotion.amount
          : totalPrice,
        promotion_amount: isValidPrmotion ? selectedPromotion.amount : 0,
      };
    }
  }
};

/**
 *
 * @param promotions : IPromotion[] ( Promotions that user have)
 * @param selected : string  (selected value from select input)
 * @returns label : string (prpmotion details)
 */
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
