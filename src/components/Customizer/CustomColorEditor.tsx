import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Copy, Code2, AlertCircle, Check, Sliders } from 'lucide-react';
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

const ROLES: { role: ColorRole; index: string; name: string; description: string }[] = [
  { role: 'background', index: '01', name: 'Background', description: 'Base surface and page canvas' },
  { role: 'primary', index: '02', name: 'Primary', description: 'Key actions, buttons, and prominent focal points' },
  { role: 'accent', index: '03', name: 'Accent', description: 'Highlights, badges, and secondary elements' },
  { role: 'text', index: '04', name: 'Text', description: 'Headings, typography, and contrast labels' },
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

  // Sync inputs when customColors changes from external
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
        setTimeout(() => setCopiedRole(null), 1400);
        onShowToast(`Copied ${normalized} (${ROLES.find((r) => r.role === role)?.name})`);
      },
      () => onShowToast('Clipboard access was denied', 'error')
    );
  };

  const handleCopyAllHex = () => {
    const text = generateAllHexCopyText(
      isCustomized ? `${selectedPalette.name} (Custom)` : selectedPalette.name,
      selectedPalette.category,
      {
        background: { hex: customColors.background, label: selectedPalette.colors?.background?.label },
        primary: { hex: customColors.primary, label: selectedPalette.colors?.primary?.label },
        accent: { hex: customColors.accent, label: selectedPalette.colors?.accent?.label },
        text: { hex: customColors.text, label: selectedPalette.colors?.text?.label },
      }
    );
    navigator.clipboard.writeText(text).then(
      () => onShowToast('Copied all 4 color roles to clipboard'),
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263A35]/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] text-[#343630] rounded-[12px] shadow-elevated border border-[#E5DED1] w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DED1] bg-[#F7F4ED]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#EAE5DA] border border-[#E5DED1] flex items-center justify-center text-[#D16C50]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="customizer-title" className="text-sm font-semibold text-[#343630]">
                  Customise Palette Roles
                </h2>
                {isCustomized && (
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-[4px] bg-[#D16C50]/15 text-[#D16C50] border border-[#D16C50]/30">
                    Customized
                  </span>
                )}
              </div>
              <p className="text-xs text-[#77786F] mt-0.5">
                Preset reference: <span className="font-medium text-[#343630]">{selectedPalette.name}</span> ({selectedPalette.category})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#77786F] hover:text-[#343630] hover:bg-[#EAE5DA] transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles Editor List */}
        <div className="p-5 space-y-3.5 overflow-y-auto max-h-[calc(90vh-175px)]">
          {ROLES.map(({ role, index, name, description }) => {
            const currentHex = customColors[role];
            const inputValue = localInputs[role];
            const error = errors[role];
            const originalColor = selectedPalette.colors?.[role] || { hex: currentHex, label: name };
            const contrastFg = getContrastColor(currentHex);
            const isModifiedFromPreset = currentHex.toUpperCase() !== (originalColor.hex || '').toUpperCase();

            return (
              <div
                key={role}
                className={`p-3.5 rounded-[10px] border transition-colors ${
                  error
                    ? 'border-rose-300 bg-rose-50/40'
                    : isModifiedFromPreset
                    ? 'border-[#D16C50]/40 bg-[#F7F4ED]'
                    : 'border-[#E5DED1] bg-[#FFFFFF] hover:border-[#D5CEC0]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#77786F]">{index}</span>
                    <span className="text-xs font-semibold text-[#343630]">{name}</span>
                    <span className="text-[11px] text-[#77786F]">· {originalColor.label}</span>
                    {isModifiedFromPreset && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D16C50]/12 text-[#D16C50]">
                        Edited
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopySingleHex(role, currentHex)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#77786F] hover:text-[#343630] transition-colors px-2 py-0.5 rounded hover:bg-[#EAE5DA]"
                    title={`Copy ${currentHex}`}
                  >
                    {copiedRole === role ? (
                      <>
                        <Check className="w-3 h-3 text-[#263A35]" />
                        <span className="text-[#263A35] font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Swatch & native picker trigger */}
                  <div className="sm:col-span-5 flex items-center gap-2.5">
                    <label
                      className="relative block w-10 h-10 rounded-[8px] border border-black/15 shadow-subtle cursor-pointer overflow-hidden shrink-0 group focus-within:ring-2 focus-within:ring-[#D16C50]"
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
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono uppercase font-semibold"
                        style={{ color: contrastFg }}
                      >
                        Pick
                      </span>
                    </label>

                    <div className="min-w-0">
                      <div className="text-xs font-mono font-medium text-[#343630]">
                        {isValidHex(currentHex) ? normalizeHex(currentHex) : currentHex}
                      </div>
                      <div className="text-[11px] text-[#77786F] truncate">{description}</div>
                    </div>
                  </div>

                  {/* HEX Input */}
                  <div className="sm:col-span-7">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleTextChange(role, e.target.value)}
                      placeholder="#000000"
                      maxLength={9}
                      className={`w-full px-3 py-1.5 text-xs font-mono rounded-[7px] border transition-colors ${
                        error
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/50'
                          : 'border-[#E5DED1] focus:border-[#D16C50] focus:ring-1 focus:ring-[#D16C50] bg-[#F7F4ED] focus:bg-[#FFFFFF]'
                      }`}
                      aria-label={`Enter HEX for ${name}`}
                    />
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
        <div className="px-5 py-3.5 bg-[#F7F4ED] border-t border-[#E5DED1] flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={onResetToPreset}
            disabled={!isCustomized}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] border transition-colors ${
              isCustomized
                ? 'border-[#E5DED1] bg-[#FFFFFF] text-[#343630] hover:bg-[#EAE5DA]'
                : 'border-[#E5DED1]/60 text-[#77786F]/60 bg-[#FFFFFF]/60 cursor-not-allowed'
            }`}
            title="Reset all colors back to preset values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Preset
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllHex}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] border border-[#E5DED1] bg-[#FFFFFF] text-[#343630] hover:bg-[#EAE5DA] transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#77786F]" />
              Copy All
            </button>
            <button
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[8px] border border-[#E5DED1] bg-[#FFFFFF] text-[#343630] hover:bg-[#EAE5DA] transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-[#77786F]" />
              CSS
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium rounded-[8px] bg-[#D16C50] hover:bg-[#BD5B40] text-[#FFFFFF] shadow-subtle transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
