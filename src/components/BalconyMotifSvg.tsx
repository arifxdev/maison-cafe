import React from 'react';

// Wrought iron railing pattern matching image_0 & image_1 balconies
export const WroughtIronBalconySvg: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full h-12',
  color = '#1E221B',
}) => {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Top handrail */}
      <rect x="0" y="4" width="600" height="5" rx="2" fill={color} />
      <rect x="0" y="11" width="600" height="2" fill={color} opacity="0.8" />

      {/* Repeating decorative baluster units */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = 20 + i * 40;
        return (
          <g key={i}>
            {/* Vertical picket */}
            <line x1={x} y1="12" x2={x} y2="70" stroke={color} strokeWidth="2.5" />
            {/* Top decorative finial / ring */}
            <circle cx={x} cy="22" r="3" fill="none" stroke={color} strokeWidth="1.5" />
            {/* Double heart / S-scroll ornament */}
            <path
              d={`M ${x - 8} 34 C ${x - 12} 28, ${x - 4} 24, ${x} 32 C ${x + 4} 24, ${x + 12} 28, ${x + 8} 34 C ${x + 4} 40, ${x} 46, ${x} 52`}
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d={`M ${x} 52 C ${x} 58, ${x - 4} 64, ${x - 8} 60 C ${x - 12} 56, ${x - 4} 52, ${x} 60`}
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            {/* Center diamond rosette */}
            <rect
              x={x - 3}
              y="40"
              width="6"
              height="6"
              transform={`rotate(45 ${x} 43)`}
              fill={color}
            />
          </g>
        );
      })}

      {/* Bottom rail and mounting brackets */}
      <rect x="0" y="70" width="600" height="6" rx="1.5" fill={color} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={30 + i * 105} y="76" width="10" height="4" fill={color} />
      ))}
    </svg>
  );
};

// Trailing ivy creepers & vines motif
export const VineCreepersSvg: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = 'w-32 h-32',
  flipped = false,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flipped ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      {/* Main winding vine stem */}
      <path
        d="M 10 10 Q 50 30, 80 80 T 120 150 Q 150 170, 190 190"
        stroke="#2B3526"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 80 80 Q 110 60, 150 70"
        stroke="#2B3526"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 120 150 Q 90 170, 70 195"
        stroke="#2B3526"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Stylized ivy leaves */}
      <path
        d="M 35 25 C 20 15, 15 35, 30 45 C 45 40, 50 20, 35 25 Z"
        fill="#3F4F37"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 65 55 C 50 45, 50 70, 70 75 C 80 65, 80 50, 65 55 Z"
        fill="#4A5C41"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 100 85 C 85 75, 80 100, 105 105 C 115 95, 115 80, 100 85 Z"
        fill="#3F4F37"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 140 68 C 155 55, 170 70, 160 85 C 145 85, 135 75, 140 68 Z"
        fill="#55694B"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 130 145 C 115 135, 115 160, 135 165 C 145 155, 145 140, 130 145 Z"
        fill="#3F4F37"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 80 185 C 65 175, 60 198, 85 200 C 95 190, 95 175, 80 185 Z"
        fill="#4A5C41"
        stroke="#1E221B"
        strokeWidth="1"
      />
      <path
        d="M 175 185 C 160 175, 160 198, 185 200 C 195 190, 195 175, 175 185 Z"
        fill="#55694B"
        stroke="#1E221B"
        strokeWidth="1"
      />
      {/* Tiny berries / jasmine blossoms */}
      <circle cx="50" cy="38" r="2.5" fill="#E29938" />
      <circle cx="90" cy="72" r="2.5" fill="#E29938" />
      <circle cx="125" cy="130" r="2.5" fill="#E29938" />
    </svg>
  );
};

// Maison Crest / Italian Coat of Arms
export const MaisonCrestSvg: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-16 h-16',
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="54" stroke="#1E221B" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="48" stroke="#1E221B" strokeWidth="1.5" />
      {/* Wreath stalks */}
      <path
        d="M 30 70 C 26 50, 35 34, 46 26"
        stroke="#2B3526"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 90 70 C 94 50, 85 34, 74 26"
        stroke="#2B3526"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Monogram 'M' in vintage serif */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="36"
        fontWeight="800"
        fill="#C85A32"
        letterSpacing="1"
      >
        M
      </text>
      {/* Small crown / arch */}
      <path
        d="M 48 36 L 54 42 L 60 34 L 66 42 L 72 36 L 68 46 L 52 46 Z"
        fill="#CCA059"
        stroke="#1E221B"
        strokeWidth="1"
      />
      {/* Bottom ribbon */}
      <rect x="36" y="80" width="48" height="12" rx="2" fill="#2B3526" />
      <text
        x="60"
        y="89"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="7"
        fontWeight="700"
        fill="#F8F5EE"
        letterSpacing="1.5"
      >
        KARACHI
      </text>
    </svg>
  );
};

// Hanging multi-globe chandelier (matching image_0 & image_1 central features)
export const ChandelierGlobeSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-32' }) => {
  return (
    <svg
      viewBox="0 0 140 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Suspension chain */}
      <line x1="70" y1="0" x2="70" y2="45" stroke="#1E221B" strokeWidth="2.5" />
      {/* Top ornamental crown */}
      <path
        d="M 55 45 C 60 38, 80 38, 85 45 L 80 52 L 60 52 Z"
        fill="#1E221B"
      />
      {/* Main wrought iron scroll arms */}
      <path
        d="M 70 52 C 50 65, 25 80, 28 110 C 30 125, 45 125, 48 115"
        stroke="#1E221B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 70 52 C 90 65, 115 80, 112 110 C 110 125, 95 125, 92 115"
        stroke="#1E221B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 70 52 L 70 120"
        stroke="#1E221B"
        strokeWidth="2.5"
      />

      {/* Glowing Milk-Glass Globes with warm radial gradient */}
      <defs>
        <radialGradient id="globeGlowLeft" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="60%" stopColor="#FFDE82" />
          <stop offset="100%" stopColor="#E29938" />
        </radialGradient>
        <radialGradient id="globeGlowRight" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="60%" stopColor="#FFDE82" />
          <stop offset="100%" stopColor="#E29938" />
        </radialGradient>
        <radialGradient id="globeGlowCenter" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="60%" stopColor="#FFDE82" />
          <stop offset="100%" stopColor="#E29938" />
        </radialGradient>
      </defs>

      {/* Left Globe */}
      <circle cx="38" cy="118" r="14" fill="url(#globeGlowLeft)" stroke="#1E221B" strokeWidth="1.5" />
      {/* Right Globe */}
      <circle cx="102" cy="118" r="14" fill="url(#globeGlowRight)" stroke="#1E221B" strokeWidth="1.5" />
      {/* Center Globe */}
      <circle cx="70" cy="132" r="16" fill="url(#globeGlowCenter)" stroke="#1E221B" strokeWidth="1.5" />

      {/* Decorative finial drop */}
      <path d="M 68 152 L 70 162 L 72 152 Z" fill="#1E221B" />
    </svg>
  );
};

// Vintage Postal Stamp mark
export const VintageStampMark: React.FC<{ text?: string; year?: string }> = ({
  text = 'MAISON · TIPU SULTAN',
  year = 'MMXXIV',
}) => {
  return (
    <div className="inline-flex items-center gap-2 p-2 border-2 border-dashed border-[#C85A32]/60 rounded-md bg-[#F2ECE0]/80 text-[#C85A32] transform -rotate-2 select-none">
      <div className="w-8 h-8 rounded-full border border-[#C85A32] flex items-center justify-center font-serif font-black text-xs">
        M
      </div>
      <div className="text-left font-mono text-[10px] leading-tight font-bold tracking-wider uppercase">
        <div>{text}</div>
        <div className="text-[#2B3526]">{year} · HABITT CITY</div>
      </div>
    </div>
  );
};
