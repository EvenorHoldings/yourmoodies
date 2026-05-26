import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CartDrawer } from "@/components/cart-drawer";
import upliftImg from "@/assets/moodies-uplift.jpg";
import vapeImg from "@/assets/moodies-vape.jpg";
import batteryImg from "@/assets/moodies-battery.jpg";
import comboImg from "@/assets/moodies-combo.jpg";
import trioImg from "@/assets/moodies-trio.jpg";
import kioskImg from "@/assets/moodies-kiosk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodies | Premium Wellness Edibles & Devices" },
      {
        name: "description",
        content:
          "Taste your mood. Premium wellness edibles and devices. Emotional clarity through intentional design. Unified collections, collectible packaging, everyday luxury.",
      },
      { property: "og:title", content: "Moodies | moodies.site" },
      {
        property: "og:description",
        content:
          "Premium wellness edibles and devices. Three collections. One unified visual language.",
      },
    ],
  }),
  component: MoodiesWellness,
});

type CollectionKey = "uplift" | "calm" | "balance";

const collections: Record<
  CollectionKey,
  {
    name: string;
    icon: string;
    color: string;
    mood: string;
    description: string;
    products: { name: string; serving: string; flavor: string }[];
    gradient: string;
    image: string;
  }
> = {
  uplift: {
    name: "Uplift",
    icon: "⚡",
    color: "#a8d5a8",
    mood: "Morning clarity for creative energy",
    description:
      "Start your day with intention and social warmth. Energy, creativity, and focus.",
    products: [
      { name: "Gummies", serving: "Serves 5", flavor: "Citrus Blend" },
      { name: "Cookies", serving: "Handcrafted", flavor: "Honey Oat" },
    ],
    gradient: "from-green-50 to-green-100/30",
    image: upliftImg,
  },
  calm: {
    name: "Calm",
    icon: "🌿",
    color: "#d4a5a5",
    mood: "Evening ritual for deep rest",
    description:
      "Decompress, reset, and find your calm. Relaxation, stress relief, and peace.",
    products: [
      { name: "Gummies", serving: "Serves 5", flavor: "Berry Blend" },
      { name: "Brownies", serving: "Single Serve", flavor: "Dark Cacao" },
    ],
    gradient: "from-red-50 to-red-100/30",
    image: trioImg,
  },
  balance: {
    name: "Balance",
    icon: "🎶",
    color: "#9bb8d4",
    mood: "Anytime equilibrium",
    description:
      "Flexibility for every moment, every mood, every you. Social, adaptable, smooth.",
    products: [
      { name: "Gummies", serving: "Serves 5", flavor: "Mixed Berry" },
      { name: "Cookies", serving: "Handcrafted", flavor: "Vanilla Cream" },
    ],
    gradient: "from-blue-50 to-blue-100/30",
    image: comboImg,
  },
};

const devices = [
  { name: "Classic Battery — Matte Black", color: "Midnight", specs: "1000mAh, USB-C", image: batteryImg },
  { name: "Classic Battery — Pearl White", color: "Cream", specs: "1000mAh, USB-C", image: batteryImg },
  { name: "Premium Battery — Rose Gold", color: "Gold", specs: "1200mAh, Smart Display", image: vapeImg },
  { name: "Premium Battery — Gunmetal", color: "Steel", specs: "1200mAh, Smart Display", image: vapeImg },
];

const principles = [
  {
    title: "Centered Composition",
    description: "Product is hero. Clean white backgrounds. Minimal shadows. Breathing room matters.",
    icon: "⊙",
  },
  {
    title: "Matte Finishes",
    description: "Soft-touch packaging. Embossed branding (not printed). Premium restraint.",
    icon: "▪",
  },
  {
    title: "Color Consistency",
    description: "Three mood colors. Applied uniformly. Mood accent lines on every package.",
    icon: "◼",
  },
  {
    title: "Typography Hierarchy",
    description: "Product name (large, clear). Mood identity (small, color). Supporting info (subtle).",
    icon: "✎",
  },
  {
    title: "Photography Standards",
    description: "Soft 45° lighting. Square format (1:1). True-to-life color. Zero harsh shadows.",
    icon: "📷",
  },
  {
    title: "Grid System",
    description: "8mm internal grid. Modular sizing. All elements aligned. Perfect consistency.",
    icon: "⊞",
  },
];

const homeGrown = [
  {
    category: "Gummies",
    description: "Resealable pouches. Portion-controlled servings. Warm minimalism.",
    icon: "🫐",
    specs: ["Matte finish", "Mood color accent line", "Collectible design"],
  },
  {
    category: "Cookies",
    description: "Premium box packaging. Artisanal quality. Craft presentation.",
    icon: "🍪",
    specs: ["Kraft paper box", "Embossed logo", "Handcrafted feel"],
  },
  {
    category: "Brownies",
    description: "Single-serve sleeve. Minimal branding. Functional design.",
    icon: "🍫",
    specs: ["Cardboard sleeve", "Eco-friendly", "Discreet aesthetic"],
  },
];

const corePrinciples = [
  { emoji: "▬", label: "Simplicity" },
  { emoji: "≡", label: "Consistency" },
  { emoji: "♦", label: "Clarity" },
  { emoji: "▪", label: "Restraint" },
  { emoji: "◈", label: "Approachability" },
];

const MoodiesLogo = () => (
  <svg viewBox="0 0 140 80" className="w-32 h-auto">
    <text
      x="70"
      y="50"
      fontSize="44"
      fontWeight="300"
      textAnchor="middle"
      fill="#8b8b88"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontStyle="italic"
      letterSpacing="-0.5"
    >
      moodies
    </text>
    <path
      d="M 40 62 Q 70 72 100 62"
      stroke="#8b8b88"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

function MoodiesWellness() {
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionKey>("uplift");
  const currentCollection = collections[selectedCollection];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-gray-50 min-h-screen">
      <SiteNav />
      <CartDrawer />
      {/* HERO */}
      <section className="relative py-28 px-6 sm:px-8 text-center overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
          <div className="mb-8 flex justify-center">
            <MoodiesLogo />
          </div>
          <h1 className="text-6xl sm:text-7xl font-light text-gray-800 italic mb-6 tracking-tight leading-tight">
            Taste Your Mood
          </h1>
          <p className="text-xl text-gray-700 font-light mb-4 max-w-2xl mx-auto leading-relaxed">
            Premium wellness edibles and devices. Emotional clarity through
            intentional design.
          </p>
          <p className="text-sm text-gray-500 tracking-wide max-w-xl mx-auto mb-8">
            Unified collections. Collectible packaging. Everyday luxury.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              Shop the collection
            </Link>
            <a
              href="#mood-system"
              className="px-8 py-3 border border-gray-300 text-gray-900 rounded-full font-medium text-sm hover:border-gray-500 transition-colors"
            >
              Explore moods
            </a>
          </div>
        </div>
      </section>

      {/* MOOD SYSTEM SELECTOR */}
      <section id="mood-system" className="py-20 px-6 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Three Collections
            </h2>
            <p className="text-gray-600 text-sm">
              One unified visual language. Three emotional directions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {(Object.entries(collections) as [CollectionKey, typeof collections[CollectionKey]][]).map(
              ([key, mood]) => {
                const isActive = selectedCollection === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCollection(key)}
                    className={`px-8 py-3 rounded-lg font-light text-sm uppercase tracking-wider transition-all duration-500 border-2 ${
                      isActive
                        ? "text-gray-900"
                        : "bg-gray-100 border-gray-100 text-gray-600 hover:border-gray-300"
                    }`}
                    style={{
                      borderColor: isActive ? mood.color : undefined,
                      backgroundColor: isActive ? `${mood.color}15` : undefined,
                    }}
                  >
                    <span className="mr-2">{mood.icon}</span>
                    {mood.name}
                  </button>
                );
              }
            )}
          </div>

          <div
            className={`bg-gradient-to-br ${currentCollection.gradient} rounded-2xl border border-gray-200 p-8 sm:p-12 transition-all duration-700`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-16 rounded-full"
                    style={{ backgroundColor: currentCollection.color }}
                  />
                  <div>
                    <h3 className="text-3xl font-light text-gray-900">
                      {currentCollection.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {currentCollection.mood}
                    </p>
                  </div>
                </div>
                <p className="text-base text-gray-700 leading-relaxed mb-8">
                  {currentCollection.description}
                </p>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                    Products
                  </p>
                  {currentCollection.products.map((product) => (
                    <div
                      key={product.name}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {product.flavor}
                          </p>
                        </div>
                        <p className="text-xs font-medium text-gray-500">
                          {product.serving}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-64 h-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  <img
                    src={currentCollection.image}
                    alt={`${currentCollection.name} collection packaging`}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: currentCollection.color }}
                  />
                  <div className="relative z-10 text-center p-8 h-full flex flex-col justify-center">
                    <div className="text-5xl opacity-60 mb-4">
                      {currentCollection.icon}
                    </div>
                    <p
                      className="text-xl font-light mb-2"
                      style={{ color: currentCollection.color }}
                    >
                      {currentCollection.name}
                    </p>
                    <p className="text-xs text-gray-600 mb-6">
                      {currentCollection.mood}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Premium Wellness Collection</p>
                      <p>Unified Design System</p>
                      <p>Collectible Packaging</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL CONSISTENCY */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Unified Visual Language
            </h2>
            <p className="text-gray-600 text-sm">
              Same spacing grid. Same photography direction. Same typographic
              hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4 opacity-60">{principle.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME GROWN */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Home Grown Collection
            </h2>
            <p className="text-gray-600 text-sm">
              Artisanal confectionery & baked goods. Premium but approachable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeGrown.map((product) => (
              <div
                key={product.category}
                className="bg-gray-50 rounded-lg p-8 border border-gray-200"
              >
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  {product.category}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2">
                  {product.specs.map((spec) => (
                    <p
                      key={spec}
                      className="text-xs text-gray-500 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      {spec}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVICES */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Devices & Accessories
            </h2>
            <p className="text-gray-600 text-sm">
              Industrial minimalism. Tech meets warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devices.map((device) => (
              <div
                key={device.name}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 overflow-hidden">
                  <img
                    src={device.image}
                    alt={device.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-light text-gray-900 text-sm mb-2">
                    {device.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-4">
                    Color: {device.color}
                  </p>
                  <p className="text-xs text-gray-500">{device.specs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KIOSK / RETAIL */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img
              src={kioskImg}
              alt="Moodies retail kiosk"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-light text-gray-800 mb-4">
              Retail Presence
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Moodies kiosks bring the unified visual system to life in
              premium retail spaces across South Africa — from V&amp;A
              Waterfront to Canal Walk.
            </p>
            <p className="text-gray-500 text-xs">
              Cape Town · Johannesburg · Nationwide courier · Discreet
              packaging
            </p>
          </div>
        </div>
      </section>

      {/* BRAND POSITIONING */}
      <section className="py-24 px-6 sm:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-light text-gray-800 italic mb-8 leading-relaxed">
            "Premium wellness lifestyle. Globally competitive.
            Distinctly considered."
          </p>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Moodies is built on four non-negotiable principles:{" "}
              <strong>simplicity</strong> over complexity,{" "}
              <strong>consistency</strong> over variation,{" "}
              <strong>emotional clarity</strong> over confusion, and{" "}
              <strong>premium restraint</strong> over noise.
            </p>
            <p>
              Every design touchpoint — from packaging to website — flows from
              unified visual rules. This consistency is our brand's
              superpower.
            </p>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="py-20 px-6 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800">
              Core Design Principles
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {corePrinciples.map((principle) => (
              <div
                key={principle.label}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center"
              >
                <div className="text-3xl mb-3 opacity-60">
                  {principle.emoji}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {principle.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-800 mb-6">
            Experience the Collection
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Discover how intentional design and emotional clarity come together
            in every Moodies product.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@moodies.site?subject=Explore%20Moodies"
              className="px-8 py-3 bg-gray-900 text-white rounded-lg font-light hover:bg-gray-800 transition-colors"
            >
              Explore Products
            </a>
            <a
              href="mailto:hello@moodies.site?subject=Tell%20me%20more%20about%20Moodies"
              className="px-8 py-3 border border-gray-300 text-gray-900 rounded-lg font-light hover:border-gray-400 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 sm:px-8 bg-gray-900 text-gray-300 text-center text-sm border-t border-gray-800">
        <p className="mb-4">Moodies | Premium Wellness Edibles & Devices</p>
        <p className="text-gray-500 text-xs mb-6">
          Unified visual identity. Collectible packaging. Emotional clarity
          through intentional design.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://instagram.com/moodies"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white"
          >
            <Instagram size={18} />
          </a>
          <a
            href="mailto:hello@moodies.site"
            aria-label="Email"
            className="text-gray-400 hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>
        <p className="text-gray-600 text-xs">
          <a href="mailto:hello@moodies.site" className="hover:text-gray-300">
            hello@moodies.site
          </a>{" "}
          · moodies.site
        </p>
      </footer>
    </div>
  );
}
