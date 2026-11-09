import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BrandLogo } from '../brand/Logo.tsx';
import { Sparkles, ArrowRight, Gift, Mail } from 'lucide-react';
import { PRODUCT_IMAGES } from '../../data/chocolates.ts';

export const Hero: React.FC = () => {
  const { setActiveTab, businessConfig } = useApp();

  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 border-b border-[#D7BD96]/30">
      {/* Blended soft radial colour smudges so background feels creamy and organic */}
      <div className="smudge-blob-caramel absolute -top-16 left-8 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full" aria-hidden="true" />
      <div className="smudge-blob-rose absolute top-20 right-4 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full" aria-hidden="true" />
      <div className="smudge-blob-cocoa absolute -bottom-20 left-1/3 w-96 h-96 rounded-full" aria-hidden="true" />

      {/* Background chocolate swirl lines (subtle SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100 200C200 150 400 450 700 350C1000 250 1100 500 1300 400"
            stroke="#885137"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M-50 450C250 350 450 650 850 500C1150 380 1200 700 1350 600"
            stroke="#C99C76"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Typography & Calls to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Quiet Unboxed Metadata Kicker */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-3 sm:mb-4 flex-wrap">
              <span>Handcrafted by {businessConfig.ownerName}</span>
              <span aria-hidden="true">·</span>
              <span>₹25 Customer / ₹15 Bulk</span>
              <span aria-hidden="true">·</span>
              <span>Custom Moulds & Recipes</span>
            </div>

            {/* Main Brand Title & Tagline in Cormorant Garamond */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#362016] font-serif-luxury leading-[1.08] text-balance mb-3 sm:mb-4">
              {businessConfig.brandName}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl italic font-serif-luxury text-[#7D4C35] tracking-wide mb-4 sm:mb-6">
              "{businessConfig.tagline}"
            </p>

            <p className="text-sm sm:text-lg text-[#4A2C1E]/80 leading-relaxed max-w-xl mb-6 sm:mb-8">
              Little moments deserve something delicious. Discover thoughtfully handmade Milk, Coffee,
              Coffee Crunch, Badam, Pista, Cashew, and Kunafa trial chocolates—plus custom general recipes
              and one-time-use specialty moulds wrapped for every occasion.
            </p>

            {/* Action Buttons with comfortable >=48px touch targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all shadow-sm cursor-pointer whitespace-nowrap touch-press"
              >
                <span>Explore Chocolates</span>
                <ArrowRight className="w-4 h-4 text-[#D7BD96]" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('customize');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] soft-surface-card hover:bg-[#FFFDF9] text-[#4A2C1E] rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap touch-press"
              >
                <Gift className="w-4 h-4 text-[#7D4C35]" />
                <span>Create Your Box</span>
              </button>
            </div>

            {/* Pricing & Service Highlights */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#D7BD96]/35 grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg text-center sm:text-left">
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif-luxury text-[#362016]">₹25 / pc</span>
                <span className="text-[10px] sm:text-xs text-[#7D4C35] leading-tight block">Customer Orders</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif-luxury text-[#362016]">₹15 / pc</span>
                <span className="text-[10px] sm:text-xs text-[#7D4C35] leading-tight block">Bulk & Retailer Rate</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif-luxury text-[#362016]">Bespoke</span>
                <span className="text-[10px] sm:text-xs text-[#7D4C35] leading-tight block">Custom Moulds & Foils</span>
              </div>
            </div>

            {/* Direct Owner Contact Strip */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#7D4C35]">
              <Mail className="w-3.5 h-3.5 text-[#C99C76] shrink-0" />
              <span>Direct Service Desk ({businessConfig.ownerName}):</span>
              <a
                href={`mailto:${businessConfig.ownerEmail}`}
                className="font-medium text-[#4A2C1E] hover:underline"
              >
                {businessConfig.ownerEmail}
              </a>
            </div>
          </div>

          {/* Right Column: Visual Composition with Hero Photography & Brand Seal */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#C99C76]/25 via-[#D8BBB1]/25 to-transparent blur-xl pointer-events-none" />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden soft-surface-card group">
                <img
                  src={PRODUCT_IMAGES.hero}
                  alt="Artisanal chocolate bars and handmade cocoa squares"
                  width={700}
                  height={480}
                  className="w-full h-[300px] sm:h-[430px] object-cover transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#362016]/65 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-[#FAF1E6]">
                  <p className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#D7BD96]">
                    Freshly Tempered by {businessConfig.ownerName}
                  </p>
                  <p className="font-serif-luxury text-base sm:text-lg font-semibold">
                    Coffee, Crunch, Badam, Pista, Cashew & Milk
                  </p>
                </div>
              </div>

              {/* Floating Vintage Circular Stamp */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-[#FAF1E6]/95 backdrop-blur-xs p-1 sm:p-1.5 rounded-full shadow-md border border-[#D7BD96]/40 transition-transform hover:rotate-6 duration-300">
                <BrandLogo variant="seal" brandName={businessConfig.brandName} size="sm" />
              </div>

              {/* Small floating craft badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 soft-surface-card px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#4A2C1E]">
                <Sparkles className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>Small Batch Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
