import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WroughtIronBalconySvg, VineCreepersSvg, MaisonCrestSvg, ChandelierGlobeSvg } from './BalconyMotifSvg';
import { Coffee, Heart, Flame, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const EditorialStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-editorial-title', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.story-polaroid-frame', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.story-frames-container',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F2ECE0] text-[#1E221B] border-b border-[#2B3526]/10 relative overflow-hidden"
    >
      {/* Background Ivy motif accents */}
      <div className="absolute top-12 left-4 opacity-20 pointer-events-none">
        <VineCreepersSvg className="w-48 h-48" />
      </div>
      <div className="absolute bottom-12 right-4 opacity-20 pointer-events-none">
        <VineCreepersSvg className="w-48 h-48" flipped />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION 1: COZY CORNERS & CULTURE (Hearth & Mug Tribute) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C85A32] font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#C85A32]" />
            <span>Habitt City Bistro Culture</span>
          </div>
          
          <h2 className="story-editorial-title font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-[#1E221B] tracking-tight">
            COZY CORNERS &amp; CULTURE
          </h2>
          
          <p className="text-sm sm:text-base text-[#2B3526]/80 leading-relaxed">
            Maison was created as an escape from the city rush. An intimate space designed for lingering
            glances, warm conversations, and unhurried meals beneath the balcony shadows.
          </p>
        </div>

        {/* THREE RETRO FRAMED PHOTOGRAPHIC VIGNETTES */}
        <div className="story-frames-container grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Card 1: The First Sizzle / Wood-Fired Oven */}
          <div className="story-polaroid-frame bg-[#F8F5EE] p-5 rounded-lg retro-border hover:-translate-y-1.5 transition-transform duration-200">
            <div className="aspect-4/3 rounded overflow-hidden relative border border-[#2B3526]/20 group">
              <img
                src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80"
                alt="Wood-fired oven hearth blister"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider text-[#E29938] font-bold px-2 py-0.5 rounded bg-black/60">
                MOMENT 01 · 450°C
              </div>
              <div className="absolute bottom-3 left-3 right-3 space-y-0.5 z-10 text-[#F8F5EE]">
                <div className="font-serif text-lg font-bold">The Hearth Blister</div>
                <div className="text-[11px] text-[#DDD3C1]">Charred Neapolitan air bubbles rising in the wood-fired dome.</div>
              </div>
            </div>
            <div className="pt-4 text-center">
              <div className="font-serif font-bold text-base text-[#1E221B]">The Wood-Fired Craft</div>
              <p className="text-xs text-[#2B3526]/75 mt-1">Fermented dough shaped by hand with San Marzano tomatoes.</p>
            </div>
          </div>

          {/* Card 2: The Courtyard Balcony Level */}
          <div className="story-polaroid-frame bg-[#F8F5EE] p-5 rounded-lg retro-border-olive hover:-translate-y-1.5 transition-transform duration-200">
            <div className="aspect-4/3 rounded overflow-hidden relative border border-[#CCA059]/30 group">
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e2522d4282d?auto=format&fit=crop&w=800&q=80"
                alt="Venetian and Parisian style courtyard balcony passage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider text-[#CCA059] font-bold px-2 py-0.5 rounded bg-black/60">
                MOMENT 02 · AMBIANCE
              </div>
              <div className="absolute bottom-3 left-3 right-3 space-y-0.5 z-10 text-[#F8F5EE]">
                <div className="font-serif text-lg font-bold">The Balcony Glow</div>
                <div className="text-[11px] text-[#DDD3C1]">Wrought iron railings framed with trailing creepers.</div>
              </div>
            </div>
            <div className="pt-4 text-center">
              <div className="font-serif font-bold text-base text-[#1E221B]">The Courtyard Passage</div>
              <p className="text-xs text-[#2B3526]/75 mt-1">A two-story Parisian trompe-l’œil tucked inside Karachi.</p>
            </div>
          </div>

          {/* Card 3: The Evening Espresso & Tiramisù / Fresh Brownies */}
          <div className="story-polaroid-frame bg-[#F8F5EE] p-5 rounded-lg retro-border-terracotta hover:-translate-y-1.5 transition-transform duration-200">
            <div className="aspect-4/3 rounded overflow-hidden relative border border-[#C85A32]/30 group">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
                alt="Barista extracting specialty espresso on La Marzocco"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider text-[#E29938] font-bold px-2 py-0.5 rounded bg-black/60">
                MOMENT 03 · DOLCI &amp; COFFEE
              </div>
              <div className="absolute bottom-3 left-3 right-3 space-y-0.5 z-10 text-[#F8F5EE]">
                <div className="font-serif text-lg font-bold">The Golden Pour</div>
                <div className="text-[11px] text-[#DDD3C1]">Pulling double shots over mascarpone and hot fudgy brownies.</div>
              </div>
            </div>
            <div className="pt-4 text-center">
              <div className="font-serif font-bold text-base text-[#1E221B]">The Evening Ritual</div>
              <p className="text-xs text-[#2B3526]/75 mt-1">Single origin espresso paired with fresh chocolate pastries.</p>
            </div>
          </div>

        </div>

        {/* SECTION 2: "BREWING WARM MOMENTS" EDITORIAL HERO (Referencing image_2) */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-2xl bg-[#1E221B] text-[#F8F5EE] retro-border-cream relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2B3526] text-[#CCA059] text-xs font-mono uppercase">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Our Architectural Philosophy</span>
              </div>

              <h3 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-[#F8F5EE] tracking-tight leading-tight">
                BREWING WARM<br />
                <span className="text-[#E29938] italic font-normal">MOMENTS</span>
              </h3>

              <p className="text-sm sm:text-base text-[#DDD3C1]/85 leading-relaxed">
                Maison was born from a desire to bring the charm of historic European backstreets to Karachi.
                At Habitt City on Tipu Sultan Road, we hand-forged the iron balcony railings, selected warm milk-glass
                globe chandeliers, and planted climbing creepers so you can savor real Italian simplicity right in the heart of Sindh.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#CCA059]">
                <span>01. ZERO ARTIFICIAL PRESERVATIVES</span>
                <span>·</span>
                <span>02. 48-HR NATURAL FERMENTATION</span>
                <span>·</span>
                <span>03. AUTHENTIC LOMBARDY RECIPES</span>
              </div>

            </div>

            {/* Crest & Stamp Box */}
            <div className="lg:col-span-5 bg-[#2B3526] p-8 rounded-xl border border-[#CCA059]/40 flex flex-col items-center text-center space-y-4">
              <MaisonCrestSvg className="w-20 h-20 text-[#CCA059]" />
              <div className="font-serif font-black text-2xl text-[#F8F5EE]">
                MAISON KARACHI
              </div>
              <p className="text-xs text-[#DDD3C1]/80 leading-relaxed font-sans">
                "Where slow conversations linger, fresh mozzarella melts over wood flames,
                and every evening feels like a Roman holiday."
              </p>
              <div className="w-full pt-4 border-t border-white/10 text-[11px] font-mono text-[#E29938] uppercase">
                HABITT CITY · TIPU SULTAN ROAD
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
