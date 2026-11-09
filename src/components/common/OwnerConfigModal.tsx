import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Settings, DollarSign, MapPin, Tag, Phone, User, Mail } from 'lucide-react';

export const OwnerConfigModal: React.FC = () => {
  const { isOwnerConfigOpen, setIsOwnerConfigOpen, businessConfig, updateBusinessConfig } = useApp();

  const [brandName, setBrandName] = useState(businessConfig.brandName);
  const [ownerName, setOwnerName] = useState(businessConfig.ownerName);
  const [ownerEmail, setOwnerEmail] = useState(businessConfig.ownerEmail);
  const [whatsappNumber, setWhatsappNumber] = useState(businessConfig.whatsappNumber);
  const [showConfirmedPrices, setShowConfirmedPrices] = useState(businessConfig.showConfirmedPrices);
  const [pincodesStr, setPincodesStr] = useState(businessConfig.serviceablePincodes.join(', '));
  const [serviceableCity] = useState(businessConfig.serviceableCity);

  if (!isOwnerConfigOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPincodes = pincodesStr
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    updateBusinessConfig({
      brandName,
      ownerName: ownerName.trim() || 'Amanya',
      ownerEmail: ownerEmail.trim() || 'puchakaralaamanya@gmail.com',
      whatsappNumber: whatsappNumber.trim(),
      showConfirmedPrices,
      serviceablePincodes: cleanPincodes,
      serviceableCity: serviceableCity.trim(),
    });
    setIsOwnerConfigOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#362016]/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-300"
      onClick={() => setIsOwnerConfigOpen(false)}
    >
      <div
        className="relative bg-[#FDF8F2] rounded-t-3xl sm:rounded-2xl max-w-lg w-full border border-[#D7BD96]/45 shadow-2xl overflow-hidden p-6 sm:p-7 my-0 sm:my-8 animate-slideUp sm:animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-[#C99C76]/50 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D7BD96]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#F8EFE4] border border-[#D7BD96]/45 flex items-center justify-center text-[#7D4C35] shrink-0">
              <Settings className="w-4 h-4 text-[#7D4C35]" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-[#362016] leading-tight">
                Owner Boutique Settings
              </h3>
              <p className="text-[11px] text-[#7D4C35]">
                Configure owner details, contact email, WhatsApp, and pricing
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOwnerConfigOpen(false)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#FAF1E6] text-[#4A2C1E] transition-colors cursor-pointer touch-press"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5 text-xs max-h-[70vh] overflow-y-auto pr-1">
          {/* Owner Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#4A2C1E] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7D4C35]" />
                <span>Owner Name</span>
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Amanya"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#4A2C1E] mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#7D4C35]" />
                <span>Main Contact Email</span>
              </label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="puchakaralaamanya@gmail.com"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
              />
            </div>
          </div>

          {/* Brand Name Toggle */}
          <div>
            <label className="block font-bold text-[#4A2C1E] mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#7D4C35]" />
              <span>Public Brand Spelling</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setBrandName('ChocoTreat')}
                className={`min-h-[46px] py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer touch-press ${
                  brandName === 'ChocoTreat'
                    ? 'border-[#4A2C1E] bg-[#4A2C1E] text-[#FAF1E6] font-semibold shadow-xs'
                    : 'border-[#D7BD96]/45 bg-white text-[#4A2C1E]'
                }`}
              >
                ChocoTreat (Default)
              </button>
              <button
                type="button"
                onClick={() => setBrandName('Choco Treats')}
                className={`min-h-[46px] py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer touch-press ${
                  brandName === 'Choco Treats'
                    ? 'border-[#4A2C1E] bg-[#4A2C1E] text-[#FAF1E6] font-semibold shadow-xs'
                    : 'border-[#D7BD96]/45 bg-white text-[#4A2C1E]'
                }`}
              >
                Choco Treats (Alternate)
              </button>
            </div>
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block font-bold text-[#4A2C1E] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#7D4C35]" />
              <span>Business WhatsApp Number (Optional)</span>
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 919876543210 (Country code + 10 digits)"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
            />
          </div>

          {/* Pricing Model Visibility Switch */}
          <div>
            <label className="block font-bold text-[#4A2C1E] mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#7D4C35]" />
              <span>Pricing Display Mode</span>
            </label>
            <div className="p-3.5 bg-white rounded-xl border border-[#D7BD96]/45 space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer min-h-[32px]">
                <input
                  type="checkbox"
                  checked={showConfirmedPrices}
                  onChange={(e) => setShowConfirmedPrices(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4A2C1E] focus:ring-[#885137]"
                />
                <span className="font-semibold text-xs text-[#362016]">
                  Display Official Prices (₹25 Customer / ₹15 Bulk & Retailer)
                </span>
              </label>
              <p className="text-[11px] text-[#7D4C35] pl-6.5 leading-relaxed">
                Enabled by default to show ₹25 per piece for customer orders and ₹15 per piece for bulk or retailer orders.
              </p>
            </div>
          </div>

          {/* Serviceable Pincodes */}
          <div>
            <label className="block font-bold text-[#4A2C1E] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7D4C35]" />
              <span>Serviceable Pincodes (Comma separated)</span>
            </label>
            <input
              type="text"
              value={pincodesStr}
              onChange={(e) => setPincodesStr(e.target.value)}
              placeholder="530001, 530002, 530003, 531149"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-[#D7BD96]/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOwnerConfigOpen(false)}
              className="min-h-[44px] px-4 py-2 text-xs text-[#7D4C35] hover:text-[#4A2C1E] cursor-pointer touch-press"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-semibold text-xs cursor-pointer shadow-xs touch-press"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
