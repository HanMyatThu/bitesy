import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api-client";
import { IOrder } from "@/interfaces/IOrder";

interface IProductResponse {
  data: IOrder[];
  error: { message: string } | null;
}

export function useOrderList() {
  async function fetchOrderList() {
    const { data } = await api.get<IProductResponse>("/api/orders/listing");
    return data.data;
  }

  const query = useQuery({
    queryKey: ["order-lists-1"],
    queryFn: fetchOrderList,
    initialData: [] as IOrder[],
  });

  return query;
}
