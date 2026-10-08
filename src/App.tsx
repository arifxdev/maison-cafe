import React, { useState, useEffect } from 'react';
import { MenuItem, FulfillmentPreference } from './types';
import { KARACHI_DELIVERY_AREAS } from './data/bistroData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourtyardExperience } from './components/CourtyardExperience';
import { BistroMenu } from './components/BistroMenu';
import { EditorialStory } from './components/EditorialStory';
import { GuestReviews } from './components/GuestReviews';
import { FooterSection } from './components/FooterSection';
import { ReservationModal } from './components/ReservationModal';
import { TastingTrayDrawer } from './components/TastingTrayDrawer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PickupDeliveryModal } from './components/PickupDeliveryModal';

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [tastingTrayOpen, setTastingTrayOpen] = useState(false);
  const [pickupDeliveryOpen, setPickupDeliveryOpen] = useState(false); // Opens after 1s of site load
  const [trayItems, setTrayItems] = useState<MenuItem[]>([]);

  // Trigger popup after one second of loading the site
  useEffect(() => {
    const timer = setTimeout(() => {
      setPickupDeliveryOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Default fulfillment preference
  const [fulfillmentPreference, setFulfillmentPreference] = useState<FulfillmentPreference>(() => {
    return {
      mode: 'delivery',
      area: KARACHI_DELIVERY_AREAS[0], // Tipu Sultan Road / Habitt City
      streetAddress: '',
    };
  });

  const handleAddToTray = (item: MenuItem) => {
    if (!trayItems.some((i) => i.id === item.id)) {
      setTrayItems([...trayItems, item]);
    }
  };

  const handleRemoveFromTray = (id: string) => {
    setTrayItems(trayItems.filter((i) => i.id !== id));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const handleConfirmFulfillment = (preference: FulfillmentPreference) => {
    setFulfillmentPreference(preference);
    setPickupDeliveryOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1E221B] selection:bg-[#C85A32] selection:text-[#F8F5EE] font-sans relative">
      {/* Top 3-Zone Contract Navigation Bar with fulfillment status */}
      <Navbar
        onOpenReservation={() => setReservationOpen(true)}
        onOpenTastingTray={() => setTastingTrayOpen(true)}
        trayCount={trayItems.length}
        fulfillmentPreference={fulfillmentPreference}
        onOpenPickupDelivery={() => setPickupDeliveryOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section with GSAP 3D Balcony Depth Parallax */}
        <HeroSection
          onOpenReservation={() => setReservationOpen(true)}
          fulfillmentPreference={fulfillmentPreference}
          onOpenPickupDelivery={() => setPickupDeliveryOpen(true)}
        />

        {/* 2. The Courtyard Experience with Dynamic Rays & Shadow Sliding */}
        <CourtyardExperience />

        {/* 3. Our Bistro Menu with Categories, Prices & Modals */}
        <BistroMenu
          onAddToTray={handleAddToTray}
          trayItemIds={trayItems.map((i) => i.id)}
        />

        {/* 4. Editorial Story: Cozy Corners & Culture */}
        <EditorialStory />

        {/* 5. Wall of Love Patrons Review Section */}
        <GuestReviews />
      </main>

      {/* 6. Footer & Details (Location, Hours, Instagram CTA) */}
      <FooterSection onOpenReservation={() => setReservationOpen(true)} />

      {/* Right Margin Vertical Scroll Progress Bar & Milestone Navigation */}
      <ScrollProgressBar />

      {/* 0. Initial First-Load Pickup & Delivery Modal (According to Address / Nearby Areas) */}
      <PickupDeliveryModal
        isOpen={pickupDeliveryOpen}
        onClose={() => setPickupDeliveryOpen(false)}
        onConfirm={handleConfirmFulfillment}
        initialPreference={fulfillmentPreference}
      />

      {/* Table Reservation Dialog Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Shortlisted Dishes Tasting Tray Drawer with Fulfillment integration */}
      <TastingTrayDrawer
        isOpen={tastingTrayOpen}
        onClose={() => setTastingTrayOpen(false)}
        trayItems={trayItems}
        onRemoveItem={handleRemoveFromTray}
        onClearTray={handleClearTray}
        onOpenReservation={() => setReservationOpen(true)}
        fulfillmentPreference={fulfillmentPreference}
        onOpenPickupDelivery={() => setPickupDeliveryOpen(true)}
      />
    </div>
  );
}

