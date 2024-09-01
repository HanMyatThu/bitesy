import { format } from "date-fns";

import { columns } from "./datatable/columns";
import { DataTable } from "./datatable/data-table";
import { useOrderSettings } from "@/hooks/order-settings";
import { toast } from "sonner";

export const OrderSettings = () => {
  const { data, error } = useOrderSettings();

  const formattedData = data.map((order) => ({
    id: order._id,
    price: order.price,
    promotion_amount: order.promotion_amount,
    promotion: order.promotion?.name,
    items: order.items,
    status: order.status,
    customer: order.customer_id,
    createdAt: format(new Date(order.createdAt), "dd/MM/yyyy HH:MM:ss"),
  }));

  if (error) {
    toast.error("Unknown Error Occured. Please try again!");
  }

  return (
    <div className="p-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Order Settings</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};
