import { CustomColors, DeviceMode } from '../../../types/palette';

export interface TemplateThemeUtils {
  isDarkMode: boolean;
  primaryFg: string;
  accentFg: string;
  surfaceBg: string;
  elevatedBg: string;
  hairlineBorder: string;
  subtleFill: string;
  mutedText: string;
  primarySoft: string;
  accentSoft: string;
}

export interface TemplateComponentProps {
  customColors: CustomColors;
  deviceMode: DeviceMode;
  themeUtils: TemplateThemeUtils;
}

