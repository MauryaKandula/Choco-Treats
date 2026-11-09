import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const HomeFAQ: React.FC = () => {
  const { businessConfig } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What are the prices for customer orders vs bulk or retailer orders?',
      a: `Standard core chocolates (Coffee, Coffee Crunch, Badam, Pista, Cashew, and Milk Chocolate) are ₹25 per piece for individual customer orders, and ₹15 per piece for bulk, event, or retailer supply orders. You can switch between Customer and Bulk tiers right inside the order bag.`,
    },
    {
      q: 'Can I request custom one-time-use moulds or a custom general recipe?',
      a: `Yes! ${businessConfig.ownerName} offers both custom general recipe adjustments (tailoring sweetness, roast intensity, or nut ratios) and one-time-use specialty moulds for events, celebrations, and return favors. Select these options directly in the Custom Box Studio or Bulk Inquiry page.`,
    },
    {
      q: 'How should handcrafted chocolates be stored?',
      a: 'Keep your chocolates in a cool, dry place away from direct sunlight, ideally between 16°C and 20°C. In warm weather, store them in an airtight container in the lower compartment of your refrigerator and let them rest at room temperature for 10 minutes before enjoying.',
    },
    {
      q: 'How do I place an order with Amanya?',
      a: `Add your chosen flavors or custom box to your inquiry bag, choose Customer (₹25/pc) or Bulk/Retailer (₹15/pc), and send your order directly via WhatsApp or email to ${businessConfig.ownerEmail}.`,
    },
    {
      q: 'What are the Blueberry & Raspberry Kunafa trials?',
      a: 'These are our specialty Chocolate Lab trial creations pairing crispy toasted kataifi pastry strands with natural blueberry and raspberry infusions. You can book a trial batch directly through our catalog.',
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 border-b border-[#D7BD96]/30 overflow-hidden">
      <div className="smudge-blob-rose absolute top-12 right-8 w-80 h-80 rounded-full" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Customer & Bulk Guidance</span>
            <span aria-hidden="true">·</span>
            <span>Pricing, Moulds & Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[#4A2C1E]/80">
            Everything you need to know about our ₹25 / ₹15 pricing, custom moulds, recipes, and local delivery.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="soft-surface-card rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full min-h-[56px] p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden touch-press"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-luxury font-bold text-base sm:text-lg text-[#362016] leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#F8EFE4] flex items-center justify-center text-[#7D4C35] shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#362016]' : ''
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A2C1E]/85 leading-relaxed border-t border-[#D7BD96]/35 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
