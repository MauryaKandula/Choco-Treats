import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { BrandLogo } from '../brand/Logo.tsx';
import { Heart, Settings, MessageCircle, Sparkles, Mail, User } from 'lucide-react';
import { ActiveTab } from '../../types/index.ts';

export const Footer: React.FC = () => {
  const { setActiveTab, setActivePolicyModal, setIsOwnerConfigOpen, businessConfig } = useApp();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#3E2419] to-[#321C13] text-[#FAF1E6] pt-16 pb-24 md:pb-12 border-t border-[#C99C76]/25 overflow-hidden">
      {/* Soft warm caramel smudge in footer background */}
      <div
        className="absolute -top-24 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(201, 156, 118, 0.45) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#C99C76]/20">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo variant="compact" brandName={businessConfig.brandName} theme="dark" />
            </div>

            <p className="text-sm font-serif-luxury italic text-[#D7BD96]">
              "{businessConfig.tagline}"
            </p>

            <p className="text-xs text-[#EAD8C3]/80 leading-relaxed max-w-sm">
              Handcrafted artisan chocolates by <strong>{businessConfig.ownerName}</strong>. Featuring
              Coffee, Coffee Crunch, Badam, Pista, Cashew, Milk Chocolate, Blueberry & Raspberry Kunafa
              trials, one-time-use custom moulds, and custom general recipes.
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-[#D7BD96]">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>Owner & Chocolatier: <strong>{businessConfig.ownerName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C99C76]" />
                <a
                  href={`mailto:${businessConfig.ownerEmail}`}
                  className="hover:text-white underline underline-offset-2 transition-colors"
                >
                  {businessConfig.ownerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>₹25 Customer Orders · ₹15 Bulk / Retailer Orders</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7BD96]">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF1E6]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Catalog (₹25 / ₹15)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('customize')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Box & Moulds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bulk')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bulk & Retailer (₹15/pc)
                </button>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7BD96]">
              Guidance & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF1E6]/80">
              <li>
                <button
                  onClick={() => setActivePolicyModal('delivery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Local Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('storage')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Storage & Freshness Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('cancellation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Confirmation Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Commitment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Orders Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7BD96]">
              Direct Service Desk
            </h4>
            <p className="text-xs text-[#EAD8C3]/80 leading-relaxed">
              Need custom one-time moulds, a custom general recipe, or a ₹15/piece bulk quotation?
              Reach out directly to {businessConfig.ownerName}.
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={() => handleNav('bulk')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5C3626] hover:bg-[#7D4C35] text-xs text-[#FAF1E6] font-medium transition-colors cursor-pointer w-fit touch-press"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D7BD96]" />
                <span>Submit Bulk / Retailer Enquiry</span>
              </button>

              <a
                href={`mailto:${businessConfig.ownerEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4A2C1E]/60 hover:bg-[#5C3626] text-xs text-[#D7BD96] font-medium transition-colors w-fit border border-[#C99C76]/25"
              >
                <Mail className="w-3.5 h-3.5 text-[#C99C76]" />
                <span>{businessConfig.ownerEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Owner Settings */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAD8C3]/65">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span>© {new Date().getFullYear()} {businessConfig.brandName} by {businessConfig.ownerName}. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D8BBB1] fill-[#D8BBB1]" />
            <span>in small kitchen batches.</span>
          </div>

          {/* Owner configuration trigger button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOwnerConfigOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A2C1E]/70 hover:bg-[#5C3626] text-[#D7BD96] text-[11px] font-medium transition-colors cursor-pointer border border-[#C99C76]/20"
              title="Boutique Settings (Owner, Email, Brand Name, WhatsApp number, pricing mode)"
            >
              <Settings className="w-3 h-3" />
              <span>Owner Settings</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
