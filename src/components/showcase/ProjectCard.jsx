import React, { useState, useRef } from 'react';
import { Download, ExternalLink, Eye, ShoppingCart, Sparkles, Check, Play } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const ProjectCard = ({ project, onInspect }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // 3D Tilt calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotX, y: rotY });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    storageAdapter.triggerDirectDownload(project);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    if (project.checkout_url) {
      window.open(project.checkout_url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Redirecting to secure hosted checkout for ${project.title} ($${project.price.toFixed(2)})`);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onInspect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative cursor-pointer rounded-2xl glass-panel border border-white/10 hover:border-cyan-neon/40 overflow-hidden flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_12px_45px_-10px_rgba(0,245,255,0.22)]"
    >
      {/* Radial Mouse Tracker Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 245, 255, 0.12), transparent 70%)`,
        }}
      />

      {/* Top Media Preview Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && project.video_preview_url ? 'opacity-20' : 'opacity-90'
          }`}
        />

        {/* Looping Silent Video on Card Hover */}
        {project.video_preview_url && isHovered && (
          <video
            src={project.video_preview_url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30 pointer-events-none" />

        {/* Category & Pricing Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider glass-panel border border-white/15 text-white/90 backdrop-blur-md">
            {project.category}
          </span>

          {project.is_paid ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-amber-paid/20 text-amber-paid border border-amber-paid/40 backdrop-blur-md shadow-neon-gold">
              ${project.price.toFixed(2)} PREMIUM
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-emerald-free/20 text-emerald-400 border border-emerald-free/40 backdrop-blur-md">
              FREE DOWNLOAD
            </span>
          )}
        </div>

        {/* Hover Inspect Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs text-white border border-white/20">
          <Eye className="w-3.5 h-3.5 text-cyan-neon" />
          <span>Inspect</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-neon transition-colors line-clamp-1 mb-1.5">
            {project.title}
          </h3>
          <p className="text-xs text-cyan-neon/80 font-mono mb-2 line-clamp-1">
            {project.tagline}
          </p>
          <p className="text-sm text-gray-400 font-light line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(project.tags || []).slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
            {(project.tags || []).length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500">
                +{(project.tags || []).length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-gray-400">
            {project.file_size} • {project.download_count} dl
          </span>

          <div className="flex items-center gap-2">
            {project.is_paid ? (
              <button
                onClick={handleBuy}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-semibold flex items-center gap-1.5 transition-all shadow-neon-gold"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isDownloaded
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60'
                }`}
              >
                {isDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspect(project);
              }}
              title="Inspect Project"
              className="p-1.5 rounded-lg glass-panel hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
