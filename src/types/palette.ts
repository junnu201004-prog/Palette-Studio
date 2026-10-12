export type ColorRole = 'background' | 'primary' | 'accent' | 'text';

export interface RoleColor {
  hex: string;
  label: string;
}

export interface PaletteColors {
  background: RoleColor;
  primary: RoleColor;
  accent: RoleColor;
  text: RoleColor;
}

export interface Palette {
  id: string;
  index: number;
  name: string;
  category: string;
  colors: PaletteColors;
}

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface CustomColors {
  background: string;
  primary: string;
  accent: string;
  text: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

