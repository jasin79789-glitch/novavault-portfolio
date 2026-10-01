import React, { useState, useEffect } from 'react';
import { Bot, Shield, Sparkles, Terminal, Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenAI, onGoAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/10 shadow-glass py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-neon/20 via-violet-neon/30 to-cyan-neon/40 border border-cyan-neon/40 flex items-center justify-center text-cyan-neon shadow-neon-cyan/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 transition-transform group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-wider text-white">
                NOVA<span className="text-cyan-neon">VAULT</span>
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Digital Asset Lab</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-300">
          <a href="#showcase" className="hover:text-cyan-neon transition-colors">
            // SHOWCASE
          </a>
          <a href="#about" className="hover:text-cyan-neon transition-colors">
            // CREATOR
          </a>
          <a href="#contact" className="hover:text-cyan-neon transition-colors">
            // INQUIRIES
          </a>
        </nav>

        {/* Action Triggers */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAI}
            className="px-3.5 py-1.5 rounded-xl glass-panel hover:glass-panel-hover border border-cyan-neon/30 text-xs font-mono text-white flex items-center gap-2 transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-neon animate-ping" />
            <Bot className="w-4 h-4 text-cyan-neon" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={onGoAdmin}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10"
            title="Admin Back-Office"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl glass-panel text-gray-400 hover:text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono text-gray-300 hover:text-cyan-neon"
          >
            // SHOWCASE
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono text-gray-300 hover:text-cyan-neon"
          >
            // CREATOR
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono text-gray-300 hover:text-cyan-neon"
          >
            // INQUIRIES
          </a>
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="flex-1 py-2.5 rounded-xl bg-cyan-neon text-black font-bold text-xs font-mono flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Concierge</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGoAdmin();
              }}
              className="p-2.5 rounded-xl glass-panel text-white"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
