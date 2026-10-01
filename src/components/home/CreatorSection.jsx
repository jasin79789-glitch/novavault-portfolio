import React from 'react';
import { Code2, Terminal, Cpu, Globe, ArrowUpRight, Sparkles } from 'lucide-react';

export const CreatorSection = () => {
  const STACK_ITEMS = [
    { name: 'Three.js & WebGL', role: 'Interactive 3D graphics & GLSL particle shaders' },
    { name: 'React 18 & Vite', role: 'Ultra-fast modular single page client architecture' },
    { name: 'Tailwind CSS', role: 'Zero-overhead glassmorphism & responsive systems' },
    { name: 'Gemini AI API', role: 'LLM agents & autonomous digital concierge logic' },
    { name: 'Supabase & Firebase', role: 'Serverless BaaS, real-time data & secure buckets' },
    { name: 'Web Audio API', role: 'DSP synthesizers, FFT spectrum visualizers' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Creator Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel p-8 rounded-3xl border border-white/10 shadow-glass overflow-hidden group">
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-neon/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-cyan-neon/40 shadow-neon-cyan/30">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Muhammad Abdullah"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black" />
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white">Muhammad Abdullah</h3>
                  <p className="text-xs text-cyan-neon font-mono mt-1">
                    Digital Systems Engineer & Creative Technologist
                  </p>
                </div>

                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  Passionate about pushing browser capabilities to their absolute limits. NovaVault serves as an
                  interactive archive of experimental WebGL systems, utility applications, generative audio synthesizers,
                  and production design systems built for the open web.
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>LOCATION: GLOBAL REMOTE</span>
                  <span className="text-emerald-400">STATUS: OPEN FOR CONTRACTS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Architecture Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-violet-electric">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURAL STACK</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
              Crafted at the Intersection of <br />
              <span className="bg-gradient-to-r from-cyan-neon to-violet-electric bg-clip-text text-transparent">
                Design Intelligence & Precision Code
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Every asset in this vault adheres strictly to rigorous UI/UX standards: zero-layout-shift (CLS &lt; 0.1),
              accessible 60 FPS WebGL rendering, mobile-first responsiveness, and immediate zero-friction client distribution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {STACK_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass-panel border border-white/5 hover:border-cyan-neon/30 transition-all space-y-1"
                >
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light pl-3.5">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
