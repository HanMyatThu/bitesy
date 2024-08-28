import {
  Candy,
  ChevronLeftCircle,
  ChevronRightCircle,
  CupSoda,
  Shirt,
  ShoppingBasket,
  Utensils,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { CategoryIcon, CategoryIconSeketon } from "../components/category_icon";
import { Separator } from "@/components/ui/separator";
import { ProductItem, ProductItemSkeleton } from "../components/product-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHomeProducts } from "@/hooks/product-home";
import { Button } from "@/components/ui/button";
import { homeRoute } from "@/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/user";
import { IProduct } from "@/interfaces/IProduct";
import { useCartStore } from "@/store/use-cart";
import { addCartItem } from "@/lib/common";

const categoryData = [
  { id: 1, title: "Meal", icon: Utensils, value: "meal" },
  { id: 2, title: "Drink", icon: CupSoda, value: "drink" },
  { id: 3, title: "Candy", icon: Candy, value: "candy" },
  { id: 4, title: "Convenience", icon: Shirt, value: "convenience" },
  { id: 5, title: "Other", icon: ShoppingBasket, value: "other" },
];

export const Container = () => {
  const { isAuthenticated } = useUser();
  const { items, updateCartItem, onExpend } = useCartStore((state) => state);
  const navigate = useNavigate();
  const { pageNo = "1", category = "", limit = "8" } = homeRoute.useSearch();
  const { data, isLoading } = useHomeProducts(pageNo, limit, category);
  const products = data?.products || [];

  const currentPage = data?.pagination.currentPage;

  const paginationArray = Array.from(
    { length: Number(data?.pagination.totalPage || 1) },
    (_, index) => index + 1,
  );

  const handlePagination = (value: number) => {
    navigate({
      to: "/",
      search: {
        pageNo: `${value}`,
        limit: `${limit}`,
        category: `${category}`,
      },
    });
  };

  const handleCategory = (category: string) => {
    navigate({
      to: "/",
      search: {
        pageNo: `${1}`,
        limit: `${limit}`,
        category: `${category}`,
      },
    });
  };

  // add to cart
  const onClickAddToCart = (data: IProduct) => {
    if (!isAuthenticated) {
      toast.error("Please Sign In First");
    } else {
      const updatedItems = addCartItem(items, data);
      updateCartItem(updatedItems);
      onExpend();
    }
  };

  if (isLoading) {
    return (
      <div className="m-0 mb-4 mt-24 h-auto p-0">
        <div className="mx-auto flex h-full max-w-screen-2xl flex-row justify-center gap-x-8 text-center">
          {[...Array(5)].map((_, i) => (
            <CategoryIconSeketon key={`category-skeleton-${i}`} />
          ))}
        </div>
        <Skeleton className="mt-8 h-1 w-full" />
        <div className="py-4">
          <Skeleton className="h-2 w-8" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {[...Array(5)].map((_, i) => (
              <ProductItemSkeleton key={`product-skeleton-${i}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="my-24 h-auto px-4">
      <div className="mx-auto flex h-full max-w-screen-2xl flex-row justify-center gap-x-3 text-center">
        {categoryData.map((data) => (
          <CategoryIcon
            key={data.id}
            title={data.title}
            icon={data.icon}
            value={data.value}
            onClick={handleCategory}
          />
        ))}
      </div>
      <Separator className="mt-8" />
      <div className="py-4">
        <h2 className="mb-4 text-lg font-semibold">All Products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.name}
              data={product}
              onClick={onClickAddToCart}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex flex-row items-center">
          <Button
            onClick={() => handlePagination(Number(pageNo) - 1)}
            variant="ghost"
            size="icon"
            disabled={Number(currentPage) === 1}
          >
            <ChevronLeftCircle className="size-4" />
          </Button>
          {paginationArray.map((page) => (
            <Button
              key={`pagination-${page}`}
              className={
                Number(currentPage) === page
                  ? "text-blue-600"
                  : "text-muted-foreground"
              }
              onClick={() => handlePagination(Number(page))}
              variant="link"
              size="icon"
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePagination(Number(pageNo) + 1)}
            variant="ghost"
            size="icon"
            disabled={
              Number(currentPage) === Number(data?.pagination.totalPage)
            }
          >
            <ChevronRightCircle className="size-4" />
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
