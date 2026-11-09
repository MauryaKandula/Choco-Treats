import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext.tsx';
import { ShoppingBag, Menu, X, Heart, Home, Gift, BookOpen, Sparkles, Store } from 'lucide-react';
import { ActiveTab } from '../../types/index.ts';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, openCart, businessConfig } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 18);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'customize', label: 'Customize', icon: Gift },
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'bulk', label: 'Bulk & Retail', icon: Sparkles },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header - Adheres to 3-Zone Top Bar Contract and shrinks smoothly on scroll */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF1E6]/95 backdrop-blur-md shadow-xs border-b border-[#E9D5BD]'
            : 'bg-[#FAF1E6] border-b border-[#E9D5BD]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-8 transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-18 sm:h-20'
            }`}
          >
            {/* Zone 1: Brand Wordmark (Single text element wordmark in display serif) */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer min-h-[44px] touch-press"
              aria-label={`${businessConfig.brandName} Home`}
            >
              <div
                className={`rounded-full bg-[#442719] flex items-center justify-center text-[#FAF1E6] shadow-xs group-hover:bg-[#885137] transition-all duration-300 shrink-0 ${
                  isScrolled ? 'w-9 h-9' : 'w-10 h-10'
                }`}
              >
                <span className="font-serif-luxury font-bold text-xl leading-none">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-2xl tracking-tight font-serif-luxury font-bold text-[#442719] whitespace-nowrap leading-tight">
                  {businessConfig.brandName}
                </span>
                <span className="text-[10px] tracking-widest text-[#885137] uppercase font-sans font-medium -mt-0.5 hidden sm:block">
                  Artisan Confectionery
                </span>
              </div>
            </button>

            {/* Zone 2: 4-5 Clean single-line text navigation links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-7 text-sm font-medium text-[#442719]/80"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative py-2.5 transition-colors duration-200 whitespace-nowrap shrink-0 hover:text-[#442719] cursor-pointer min-h-[44px] flex items-center ${
                      isActive ? 'text-[#442719] font-semibold' : 'text-[#885137]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#885137] rounded-full"
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Bag / Inquiry CTA) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={openCart}
                className="relative inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] text-xs font-semibold uppercase tracking-wider text-[#FAF1E6] bg-[#442719] hover:bg-[#885137] rounded-md transition-all duration-200 shadow-xs cursor-pointer whitespace-nowrap shrink-0 touch-press"
                aria-label={`View inquiry bag (${cartCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 text-[#D7BD96]" />
                <span className="hidden sm:inline">Order Enquiry</span>
                <span className="inline sm:hidden">Bag</span>
                <span className="ml-0.5 px-1.5 py-0.5 text-[11px] font-bold bg-[#885137] text-white rounded-full tabular-nums">
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu hamburger toggle with >=44px touch target */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#442719] hover:text-[#885137] rounded-md touch-press"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu with Smooth Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-[#FAF1E6] border-b border-[#E9D5BD] px-4 pt-3 pb-5 space-y-2 shadow-lg"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 w-full text-left px-3.5 py-3 min-h-[48px] rounded-lg text-base font-medium transition-colors duration-200 touch-press ${
                      isActive
                        ? 'bg-[#E9D5BD]/40 text-[#442719] font-semibold'
                        : 'text-[#885137] hover:bg-[#FFF8F0]'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#885137]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-3 border-t border-[#E9D5BD]/50 flex items-center justify-between text-xs text-[#885137] px-3">
                <span>Handmade in Small Batches</span>
                <span className="flex items-center gap-1 text-[#885137]">
                  <Heart className="w-3.5 h-3.5 fill-[#D8BBB1] text-[#885137]" /> A Little Luxury in Every Bite
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Fixed Bottom Thumb Navigation Bar (Thumb Zone Pattern) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF1E6]/95 backdrop-blur-md border-t border-[#E9D5BD] shadow-lg px-2 py-1 flex items-center justify-around"
      >
        <button
          onClick={() => handleNavClick('home')}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 px-2 rounded-md transition-all touch-press ${
            activeTab === 'home' ? 'text-[#442719]' : 'text-[#885137]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </button>

        <button
          onClick={() => handleNavClick('shop')}
          aria-current={activeTab === 'shop' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 px-2 rounded-md transition-all touch-press ${
            activeTab === 'shop' ? 'text-[#442719]' : 'text-[#885137]'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Shop</span>
        </button>

        <button
          onClick={() => handleNavClick('customize')}
          aria-current={activeTab === 'customize' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 px-2 rounded-md transition-all touch-press ${
            activeTab === 'customize' ? 'text-[#442719]' : 'text-[#885137]'
          }`}
        >
          <Gift className="w-5 h-5 mb-0.5 text-[#C99C76]" />
          <span className="text-[10px] font-semibold tracking-tight text-[#442719]">Custom Box</span>
        </button>

        <button
          onClick={() => handleNavClick('story')}
          aria-current={activeTab === 'story' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 px-2 rounded-md transition-all touch-press ${
            activeTab === 'story' ? 'text-[#442719]' : 'text-[#885137]'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Story</span>
        </button>

        <button
          onClick={openCart}
          aria-label={`Open order enquiry bag (${cartCount} items)`}
          className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 px-2 rounded-md text-[#442719] relative transition-all touch-press"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-[#885137]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-bold bg-[#442719] text-white rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Bag</span>
        </button>
      </nav>
    </>
  );
};
