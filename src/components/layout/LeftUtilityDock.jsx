import React, { useState } from 'react';
import { Compass, Sparkles, Volume2, VolumeX, ArrowUp, Shield } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';

export const LeftUtilityDock = ({ onGoAdmin }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-5 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Quick Section Anchor */}
      <button
        onClick={() => scrollToSection('showcase')}
        className="p-2.5 rounded-xl text-gray-400 hover:text-cyan-neon hover:bg-white/5 transition-all group relative"
        title="Explore Showcase"
      >
        <Compass className="w-4 h-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-[10px] font-mono bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
          Showcase
        </span>
      </button>

      {/* GitHub Repository Link */}
      <a
        href="https://github.com/jasin79789-glitch/novavault-portfolio"
        target="_blank"
        rel="noreferrer"
        className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group relative"
        title="GitHub Source"
      >
        <GithubIcon className="w-4 h-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-[10px] font-mono bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
          GitHub Repo
        </span>
      </a>

      {/* Ambient Audio Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="p-2.5 rounded-xl text-gray-400 hover:text-cyan-neon hover:bg-white/5 transition-all group relative"
        title={soundEnabled ? "Mute Ambient Audio" : "Play Ambient Atmosphere"}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-neon" /> : <VolumeX className="w-4 h-4" />}
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-[10px] font-mono bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
          {soundEnabled ? "Sound ON" : "Sound OFF"}
        </span>
      </button>

      <div className="w-4 h-[1px] bg-white/10 my-1" />

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group relative"
        title="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-[10px] font-mono bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
          Top
        </span>
      </button>

      {/* Discrete, Subtle Secret Admin Trigger (unobtrusive dot) */}
      <button
        onClick={onGoAdmin}
        className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-cyan-neon transition-colors mt-1"
        title="Console Portal"
      />
    </aside>
  );
};
