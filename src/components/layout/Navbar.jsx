import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { ArrowUpRight, Menu, X, Sparkles, Layers, User, Mail, Home } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
      
      // Update active section on scroll
      const sections = ['home', 'showcase', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo & Studio Identity (Enigma Style) */}
        <div onClick={() => scrollTo('home')} className="cursor-pointer">
          <BrandLogo subtitle="STUDIO • DIGITAL ENGINEERING" />
        </div>

        {/* Center Floating Pill Navigation Dock (Pin 1 Enigma Style) */}
        <nav className="hidden md:flex items-center p-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
          <button
            onClick={() => scrollTo('home')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-white/15 text-white font-semibold shadow-inner-glass border border-white/15'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => scrollTo('showcase')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'showcase'
                ? 'bg-white/15 text-white font-semibold shadow-inner-glass border border-white/15'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Products & Work</span>
          </button>

          <button
            onClick={() => scrollTo('about')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'about'
                ? 'bg-white/15 text-white font-semibold shadow-inner-glass border border-white/15'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Studio Bio</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'contact'
                ? 'bg-white/15 text-white font-semibold shadow-inner-glass border border-white/15'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries</span>
          </button>
        </nav>

        {/* Right Action Capsule CTA (Clean & Professional) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-xs tracking-wide flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white md:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-6 mt-3 p-5 rounded-2xl bg-[#0D0E12]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => scrollTo('home')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('showcase')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Products & Work
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Studio Bio
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Inquiries
          </button>
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Initiate Collaboration</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
