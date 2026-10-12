import React, { useMemo } from 'react';
import { Palette } from '../../types/palette';
import { PaletteCard } from './PaletteCard';
import { Search, X, SlidersHorizontal, Palette as PaletteIcon, RotateCcw } from 'lucide-react';

interface PaletteSidebarProps {
  palettes: Palette[];
  categories: string[];
  selectedPalette: Palette;
  onSelectPalette: (palette: Palette) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onResetFilters: () => void;
  onCopySwatch?: (hex: string, label: string, roleName: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const PaletteSidebar: React.FC<PaletteSidebarProps> = ({
  palettes,
  categories,
  selectedPalette,
  onSelectPalette,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  onCopySwatch,
  onCloseMobile,
}) => {
  // Filter palettes based on search and category
  const filteredPalettes = useMemo(() => {
    return palettes.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = p.name.toLowerCase().includes(query);
      const matchesCategoryName = p.category.toLowerCase().includes(query);
      const matchesColor =
        p.colors.background.hex.toLowerCase().includes(query) ||
        p.colors.background.label.toLowerCase().includes(query) ||
        p.colors.primary.hex.toLowerCase().includes(query) ||
        p.colors.primary.label.toLowerCase().includes(query) ||
        p.colors.accent.hex.toLowerCase().includes(query) ||
        p.colors.accent.label.toLowerCase().includes(query) ||
        p.colors.text.hex.toLowerCase().includes(query) ||
        p.colors.text.label.toLowerCase().includes(query);

      return matchesCategory && (matchesName || matchesCategoryName || matchesColor);
    });
  }, [palettes, selectedCategory, searchQuery]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedCategory !== 'All';

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: palettes.length };
    palettes.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [palettes]);

  return (
    <aside
      className="w-full h-full flex flex-col bg-white border-r border-slate-200/90 select-none"
      aria-label="Palette Explorer"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <PaletteIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                Palette Studio
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Explore. Preview. Create.
              </p>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 67 palettes, hex or names..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Categories</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none py-0.5">
            <button
              onClick={() => onCategoryChange('All')}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              All ({categoryCounts['All'] || 0})
            </button>
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-800">{filteredPalettes.length}</strong> of {palettes.length} palettes
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-blue-600 font-medium">Filter: {selectedCategory}</span>
          )}
        </div>
      </div>

      {/* Palette List Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 focus:outline-none">
        {filteredPalettes.length > 0 ? (
          filteredPalettes.map((p) => (
            <PaletteCard
              key={p.id}
              palette={p}
              isSelected={selectedPalette.id === p.id}
              onSelect={onSelectPalette}
              onCopySwatch={onCopySwatch}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800">No palettes found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
              No combinations match "{searchQuery}" in {selectedCategory}.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

