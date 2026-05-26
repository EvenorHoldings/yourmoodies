// Moodies shop catalog — 18 products, ZAR pricing.
export type Mood = "uplift" | "calm" | "balance" | "neutral";
export type Category = "cartridge" | "battery" | "edible";

export type ShopProduct = {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  mood: Mood;
  price: number; // ZAR
  sku: string;
  description: string;
  servings: string;
  moodColor: string;
  specs: Record<string, string | number>;
};

export const MOOD_META: Record<Exclude<Mood, "neutral">, { label: string; color: string; tagline: string }> = {
  uplift:  { label: "Uplift",  color: "#F5C500", tagline: "Morning clarity. Creative energy." },
  calm:    { label: "Calm",    color: "#4FA09F", tagline: "Evening unwind. Quiet focus." },
  balance: { label: "Balance", color: "#8B5F9F", tagline: "Anytime equilibrium." },
};

export const SHIPPING_FLAT = 100;

export const SHOP_PRODUCTS: ShopProduct[] = [
  // ----- Live Resin Cartridges (R1400) -----
  { id: "cart_live_uplift_citrus", name: "UPLIFT CITRUS BLEND", category: "cartridge", subcategory: "Live Resin", mood: "uplift", price: 1400, sku: "UPLIFT-LR-CITRUS",
    description: "Premium live resin. Bright citrus for morning clarity and creative energy.",
    servings: "1ml cartridge", moodColor: "#F5C500",
    specs: { Format: "Live Resin", Volume: "1 ml", Type: "Cartridge" } },
  { id: "cart_live_calm_mint", name: "CALM MINT FROST", category: "cartridge", subcategory: "Live Resin", mood: "calm", price: 1400, sku: "CALM-LR-MINT",
    description: "Premium live resin. Cool mint with floral notes for evening relaxation.",
    servings: "1ml cartridge", moodColor: "#4FA09F",
    specs: { Format: "Live Resin", Volume: "1 ml", Type: "Cartridge" } },
  { id: "cart_live_balance_berry", name: "BALANCE BERRY MEDLEY", category: "cartridge", subcategory: "Live Resin", mood: "balance", price: 1400, sku: "BALANCE-LR-BERRY",
    description: "Premium live resin. Mixed berry profile for centered wellness.",
    servings: "1ml cartridge", moodColor: "#8B5F9F",
    specs: { Format: "Live Resin", Volume: "1 ml", Type: "Cartridge" } },

  // ----- Mate Cartridges (R1000) -----
  { id: "cart_mate_uplift_gush", name: "UPLIFT GUSH", category: "cartridge", subcategory: "Mate · c10g", mood: "uplift", price: 1000, sku: "UPLIFT-MATE-GUSH",
    description: "Mate line, c10g format. Sweet mango notes with energizing clarity.",
    servings: "1ml cartridge", moodColor: "#F5C500",
    specs: { Format: "Mate", Volume: "1 ml", Hardware: "c10g" } },
  { id: "cart_mate_calm_pineapple", name: "CALM PINEAPPLE EXPRESS", category: "cartridge", subcategory: "Mate · c10g", mood: "calm", price: 1000, sku: "CALM-MATE-PINE",
    description: "Mate line, c10g. Tropical pineapple for relaxed focus.",
    servings: "1ml cartridge", moodColor: "#4FA09F",
    specs: { Format: "Mate", Volume: "1 ml", Hardware: "c10g" } },
  { id: "cart_mate_balance_zkittles", name: "BALANCE ZKITTLES", category: "cartridge", subcategory: "Mate · c10g", mood: "balance", price: 1000, sku: "BALANCE-MATE-ZKIT",
    description: "Mate line, c10g. Rainbow candy notes for balanced wellness.",
    servings: "1ml cartridge", moodColor: "#8B5F9F",
    specs: { Format: "Mate", Volume: "1 ml", Hardware: "c10g" } },

  // ----- Standard Cartridges (R700) -----
  { id: "cart_std_uplift_mango", name: "UPLIFT MANGO", category: "cartridge", subcategory: "Standard · c10", mood: "uplift", price: 700, sku: "UPLIFT-STD-MANGO",
    description: "Standard c10 cartridge. Smooth mango flavor for everyday uplift.",
    servings: "1ml cartridge", moodColor: "#F5C500",
    specs: { Format: "Standard", Volume: "1 ml", Hardware: "c10" } },
  { id: "cart_std_calm_lavender", name: "CALM LAVENDER", category: "cartridge", subcategory: "Standard · c10", mood: "calm", price: 700, sku: "CALM-STD-LAV",
    description: "Standard c10 cartridge. Calming lavender notes for relaxation.",
    servings: "1ml cartridge", moodColor: "#4FA09F",
    specs: { Format: "Standard", Volume: "1 ml", Hardware: "c10" } },
  { id: "cart_std_balance_tropical", name: "BALANCE TROPICAL", category: "cartridge", subcategory: "Standard · c10", mood: "balance", price: 700, sku: "BALANCE-STD-TROP",
    description: "Standard c10 cartridge. Tropical blend for balanced wellness.",
    servings: "1ml cartridge", moodColor: "#8B5F9F",
    specs: { Format: "Standard", Volume: "1 ml", Hardware: "c10" } },

  // ----- Batteries (R400) -----
  { id: "battery_p107_black", name: "510 PUSH BATTERY P107 — MIDNIGHT BLACK", category: "battery", subcategory: "P107 · Push Button", mood: "neutral", price: 400, sku: "P107-BLACK",
    description: "Classic 510 thread push battery. Matte black finish, USB-C charging.",
    servings: "1000mAh · USB-C", moodColor: "#1A1A1A",
    specs: { Model: "P107", Capacity: "1000 mAh", Charging: "USB-C", Finish: "Matte Black" } },
  { id: "battery_p107_white", name: "510 PUSH BATTERY P107 — PEARL WHITE", category: "battery", subcategory: "P107 · Push Button", mood: "neutral", price: 400, sku: "P107-WHITE",
    description: "Classic 510 thread push battery. Pearl white finish, USB-C charging.",
    servings: "1000mAh · USB-C", moodColor: "#E8E4DD",
    specs: { Model: "P107", Capacity: "1000 mAh", Charging: "USB-C", Finish: "Pearl White" } },
  { id: "battery_p112_gold", name: "510 PUSH BATTERY P112 — ROSE GOLD", category: "battery", subcategory: "P112 · Smart Display", mood: "neutral", price: 400, sku: "P112-GOLD",
    description: "Smart 510 battery with LED display. Rose gold finish, 1200mAh.",
    servings: "1200mAh · LED Display", moodColor: "#C5A572",
    specs: { Model: "P112", Capacity: "1200 mAh", Display: "LED Smart", Finish: "Rose Gold" } },
  { id: "battery_p112_steel", name: "510 PUSH BATTERY P112 — GUNMETAL STEEL", category: "battery", subcategory: "P112 · Smart Display", mood: "neutral", price: 400, sku: "P112-STEEL",
    description: "Smart 510 battery with LED display. Gunmetal steel finish, 1200mAh.",
    servings: "1200mAh · LED Display", moodColor: "#666666",
    specs: { Model: "P112", Capacity: "1200 mAh", Display: "LED Smart", Finish: "Gunmetal" } },

  // ----- Gummies (R350) -----
  { id: "edible_gum_uplift", name: "UPLIFT CITRUS GUMMIES", category: "edible", subcategory: "Gummies", mood: "uplift", price: 350, sku: "EDIBLE-GUM-CITRUS",
    description: "Bright citrus for morning clarity. Resealable kraft pouch.",
    servings: "5 servings · 10mg each", moodColor: "#F5C500",
    specs: { Servings: 5, "mg per serving": 10, Total: "50 mg" } },
  { id: "edible_gum_calm", name: "CALM BLUEBERRY GUMMIES", category: "edible", subcategory: "Gummies", mood: "calm", price: 350, sku: "EDIBLE-GUM-BLUE",
    description: "Relaxing blueberry notes for the evening ritual.",
    servings: "5 servings · 10mg each", moodColor: "#4FA09F",
    specs: { Servings: 5, "mg per serving": 10, Total: "50 mg" } },
  { id: "edible_gum_balance", name: "BALANCE TROPICAL GUMMIES", category: "edible", subcategory: "Gummies", mood: "balance", price: 350, sku: "EDIBLE-GUM-TROP",
    description: "Balanced tropical fruit blend. Resealable kraft pouch.",
    servings: "5 servings · 10mg each", moodColor: "#8B5F9F",
    specs: { Servings: 5, "mg per serving": 10, Total: "50 mg" } },

  // ----- Cookies (R280) -----
  { id: "edible_cookie_uplift", name: "HONEY OAT COOKIE", category: "edible", subcategory: "Cookies", mood: "uplift", price: 280, sku: "EDIBLE-COOK-HONEY",
    description: "Handcrafted honey-oat cookie. Single-serve.",
    servings: "1 serving · 15mg", moodColor: "#F5C500",
    specs: { Servings: 1, mg: 15 } },
  { id: "edible_cookie_calm", name: "LAVENDER COOKIE", category: "edible", subcategory: "Cookies", mood: "calm", price: 280, sku: "EDIBLE-COOK-LAV",
    description: "Soft lavender shortbread. Calming, single-serve.",
    servings: "1 serving · 15mg", moodColor: "#4FA09F",
    specs: { Servings: 1, mg: 15 } },
  { id: "edible_cookie_balance", name: "CHOCOLATE ESPRESSO COOKIE", category: "edible", subcategory: "Cookies", mood: "balance", price: 280, sku: "EDIBLE-COOK-CHOC",
    description: "Dark chocolate and espresso. Balanced, single-serve.",
    servings: "1 serving · 15mg", moodColor: "#8B5F9F",
    specs: { Servings: 1, mg: 15 } },
];

export const formatZAR = (n: number) => `R${n.toLocaleString("en-ZA")}`;
