import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { WRAPPER_OPTIONS, PRODUCT_IMAGES } from '../../data/chocolates.ts';
import { Gift, Sparkles, Check, ArrowRight } from 'lucide-react';

export const PackagingShowcase: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedWrapperId, setSelectedWrapperId] = useState('bronze_metallic');
  const [previewName, setPreviewName] = useState('With Love, Ananya');
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday Special');

  const activeWrapper = WRAPPER_OPTIONS.find((w) => w.id === selectedWrapperId) || WRAPPER_OPTIONS[0];

  return (
    <section className="py-14 sm:py-20 bg-[#FFF8F0] border-b border-[#E9D5BD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#885137] font-semibold mb-2">
            <span>Bespoke Presentation</span>
            <span aria-hidden="true">·</span>
            <span>Hand-Tied Gifting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#281711] tracking-tight">
            Handcrafted Packaging & Custom Wrappers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#442719]/80 leading-relaxed">
            Every chocolate is hand-wrapped. From vibrant metallic twist foils in celebratory jewel tones
            to elegant silver-wrapped treats tied with satin ribbons, explore thoughtful packaging
            ready for birthdays, weddings, return gifts, or corporate tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Interactive Conceptual Packaging Previewer */}
          <div className="lg:col-span-6 bg-[#FAF1E6] rounded-2xl p-5 sm:p-8 border border-[#E9D5BD] shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E9D5BD]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#885137]">
                Live Packaging Simulator
              </span>
              <span className="text-xs text-[#885137]/80 italic">
                Interactive Concept Preview
              </span>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="relative h-60 sm:h-72 w-full rounded-xl bg-gradient-to-br from-[#FFF8F0] via-[#FAF1E6] to-[#E9D5BD]/40 flex items-center justify-center p-4 sm:p-6 overflow-hidden border border-[#E9D5BD]">
              <div
                className="absolute inset-0 opacity-20 transition-colors duration-500"
                style={{ backgroundColor: activeWrapper.previewColor }}
              />

              {/* Conceptual 3D-styled Wrapper Artwork */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-xs transition-transform duration-300">
                {activeWrapper.id === 'silver_blue_ribbon' ? (
                  <div className="relative">
                    <div className="w-44 sm:w-48 h-28 sm:h-32 rounded-lg bg-gradient-to-tr from-[#BCC5CE] via-[#EDF1F5] to-[#D0D7DE] shadow-md border border-[#A6B2BD] flex flex-col items-center justify-center p-3 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:8px_8px]" />
                      
                      <div className="absolute top-0 bottom-0 w-7 sm:w-8 bg-[#4A90E2] shadow-xs flex items-center justify-center">
                        <div className="w-1 h-full bg-[#357ABD] opacity-40" />
                      </div>
                      
                      <div className="absolute left-0 right-0 h-6 sm:h-7 bg-[#4A90E2] shadow-xs flex items-center justify-center">
                        <div className="h-1 w-full bg-[#357ABD] opacity-40" />
                      </div>

                      <div className="relative z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#357ABD] shadow-md border-2 border-white flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="mt-3 bg-[#FFF8F0] px-3.5 py-1.5 rounded-md shadow-xs border border-[#C99C76] text-center max-w-[200px] mx-auto">
                      <span className="block text-[9px] uppercase tracking-wider text-[#885137] font-semibold">
                        {selectedOccasion}
                      </span>
                      <span className="block text-xs font-serif-luxury font-bold text-[#281711] truncate">
                        "{previewName}"
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div
                        className="w-8 sm:w-10 h-6 sm:h-7 rounded-l-full -mr-2 transform -rotate-12 shadow-xs transition-colors duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${activeWrapper.previewColor}, #FAF1E6 40%, ${activeWrapper.accentColor})`,
                        }}
                      />
                      
                      <div
                        className="w-32 sm:w-36 h-20 sm:h-24 rounded-2xl shadow-lg flex flex-col items-center justify-center p-2.5 transition-colors duration-300 relative overflow-hidden"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, #FFF8F0, ${activeWrapper.previewColor} 45%, ${activeWrapper.accentColor})`,
                        }}
                      >
                        <div className="text-center px-2 py-1 bg-black/25 backdrop-blur-xs rounded-sm">
                          <span className="text-[9px] tracking-widest uppercase font-bold text-[#FAF1E6] block">
                            ChocoTreat
                          </span>
                          <span className="text-[11px] font-serif-luxury text-[#FAF1E6] font-semibold truncate block max-w-[100px]">
                            {previewName}
                          </span>
                        </div>
                      </div>

                      <div
                        className="w-8 sm:w-10 h-6 sm:h-7 rounded-r-full -ml-2 transform rotate-12 shadow-xs transition-colors duration-300"
                        style={{
                          background: `linear-gradient(225deg, ${activeWrapper.previewColor}, #FAF1E6 40%, ${activeWrapper.accentColor})`,
                        }}
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-xs font-medium text-[#442719]">
                        {activeWrapper.name} · {activeWrapper.foilType}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls with touch-friendly targets */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#442719] mb-2">
                  Select Wrapper Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WRAPPER_OPTIONS.map((wrapper) => {
                    const isSelected = selectedWrapperId === wrapper.id;
                    return (
                      <button
                        key={wrapper.id}
                        onClick={() => setSelectedWrapperId(wrapper.id)}
                        className={`min-h-[52px] p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center text-center touch-press ${
                          isSelected
                            ? 'border-[#442719] bg-[#FFF8F0] shadow-xs ring-1 ring-[#442719]'
                            : 'border-[#E9D5BD] bg-[#FAF1E6] hover:bg-[#FFF8F0]'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full mb-1 shadow-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: wrapper.previewColor }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-[11px] font-semibold text-[#281711] leading-tight">
                          {wrapper.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text & Occasion inputs with >=44px height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#442719] mb-1">
                    Personalized Message / Name
                  </label>
                  <input
                    type="text"
                    value={previewName}
                    onChange={(e) => setPreviewName(e.target.value)}
                    maxLength={28}
                    className="w-full min-h-[44px] px-3 py-2 text-xs bg-white rounded-lg border border-[#E9D5BD] text-[#281711] focus:ring-1 focus:ring-[#885137]"
                    placeholder="e.g. Happy Birthday Rahul"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#442719] mb-1">
                    Occasion Tag
                  </label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 text-xs bg-white rounded-lg border border-[#E9D5BD] text-[#281711] focus:ring-1 focus:ring-[#885137]"
                  >
                    <option>Birthday Special</option>
                    <option>Wedding Favors</option>
                    <option>Anniversary</option>
                    <option>Corporate Gifting</option>
                    <option>Festival Greetings</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Packaging Offerings & Photography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#E9D5BD] bg-[#FAF1E6] shadow-xs">
              <img
                src={PRODUCT_IMAGES.giftBox}
                alt="Luxury handcrafted chocolate gift box packaging with ribbon"
                className="w-full h-52 sm:h-64 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF1E6] rounded-xl border border-[#E9D5BD]">
                <h4 className="font-serif-luxury font-bold text-lg text-[#281711] mb-1">
                  Individual Twist Wraps
                </h4>
                <p className="text-xs text-[#442719]/80 leading-relaxed">
                  Food-grade metallic foils in bronze, emerald green, and deep purple. Keeps chocolates fresh and festive.
                </p>
                <span className="inline-block mt-2 text-[11px] text-[#885137] font-semibold">
                  Standard & Custom Runs
                </span>
              </div>

              <div className="p-4 bg-[#FAF1E6] rounded-xl border border-[#E9D5BD]">
                <h4 className="font-serif-luxury font-bold text-lg text-[#281711] mb-1">
                  Rigid Gift Boxes
                </h4>
                <p className="text-xs text-[#442719]/80 leading-relaxed">
                  Available in 6, 12, or 24 piece assortments. Tied with satin ribbon and personalized calligraphy card.
                </p>
                <span className="inline-block mt-2 text-[11px] text-[#885137] font-semibold">
                  Available on Order
                </span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  setActiveTab('customize');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#442719] hover:bg-[#885137] text-[#FAF1E6] rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs touch-press"
              >
                <span>Customize Your Own Gift Box</span>
                <ArrowRight className="w-4 h-4 text-[#D7BD96]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
