import React, { useState } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { ArrowDown, ArrowUpRight, Sparkles, Activity, ShieldCheck, Cpu, Play } from 'lucide-react';

export const HeroSection = ({ onExplore }) => {
  const [activeMetric, setActiveMetric] = useState('01');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const metricsData = {
    '01': { label: '60 FPS Target', desc: 'Ultra-low GPU overhead with WebGL buffer geometry shaders' },
    '02': { label: 'Zero Runtime CSS', desc: 'Pre-compiled atomic design tokens for sub-100ms first paint' },
    '03': { label: 'Client-Side Dist', desc: 'Instant browser ZIP package assembly without server queues' }
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D WebGL Fluid Canvas Layer */}
      <HeroCanvas />

      {/* Ambient background glow & atmospheric rings (Pin 1 Enigma Style) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-cyan-neon/10 via-violet-neon/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="absolute inset-0 radial-vignette pointer-events-none" />

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons (Pin 1 Enigma Layout) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-xs font-mono text-gray-300">
              <span className="w-2 h-2 rounded-full bg-cyan-neon animate-ping" />
              <span className="text-white font-medium">Muhammad Abdullah Studio</span>
              <span className="text-gray-500">•</span>
              <span className="text-cyan-neon font-mono">Creative Technologist</span>
            </div>

            {/* Display Typography */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              Tactile Digital <br />
              <span className="bg-gradient-to-r from-white via-[#E2E8F0] to-gray-400 bg-clip-text text-transparent">
                Engineering
              </span> &amp; <br />
              <span className="bg-gradient-to-r from-cyan-neon via-[#38BDF8] to-violet-electric bg-clip-text text-transparent">
                Interactive Systems
              </span>
            </h1>

            {/* Human-Crafted Creative Engineering Subtext */}
            <p className="max-w-2xl text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              Crafting bespoke browser-based 3D applications, high-performance design architecture,
              and client-side digital product releases engineered for supreme visual impact and speed.
            </p>

            {/* Action Pill Controls (Pin 1 Style) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Showcase</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href="#about"
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wide flex items-center gap-2 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Studio Philosophy</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>

            {/* Bottom Live Micro Ticker */}
            <div className="pt-6 flex items-center gap-6 text-xs font-mono text-gray-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Open for Select Contracts</span>
              </div>
              <span>•</span>
              <div>Average Response: &lt; 24h</div>
              <span className="hidden sm:inline">•</span>
              <div className="hidden sm:inline text-gray-400">Global Remote</div>
            </div>
          </div>

          {/* Right Column: Floating Bento Performance Cards (Pin 1 Style) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bento Card 1: Metric Highlight with Selector Pills */}
            <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl space-y-4 hover:border-cyan-neon/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Engine Benchmark</span>
                <Activity className="w-4 h-4 text-cyan-neon" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-4xl text-white">
                  {activeMetric === '01' ? '60 FPS' : activeMetric === '02' ? '0ms' : '100%'}
                </span>
                <span className="text-xs text-cyan-neon font-mono">
                  {activeMetric === '01' ? 'Shader Rate' : activeMetric === '02' ? 'Layout Shift' : 'Direct Client'}
                </span>
              </div>

              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {metricsData[activeMetric].desc}
              </p>

              {/* Number Switchers 01, 02, 03 (Matching Pin 1 exactly) */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                {['01', '02', '03'].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveMetric(num)}
                    className={`w-9 h-9 rounded-full text-xs font-mono transition-all ${
                      activeMetric === num
                        ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/40 scale-105'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Card 2: Interactive Audio / Wave Widget (Pin 1 "Explore Your Data" style) */}
            <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-between gap-4 group">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Interactive Audio DSP</span>
                <h4 className="font-semibold text-sm text-white">Frequency Synthesizer</h4>
                <div className="flex items-end gap-1 h-5 pt-1">
                  {[40, 75, 50, 90, 60, 100, 45, 80, 65].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-cyan-neon/80 rounded-full transition-all duration-300"
                      style={{
                        height: isPlayingPreview ? `${h}%` : '30%',
                        animation: isPlayingPreview ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.1}s` : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-cyan-neon text-white hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xl flex-shrink-0"
                title="Toggle DSP Audio Preview"
              >
                <Play className={`w-5 h-5 ml-0.5 ${isPlayingPreview ? 'text-black fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
