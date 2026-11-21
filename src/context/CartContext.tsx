'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '@/lib/types';
const KEY = 'ricq-cart-v1';
type CartContextValue = { items: CartItem[]; ready: boolean; count: number; addItem: (productId: string, size: string, quantity?: number) => void; removeItem: (productId: string, size: string) => void; setQuantity: (productId: string, size: string, quantity: number) => void; clear: () => void };
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]); const [ready, setReady] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem(KEY); if (saved) setItems(JSON.parse(saved)); } catch { localStorage.removeItem(KEY); } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(items)); }, [items, ready]);
  const addItem = useCallback((productId: string, size: string, quantity = 1) => setItems(current => { const found = current.find(x => x.productId === productId && x.size === size); return found ? current.map(x => x === found ? { ...x, quantity: x.quantity + quantity } : x) : [...current, { productId, size, quantity }]; }), []);
  const removeItem = useCallback((productId: string, size: string) => setItems(current => current.filter(x => !(x.productId === productId && x.size === size))), []);
  const setQuantity = useCallback((productId: string, size: string, quantity: number) => setItems(current => quantity < 1 ? current.filter(x => !(x.productId === productId && x.size === size)) : current.map(x => x.productId === productId && x.size === size ? { ...x, quantity } : x)), []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, ready, count: items.reduce((sum, item) => sum + item.quantity, 0), addItem, removeItem, setQuantity, clear }), [items, ready, addItem, removeItem, setQuantity, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error('useCart must be used within CartProvider'); return value; }
