import React, { useState } from 'react';
import { Download, ShoppingCart, ExternalLink, Sparkles, Check, HardDrive, Shield, Code, ChevronRight, Layers } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const ProductSpotlight = ({ projects, onInspect }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [downloadingId, setDownloadingId] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const categories = ['All', 'Applications', 'Games', 'Templates', 'Audio / Tools', 'Design Assets'];

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const activeProject = filtered[selectedIdx] || filtered[0] || projects[0];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleDownload = async (project) => {
    setDownloadingId(project.id);
    await storageAdapter.triggerDirectDownload(project);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2500);
  };

  // Image list for active product
  const gallery = activeProject.gallery_urls && activeProject.gallery_urls.length > 0
    ? activeProject.gallery_urls
    : [activeProject.thumbnail_url];

  const currentImage = gallery[selectedVariant] || activeProject.thumbnail_url;

  return (
    <section id="showcase" className="py-24 relative max-w-7xl mx-auto px-6">
      {/* Category Navigation Pills with underline indicator (Pin 2 Style) */}
      <div className="flex flex-col items-center mb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-neon">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION DIGITAL RELEASES</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          Curated Hardware &amp; <br />
          <span className="bg-gradient-to-r from-cyan-neon to-violet-electric bg-clip-text text-transparent">
            Software Blueprints
          </span>
        </h2>

        {/* Pin 2 Category Selector with Animated Active Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 pt-4 border-b border-white/10 pb-4 w-full max-w-3xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIdx(0);
                setSelectedVariant(0);
              }}
              className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'text-white font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span>{cat}</span>
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-neon to-violet-electric rounded-full shadow-[0_0_12px_rgba(0,245,255,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Product Spotlight Showcase (Directly from Pin 2 DualSense) */}
      {activeProject && (
        <div className="mb-20">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Ambient Spotlight Glow behind product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-neon/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Product Visual Centerpiece */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
                  <img
                    src={currentImage}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-neon">
                    {activeProject.category}
                  </div>
                </div>

                {/* Pin 2 Variant Switcher Pills (under image) */}
                {gallery.length > 1 && (
                  <div className="flex items-center gap-2.5 mt-5 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {gallery.map((_, vIdx) => (
                      <button
                        key={vIdx}
                        onClick={() => setSelectedVariant(vIdx)}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                          selectedVariant === vIdx
                            ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        View 0{vIdx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Specs & Acquisition Actions */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-2 leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-cyan-neon font-mono">
                    {activeProject.tagline || 'Production-Ready Architecture Release'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Key Highlights */}
                {activeProject.features && (
                  <div className="space-y-2 py-2">
                    {activeProject.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {(activeProject.tags || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Meta Bar */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 py-3 border-y border-white/10">
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-cyan-neon" />
                    <span>{activeProject.file_size || '18 MB'}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeProject.is_paid ? 'Commercial Pro' : 'MIT License'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  {activeProject.is_paid ? (
                    <a
                      href={activeProject.checkout_url || '#contact'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-neon-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Acquire Asset (${activeProject.price.toFixed(2)})</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDownload(activeProject)}
                      disabled={downloadingId === activeProject.id}
                      className={`flex-1 py-3.5 rounded-2xl text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        downloadingId === activeProject.id
                          ? 'bg-emerald-400 shadow-lg shadow-emerald-400/40'
                          : 'bg-cyan-neon hover:bg-cyan-400 shadow-neon-cyan'
                      }`}
                    >
                      {downloadingId === activeProject.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Package Assembled (.ZIP)!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Free ZIP Bundle</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => onInspect(activeProject)}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                    title="Deep Inspect"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Secondary Shelf: Grid of All Products with Quick Select */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
            Vault Index ({filtered.length} Blueprint Releases)
          </span>
          <span className="text-[11px] font-mono text-cyan-neon">Click any asset to spotlight</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj, pIdx) => (
            <div
              key={proj.id || pIdx}
              onClick={() => {
                setSelectedIdx(pIdx);
                setSelectedVariant(0);
                window.scrollTo({ top: document.getElementById('showcase').offsetTop + 100, behavior: 'smooth' });
              }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer group ${
                activeProject.id === proj.id
                  ? 'bg-white/[0.08] border-cyan-neon/60 shadow-neon-cyan/20 scale-[1.01]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-4 border border-white/5">
                <img
                  src={proj.thumbnail_url}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                  {proj.is_paid ? `$${proj.price}` : 'FREE'}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-neon">
                  {proj.category}
                </div>
                <h4 className="font-display font-bold text-base text-white truncate group-hover:text-cyan-neon transition-colors">
                  {proj.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 font-light">
                  {proj.tagline || proj.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>{proj.file_size}</span>
                <span className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                  Spotlight <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
