import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CartButton } from "@/components/cart-drawer";
import { useCart } from "@/lib/cart-context";
import { SHOP_PRODUCTS, formatZAR, type Mood } from "@/lib/shop-products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | Moodies" },
      { name: "description", content: "Cartridges, batteries and edibles tuned to Uplift, Calm and Balance." },
      { property: "og:title", content: "Shop | Moodies" },
      { property: "og:description", content: "Cartridges, batteries and edibles tuned to Uplift, Calm and Balance." },
      { property: "og:url", content: "https://www.moodies.site/shop" },
      { property: "og:image", content: "https://www.moodies.site/og-image.jpg" },
      { name: "twitter:title", content: "Shop | Moodies" },
      { name: "twitter:description", content: "Cartridges, batteries and edibles tuned to Uplift, Calm and Balance." },
      { name: "twitter:image", content: "https://www.moodies.site/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.moodies.site/shop" }],
  }),
  component: ShopPage,
});

const FILTERS: { id: "all" | Mood; label: string }[] = [
  { id: "all", label: "All" },
  { id: "uplift", label: "Uplift" },
  { id: "calm", label: "Calm" },
  { id: "balance", label: "Balance" },
  { id: "neutral", label: "Devices" },
];

function ShopPage() {
  const { add, setOpen } = useCart();
  const [filter, setFilter] = useState<"all" | Mood>("all");
  const items = useMemo(
    () => (filter === "all" ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter((p) => p.mood === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/70 px-6 py-5 backdrop-blur md:px-10">
        <Link to="/" className="text-sm font-light tracking-[0.4em]">MOODIES</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hidden text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:text-white sm:inline">
            Story
          </Link>
          <CartButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-10">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">The Collection</p>
          <h1 className="text-5xl font-light tracking-tight md:text-7xl">Shop</h1>
          <p className="mt-4 max-w-xl text-base text-white/60">
            Hand-formulated in small batches. Free local pickup, R100 flat shipping across South Africa.
          </p>
        </div>

        <nav className="mt-12 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition ${
                filter === f.id
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li
              key={p.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-white/30"
            >
              <div className="flex items-center justify-between">
                <span
                  className="h-10 w-10 rounded-full"
                  style={{ background: p.moodColor, boxShadow: `0 0 24px ${p.moodColor}66` }}
                  aria-hidden
                />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{p.subcategory}</span>
              </div>
              <p className="mt-6 text-base font-light leading-tight">{p.name}</p>
              <p className="mt-2 text-xs text-white/50">{p.description}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/30">{p.servings}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm tabular-nums" style={{ color: p.moodColor }}>{formatZAR(p.price)}</span>
                <button
                  onClick={() => { add(p.id); setOpen(true); }}
                  className="rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 hover:text-white"
                >
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-[10px] uppercase tracking-[0.3em] text-white/40 md:px-10">
        © {new Date().getFullYear()} Moodies — Crafted in South Africa
      </footer>
    </div>
  );
}
