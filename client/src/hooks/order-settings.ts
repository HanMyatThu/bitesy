import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/services/api-client";
import { IOrder } from "@/interfaces/IOrder";
import { EOrderStatus } from "@/interfaces/IOrderStatus";
import { queryClient } from "@/services/query-client";

interface IProductResponse {
  data: IOrder[];
  error: { message: string } | null;
}

interface IUpdateOrder {
  status: EOrderStatus;
}

interface IUpdateOrderResponse {
  data: {
    order: IOrder;
  };
  error: null | { message: string };
}

export function useOrderSettings() {
  async function fetchOrderList() {
    const { data } = await api.get<IProductResponse>("/api/orders/all");
    return data.data;
  }

  const query = useQuery({
    queryKey: ["order-lists-all"],
    queryFn: fetchOrderList,
    initialData: [] as IOrder[],
  });

  return query;
}

export function useUpdateOrder(orderId: string) {
  async function fetchUpdateOrder(payload: IUpdateOrder) {
    const { data } = await api.patch<IUpdateOrderResponse>(
      `/api/orders/${orderId}`,
      {
        ...payload,
      },
    );
    return data.data;
  }

  return useMutation({
    mutationFn: fetchUpdateOrder,
    onError: (e) => {
      const error = e as AxiosError<IUpdateOrderResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () => {
      queryClient.getQueryData(["order-lists-all"]);
      queryClient.invalidateQueries({ queryKey: ["order-update-" + orderId] });
    },
  });
}
