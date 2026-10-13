import { CustomColors, RoleColor } from '../types/palette';

export function isValidHex(hex: string): boolean {
  if (!hex || typeof hex !== 'string') return false;
  const clean = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(clean);
}

export function normalizeHex(hex: string): string {
  if (!hex || typeof hex !== 'string') return '#000000';
  let clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  return '#' + clean.toUpperCase();
}

export function safeHex(hex: string | undefined | null, fallback: string = '#000000'): string {
  if (!hex || typeof hex !== 'string') return fallback;
  const clean = hex.trim();
  if (isValidHex(clean)) {
    return normalizeHex(clean);
  }
  return fallback;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = (hex || '').trim().replace(/^#/, '');
  let fullHex = clean;
  if (clean.length === 3) {
    fullHex = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(fullHex, 16);
  if (isNaN(num)) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function hexToRgbaString(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isDark(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  // YIQ luminance formula as used in the source file
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq < 140;
}

export function getContrastColor(hex: string): string {
  return isDark(hex) ? '#FFFFFF' : '#0F172A';
}

export function generateCssVariables(
  paletteName: string,
  colors: CustomColors
): string {
  const bg = safeHex(colors.background, '#F8FAFC');
  const pri = safeHex(colors.primary, '#3B82F6');
  const acc = safeHex(colors.accent, '#14B8A6');
  const txt = safeHex(colors.text, '#0F172A');

  return `/* Palette Studio: ${paletteName} */
:root {
  --preview-bg: ${bg};
  --preview-primary: ${pri};
  --preview-accent: ${acc};
  --preview-text: ${txt};
}`;
}

export function generateAllHexCopyText(
  paletteName: string,
  category: string,
  colors: {
    background: RoleColor | { hex: string; label?: string };
    primary: RoleColor | { hex: string; label?: string };
    accent: RoleColor | { hex: string; label?: string };
    text: RoleColor | { hex: string; label?: string };
  }
): string {
  const formatRole = (role: string, item: { hex: string; label?: string }) => {
    const hex = safeHex(item.hex, '#000000');
    return `${role.padEnd(12)}: ${hex}${item.label ? ` (${item.label})` : ''}`;
  };

  return [
    `Palette: ${paletteName} (${category})`,
    formatRole('Background', colors.background),
    formatRole('Primary', colors.primary),
    formatRole('Accent', colors.accent),
    formatRole('Text', colors.text),
  ].join('\n');
}
