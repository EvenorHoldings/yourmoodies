// Moodies Curated Product Selection from Cannbroza

export type CartProduct = {
  id: string;
  name: string;
  mood: string;
  moodColor: string;
  type: string;
  thc: string;
  description: string;
  image: string;
  price: string;
  notes: string;
  cannbrozaUrl: string;
};

export type BatteryProduct = {
  id: string;
  name: string;
  type: string;
  voltage: string;
  capacity: string;
  color: string;
  price: string;
  image: string;
  features: string[];
  cannbrozaUrl: string;
};

export type EdibleProduct = {
  id: string;
  name: string;
  mood: string;
  moodColor: string;
  type: string;
  thc: string;
  servings: string;
  price: string;
  image: string;
  description: string;
  cannbrozaUrl: string;
};

export const CANNBROZA_PRODUCTS = {
  carts: [
    { id: 'uplift-sativa-1', name: 'Durban Poison Cartridge', mood: 'Uplift', moodColor: '#a8d5a8', type: 'Sativa', thc: '22%', description: 'Creative energy. Morning clarity.', image: '', price: 'R280', notes: 'Energetic, creative, social', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'uplift-sativa-2', name: 'Blue Dream Cartridge', mood: 'Uplift', moodColor: '#a8d5a8', type: 'Sativa', thc: '20%', description: 'Balanced uplift. Smooth flow.', image: '', price: 'R280', notes: 'Euphoric, focused, creative', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'unwind-indica-1', name: 'OG Kush Cartridge', mood: 'Unwind', moodColor: '#d4a5a5', type: 'Indica', thc: '19%', description: 'Deep relaxation. Evening ritual.', image: '', price: 'R280', notes: 'Relaxing, calming, euphoric', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'unwind-indica-2', name: 'Zkittlez Cartridge', mood: 'Unwind', moodColor: '#d4a5a5', type: 'Indica', thc: '21%', description: 'Sweet calm. Rest assured.', image: '', price: 'R290', notes: 'Relaxed, happy, sleepy', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'flow-hybrid-1', name: 'Girl Scout Cookies Cartridge', mood: 'Flow', moodColor: '#9bb8d4', type: 'Hybrid', thc: '20%', description: 'Balanced blend. Any time.', image: '', price: 'R285', notes: 'Euphoric, relaxed, focused', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'dream-indica-1', name: 'Wedding Cake Cartridge', mood: 'Dream', moodColor: '#d8b4e0', type: 'Indica', thc: '23%', description: 'Sleep companion. Deep rest.', image: '', price: 'R295', notes: 'Relaxing, sleepy, euphoric', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'focus-sativa-1', name: 'Jack Herer Cartridge', mood: 'Focus', moodColor: '#f5d76e', type: 'Sativa', thc: '19%', description: 'Clarity for deep work.', image: '', price: 'R280', notes: 'Energetic, focused, uplifted', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
  ] as CartProduct[],
  batteries: [
    { id: 'battery-classic-black', name: 'Moodies Classic Battery - Black', type: 'Rechargeable 510-Thread', voltage: '3.4-4.2V Variable', capacity: '1000mAh', color: 'Matte Black', price: 'R220', image: '', features: ['USB-C Charging', 'Preheat Mode', '4-Hour Battery Life'], cannbrozaUrl: 'https://www.cannbroza.com/pages/battery' },
    { id: 'battery-classic-white', name: 'Moodies Classic Battery - White', type: 'Rechargeable 510-Thread', voltage: '3.4-4.2V Variable', capacity: '1000mAh', color: 'Pearl White', price: 'R220', image: '', features: ['USB-C Charging', 'Preheat Mode', '4-Hour Battery Life'], cannbrozaUrl: 'https://www.cannbroza.com/pages/battery' },
    { id: 'battery-premium-rose', name: 'Moodies Premium Battery - Rose Gold', type: 'Rechargeable 510-Thread', voltage: '3.4-4.2V Variable', capacity: '1200mAh', color: 'Rose Gold', price: 'R280', image: '', features: ['USB-C Charging', 'Temperature Control', 'Smart Display', '6-Hour Battery Life'], cannbrozaUrl: 'https://www.cannbroza.com/pages/battery' },
    { id: 'battery-premium-gunmetal', name: 'Moodies Premium Battery - Gunmetal', type: 'Rechargeable 510-Thread', voltage: '3.4-4.2V Variable', capacity: '1200mAh', color: 'Gunmetal Grey', price: 'R280', image: '', features: ['USB-C Charging', 'Temperature Control', 'Smart Display', '6-Hour Battery Life'], cannbrozaUrl: 'https://www.cannbroza.com/pages/battery' },
  ] as BatteryProduct[],
  edibles: [
    { id: 'edible-uplift-gummies', name: 'Uplift Gummies - 10mg THC', mood: 'Uplift', moodColor: '#a8d5a8', type: 'Gummies', thc: '10mg per piece', servings: '5 pieces per pack', price: 'R150', image: '', description: 'Morning energy. 2 pieces recommended.', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'edible-unwind-gummies', name: 'Unwind Gummies - 15mg THC', mood: 'Unwind', moodColor: '#d4a5a5', type: 'Gummies', thc: '15mg per piece', servings: '5 pieces per pack', price: 'R160', image: '', description: 'Evening calm. 1-2 pieces for deep rest.', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
    { id: 'edible-flow-gummies', name: 'Flow Gummies - 12mg THC', mood: 'Flow', moodColor: '#9bb8d4', type: 'Gummies', thc: '12mg per piece', servings: '5 pieces per pack', price: 'R155', image: '', description: 'Balanced blend. Anytime ritual.', cannbrozaUrl: 'https://www.cannbroza.com/pages/cartridge-1' },
  ] as EdibleProduct[],
};

export const RITUAL_TEMPLATES = [
  { id: 'morning-ritual', name: 'Morning Clarity Ritual', description: 'Start your day energized', moods: ['Uplift'], suggestedCart: 'uplift-sativa-1', suggestedBattery: 'battery-classic-black', suggestedEdible: 'edible-uplift-gummies', totalPrice: 'R650', timing: 'Use 1 puff + 1 gummy after breakfast', bestFor: 'Creative work, meetings, social energy' },
  { id: 'evening-ritual', name: 'Evening Unwind Ritual', description: 'Relax and decompress', moods: ['Unwind'], suggestedCart: 'unwind-indica-1', suggestedBattery: 'battery-premium-rose', suggestedEdible: 'edible-unwind-gummies', totalPrice: 'R730', timing: 'Use 1-2 puffs + 1-2 gummies after dinner', bestFor: 'Self-care, rest, preparation for sleep' },
  { id: 'social-ritual', name: 'Social Flow Ritual', description: 'Find balance for any moment', moods: ['Flow'], suggestedCart: 'flow-hybrid-1', suggestedBattery: 'battery-classic-white', suggestedEdible: 'edible-flow-gummies', totalPrice: 'R710', timing: 'Use 1 puff + 1 gummy as needed', bestFor: 'Gatherings, flexible engagement, anytime mood' },
];

export const MOOD_SYSTEM: Record<string, {
  color: string; icon: string; ritual: string; timing: string;
  cartridges: string[]; batteryRecommendation: string; benefits: string[]; bestFor: string;
}> = {
  Uplift: { color: '#a8d5a8', icon: '⚡', ritual: 'Morning clarity for your creative flow', timing: 'Best 6am - 2pm', cartridges: ['uplift-sativa-1', 'uplift-sativa-2'], batteryRecommendation: 'Classic Battery (Black)', benefits: ['Energy', 'Creativity', 'Social', 'Focus'], bestFor: 'Workdays, creative projects, outdoor activities' },
  Unwind: { color: '#d4a5a5', icon: '🌿', ritual: 'Evening ritual for deep relaxation', timing: 'Best 6pm - 10pm', cartridges: ['unwind-indica-1', 'unwind-indica-2'], batteryRecommendation: 'Premium Battery (Rose Gold)', benefits: ['Relaxation', 'Calm', 'Sleep', 'Stress Relief'], bestFor: 'Evenings, self-care, bedtime routine' },
  Flow: { color: '#9bb8d4', icon: '🎶', ritual: 'Anytime balance for social moments', timing: 'Best any time', cartridges: ['flow-hybrid-1'], batteryRecommendation: 'Classic Battery (White)', benefits: ['Balance', 'Social', 'Flexible', 'Smooth'], bestFor: 'Social gatherings, casual moments, flexible use' },
  Dream: { color: '#d8b4e0', icon: '🌙', ritual: 'Bedtime companion for restful sleep', timing: 'Best 9pm - 12am', cartridges: ['dream-indica-1'], batteryRecommendation: 'Premium Battery (Gunmetal)', benefits: ['Sleep', 'Recovery', 'Deep Rest', 'Relaxation'], bestFor: 'Sleep support, deep relaxation, recovery' },
  Focus: { color: '#f5d76e', icon: '🎯', ritual: 'Productivity boost for deep work', timing: 'Best 8am - 3pm', cartridges: ['focus-sativa-1'], batteryRecommendation: 'Classic Battery (Black)', benefits: ['Clarity', 'Focus', 'Productivity', 'Energy'], bestFor: 'Deep work sessions, study, professional tasks' },
};
