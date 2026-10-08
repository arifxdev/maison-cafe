import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { WroughtIronBalconySvg, VineCreepersSvg, ChandelierGlobeSvg, MaisonCrestSvg } from './BalconyMotifSvg';
import { ArrowDown, Sparkles, MapPin, Clock, Bike, ShoppingBag } from 'lucide-react';
import { FulfillmentPreference } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenReservation: () => void;
  fulfillmentPreference?: FulfillmentPreference;
  onOpenPickupDelivery?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  fulfillmentPreference,
  onOpenPickupDelivery,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const layerBackRef = useRef<HTMLDivElement | null>(null);
  const layerMidRef = useRef<HTMLDivElement | null>(null);
  const layerFrontRef = useRef<HTMLDivElement | null>(null);
  const layerAccentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline (fade-in-up & stagger)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .from('.hero-title-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }, '-=0.5')
      .from('.hero-subtext', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-actions', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-meta', {
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .from([layerBackRef.current, layerMidRef.current, layerFrontRef.current, layerAccentRef.current], {
        scale: 0.94,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=1.2');

      // 2. Parallax depth layers with GSAP ScrollTrigger
      // Layer Back (moves slowest)
      if (layerBackRef.current && sectionRef.current) {
        gsap.to(layerBackRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Layer Mid (moves moderate rate)
      if (layerMidRef.current && sectionRef.current) {
        gsap.to(layerMidRef.current, {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Layer Front (moves fastest for dynamic 3D depth)
      if (layerFrontRef.current && sectionRef.current) {
        gsap.to(layerFrontRef.current, {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Layer Accent (rotates slightly & drifts)
      if (layerAccentRef.current && sectionRef.current) {
        gsap.to(layerAccentRef.current, {
          yPercent: -45,
          rotation: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#F8F5EE] bg-vintage-grain border-b border-[#2B3526]/10 flex items-center"
    >
      {/* Decorative Wrought Iron filigree header accent banner */}
      <div className="absolute top-0 left-0 right-0 h-3 opacity-20 pointer-events-none">
        <WroughtIronBalconySvg />
      </div>

      {/* Subtle background ambient chandeliers */}
      <div className="absolute -top-10 right-1/4 opacity-15 pointer-events-none hidden md:block">
        <ChandelierGlobeSvg className="w-32 h-44" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Stacked Chunky Vintage Editorial Typography */}
          <div ref={headlineRef} className="lg:col-span-6 z-10 space-y-6">
            
            {/* Editorial Location Kicker & Fulfillment Area */}
            <div className="hero-badge flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#2B3526]/5 border border-[#2B3526]/15 text-[#2B3526]">
                <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wider uppercase font-mono">
                  HABITT CITY · TIPU SULTAN ROAD, KARACHI
                </span>
              </div>

              {fulfillmentPreference && onOpenPickupDelivery && (
                <button
                  onClick={onOpenPickupDelivery}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C85A32]/10 border border-[#C85A32]/30 text-[#C85A32] text-xs font-mono font-semibold hover:bg-[#C85A32]/20 transition-colors cursor-pointer"
                  title="Change delivery or pickup preference"
                >
                  {fulfillmentPreference.mode === 'delivery' ? (
                    <>
                      <Bike className="w-3.5 h-3.5" />
                      <span>Delivery: {fulfillmentPreference.area.name.split('(')[0].trim()} (~{fulfillmentPreference.area.estimatedDeliveryMin})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Courtyard Pickup: Ready in 15-20 min</span>
                    </>
                  )}
                  <span className="underline text-[10px] ml-1">Change</span>
                </button>
              )}
            </div>

            {/* Main Stacked Chunky Vintage Serif Headline */}
            <div className="space-y-1">
              <div className="hero-title-line">
                <span className="font-serif font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-[#1E221B] leading-none block">
                  MAISON
                </span>
              </div>
              <div className="hero-title-line">
                <span className="font-serif italic font-normal text-3xl sm:text-5xl xl:text-6xl text-[#C85A32] leading-tight block">
                  A Taste of Italy
                </span>
              </div>
              <div className="hero-title-line">
                <span className="font-serif font-black text-3xl sm:text-5xl xl:text-6xl tracking-tight text-[#2B3526] leading-none block">
                  IN KARACHI
                </span>
              </div>
            </div>

            {/* Subtext */}
            <p className="hero-subtext text-base sm:text-lg text-[#2B3526]/85 max-w-xl leading-relaxed font-normal">
              An Italian &amp; Parisian-inspired bistro nestled in the heart of Karachi, Pakistan.
              Explore handmade recipes, wood-fired classics, and romantic courtyard dining
              beneath glowing residential balconies.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                asLink
                href="#menu"
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-[#F8F5EE] bg-[#2B3526] hover:bg-[#1A2218] rounded-md retro-border-olive transition-transform hover:scale-[1.03]"
              >
                Explore the Bistro
              </MagneticButton>

              <MagneticButton
                onClick={onOpenReservation}
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-[#1E221B] bg-[#E29938] hover:bg-[#D48D2B] rounded-md retro-border transition-transform hover:scale-[1.03]"
              >
                Reserve Courtyard Table
              </MagneticButton>
            </div>

            {/* Trust and Key Info Line */}
            <div className="hero-meta pt-4 flex flex-wrap items-center gap-6 text-xs text-[#2B3526]/75 border-t border-[#2B3526]/10">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Daily 3:00 PM – 12:00 AM</span>
              </div>
              <span aria-hidden="true" className="text-[#2B3526]/30">·</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Habitt City, Tipu Sultan Rd</span>
              </div>
              <span aria-hidden="true" className="text-[#2B3526]/30">·</span>
              <div className="flex items-center gap-1.5 font-medium text-[#2B3526]">
                <Sparkles className="w-3.5 h-3.5 text-[#CCA059]" />
                <span>Wood-Fired Neapolitan Crust</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Overlapping Parallax Balcony 3D Depth Layers */}
          <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center">

            {/* GSAP Depth Status Badge Overlay (Requested in prompt) */}
            <div className="absolute top-2 right-2 z-40 px-3 py-1.5 rounded-full bg-[#1E221B]/90 backdrop-blur-md text-[#F8F5EE] text-[11px] font-mono tracking-tight flex items-center gap-2 border border-[#CCA059]/40 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E29938] animate-ping"></span>
              <span>GSAP animations &amp; 3D depth layers enabled</span>
            </div>

            {/* LAYER 1: BACK FACADE (Real Photo: Italian Upper Balcony Architecture & Shutters) */}
            <div
              ref={layerBackRef}
              className="absolute w-[84%] sm:w-[80%] h-[320px] sm:h-[380px] top-4 right-4 rounded-xl overflow-hidden retro-border bg-[#F2ECE0] shadow-2xl flex flex-col justify-between group"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Italian residential balconies with climbing creepers and warm lights"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2218] via-black/40 to-black/20" />
              </div>

              {/* Architectural Trompe-l’œil text header */}
              <div className="relative z-10 p-5 flex items-start justify-between border-b border-white/10">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#E29938] font-semibold">
                    PIAZZA ARCHITECTURE · LEVEL II
                  </div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#F8F5EE]">
                    Italian Residential Balconies
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-serif text-xs font-bold shadow-md">
                  01
                </div>
              </div>

              {/* Balcony Wrought Iron Overlay at foot */}
              <div className="relative z-10 p-4 pt-0">
                <WroughtIronBalconySvg className="w-full h-8 text-[#CCA059]" color="#CCA059" />
              </div>
            </div>

            {/* LAYER 2: MIDDLE LAYER (Real Photo: Nighttime Courtyard Alleyway & Hanging Chandeliers) */}
            <div
              ref={layerMidRef}
              className="absolute w-[82%] sm:w-[76%] h-[300px] sm:h-[350px] bottom-10 left-2 rounded-xl overflow-hidden retro-border-terracotta bg-[#1E221B] text-[#F8F5EE] shadow-2xl p-5 z-20 flex flex-col justify-between group"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Nighttime bistro courtyard alleyway with warm glowing globe chandeliers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E221B] via-[#1E221B]/60 to-transparent" />
              </div>

              {/* Top Bar inside card */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E29938] inline-block animate-pulse"></span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E29938] font-bold">
                    HABITT CITY NIGHTS
                  </span>
                </div>
                <MaisonCrestSvg className="w-9 h-9 text-[#CCA059]" />
              </div>

              {/* Center Chandelier and visual motif */}
              <div className="relative z-10 flex items-center justify-between my-2">
                <ChandelierGlobeSvg className="w-20 h-24 drop-shadow-[0_10px_15px_rgba(226,153,56,0.5)]" />
                <div className="text-right space-y-1">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#F8F5EE] leading-tight">
                    Nighttime Alleyway
                  </div>
                  <div className="text-xs text-[#E29938] font-medium">
                    Golden Orb Chandeliers &amp; Jasmine Vines
                  </div>
                  <div className="text-[11px] text-[#DDD3C1]/90 max-w-[200px]">
                    Suspended 18-foot chandeliers casting a warm Parisian glow over dinners.
                  </div>
                </div>
              </div>

              {/* Bottom Balcony Rail */}
              <div className="relative z-10 pt-2 border-t border-white/10">
                <WroughtIronBalconySvg className="w-full h-7 text-[#CCA059]" color="#CCA059" />
              </div>
            </div>

            {/* LAYER 3: FRONT FLOATING POLAROID (Real Photo: Wood-Fired Pizza) */}
            <div
              ref={layerFrontRef}
              className="absolute w-[62%] sm:w-[54%] h-[210px] sm:h-[230px] bottom-0 right-0 rounded-lg overflow-hidden retro-border bg-[#F8F5EE] shadow-2xl p-3 sm:p-4 z-30 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#C85A32] font-bold">
                    FRESH FROM HEARTH
                  </span>
                  <div className="font-serif text-sm sm:text-base font-extrabold text-[#1E221B]">
                    Burrata Bianca
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#2B3526] bg-[#2B3526]/10 px-2 py-0.5 rounded">
                  PKR 2,450
                </span>
              </div>

              {/* Real Pizza Photograph Thumbnail */}
              <div className="my-1 rounded-md overflow-hidden border border-[#2B3526]/20 relative aspect-16/9 bg-black/10">
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
                  alt="Neapolitan Burrata Bianca pizza"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-mono text-white">
                  Wood-Fired 450°C
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#2B3526]/80 pt-1 border-t border-[#2B3526]/10 font-mono">
                <span>FERMENTED 48 HRS</span>
                <span className="text-[#C85A32] font-bold">COURTYARD SIGNATURE</span>
              </div>
            </div>

            {/* LAYER 4: FLOATING VINTAGE POSTAL STAMP BADGE */}
            <div
              ref={layerAccentRef}
              className="absolute -top-3 left-4 z-30 p-2.5 rounded bg-[#F2ECE0] retro-border-terracotta shadow-xl transform -rotate-6 select-none"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#C85A32] flex items-center justify-center font-serif font-black text-xs text-[#C85A32]">
                  M
                </div>
                <div className="text-left font-mono text-[9px] leading-tight uppercase font-bold text-[#1E221B]">
                  <div className="text-[#C85A32]">MAISON KARACHI</div>
                  <div className="text-[#2B3526]">ESTD. MMXXIV</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <a
        href="#courtyard"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs text-[#2B3526]/70 hover:text-[#C85A32] transition-colors py-2"
      >
        <span className="font-mono text-[11px] uppercase tracking-wider">Scroll to Courtyard</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
