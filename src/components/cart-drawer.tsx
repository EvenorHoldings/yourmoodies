import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatZAR } from "@/lib/shop-products";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      className="relative inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/40"
      aria-label="Open cart"
    >
      <ShoppingBag className="h-4 w-4" />
      <span>Cart</span>
      {count > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold text-background">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, shipping, total, setQty, remove, clear } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
          <h2 className="text-base font-semibold tracking-tight">Your cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-foreground/5">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-8 w-8 text-foreground/30" />
              <p className="mt-3 text-sm text-foreground/60">Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex gap-3 border-b border-foreground/5 pb-4">
                  <div
                    className="h-16 w-16 flex-shrink-0 rounded-md border border-foreground/10"
                    style={{ borderLeft: `3px solid ${product.moodColor}` }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide">{product.name}</p>
                      <button onClick={() => remove(product.id)} className="text-foreground/40 hover:text-foreground" aria-label="Remove">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-foreground/60">{product.subcategory}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-foreground/15">
                        <button onClick={() => setQty(product.id, qty - 1)} className="px-2 py-1" aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{qty}</span>
                        <button onClick={() => setQty(product.id, qty + 1)} className="px-2 py-1" aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{formatZAR(lineTotal)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-foreground/10 px-5 py-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-foreground/70">
                <span>Subtotal</span><span>{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Shipping (flat)</span><span>{formatZAR(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-foreground/10 pt-2 text-base font-semibold">
                <span>Total</span><span>{formatZAR(total)}</span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-foreground/50">
              All orders ship in discreet, unbranded packaging.
            </p>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="mt-3 flex w-full items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Checkout — {formatZAR(total)}
            </Link>
            <button onClick={clear} className="mt-2 w-full text-center text-xs text-foreground/50 hover:text-foreground">
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
