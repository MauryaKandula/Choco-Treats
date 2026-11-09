import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Truck, ShieldCheck, Thermometer, Lock } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal, businessConfig } = useApp();

  if (!activePolicyModal) return null;

  const closeModal = () => setActivePolicyModal(null);

  const getPolicyContent = () => {
    switch (activePolicyModal) {
      case 'delivery':
        return {
          title: 'Local Delivery & Serviceability Policy',
          icon: Truck,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#442719]/85 leading-relaxed">
              <p>
                <strong>Handcrafted & Delivered Fresh:</strong> Because artisan chocolate is sensitive to
                heat, vibrations, and humidity, {businessConfig.brandName} delivers locally within our primary
                service zone.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">1. Delivery Zones & Pincodes</h4>
              <p>
                We service selected local pincodes ({businessConfig.serviceablePincodes.join(', ')}).
                Deliveries to adjacent localities are confirmed individually when you enquire.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">2. Transparent Delivery Charges</h4>
              <p>
                The cost of your handcrafted chocolates is strictly separated from delivery fees. The exact
                delivery fee depends on the drop distance from our kitchen and will be clearly quoted before
                you confirm your order.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">3. Self-Pickup</h4>
              <p>
                Customers within our city can arrange free self-pickup directly from our kitchen studio by appointment.
              </p>
            </div>
          ),
        };
      case 'storage':
        return {
          title: 'Chocolate Care & Storage Guidelines',
          icon: Thermometer,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#442719]/85 leading-relaxed">
              <p>
                Because our chocolates are made with pure cocoa butter and zero artificial hydrogenated fats,
                they reward proper care:
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">Ideal Storage Temperature</h4>
              <p>
                Store in a dry, dark place between 16°C and 20°C away from direct sunlight, pungent spices,
                and heat sources.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">Summer Refrigeration Care</h4>
              <p>
                If ambient temperature exceeds 24°C, keep your chocolates sealed inside an airtight container
                or zip pouch in the lower compartment of your refrigerator.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">The 10-Minute Resting Rule</h4>
              <p>
                When taking cold chocolates out, allow them to rest in their sealed wrapping at room temperature
                for 10 minutes before eating. This prevents condensation bloom and restores their silky melt.
              </p>
            </div>
          ),
        };
      case 'cancellation':
        return {
          title: 'Order Confirmation & Cancellation Terms',
          icon: ShieldCheck,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#442719]/85 leading-relaxed">
              <p>
                Every chocolate is freshly tempered to order. Here is how order schedules work:
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">Order Acceptance</h4>
              <p>
                Submitting an inquiry through this website or WhatsApp does not constitute a charged transaction.
                An order is confirmed only when the maker accepts your requested date and quantity.
              </p>
              <h4 className="font-semibold text-[#281711] pt-1">Modifications & Cancellations</h4>
              <p>
                For standard pieces, modifications are welcomed up to 24 hours before your scheduled dispatch.
                For personalized gift boxes with custom-printed tags or custom ribbons, changes must be made
                before printing and packaging commences.
              </p>
            </div>
          ),
        };
      case 'privacy':
      default:
        return {
          title: 'Privacy & Data Commitment',
          icon: Lock,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-[#442719]/85 leading-relaxed">
              <p>
                At {businessConfig.brandName}, we value your privacy and simplicity:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>We do not sell, rent, or trade your personal information.</li>
                <li>Your shopping cart items are stored only in your own device's local browser storage.</li>
                <li>Your contact details and address are used exclusively to process your chocolate inquiry and coordinate delivery.</li>
                <li>No invasive trackers, ad pixels, or third-party marketing scripts are embedded.</li>
              </ul>
            </div>
          ),
        };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300"
      onClick={closeModal}
    >
      <div
        className="relative bg-[#FFF8F0] rounded-t-3xl sm:rounded-2xl max-w-lg w-full border border-[#E9D5BD] shadow-2xl overflow-hidden p-6 sm:p-7 my-0 sm:my-8 animate-slideUp sm:animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-[#C99C76]/50 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-4 border-b border-[#E9D5BD]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF1E6] border border-[#E9D5BD] flex items-center justify-center text-[#885137] shrink-0">
              <Icon className="w-4 h-4 text-[#885137]" />
            </div>
            <h3 className="font-serif-luxury font-bold text-xl text-[#281711] leading-tight">
              {policy.title}
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#FAF1E6] text-[#442719] transition-colors cursor-pointer touch-press"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 max-h-[65vh] overflow-y-auto pr-1">
          {policy.content}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E9D5BD] text-right">
          <button
            onClick={closeModal}
            className="min-h-[44px] px-6 py-2.5 bg-[#442719] text-[#FAF1E6] rounded-xl text-xs font-semibold hover:bg-[#885137] transition-all cursor-pointer touch-press shadow-xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
