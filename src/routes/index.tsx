import { createFileRoute } from "@tanstack/react-router";
import upliftImg from "@/assets/moodies-uplift.jpg";
import vapeImg from "@/assets/moodies-vape.jpg";
import batteryImg from "@/assets/moodies-battery.jpg";
import kioskImg from "@/assets/moodies-kiosk.jpg";
import comboImg from "@/assets/moodies-combo.jpg";
import trioImg from "@/assets/moodies-trio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodies | Premium Cannabis Retail" },
      {
        name: "description",
        content:
          "Taste your mood. Premium cannabis discretely delivered across Cape Town.",
      },
      { property: "og:title", content: "Moodies | Premium Cannabis Retail" },
      {
        property: "og:description",
        content: "Premium cannabis discretely delivered to your mood.",
      },
    ],
  }),
  component: MoodiesWebsite,
});

const MoodiesLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <text
          x="24"
          y="32"
          fontSize="28"
          fontWeight="300"
          textAnchor="middle"
          fill="#8b8b88"
          opacity="0.75"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          m
        </text>
      </svg>
      <div className="absolute bottom-0 right-0 w-4 h-4">
        <svg viewBox="0 0 16 16" fill="none" stroke="#a8d5a8" strokeWidth="1.2">
          <path d="M 2 8 Q 8 12 14 8" strokeLinecap="round" />
          <polyline points="12,6 14,8 12,10" fill="none" />
        </svg>
      </div>
    </div>
  </div>
);

const AnimatedProductImage = ({
  src,
  alt,
  delay = 0,
}: {
  src: string;
  alt: string;
  delay?: number;
}) => (
  <div
    className="relative overflow-hidden rounded-lg bg-gray-100 h-64 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1024}
      height={1024}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
  </div>
);

const moods = [
  {
    name: "Uplift",
    description: "Energize your afternoon. Clarity for focus and creativity.",
    products: "Vape · Edibles",
    indicator: "bg-green-300",
  },
  {
    name: "Calm",
    description: "Unwind and decompress. Rest assured in every moment.",
    products: "Vape · Edibles · Beverages",
    indicator: "bg-red-300",
  },
  {
    name: "Balance",
    description: "Find equilibrium. The middle path for any hour.",
    products: "Vape · Cartridges",
    indicator: "bg-blue-300",
  },
];

const locations = [
  "V&A Waterfront",
  "Canal Walk",
  "Cavendish Square",
  "Somerset Mall",
  "Paarl Mall",
];

const galleryImages = [
  { src: upliftImg, alt: "Moodies Uplift gummies packaging", delay: 100 },
  { src: vapeImg, alt: "Moodies vape cartridge collection", delay: 250 },
  { src: batteryImg, alt: "510-thread battery detail", delay: 350 },
  { src: kioskImg, alt: "Moodies retail kiosk", delay: 450 },
  { src: comboImg, alt: "Battery and cartridge combo box", delay: 550 },
  { src: trioImg, alt: "Uplift, Calm, Balance trio", delay: 650 },
];

function MoodiesWebsite() {
  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative py-32 px-6 sm:px-8 text-center overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto animate-fade-in">
          <div className="mb-6 flex justify-center">
            <MoodiesLogo />
          </div>
          <h1 className="text-6xl sm:text-7xl font-light text-gray-600 italic mb-4 tracking-tight">
            moodies
          </h1>
          <p className="text-xl text-gray-700 font-light mb-3">Taste your mood</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Premium cannabis discretely delivered to your mood
          </p>
        </div>
      </section>

      {/* MOOD SYSTEM */}
      <section className="py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {moods.map((mood) => (
              <div
                key={mood.name}
                className="mood-card-hover group relative bg-white border border-gray-200 rounded-xl p-10 cursor-pointer transition-all duration-500"
              >
                <div
                  className={`w-20 h-1 mx-auto mb-8 rounded-full ${mood.indicator} transition-all duration-500 group-hover:w-32`}
                />
                <h3 className="text-2xl font-light text-gray-800 mb-3">{mood.name}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {mood.description}
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  {mood.products}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SHOWCASE */}
      <section className="py-20 px-6 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">The Collection</h2>
            <p className="text-gray-600 text-sm">Curated across three essential formats</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Vape Cartridges", desc: "Premium 510-thread. Precise dosing." },
              { title: "Edibles", desc: "Gummies & infusions. Crafted flavors." },
              { title: "Beverages", desc: "Drinkable experiences. Smooth finish." },
            ].map((cat) => (
              <div
                key={cat.title}
                className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
              >
                <h4 className="text-lg font-light text-gray-800 mb-2">{cat.title}</h4>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6 sm:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">Visual Identity</h2>
            <p className="text-gray-600 text-sm">Institutional design. Premium execution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={img.alt}
                className="animate-slide-right"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <AnimatedProductImage src={img.src} alt={img.alt} delay={img.delay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KIOSK LOCATIONS */}
      <section className="py-20 px-6 sm:px-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-3">Find Moodies</h2>
            <p className="text-gray-600 text-sm">Curated retail spaces across Cape Town</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-light text-gray-800 mb-4">
                Premium Kiosk Locations
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Thoughtfully placed in South Africa's most discerning retail
                environments. Each kiosk reflects our institutional design
                philosophy—elevated, minimal, intentional.
              </p>
              <ul className="space-y-3">
                {locations.map((loc) => (
                  <li
                    key={loc}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 h-80">
              <img
                src={kioskImg}
                alt="Moodies premium kiosk"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 px-6 sm:px-8 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-light text-gray-700 italic mb-6 leading-relaxed">
            "If Apple entered cannabis retail, this is what it would look like."
          </p>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Moodies believes in quiet confidence. No shouting. No compromise.
            Every surface, every detail, every interaction is intentional.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Premium. Discreet. Institutional trust. This is luxury cannabis for
            people who already know what luxury looks like.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <button className="px-10 py-3 border border-gray-700 text-gray-800 text-xs font-light uppercase tracking-wider hover:bg-gray-50 transition-colors duration-300 rounded-md">
            Discover Your Mood
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 sm:px-8 bg-white border-t border-gray-100 text-center text-xs text-gray-500">
        <p className="mb-2">
          Moodies | Premium Cannabis Retail | All products comply with South
          African regulation
        </p>
        <p className="text-gray-400">For inquiries: hello@moodies.co.za</p>
      </footer>
    </div>
  );
}
