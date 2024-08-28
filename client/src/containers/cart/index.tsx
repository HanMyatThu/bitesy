// import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag, Trash, X } from "lucide-react";

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
import { useState } from "react";

export const Cart = () => {
  const {
    collapsed,
    onCollapsed,
    items,
    updateCartItem,
    removeCartItem,
    clearCartItem,
  } = useCartStore((state) => state);
  const { user, isAuthenticated } = useUser();
  const [selected, setSelected] = useState("");

  if (!user || !isAuthenticated) {
    return null;
  }

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

  return (
    <Drawer open={collapsed} direction="right">
      <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen rounded-none sm:w-[350px] md:w-[450px]">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row gap-x-2 font-sans font-semibold">
            Check Out <ShoppingBag className="size-4" />
          </DrawerTitle>
          <DrawerDescription className="flex justify-start">
            You have {items.length} items inside your cart.
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
                    Remove All Items <Trash className="size-3" />
                  </Button>
                </div>
                <div className="flex items-center px-2">
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
                Browse more items
              </div>
            )}
          </ScrollArea>
        </DrawerHeader>
        <DrawerFooter className="fixed bottom-0 w-full">
          <div className="mt-5 flex flex-col justify-end text-right">
            <div className="font-mono text-sm">
              Total Price - {`$ ${priceInfo?.totalPrice}`}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Discount Price - {`$ ${priceInfo?.promotion_amount}`}
            </p>
          </div>
          <Button
            onClick={() => {}}
            variant="default"
            disabled={!items.length}
            className="text-blue-900"
          >
            Checkout {`$ ${priceInfo?.totalPrice}`}
            {/* {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} */}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
