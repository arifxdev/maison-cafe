import React, { useState } from 'react';
import { FulfillmentMode, KarachiArea, FulfillmentPreference } from '../types';
import { KARACHI_DELIVERY_AREAS } from '../data/bistroData';
import { MaisonCrestSvg } from './BalconyMotifSvg';
import { Bike, ShoppingBag, MapPin, Clock, X, Check, ArrowRight } from 'lucide-react';

interface PickupDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (preference: FulfillmentPreference) => void;
  initialPreference?: FulfillmentPreference;
}

export const PickupDeliveryModal: React.FC<PickupDeliveryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialPreference,
}) => {
  const [mode, setMode] = useState<FulfillmentMode>(initialPreference?.mode || 'delivery');
  const [selectedAreaId, setSelectedAreaId] = useState<string>(
    initialPreference?.area?.id || KARACHI_DELIVERY_AREAS[0].id
  );
  const [streetAddress, setStreetAddress] = useState(initialPreference?.streetAddress || '');

  if (!isOpen) return null;

  const currentArea =
    KARACHI_DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || KARACHI_DELIVERY_AREAS[0];

  const handleConfirm = () => {
    onConfirm({
      mode,
      area: currentArea,
      streetAddress: streetAddress.trim(),
      pickupTimeMin: mode === 'pickup' ? 20 : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-overlay">
      {/* Short, Centered Popup Card with Tactile Popup Spring Bounce Animation */}
      <div className="relative w-full max-w-[440px] bg-[#F8F5EE] rounded-2xl retro-border shadow-2xl p-6 sm:p-7 space-y-5 animate-popup-spring">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#2B3526]/10 hover:bg-[#2B3526]/20 text-[#2B3526] flex items-center justify-center transition-colors cursor-pointer text-xs"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Card Header */}
        <div className="flex items-center gap-3 pr-6">
          <MaisonCrestSvg className="w-10 h-10 text-[#C85A32] shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85A32] font-bold block">
              HABITT CITY · KARACHI
            </span>
            <h3 className="font-serif font-black text-xl text-[#1E221B] leading-tight">
              Order from Maison
            </h3>
            <p className="text-xs text-[#2B3526]/75 mt-0.5">
              Wood-fired pizzas &amp; fresh pastas to your location
            </p>
          </div>
        </div>

        {/* Segmented Mode Selector Tabs (Short & Clean) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#F2ECE0] border border-[#2B3526]/15 text-xs font-serif">
          <button
            type="button"
            onClick={() => setMode('delivery')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
              mode === 'delivery'
                ? 'bg-[#2B3526] text-[#F8F5EE] shadow-xs'
                : 'text-[#2B3526] hover:bg-black/5'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Delivery</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('pickup')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
              mode === 'pickup'
                ? 'bg-[#2B3526] text-[#F8F5EE] shadow-xs'
                : 'text-[#2B3526] hover:bg-black/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#CCA059]" />
            <span>Pickup (Habitt City)</span>
          </button>
        </div>

        {/* Body View: Delivery vs Pickup */}
        {mode === 'delivery' ? (
          <div className="space-y-3.5">
            {/* Select Nearby Area */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#2B3526] font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Select Your Area in Karachi</span>
              </label>

              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#2B3526]/25 bg-[#F2ECE0] text-xs font-serif text-[#1E221B] focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                <optgroup label="Nearby Tipu Sultan (Fastest 15-35m)">
                  {KARACHI_DELIVERY_AREAS.filter((a) => a.zone === 'nearby').map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} — {area.deliveryFeePkr === 0 ? 'FREE' : `PKR ${area.deliveryFeePkr}`} ({area.estimatedDeliveryMin})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Mid & Extended Karachi">
                  {KARACHI_DELIVERY_AREAS.filter((a) => a.zone !== 'nearby').map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} — PKR {area.deliveryFeePkr} ({area.estimatedDeliveryMin})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Live Delivery Info Pill */}
            <div className="p-3 rounded-lg bg-[#EAE2D2] border border-[#2B3526]/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-mono text-[11px] text-[#1E221B]">
                  Est. <strong>{currentArea.estimatedDeliveryMin}</strong>
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#C85A32]">
                {currentArea.deliveryFeePkr === 0 ? 'FREE DELIVERY' : `PKR ${currentArea.deliveryFeePkr} Fee`}
              </span>
            </div>

            {/* Optional Specific Address Line */}
            <div className="space-y-1">
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="House / Flat / Street (Optional)"
                className="w-full px-3 py-2 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-xs text-[#1E221B] placeholder-[#2B3526]/50 focus:outline-none focus:border-[#C85A32]"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#2B3526] text-[#F8F5EE] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-[#F8F5EE]">
                Habitt City Courtyard Counter
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C85A32] font-mono text-[10px] font-bold text-white">
                Ready in 15-20 min
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C1]">
              Ground Floor, Tipu Sultan Rd, Mohammad Ali Society, Karachi.
            </p>
            <div className="pt-1 border-t border-white/10 text-[10px] font-mono text-[#CCA059]">
              Free compound parking &amp; curbside car service available.
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-[#F8F5EE] font-serif font-bold text-sm flex items-center justify-center gap-2 retro-border-terracotta cursor-pointer transition-colors shadow-sm"
          >
            <span>
              {mode === 'delivery'
                ? `Confirm Delivery to ${currentArea.name.split('(')[0].trim()}`
                : 'Confirm Courtyard Pickup'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1 text-center text-[11px] font-mono text-[#2B3526]/70 hover:text-[#C85A32] cursor-pointer"
          >
            Browse Courtyard &amp; Menu First
          </button>
        </div>

      </div>
    </div>
  );
};
