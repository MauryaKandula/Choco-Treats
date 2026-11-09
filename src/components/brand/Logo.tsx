import React from 'react';

interface LogoProps {
  variant?: 'wordmark' | 'seal' | 'compact' | 'badge';
  brandName?: 'ChocoTreat' | 'Choco Treats';
  theme?: 'light' | 'dark' | 'cream';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  variant = 'wordmark',
  brandName = 'ChocoTreat',
  theme = 'cream',
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#FFF8F0' : '#442719';
  const secondaryColor = isDark ? '#D7BD96' : '#885137';
  const accentGold = '#C99C76';
  const heartColor = isDark ? '#D8BBB1' : '#885137';

  // Compact icon / mark for mobile top bar or favicon
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chocolate square with melted corner */}
          <rect x="4" y="8" width="28" height="24" rx="4" fill={primaryColor} />
          {/* Chocolate segments */}
          <rect x="7" y="11" width="10" height="8" rx="1.5" fill={secondaryColor} />
          <rect x="19" y="11" width="10" height="8" rx="1.5" fill={secondaryColor} />
          <rect x="7" y="21" width="10" height="8" rx="1.5" fill={secondaryColor} />
          <rect x="19" y="21" width="10" height="8" rx="1.5" fill={secondaryColor} />
          {/* Sweet heart accent */}
          <path
            d="M28 8C26.5 6 23.5 6.5 23.5 8.5C23.5 11 28 13.5 28 13.5C28 13.5 32.5 11 32.5 8.5C32.5 6.5 29.5 6 28 8Z"
            fill="#D8BBB1"
          />
        </svg>
        <span
          className="text-xl font-bold tracking-tight font-serif-luxury whitespace-nowrap"
          style={{ color: primaryColor }}
        >
          {brandName}
        </span>
      </div>
    );
  }

  // Circular Seal / Stamp inspired by Image 2 (scalloped border, melted chocolate flow, heart)
  if (variant === 'seal' || variant === 'badge') {
    const sealSizes = {
      sm: 'w-20 h-20',
      md: 'w-32 h-32',
      lg: 'w-44 h-44',
      xl: 'w-56 h-56',
    };

    return (
      <div className={`relative inline-block ${sealSizes[size]} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Scalloped Border */}
          <circle cx="100" cy="100" r="92" stroke={primaryColor} strokeWidth="6" strokeDasharray="8 6" opacity="0.3" />
          <circle cx="100" cy="100" r="86" stroke={primaryColor} strokeWidth="4" />
          <circle cx="100" cy="100" r="80" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Background tint */}
          <circle cx="100" cy="100" r="78" fill={isDark ? '#281711' : '#FAF1E6'} />

          {/* Chocolate Block with Dripping Ganache */}
          <g transform="translate(68, 38)">
            {/* Chocolate Bar 3D blocks */}
            <path
              d="M12 8L36 0L54 9L30 18L12 8Z"
              fill={secondaryColor}
            />
            <path
              d="M12 8L30 18V26L12 16V8Z"
              fill={primaryColor}
            />
            <path
              d="M30 18L54 9V17L30 26V18Z"
              fill={primaryColor}
              opacity="0.9"
            />
            {/* Melting Ganache Wave beneath */}
            <path
              d="M2 19C14 17 22 26 34 22C46 18 56 25 64 22C66 28 62 33 54 34C44 35 40 28 32 30C24 32 20 38 10 36C4 35 0 27 2 19Z"
              fill={primaryColor}
            />
            {/* Splash droplet */}
            <circle cx="58" cy="10" r="2.5" fill={primaryColor} />
            <circle cx="64" cy="16" r="1.5" fill={primaryColor} />
          </g>

          {/* Typography */}
          <text
            x="100"
            y="126"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="26"
            fontWeight="700"
            fontStyle="italic"
            fill={primaryColor}
          >
            {brandName}
          </text>

          {/* Swash ribbon line */}
          <path
            d="M50 138C75 146 125 146 150 138"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Mini Hearts */}
          <path
            d="M44 116C42 113 38 114 38 116C38 119 44 122 44 122C44 122 50 119 50 116C50 114 46 113 44 116Z"
            fill={heartColor}
          />
          <path
            d="M156 116C154 113 150 114 150 116C150 119 156 122 156 122C156 122 162 119 162 116C162 114 158 113 156 116Z"
            fill={heartColor}
          />

          {/* Circular Sub-label */}
          <text
            x="100"
            y="162"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="8.5"
            letterSpacing="2.5"
            fontWeight="600"
            fill={secondaryColor}
          >
            HANDMADE · ARTISAN
          </text>
        </svg>
      </div>
    );
  }

  // Primary Wordmark inspired by Image 1 (Chocolate bar illustration on top, swash ribbon, heart, tagline)
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 110"
        className="w-full max-w-[280px] sm:max-w-[320px] h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Chocolate Bar Illustration */}
        <g transform="translate(108, 0)">
          {/* Isometric chocolate bar squares */}
          <path
            d="M24 18L54 4L78 14L48 28L24 18Z"
            fill={accentGold}
          />
          <path
            d="M24 18L48 28V38L24 28V18Z"
            fill={secondaryColor}
          />
          <path
            d="M48 28L78 14V24L48 38V28Z"
            fill={primaryColor}
          />
          {/* Bar division groove */}
          <path
            d="M36 23L66 9"
            stroke="#FAF1E6"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Flowing ribbon wave */}
          <path
            d="M0 34C18 30 38 42 62 36C82 30 96 40 106 38"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Sweet chocolate heart */}
          <path
            d="M92 18C89 14 83 15 83 19C83 24 92 29 92 29C92 29 101 24 101 19C101 15 95 14 92 18Z"
            fill="none"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Brand Name Wordmark */}
        <text
          x="160"
          y="76"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="48"
          fontWeight="700"
          letterSpacing="-0.5"
          fill={primaryColor}
        >
          {brandName}
        </text>

        {/* Subtle decorative bottom swash */}
        <path
          d="M68 86C110 94 210 94 252 86"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Tagline */}
        {(showTagline || true) && (
          <g transform="translate(0, 102)">
            <line x1="38" y1="0" x2="68" y2="0" stroke={secondaryColor} strokeWidth="1.2" opacity="0.6" />
            <text
              x="160"
              y="3"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="10"
              letterSpacing="2.8"
              fontWeight="500"
              fill={secondaryColor}
            >
              A LITTLE LUXURY IN EVERY BITE
            </text>
            <line x1="252" y1="0" x2="282" y2="0" stroke={secondaryColor} strokeWidth="1.2" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};
