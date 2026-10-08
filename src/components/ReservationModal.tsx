import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types';
import { MaisonCrestSvg } from './BalconyMotifSvg';
import { Calendar, Clock, Users, MapPin, CheckCircle, Share2, Phone } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: 2,
    seatingArea: 'courtyard-alley',
    specialRequests: '',
  });

  const [confirmedTicket, setConfirmedTicket] = useState<{
    code: string;
    data: ReservationData;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C85A32', '#E29938', '#2B3526', '#CCA059'],
    });

    const refCode = `MSN-KHI-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedTicket({
      code: refCode,
      data: { ...formData },
    });
  };

  const handleReset = () => {
    setConfirmedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#F8F5EE] rounded-2xl retro-border overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#2B3526] text-[#F8F5EE] p-6 flex items-center justify-between border-b border-[#CCA059]/40">
          <div className="flex items-center gap-3">
            <MaisonCrestSvg className="w-10 h-10 text-[#CCA059]" />
            <div>
              <h3 className="font-serif font-black text-xl text-[#F8F5EE]">
                Courtyard Table Reservation
              </h3>
              <p className="text-xs text-[#DDD3C1]/80 font-mono">
                HABITT CITY · TIPU SULTAN ROAD, KARACHI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A2218] text-[#DDD3C1] hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!confirmedTicket ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ausaf Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-sm focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-sm focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C85A32]" />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-xs font-mono focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C85A32]" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-xs font-mono focus:outline-none focus:border-[#C85A32]"
                  >
                    <option value="15:30">3:30 PM (Late Lunch / Tea)</option>
                    <option value="17:00">5:00 PM (Sunset Aperitivo)</option>
                    <option value="18:30">6:30 PM (Early Dinner)</option>
                    <option value="20:00">8:00 PM (Courtyard Prime)</option>
                    <option value="21:30">9:30 PM (Balcony Ambience)</option>
                    <option value="22:45">10:45 PM (Late Night Supper)</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#C85A32]" />
                    <span>Party Size *</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-xs font-mono focus:outline-none focus:border-[#C85A32]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Preference */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C85A32]" />
                  <span>Courtyard Area Preference</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'courtyard-alley', label: 'Cobblestone Alley', sub: 'Under globe chandeliers' },
                    { id: 'balcony-upper', label: 'Balcony View', sub: 'Facing iron railings' },
                    { id: 'indoor-nook', label: 'Candlelit Nook', sub: 'Quiet banquette' },
                  ].map(area => (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        formData.seatingArea === area.id
                          ? 'border-[#C85A32] bg-[#F2ECE0] shadow-sm'
                          : 'border-[#2B3526]/15 bg-white/40 hover:bg-[#F2ECE0]'
                      }`}
                    >
                      <div className="font-serif font-bold text-[#1E221B]">{area.label}</div>
                      <div className="text-[10px] text-[#2B3526]/70">{area.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#2B3526] font-semibold">
                  Special Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Anniversary celebration, birthday cake request, quiet corner"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#2B3526]/20 bg-[#F2ECE0] text-[#1E221B] text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-[#C85A32] hover:bg-[#A84521] text-[#F8F5EE] font-serif font-bold text-base tracking-wide retro-border-terracotta cursor-pointer transition-colors shadow-md"
                >
                  Confirm Courtyard Reservation
                </button>
                <p className="text-[11px] text-[#2B3526]/60 text-center font-mono mt-2">
                  No advance deposit required · Complimentary 15-minute table grace period
                </p>
              </div>

            </form>
          ) : (
            /* CONFIRMED RESERVATION PASS TICKET */
            <div className="space-y-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-[#2B3526] text-[#CCA059] shadow-inner">
                <CheckCircle className="w-8 h-8 text-[#CCA059]" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-black text-2xl text-[#1E221B]">
                  Table Reserved at Maison
                </h4>
                <p className="text-xs text-[#2B3526]/80 font-mono">
                  We look forward to welcoming you at Habitt City, Tipu Sultan Road.
                </p>
              </div>

              {/* Retro Perforated Boarding Pass / Ticket */}
              <div className="p-6 rounded-xl bg-[#F2ECE0] retro-border-olive text-left relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-[#2B3526]/15 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#C85A32] font-bold uppercase">
                      MAISON KARACHI PASS
                    </span>
                    <div className="font-serif font-bold text-lg text-[#1E221B]">
                      {confirmedTicket.data.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#2B3526]/70">REFERENCE</span>
                    <div className="font-mono font-bold text-sm text-[#C85A32]">
                      {confirmedTicket.code}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#2B3526]/60 block">DATE</span>
                    <strong className="text-[#1E221B]">{confirmedTicket.data.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2B3526]/60 block">TIME</span>
                    <strong className="text-[#1E221B]">{confirmedTicket.data.time}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2B3526]/60 block">PARTY</span>
                    <strong className="text-[#1E221B]">{confirmedTicket.data.guests} Guests</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2B3526]/10 text-xs flex items-center justify-between">
                  <span className="font-mono text-[#2B3526]/80 uppercase">
                    SEATING: {confirmedTicket.data.seatingArea.toUpperCase().replace('-', ' ')}
                  </span>
                  <span className="text-[10px] font-mono text-[#2B3526] font-bold">
                    HABITT CITY, KHI
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/923008262476?text=Hello%20Maison,%20I%20have%20reserved%20table%20${confirmedTicket.code}%20for%20${confirmedTicket.data.name}%20on%20${confirmedTicket.data.date}%20at%20${confirmedTicket.data.time}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-lg bg-[#25D366] text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#1eb855] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Send Ticket to WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="py-3 px-6 rounded-lg bg-[#2B3526] text-[#F8F5EE] font-medium text-xs hover:bg-[#1A2218] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
