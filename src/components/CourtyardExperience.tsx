import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COURTYARD_ZONES } from '../data/bistroData';
import { WroughtIronBalconySvg, VineCreepersSvg, MaisonCrestSvg } from './BalconyMotifSvg';
import {
  Sparkles,
  Compass,
  Moon,
  Coffee,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  Flame,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoTrack {
  id: string;
  youtubeId: string;
  title: string;
  category: 'coffee' | 'brownie';
  subtitle: string;
  chef: string;
  duration: string;
}

const VIDEO_PLAYLIST: VideoTrack[] = [
  {
    id: 'vid-cinematic-coffee-craft',
    youtubeId: 'hN9mgsNWZrU',
    title: 'Cinematic Coffee Craft & Espresso Barista B-Roll',
    category: 'coffee',
    subtitle: 'Grinding fresh roast, La Marzocco portafilter extraction, and artisan coffee crafting',
    chef: 'Maison Barista Station',
    duration: '02:30',
  },
  {
    id: 'vid-brownie-baking',
    youtubeId: 'B6Ewo5WuYuk',
    title: 'Chef Baking Fudgy Dark Chocolate Brownies',
    category: 'brownie',
    subtitle: 'Melting 70% Belgian chocolate, folding batter, and fresh oven bake',
    chef: 'Chef Frank & Pastry Kitchen',
    duration: '11:42',
  },
  {
    id: 'vid-coffee-latte-art',
    youtubeId: 'SiefJJv-Qho',
    title: 'Barista Espresso Extraction & Latte Art Pour',
    category: 'coffee',
    subtitle: 'Steaming silky microfoam and pouring delicate rosettas',
    chef: 'Head Barista Marco & Team',
    duration: '04:18',
  },
];

export const CourtyardExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lightRayRef = useRef<HTMLDivElement | null>(null);
  const vineShadowRef = useRef<HTMLDivElement | null>(null);
  const alleyCanvasRef = useRef<HTMLDivElement | null>(null);

  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const currentVideo = VIDEO_PLAYLIST[currentVideoIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light rays and vine shadows sliding across the frame on scroll
      if (lightRayRef.current && sectionRef.current) {
        gsap.fromTo(
          lightRayRef.current,
          { xPercent: -30, opacity: 0.35, rotate: -15 },
          {
            xPercent: 40,
            opacity: 0.85,
            rotate: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.5,
            },
          }
        );
      }

      if (vineShadowRef.current && sectionRef.current) {
        gsap.fromTo(
          vineShadowRef.current,
          { yPercent: -20, xPercent: 10 },
          {
            yPercent: 30,
            xPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }

      // Title & Cards entrance animation
      gsap.from('.courtyard-anim-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeZone = COURTYARD_ZONES[activeZoneIndex];

  // Construct looping YouTube embed URL with autoplay enabled
  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&mute=${
    isMuted ? '1' : '0'
  }&loop=1&playlist=${currentVideo.youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <section
      id="courtyard"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#1A2218] text-[#F8F5EE] overflow-hidden border-b border-[#2B3526]"
    >
      {/* Dynamic Animated Light Rays (Sliding on GSAP Scroll) */}
      <div
        ref={lightRayRef}
        className="absolute -top-32 -left-32 w-[600px] h-[900px] pointer-events-none z-10 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(226, 153, 56, 0.45) 0%, rgba(200, 90, 50, 0.2) 45%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Dynamic Animated Vine Shadows (Sliding on GSAP Scroll) */}
      <div
        ref={vineShadowRef}
        className="absolute top-10 right-0 pointer-events-none z-10 opacity-30 select-none"
      >
        <VineCreepersSvg className="w-96 h-96 scale-150 text-[#C85A32]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="courtyard-anim-title inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2B3526] border border-[#CCA059]/30 text-[#CCA059] text-xs font-mono uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5 text-[#E29938]" />
            <span>Habitt City Nightfall Experience</span>
          </div>

          <h2 className="courtyard-anim-title font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-[#F8F5EE] tracking-tight leading-tight">
            STREETS OF ITALY,<br />
            <span className="text-[#E29938] italic font-normal">HEART OF KARACHI</span>
          </h2>

          <p className="courtyard-anim-title text-base sm:text-lg text-[#DDD3C1]/85 leading-relaxed">
            Step through the entrance at Habitt City and discover a bustling Italian cobblestone alleyway.
            Flanked by two stories of neoclassical residential balconies, suspended glowing globe chandeliers,
            and our open kitchen where chefs pull specialty espressos and bake warm fudgy brownies.
          </p>
        </div>

        {/* 🎬 CONTINUOUS ON-SCREEN VIDEO PLAYER: CHEF MAKING COFFEES & BAKING BROWNIES */}
        <div className="mb-16 rounded-2xl overflow-hidden retro-border-cream bg-[#161D14] border border-[#CCA059]/40 shadow-2xl">
          
          {/* Top Video Header Bar with YouTube TV styling */}
          <div className="p-4 sm:p-5 bg-[#20291D] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              {/* YouTube Style LIVE Indicator */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#C85A32] text-white text-[11px] font-mono font-bold tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>YOUTUBE BROADCAST</span>
              </div>

              <div>
                <div className="font-serif font-bold text-base text-[#F8F5EE] flex items-center gap-2">
                  <span>Maison Kitchen Cam: {currentVideo.title}</span>
                </div>
                <div className="text-xs text-[#DDD3C1]/75 font-mono">
                  {currentVideo.subtitle} · Featuring {currentVideo.chef}
                </div>
              </div>
            </div>

            {/* Video Switcher Tabs (Coffee vs Brownies) */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {VIDEO_PLAYLIST.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => setCurrentVideoIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    currentVideoIndex === idx
                      ? 'bg-[#E29938] text-[#1E221B] font-bold shadow-md'
                      : 'bg-[#161D14] text-[#DDD3C1] border border-white/10 hover:border-white/30'
                  }`}
                >
                  {vid.category === 'coffee' ? (
                    <Coffee className="w-3.5 h-3.5 text-[#C85A32]" />
                  ) : (
                    <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                  )}
                  <span>{vid.category === 'coffee' ? 'Coffee Machine' : 'Baking Brownies'}</span>
                </button>
              ))}

              {/* Sound Toggle Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isMuted
                    ? 'bg-[#161D14] text-[#DDD3C1] border-white/10 hover:bg-white/10'
                    : 'bg-[#C85A32] text-white border-[#C85A32]'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Audio On'}</span>
              </button>
            </div>

          </div>

          {/* YouTube Video Player Embed Container (16:9 Aspect Ratio) */}
          <div className="relative w-full aspect-16/9 bg-black overflow-hidden group">
            <iframe
              key={`${currentVideo.youtubeId}-${isMuted}`}
              src={embedUrl}
              title={currentVideo.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Ambient Watermark / Attribution */}
            <div className="absolute bottom-3 right-3 pointer-events-none z-10 px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-[#E29938] border border-white/10 hidden sm:block">
              MAISON KARACHI · LIVE ESPRESSO &amp; BROWNIE OVEN
            </div>
          </div>

          {/* Video Footer Info Bar */}
          <div className="p-4 sm:p-5 bg-[#20291D] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#DDD3C1]/80 gap-3 font-mono">
            <div className="flex items-center gap-4">
              <span>⏱️ Playing continuously on loop</span>
              <span>·</span>
              <span className="text-[#E29938]">1080p Full HD Stream</span>
              <span>·</span>
              <span>Habitt City Kitchen Live Feed</span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#E29938] hover:underline"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* FULL-WIDTH SCROLL-TRIGGERED ARCHITECTURAL COURTYARD SHOWCASE WITH REAL PHOTOGRAPHY */}
        <div
          ref={alleyCanvasRef}
          className="relative rounded-2xl overflow-hidden retro-border-cream bg-[#242D21] border border-[#CCA059]/30 p-6 sm:p-10 mb-16 shadow-2xl"
        >
          {/* Faux Skylight Glass Ceiling Motif */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-sky-950/40 via-emerald-950/20 to-transparent flex justify-around opacity-40 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-[#CCA059]/40 transform rotate-12"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
            
            {/* Visual Courtyard Architecture Showcase with Real Cafe & Balcony Photos */}
            <div className="lg:col-span-7 bg-[#1A2218]/90 rounded-xl p-6 border border-white/10 relative overflow-hidden space-y-6">
              
              {/* Top Bar inside graphic */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#E29938] animate-ping" />
                  <span className="font-mono text-xs uppercase text-[#E29938] tracking-widest font-semibold">
                    COURTYARD ATRIUM · LIVE VIBE
                  </span>
                </div>
                <div className="text-xs font-mono text-[#DDD3C1]/70">
                  AMBIENT 24°C · EVENING SEATING
                </div>
              </div>

              {/* REAL PHOTOGRAPHY SHOWCASE (Balconies, Cobblestone Alley, Dining Tables) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Photo 1: Upper Neoclassical Balcony Facades */}
                <div className="rounded-xl overflow-hidden retro-border bg-[#1E251C] group relative">
                  <div className="aspect-4/3 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                      alt="Italian neoclassical residential balconies with wrought iron and green creepers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                      <span className="text-[10px] font-mono uppercase text-[#E29938] font-bold block">
                        LEVEL II BALCONIES
                      </span>
                      <span className="font-serif font-bold text-sm text-[#F8F5EE]">
                        Wrought Iron &amp; Ivy Creepers
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#1E251C]">
                    <WroughtIronBalconySvg className="w-full h-5 text-[#CCA059]" color="#CCA059" />
                  </div>
                </div>

                {/* Photo 2: Illuminated Night Courtyard & Bistro Dining */}
                <div className="rounded-xl overflow-hidden retro-border-terracotta bg-[#1E251C] group relative">
                  <div className="aspect-4/3 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                      alt="Illuminated bistro alleyway with warm hanging chandeliers and cane seating"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                      <span className="text-[10px] font-mono uppercase text-[#E29938] font-bold block">
                        COBBLESTONE ALLEYWAY
                      </span>
                      <span className="font-serif font-bold text-sm text-[#F8F5EE]">
                        Warm Globe Chandeliers
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#1E251C] flex items-center justify-between text-[11px] font-mono text-[#DDD3C1]/80">
                    <span>French Cane Chairs</span>
                    <span className="text-[#C85A32] font-bold">HABITT CITY</span>
                  </div>
                </div>

              </div>

              {/* Three Captions directly responding to user prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded bg-[#242D21]/80 border border-white/5 text-center">
                  <div className="text-xs font-semibold text-[#E29938]">Romantic Balconies</div>
                  <div className="text-[11px] text-[#DDD3C1]/70">Neoclassical Facades</div>
                </div>
                <div className="p-2.5 rounded bg-[#242D21]/80 border border-white/5 text-center">
                  <div className="text-xs font-semibold text-[#E29938]">Warm Globe Lights</div>
                  <div className="text-[11px] text-[#DDD3C1]/70">Parisian Chandelier Glow</div>
                </div>
                <div className="p-2.5 rounded bg-[#242D21]/80 border border-white/5 text-center">
                  <div className="text-xs font-semibold text-[#E29938]">Ambient Seating</div>
                  <div className="text-[11px] text-[#DDD3C1]/70">Cane Bistro Chairs</div>
                </div>
              </div>

            </div>

            {/* Interactive Zone Explorer Switcher */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCA059]">
                  <Compass className="w-4 h-4 text-[#E29938]" />
                  <span>Interactive Zone Guide</span>
                </div>
                <span className="text-xs font-mono text-[#DDD3C1]/60">0{activeZoneIndex + 1} / 03</span>
              </div>

              <div className="space-y-3">
                {COURTYARD_ZONES.map((zone, idx) => (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border cursor-pointer ${
                      activeZoneIndex === idx
                        ? 'bg-[#F8F5EE] text-[#1E221B] border-[#E29938] shadow-lg scale-[1.02]'
                        : 'bg-[#1E251C] text-[#DDD3C1] border-white/10 hover:border-white/30 hover:bg-[#242D21]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-base">
                        {zone.title}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          activeZoneIndex === idx
                            ? 'bg-[#C85A32] text-white font-bold'
                            : 'bg-white/10 text-[#DDD3C1]'
                        }`}
                      >
                        {zone.tag}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${activeZoneIndex === idx ? 'text-[#2B3526]' : 'text-[#DDD3C1]/70'}`}>
                      {zone.subtitle}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active Zone Detail Showcase */}
              <div className="p-5 rounded-xl bg-[#242D21] border border-[#CCA059]/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E29938]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ARCHITECTURAL INSIGHT</span>
                </div>
                <p className="text-xs text-[#DDD3C1] leading-relaxed">
                  {activeZone.description}
                </p>
                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                  {activeZone.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-[#1A2218] text-[#CCA059] border border-[#CCA059]/20"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
