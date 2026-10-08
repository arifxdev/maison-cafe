import React from 'react';
import { MenuItem, FulfillmentPreference } from '../types';
import { X, Trash2, Send, ShoppingBag, Bike, ArrowRight, MapPin } from 'lucide-react';

interface TastingTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trayItems: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
  onOpenReservation: () => void;
  fulfillmentPreference: FulfillmentPreference;
  onOpenPickupDelivery: () => void;
}

export const TastingTrayDrawer: React.FC<TastingTrayDrawerProps> = ({
  isOpen,
  onClose,
  trayItems,
  onRemoveItem,
  onClearTray,
  onOpenReservation,
  fulfillmentPreference,
  onOpenPickupDelivery,
}) => {
  if (!isOpen) return null;

  const subtotalPkr = trayItems.reduce((acc, item) => acc + item.pricePkr, 0);
  const deliveryFee =
    fulfillmentPreference.mode === 'delivery'
      ? fulfillmentPreference.area.deliveryFeePkr
      : 0;
  const grandTotal = subtotalPkr + deliveryFee;

  const modeText =
    fulfillmentPreference.mode === 'delivery'
      ? `🛵 DELIVERY TO: ${fulfillmentPreference.area.name} (Landmark: ${fulfillmentPreference.area.landmark})` +
        (fulfillmentPreference.streetAddress ? `\nAddress: ${fulfillmentPreference.streetAddress}` : '')
      : `🛍️ PICKUP AT: Habitt City Courtyard Counter (Tipu Sultan Road, Karachi)`;

  const whatsappMessage = encodeURIComponent(
    `Hello Maison Pakistan! I would like to place an order from your kitchen:\n\n` +
      `${modeText}\n` +
      `Est. Time: ${fulfillmentPreference.mode === 'delivery' ? fulfillmentPreference.area.estimatedDeliveryMin : '15-20 mins'}\n\n` +
      `Items:\n` +
      trayItems.map((item, idx) => `${idx + 1}. ${item.name} (${item.category.toUpperCase()}) - PKR ${item.pricePkr.toLocaleString()}`).join('\n') +
      `\n\nSubtotal: PKR ${subtotalPkr.toLocaleString()}` +
      (deliveryFee > 0 ? `\nDelivery Fee (${fulfillmentPreference.area.name.split('(')[0].trim()}): PKR ${deliveryFee}` : '') +
      `\nGrand Total: PKR ${grandTotal.toLocaleString()}\n\nPlease confirm availability and dispatch!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EE] border-l-2 border-[#1E221B] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#2B3526] text-[#F8F5EE] flex items-center justify-between border-b border-[#CCA059]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CCA059]" />
              <div>
                <h3 className="font-serif font-black text-xl text-[#F8F5EE]">
                  Your Tasting Tray
                </h3>
                <p className="text-[11px] font-mono text-[#DDD3C1]/80">
                  {trayItems.length} {trayItems.length === 1 ? 'Dish' : 'Dishes'} Shortlisted
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#1A2218] text-[#DDD3C1] hover:text-white cursor-pointer"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Status Banner */}
          <div className="px-6 py-3 bg-[#EAE2D2] border-b border-[#2B3526]/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {fulfillmentPreference.mode === 'delivery' ? (
                <Bike className="w-4 h-4 text-[#C85A32]" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-[#2B3526]" />
              )}
              <div>
                <span className="font-serif font-bold text-[#1E221B] block">
                  {fulfillmentPreference.mode === 'delivery'
                    ? `Delivery: ${fulfillmentPreference.area.name.split('(')[0].trim()}`
                    : 'Courtyard Pickup: Habitt City'}
                </span>
                <span className="text-[10px] text-[#2B3526]/75 font-mono">
                  {fulfillmentPreference.mode === 'delivery'
                    ? `~${fulfillmentPreference.area.estimatedDeliveryMin} · Fee: ${fulfillmentPreference.area.deliveryFeePkr === 0 ? 'FREE' : `PKR ${fulfillmentPreference.area.deliveryFeePkr}`}`
                    : 'Ready in 15-20 min · PKR 0 Fee'}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenPickupDelivery}
              className="text-[11px] font-mono text-[#C85A32] hover:underline font-bold cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Tray Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {trayItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-4xl">🍽️</div>
                <h4 className="font-serif font-bold text-lg text-[#1E221B]">
                  Your Tray is Empty
                </h4>
                <p className="text-xs text-[#2B3526]/75 max-w-xs mx-auto">
                  Browse our wood-fired pizzas, fresh pasta ribbons, and authentic desserts to build your order.
                </p>
              </div>
            ) : (
              trayItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#F2ECE0] border border-[#2B3526]/15 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-[#C85A32] font-semibold">
                      {item.category}
                    </span>
                    <div className="font-serif font-bold text-sm text-[#1E221B]">
                      {item.name}
                    </div>
                    <div className="font-mono text-xs text-[#2B3526] font-medium">
                      PKR {item.pricePkr.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-[#2B3526]/60 hover:text-[#C85A32] transition-colors cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Actions */}
          {trayItems.length > 0 && (
            <div className="p-6 bg-[#F2ECE0] border-t-2 border-[#1E221B] space-y-4">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between text-[#2B3526]/80">
                  <span>Subtotal:</span>
                  <span>PKR {subtotalPkr.toLocaleString()}</span>
                </div>
                {fulfillmentPreference.mode === 'delivery' && (
                  <div className="flex items-center justify-between text-[#2B3526]/80">
                    <span>Delivery Fee ({fulfillmentPreference.area.name.split('(')[0].trim()}):</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm font-bold text-[#1E221B] pt-1 border-t border-[#2B3526]/10">
                  <span>Estimated Total:</span>
                  <span className="text-base text-[#C85A32]">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`https://wa.me/923008262476?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-serif font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order to WhatsApp Dispatch</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2B3526] hover:bg-[#1A2218] text-[#F8F5EE] font-medium text-xs tracking-wide transition-colors"
                >
                  Dine-In Courtyard Reservation Instead
                </button>

                <button
                  onClick={onClearTray}
                  className="w-full py-1.5 text-[11px] font-mono text-[#2B3526]/70 hover:text-[#C85A32] text-center cursor-pointer"
                >
                  Clear Tasting Tray
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

