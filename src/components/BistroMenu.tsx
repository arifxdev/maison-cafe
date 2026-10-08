import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/bistroData';
import { WroughtIronBalconySvg, VineCreepersSvg } from './BalconyMotifSvg';
import { UtensilsCrossed, Plus, Check, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BistroMenuProps {
  onAddToTray: (item: MenuItem) => void;
  trayItemIds: string[];
}

export const BistroMenu: React.FC<BistroMenuProps> = ({ onAddToTray, trayItemIds }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'pasta' | 'dessert' | 'drinks'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger and zoom-reveal animation on menu cards as they enter viewport
      gsap.fromTo(
        '.menu-stagger-card',
        {
          y: 45,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F8F5EE] bg-vintage-grain text-[#1E221B] border-b border-[#2B3526]/10 overflow-hidden"
    >
      {/* Decorative Wrought Iron Balcony pattern on top */}
      <div className="absolute top-0 left-0 right-0 h-4 opacity-15 pointer-events-none">
        <WroughtIronBalconySvg />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER with Cutlery Flourish Icon */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center justify-center gap-2 p-2 rounded-full bg-[#C85A32]/10 text-[#C85A32]">
            <UtensilsCrossed className="w-5 h-5 text-[#C85A32]" />
          </div>

          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#1E221B] tracking-tight">
            Our Bistro Menu
          </h2>

          <p className="text-base sm:text-lg text-[#2B3526]/80 max-w-xl mx-auto">
            Traditional Neapolitan wood-fired blistered crusts, morning-rolled ribbons of fresh pasta,
            and authentic Lombardy mascarpone tiramisù prepared daily in Habitt City.
          </p>

          {/* Interactive Category Filter Tabs (Zero-Pill Discipline: Segmented Controls) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Selections' },
              { id: 'pizza', label: 'Neapolitan Wood-Fired Pizza' },
              { id: 'pasta', label: 'Handcrafted Pasta' },
              { id: 'dessert', label: 'Tiramisù & Panna Cotta' },
              { id: 'drinks', label: 'Specialty Espresso & Mocktails' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#2B3526] text-[#F8F5EE] shadow-sm retro-border-olive'
                    : 'bg-[#F2ECE0] text-[#2B3526] hover:bg-[#E8DFC8] border border-[#2B3526]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MULTI-CARD GRID THAT POPS & STAGGERS ON SCROLL */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map(item => {
            const isAdded = trayItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="menu-stagger-card rounded-xl bg-[#F2ECE0] retro-border p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 group relative"
              >
                {/* Decorative Asymmetric Accent Corner */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-[#2B3526] text-[8px] font-mono text-[#F8F5EE] font-bold py-0.5 right-[-35px] top-[18px] w-[120px] text-center">
                    MAISON
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Category & Highlight Metadata (Clean Unboxed Typography) */}
                  <div className="flex items-center justify-between text-xs text-[#2B3526]/75 font-mono">
                    <span className="uppercase font-semibold tracking-wider text-[#C85A32]">
                      {item.category === 'pizza'
                        ? 'WOOD-FIRED 450°C'
                        : item.category === 'pasta'
                        ? 'HAND-ROLLED FRESH'
                        : item.category === 'dessert'
                        ? 'TRADIZIONALE'
                        : 'SINGLE ORIGIN'}
                    </span>
                    <span className="text-[#2B3526]/60">·</span>
                    <span className="font-semibold text-[#2B3526]">
                      {item.highlight || 'Bistro Selection'}
                    </span>
                  </div>

                  {/* Real Dish Photo Container */}
                  <div className="relative aspect-16/10 rounded-lg overflow-hidden border border-[#2B3526]/20 bg-[#2B3526]/10 shadow-inner group-hover:border-[#C85A32]/40 transition-colors">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-[#F8F5EE] uppercase">
                      {item.dietary || item.category}
                    </div>
                  </div>

                  {/* Title & Italian Subtitle */}
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#1E221B] group-hover:text-[#C85A32] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#2B3526]/70 mt-0.5">
                      {item.italianName}
                    </p>
                  </div>

                  {/* Visually Offset Stylized Key Ingredients Frame */}
                  <div className="p-3.5 rounded-lg bg-[#F8F5EE] border border-[#2B3526]/20 relative overflow-hidden flex items-center justify-between shadow-xs">
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono uppercase text-[#2B3526]/70 font-semibold">
                        Key Ingredients
                      </div>
                      <div className="text-xs text-[#2B3526] font-medium leading-snug">
                        {item.ingredients.slice(0, 3).join(' · ')}
                        {item.ingredients.length > 3 && ` +${item.ingredients.length - 3} more`}
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-dashed border-[#C85A32] bg-[#F2ECE0] flex items-center justify-center text-lg shrink-0">
                      {item.category === 'pizza' ? '🍕' : item.category === 'pasta' ? '🍝' : item.category === 'dessert' ? '🍮' : '☕'}
                    </div>
                  </div>

                  {/* Description Prose */}
                  <p className="text-xs sm:text-sm text-[#2B3526]/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer with Pricing Details & Interactive Actions */}
                <div className="pt-5 mt-5 border-t border-[#2B3526]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#2B3526]/70 block">
                      Price
                    </span>
                    <span className="font-mono font-bold text-lg text-[#1E221B] tabular-nums">
                      PKR {item.pricePkr.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Ingredients Modal Trigger */}
                    <button
                      onClick={() => setSelectedItemForModal(item)}
                      className="p-2 rounded-md border border-[#2B3526]/20 bg-[#F8F5EE] hover:bg-[#EBE2D0] text-[#2B3526] transition-colors cursor-pointer"
                      title="View Dish Details"
                      aria-label="View Dish Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    {/* Add to Tasting Tray Button */}
                    <button
                      onClick={() => onAddToTray(item)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-[#2B3526] text-[#F8F5EE] border-[#2B3526]'
                          : 'bg-[#C85A32] text-[#F8F5EE] hover:bg-[#A84521] border-[#C85A32]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* DISH DETAILS MODAL */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#F8F5EE] retro-border rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#2B3526]/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C85A32] font-bold">
                  {selectedItemForModal.category.toUpperCase()} RECIPE · MAISON KARACHI
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#1E221B]">
                  {selectedItemForModal.name}
                </h3>
                <p className="font-serif italic text-sm text-[#2B3526]/70">
                  {selectedItemForModal.italianName}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="p-1.5 rounded bg-[#F2ECE0] text-[#1E221B] hover:bg-[#C85A32] hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-[#2B3526]/20 shadow-inner">
              <img
                src={selectedItemForModal.imageUrl}
                alt={selectedItemForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/60 text-[10px] font-mono text-[#E29938] uppercase">
                {selectedItemForModal.highlight || 'Habitt City Fresh'}
              </div>
            </div>

            <p className="text-sm text-[#2B3526]/85 leading-relaxed">
              {selectedItemForModal.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#2B3526] font-semibold">
                Authentic Ingredients:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedItemForModal.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-[#F2ECE0] border border-[#2B3526]/20 text-[#2B3526] font-mono"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#2B3526]/15">
              <span className="font-mono text-xl font-bold text-[#1E221B]">
                PKR {selectedItemForModal.pricePkr.toLocaleString()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onAddToTray(selectedItemForModal);
                    setSelectedItemForModal(null);
                  }}
                  className="px-4 py-2 rounded-md bg-[#C85A32] text-[#F8F5EE] text-xs font-semibold hover:bg-[#A84521] transition-colors"
                >
                  Add to Tasting Tray
                </button>
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="px-4 py-2 rounded-md bg-[#2B3526] text-[#F8F5EE] text-xs font-semibold hover:bg-[#1A2218] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
