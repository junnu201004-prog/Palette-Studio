import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sliders,
  Copy,
  Code2,
  RotateCcw,
  Check,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Palette, CustomColors, DeviceMode, ColorRole } from '../../types/palette';
import {
  isValidHex,
  normalizeHex,
  safeHex,
  generateCssVariables,
  generateAllHexCopyText,
} from '../../utils/colorUtils';

interface PreviewToolbarProps {
  selectedPalette: Palette;
  customColors: CustomColors;
  isCustomized: boolean;
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  onOpenCustomizer: () => void;
  onResetCustom: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  isSaved?: boolean;
  onToggleSave?: (paletteId: string) => void;
  onStepPalette?: (direction: 'prev' | 'next') => void;
  onColorChange?: (role: ColorRole, newHex: string) => void;
}

const ROLES_ORDER: { key: ColorRole; index: string; label: string }[] = [
  { key: 'background', index: '01', label: 'Background' },
  { key: 'primary', index: '02', label: 'Primary' },
  { key: 'accent', index: '03', label: 'Accent' },
  { key: 'text', index: '04', label: 'Text' },
];

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  selectedPalette,
  customColors,
  isCustomized,
  deviceMode,
  onDeviceModeChange,
  onOpenCustomizer,
  onResetCustom,
  onShowToast,
  isSaved = false,
  onToggleSave,
  onStepPalette,
  onColorChange,
}) => {
  const [copiedHexRole, setCopiedHexRole] = useState<ColorRole | null>(null);

  const handleCopySingleRole = (role: ColorRole, hex: string, roleLabel: string) => {
    const validHex = safeHex(hex, '#000000');
    navigator.clipboard.writeText(validHex).then(
      () => {
        setCopiedHexRole(role);
        setTimeout(() => setCopiedHexRole(null), 1400);
        onShowToast(`Copied ${validHex} (${roleLabel}) to clipboard`);
      },
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleCopyAllHex = () => {
    const text = generateAllHexCopyText(
      isCustomized ? `${selectedPalette.name} (Custom)` : selectedPalette.name,
      selectedPalette.category,
      {
        background: { hex: customColors.background, label: selectedPalette.colors.background?.label },
        primary: { hex: customColors.primary, label: selectedPalette.colors.primary?.label },
        accent: { hex: customColors.accent, label: selectedPalette.colors.accent?.label },
        text: { hex: customColors.text, label: selectedPalette.colors.text?.label },
      }
    );
    navigator.clipboard.writeText(text).then(
      () => onShowToast('Copied all 4 palette colors to clipboard'),
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleCopyCss = () => {
    const css = generateCssVariables(
      isCustomized ? `${selectedPalette.name} (Custom)` : selectedPalette.name,
      customColors
    );
    navigator.clipboard.writeText(css).then(
      () => onShowToast('Copied CSS variables snippet to clipboard'),
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleInlineHexChange = (role: ColorRole, value: string) => {
    if (!onColorChange) return;
    if (isValidHex(value)) {
      onColorChange(role, normalizeHex(value));
    }
  };

  const handleInlinePickerChange = (role: ColorRole, value: string) => {
    if (!onColorChange) return;
    onColorChange(role, value.toUpperCase());
  };

  const formattedIndex = String(selectedPalette.index || 1).padStart(2, '0');

  return (
    <header className="bg-[#FFFFFF] border-b border-[#E5DED1] shrink-0 select-none">
      {/* Upper Row: Title, Palette Stepper, Viewport Switcher & Primary Actions */}
      <div className="px-4 sm:px-5 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Active Palette Stepper & Metadata */}
        <div className="flex flex-wrap items-center gap-3">
          {onStepPalette && (
            <div className="flex items-center rounded-[8px] border border-[#E5DED1] bg-[#F7F4ED] p-0.5">
              <button
                type="button"
                onClick={() => onStepPalette('prev')}
                className="p-1 rounded-[6px] text-[#77786F] hover:text-[#343630] hover:bg-[#FFFFFF] transition-colors"
                title="Previous palette"
                aria-label="Previous palette"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-mono text-[#343630] font-medium">
                {formattedIndex}/67
              </span>
              <button
                type="button"
                onClick={() => onStepPalette('next')}
                className="p-1 rounded-[6px] text-[#77786F] hover:text-[#343630] hover:bg-[#FFFFFF] transition-colors"
                title="Next palette"
                aria-label="Next palette"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2.5 min-w-0">
            <h2 className="text-base font-semibold text-[#343630] tracking-tight truncate">
              {selectedPalette.name}
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-[6px] bg-[#EAE5DA] text-[#343630] border border-[#E5DED1] shrink-0">
              {selectedPalette.category}
            </span>
            {isCustomized && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-[6px] bg-[#D16C50]/12 text-[#D16C50] border border-[#D16C50]/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D16C50]" />
                Customized
              </span>
            )}
          </div>

          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(selectedPalette.id)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-[7px] text-xs border transition-colors ${
                isSaved
                  ? 'bg-[#EAE5DA] border-[#D16C50]/40 text-[#D16C50] font-medium'
                  : 'bg-[#FFFFFF] border-[#E5DED1] text-[#77786F] hover:text-[#343630] hover:bg-[#F7F4ED]'
              }`}
              title={isSaved ? 'Saved in collection' : 'Save this combination'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          )}
        </div>

        {/* Right: Device Controls & Global Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Functional Device Viewport Switcher */}
          <div
            className="flex items-center p-0.5 bg-[#F7F4ED] rounded-[8px] border border-[#E5DED1]"
            role="group"
            aria-label="Preview viewport size"
          >
            <button
              type="button"
              onClick={() => onDeviceModeChange('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-[#FFFFFF] text-[#343630] font-medium shadow-subtle border border-[#E5DED1]/60'
                  : 'text-[#77786F] hover:text-[#343630]'
              }`}
              title="Desktop Viewport (Full Preview)"
              aria-label="Desktop preview mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => onDeviceModeChange('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-[#FFFFFF] text-[#343630] font-medium shadow-subtle border border-[#E5DED1]/60'
                  : 'text-[#77786F] hover:text-[#343630]'
              }`}
              title="Tablet Viewport (768px Simulated View)"
              aria-label="Tablet preview mode"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => onDeviceModeChange('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-[#FFFFFF] text-[#343630] font-medium shadow-subtle border border-[#E5DED1]/60'
                  : 'text-[#77786F] hover:text-[#343630]'
              }`}
              title="Mobile Viewport (375px Smartphone Frame)"
              aria-label="Mobile preview mode"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="h-4 w-px bg-[#E5DED1] hidden sm:block" />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyAllHex}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[8px] border border-[#E5DED1] bg-[#FFFFFF] hover:bg-[#F7F4ED] text-[#343630] transition-colors active:scale-[0.98]"
              title="Copy all 4 colour roles formatted as text"
            >
              <Copy className="w-3.5 h-3.5 text-[#77786F]" />
              <span className="hidden md:inline">Copy All</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-[8px] border border-[#E5DED1] bg-[#FFFFFF] hover:bg-[#F7F4ED] text-[#343630] transition-colors active:scale-[0.98]"
              title="Export CSS variables snippet"
            >
              <Code2 className="w-3.5 h-3.5 text-[#77786F]" />
              <span className="hidden md:inline">Export CSS</span>
            </button>

            {isCustomized && (
              <button
                type="button"
                onClick={onResetCustom}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-[8px] text-[#D16C50] bg-[#D16C50]/10 hover:bg-[#D16C50]/15 border border-[#D16C50]/30 transition-colors"
                title="Reset custom colors to current preset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCustomizer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] bg-[#D16C50] hover:bg-[#BD5B40] text-[#FFFFFF] shadow-subtle transition-colors active:scale-[0.98]"
              title="Open Custom Color Editor Modal"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize Colors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Row: 4-Role Specimen Strip with Interactive Swatch, Live Inline HEX Editing & Copy */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#E5DED1] bg-[#F7F4ED]/60 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DED1]">
        {ROLES_ORDER.map(({ key, index, label }) => {
          const rawHex = customColors[key];
          const hex = safeHex(rawHex, '#000000');
          const originalLabel = selectedPalette.colors[key]?.label || label;
          const isCopied = copiedHexRole === key;

          return (
            <div
              key={key}
              className="group flex items-center justify-between gap-2 px-3 sm:px-4 py-2 hover:bg-[#EAE5DA]/50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {/* Native Picker Swatch */}
                <label
                  className="relative block w-7 h-7 rounded-[6px] shrink-0 cursor-pointer overflow-hidden shadow-subtle ring-1 ring-black/15 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: hex }}
                  title={`Click to pick ${label} color`}
                >
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => handleInlinePickerChange(key, e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    aria-label={`Color picker for ${label}`}
                  />
                </label>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-[#77786F]">{index}</span>
                    <span className="text-xs font-medium text-[#343630] truncate">{label}</span>
                  </div>
                  <span className="text-[11px] text-[#77786F] block truncate leading-tight">
                    {originalLabel}
                  </span>
                </div>
              </div>

              {/* Editable HEX Field & Copy Button */}
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="text"
                  value={rawHex}
                  onChange={(e) => handleInlineHexChange(key, e.target.value)}
                  maxLength={7}
                  placeholder="#000000"
                  className="w-[72px] px-1.5 py-0.5 text-xs font-mono font-medium text-[#343630] bg-[#FFFFFF] border border-[#E5DED1] rounded focus:border-[#D16C50] focus:outline-none focus:ring-1 focus:ring-[#D16C50] text-center"
                  title="Edit HEX value directly to update preview live"
                  aria-label={`HEX input for ${label}`}
                />

                <button
                  type="button"
                  onClick={() => handleCopySingleRole(key, hex, label)}
                  className={`p-1 rounded transition-colors ${
                    isCopied
                      ? 'bg-[#DCE5D8] text-[#263A35]'
                      : 'text-[#77786F] hover:text-[#343630] hover:bg-[#FFFFFF]'
                  }`}
                  title={`Copy ${hex}`}
                  aria-label={`Copy ${label} HEX value`}
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
};
