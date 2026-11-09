import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { WRAPPER_OPTIONS, OCCASION_OPTIONS } from '../../data/chocolates.ts';
import { CustomBoxOrder } from '../../types/index.ts';
import { Sparkles, Check, Gift, Calendar, Plus, Minus, Heart } from 'lucide-react';

export const CustomBoxBuilder: React.FC = () => {
  const { addCustomBoxToCart, products, businessConfig } = useApp();

  const [boxSize, setBoxSize] = useState<number>(12); // 6, 12, 24
  const [occasion, setOccasion] = useState<string>(OCCASION_OPTIONS[0]);
  const [customOccasion] = useState('');
  const [wrapperStyle, setWrapperStyle] = useState<string>(WRAPPER_OPTIONS[0].name);
  const [mouldPreference, setMouldPreference] = useState<string>('Standard Artisan Mould');
  const [recipePreference, setRecipePreference] = useState<string>('Signature House Blend');
  const [customText, setCustomText] = useState('With Best Wishes');
  const [desiredDate, setDesiredDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Flavors available for custom box (excluding lab trial flavors & pre-made gift packs)
  const coreFlavors = products.filter((p) => !p.isExperimental && p.category !== 'gifts');

  // Track flavor counts
  const [flavorCounts, setFlavorCounts] = useState<{ [id: string]: number }>(() => {
    const init: { [id: string]: number } = {};
    coreFlavors.forEach((f, idx) => {
      init[f.id] = idx < 3 ? 4 : 0;
    });
    return init;
  });

  const totalAssignedPieces = Object.values(flavorCounts).reduce((a, b) => a + b, 0);
  const remainingPieces = boxSize - totalAssignedPieces;

  const handleFlavorAdjust = (flavorId: string, delta: number) => {
    const current = flavorCounts[flavorId] || 0;
    const next = current + delta;
    if (next < 0) return;
    if (delta > 0 && totalAssignedPieces >= boxSize) return;

    setFlavorCounts((prev) => ({
      ...prev,
      [flavorId]: next,
    }));
  };

  const selectedWrapperObj =
    WRAPPER_OPTIONS.find((w) => w.name === wrapperStyle) || WRAPPER_OPTIONS[0];

  const effectiveOccasion = occasion === 'Other' ? customOccasion || 'Special Celebration' : occasion;
  const customerBoxTotal = boxSize * (businessConfig.customerPiecePrice || 25);
  const bulkBoxTotal = boxSize * (businessConfig.bulkPiecePrice || 15);

  const handleAddToOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: CustomBoxOrder = {
      occasion: effectiveOccasion,
      boxSize,
      selectedFlavors: flavorCounts,
      wrapperStyle,
      mouldPreference,
      recipePreference,
      customText,
      desiredDate,
      specialInstructions,
    };
    addCustomBoxToCart(order);
  };

  return (
    <div className="relative py-10 sm:py-16 overflow-hidden">
      {/* Soft radial smudges */}
      <div className="smudge-blob-caramel absolute -top-20 right-10 w-96 h-96 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-rose absolute bottom-10 -left-20 w-96 h-96 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Custom Confectionery Studio</span>
            <span aria-hidden="true">·</span>
            <span>Moulds, Recipes & Gift Boxes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            Create Your Custom Box & Recipe
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#4A2C1E]/80 leading-relaxed">
            Curate an artisanal gift box with {businessConfig.ownerName}. Choose your box size, mix
            Coffee, Coffee Crunch, Badam, Pista, Cashew, and Milk Chocolate flavors, select{' '}
            <strong>one-time-use specialty moulds</strong> or a <strong>custom general recipe</strong>,
            and personalize your gift card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Customization Controls Form */}
          <form onSubmit={handleAddToOrder} className="lg:col-span-7 space-y-7 soft-surface-card p-5 sm:p-8 rounded-2xl">
            {/* Step 1: Occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-3">
                1. Select the Occasion
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OCCASION_OPTIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`min-h-[46px] px-4 py-3 text-xs text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between touch-press ${
                      occasion === occ
                        ? 'border-[#4A2C1E] bg-[#F8EFE4] font-semibold text-[#362016] shadow-xs ring-1 ring-[#4A2C1E]'
                        : 'border-[#D7BD96]/40 bg-[#FFFDF9]/80 text-[#4A2C1E] hover:bg-[#FAF1E6]'
                    }`}
                  >
                    <span>{occ}</span>
                    {occasion === occ && <Check className="w-4 h-4 text-[#7D4C35]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Box Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E]">
                  2. Choose Box Presentation Size
                </label>
                <span className="text-xs text-[#7D4C35] font-medium">
                  {remainingPieces === 0
                    ? 'All slots filled'
                    : `${remainingPieces} piece${remainingPieces > 1 ? 's' : ''} left`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {[6, 12, 24].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setBoxSize(size);
                      const each = Math.floor(size / coreFlavors.length);
                      const init: { [id: string]: number } = {};
                      coreFlavors.forEach((f, i) => {
                        init[f.id] = i === 0 ? size - each * (coreFlavors.length - 1) : each;
                      });
                      setFlavorCounts(init);
                    }}
                    className={`min-h-[72px] py-3 px-2 rounded-xl border text-center transition-all cursor-pointer touch-press ${
                      boxSize === size
                        ? 'border-[#4A2C1E] bg-[#F8EFE4] font-semibold text-[#362016] shadow-xs ring-1 ring-[#4A2C1E]'
                        : 'border-[#D7BD96]/40 bg-[#FFFDF9]/80 text-[#4A2C1E] hover:bg-[#FAF1E6]'
                    }`}
                  >
                    <span className="block font-serif-luxury text-xl sm:text-2xl font-bold">{size} Pcs</span>
                    <span className="block text-[11px] font-mono text-[#7D4C35] mt-0.5">
                      ₹{size * 25} (₹{size * 15} Bulk)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Custom Mould & Custom General Recipe Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-2">
                  3. Mould Option
                </label>
                <select
                  value={mouldPreference}
                  onChange={(e) => setMouldPreference(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                >
                  <option value="Standard Artisan Mould">Standard Artisan Bar / Square Mould</option>
                  <option value="One-Time Use Custom Mould">Moulds: One-Time Use (Event / Shape)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-2">
                  4. Recipe Formulation
                </label>
                <select
                  value={recipePreference}
                  onChange={(e) => setRecipePreference(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-xs bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                >
                  <option value="Signature House Blend">Signature House Recipe</option>
                  <option value="Custom General Recipe">Custom General Recipe (Custom Sweetness / Roast)</option>
                </select>
              </div>
            </div>

            {/* Step 5: Flavor Distribution */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E]">
                  5. Select Flavor Mix ({totalAssignedPieces}/{boxSize} Assigned)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const each = Math.floor(boxSize / coreFlavors.length);
                    const init: { [id: string]: number } = {};
                    coreFlavors.forEach((f, i) => {
                      init[f.id] = i === 0 ? boxSize - each * (coreFlavors.length - 1) : each;
                    });
                    setFlavorCounts(init);
                  }}
                  className="min-h-[44px] px-2 py-2 text-xs text-[#7D4C35] hover:underline cursor-pointer flex items-center"
                >
                  Distribute Evenly
                </button>
              </div>

              <div className="space-y-2.5 bg-[#F8EFE4]/80 p-3.5 sm:p-4 rounded-xl border border-[#D7BD96]/35">
                {coreFlavors.map((flavor) => {
                  const count = flavorCounts[flavor.id] || 0;
                  return (
                    <div
                      key={flavor.id}
                      className="flex items-center justify-between py-2 border-b border-[#D7BD96]/30 last:border-0 gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-semibold text-[#362016] block truncate">
                          {flavor.name}
                        </span>
                        <span className="text-[11px] text-[#7D4C35] truncate block">
                          {flavor.flavorNotes.slice(0, 2).join(' · ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleFlavorAdjust(flavor.id, -1)}
                          disabled={count === 0}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[#D7BD96]/45 flex items-center justify-center text-[#4A2C1E] disabled:opacity-30 cursor-pointer shadow-2xs touch-press"
                          aria-label={`Decrease ${flavor.name}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold font-mono text-[#362016]">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleFlavorAdjust(flavor.id, 1)}
                          disabled={totalAssignedPieces >= boxSize}
                          className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-[#D7BD96]/45 flex items-center justify-center text-[#4A2C1E] disabled:opacity-30 cursor-pointer shadow-2xs touch-press"
                          aria-label={`Increase ${flavor.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Wrapper Choice */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-3">
                6. Select Presentation Wrapper
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WRAPPER_OPTIONS.map((w) => {
                  const isSelected = wrapperStyle === w.name;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWrapperStyle(w.name)}
                      className={`min-h-[52px] p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 touch-press ${
                        isSelected
                          ? 'border-[#4A2C1E] bg-[#F8EFE4] shadow-xs ring-1 ring-[#4A2C1E]'
                          : 'border-[#D7BD96]/40 bg-[#FFFDF9]/80 hover:bg-[#FAF1E6]'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full shadow-xs shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: w.previewColor }}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-semibold text-[#362016] truncate">
                          {w.name}
                        </span>
                        <span className="block text-[11px] text-[#7D4C35]">
                          {w.foilType}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 7: Personalization & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-1.5">
                  7. Personalized Note / Name
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={40}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  placeholder="e.g. Happy Anniversary Mom & Dad"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-1.5">
                  Desired Event Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#7D4C35] absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>
              </div>
            </div>

            {/* Step 8: Special instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-1.5">
                Custom Recipe / Mould Notes
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={2}
                placeholder="e.g. Custom mould shape details, custom sweetness level, or Kunafa trial piece request"
                className="w-full p-3 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#D7BD96]/35">
              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-6 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer touch-press"
              >
                <Gift className="w-4 h-4 text-[#D7BD96]" />
                <span>Add Custom Box to Order (₹{customerBoxTotal})</span>
              </button>
              <p className="text-center text-[11px] text-[#7D4C35] mt-2 italic">
                Customer Box: ₹{customerBoxTotal} (₹25/pc) · Bulk / Event Rate: ₹{bulkBoxTotal} (₹15/pc)
              </p>
            </div>
          </form>

          {/* Right Column: Live Conceptual Packaging & Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="soft-surface-card p-5 sm:p-6 rounded-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D7BD96]/35">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7D4C35]">
                  Gift Presentation Preview
                </span>
                <span className="text-xs text-[#7D4C35] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#7D4C35] fill-[#D8BBB1]" /> Bespoke
                </span>
              </div>

              {/* Live Conceptual Gift Box Canvas */}
              <div className="relative h-60 sm:h-64 w-full rounded-xl bg-gradient-to-br from-[#FFF8F0] via-[#F8EFE4] to-[#EAD8C3]/60 flex flex-col items-center justify-center p-4 border border-[#D7BD96]/35 overflow-hidden">
                <div className="relative w-52 sm:w-56 h-36 sm:h-40 rounded-xl bg-[#362016] shadow-xl border border-[#4A2C1E] flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                  <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#C99C76]" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#C99C76]" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#C99C76]" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#C99C76]" />

                  {/* Ribbon cross */}
                  <div
                    className="absolute top-0 bottom-0 w-6 opacity-90 transition-colors duration-300"
                    style={{ backgroundColor: selectedWrapperObj.accentColor }}
                  />
                  <div
                    className="absolute left-0 right-0 h-6 opacity-90 transition-colors duration-300"
                    style={{ backgroundColor: selectedWrapperObj.accentColor }}
                  />

                  {/* Center Emblem with Tagline */}
                  <div className="relative z-10 bg-[#FAF1E6] px-3 py-1.5 rounded-sm shadow-md border border-[#C99C76] max-w-[170px]">
                    <span className="block text-[9px] font-sans font-bold tracking-widest text-[#7D4C35] uppercase">
                      ChocoTreat
                    </span>
                    <span className="block text-xs font-serif-luxury font-bold text-[#362016] truncate">
                      "{customText || 'Handmade Treats'}"
                    </span>
                  </div>

                  {/* Box Size Stamp */}
                  <div className="absolute bottom-1.5 right-2 text-[10px] font-mono text-[#D7BD96]">
                    {boxSize} PCS
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-medium text-[#4A2C1E]">
                    {selectedWrapperObj.name} · {effectiveOccasion}
                  </span>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#D7BD96]/35">
                  <span className="text-[#7D4C35]">Occasion:</span>
                  <span className="font-semibold text-[#362016]">{effectiveOccasion}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D7BD96]/35">
                  <span className="text-[#7D4C35]">Presentation:</span>
                  <span className="font-semibold text-[#362016]">{boxSize}-Piece Gift Box</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D7BD96]/35">
                  <span className="text-[#7D4C35]">Mould & Recipe:</span>
                  <span className="font-semibold text-[#362016] text-right">
                    {mouldPreference} · {recipePreference}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D7BD96]/35">
                  <span className="text-[#7D4C35]">Selected Wrapper:</span>
                  <span className="font-semibold text-[#362016]">{wrapperStyle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D7BD96]/35">
                  <span className="text-[#7D4C35]">Customer Box Price (₹25/pc):</span>
                  <span className="font-bold font-mono text-[#362016]">₹{customerBoxTotal}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-2">
                  <span className="text-[#7D4C35]">Bulk / Retailer Rate (₹15/pc):</span>
                  <span className="font-semibold font-mono text-[#7D4C35]">₹{bulkBoxTotal}</span>
                </div>
              </div>
            </div>

            <div className="p-4 soft-surface-card rounded-2xl text-xs text-[#4A2C1E]/85 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#362016]">
                <Sparkles className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>Personal Service by {businessConfig.ownerName}</span>
              </div>
              <p>
                Every custom box, one-time mould, and bespoke recipe is prepared fresh to order. Questions? Email{' '}
                <a href={`mailto:${businessConfig.ownerEmail}`} className="underline font-medium">
                  {businessConfig.ownerEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
