import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Bistro' },
    { id: 'courtyard', label: 'Courtyard' },
    { id: 'menu', label: 'Menu' },
    { id: 'story', label: 'Culture' },
    { id: 'location', label: 'Habitt City' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentPercent = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollPercent(currentPercent);
      }

      // Check active section
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto">
      
      {/* Background Track Rail */}
      <div className="relative w-1 h-36 bg-[#2B3526]/15 rounded-full overflow-hidden">
        {/* Fill Indicator */}
        <div
          className="absolute top-0 left-0 w-full bg-[#C85A32] rounded-full transition-all duration-150 ease-out"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      {/* Navigation Milestone Dots */}
      <div className="flex flex-col items-center gap-2.5 py-1">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="group relative flex items-center justify-center p-1"
            title={sec.label}
            aria-label={`Jump to ${sec.label}`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeSection === sec.id
                  ? 'bg-[#C85A32] scale-125 ring-2 ring-[#C85A32]/30'
                  : 'bg-[#2B3526]/30 group-hover:bg-[#2B3526]'
              }`}
            />
            {/* Tooltip on hover */}
            <span className="absolute right-6 px-2 py-1 rounded bg-[#1E221B] text-[#F8F5EE] text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              {sec.label}
            </span>
          </a>
        ))}
      </div>

      {/* Scroll to Top Arrow Button */}
      {scrollPercent > 20 && (
        <button
          onClick={scrollToTop}
          className="w-7 h-7 rounded-full bg-[#F2ECE0] border border-[#2B3526]/20 text-[#2B3526] hover:bg-[#C85A32] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
          title="Return to Top"
          aria-label="Return to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}

    </div>
  );
};
