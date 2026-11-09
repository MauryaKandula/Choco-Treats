import React from 'react';
import { MessageCircle, Gift, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const OrderingSteps: React.FC = () => {
  const { businessConfig } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Select Flavors or Custom Moulds',
      desc: 'Choose individual chocolates (₹25 customer / ₹15 bulk), custom general recipes, or one-time-use specialty moulds with your favorite metallic wrapper.',
      icon: Gift,
    },
    {
      num: '02',
      title: 'Direct Service Order',
      desc: `Send your selection directly to ${businessConfig.ownerName} via WhatsApp or email (${businessConfig.ownerEmail}) with zero mandatory account signups.`,
      icon: MessageCircle,
    },
    {
      num: '03',
      title: 'Freshly Tempered & Delivered',
      desc: 'We confirm your custom recipe, schedule, and local delivery or free kitchen pickup before hand-tempering your batch.',
      icon: Truck,
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 border-b border-[#D7BD96]/30 overflow-hidden">
      <div className="smudge-blob-caramel absolute -bottom-16 left-1/3 w-96 h-96 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Simple & Personal</span>
            <span aria-hidden="true">·</span>
            <span>Direct Kitchen Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            How Ordering Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A2C1E]/80">
            Because our chocolates are made in small handmade batches without artificial preservatives,
            we connect directly to ensure peak freshness for every customer and bulk order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative soft-surface-card p-7 sm:p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F8EFE4] border border-[#D7BD96]/40 flex items-center justify-center text-[#7D4C35]">
                    <Icon className="w-5 h-5 text-[#7D4C35]" />
                  </div>
                  <span className="font-serif-luxury text-3xl font-bold text-[#C99C76]/55">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif-luxury text-[#362016] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A2C1E]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
