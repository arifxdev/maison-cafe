import React from 'react';
import { BISTRO_INFO } from '../data/bistroData';
import { MaisonCrestSvg, WroughtIronBalconySvg, VineCreepersSvg, VintageStampMark } from './BalconyMotifSvg';
import { MagneticButton } from './MagneticButton';
import { MapPin, Phone, Clock, Instagram, Send, Navigation, ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onOpenReservation: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenReservation }) => {
  return (
    <footer id="location" className="bg-[#1A2218] text-[#F8F5EE] relative overflow-hidden">
      
      {/* Decorative Wrought Iron Balcony pattern atop footer */}
      <div className="w-full h-8 opacity-25">
        <WroughtIronBalconySvg color="#CCA059" />
      </div>

      {/* Trailing Vine Creepers on corner */}
      <div className="absolute top-8 right-4 pointer-events-none opacity-20">
        <VineCreepersSvg className="w-64 h-64" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

        {/* HIGH-CONTRAST CALL TO ACTION & INSTAGRAM FEED SHOWCASE */}
        <div className="rounded-2xl bg-[#242D21] retro-border-cream p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1A2218] text-[#E29938] text-xs font-mono uppercase tracking-wider">
                <Instagram className="w-3.5 h-3.5 text-[#E29938]" />
                <span>Follow Our Story Online</span>
              </div>

              <h3 className="font-serif font-black text-3xl sm:text-5xl text-[#F8F5EE] tracking-tight">
                FOLLOW <span className="text-[#E29938] italic font-normal">@MAISON.PAKISTAN</span>
              </h3>

              <p className="text-sm sm:text-base text-[#DDD3C1]/85 leading-relaxed">
                Watch fresh wood-fired sourdough blister in real-time, catch evening balcony acoustic sets,
                and tag your courtyard moments with <strong className="text-[#F8F5EE]">#MaisonKarachi</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <MagneticButton
                  asLink
                  href="https://instagram.com/maison.pakistan"
                  className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-[#1E221B] bg-[#E29938] hover:bg-[#D48D2B] rounded-md retro-border flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Open Instagram Feed</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticButton>

                <MagneticButton
                  onClick={onOpenReservation}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-[#F8F5EE] bg-[#C85A32] hover:bg-[#A84521] rounded-md retro-border-terracotta"
                >
                  Reserve Your Table
                </MagneticButton>
              </div>
            </div>

            {/* Instagram Interactive Feed Preview Mockup with Real Photos */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[
                {
                  title: 'Wood-Fired Burrata',
                  tag: '#BurrataBianca',
                  img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Balcony Courtyard',
                  tag: '#HabittCityKarachi',
                  img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Fresh Fettuccine',
                  tag: '#TrufflePasta',
                  img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Warm Brownies & Dolci',
                  tag: '#FudgyBrownies',
                  img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
                },
              ].map((post, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#1A2218] border border-white/10 hover:border-[#CCA059]/60 transition-all hover:scale-[1.03] cursor-pointer group"
                >
                  <div className="aspect-square rounded overflow-hidden mb-2 relative bg-black/20">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] font-mono text-white">@maison.pakistan</span>
                    </div>
                  </div>
                  <div className="font-serif font-bold text-xs text-[#F8F5EE]">
                    {post.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#CCA059]">
                    {post.tag}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* DETAILS GRID: LOCATION, TIMINGS, CONTACT, ARCHITECTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Crest */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <MaisonCrestSvg className="w-12 h-12 text-[#CCA059]" />
              <div>
                <span className="font-serif font-black text-2xl tracking-wider text-[#F8F5EE]">
                  MAISON
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-[#CCA059] uppercase">
                  BISTRO &amp; COURTYARD
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#DDD3C1]/80 leading-relaxed">
              An Italian &amp; Parisian culinary oasis located inside Habitt City on Tipu Sultan Road, Karachi.
              Every pizza dough is naturally fermented for 48 hours; all pasta ribbons rolled by hand every morning.
            </p>

            <VintageStampMark text="MAISON · TIPU SULTAN" year="ESTD. MMXXIV" />
          </div>

          {/* Col 2: Location & Address */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#CCA059] font-bold">
              VISIT US AT
            </div>
            <div className="font-serif font-bold text-lg text-[#F8F5EE]">
              Habitt City, Tipu Sultan Road
            </div>
            <p className="text-xs text-[#DDD3C1]/80 leading-relaxed">
              Plot 43-A, Block 7/8, Tipu Sultan Rd, Mohammad Ali Society, Karachi, Sindh.
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Habitt+City+Tipu+Sultan+Road+Karachi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E29938] hover:underline font-mono"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Col 3: Hours & Timings */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#CCA059] font-bold">
              OPENING HOURS
            </div>
            <div className="space-y-2 text-xs text-[#DDD3C1]/90">
              <div>
                <strong className="block text-[#F8F5EE] font-serif">Monday – Sunday</strong>
                <span>3:00 PM – 12:00 AM</span>
              </div>
              <div className="pt-1 text-[11px] text-[#CCA059] font-mono">
                *Dinner Courtyard starts at 6:30 PM
              </div>
            </div>
          </div>

          {/* Col 4: Direct Reservations & Phone */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#CCA059] font-bold">
              DIRECT RESERVATIONS
            </div>
            <div className="space-y-2">
              <a
                href={`tel:${BISTRO_INFO.phone}`}
                className="flex items-center gap-2 text-sm text-[#F8F5EE] hover:text-[#E29938] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C85A32]" />
                <span className="font-mono">{BISTRO_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/923008262476?text=Hi%20Maison,%20I%20would%20like%20to%20reserve%20a%20table%20at%20the%20Courtyard`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#DDD3C1] hover:text-[#25D366] transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: +92 300 8262476</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded bg-[#C85A32] hover:bg-[#A84521] text-white transition-colors"
              >
                Book a Courtyard Table
              </button>
            </div>
          </div>

        </div>

        {/* SUB-FOOTER */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD3C1]/60 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} MAISON (Maison Pakistan). All Rights Reserved. Habitt City, Karachi.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Tipu Sultan Road</span>
            <span>·</span>
            <span>Italian &amp; Parisian Bistro</span>
            <span>·</span>
            <span>Wood-Fired Kitchen</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
