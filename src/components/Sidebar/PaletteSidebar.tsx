import React, { useMemo, useState } from 'react';
import { Palette } from '../../types/palette';
import { PaletteCard } from './PaletteCard';
import {
  Search,
  X,
  RotateCcw,
  Bookmark,
  Grid,
  FolderOpen,
} from 'lucide-react';

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
  savedIds?: string[];
  onToggleSave?: (paletteId: string) => void;
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
  savedIds = [],
  onToggleSave,
}) => {
  const [viewFilter, setViewFilter] = useState<'all' | 'saved'>('all');

  // Filter palettes based on search, category, and saved state
  const filteredPalettes = useMemo(() => {
    return palettes.filter((p) => {
      if (viewFilter === 'saved' && !savedIds.includes(p.id)) {
        return false;
      }

      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

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
  }, [palettes, selectedCategory, searchQuery, viewFilter, savedIds]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedCategory !== 'All' || viewFilter === 'saved';

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: palettes.length };
    palettes.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [palettes]);

  const handleFullReset = () => {
    setViewFilter('all');
    onResetFilters();
  };

  return (
    <aside
      className="w-full h-full flex flex-col bg-[#263A35] text-[#F7F4ED] border-r border-[#1D2D29] select-none"
      aria-label="Palette Explorer"
    >
      {/* Studio Brand Header */}
      <div className="px-4 pt-4 pb-3.5 border-b border-[#344C46] shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Editorial Geometric Brand Mark */}
            <div
              className="w-8 h-8 rounded-[8px] bg-[#1C2B27] border border-[#3B544E] p-1.5 grid grid-cols-2 gap-1 shrink-0"
              aria-hidden="true"
            >
              <span className="rounded-[2px] bg-[#F7F4ED]" />
              <span className="rounded-[2px] bg-[#D16C50]" />
              <span className="rounded-[2px] bg-[#DCE5D8]" />
              <span className="rounded-[2px] bg-[#6D877F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold tracking-tight text-[#F7F4ED] leading-none">
                  Palette Studio
                </h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1E2E2A] text-[#DCE5D8] border border-[#354E47]">
                  67
                </span>
              </div>
              <p className="text-[11px] text-[#9BB0A8] mt-1 leading-none">
                Explore. Preview. Create.
              </p>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-[#9BB0A8] hover:text-[#F7F4ED] hover:bg-[#314943] transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Field tailored for Dark Forest Sidebar */}
        <div className="relative mt-3.5">
          <Search className="w-3.5 h-3.5 text-[#889E96] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, hex, or tone..."
            className="w-full pl-8 pr-7 py-2 text-xs rounded-[8px] border border-[#38524B] bg-[#1D2D29] text-[#F7F4ED] placeholder:text-[#7D948C] focus:outline-none focus:border-[#D16C50] focus:ring-1 focus:ring-[#D16C50] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#889E96] hover:text-[#F7F4ED] hover:bg-[#2F4741]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Navigation Section: All vs Saved Combinations */}
        <div className="grid grid-cols-2 gap-1.5 mt-3 p-1 rounded-[8px] bg-[#1D2D29] border border-[#324A43]">
          <button
            type="button"
            onClick={() => setViewFilter('all')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[6px] text-xs transition-colors ${
              viewFilter === 'all'
                ? 'bg-[#2E4640] text-[#F7F4ED] font-medium shadow-subtle'
                : 'text-[#9BB0A8] hover:text-[#F7F4ED]'
            }`}
          >
            <Grid className="w-3.5 h-3.5 opacity-80" />
            <span>Library</span>
            <span className="text-[10px] font-mono opacity-75">({palettes.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewFilter('saved')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-[6px] text-xs transition-colors ${
              viewFilter === 'saved'
                ? 'bg-[#2E4640] text-[#F7F4ED] font-medium shadow-subtle'
                : 'text-[#9BB0A8] hover:text-[#F7F4ED]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 opacity-80" />
            <span>Saved</span>
            <span className="text-[10px] font-mono opacity-75">({savedIds.length})</span>
          </button>
        </div>

        {/* Organised Categories Section */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#8DA39B] font-medium">
              Categories
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleFullReset}
                className="inline-flex items-center gap-1 text-[11px] text-[#D16C50] hover:text-[#E58469] transition-colors"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1 max-h-[86px] overflow-y-auto sidebar-scroll pr-0.5">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-2 py-1 rounded-[6px] text-[11px] transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#DCE5D8] text-[#263A35] font-medium'
                  : 'bg-[#1F312D] text-[#A8BBB4] border border-[#314943] hover:bg-[#2B413B] hover:text-[#F7F4ED]'
              }`}
            >
              All · {categoryCounts['All'] || 0}
            </button>
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-2 py-1 rounded-[6px] text-[11px] transition-colors ${
                    isSelected
                      ? 'bg-[#DCE5D8] text-[#263A35] font-medium'
                      : 'bg-[#1F312D] text-[#A8BBB4] border border-[#314943] hover:bg-[#2B413B] hover:text-[#F7F4ED]'
                  }`}
                >
                  {cat} · {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#324A43] flex items-center justify-between text-[11px] text-[#9BB0A8]">
          <span>
            Showing <strong className="text-[#F7F4ED] font-medium">{filteredPalettes.length}</strong> of{' '}
            {palettes.length} combinations
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-[#DCE5D8] truncate max-w-[120px]">{selectedCategory}</span>
          )}
        </div>
      </div>

      {/* Scrollable Palette List */}
      <div className="flex-1 overflow-y-auto sidebar-scroll p-3 space-y-2 focus:outline-none">
        {filteredPalettes.length > 0 ? (
          filteredPalettes.map((p) => (
            <PaletteCard
              key={p.id}
              palette={p}
              isSelected={selectedPalette.id === p.id}
              onSelect={onSelectPalette}
              onCopySwatch={onCopySwatch}
              isSaved={savedIds.includes(p.id)}
              onToggleSave={onToggleSave}
            />
          ))
        ) : (
          <div className="py-10 px-4 text-center">
            <div className="w-10 h-10 rounded-[10px] bg-[#1E2E2A] border border-[#354E47] text-[#8DA39B] flex items-center justify-center mx-auto mb-3">
              <FolderOpen className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-medium text-[#F7F4ED]">
              {viewFilter === 'saved' && savedIds.length === 0
                ? 'No saved combinations yet'
                : 'No matching combinations'}
            </h4>
            <p className="text-[11px] text-[#8DA39B] mt-1 max-w-[210px] mx-auto leading-relaxed">
              {viewFilter === 'saved' && savedIds.length === 0
                ? 'Bookmark your favourite palettes using the ribbon icon on any card.'
                : `No results match "${searchQuery}" in ${selectedCategory}.`}
            </p>
            <button
              onClick={handleFullReset}
              className="mt-3.5 px-3 py-1.5 text-xs font-medium text-[#F7F4ED] bg-[#D16C50] hover:bg-[#BD5B40] rounded-[8px] transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Reset view
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
