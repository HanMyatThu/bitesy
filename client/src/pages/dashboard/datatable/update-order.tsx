import { useState, useRef, ElementRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EOrderStatus, orderStatuses } from "@/interfaces/IOrderStatus";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useOrderSettings, useUpdateOrder } from "@/hooks/order-settings";
import { toast } from "sonner";

interface UpdateOrderProps {
  children: React.ReactNode;
  orderId: string;
  disabled: boolean;
  defaultValue: EOrderStatus;
}

export const UpdateOrder = ({
  children,
  orderId,
  defaultValue,
  disabled,
}: UpdateOrderProps) => {
  const [value, setValue] = useState<EOrderStatus>(defaultValue);
  const closeRef = useRef<ElementRef<"button">>(null);

  const { mutateAsync, isPending, reset } = useUpdateOrder(orderId);
  const { refetch } = useOrderSettings();

  const handleOnChange = (value: EOrderStatus) => {
    setValue(value);
  };

  const handleSave = async () => {
    try {
      await mutateAsync({ status: value });
      refetch();
      toast.success("Order is updated successfully");
    } catch {
      toast.error("Unable to Update Order Status");
      reset();
    } finally {
      closeRef.current?.click();
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log(open, "open");
    if (!open) {
      setValue(defaultValue);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger disabled={disabled}>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-y-8">
        <DialogHeader>
          <DialogTitle>Order Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex w-full flex-row items-center gap-x-5 text-center">
            <p className="text-md text-nowrap font-mono text-primary">
              Update Order Status:
            </p>
            <div className="w-full">
              <Select value={value} onValueChange={handleOnChange}>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={defaultValue}
                    className="font-medium"
                  />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button disabled={isPending} onClick={handleSave}>
            Save
          </Button>
          <DialogClose ref={closeRef}>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
