import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChocolateProduct,
  CartItem,
  BusinessConfig,
  ActiveTab,
  CustomBoxOrder,
} from '../types/index.ts';
import { DEFAULT_BUSINESS_CONFIG, INITIAL_PRODUCTS } from '../data/chocolates.ts';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  products: ChocolateProduct[];
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: ChocolateProduct, quantity?: number, selectedWrapper?: string, notes?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartBulkSubtotal: number;
  hasUnconfirmedPrices: boolean;
  businessConfig: BusinessConfig;
  updateBusinessConfig: (updates: Partial<BusinessConfig>) => void;
  selectedProductForModal: ChocolateProduct | null;
  setSelectedProductForModal: (product: ChocolateProduct | null) => void;
  activePolicyModal: 'delivery' | 'storage' | 'cancellation' | 'privacy' | null;
  setActivePolicyModal: (modal: 'delivery' | 'storage' | 'cancellation' | 'privacy' | null) => void;
  isOwnerConfigOpen: boolean;
  setIsOwnerConfigOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addCustomBoxToCart: (order: CustomBoxOrder) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'chocotreat_cart_v2';
const CONFIG_STORAGE_KEY = 'chocotreat_config_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [products] = useState<ChocolateProduct[]>(INITIAL_PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<ChocolateProduct | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'delivery' | 'storage' | 'cancellation' | 'privacy' | null>(null);
  const [isOwnerConfigOpen, setIsOwnerConfigOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Business configuration state
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      return saved ? { ...DEFAULT_BUSINESS_CONFIG, ...JSON.parse(saved) } : DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(businessConfig));
    } catch (e) {
      console.warn('Failed to save config to localStorage', e);
    }
  }, [businessConfig]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (
    product: ChocolateProduct,
    quantity: number = 1,
    selectedWrapper?: string,
    notes?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWrapper === selectedWrapper
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          customizationNotes: notes || next[existingIndex].customizationNotes,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedWrapper, customizationNotes: notes }];
    });
    showToast(`Added ${quantity} × ${product.name} to inquiry bag`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addCustomBoxToCart = (boxOrder: CustomBoxOrder) => {
    const custPrice = boxOrder.boxSize * (businessConfig.customerPiecePrice || 25);
    const bulkPrice = boxOrder.boxSize * (businessConfig.bulkPiecePrice || 15);
    const mouldText = boxOrder.mouldPreference ? ` · Mould: ${boxOrder.mouldPreference}` : '';
    const recipeText = boxOrder.recipePreference ? ` · Recipe: ${boxOrder.recipePreference}` : '';

    const customProduct: ChocolateProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Custom ${boxOrder.boxSize}-Piece Gift Box`,
      slug: `custom-box-${Date.now()}`,
      category: 'gifts',
      shortDescription: `Bespoke gift box for ${boxOrder.occasion} with personalized ribbon & message`,
      detailedDescription: `Custom crafted assortment (${boxOrder.boxSize} pieces). Wrapper style: ${boxOrder.wrapperStyle}${mouldText}${recipeText}. Personalized message: "${boxOrder.customText}". Desired Date: ${boxOrder.desiredDate || 'Flexible'}.`,
      image: '/src/assets/images/gift_box_packaging_1794181601534.jpg',
      imageAlt: 'Customized luxury chocolate gift box',
      customerPrice: custPrice,
      bulkRetailPrice: bulkPrice,
      tentativeMrp: custPrice,
      tentativeRetailPrice: custPrice,
      priceConfirmed: true,
      unit: `${boxOrder.boxSize}-piece box`,
      flavorNotes: ['Bespoke Customer Selection'],
      ingredientsSummary: 'Handcrafted artisan chocolates based on chosen flavors.',
      allergens: ['Milk/Dairy', 'Tree nuts (Almond/Pista/Cashew)'],
      weightEstimate: `Approx. ${boxOrder.boxSize * 20}g`,
      packagingStyle: boxOrder.wrapperStyle,
      featured: false,
      isExperimental: false,
      isActive: true,
    };

    addToCart(
      customProduct,
      1,
      boxOrder.wrapperStyle,
      `Occasion: ${boxOrder.occasion}${mouldText}${recipeText}. Message: "${boxOrder.customText}". Date: ${boxOrder.desiredDate || 'TBD'}`
    );
    setIsCartOpen(true);
  };

  const updateBusinessConfig = (updates: Partial<BusinessConfig>) => {
    setBusinessConfig((prev) => ({ ...prev, ...updates }));
    showToast('Boutique settings updated');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = item.product.customerPrice ?? item.product.tentativeRetailPrice ?? 25;
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartBulkSubtotal = cart.reduce((sum, item) => {
    const bulkUnitPrice = item.product.bulkRetailPrice ?? 15;
    return sum + bulkUnitPrice * item.quantity;
  }, 0);

  const hasUnconfirmedPrices = !businessConfig.showConfirmedPrices || cart.some((item) => item.product.isExperimental);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products,
        cart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartBulkSubtotal,
        hasUnconfirmedPrices,
        businessConfig,
        updateBusinessConfig,
        selectedProductForModal,
        setSelectedProductForModal,
        activePolicyModal,
        setActivePolicyModal,
        isOwnerConfigOpen,
        setIsOwnerConfigOpen,
        toastMessage,
        showToast,
        addCustomBoxToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
