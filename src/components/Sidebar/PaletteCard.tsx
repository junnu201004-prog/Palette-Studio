import React from 'react';
import { Palette, ColorRole } from '../../types/palette';
import { getContrastColor, safeHex } from '../../utils/colorUtils';
import { Bookmark, Check } from 'lucide-react';

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onSelect: (palette: Palette) => void;
  onCopySwatch?: (hex: string, label: string, roleName: string) => void;
  isSaved?: boolean;
  onToggleSave?: (paletteId: string) => void;
}

const ROLES_ORDER: { key: ColorRole; name: string }[] = [
  { key: 'background', name: 'BG' },
  { key: 'primary', name: 'Pri' },
  { key: 'accent', name: 'Acc' },
  { key: 'text', name: 'Txt' },
];

export const PaletteCard: React.FC<PaletteCardProps> = ({
  palette,
  isSelected,
  onSelect,
  onCopySwatch,
  isSaved = false,
  onToggleSave,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(palette);
    }
  };

  const formattedIndex = String(palette.index || 1).padStart(2, '0');

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select palette ${palette.name}, category ${palette.category}`}
      onClick={() => onSelect(palette)}
      onKeyDown={handleKeyDown}
      className={`group relative text-left rounded-[10px] transition-all duration-150 cursor-pointer outline-none border focus-visible:ring-2 focus-visible:ring-[#D16C50] ${
        isSelected
          ? 'bg-[#2E4842] border-[#D16C50] shadow-md ring-1 ring-[#D16C50]/60'
          : 'bg-[#1F312D] border-[#334B45] hover:bg-[#293E39] hover:border-[#436059]'
      }`}
    >
      {/* Left prominent active indicator bar */}
      {isSelected && (
        <div
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[#D16C50]"
          aria-hidden="true"
        />
      )}

      <div className="p-3 pl-3.5">
        {/* Top Row: Index, Name, Category & Save / Selection Badge */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-[11px] font-mono leading-none ${
                  isSelected ? 'text-[#D16C50] font-bold' : 'text-[#7F968E]'
                }`}
              >
                {formattedIndex}
              </span>
              <h3
                className={`text-[13px] leading-tight truncate transition-colors ${
                  isSelected
                    ? 'font-semibold text-[#FFFFFF]'
                    : 'font-medium text-[#E6E4DD] group-hover:text-[#F7F4ED]'
                }`}
              >
                {palette.name}
              </h3>
            </div>
            <span className="text-[11px] text-[#8FA39B] block truncate mt-0.5 pl-5">
              {palette.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(palette.id);
                }}
                className={`p-1 rounded-md transition-colors ${
                  isSaved
                    ? 'text-[#D16C50] bg-[#D16C50]/15 hover:bg-[#D16C50]/25'
                    : 'text-[#7F968E] opacity-60 group-hover:opacity-100 hover:text-[#F7F4ED] hover:bg-white/5'
                }`}
                title={isSaved ? 'Remove from saved combinations' : 'Save combination'}
                aria-label={isSaved ? `Remove ${palette.name} from saved` : `Save ${palette.name}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}

            {isSelected ? (
              <span
                className="w-4 h-4 rounded-full bg-[#D16C50] text-[#FFFFFF] flex items-center justify-center shrink-0"
                title="Currently selected palette"
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            ) : (
              <span
                className="w-2 h-2 rounded-full transition-colors bg-transparent group-hover:bg-[#49665E]"
              />
            )}
          </div>
        </div>

        {/* 4 Swatches Strip in strict order: Background, Primary, Accent, Text */}
        <div className="grid grid-cols-4 gap-1 rounded-[7px] p-1 bg-[#182623] border border-[#2C423C]">
          {ROLES_ORDER.map(({ key, name }) => {
            const color = palette.colors?.[key];
            const hex = safeHex(color?.hex, '#000000');
            const label = color?.label || name;
            const fg = getContrastColor(hex);

            return (
              <div
                key={key}
                onClick={(e) => {
                  if (onCopySwatch) {
                    e.stopPropagation();
                    onCopySwatch(hex, label, name);
                  }
                }}
                className="relative h-8 rounded-[4px] flex flex-col justify-between px-1.5 py-1 transition-transform hover:scale-[1.04] hover:z-10 cursor-pointer ring-1 ring-inset ring-black/20"
                style={{ backgroundColor: hex }}
                title={`${name}: ${hex} (${label}) — Click to copy`}
              >
                <span
                  className="text-[8px] font-medium uppercase tracking-wider leading-none opacity-80"
                  style={{ color: fg }}
                >
                  {name}
                </span>
                <span
                  className="text-[8px] font-mono leading-none tracking-tighter truncate opacity-95"
                  style={{ color: fg }}
                >
                  {hex}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
