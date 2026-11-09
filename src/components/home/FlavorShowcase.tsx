import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Plus, Eye, Sparkles, Beaker } from 'lucide-react';

export const FlavorShowcase: React.FC = () => {
  const { products, addToCart, setSelectedProductForModal, businessConfig, setActiveTab } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nuts' | 'coffee' | 'classic' | 'lab'>('all');

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'all') return !p.isExperimental;
    if (selectedFilter === 'lab') return p.isExperimental;
    if (selectedFilter === 'nuts') return p.category === 'nuts';
    if (selectedFilter === 'coffee') return p.category === 'coffee';
    if (selectedFilter === 'classic') return p.category === 'classic';
    return true;
  });

  return (
    <section className="relative py-14 sm:py-20 border-b border-[#D7BD96]/30 overflow-hidden">
      {/* Soft radial colour smudges */}
      <div className="smudge-blob-rose absolute top-10 -left-20 w-80 h-80 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-caramel absolute bottom-10 -right-20 w-80 h-80 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
              <span>The Handcrafted Collection</span>
              <span aria-hidden="true">·</span>
              <span>₹25 Customer / ₹15 Bulk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#362016] tracking-tight">
              Flavors & Custom Confectionery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A2C1E]/80 max-w-xl">
              From signature Coffee, Coffee Crunch, Badam, Pista, Cashew, and Milk Chocolate to
              Blueberry & Raspberry Kunafa trials, custom general recipes, and one-time-use moulds.
            </p>
          </div>

          {/* Touch-Friendly Horizontal Swipeable Filter Tabs */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 p-1.5 bg-[#EAD8C3]/50 backdrop-blur-xs rounded-xl min-w-max border border-[#D7BD96]/30">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer touch-press ${
                  selectedFilter === 'all'
                    ? 'bg-[#4A2C1E] text-[#FAF1E6] shadow-xs'
                    : 'text-[#4A2C1E] hover:text-[#7D4C35]'
                }`}
              >
                All Flavors
              </button>
              <button
                onClick={() => setSelectedFilter('nuts')}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer touch-press ${
                  selectedFilter === 'nuts'
                    ? 'bg-[#4A2C1E] text-[#FAF1E6] shadow-xs'
                    : 'text-[#4A2C1E] hover:text-[#7D4C35]'
                }`}
              >
                Nuts (Badam, Pista, Cashew)
              </button>
              <button
                onClick={() => setSelectedFilter('coffee')}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer touch-press ${
                  selectedFilter === 'coffee'
                    ? 'bg-[#4A2C1E] text-[#FAF1E6] shadow-xs'
                    : 'text-[#4A2C1E] hover:text-[#7D4C35]'
                }`}
              >
                Coffee & Crunch
              </button>
              <button
                onClick={() => setSelectedFilter('classic')}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer touch-press ${
                  selectedFilter === 'classic'
                    ? 'bg-[#4A2C1E] text-[#FAF1E6] shadow-xs'
                    : 'text-[#4A2C1E] hover:text-[#7D4C35]'
                }`}
              >
                Milk Chocolate
              </button>
              <button
                onClick={() => setSelectedFilter('lab')}
                className={`min-h-[44px] px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 touch-press ${
                  selectedFilter === 'lab'
                    ? 'bg-[#7D4C35] text-white shadow-xs'
                    : 'text-[#7D4C35] hover:text-[#4A2C1E]'
                }`}
              >
                <Beaker className="w-3.5 h-3.5" />
                <span>Kunafa Trials</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isLab = product.isExperimental;
            const custPrice = product.customerPrice ?? 25;
            const bulkPrice = product.bulkRetailPrice ?? 15;

            return (
              <div
                key={product.id}
                className="group flex flex-col soft-surface-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Product Image Slot */}
                <div
                  className="relative h-60 sm:h-64 w-full bg-[#F5E9DA] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProductForModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#362016]/35 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Status Indicator */}
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

                  {/* Quick View Button */}
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

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#7D4C35] font-medium uppercase tracking-wider mb-1.5">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.unit}</span>
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

                  {/* Flavor Notes */}
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
                            <span className="text-[11px] text-[#7D4C35] font-medium">Customer</span>
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
              </div>
            );
          })}
        </div>

        {/* Custom Moulds, Custom Recipes & Box Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 soft-surface-card rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#7D4C35] flex items-center justify-center text-[#FAF1E6] shrink-0">
              <Sparkles className="w-6 h-6 text-[#D7BD96]" />
            </div>
            <div>
              <h4 className="text-xl font-bold font-serif-luxury text-[#362016]">
                Custom General Recipes & One-Time-Use Moulds
              </h4>
              <p className="text-xs sm:text-sm text-[#4A2C1E]/80 mt-0.5">
                Design a custom 6, 12, or 24-piece box, request one-time-use themed moulds, or tailor a custom chocolate recipe for your event.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab('customize');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs touch-press flex items-center justify-center"
          >
            Open Custom Service Studio
          </button>
        </div>
      </div>
    </section>
  );
};
