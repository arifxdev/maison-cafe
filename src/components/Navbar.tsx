import React, { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';
import { FulfillmentPreference } from '../types';
import { Utensils, Menu as MenuIcon, X, Bike, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenTastingTray: () => void;
  trayCount: number;
  fulfillmentPreference: FulfillmentPreference;
  onOpenPickupDelivery: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenTastingTray,
  trayCount,
  fulfillmentPreference,
  onOpenPickupDelivery,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#2B3526]/15 shadow-sm py-3'
            : 'bg-[#F8F5EE]/80 backdrop-blur-xs border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ZONE 1: Brand Wordmark (Single Text Element) */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-[#1E221B] hover:text-[#C85A32] transition-colors"
            >
              MAISON
            </a>

            {/* Quick Fulfillment Selector Indicator Badge */}
            <button
              onClick={onOpenPickupDelivery}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#2B3526]/20 bg-[#F2ECE0] hover:bg-[#EAE2D2] text-[#2B3526] text-xs font-mono transition-colors cursor-pointer"
              title="Change Delivery Area or Pickup Location"
            >
              {fulfillmentPreference.mode === 'delivery' ? (
                <>
                  <Bike className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span className="font-semibold">{fulfillmentPreference.area.name.split('(')[0].trim()}</span>
                  <span className="text-[#2B3526]/60">· {fulfillmentPreference.area.estimatedDeliveryMin}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#2B3526]" />
                  <span className="font-semibold">Pickup: Habitt City</span>
                  <span className="text-[#2B3526]/60">· 15-20m</span>
                </>
              )}
            </button>
          </div>

          {/* ZONE 2: 4-6 clean text navigation links with subtle hover underlines */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2B3526]">
            <a
              href="#courtyard"
              className="relative py-1 hover:text-[#C85A32] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all after:duration-200"
            >
              Our Courtyard
            </a>
            <a
              href="#menu"
              className="relative py-1 hover:text-[#C85A32] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all after:duration-200"
            >
              Bistro Menu
            </a>
            <a
              href="#story"
              className="relative py-1 hover:text-[#C85A32] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all after:duration-200"
            >
              Philosophy
            </a>
            <a
              href="#location"
              className="relative py-1 hover:text-[#C85A32] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all after:duration-200"
            >
              Find Us
            </a>
          </nav>

          {/* ZONE 3: Primary Actions (1-2 actions) */}
          <div className="flex items-center gap-2.5">
            {/* Fulfillment selector for tablets / smaller screens */}
            <button
              onClick={onOpenPickupDelivery}
              className="flex lg:hidden items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#2B3526]/20 bg-[#F2ECE0] hover:bg-[#EAE2D2] text-[#2B3526] text-xs font-mono transition-colors cursor-pointer"
              title="Change Delivery Area or Pickup Location"
            >
              {fulfillmentPreference.mode === 'delivery' ? (
                <>
                  <Bike className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span className="font-semibold truncate max-w-[90px]">{fulfillmentPreference.area.name.split('(')[0].trim()}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#2B3526]" />
                  <span className="font-semibold">Pickup</span>
                </>
              )}
            </button>

            {/* Tasting Tray Bookmark Button */}
            <button
              onClick={onOpenTastingTray}
              className="relative p-2.5 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] hover:bg-[#EAE2D2] text-[#2B3526] transition-colors cursor-pointer"
              title="View Tasting Tray"
              aria-label="View Tasting Tray"
            >
              <Utensils className="w-4 h-4" />
              {trayCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C85A32] text-[#F8F5EE] text-[11px] font-bold flex items-center justify-center font-mono">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Book a Table with magnetic hover */}
            <MagneticButton
              onClick={onOpenReservation}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#F8F5EE] bg-[#C85A32] hover:bg-[#A84521] rounded-lg shadow-sm border border-[#A84521] transition-colors whitespace-nowrap"
            >
              Book a Table
            </MagneticButton>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1E221B] hover:text-[#C85A32] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2B3526]/10 bg-[#F8F5EE] px-4 pt-3 pb-5 mt-2 space-y-2 shadow-lg">
            <div className="pb-2 border-b border-[#2B3526]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPickupDelivery();
                }}
                className="w-full text-left p-2.5 rounded-lg bg-[#F2ECE0] border border-[#2B3526]/15 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {fulfillmentPreference.mode === 'delivery' ? (
                    <Bike className="w-4 h-4 text-[#C85A32]" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-[#2B3526]" />
                  )}
                  <div>
                    <div className="font-serif font-bold text-xs text-[#1E221B]">
                      {fulfillmentPreference.mode === 'delivery'
                        ? `Delivery: ${fulfillmentPreference.area.name}`
                        : 'Courtyard Pickup: Habitt City'}
                    </div>
                    <div className="text-[10px] text-[#2B3526]/70 font-mono">
                      {fulfillmentPreference.mode === 'delivery'
                        ? `${fulfillmentPreference.area.estimatedDeliveryMin} · Fee: PKR ${fulfillmentPreference.area.deliveryFeePkr}`
                        : 'Ready in 15-20 mins · Ground Floor'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#C85A32] font-bold">Change</span>
              </button>
            </div>

            <a
              href="#courtyard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#2B3526] hover:text-[#C85A32]"
            >
              Our Courtyard
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#2B3526] hover:text-[#C85A32]"
            >
              Bistro Menu
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#2B3526] hover:text-[#C85A32]"
            >
              Philosophy
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#2B3526] hover:text-[#C85A32]"
            >
              Find Us
            </a>
          </div>
        )}
      </header>
    </>
  );
};
