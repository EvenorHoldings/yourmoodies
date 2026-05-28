import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatZAR } from "@/lib/shop-products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Moodies" },
      { name: "description", content: "Complete your Moodies order." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Checkout | Moodies" },
      { property: "og:url", content: "https://www.moodies.site/checkout" },
    ],
    links: [{ rel: "canonical", href: "https://www.moodies.site/checkout" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, shipping, total, clear } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);

  if (lines.length === 0 && !placed) {
    return (
      <Shell>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Checkout</p>
          <h1 className="mt-4 text-4xl font-light md:text-6xl">Your cart is empty</h1>
          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full border border-white/30 px-7 py-3.5 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black"
          >
            Browse the shop
          </Link>
        </div>
      </Shell>
    );
  }

  if (placed) {
    return (
      <Shell>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Order received</p>
          <h1 className="mt-4 text-4xl font-light md:text-6xl">Thank you.</h1>
          <p className="mx-auto mt-6 max-w-md text-white/60">
            We'll be in touch at the email you provided to confirm payment and dispatch.
          </p>
          <Link
            to="/"
            className="mt-10 inline-block rounded-full bg-white px-7 py-3.5 text-xs uppercase tracking-[0.25em] text-black hover:bg-white/90"
          >
            Back to the story
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={(e) => { e.preventDefault(); clear(); setPlaced(true); router.invalidate(); }}
          className="space-y-6"
        >
          <header>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Checkout</p>
            <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">Your details</h1>
          </header>

          <Field label="Full name" name="name" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
          <Field label="Delivery address" name="address" autoComplete="street-address" required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city" autoComplete="address-level2" required />
            <Field label="Postal code" name="postal" autoComplete="postal-code" required />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-white py-4 text-xs uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
          >
            Place order — {formatZAR(total)}
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
            Demo checkout. No payment is taken.
          </p>
        </form>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Order summary</p>
          <ul className="mt-5 space-y-4">
            {lines.map((l) => (
              <li key={l.product.id} className="flex items-start gap-3 border-b border-white/5 pb-4">
                <span className="mt-1 h-8 w-8 shrink-0 rounded-full" style={{ background: l.product.moodColor }} aria-hidden />
                <div className="flex-1">
                  <p className="text-sm font-light">{l.product.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">× {l.qty}</p>
                </div>
                <span className="text-sm tabular-nums">{formatZAR(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-1.5 text-sm">
            <div className="flex justify-between text-white/60"><dt>Subtotal</dt><dd className="tabular-nums">{formatZAR(subtotal)}</dd></div>
            <div className="flex justify-between text-white/60"><dt>Shipping</dt><dd className="tabular-nums">{formatZAR(shipping)}</dd></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base"><dt>Total</dt><dd className="tabular-nums">{formatZAR(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/70 px-6 py-5 backdrop-blur md:px-10">
        <Link to="/" className="text-sm font-light tracking-[0.4em]">MOODIES</Link>
        <Link to="/shop" className="text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:text-white">
          ← Back to shop
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">{children}</main>
    </div>
  );
}

function Field({ label, name, type = "text", required, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
      />
    </label>
  );
}
