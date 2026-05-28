import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatZAR } from "@/lib/shop-products";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur transition hover:border-white/60 hover:text-white"
      aria-label={`Open cart, ${count} items`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 7h12l-1.5 11.25a2 2 0 0 1-2 1.75h-5a2 2 0 0 1-2-1.75L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      <span>Cart</span>
      {count > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-medium tracking-normal text-black">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, shipping, total, setQty, remove, count } = useCart();

  return (
    <>
      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] text-white shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Your cart</p>
            <h2 className="mt-1 text-lg font-light tracking-tight">
              {count === 0 ? "Empty" : `${count} item${count === 1 ? "" : "s"}`}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/20 p-2 text-white/70 transition hover:border-white/60 hover:text-white"
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-white/50">Nothing here yet.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-white/30 px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((l) => (
                <li key={l.product.id} className="flex gap-4 border-b border-white/5 pb-5">
                  <span
                    className="mt-1 h-10 w-10 shrink-0 rounded-full"
                    style={{ background: l.product.moodColor, boxShadow: `0 0 24px ${l.product.moodColor}66` }}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <p className="text-sm font-light tracking-wide">{l.product.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-white/40">{l.product.subcategory}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-1 py-1">
                        <button onClick={() => setQty(l.product.id, l.qty - 1)} className="h-6 w-6 rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Decrease">−</button>
                        <span className="w-5 text-center text-xs">{l.qty}</span>
                        <button onClick={() => setQty(l.product.id, l.qty + 1)} className="h-6 w-6 rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Increase">+</button>
                      </div>
                      <span className="text-sm tabular-nums">{formatZAR(l.lineTotal)}</span>
                    </div>
                    <button onClick={() => remove(l.product.id)} className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/30 hover:text-white/70">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-white/10 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-white/60">
                <dt>Subtotal</dt><dd className="tabular-nums">{formatZAR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-white/60">
                <dt>Shipping</dt><dd className="tabular-nums">{formatZAR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base text-white">
                <dt>Total</dt><dd className="tabular-nums">{formatZAR(total)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="mt-5 block w-full rounded-full bg-white py-3.5 text-center text-xs uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
            >
              Checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
