import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Gift } from "lucide-react";
import {
  CANNBROZA_PRODUCTS,
  RITUAL_TEMPLATES,
  MOOD_SYSTEM,
  type CartProduct,
  type BatteryProduct,
  type EdibleProduct,
} from "@/lib/products";
import upliftImg from "@/assets/moodies-uplift.jpg";
import vapeImg from "@/assets/moodies-vape.jpg";
import batteryImg from "@/assets/moodies-battery.jpg";
import kioskImg from "@/assets/moodies-kiosk.jpg";
import comboImg from "@/assets/moodies-combo.jpg";
import trioImg from "@/assets/moodies-trio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodies | Premium Cannabis Rituals" },
      {
        name: "description",
        content:
          "Taste your mood. Premium cannabis rituals curated for how you want to feel. Delivered discreetly across South Africa.",
      },
      { property: "og:title", content: "Moodies | moodies.site" },
      {
        property: "og:description",
        content: "Premium cannabis rituals. Curated for your mood.",
      },
    ],
  }),
  component: MoodiesEnhanced,
});

type AnyProduct = CartProduct | BatteryProduct | EdibleProduct;

const MoodiesLogo = () => (
  <div className="flex items-center justify-center gap-3 mb-8">
    <svg viewBox="0 0 200 80" className="w-40 h-auto">
      <text
        x="100"
        y="50"
        fontSize="44"
        fontWeight="300"
        fontStyle="italic"
        textAnchor="middle"
        fill="#5BA3D0"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-1"
      >
        moodies
      </text>
      <path
        d="M 55 62 Q 100 76 145 62"
        stroke="#a8d5a8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

function MoodiesEnhanced() {
  const [selectedCart, setSelectedCart] = useState<string | null>(null);
  const [selectedBattery, setSelectedBattery] = useState<string | null>(null);
  const [selectedEdible, setSelectedEdible] = useState<string | null>(null);
  const [buildingRitual, setBuildingRitual] = useState(false);
  const [ritualComplete, setRitualComplete] = useState(false);

  const calculatePrice = () => {
    let total = 0;
    if (selectedCart) {
      const c = CANNBROZA_PRODUCTS.carts.find((c) => c.id === selectedCart);
      if (c) total += parseInt(c.price.replace("R", ""));
    }
    if (selectedBattery) {
      const b = CANNBROZA_PRODUCTS.batteries.find((b) => b.id === selectedBattery);
      if (b) total += parseInt(b.price.replace("R", ""));
    }
    if (selectedEdible) {
      const e = CANNBROZA_PRODUCTS.edibles.find((e) => e.id === selectedEdible);
      if (e) total += parseInt(e.price.replace("R", ""));
    }
    return total;
  };

  const closeBuilder = () => {
    setBuildingRitual(false);
    setRitualComplete(false);
    setSelectedCart(null);
    setSelectedBattery(null);
    setSelectedEdible(null);
  };

  const ProductCard = ({
    product,
    isSelected,
    onSelect,
  }: {
    product: AnyProduct;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }) => (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      className={`text-left p-4 rounded-lg border-2 transition-all w-full ${
        isSelected
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-gray-900">{product.name}</p>
          {"mood" in product && product.mood && (
            <p className="text-xs text-gray-500 mt-1">{product.mood}</p>
          )}
          {"color" in product && product.color && (
            <p className="text-xs text-gray-500 mt-1">{product.color}</p>
          )}
        </div>
        {isSelected && <div className="w-5 h-5 rounded-full bg-blue-400" />}
      </div>
      <div className="flex justify-between items-end">
        <div>
          {"type" in product && product.type && (
            <p className="text-xs text-gray-600">{product.type}</p>
          )}
          {"capacity" in product && product.capacity && (
            <p className="text-xs text-gray-600">{product.capacity}</p>
          )}
          {"thc" in product && product.thc && (
            <p className="text-xs text-gray-600">{product.thc}</p>
          )}
        </div>
        <p className="font-medium text-gray-900">{product.price}</p>
      </div>
    </button>
  );

  const MoodBox3D = () => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white relative overflow-hidden text-left">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
        Your Ritual
      </p>
      <h3 className="text-3xl font-light mb-6">3 Moods. 1 Ritual.</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-gray-400 mb-2">Cartridge</p>
          <p className="text-sm font-light truncate">
            {CANNBROZA_PRODUCTS.carts.find((c) => c.id === selectedCart)?.name ?? "—"}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-gray-400 mb-2">Battery</p>
          <p className="text-sm font-light truncate">
            {CANNBROZA_PRODUCTS.batteries.find((b) => b.id === selectedBattery)?.color ?? "—"}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-xs text-gray-400 mb-2">Edible</p>
          <p className="text-sm font-light truncate">
            {CANNBROZA_PRODUCTS.edibles
              .find((e) => e.id === selectedEdible)
              ?.name.split("-")[0] ?? "—"}
          </p>
        </div>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-2xl font-light">R{calculatePrice()}</p>
      </div>
    </div>
  );

  const RitualBuilder = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-light">Build Your 3 Moods Ritual</h2>
          <button
            type="button"
            onClick={closeBuilder}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!ritualComplete ? (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    1
                  </span>
                  Choose Your Cartridge
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CANNBROZA_PRODUCTS.carts.map((cart) => (
                    <ProductCard
                      key={cart.id}
                      product={cart}
                      isSelected={selectedCart === cart.id}
                      onSelect={setSelectedCart}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    2
                  </span>
                  Choose Your Battery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CANNBROZA_PRODUCTS.batteries.map((battery) => (
                    <ProductCard
                      key={battery.id}
                      product={battery}
                      isSelected={selectedBattery === battery.id}
                      onSelect={setSelectedBattery}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                  Choose Your Edible
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CANNBROZA_PRODUCTS.edibles.map((edible) => (
                    <ProductCard
                      key={edible.id}
                      product={edible}
                      isSelected={selectedEdible === edible.id}
                      onSelect={setSelectedEdible}
                    />
                  ))}
                </div>
              </div>

              {selectedCart && selectedBattery && selectedEdible && (
                <div className="border-t-2 border-gray-200 pt-6">
                  <button
                    type="button"
                    onClick={() => setRitualComplete(true)}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mb-2"
                  >
                    Complete My Ritual (R{calculatePrice()})
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Free shipping on rituals over R1000 · Discreet packaging
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-light mb-2">Your Ritual is Ready</h3>
              <p className="text-gray-600 mb-6">
                Proceed to checkout or save for later
              </p>
              <MoodBox3D />
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeBuilder}
                  className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200"
                >
                  Save Ritual
                </button>
                <a
                  href="mailto:hello@moodies.site?subject=Checkout%20my%20Moodies%20Ritual"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 inline-flex items-center justify-center"
                >
                  Checkout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-gray-50 min-h-screen">
      {buildingRitual && <RitualBuilder />}

      {/* HERO */}
      <section className="relative py-24 px-6 sm:px-8 text-center overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto animate-fade-in">
          <MoodiesLogo />
          <h1 className="sr-only">Moodies — Premium Cannabis Rituals</h1>
          <p className="text-xl text-gray-700 font-light mb-3">Taste your mood</p>
          <p className="text-sm text-gray-500 tracking-wide mb-8">
            Premium cannabis rituals. Curated for your mood. Delivered
            discreetly.
          </p>
          <button
            type="button"
            onClick={() => setBuildingRitual(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Gift size={18} />
            Build Your Ritual
          </button>
        </div>
      </section>

      {/* 5 MOOD SYSTEM */}
      <section className="py-20 px-6 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Find Your Mood
            </h2>
            <p className="text-gray-600 text-sm">
              Choose how you want to feel. We'll show you what fits.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(MOOD_SYSTEM).map(([moodName, moodData]) => (
              <div
                key={moodName}
                className="group bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
              >
                <div
                  className="w-10 h-1 rounded-full mb-4"
                  style={{ backgroundColor: moodData.color }}
                />
                <div className="text-3xl mb-3">{moodData.icon}</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {moodName}
                </h3>
                <p className="text-xs text-gray-600 mb-3 min-h-8">
                  {moodData.ritual}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {moodData.benefits.slice(0, 2).map((benefit) => (
                    <span
                      key={benefit}
                      className="text-xs bg-white px-2 py-1 rounded border border-gray-200"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{moodData.timing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RITUAL TEMPLATES */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Pre-Curated Rituals
            </h2>
            <p className="text-gray-600 text-sm">
              Start with our ritual experts' recommendations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RITUAL_TEMPLATES.map((ritual) => (
              <div
                key={ritual.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {ritual.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {ritual.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-2">BEST FOR</p>
                  <p className="text-sm text-gray-700">{ritual.bestFor}</p>
                </div>
                <div className="mb-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">TIMING</p>
                  <p className="text-sm text-gray-700">{ritual.timing}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-xl font-light text-gray-900">
                    {ritual.totalPrice}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBuildingRitual(true)}
                    className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                    aria-label={`Build ${ritual.name}`}
                  >
                    <ShoppingCart size={16} />
                    <span className="text-sm">Build</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm">
              Curated from premium suppliers. All 510-thread compatible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-light text-gray-800 mb-4">
                Cartridges
              </h3>
              <div className="space-y-3">
                {CANNBROZA_PRODUCTS.carts.slice(0, 4).map((cart) => (
                  <div
                    key={cart.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {cart.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {cart.thc} THC · {cart.type}
                      </p>
                    </div>
                    <p className="font-medium">{cart.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-light text-gray-800 mb-4">
                Batteries
              </h3>
              <div className="space-y-3">
                {CANNBROZA_PRODUCTS.batteries.map((battery) => (
                  <div
                    key={battery.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {battery.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {battery.capacity} · USB-C
                      </p>
                    </div>
                    <p className="font-medium">{battery.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">
              Visual Identity
            </h2>
            <p className="text-gray-600 text-sm">
              Institutional design. Premium execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: upliftImg, alt: "Moodies Uplift gummies packaging" },
              { src: vapeImg, alt: "Moodies vape cartridge collection" },
              { src: batteryImg, alt: "510-thread battery detail" },
              { src: kioskImg, alt: "Moodies retail kiosk" },
              { src: comboImg, alt: "Battery and cartridge combo box" },
              { src: trioImg, alt: "Uplift, Calm, Balance trio" },
            ].map((img, idx) => (
              <div
                key={img.alt}
                className="relative overflow-hidden rounded-lg bg-gray-100 h-64 animate-slide-right"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-light text-gray-700 italic mb-6">
            "If luxury brands understood cannabis."
          </p>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Moodies brings the ritual and positioning of premium beauty and
            spirits to cannabis. No apologies. No compromise. Just premium
            products for people who already know what luxury feels like.
          </p>
          <p className="text-sm text-gray-600">
            Your mood is your signature. Taste it. Own it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <button
            type="button"
            onClick={() => setBuildingRitual(true)}
            className="px-10 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Start Building Your Ritual
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Cape Town delivery · Nationwide courier · Discreet packaging
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 sm:px-8 bg-gray-800 text-gray-400 text-center text-xs">
        <p className="mb-2">
          Moodies | Premium Cannabis Lifestyle | moodies.site
        </p>
        <p className="text-gray-500">
          Products sourced from licensed suppliers. All comply with South
          African regulation.
        </p>
        <p className="text-gray-500 mt-2">
          For inquiries:{" "}
          <a
            href="mailto:hello@moodies.site"
            className="underline hover:text-gray-300"
          >
            hello@moodies.site
          </a>
        </p>
      </footer>
    </div>
  );
}
