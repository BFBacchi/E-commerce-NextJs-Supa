"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

export type CartState = {
  items: CartItem[];
  totalItems: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

function computeTotalItems(items: CartItem[]) {
  return items.reduce((sum, ci) => sum + ci.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addItem: (product, quantity = 1) => set(() => {
        const existing = get().items.find((i) => i.product.id === product.id);
        const items = existing
          ? get().items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
          : [...get().items, { product, quantity }];
        return { items, totalItems: computeTotalItems(items) };
      }),
      removeItem: (productId) => set(() => {
        const items = get().items.filter((i) => i.product.id !== productId);
        return { items, totalItems: computeTotalItems(items) };
      }),
      updateQuantity: (productId, quantity) => set(() => {
        const items = get().items.map((i) => i.product.id === productId ? { ...i, quantity } : i);
        return { items, totalItems: computeTotalItems(items) };
      }),
      clear: () => set({ items: [], totalItems: 0 })
    }),
    { name: 'cart' }
  )
);
