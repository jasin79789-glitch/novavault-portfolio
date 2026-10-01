import React from 'react';

export const BrandLogo = ({ className = "w-7 h-7", showText = true, subtitle = "STUDIO" }) => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Bespoke Geometric Minimalist Vector Glyph (Enigma Style) */}
      <div className="relative flex items-center justify-center">
        <svg
          className={`${className} transition-transform duration-300 group-hover:scale-105`}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Circle Glow */}
          <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
          
          {/* Minimalist Geometric Diamond / C-Prism */}
          <path
            d="M18 4L30 18L18 32L6 18L18 4Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-neon"
          />
          <path
            d="M18 10L25 18L18 26L11 18L18 10Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          
          {/* Core Energy Pivot */}
          <circle cx="18" cy="18" r="2.5" fill="currentColor" className="text-cyan-neon" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black tracking-wider text-base text-white">
              NovaVault
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
          </div>
          {subtitle && (
            <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 uppercase -mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
