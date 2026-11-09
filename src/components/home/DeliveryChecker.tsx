import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { MapPin, CheckCircle2, Clock, Calendar, HelpCircle, PackageCheck } from 'lucide-react';

export const DeliveryChecker: React.FC = () => {
  const { businessConfig, setActivePolicyModal } = useApp();
  const [pincodeInput, setPincodeInput] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'matched' | 'unconfirmed';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincodeInput.trim();
    if (!clean) return;

    if (!businessConfig.serviceablePincodes || businessConfig.serviceablePincodes.length === 0) {
      setCheckResult({
        status: 'unconfirmed',
        message: 'Delivery availability will be confirmed when you enquire.',
      });
      return;
    }

    const isMatch = businessConfig.serviceablePincodes.includes(clean);
    if (isMatch) {
      setCheckResult({
        status: 'matched',
        message: `Pincode ${clean} is within our primary local delivery zone! Fresh delivery or doorstep handover available.`,
      });
    } else {
      setCheckResult({
        status: 'unconfirmed',
        message: `Delivery to pincode ${clean} will be confirmed when you enquire. We do our best to accommodate nearby localities or offer convenient pickup!`,
      });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FFF8F0] border-b border-[#E9D5BD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Delivery Checker */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#885137] font-semibold mb-2">
              <span>Local Kitchen Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>Handled With Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#281711] tracking-tight">
              Made With Care, Delivered Locally
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#442719]/80 leading-relaxed mb-8">
              Because delicate chocolates require controlled temperature and gentle handling, we prioritize
              local hand-delivery and local pickup. Check if your locality is in our primary radius:
            </p>

            <form onSubmit={handleCheck} className="space-y-4 max-w-md">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#885137] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => {
                      setPincodeInput(e.target.value);
                      if (checkResult.status !== 'idle') {
                        setCheckResult({ status: 'idle', message: '' });
                      }
                    }}
                    placeholder="Enter 6-digit Pincode (e.g. 530001)"
                    maxLength={8}
                    className="w-full pl-10 pr-3.5 py-3 min-h-[48px] text-sm bg-white rounded-xl border border-[#E9D5BD] text-[#281711] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[48px] px-6 py-3 bg-[#442719] hover:bg-[#885137] text-[#FAF1E6] rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs touch-press flex items-center justify-center"
                >
                  Check Area
                </button>
              </div>

              {/* Real result display */}
              {checkResult.status === 'matched' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{checkResult.message}</span>
                </div>
              )}

              {checkResult.status === 'unconfirmed' && (
                <div className="p-4 bg-[#FAF1E6] border border-[#E9D5BD] rounded-xl flex items-start gap-3 text-xs text-[#442719] animate-fadeIn">
                  <HelpCircle className="w-5 h-5 text-[#885137] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{checkResult.message}</span>
                </div>
              )}
            </form>

            <div className="mt-4 text-xs text-[#885137]">
              <span>Sample local pincodes configured: </span>
              <span className="font-mono">{businessConfig.serviceablePincodes.slice(0, 4).join(', ')}...</span>
            </div>
          </div>

          {/* Right Column: Local Delivery Details & Lead Times */}
          <div className="lg:col-span-6 bg-[#FAF1E6] p-6 sm:p-8 rounded-2xl border border-[#E9D5BD] shadow-xs">
            <h3 className="text-xl font-bold font-serif-luxury text-[#281711] mb-5">
              Service Guidelines
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E9D5BD]/60">
                <Clock className="w-5 h-5 text-[#885137] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#281711]">Fresh Tempering Lead Time</h4>
                  <p className="text-xs text-[#442719]/80 mt-0.5 leading-relaxed">
                    Individual pieces typically ready in 24–48 hours. Custom gift boxes or large celebrations require 2–4 days advance notice.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E9D5BD]/60">
                <PackageCheck className="w-5 h-5 text-[#885137] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#281711]">Self-Pickup Option</h4>
                  <p className="text-xs text-[#442719]/80 mt-0.5 leading-relaxed">
                    Customers in our city can choose free home-kitchen pickup by appointment, avoiding transit melt risks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pb-3.5 border-b border-[#E9D5BD]/60">
                <Calendar className="w-5 h-5 text-[#885137] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#281711]">Transparent Delivery Fee</h4>
                  <p className="text-xs text-[#442719]/80 mt-0.5 leading-relaxed">
                    The cost of chocolates is strictly separated from any delivery charges, quoted only after confirming exact drop location.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2 text-right">
              <button
                onClick={() => setActivePolicyModal('delivery')}
                className="min-h-[44px] px-2 py-2 inline-flex items-center text-xs font-semibold text-[#885137] hover:text-[#442719] hover:underline cursor-pointer touch-press"
              >
                Read Full Local Delivery & Care Policy →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
