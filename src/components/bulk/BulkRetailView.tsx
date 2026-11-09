import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Store, Coffee, Gift, Briefcase, Send, CheckCircle2, Copy, Mail, Sparkles } from 'lucide-react';

export const BulkRetailView: React.FC = () => {
  const { businessConfig, showToast } = useApp();

  const [inquiryType, setInquiryType] = useState('Coffee Shop & Café Supply');
  const [contactName, setContactName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('50 - 100 pieces (₹15/pc Bulk Rate)');
  const [flavorInterests, setFlavorInterests] = useState('Coffee, Coffee Crunch, Badam, Pista, Cashew, Milk Chocolate');
  const [mouldAndRecipe, setMouldAndRecipe] = useState('Standard Mould · Signature Recipe');
  const [packagingReq, setPackagingReq] = useState('Individual Metallic Twist Wraps');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const inquiryTypes = [
    { id: 'cafe', label: 'Coffee Shop & Café Supply', icon: Coffee, desc: 'Single-piece artisan chocolates (₹15 wholesale rate) to accompany espresso and specialty drinks.' },
    { id: 'retail', label: 'Retail Stocking & Boutiques', icon: Store, desc: '₹15 retailer supply rate with ₹25 customer MRP for stores, grocers, and gift counters.' },
    { id: 'corporate', label: 'Corporate Gifting & Custom Moulds', icon: Briefcase, desc: 'Custom general recipes, one-time-use branded moulds, and gift boxes for teams & clients.' },
    { id: 'events', label: 'Weddings & Return Gifts', icon: Gift, desc: 'Bespoke bulk confectionery at ₹15/piece crafted to match your celebration palette.' },
  ];

  const buildInquiryMessage = () => {
    const messageLines = [
      `Hello ${businessConfig.ownerName} (${businessConfig.brandName})!`,
      `I would like to enquire about a Bulk / Retailer Service Order (₹15/pc wholesale tier):`,
      `Inquiry Type: ${inquiryType}`,
      `Contact Name: ${contactName}`,
      businessName ? `Business Name: ${businessName}` : null,
      `Phone: ${phone}`,
      `Estimated Quantity: ${estimatedQuantity}`,
      `Flavor Interests: ${flavorInterests}`,
      `Mould & Recipe Service: ${mouldAndRecipe}`,
      `Packaging Preference: ${packagingReq}`,
      deliveryLocation ? `Delivery Area / City: ${deliveryLocation}` : null,
      notes ? `Specific Notes: ${notes}` : null,
      `Please confirm batch schedule, sample possibilities, and wholesale order details.`,
    ].filter(Boolean);

    return messageLines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !phone.trim()) {
      showToast('Please enter your contact name and phone number');
      return;
    }

    const fullMessage = buildInquiryMessage();
    setSubmittedMessage(fullMessage);

    if (businessConfig.whatsappNumber) {
      const cleanPhone = businessConfig.whatsappNumber.replace(/[^0-9]/g, '');
      const encodedMsg = encodeURIComponent(fullMessage);
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Bulk inquiry prepared! Click Email Amanya or Copy Text below.');
    }
  };

  const handleEmailInquiry = () => {
    if (!contactName.trim() || !phone.trim()) {
      showToast('Please enter your contact name and phone number first');
      return;
    }
    const fullMessage = buildInquiryMessage();
    setSubmittedMessage(fullMessage);
    const subject = encodeURIComponent(
      `${businessConfig.brandName} Bulk/Retailer Inquiry — ${businessName || contactName}`
    );
    const body = encodeURIComponent(fullMessage);
    window.location.href = `mailto:${businessConfig.ownerEmail}?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    if (submittedMessage) {
      navigator.clipboard.writeText(submittedMessage);
      showToast('Inquiry message copied to clipboard');
    }
  };

  return (
    <div className="relative py-10 sm:py-16 overflow-hidden">
      {/* Soft radial colour smudges */}
      <div className="smudge-blob-caramel absolute -top-20 left-10 w-96 h-96 rounded-full" aria-hidden="true" />
      <div className="smudge-blob-rose absolute bottom-10 right-10 w-96 h-96 rounded-full" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7D4C35] font-semibold mb-2">
            <span>Wholesale & B2B Service</span>
            <span aria-hidden="true">·</span>
            <span>₹15 Bulk & Retailer Rate</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#362016] tracking-tight">
            Little Treats. Bigger Possibilities.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#4A2C1E]/80 leading-relaxed">
            Partner directly with <strong>{businessConfig.ownerName}</strong> ({businessConfig.ownerEmail}) for
            cafés, retail counters, corporate events, and return gifts. Enjoy transparent{' '}
            <strong className="text-[#362016]">₹15 per piece bulk/retailer pricing</strong> (₹25 customer MRP),
            plus custom general recipes and one-time-use specialty moulds.
          </p>
        </div>

        {/* Inquiry Form & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Interactive Form */}
          <div className="lg:col-span-7 soft-surface-card p-5 sm:p-8 rounded-2xl">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#362016] mb-6">
              Bulk, Retailer & Custom Service Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Inquiry Type selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1E] mb-3">
                  Inquiry Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {inquiryTypes.map((t) => {
                    const isSelected = inquiryType === t.label;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setInquiryType(t.label)}
                        className={`min-h-[60px] p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 touch-press ${
                          isSelected
                            ? 'border-[#4A2C1E] bg-[#F8EFE4] shadow-xs ring-1 ring-[#4A2C1E]'
                            : 'border-[#D7BD96]/40 bg-[#FFFDF9]/85 hover:bg-[#FAF1E6]'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-[#7D4C35] shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-bold text-[#362016]">
                            {t.label}
                          </span>
                          <span className="block text-[11px] text-[#4A2C1E]/75 mt-0.5 leading-snug">
                            {t.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Business / Store / Event Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Hilltop Café / Boutique"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Estimated Quantity (₹15/pc Bulk Rate)
                  </label>
                  <select
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  >
                    <option>25 - 50 pieces (₹15/pc Bulk Rate)</option>
                    <option>50 - 100 pieces (₹15/pc Bulk Rate)</option>
                    <option>100 - 250 pieces (₹15/pc Bulk Rate)</option>
                    <option>250 - 500 pieces (₹15/pc Bulk Rate)</option>
                    <option>500+ pieces (Recurring Retailer Supply)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Mould & Recipe Service Option
                  </label>
                  <select
                    value={mouldAndRecipe}
                    onChange={(e) => setMouldAndRecipe(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  >
                    <option>Standard Mould · Signature Recipe</option>
                    <option>Moulds: One-Time Use (Custom Shape/Theme)</option>
                    <option>Custom General Recipe (Tailored Roast/Sweetness)</option>
                    <option>Both One-Time Mould + Custom General Recipe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Packaging Preference
                  </label>
                  <select
                    value={packagingReq}
                    onChange={(e) => setPackagingReq(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  >
                    <option>Individual Metallic Twist Wraps</option>
                    <option>Silver Foil with Satin Ribbon</option>
                    <option>Rigid 6-Piece Gift Boxes</option>
                    <option>Rigid 12-Piece Gift Boxes</option>
                    <option>Custom Branded Wrapper / Tag</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Flavor Selection
                  </label>
                  <input
                    type="text"
                    value={flavorInterests}
                    onChange={(e) => setFlavorInterests(e.target.value)}
                    placeholder="Coffee, Coffee Crunch, Badam, Pista, Cashew, Milk, Kunafa"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                    Delivery Area / City
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Local City Center"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                  Specific Requests or Timeline
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Tell Amanya about your expected date, custom mould concept, or Kunafa trial requests."
                  className="w-full p-3 text-sm bg-[#FFFDF9] rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3.5 px-5 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer touch-press"
                >
                  <Send className="w-4 h-4 text-[#D7BD96]" />
                  <span>Prepare Bulk Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailInquiry}
                  className="w-full min-h-[48px] py-3.5 px-5 bg-[#FFFDF9] hover:bg-[#FAF1E6] text-[#4A2C1E] border border-[#D7BD96]/60 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer touch-press"
                >
                  <Mail className="w-4 h-4 text-[#7D4C35]" />
                  <span>Email {businessConfig.ownerName}</span>
                </button>
              </div>
            </form>

            {/* Post submission feedback preview */}
            {submittedMessage && (
              <div className="mt-6 p-4 bg-[#F8EFE4] rounded-xl border border-[#D7BD96]/45 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Inquiry Summary Prepared
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D7BD96]/45 rounded-lg text-xs font-semibold text-[#4A2C1E] hover:bg-[#FFF8F0] cursor-pointer touch-press"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#7D4C35]" />
                    <span>Copy Text</span>
                  </button>
                </div>
                <pre className="p-3 bg-white rounded-lg border border-[#D7BD96]/40 font-mono text-[11px] text-[#4A2C1E] whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {submittedMessage}
                </pre>
              </div>
            )}
          </div>

          {/* Right: Rate Card & Service Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="soft-surface-card p-5 sm:p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#7D4C35] mb-2">
                <Sparkles className="w-4 h-4 text-[#C99C76]" />
                <span>Official Rate & Service Card</span>
              </div>
              <h3 className="font-serif-luxury font-bold text-2xl text-[#362016] mb-4">
                Transparent Pricing & Services
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8EFE4]/90 border border-[#D7BD96]/35 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#362016] block text-sm">Bulk & Retailer Rate</span>
                    <span className="text-[#7D4C35]">Cafés, stores, return gifts & wholesale</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#7D4C35]">₹15 / pc</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8EFE4]/90 border border-[#D7BD96]/35 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#362016] block text-sm">Customer Order Rate</span>
                    <span className="text-[#7D4C35]">Individual retail & personal gift orders</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#362016]">₹25 / pc</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#D7BD96]/35 space-y-3 text-xs sm:text-sm text-[#4A2C1E]/85 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#362016] mb-0.5">
                    • All 6 Core Flavors + Kunafa Trials
                  </h4>
                  <p className="text-xs">
                    Coffee, Coffee Crunch, Badam, Pista, Cashew, and Milk Chocolate—plus Blueberry and Raspberry Kunafa trial batches.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#362016] mb-0.5">
                    • Moulds (One-Time Use) & Custom General Recipe
                  </h4>
                  <p className="text-xs">
                    We offer single-run custom moulds for special occasions and custom general recipes adjusted to your preferred roast, nut density, or sweetness.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 soft-surface-card rounded-2xl text-xs text-[#4A2C1E]">
              <p className="font-semibold text-[#362016] mb-1">
                Direct Contact — {businessConfig.ownerName}
              </p>
              <p className="mb-2 text-[#7D4C35]">
                Reach out directly for wholesale quotations, custom recipe discussions, or tasting samples:
              </p>
              <a
                href={`mailto:${businessConfig.ownerEmail}`}
                className="inline-flex items-center gap-2 font-mono font-semibold text-[#4A2C1E] hover:underline"
              >
                <Mail className="w-3.5 h-3.5 text-[#7D4C35]" />
                <span>{businessConfig.ownerEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
