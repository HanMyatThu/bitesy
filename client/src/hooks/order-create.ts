import { useMutation } from "@tanstack/react-query";

import { api } from "@/services/api-client";
import { IOrder } from "@/interfaces/IOrder";
import { EOrderCategory } from "@/interfaces/IProduct";
import { queryClient } from "@/services/query-client";
import { AxiosError } from "axios";

interface ICreateOrderResponse {
  data: {
    order: IOrder;
  };
  error: null | { message: string };
}

interface IItem {
  product: string;
  price: string;
  quantity: number;
  category: EOrderCategory;
}

interface IOrderPayload {
  price: string;
  date: {
    year: number;
    month: number;
    date: number;
  };
  items: IItem[];
  promotion_amount: number;
  promotion: string;
}

export function useOrderCreate() {
  async function fetchOrderCreate(payload: IOrderPayload) {
    const { data } = await api.post<ICreateOrderResponse>(`/api/orders`, {
      ...payload,
    });
    return data.data;
  }

  return useMutation({
    mutationFn: fetchOrderCreate,
    onError: (e) => {
      const error = e as AxiosError<ICreateOrderResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["order-create"] }),
  });
}
