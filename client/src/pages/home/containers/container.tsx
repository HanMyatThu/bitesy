import { Candy, CupSoda, Shirt, ShoppingBasket, Utensils } from "lucide-react";

import { CategoryIcon } from "../components/category_icon";
import { Separator } from "@/components/ui/separator";
import { ProductItem } from "../components/product-item";

const mockCategoryData = [
  { id: 1, title: "Meal", icon: Utensils },
  { id: 2, title: "Drink", icon: CupSoda },
  { id: 3, title: "Candy", icon: Candy },
  { id: 4, title: "Convenience", icon: Shirt },
  { id: 5, title: "Other", icon: ShoppingBasket },
];

export const Container = () => {
  return (
    <>
      <div className="mx-auto flex h-full max-w-screen-2xl flex-row justify-center gap-x-3 text-center">
        {mockCategoryData.map((data) => (
          <CategoryIcon
            key={data.id}
            title={data.title}
            icon={data.icon}
            onClick={() => {}}
          />
        ))}
      </div>
      <Separator className="mt-8" />
      <div className="py-6">
        <h2 className="mb-4 text-lg font-semibold">All Products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[...Array(6)].map((_, id) => (
            <ProductItem key={id} />
          ))}
        </div>
      </div>
    </>
  );
};
