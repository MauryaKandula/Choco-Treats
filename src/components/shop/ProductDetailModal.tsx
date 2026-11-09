import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { ChocolateProduct } from '../../types/index.ts';
import { WRAPPER_OPTIONS } from '../../data/chocolates.ts';
import { X, Plus, Minus, ShoppingBag, ShieldAlert, Sparkles, Beaker } from 'lucide-react';

interface Props {
  product: ChocolateProduct;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<Props> = ({ product, onClose }) => {
  const { addToCart, businessConfig } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedWrapper, setSelectedWrapper] = useState(WRAPPER_OPTIONS[0].name);
  const [customNote, setCustomNote] = useState('');

  const isLab = product.isExperimental;
  const custPrice = product.customerPrice ?? 25;
  const bulkPrice = product.bulkRetailPrice ?? 15;

  const handleAdd = () => {
    addToCart(product, quantity, selectedWrapper, customNote);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#362016]/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FDF8F2] rounded-t-3xl sm:rounded-2xl max-w-2xl w-full border border-[#D7BD96]/45 shadow-2xl overflow-hidden my-0 sm:my-8 animate-slideUp sm:animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1.5 bg-[#C99C76]/50 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#FAF1E6]/90 text-[#4A2C1E] hover:bg-[#EAD8C3] transition-all shadow-xs cursor-pointer touch-press"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Image */}
          <div className="relative h-56 sm:h-64 md:h-full min-h-[240px] md:min-h-[280px] bg-[#F5E9DA] overflow-hidden">
            <img
              src={product.image}
              alt={product.imageAlt}
              width={600}
              height={450}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#362016]/40 via-transparent to-transparent md:hidden" />
            {isLab && (
              <div className="absolute top-4 left-4 bg-[#4A2C1E] text-[#D7BD96] text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                <Beaker className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>Kunafa Trial Batch</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase Action */}
          <div className="p-5 sm:p-7 flex flex-col justify-between max-h-[75vh] md:max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7D4C35] font-semibold mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.unit}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#362016] leading-tight">
                {product.name}
              </h2>

              {/* Dual Pricing Display: ₹25 Customer / ₹15 Bulk */}
              <div className="mt-2.5 mb-4 p-3 rounded-xl bg-[#F8EFE4] border border-[#D7BD96]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7D4C35] block font-semibold">
                    Customer Order
                  </span>
                  <span className="text-xl font-bold font-mono text-[#362016] tabular-nums">
                    {businessConfig.currencySymbol}{custPrice}
                  </span>
                  <span className="text-xs text-[#7D4C35] ml-1">{product.unit}</span>
                </div>
                <div className="h-8 w-px bg-[#D7BD96]/40" />
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#7D4C35] block font-semibold">
                    Bulk / Retailer Rate
                  </span>
                  <span className="text-lg font-bold font-mono text-[#7D4C35] tabular-nums">
                    {businessConfig.currencySymbol}{bulkPrice}
                  </span>
                  <span className="text-xs text-[#7D4C35] ml-1">{product.unit}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4A2C1E]/85 leading-relaxed mb-4">
                {product.detailedDescription}
              </p>

              {/* Flavor Profile */}
              <div className="mb-4 pt-3 border-t border-[#D7BD96]/35">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A2C1E] block mb-1.5">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#7D4C35]">
                  {product.flavorNotes.map((note, i) => (
                    <span key={i} className="inline-flex items-center">
                      {note}{i < product.flavorNotes.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens & Ingredients Note */}
              <div className="mb-5 p-3.5 rounded-xl bg-[#F8EFE4]/80 border border-[#D7BD96]/35 text-xs space-y-1.5">
                <div className="flex items-start gap-2 text-[#4A2C1E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7D4C35] shrink-0 mt-0.5" />
                  <span><strong>Ingredients:</strong> {product.ingredientsSummary}</span>
                </div>
                <div className="flex items-start gap-2 text-[#7D4C35]">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#7D4C35] shrink-0 mt-0.5" />
                  <span><strong>Allergens:</strong> {product.allergens.join(', ')}</span>
                </div>
              </div>

              {/* Wrapper selection */}
              {!isLab && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A2C1E] mb-1.5">
                    Preferred Wrapper Foil
                  </label>
                  <select
                    value={selectedWrapper}
                    onChange={(e) => setSelectedWrapper(e.target.value)}
                    className="w-full px-3 py-2.5 min-h-[44px] text-xs bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  >
                    {WRAPPER_OPTIONS.map((w) => (
                      <option key={w.id} value={w.name}>
                        {w.name} ({w.foilType})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Custom note */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                  Custom Recipe / Mould / Gift Request (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Custom one-time mould, gift tag, or extra crunch"
                  className="w-full px-3 py-2.5 min-h-[44px] text-xs bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                />
              </div>
            </div>

            {/* Quantity Stepper & Add Action */}
            <div className="pt-4 border-t border-[#D7BD96]/35 flex items-center gap-3">
              <div className="flex items-center border border-[#D7BD96]/45 rounded-xl bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="min-h-[44px] min-w-[42px] flex items-center justify-center hover:bg-[#FAF1E6] text-[#4A2C1E] cursor-pointer touch-press"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold font-mono text-[#362016]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="min-h-[44px] min-w-[42px] flex items-center justify-center hover:bg-[#FAF1E6] text-[#4A2C1E] cursor-pointer touch-press"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-h-[48px] py-3 px-4 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs touch-press"
              >
                <ShoppingBag className="w-4 h-4 text-[#D7BD96]" />
                <span>
                  {isLab
                    ? 'Book Trial Batch'
                    : `Add to Order (${businessConfig.currencySymbol}${custPrice * quantity})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
