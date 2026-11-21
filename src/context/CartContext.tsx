'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '@/lib/types';

const KEY = 'ricq-cart-v1';
type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  addItem: (productId: string, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  return typeof item.productId === 'string' && typeof item.size === 'string' && Number.isInteger(item.quantity) && (item.quantity ?? 0) > 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter(isCartItem));
      }
    } catch {
      // Storage can be disabled or contain malformed JSON; keep an empty in-memory cart.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // The cart remains usable for this visit even when browser storage is unavailable.
    }
  }, [items, ready]);

  const addItem = useCallback((productId: string, size: string, quantity = 1) => {
    setItems(current => {
      const found = current.find(item => item.productId === productId && item.size === size);
      return found
        ? current.map(item => item === found ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { productId, size, quantity }];
    });
  }, []);
  const removeItem = useCallback((productId: string, size: string) => {
    setItems(current => current.filter(item => !(item.productId === productId && item.size === size)));
  }, []);
  const setQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setItems(current => quantity < 1
      ? current.filter(item => !(item.productId === productId && item.size === size))
      : current.map(item => item.productId === productId && item.size === size ? { ...item, quantity } : item));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({
    items,
    ready,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem,
    removeItem,
    setQuantity,
    clear,
  }), [items, ready, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used within CartProvider');
  return value;
}
