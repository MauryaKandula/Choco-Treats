import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, Copy, CheckCircle2, ArrowRight, Mail } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartBulkSubtotal,
    businessConfig,
    showToast,
    setActiveTab,
  } = useApp();

  const [pricingTier, setPricingTier] = useState<'customer' | 'bulk'>('customer');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const activeTotal = pricingTier === 'bulk' ? cartBulkSubtotal : cartSubtotal;

  const buildOrderMessage = () => {
    const itemsSummary = cart
      .map((item) => {
        const unitRate =
          pricingTier === 'bulk'
            ? item.product.bulkRetailPrice ?? 15
            : item.product.customerPrice ?? 25;
        return `• ${item.product.name} (x${item.quantity}) — ₹${unitRate * item.quantity}${
          item.selectedWrapper ? ` [Foil: ${item.selectedWrapper}]` : ''
        }${item.customizationNotes ? ` [Notes: ${item.customizationNotes}]` : ''}`;
      })
      .join('\n');

    const tierLabel =
      pricingTier === 'bulk'
        ? 'Bulk / Retailer Order (₹15/pc base rate)'
        : 'Customer Order (₹25/pc rate)';

    const messageLines = [
      `Hello ${businessConfig.ownerName} (${businessConfig.brandName})!`,
      `I would like to place the following handcrafted chocolate order:`,
      ``,
      `Order Type: ${tierLabel}`,
      `Products:`,
      itemsSummary,
      ``,
      `Estimated Chocolate Subtotal: ${businessConfig.currencySymbol}${activeTotal}`,
      `Fulfillment: ${fulfillmentType === 'delivery' ? 'Local Delivery' : 'Self Pickup'}`,
      `Customer: ${customerName}`,
      `Phone: ${phone}`,
      fulfillmentType === 'delivery' ? `Delivery Area: ${locality}${pincode ? `, ${pincode}` : ''}` : null,
      fulfillmentType === 'delivery' && address ? `Full Address: ${address}` : null,
      preferredDate ? `Requested Date: ${preferredDate}` : null,
      orderNotes ? `Special Instructions / Moulds / Recipe: ${orderNotes}` : null,
      ``,
      `Please confirm batch availability, fresh tempering schedule, delivery charges, and payment details. Thank you!`,
    ].filter(Boolean);

    return messageLines.join('\n');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast('Please enter your name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      showToast('Please enter a valid phone number');
      return;
    }
    if (fulfillmentType === 'delivery' && !locality.trim()) {
      showToast('Please specify your delivery area / locality');
      return;
    }

    const fullMessage = buildOrderMessage();
    setGeneratedMessage(fullMessage);

    if (businessConfig.whatsappNumber && businessConfig.whatsappNumber.trim()) {
      const cleanNumber = businessConfig.whatsappNumber.replace(/[^0-9]/g, '');
      const encoded = encodeURIComponent(fullMessage);
      const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Order summary prepared! Send via Email to Amanya or copy below.');
    }
  };

  const handleEmailSubmit = () => {
    if (!customerName.trim() || !phone.trim()) {
      showToast('Please fill in your name and phone number first');
      return;
    }
    const fullMessage = buildOrderMessage();
    setGeneratedMessage(fullMessage);
    const subject = encodeURIComponent(
      `${businessConfig.brandName} Order Enquiry from ${customerName} (${pricingTier === 'bulk' ? 'Bulk/Retail' : 'Customer'})`
    );
    const body = encodeURIComponent(fullMessage);
    window.location.href = `mailto:${businessConfig.ownerEmail}?subject=${subject}&body=${body}`;
  };

  const copyOrderSummary = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      showToast('Order enquiry copied to clipboard!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#362016]/55 backdrop-blur-xs flex justify-end transition-opacity duration-300"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-lg bg-[#F8EFE4] h-full max-h-screen shadow-2xl flex flex-col border-l border-[#D7BD96]/45 animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1.5 bg-[#C99C76]/50 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-[#D7BD96]/40 bg-[#FDF8F2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#F8EFE4] border border-[#D7BD96]/45 flex items-center justify-center text-[#7D4C35]">
              <ShoppingBag className="w-4 h-4 text-[#7D4C35]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#362016] leading-tight">
                Order Enquiry Bag
              </h2>
              <span className="text-[11px] text-[#7D4C35]">
                {cart.reduce((s, i) => s + i.quantity, 0)} piece{cart.reduce((s, i) => s + i.quantity, 0) === 1 ? '' : 's'} · Owner: {businessConfig.ownerName}
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#FAF1E6] text-[#4A2C1E] transition-colors cursor-pointer touch-press"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FDF8F2] border border-[#D7BD96]/45 flex items-center justify-center text-[#7D4C35]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#362016]">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#4A2C1E]/75 max-w-xs mx-auto">
                Explore our handmade chocolates (₹25 customer / ₹15 bulk) or create a custom box.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  setActiveTab('shop');
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-[#4A2C1E] text-[#FAF1E6] rounded-xl text-xs font-semibold hover:bg-[#7D4C35] transition-all cursor-pointer touch-press shadow-xs"
              >
                <span>Browse Chocolates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Order Tier Selector: Customer (₹25) vs Bulk/Retailer (₹15) */}
              <div className="p-3 soft-surface-card rounded-xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D4C35] block">
                  Select Pricing Tier
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPricingTier('customer')}
                    className={`min-h-[44px] px-3 py-2 rounded-lg text-xs text-center border transition-all cursor-pointer touch-press ${
                      pricingTier === 'customer'
                        ? 'bg-[#4A2C1E] text-[#FAF1E6] border-[#4A2C1E] font-semibold'
                        : 'bg-white text-[#4A2C1E] border-[#D7BD96]/45'
                    }`}
                  >
                    Customer Order (₹25/pc)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingTier('bulk')}
                    className={`min-h-[44px] px-3 py-2 rounded-lg text-xs text-center border transition-all cursor-pointer touch-press ${
                      pricingTier === 'bulk'
                        ? 'bg-[#4A2C1E] text-[#FAF1E6] border-[#4A2C1E] font-semibold'
                        : 'bg-white text-[#4A2C1E] border-[#D7BD96]/45'
                    }`}
                  >
                    Bulk / Retailer (₹15/pc)
                  </button>
                </div>
              </div>

              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#7D4C35]">
                    Selected Chocolates
                  </span>
                  <button
                    onClick={clearCart}
                    className="min-h-[44px] py-2 px-2 text-xs text-[#7D4C35] hover:text-[#362016] cursor-pointer touch-press"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => {
                  const unitRate =
                    pricingTier === 'bulk'
                      ? item.product.bulkRetailPrice ?? 15
                      : item.product.customerPrice ?? 25;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedWrapper || ''}`}
                      className="p-3 sm:p-4 soft-surface-card rounded-xl flex gap-3 items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-[#D7BD96]/40 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold font-serif-luxury text-[#362016] truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-[#7D4C35] font-mono">
                            ₹{unitRate} × {item.quantity} = <strong>₹{unitRate * item.quantity}</strong>
                          </div>
                          {item.selectedWrapper && (
                            <div className="text-[10px] text-[#7D4C35] truncate">
                              Foil: {item.selectedWrapper}
                            </div>
                          )}
                          {item.customizationNotes && (
                            <div className="text-[10px] text-[#4A2C1E]/75 truncate italic">
                              "{item.customizationNotes}"
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center border border-[#D7BD96]/45 rounded-lg bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="min-h-[44px] min-w-[38px] flex items-center justify-center hover:bg-[#FAF1E6] text-[#4A2C1E] cursor-pointer touch-press"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono text-[#362016] min-w-[22px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="min-h-[44px] min-w-[38px] flex items-center justify-center hover:bg-[#FAF1E6] text-[#4A2C1E] cursor-pointer touch-press"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="min-h-[44px] min-w-[38px] flex items-center justify-center text-[#7D4C35] hover:text-red-700 cursor-pointer touch-press"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal Card */}
              <div className="p-4 soft-surface-card rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#7D4C35] block font-semibold">
                    {pricingTier === 'bulk' ? 'Bulk / Retailer Subtotal (₹15/pc)' : 'Customer Order Subtotal (₹25/pc)'}
                  </span>
                  <span className="text-[11px] text-[#4A2C1E]/75 italic">
                    Delivery calculated separately
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-[#362016] tabular-nums">
                    {businessConfig.currencySymbol}{activeTotal}
                  </span>
                </div>
              </div>

              {/* Customer Details & Enquiry Form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-2 border-t border-[#D7BD96]/40">
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#4A2C1E]">
                  Fulfillment & Contact Information
                </h3>

                {/* Fulfillment Type */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('delivery')}
                    className={`min-h-[46px] py-2.5 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer touch-press ${
                      fulfillmentType === 'delivery'
                        ? 'border-[#4A2C1E] bg-[#4A2C1E] text-[#FAF1E6] font-semibold shadow-xs'
                        : 'border-[#D7BD96]/45 bg-white text-[#4A2C1E]'
                    }`}
                  >
                    Local Doorstep Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`min-h-[46px] py-2.5 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer touch-press ${
                      fulfillmentType === 'pickup'
                        ? 'border-[#4A2C1E] bg-[#4A2C1E] text-[#FAF1E6] font-semibold shadow-xs'
                        : 'border-[#D7BD96]/45 bg-white text-[#4A2C1E]'
                    }`}
                  >
                    Free Kitchen Pickup
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                    />
                  </div>
                </div>

                {fulfillmentType === 'delivery' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                          Delivery Locality / Area *
                        </label>
                        <input
                          type="text"
                          required
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          placeholder="e.g. MVP Colony, Beach Rd"
                          className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="e.g. 530017"
                          className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                        Full Address (Flat / House / Landmark)
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Apt 402, Lotus Residency"
                        className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A2C1E] mb-1">
                      Custom Mould / Recipe Notes
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. One-time mould or gift tag"
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-[#D7BD96]/45 text-[#362016] focus:ring-1 focus:ring-[#885137]"
                    />
                  </div>
                </div>

                {/* Action Buttons: WhatsApp + Direct Email to Amanya */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3.5 px-4 bg-[#4A2C1E] hover:bg-[#7D4C35] text-[#FAF1E6] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer touch-press"
                  >
                    <Send className="w-4 h-4 text-[#D7BD96]" />
                    <span>Prepare & Send Order Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="w-full min-h-[46px] py-2.5 px-4 bg-[#FFFDF9] hover:bg-[#FAF1E6] text-[#4A2C1E] border border-[#D7BD96]/60 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer touch-press"
                  >
                    <Mail className="w-4 h-4 text-[#7D4C35]" />
                    <span>Email Order to {businessConfig.ownerName} ({businessConfig.ownerEmail})</span>
                  </button>
                </div>
              </form>

              {/* Order Generated State */}
              {generatedMessage && (
                <div className="p-4 soft-surface-card rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Order Summary Ready
                    </span>
                    <button
                      onClick={copyOrderSummary}
                      className="min-h-[40px] inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#D7BD96]/45 rounded-lg text-xs font-semibold text-[#4A2C1E] hover:bg-[#FAF1E6] cursor-pointer touch-press"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#7D4C35]" />
                      <span>Copy Summary</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-white rounded-lg border border-[#D7BD96]/40 font-mono text-[11px] text-[#4A2C1E] whitespace-pre-wrap max-h-36 overflow-y-auto">
                    {generatedMessage}
                  </pre>
                  <p className="text-[11px] text-[#7D4C35]">
                    Send via WhatsApp or email directly to <strong>{businessConfig.ownerEmail}</strong>.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
