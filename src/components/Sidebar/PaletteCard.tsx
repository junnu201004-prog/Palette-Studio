import React from 'react';
import { Palette, ColorRole } from '../../types/palette';
import { getContrastColor } from '../../utils/colorUtils';
import { Check } from 'lucide-react';

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onSelect: (palette: Palette) => void;
  onCopySwatch?: (hex: string, label: string, roleName: string) => void;
}

const ROLES_ORDER: { key: ColorRole; name: string }[] = [
  { key: 'background', name: 'BG' },
  { key: 'primary', name: 'Primary' },
  { key: 'accent', name: 'Accent' },
  { key: 'text', name: 'Text' },
];

export const PaletteCard: React.FC<PaletteCardProps> = ({
  palette,
  isSelected,
  onSelect,
  onCopySwatch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(palette);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select palette ${palette.name}, category ${palette.category}`}
      onClick={() => onSelect(palette)}
      onKeyDown={handleKeyDown}
      className={`group relative text-left rounded-xl transition-all duration-150 cursor-pointer outline-none border ${
        isSelected
          ? 'bg-blue-50/40 border-blue-600 shadow-md ring-2 ring-blue-500/20'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-card hover:-translate-y-0.5'
      }`}
    >
      <div className="p-3">
        {/* Header: Name, Index & Selection Indicator */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                #{palette.index}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {palette.name}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 block truncate">
              {palette.category}
            </span>
          </div>

          {isSelected ? (
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border border-slate-200 group-hover:border-slate-300 shrink-0 transition-colors" />
          )}
        </div>

        {/* 4 Swatches in strict order: Background, Primary, Accent, Text */}
        <div className="grid grid-cols-4 gap-1 rounded-lg overflow-hidden p-1 bg-slate-100/70 border border-slate-200/60">
          {ROLES_ORDER.map(({ key, name }) => {
            const color = palette.colors[key];
            const fg = getContrastColor(color.hex);

            return (
              <div
                key={key}
                onClick={(e) => {
                  if (onCopySwatch) {
                    e.stopPropagation();
                    onCopySwatch(color.hex, color.label, name);
                  }
                }}
                className="relative h-10 rounded flex flex-col justify-between p-1 transition-transform group/swatch hover:scale-105 hover:z-10 cursor-pointer shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={`${name}: ${color.hex} (${color.label}) — Click to copy`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] font-bold tracking-tight uppercase leading-none opacity-80"
                    style={{ color: fg }}
                  >
                    {name}
                  </span>
                </div>
                <span
                  className="text-[8px] font-mono leading-none tracking-tighter truncate opacity-90"
                  style={{ color: fg }}
                >
                  {color.hex}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

