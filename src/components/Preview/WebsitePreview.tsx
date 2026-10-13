import React from 'react';
import { Globe } from 'lucide-react';
import { CustomColors, DeviceMode, TemplateId } from '../../types/palette';
import { PREVIEW_TEMPLATES } from '../../data/templates';
import {
  getContrastColor,
  isDark,
  hexToRgbaString,
  safeHex,
} from '../../utils/colorUtils';
import { TemplateComponentProps } from './Templates/templateProps';
import { SaaSTemplate } from './Templates/SaaSTemplate';
import { EcommerceTemplate } from './Templates/EcommerceTemplate';
import { RestaurantTemplate } from './Templates/RestaurantTemplate';
import { PortfolioTemplate } from './Templates/PortfolioTemplate';
import { CorporateTemplate } from './Templates/CorporateTemplate';
import { BlogTemplate } from './Templates/BlogTemplate';
import { DashboardTemplate } from './Templates/DashboardTemplate';
import { TravelTemplate } from './Templates/TravelTemplate';

interface WebsitePreviewProps {
  customColors: CustomColors;
  deviceMode: DeviceMode;
  activeTemplateId?: TemplateId;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  customColors,
  deviceMode,
  activeTemplateId = 'saas',
}) => {
  // Safe color extractions with robust fallbacks
  const background = safeHex(customColors?.background, '#F8FAFC');
  const primary = safeHex(customColors?.primary, '#3B82F6');
  const accent = safeHex(customColors?.accent, '#14B8A6');
  const text = safeHex(customColors?.text, '#0F172A');

  const isDarkMode = isDark(background);
  const primaryFg = getContrastColor(primary);
  const accentFg = getContrastColor(accent);

  // Dynamic surface colors derived from background and text
  const surfaceBg = isDarkMode
    ? hexToRgbaString('#FFFFFF', 0.05)
    : hexToRgbaString('#FFFFFF', 0.88);
  const elevatedBg = isDarkMode
    ? hexToRgbaString('#FFFFFF', 0.09)
    : '#FFFFFF';
  const hairlineBorder = isDarkMode
    ? hexToRgbaString(text, 0.16)
    : hexToRgbaString(text, 0.12);
  const subtleFill = isDarkMode
    ? hexToRgbaString(text, 0.08)
    : hexToRgbaString(text, 0.05);
  const mutedText = isDarkMode
    ? hexToRgbaString(text, 0.72)
    : hexToRgbaString(text, 0.68);

  const primarySoft = hexToRgbaString(primary, 0.15);
  const accentSoft = hexToRgbaString(accent, 0.18);

  // Full CSS Custom Properties for immediate dynamic updates across all templates
  const previewStyle = {
    '--preview-bg': background,
    '--preview-primary': primary,
    '--preview-accent': accent,
    '--preview-text': text,
    '--preview-primary-fg': primaryFg,
    '--preview-accent-fg': accentFg,
    '--preview-surface': surfaceBg,
    '--preview-elevated': elevatedBg,
    '--preview-border': hairlineBorder,
    '--preview-muted': mutedText,
    '--preview-subtle': subtleFill,
    '--preview-primary-soft': primarySoft,
    '--preview-accent-soft': accentSoft,
    backgroundColor: 'var(--preview-bg)',
    color: 'var(--preview-text)',
  } as React.CSSProperties;

  // Active template metadata for browser bar simulation
  const currentTemplate =
    PREVIEW_TEMPLATES.find((t) => t.id === activeTemplateId) || PREVIEW_TEMPLATES[0];

  const getDeviceFrameClasses = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] max-w-full my-3 rounded-[24px] shadow-elevated border-[6px] border-[#263A35] overflow-hidden shrink-0';
      case 'tablet':
        return 'w-[768px] max-w-full my-3 rounded-[16px] shadow-elevated border-[4px] border-[#263A35]/80 overflow-hidden shrink-0';
      case 'desktop':
      default:
        return 'w-full max-w-5xl rounded-[10px] shadow-card border border-[#E5DED1] overflow-hidden';
    }
  };

  const templateProps: TemplateComponentProps = {
    customColors: { background, primary, accent, text },
    deviceMode,
    themeUtils: {
      isDarkMode,
      primaryFg,
      accentFg,
      surfaceBg,
      elevatedBg,
      hairlineBorder,
      subtleFill,
      mutedText,
      primarySoft,
      accentSoft,
    },
  };

  const renderActiveTemplate = () => {
    switch (activeTemplateId) {
      case 'ecommerce':
        return <EcommerceTemplate {...templateProps} />;
      case 'restaurant':
        return <RestaurantTemplate {...templateProps} />;
      case 'portfolio':
        return <PortfolioTemplate {...templateProps} />;
      case 'corporate':
        return <CorporateTemplate {...templateProps} />;
      case 'blog':
        return <BlogTemplate {...templateProps} />;
      case 'dashboard':
        return <DashboardTemplate {...templateProps} />;
      case 'travel':
        return <TravelTemplate {...templateProps} />;
      case 'saas':
      default:
        return <SaaSTemplate {...templateProps} />;
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto p-3 sm:p-5 md:p-6 bg-[#F7F4ED] transition-all">
      <div className={`flex flex-col transition-all duration-200 ${getDeviceFrameClasses()}`}>
        {/* Minimal Studio Browser Frame Bar (Neutral Studio Chrome) */}
        <div className="px-3.5 py-2 bg-[#EAE5DA] border-b border-[#DED6C6] flex items-center justify-between gap-4 shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D16C50]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9B47C]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E8B7B]/80" />
          </div>

          <div className="flex items-center gap-2 px-3 py-0.5 rounded-[5px] bg-[#F7F4ED] border border-[#DDD5C5] text-[11px] font-mono text-[#77786F] max-w-xs w-full justify-center truncate">
            <Globe className="w-3 h-3 text-[#77786F] shrink-0" />
            <span className="truncate">{currentTemplate.url}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[#77786F]">
            <span className="text-[#343630] font-medium hidden sm:inline">{currentTemplate.name}</span>
            <span className="text-[#A59F92] hidden sm:inline">•</span>
            <span className="uppercase">{deviceMode}</span>
          </div>
        </div>

        {/* LIVE SAMPLE WEBSITE SURFACE (Adopts selected palette dynamically via CSS variables) */}
        <div className="flex-1 flex flex-col transition-colors duration-150" style={previewStyle}>
          {renderActiveTemplate()}
        </div>
      </div>
    </div>
  );
};
