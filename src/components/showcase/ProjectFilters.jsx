import React from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';

const CATEGORIES = [
  "All",
  "Applications",
  "Games",
  "Templates",
  "Design Assets",
  "Audio / Tools"
];

export const ProjectFilters = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  totalResults
}) => {
  return (
    <div className="w-full mb-10 space-y-6">
      {/* Top Search & Price Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input with cyber border */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, technologies, or tags..."
            className="w-full pl-11 pr-10 py-3 rounded-xl glass-panel text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Pricing Segmented Switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-white/10 self-start md:self-auto">
          <button
            onClick={() => onPriceFilterChange('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              priceFilter === 'all'
                ? 'bg-cyan-neon text-black font-semibold shadow-neon-cyan/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Assets
          </button>
          <button
            onClick={() => onPriceFilterChange('free')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              priceFilter === 'free'
                ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Free Only
          </button>
          <button
            onClick={() => onPriceFilterChange('paid')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              priceFilter === 'paid'
                ? 'bg-amber-500 text-black font-semibold shadow-neon-gold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Premium Only
          </button>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-cyan-neon border border-cyan-neon/40 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-gray-500 hidden sm:block whitespace-nowrap">
          {totalResults} {totalResults === 1 ? 'Asset' : 'Assets'} Available
        </div>
      </div>
    </div>
  );
};
