import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sliders,
  Copy,
  Code2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Palette, CustomColors, DeviceMode, ColorRole } from '../../types/palette';
import {
  getContrastColor,
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
}

const ROLES_ORDER: { key: ColorRole; label: string }[] = [
  { key: 'background', label: 'BG' },
  { key: 'primary', label: 'Primary' },
  { key: 'accent', label: 'Accent' },
  { key: 'text', label: 'Text' },
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
}) => {
  const [copiedHexRole, setCopiedHexRole] = useState<ColorRole | null>(null);

  const handleCopySingleRole = (role: ColorRole, hex: string) => {
    navigator.clipboard.writeText(hex).then(
      () => {
        setCopiedHexRole(role);
        setTimeout(() => setCopiedHexRole(null), 1200);
        onShowToast(`Copied ${hex} to clipboard!`);
      },
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleCopyAllHex = () => {
    const text = generateAllHexCopyText(
      isCustomized ? `${selectedPalette.name} (Custom)` : selectedPalette.name,
      selectedPalette.category,
      {
        background: { hex: customColors.background, label: selectedPalette.colors.background.label },
        primary: { hex: customColors.primary, label: selectedPalette.colors.primary.label },
        accent: { hex: customColors.accent, label: selectedPalette.colors.accent.label },
        text: { hex: customColors.text, label: selectedPalette.colors.text.label },
      }
    );
    navigator.clipboard.writeText(text).then(
      () => onShowToast('Copied all 4 palette colors to clipboard!'),
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleCopyCss = () => {
    const css = generateCssVariables(
      isCustomized ? `${selectedPalette.name} (Custom)` : selectedPalette.name,
      customColors
    );
    navigator.clipboard.writeText(css).then(
      () => onShowToast('Copied CSS variables snippet to clipboard!'),
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  return (
    <div className="bg-white border-b border-slate-200/90 px-4 py-3 shrink-0 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Palette Name & Swatches */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{selectedPalette.index}
                </span>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  {selectedPalette.name}
                </h2>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                  {selectedPalette.category}
                </span>
                {isCustomized && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-3 h-3" />
                    Customized
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Quick Swatches Bar */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/70">
            {ROLES_ORDER.map(({ key, label }) => {
              const hex = customColors[key];
              const fg = getContrastColor(hex);
              const isCopied = copiedHexRole === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCopySingleRole(key, hex)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-transform hover:scale-105 active:scale-95 group shadow-2xs"
                  style={{ backgroundColor: hex, color: fg }}
                  title={`${label}: ${hex} — Click to copy`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-75">{label}</span>
                  <span className="font-semibold text-[11px]">{isCopied ? 'Copied!' : hex}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Device Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Viewport Mode Toggles */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/70">
            <button
              type="button"
              onClick={() => onDeviceModeChange('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Desktop View (Fluid)"
              aria-label="Desktop preview mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => onDeviceModeChange('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tablet View (768px)"
              aria-label="Tablet preview mode"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => onDeviceModeChange('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mobile View (375px)"
              aria-label="Mobile preview mode"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-95"
              title="Open Custom Color Editor"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize Colors</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAllHex}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors active:scale-95"
              title="Copy all 4 HEX colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Copy All</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors active:scale-95"
              title="Copy CSS variables code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CSS</span>
            </button>

            {isCustomized && (
              <button
                type="button"
                onClick={onResetCustom}
                className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                title="Reset custom colors to current preset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
