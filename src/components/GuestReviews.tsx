import React from 'react';
import { GUEST_REVIEWS } from '../data/bistroData';
import { Star, Quote, Heart } from 'lucide-react';

export const GuestReviews: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F5EE] text-[#1E221B] border-b border-[#2B3526]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C85A32] font-bold">
            <Heart className="w-3.5 h-3.5 fill-[#C85A32]" />
            <span>Maison Testimonials</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#1E221B] tracking-tight">
            WALL OF LOVE
          </h2>
          <p className="text-sm sm:text-base text-[#2B3526]/75">
            What our guests across Karachi are saying about the courtyard balconies and wood-fired recipes.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUEST_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#F2ECE0] retro-border flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#E29938]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#2B3526] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Favorite Dish */}
              <div className="pt-3 border-t border-[#2B3526]/10 space-y-1">
                <div className="font-serif font-bold text-sm text-[#1E221B] flex items-center justify-between">
                  <span>{rev.name}</span>
                  <span className="text-[10px] font-mono text-[#C85A32]">{rev.date}</span>
                </div>
                <div className="text-[11px] text-[#2B3526]/70">
                  {rev.role}
                </div>
                <div className="text-[10px] font-mono text-[#2B3526] font-semibold pt-1">
                  FAVORITE: <span className="text-[#C85A32]">{rev.favoriteDish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
