import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BrandLogo } from '../brand/Logo.tsx';
import { Heart, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { PRODUCT_IMAGES } from '../../data/chocolates.ts';

export const OurStoryView: React.FC = () => {
  const { businessConfig, setActiveTab } = useApp();

  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      {/* Soft radial smudges */}
      <div className="smudge-blob-caramel absolute -top-20 -right-20 w-96 h-96 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-rose absolute bottom-20 -left-20 w-96 h-96 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Crafted by {businessConfig.ownerName}</span>
            <span aria-hidden="true">·</span>
            <span>Small-Batch Chocolate Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            Handmade Moments of Happiness
          </h1>
          <p className="mt-3 text-lg font-serif-luxury italic text-[#7D4C35]">
            "{businessConfig.tagline}"
          </p>
        </div>

        {/* Narrative & Craftsmanship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-sm text-[#4A2C1E]/85 leading-relaxed">
            <p className="text-base sm:text-lg text-[#362016] font-serif-luxury leading-relaxed">
              Founded and handcrafted by <strong>{businessConfig.ownerName}</strong>,{' '}
              {businessConfig.brandName} started with a simple belief: chocolate should feel like a
              warm pause in the day—a thoughtful bite crafted with honest ingredients and personal care.
            </p>

            <p>
              In our home-kitchen studio, every batch is prepared by hand. Rather than using industrial
              conveyor tempering, we melt and temper pure cocoa butter and rich cacao in small, carefully
              managed pans. Our core lineup celebrates timeless textures: <strong>Coffee</strong>,{' '}
              <strong>Coffee Crunch</strong>, <strong>Badam (Almond)</strong>, <strong>Pista (Pistachio)</strong>,{' '}
              <strong>Cashew</strong>, and velvety <strong>Milk Chocolate</strong>, alongside experimental{' '}
              <strong>Blueberry and Raspberry Kunafa trials</strong>.
            </p>

            <p>
              As a full-service bespoke confectionery studio, we also offer{' '}
              <strong>custom general recipes</strong> tailored to your taste preferences and{' '}
              <strong>one-time-use specialty moulds</strong> for events, return favors, and retail partners—at
              a transparent <strong>₹25 per piece for customer orders</strong> and{' '}
              <strong>₹15 per piece for bulk or retailer orders</strong>.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 soft-surface-card rounded-xl">
                <Sparkles className="w-5 h-5 text-[#7D4C35] mb-2" />
                <h3 className="font-serif-luxury font-bold text-base text-[#362016] mb-1">
                  Custom General Recipes & Moulds
                </h3>
                <p className="text-xs text-[#4A2C1E]/80">
                  Collaborate directly on custom recipes and single-use moulds crafted specifically for your celebration.
                </p>
              </div>

              <div className="p-4 soft-surface-card rounded-xl">
                <Heart className="w-5 h-5 text-[#7D4C35] mb-2" />
                <h3 className="font-serif-luxury font-bold text-base text-[#362016] mb-1">
                  Direct Maker Communication
                </h3>
                <p className="text-xs text-[#4A2C1E]/80">
                  Speak directly with {businessConfig.ownerName} via WhatsApp or email ({businessConfig.ownerEmail}) for every order.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Brand Seal & Contact Card */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative rounded-2xl overflow-hidden soft-surface-card p-6 flex flex-col items-center text-center">
              <BrandLogo variant="seal" brandName={businessConfig.brandName} size="lg" />
              
              <div className="mt-6 pt-4 border-t border-[#D7BD96]/40 w-full text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7D4C35]">
                  Artisan Seal · {businessConfig.ownerName}
                </span>
                <p className="text-xs text-[#4A2C1E]/80 mt-1">
                  Featuring the artisanal chocolate block, flowing melted ganache, and signature scalloped badge.
                </p>
                <a
                  href={`mailto:${businessConfig.ownerEmail}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A2C1E] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7D4C35]" />
                  <span>{businessConfig.ownerEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Identity Heritage & Original Artwork Reference Section */}
        <div className="mt-16 pt-12 border-t border-[#D7BD96]/40">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
              <span>Brand Foundations</span>
              <span aria-hidden="true">·</span>
              <span>Visual Identity Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#362016]">
              The Heart Behind Our Visual System
            </h2>
            <p className="mt-2 text-sm text-[#4A2C1E]/80">
              Our website draws direct inspiration from our original packaging seals and identity concepts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reference Image 1: Primary Wordmark */}
            <div className="soft-surface-card p-6 rounded-2xl flex flex-col items-center">
              <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#FAF1E6] border border-[#D7BD96]/40 flex items-center justify-center p-2 mb-4">
                <img
                  src={PRODUCT_IMAGES.logoWordmarkRef}
                  alt="Original ChocoTreat primary wordmark concept"
                  width={500}
                  height={350}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-serif-luxury font-bold text-lg text-[#362016]">
                  Primary Identity Concept
                </h3>
                <p className="text-xs text-[#7D4C35] mt-1">
                  Wordmark with chocolate bar icon, ribbon wave, and "A Little Luxury in Every Bite" slogan.
                </p>
              </div>
            </div>

            {/* Reference Image 2: Circular Vintage Badge */}
            <div className="soft-surface-card p-6 rounded-2xl flex flex-col items-center">
              <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#FAF1E6] border border-[#D7BD96]/40 flex items-center justify-center p-2 mb-4">
                <img
                  src={PRODUCT_IMAGES.logoSealRef}
                  alt="Original Choco Treats circular scalloped badge concept"
                  width={450}
                  height={450}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-serif-luxury font-bold text-lg text-[#362016]">
                  Secondary Circular Seal & Stamp
                </h3>
                <p className="text-xs text-[#7D4C35] mt-1">
                  Scalloped vintage confectionery seal with chocolate squares and flowing melted chocolate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Explore */}
        <div className="mt-16 p-8 soft-surface-card rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-serif-luxury text-[#362016]">
              Ready to order from {businessConfig.ownerName}'s kitchen?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2C1E]/80 mt-1">
              Explore our ₹25 customer flavors, customize a gift box, or inquire for ₹15 bulk/retailer supply.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs touch-press"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#D7BD96]" />
          </button>
        </div>
      </div>
    </div>
  );
};
