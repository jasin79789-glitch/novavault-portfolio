import React from 'react';
import { ArrowUp, Heart, Shield, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';

export const Footer = ({ onGoAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070709] py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-neon/20 border border-cyan-neon/40 flex items-center justify-center text-cyan-neon">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white">NovaVault</div>
            <p className="text-[11px] text-gray-400 font-mono">
              Designed & Built by Muhammad Abdullah © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-gray-400">
          <a
            href="https://github.com/nextlevelbuilder"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-neon transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <button
            onClick={onGoAdmin}
            className="hover:text-cyan-neon transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" />
            <span>Admin Console</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
