import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api-client";
import { IProduct } from "@/interfaces/IProduct";
import { IPagination } from "@/interfaces/IPagination";

interface IProductResponse {
  data: {
    products: IProduct[];
    pagination: IPagination;
  };
  error: { message: string } | null;
}

export function useHomeProducts(
  pageNo = "1" as string,
  limit = "8" as string,
  category?: string,
) {
  async function fetchAllProducts() {
    const { data } = await api.get<IProductResponse>("/api/products/latest", {
      params: { pageNo, limit, category },
    });
    return data.data;
  }

  const query = useQuery({
    queryKey: ["all-products" + pageNo + limit + category],
    queryFn: fetchAllProducts,
    staleTime: 8 * 60 * 60 * 1000, // 8h
  });

  return query;
}
