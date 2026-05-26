import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/lib/cart-context";
import { formatZAR } from "@/lib/shop-products";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Moodies" },
      { name: "description", content: "Complete your Moodies order. Discreet, unbranded packaging. Flat R100 shipping." },
    ],
  }),
  component: CheckoutPage,
});

type Payment = "card" | "snapscan" | "eft";

function CheckoutPage() {
  const { lines, subtotal, shipping, total, clear } = useCart();
  const router = useRouter();
  const [submitted, setSubmitted] = useState<null | { orderId: string; total: number }>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", postal: "",
    payment: "card" as Payment,
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const orderId = "MO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const finalTotal = total;
    clear();
    setSubmitted({ orderId, total: finalTotal });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <CartDrawer />
        <section className="mx-auto max-w-2xl px-5 py-20 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-foreground" />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Order received</h1>
          <p className="mt-2 text-sm text-foreground/60">Thanks {form.name || "—"}. We'll email confirmation to {form.email || "you"} shortly.</p>
          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-foreground/10 p-5 text-left text-sm">
            <div className="flex justify-between"><span className="text-foreground/60">Order</span><span className="font-mono">{submitted.orderId}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-foreground/60">Total paid</span><span className="font-semibold">{formatZAR(submitted.total)}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-foreground/60">Shipping to</span><span className="text-right">{form.city || "—"}, {form.postal || "—"}</span></div>
          </div>
          <p className="mt-6 text-xs text-foreground/50">All orders ship in discreet, unbranded packaging.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Continue shopping</Link>
        </section>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <CartDrawer />
        <section className="mx-auto max-w-2xl px-5 py-20 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
          <p className="mt-2 text-sm text-foreground/60">Add a product before heading to checkout.</p>
          <button
            onClick={() => router.navigate({ to: "/shop" })}
            className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
          >
            Browse the shop
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <CartDrawer />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="space-y-8">
          <header>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Checkout</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Delivery details</h1>
          </header>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold">Contact</legend>
            <Field label="Full name" required value={form.name} onChange={update("name")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" type="email" required value={form.email} onChange={update("email")} />
              <Field label="Phone" type="tel" required value={form.phone} onChange={update("phone")} />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold">Shipping address</legend>
            <Field label="Street address" required value={form.address} onChange={update("address")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" required value={form.city} onChange={update("city")} />
              <Field label="Postal code" required value={form.postal} onChange={update("postal")} />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Payment method</legend>
            <div className="grid gap-2">
              {[
                { v: "card", label: "Credit / debit card", note: "Visa, Mastercard via secure gateway" },
                { v: "snapscan", label: "SnapScan", note: "Pay via QR code" },
                { v: "eft", label: "Bank EFT", note: "Manual transfer, ships once cleared" },
              ].map((opt) => (
                <label
                  key={opt.v}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                    form.payment === opt.v ? "border-foreground bg-foreground/[0.03]" : "border-foreground/15"
                  }`}
                >
                  <input
                    type="radio" name="payment" value={opt.v}
                    checked={form.payment === opt.v}
                    onChange={() => setForm((f) => ({ ...f, payment: opt.v as Payment }))}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium">{opt.label}</p>
                    <p className="text-xs text-foreground/55">{opt.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Place order — {formatZAR(total)}
          </button>
          <p className="text-[11px] text-foreground/50">
            By placing this order you confirm you are 21+. Orders ship in discreet, unbranded packaging.
          </p>
        </form>

        <aside className="h-fit rounded-xl border border-foreground/10 bg-background p-5 lg:sticky lg:top-20">
          <h2 className="text-sm font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex items-start justify-between gap-3 border-b border-foreground/5 pb-3 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide">{product.name}</p>
                  <p className="mt-0.5 text-xs text-foreground/55">{product.subcategory} · Qty {qty}</p>
                </div>
                <span className="font-semibold">{formatZAR(lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 text-sm">
            <Row label="Subtotal" value={formatZAR(subtotal)} />
            <Row label="Shipping (flat)" value={formatZAR(shipping)} />
            <div className="flex justify-between border-t border-foreground/10 pt-2 text-base font-semibold">
              <span>Total</span><span>{formatZAR(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-foreground/70"><span>{label}</span><span>{value}</span></div>;
}

function Field({
  label, type = "text", required, value, onChange,
}: { label: string; type?: string; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-foreground/60">{label}{required && " *"}</span>
      <input
        type={type} required={required} value={value} onChange={onChange}
        className="w-full rounded-md border border-foreground/15 bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}
