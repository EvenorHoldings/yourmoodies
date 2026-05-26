import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SHIPPING_FLAT, SHOP_PRODUCTS, type ShopProduct } from "./shop-products";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  lines: { product: ShopProduct; qty: number; lineTotal: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "moodies.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const productMap = new Map(SHOP_PRODUCTS.map((p) => [p.id, p]));
    const lines = items
      .map((i) => {
        const product = productMap.get(i.id);
        if (!product) return null;
        return { product, qty: i.qty, lineTotal: product.price * i.qty };
      })
      .filter(Boolean) as { product: ShopProduct; qty: number; lineTotal: number }[];
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const shipping = lines.length > 0 ? SHIPPING_FLAT : 0;
    return {
      items,
      add: (id, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.id === id);
          if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id, qty }];
        }),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      lines,
      subtotal,
      shipping,
      total: subtotal + shipping,
      open,
      setOpen,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
