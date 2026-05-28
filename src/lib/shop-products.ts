// Moodies shop catalog — ZAR pricing.
export type Mood = "uplift" | "calm" | "balance" | "neutral";
export type Category = "cartridge" | "battery" | "edible";

export type ShopProduct = {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  mood: Mood;
  price: number;
  sku: string;
  description: string;
  servings: string;
  moodColor: string;
};

export const SHIPPING_FLAT = 100;

export const SHOP_PRODUCTS: ShopProduct[] = [
  // Uplift
  { id: "cart_live_uplift_citrus", name: "Uplift Citrus Blend", category: "cartridge", subcategory: "Live Resin", mood: "uplift", price: 1400, sku: "UPLIFT-LR-CITRUS",
    description: "Live resin. Bright citrus for morning clarity.", servings: "1 ml cartridge", moodColor: "#F5C500" },
  { id: "cart_mate_uplift_gush", name: "Uplift Gush", category: "cartridge", subcategory: "Mate · c10g", mood: "uplift", price: 1000, sku: "UPLIFT-MATE-GUSH",
    description: "Mate c10g. Sweet mango, energising clarity.", servings: "1 ml cartridge", moodColor: "#F5C500" },
  { id: "edible_gum_uplift", name: "Uplift Citrus Gummies", category: "edible", subcategory: "Gummies", mood: "uplift", price: 350, sku: "EDIBLE-GUM-CITRUS",
    description: "Citrus gummies. Resealable kraft pouch.", servings: "5 × 10 mg", moodColor: "#F5C500" },

  // Calm
  { id: "cart_live_calm_mint", name: "Calm Mint Frost", category: "cartridge", subcategory: "Live Resin", mood: "calm", price: 1400, sku: "CALM-LR-MINT",
    description: "Live resin. Cool mint, evening unwind.", servings: "1 ml cartridge", moodColor: "#4FA09F" },
  { id: "cart_mate_calm_pineapple", name: "Calm Pineapple Express", category: "cartridge", subcategory: "Mate · c10g", mood: "calm", price: 1000, sku: "CALM-MATE-PINE",
    description: "Mate c10g. Tropical pineapple, relaxed focus.", servings: "1 ml cartridge", moodColor: "#4FA09F" },
  { id: "edible_gum_calm", name: "Calm Blueberry Gummies", category: "edible", subcategory: "Gummies", mood: "calm", price: 350, sku: "EDIBLE-GUM-BLUE",
    description: "Blueberry gummies for the evening ritual.", servings: "5 × 10 mg", moodColor: "#4FA09F" },

  // Balance
  { id: "cart_live_balance_berry", name: "Balance Berry Medley", category: "cartridge", subcategory: "Live Resin", mood: "balance", price: 1400, sku: "BALANCE-LR-BERRY",
    description: "Live resin. Mixed berry, centred wellness.", servings: "1 ml cartridge", moodColor: "#8B5F9F" },
  { id: "cart_mate_balance_zkittles", name: "Balance Zkittles", category: "cartridge", subcategory: "Mate · c10g", mood: "balance", price: 1000, sku: "BALANCE-MATE-ZKIT",
    description: "Mate c10g. Rainbow candy notes, balanced.", servings: "1 ml cartridge", moodColor: "#8B5F9F" },
  { id: "edible_gum_balance", name: "Balance Tropical Gummies", category: "edible", subcategory: "Gummies", mood: "balance", price: 350, sku: "EDIBLE-GUM-TROP",
    description: "Tropical fruit blend. Resealable pouch.", servings: "5 × 10 mg", moodColor: "#8B5F9F" },

  // Devices
  { id: "battery_p107_black", name: "510 Push Battery — Midnight", category: "battery", subcategory: "P107", mood: "neutral", price: 400, sku: "P107-BLACK",
    description: "Classic 510 push battery. USB-C.", servings: "1000 mAh", moodColor: "#1A1A1A" },
  { id: "battery_p112_gold", name: "510 Smart Battery — Rose Gold", category: "battery", subcategory: "P112", mood: "neutral", price: 400, sku: "P112-GOLD",
    description: "LED display, 1200 mAh, USB-C.", servings: "1200 mAh", moodColor: "#C5A572" },
];

export const formatZAR = (n: number) => `R${n.toLocaleString("en-ZA")}`;
