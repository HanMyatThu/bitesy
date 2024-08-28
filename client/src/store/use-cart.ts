import { create } from "zustand";

import { ICartItem } from "@/interfaces/ICartItem";

interface CartStore {
  collapsed: boolean;
  onCollapsed: () => void;
  onExpend: () => void;
  items: ICartItem[];
  updateCartItem: (newItems: ICartItem[]) => void;
  removeCartItem: (currentIems: ICartItem[], id: string) => void;
  clearCartItem: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  collapsed: false,
  updateCartItem: (newItems: ICartItem[]) => set(() => ({ items: newItems })),
  removeCartItem: (currentItems: ICartItem[], id: string) =>
    set(() => ({ items: currentItems.filter((item) => item.id !== id) })),
  clearCartItem: () => set(() => ({ items: [] })),
  onCollapsed: () => set(() => ({ collapsed: false })),
  onExpend: () => set(() => ({ collapsed: true })),
}));
