import React, { useState } from 'react';
import { X, Download, ShoppingCart, ExternalLink, Check, FileCode, HardDrive, Shield, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const ProjectDetailModal = ({ project, onClose }) => {
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!project) return null;

  const mediaList = [
    ...(project.gallery_urls && project.gallery_urls.length > 0 ? project.gallery_urls : [project.thumbnail_url])
  ];

  const handleDownload = () => {
    storageAdapter.triggerDirectDownload(project);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const handleBuy = () => {
    if (project.checkout_url) {
      window.open(project.checkout_url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Proceeding to checkout for ${project.title} ($${project.price.toFixed(2)})`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Blur Layer */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-neon">
              {project.category}
            </span>
            <span className="text-xs font-mono text-gray-400">
              Released: {new Date(project.created_at || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual Carousel / HD Preview */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-glass">
            <img
              src={mediaList[activeMediaIdx]}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Gallery Navigation Controls */}
            {mediaList.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMediaIdx((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
                  }}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md pointer-events-auto border border-white/20 transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMediaIdx((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
                  }}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md pointer-events-auto border border-white/20 transition-all hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Thumbnails row */}
            {mediaList.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {mediaList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeMediaIdx === idx ? 'bg-cyan-neon w-6' : 'bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Key Metrics */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-cyan-neon/90 font-mono">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {project.is_paid ? (
                <div className="px-5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono font-bold text-xl shadow-neon-gold">
                  ${project.price.toFixed(2)}
                </div>
              ) : (
                <div className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-sm tracking-wide">
                  FREE DOWNLOAD
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Asset Meta Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10">
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <HardDrive className="w-4 h-4 text-cyan-neon" />
              <div>
                <span className="text-gray-500 block text-[10px] font-mono">PACKAGE SIZE</span>
                <span className="font-semibold">{project.file_size}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Download className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-gray-500 block text-[10px] font-mono">DOWNLOADS</span>
                <span className="font-semibold">{project.download_count} Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Shield className="w-4 h-4 text-violet-electric" />
              <div>
                <span className="text-gray-500 block text-[10px] font-mono">LICENSE</span>
                <span className="font-semibold">{project.is_paid ? 'Commercial Pro' : 'MIT License'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <FileCode className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-gray-500 block text-[10px] font-mono">FORMAT</span>
                <span className="font-semibold">ZIP Source Bundle</span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">Project Overview</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-lg text-white">Key Features & Architecture</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-gray-200"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-neon flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-6 border-t border-white/10 bg-surface/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 font-mono">
            Direct distribution • No account required
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl glass-panel hover:bg-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.is_paid ? (
              <button
                onClick={handleBuy}
                className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-sm font-bold flex items-center justify-center gap-2.5 shadow-neon-gold transition-all duration-200 hover:scale-[1.02]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Purchase Asset (${project.price.toFixed(2)})</span>
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className={`flex-1 sm:flex-none px-7 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] ${
                  isDownloaded
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                }`}
              >
                {isDownloaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Package Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Free ZIP ({project.file_size})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
