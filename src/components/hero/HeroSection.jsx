import React from 'react';
import { HeroCanvas } from './HeroCanvas';
import { ArrowDown, Bot, Sparkles, Terminal, Download, Layers } from 'lucide-react';

export const HeroSection = ({ onOpenAI, onExplore }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <HeroCanvas />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-neon/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-neon/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
      <div className="absolute inset-0 radial-vignette pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-neon/30 text-xs font-mono uppercase tracking-wider text-cyan-neon mb-8 shadow-neon-cyan/20 animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-cyan-neon animate-ping" />
          <span>NovaVault v2.4 • Muhammad Abdullah's Creative Lab</span>
          <span className="text-gray-500">|</span>
          <span className="text-emerald-400 font-medium">Free & Paid Assets</span>
        </div>

        {/* Display Typography */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08]">
          Engineering <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-cyan-neon via-[#38BDF8] to-violet-electric bg-clip-text text-transparent text-glow-cyan">
            Digital Horizons
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#94A3B8] font-light leading-relaxed mb-10">
          A hyper-animated vault of interactive 3D WebGL experiences, production-ready web applications,
          creative tooling, and client-side digital assets available for instant deployment.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={onExplore}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-neon to-[#0284C7] text-black font-semibold tracking-wide text-sm sm:text-base flex items-center gap-3 shadow-neon-cyan hover:shadow-[0_0_35px_rgba(0,245,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={onOpenAI}
            className="px-8 py-4 rounded-xl glass-panel hover:glass-panel-hover border border-white/10 text-white font-medium text-sm sm:text-base flex items-center gap-3 transition-all duration-300 hover:border-cyan-neon/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Bot className="w-5 h-5 text-cyan-neon animate-pulse" />
            <span>Ask AI Concierge</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-neon/15 text-cyan-neon border border-cyan-neon/30">
              Gemini
            </span>
          </button>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-neon/20 transition-colors">
            <div className="flex items-center justify-center gap-2 text-cyan-neon mb-1">
              <Download className="w-4 h-4" />
              <span className="font-display font-bold text-xl sm:text-2xl text-white">15.2k+</span>
            </div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Asset Downloads</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-neon/20 transition-colors">
            <div className="flex items-center justify-center gap-2 text-violet-electric mb-1">
              <Layers className="w-4 h-4" />
              <span className="font-display font-bold text-xl sm:text-2xl text-white">100%</span>
            </div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Client-Side Static</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-neon/20 transition-colors">
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-display font-bold text-xl sm:text-2xl text-white">60 FPS</span>
            </div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">WebGL Optimized</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-neon/20 transition-colors">
            <div className="flex items-center justify-center gap-2 text-cyan-neon mb-1">
              <Terminal className="w-4 h-4" />
              <span className="font-display font-bold text-xl sm:text-2xl text-white">Instant</span>
            </div>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Zero Config Run</p>
          </div>
        </div>
      </div>
    </section>
  );
};
