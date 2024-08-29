import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, ShoppingBag, Trash, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/use-cart";
import { getTotalPrice } from "@/lib/order-promotion";
import { useUser } from "@/contexts/user";
import { Promotion } from "./promotion";
import { CartItem } from "./cart-item";
import { useOrderCreate } from "@/hooks/order-create";

export const Container = () => {
  const {
    collapsed,
    onCollapsed,
    items,
    updateCartItem,
    removeCartItem,
    clearCartItem,
  } = useCartStore((state) => state);
  const { t } = useTranslation();
  const { user } = useUser();
  const [selected, setSelected] = useState("");
  const { mutateAsync, reset, data, error, isPending } = useOrderCreate();

  useEffect(() => {
    if (data && !error) {
      toast.success("You have created an Order!");
      onCollapsed();
      clearCartItem();
      reset();
    }
  }, [data, error, onCollapsed, clearCartItem, reset]);

  const handleCartUpdate = (id: string, quantity: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.quantity = quantity;
      }
      return item;
    });
    updateCartItem(updatedItems);
    toast.info("You have updated item's quantity");
  };

  const handleRemove = (id: string) => {
    removeCartItem(items, id);
    toast.info("You have removed an item from your cart!");
  };

  const handleRemoveAll = () => {
    clearCartItem();
    toast.info("You have cleared your shopping cart!");
  };

  const priceInfo = getTotalPrice(user.promotions, items, selected);

  const handleCheckout = async () => {
    try {
      const modifiedItems = items.map((item) => {
        return {
          product: item.id,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
        };
      });
      await mutateAsync({
        price: `${priceInfo?.totalPrice}`,
        date: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
        },
        items: modifiedItems,
        promotion_amount: priceInfo?.promotion_amount || 0,
        promotion: selected || null,
      });
    } catch {
      toast.error("Unknow Error Occured");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCollapsed();
    }
  };

  return (
    <Drawer open={collapsed} direction="right" onOpenChange={handleOpenChange}>
      <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen rounded-none sm:w-[380px] md:w-[480px]">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row gap-x-2 font-sans font-semibold">
            {t("CHECK_OUT")} <ShoppingBag className="size-4" />
          </DrawerTitle>
          <DrawerDescription className="flex justify-start">
            {t("ITEMS_COUNT", { count: items.length })}
          </DrawerDescription>
          <div
            onClick={onCollapsed}
            className="absolute right-2 top-10 cursor-pointer"
          >
            <X />
          </div>
          <Separator />
          <ScrollArea className="mt-8 h-[500px]">
            {items.length ? (
              <>
                {" "}
                {items.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      updateCartItem={handleCartUpdate}
                      removeCartItem={handleRemove}
                      key={`cart-item-${item.id}`}
                    />
                  );
                })}
                <div className="mb-2 flex justify-end">
                  <Button
                    onClick={() => handleRemoveAll()}
                    variant="ghost"
                    className="flex flex-row gap-x-2 text-xs font-semibold text-red-900 hover:bg-white/90 hover:text-red-500 dark:text-red-400 dark:hover:bg-primary-foreground"
                  >
                    {t("REMOVE_ALL_ITEMS")} <Trash className="size-3" />
                  </Button>
                </div>
                <div className="mb-6 flex items-center px-2">
                  <Promotion
                    promotions={user.promotions}
                    value={selected}
                    setValue={setSelected}
                  />
                </div>
              </>
            ) : (
              <div
                className="mx-auto h-full cursor-pointer justify-center text-center font-mono text-lg underline hover:text-primary/80"
                onClick={onCollapsed}
              >
                {t("BROSWER_MORE")}
              </div>
            )}
          </ScrollArea>
        </DrawerHeader>
        <DrawerFooter className="fixed bottom-0 w-full">
          <div className="mt-5 flex flex-col justify-end text-right">
            <div className="font-mono text-sm">
              {t("TOTAL_PRICE")} - {`$ ${priceInfo?.totalPrice}`}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {t("DISCOUNT_PRICE")} - {`$ ${priceInfo?.promotion_amount}`}
            </p>
          </div>
          <Button
            onClick={handleCheckout}
            variant="default"
            disabled={!items.length || isPending}
            className="text-blue-300 dark:text-blue-900"
          >
            {t("CHECK_OUT")} {`$ ${priceInfo?.totalPrice}`}
            {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
