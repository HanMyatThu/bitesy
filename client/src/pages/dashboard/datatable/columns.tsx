import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon } from "lucide-react";
import { UpdateOrder } from "./update-order";
import { EOrderStatus } from "@/interfaces/IOrderStatus";
import { OrderItem } from "./order-item";
import { OrderItem as IOrderItem } from "@/interfaces/IOrder";
import { ToolTipHint } from "@/components/common/tooltip-hint";
import { StatusBadge } from "@/components/common/status-badge";

type OrderItemType = [
  {
    item: IOrderItem;
  },
];

type CustomerType = {
  _id: string;
  name: string;
};

export type OrderData = {
  id: string;
  price: number;
  items: OrderItemType;
  promotion_amount: number;
  promotion: string;
  createdAt: string;
  status: string;
  customer: string | CustomerType;
};

export const columns: ColumnDef<OrderData>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return (
        <div className="text-nowrap text-sm text-muted-foreground">
          {createdAt}
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    cell: ({ row }) => {
      const customer: CustomerType = row.getValue("customer");
      return (
        <ToolTipHint asChild label={customer._id} side="bottom">
          <p>{customer.name}</p>
        </ToolTipHint>
      );
    },
  },
  {
    accessorKey: "items",
    header: () => {
      return <div> Order Items </div>;
    },
    cell: ({ row }) => {
      const items: OrderItemType = row.getValue("items");
      return (
        <div className="text-center text-xs text-green-300">
          <OrderItem items={items}>
            <p className="text-nowrap text-sm font-bold text-blue-700 underline">
              {items.length} items
            </p>
          </OrderItem>
        </div>
      );
    },
  },
  {
    accessorKey: "promotion",
    cell: ({ row }) => {
      const promotion: string = row.getValue("promotion");
      if (!promotion) {
        return <div> No promotion Used</div>;
      } else {
        return (
          <div className="text-nowrap text-center text-sm text-green-700">
            {promotion}
          </div>
        );
      }
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "promotion_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promotion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("promotion_amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: EOrderStatus = row.getValue("status");
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "id",
    header: () => {
      return <div>Actions</div>;
    },
    cell: ({ row }) => {
      return (
        <UpdateOrder
          orderId={row.getValue("id")}
          defaultValue={row.getValue("status")}
          disabled={row.getValue("status") === EOrderStatus.ORDER_COMPLETE}
        >
          <ToolTipHint asChild label="Edit Order">
            <Button
              variant="ghost"
              disabled={row.getValue("status") === EOrderStatus.ORDER_COMPLETE}
            >
              <EditIcon className="size-5" />
            </Button>
          </ToolTipHint>
        </UpdateOrder>
      );
    },
  },
];
