// import { useEffect } from "react";
// import { toast } from "sonner";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./cart-item";
import { useCartStore } from "@/store/use-cart";

export const Cart = () => {
  const {
    collapsed,
    onCollapsed,
    items,
    updateCartItem,
    removeCartItem,
    clearCartItem,
  } = useCartStore((state) => state);

  return (
    <Drawer open={collapsed} direction="right">
      <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen rounded-none sm:w-[350px] md:w-[450px]">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row gap-x-2 font-sans font-semibold">
            Check Out <ShoppingBag className="size-4" />
          </DrawerTitle>
          <DrawerDescription>
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
                      updateCartItem={updateCartItem}
                      removeCartItem={removeCartItem}
                      key={`cart-item-${item.id}`}
                    />
                  );
                })}
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
          <div className="mt-5 justify-end text-right">
            <div className="font-mono text-sm">
              {/* Total Price - {`$ ${getTotalPrice()}`} */}
            </div>
          </div>
          <Button onClick={() => {}} variant="default" disabled={!items.length}>
            Checkout
            {/* {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} */}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
