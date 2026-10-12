import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Copy, Code2, Sparkles, AlertCircle, Check } from 'lucide-react';
import { ColorRole, CustomColors, Palette } from '../../types/palette';
import {
  isValidHex,
  normalizeHex,
  getContrastColor,
  generateCssVariables,
  generateAllHexCopyText,
} from '../../utils/colorUtils';

interface CustomColorEditorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPalette: Palette;
  customColors: CustomColors;
  isCustomized: boolean;
  onColorChange: (role: ColorRole, newHex: string) => void;
  onResetToPreset: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ROLES: { role: ColorRole; name: string; description: string }[] = [
  { role: 'background', name: 'Background', description: 'Base surface and page canvases' },
  { role: 'primary', name: 'Primary', description: 'Key brand actions, CTAs, prominent highlights' },
  { role: 'accent', name: 'Accent', description: 'Secondary tags, badges, decorative elements' },
  { role: 'text', name: 'Text', description: 'Headings, body typography, and high-contrast labels' },
];

export const CustomColorEditor: React.FC<CustomColorEditorProps> = ({
  isOpen,
  onClose,
  selectedPalette,
  customColors,
  isCustomized,
  onColorChange,
  onResetToPreset,
  onShowToast,
}) => {
  const [localInputs, setLocalInputs] = useState<Record<ColorRole, string>>({
    background: customColors.background,
    primary: customColors.primary,
    accent: customColors.accent,
    text: customColors.text,
  });

  const [errors, setErrors] = useState<Record<ColorRole, string | null>>({
    background: null,
    primary: null,
    accent: null,
    text: null,
  });

  const [copiedRole, setCopiedRole] = useState<ColorRole | null>(null);

  // Sync inputs when customColors changes from external (e.g. preset change)
  useEffect(() => {
    setLocalInputs({
      background: customColors.background,
      primary: customColors.primary,
      accent: customColors.accent,
      text: customColors.text,
    });
    setErrors({
      background: null,
      primary: null,
      accent: null,
      text: null,
    });
  }, [customColors]);

  if (!isOpen) return null;

  const handleTextChange = (role: ColorRole, value: string) => {
    setLocalInputs((prev) => ({ ...prev, [role]: value }));
    if (isValidHex(value)) {
      setErrors((prev) => ({ ...prev, [role]: null }));
      onColorChange(role, normalizeHex(value));
    } else {
      setErrors((prev) => ({ ...prev, [role]: 'Invalid HEX code (e.g. #3B82F6)' }));
    }
  };

  const handleNativePickerChange = (role: ColorRole, value: string) => {
    const norm = value.toUpperCase();
    setLocalInputs((prev) => ({ ...prev, [role]: norm }));
    setErrors((prev) => ({ ...prev, [role]: null }));
    onColorChange(role, norm);
  };

  const handleCopySingleHex = (role: ColorRole, hex: string) => {
    if (!isValidHex(hex)) {
      onShowToast('Cannot copy invalid HEX code', 'error');
      return;
    }
    const normalized = normalizeHex(hex);
    navigator.clipboard.writeText(normalized).then(
      () => {
        setCopiedRole(role);
        setTimeout(() => setCopiedRole(null), 1500);
        onShowToast(`Copied ${normalized} (${ROLES.find(r => r.role === role)?.name}) to clipboard!`);
      },
      () => {
        onShowToast('Clipboard access was denied', 'error');
      }
    );
  };

  const handleCopyAllHex = () => {
    const text = generateAllHexCopyText(selectedPalette.name, selectedPalette.category, {
      background: { hex: customColors.background, label: selectedPalette.colors.background.label },
      primary: { hex: customColors.primary, label: selectedPalette.colors.primary.label },
      accent: { hex: customColors.accent, label: selectedPalette.colors.accent.label },
      text: { hex: customColors.text, label: selectedPalette.colors.text.label },
    });
    navigator.clipboard.writeText(text).then(
      () => {
        onShowToast('Copied all 4 color roles to clipboard!');
      },
      () => {
        onShowToast('Clipboard access was denied', 'error');
      }
    );
  };

  const handleCopyCss = () => {
    const css = generateCssVariables(
      isCustomized ? `${selectedPalette.name} (Customized)` : selectedPalette.name,
      customColors
    );
    navigator.clipboard.writeText(css).then(
      () => {
        onShowToast('Copied CSS variables snippet to clipboard!');
      },
      () => {
        onShowToast('Clipboard access was denied', 'error');
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="customizer-title" className="text-base font-semibold text-slate-900">
                  Customize Palette Colors
                </h2>
                {isCustomized && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    Customized
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Preset: <span className="font-medium text-slate-700">{selectedPalette.name}</span> ({selectedPalette.category})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          {ROLES.map(({ role, name, description }) => {
            const currentHex = customColors[role];
            const inputValue = localInputs[role];
            const error = errors[role];
            const originalColor = selectedPalette.colors[role];
            const contrastFg = getContrastColor(currentHex);
            const isModifiedFromPreset = currentHex.toUpperCase() !== originalColor.hex.toUpperCase();

            return (
              <div
                key={role}
                className={`p-3.5 rounded-xl border transition-all ${
                  error
                    ? 'border-rose-300 bg-rose-50/30'
                    : isModifiedFromPreset
                    ? 'border-blue-200 bg-blue-50/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{name}</span>
                    <span className="text-xs text-slate-400">· {originalColor.label}</span>
                    {isModifiedFromPreset && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        Modified
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopySingleHex(role, currentHex)}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                    title={`Copy ${currentHex}`}
                  >
                    {copiedRole === role ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy HEX</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Swatch & native color picker */}
                  <div className="sm:col-span-5 flex items-center gap-3">
                    <label
                      className="relative block w-11 h-11 rounded-lg border border-black/10 shadow-inner cursor-pointer overflow-hidden shrink-0 group focus-within:ring-2 focus-within:ring-blue-500"
                      style={{ backgroundColor: currentHex }}
                      title="Click to open color picker"
                    >
                      <input
                        type="color"
                        value={isValidHex(currentHex) ? normalizeHex(currentHex) : '#FFFFFF'}
                        onChange={(e) => handleNativePickerChange(role, e.target.value)}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        aria-label={`Select ${name} color`}
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold"
                        style={{ color: contrastFg }}
                      >
                        Pick
                      </span>
                    </label>

                    <div className="min-w-0">
                      <div className="text-xs font-mono font-semibold text-slate-800">
                        {isValidHex(currentHex) ? normalizeHex(currentHex) : currentHex}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{description}</div>
                    </div>
                  </div>

                  {/* HEX Input */}
                  <div className="sm:col-span-7">
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleTextChange(role, e.target.value)}
                        placeholder="#000000"
                        maxLength={9}
                        className={`w-full px-3 py-2 text-sm font-mono rounded-lg border transition-colors ${
                          error
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/50'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 focus:bg-white'
                        }`}
                        aria-label={`Enter HEX for ${name}`}
                      />
                    </div>
                    {error && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-600">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{error}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onResetToPreset}
              disabled={!isCustomized}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                isCustomized
                  ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm active:scale-95'
                  : 'border-slate-200 text-slate-400 bg-slate-100/50 cursor-not-allowed opacity-60'
              }`}
              title="Reset all colors back to the original preset values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Preset
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllHex}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm transition-all active:scale-95"
              title="Copy all 4 color roles as formatted text"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy All HEX
            </button>
            <button
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95"
              title="Copy as CSS variables"
            >
              <Code2 className="w-3.5 h-3.5" />
              Copy CSS
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

