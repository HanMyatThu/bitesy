export enum EOrderStatus {
  PAYMENT_PROCESSING = "payment_processing",
  PAYMENT_DONE = "payment_done",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery",
  ORDER_COMPLETE = "order_complete",
  ORDER_CANCELLED_BY_USER = "order_cancelled_by_user",
  ORDER_CANCELLED_BY_SHOP = "order_cancelled_by_shop",
}

export const orderStatuses = Object.values(EOrderStatus);
