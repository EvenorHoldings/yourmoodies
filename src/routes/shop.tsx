import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/lib/cart-context";
import { MOOD_META, SHOP_PRODUCTS, formatZAR, type Category, type Mood } from "@/lib/shop-products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Moodies | Premium Wellness Edibles & Devices" },
      { name: "description", content: "Shop cartridges, batteries and edibles from Moodies. Browse Uplift, Calm, and Balance collections. ZAR pricing, flat R100 shipping, discreet unbranded packaging." },
      { property: "og:title", content: "Shop — Moodies" },
      { property: "og:description", content: "Cartridges, batteries and edibles. Emotional clarity through intentional design." },
      { property: "og:url", content: "https://www.moodies.site/shop" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.moodies.site/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shop — Moodies" },
      { name: "twitter:description", content: "Cartridges, batteries and edibles. Emotional clarity through intentional design." },
      { name: "twitter:image", content: "https://www.moodies.site/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.moodies.site/shop" },
    ],
  }),
  component: ShopPage,
});

const MOODS: ("all" | Exclude<Mood, "neutral">)[] = ["all", "uplift", "calm", "balance"];
const CATEGORIES: ("all" | Category)[] = ["all", "cartridge", "battery", "edible"];
const CAT_LABEL: Record<"all" | Category, string> = {
  all: "All",
  cartridge: "Cartridges",
  battery: "Batteries",
  edible: "Edibles",
};

function ShopPage() {
  const [mood, setMood] = useState<(typeof MOODS)[number]>("all");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("all");
  const { add, setOpen } = useCart();

  const filtered = useMemo(() => {
    return SHOP_PRODUCTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (mood !== "all") {
        if (p.category === "battery") return false; // batteries are neutral
        if (p.mood !== mood) return false;
      }
      return true;
    });
  }, [mood, cat]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <CartDrawer />

      <section className="border-b border-foreground/10">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Shop</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Taste your mood.</h1>
          <p className="mt-3 max-w-xl text-sm text-foreground/60 md:text-base">
            Premium wellness edibles and devices. Emotional clarity through intentional design.
            Flat R100 shipping nationwide. Discreet, unbranded packaging.
          </p>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-background/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-4">
          <FilterGroup label="Mood">
            {MOODS.map((m) => (
              <FilterChip key={m} active={mood === m} onClick={() => setMood(m)}>
                {m === "all" ? "All moods" : MOOD_META[m].label}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Category">
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>
                {CAT_LABEL[c]}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-foreground/60">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition hover:border-foreground/30"
                style={{ borderLeft: `2px solid ${p.moodColor}` }}
              >
                <div
                  className="flex h-56 items-center justify-center bg-[#FAFAF8]"
                  aria-hidden
                >
                  <div
                    className="h-28 w-28 rounded-lg shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${p.moodColor}33, ${p.moodColor}88)` }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">{p.subcategory}</p>
                  <h3 className="mt-1 text-sm font-bold uppercase tracking-wide">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/60">{p.description}</p>
                  <p className="mt-3 text-xs text-foreground/50">{p.servings}</p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="text-lg font-bold">{formatZAR(p.price)}</span>
                    <button
                      onClick={() => {
                        add(p.id, 1);
                        setOpen(true);
                      }}
                      className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-foreground/50">
          <span>© {new Date().getFullYear()} Moodies · moodies.site</span>
          <a href="mailto:hello@moodies.site" className="hover:text-foreground">hello@moodies.site</a>
        </div>
      </footer>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/40">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active ? "border-foreground bg-foreground text-background" : "border-foreground/15 text-foreground/70 hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}
