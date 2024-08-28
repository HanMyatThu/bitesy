import { MinusSquare, PlusSquare, Trash2Icon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { ICartItem } from "@/interfaces/ICartItem";

interface CartItemProps {
  item: ICartItem;
  updateCartItem: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
}

export const CartItem = ({
  item,
  updateCartItem,
  removeCartItem,
}: CartItemProps) => {
  const handleCartQuantity = (type: 0 | 1) => {
    // let 0 is -
    if (item.quantity === 1 && type === 0) return null;
    if (type === 0) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      updateCartItem(item.id, item.quantity + 1);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-3">
        <div>
          <img
            src={item.imageUrl}
            alt={`shopping-item-${item.id}`}
            className="aspect-video object-fill"
          />
        </div>
        <div className="col-span-2 justify-end">
          <div className="flex flex-row justify-between">
            <div className="ml-2">
              <div className="font-mono text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {item.category}
              </div>
            </div>

            <div className="flex flex-row gap-x-6">
              <div className="justify-left flex flex-row gap-x-2 text-left">
                <MinusSquare
                  className="mt-1 size-4"
                  onClick={() => handleCartQuantity(0)}
                />
                <div>{item.quantity}</div>
                <PlusSquare
                  className="mt-1 size-4"
                  onClick={() => handleCartQuantity(1)}
                />
              </div>
              <div className="text-sm text-card-foreground">
                {`$ ${Number(item.quantity * Number(item.price)).toFixed(2)}`}
              </div>
              <div
                onClick={() => removeCartItem(item.id)}
                className="absolute bottom-5 right-0 flex cursor-pointer flex-row gap-x-1 text-xs text-red-600 dark:text-red-400"
              >
                Remove
                <Trash2Icon className="mt-0.5 size-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-3" />
    </div>
  );
};
