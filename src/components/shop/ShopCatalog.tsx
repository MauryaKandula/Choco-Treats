import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useApp } from '../../context/AppContext.tsx';
import { ChocolateCategory } from '../../types/index.ts';
import { Search, Plus, Eye, Beaker, Sparkles, ArrowUpDown } from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal.tsx';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export const ShopCatalog: React.FC = () => {
  const { products, addToCart, selectedProductForModal, setSelectedProductForModal, businessConfig, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ChocolateCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [loadedImages, setLoadedImages] = useState<{ [id: string]: boolean }>({});
  const prefersReducedMotion = useReducedMotion();

  const categories: { id: ChocolateCategory; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'classic', label: 'Classic Milk' },
    { id: 'coffee', label: 'Coffee & Crunch' },
    { id: 'nuts', label: 'Roasted Nuts' },
    { id: 'gifts', label: 'Gift Boxes & Custom' },
    { id: 'experimental', label: 'Chocolate Lab' },
  ];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesNotes = p.flavorNotes.some((n) => n.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesNotes) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      const priceA = a.customerPrice ?? a.tentativeRetailPrice ?? 25;
      const priceB = b.customerPrice ?? b.tentativeRetailPrice ?? 25;

      if (sortBy === 'price-asc') {
        return priceA - priceB || a.name.localeCompare(b.name);
      }
      if (sortBy === 'price-desc') {
        return priceB - priceA || a.name.localeCompare(b.name);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default 'featured': featured first, experimental last
      if (a.isExperimental !== b.isExperimental) return a.isExperimental ? 1 : -1;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="relative py-10 sm:py-16 overflow-hidden">
      {/* Soft ambient colour smudges for blended warmth */}
      <div className="smudge-blob-caramel absolute -top-24 -left-24 w-96 h-96 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-rose absolute top-1/3 -right-24 w-96 h-96 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-cocoa absolute bottom-12 left-1/4 w-96 h-96 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Bespoke Confectionery by {businessConfig.ownerName}</span>
            <span aria-hidden="true">·</span>
            <span>Customer & Bulk Service</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            Our Chocolate Collection
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#4A2C1E]/80 leading-relaxed">
            Handcrafted in small batches with pure cocoa butter, freshly toasted nuts, and aromatic
            coffee infusions. Individual pieces are{' '}
            <strong className="text-[#362016] font-semibold">₹25 for customer orders</strong> and{' '}
            <strong className="text-[#7D4C35] font-semibold">₹15 for bulk or retailer orders</strong>.
          </p>
        </div>

        {/* Toolbar: Category Filters (Swipeable), Search Bar & Sort Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D7BD96]/40">
          {/* Category Filter Buttons with smooth touch scroll */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 p-1.5 bg-[#EAD8C3]/50 backdrop-blur-xs rounded-xl min-w-max border border-[#D7BD96]/30">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap touch-press ${
                      isSelected
                        ? 'bg-[#4A2C1E] text-[#FAF1E6] shadow-xs'
                        : 'text-[#4A2C1E] hover:text-[#7D4C35]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#7D4C35] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search chocolates by flavor or ingredient"
                placeholder="Search flavors, badam, coffee..."
                className="w-full pl-10 pr-3 py-2.5 min-h-[44px] text-xs sm:text-sm bg-[#FFFDF9]/85 backdrop-blur-xs rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
              />
            </div>

            {/* Sort Dropdown with 'Price: Low to High', 'Price: High to Low', and 'Name' */}
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7D4C35] absolute left-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by price or name"
                className="w-full sm:w-auto pl-9 pr-8 py-2.5 min-h-[44px] text-xs font-semibold bg-[#FFFDF9]/85 backdrop-blur-xs rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137] cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service & Tiered Pricing Banner */}
        <div className="mb-8 p-4 sm:p-5 soft-surface-card rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#4A2C1E]">
          <div className="flex items-start sm:items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#C99C76] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Transparent Service Pricing:</strong> Standard pieces are{' '}
              <strong className="text-[#362016]">₹25</strong> for individual customer orders and{' '}
              <strong className="text-[#7D4C35]">₹15</strong> for bulk, event, or retailer orders. Custom one-time-use moulds & bespoke recipes available on request.
            </span>
          </div>
          <button
            onClick={() => {
              setActiveTab('bulk');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#7D4C35] hover:text-[#362016] underline underline-offset-4 whitespace-nowrap cursor-pointer self-start sm:self-center"
          >
            Inquire for ₹15 Bulk Rate →
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 soft-surface-card rounded-2xl p-8">
            <p className="text-xl font-serif-luxury font-bold text-[#362016] mb-2">
              No chocolates matched your search
            </p>
            <p className="text-xs text-[#7D4C35] mb-5">
              Try searching for badam, coffee, pista, cashew, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="min-h-[44px] px-5 py-2.5 bg-[#4A2C1E] text-[#FAF1E6] rounded-xl text-xs font-semibold cursor-pointer touch-press"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isLab = product.isExperimental;
                const isImgLoaded = loadedImages[product.id];
                const custPrice = product.customerPrice ?? 25;
                const bulkPrice = product.bulkRetailPrice ?? 15;

                return (
                  <motion.div
                    layout={!prefersReducedMotion}
                    key={product.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col soft-surface-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Product Image Slot with skeleton shimmer until loaded */}
                    <div
                      className="relative h-60 sm:h-64 w-full bg-[#F5E9DA] overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProductForModal(product)}
                    >
                      {!isImgLoaded && (
                        <div className="absolute inset-0 bg-[#E9D5BD]/40 animate-pulse" aria-hidden="true" />
                      )}
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width={600}
                        height={450}
                        onLoad={() => setLoadedImages((prev) => ({ ...prev, [product.id]: true }))}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-103 ${
                          isImgLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Soft gradient blend at bottom of image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#362016]/35 via-transparent to-transparent opacity-60" />

                      {/* Status Label */}
                      {isLab ? (
                        <div className="absolute top-3 left-3 bg-[#4A2C1E]/90 text-[#EAD8C3] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                          <Beaker className="w-3.5 h-3.5 text-[#C99C76]" />
                          <span>Kunafa Trial Batch</span>
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 bg-[#FDF8F2]/90 text-[#4A2C1E] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs">
                          {product.unit}
                        </div>
                      )}

                      {/* Quick View Button with >=44px touch hitbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductForModal(product);
                        }}
                        className="absolute bottom-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#FDF8F2]/95 hover:bg-white text-[#4A2C1E] rounded-full shadow-md transition-all cursor-pointer touch-press"
                        aria-label={`View details for ${product.name}`}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#7D4C35] font-medium uppercase tracking-wider mb-1.5">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>Handmade</span>
                      </div>

                      <h3
                        onClick={() => setSelectedProductForModal(product)}
                        className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#362016] group-hover:text-[#7D4C35] transition-colors leading-snug cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm text-[#4A2C1E]/80 line-clamp-2 leading-relaxed flex-1">
                        {product.shortDescription}
                      </p>

                      {/* Flavor Notes (Unboxed clean typography) */}
                      <div className="mt-4 pt-3 border-t border-[#D7BD96]/35 text-xs text-[#7D4C35] flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#4A2C1E]">Notes:</span>
                        {product.flavorNotes.map((note, idx) => (
                          <React.Fragment key={idx}>
                            <span>{note}</span>
                            {idx < product.flavorNotes.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Price & Action Row */}
                      <div className="mt-5 pt-3 border-t border-[#D7BD96]/35 flex items-center justify-between gap-3">
                        <div>
                          {businessConfig.showConfirmedPrices ? (
                            <div className="flex flex-col">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-bold font-mono text-[#362016] tabular-nums">
                                  {businessConfig.currencySymbol}{custPrice}
                                </span>
                                <span className="text-[11px] text-[#7D4C35] font-medium">
                                  Customer
                                </span>
                              </div>
                              <span className="text-[11px] text-[#7D4C35]/90 font-mono tabular-nums">
                                {businessConfig.currencySymbol}{bulkPrice} Bulk / Retailer
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold text-[#7D4C35] uppercase tracking-wide">
                              {isLab ? 'Trial on Request' : 'Price on Request'}
                            </span>
                          )}
                        </div>

                        {isLab ? (
                          <button
                            onClick={() => setSelectedProductForModal(product)}
                            className="min-h-[44px] px-4 py-2 text-xs font-semibold bg-[#FAF1E6] hover:bg-[#EAD8C3] text-[#4A2C1E] border border-[#885137]/30 rounded-xl transition-colors cursor-pointer touch-press"
                          >
                            Book Trial
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs touch-press"
                          >
                            <Plus className="w-4 h-4 text-[#D7BD96]" />
                            <span>Add to Order</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal for Product Detail View */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}
    </div>
  );
};
