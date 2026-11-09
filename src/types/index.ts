export type ChocolateCategory = 'all' | 'classic' | 'coffee' | 'nuts' | 'experimental' | 'gifts';

export interface ChocolateProduct {
  id: string;
  name: string;
  slug: string;
  category: 'classic' | 'coffee' | 'nuts' | 'experimental' | 'gifts';
  shortDescription: string;
  detailedDescription: string;
  image: string;
  imageAlt: string;
  // Confirmed pricing structure: ₹25 for customer orders, ₹15 for bulk/retailer orders
  customerPrice: number; // e.g. 25
  bulkRetailPrice: number; // e.g. 15
  tentativeMrp?: number; // 25
  tentativeRetailPrice?: number; // 25 (customer price)
  priceConfirmed: boolean;
  unit: string; // e.g. "per piece", "12-piece gift box"
  // Chocolate details
  flavorNotes: string[];
  ingredientsSummary: string;
  allergens: string[];
  weightEstimate?: string;
  packagingStyle: string;
  featured: boolean;
  isExperimental: boolean;
  isActive: boolean;
}

export interface CartItem {
  product: ChocolateProduct;
  quantity: number;
  customizationNotes?: string;
  selectedWrapper?: string;
  orderTier?: 'customer' | 'bulk';
}

export interface CustomBoxOrder {
  occasion: string;
  boxSize: number; // 6, 12, 24
  selectedFlavors: { [flavorId: string]: number };
  wrapperStyle: string;
  mouldPreference?: string; // Standard Artisan Mould or Custom One-Time Use Mould
  recipePreference?: string; // Signature Blend or Custom General Recipe
  customText: string;
  desiredDate?: string;
  specialInstructions?: string;
}

export interface BusinessConfig {
  brandName: 'ChocoTreat' | 'Choco Treats';
  tagline: string;
  ownerName: string;
  ownerEmail: string;
  whatsappNumber: string;
  showConfirmedPrices: boolean;
  customerPiecePrice: number; // ₹25
  bulkPiecePrice: number; // ₹15
  serviceableCity: string;
  serviceablePincodes: string[];
  allowExperimentalLabInquiry: boolean;
  currencySymbol: string;
}

export type ActiveTab = 'home' | 'shop' | 'customize' | 'story' | 'bulk' | 'contact';
