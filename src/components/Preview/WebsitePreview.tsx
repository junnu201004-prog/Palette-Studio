import React from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Sliders,
  Terminal,
  Check,
  BarChart2,
  CircleDot,
  Globe,
  Shield,
  Sparkles,
  Menu,
} from 'lucide-react';
import { CustomColors, DeviceMode } from '../../types/palette';
import {
  getContrastColor,
  isDark,
  hexToRgbaString,
  safeHex,
} from '../../utils/colorUtils';

interface WebsitePreviewProps {
  customColors: CustomColors;
  deviceMode: DeviceMode;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  customColors,
  deviceMode,
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

  // Full CSS Custom Properties for immediate dynamic updates
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

  const isMobile = deviceMode === 'mobile';
  const isTablet = deviceMode === 'tablet';

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
            <span className="truncate">forma-atelier.design/system</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[#77786F]">
            <span className="uppercase">{deviceMode}</span>
          </div>
        </div>

        {/* LIVE SAMPLE WEBSITE SURFACE (Adopts selected palette dynamically via CSS variables) */}
        <div className="flex-1 flex flex-col transition-colors duration-150" style={previewStyle}>
          {/* 1. NAVBAR */}
          <header
            className="px-4 sm:px-8 py-3.5 border-b flex items-center justify-between gap-3 shrink-0"
            style={{
              borderColor: hairlineBorder,
              backgroundColor: isDarkMode ? hexToRgbaString(background, 0.95) : hexToRgbaString(background, 0.98),
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-[6px] flex items-center justify-center font-mono text-xs font-semibold shrink-0"
                style={{
                  backgroundColor: 'var(--preview-primary)',
                  color: primaryFg,
                }}
              >
                F/
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-sm tracking-tight leading-none">
                  Forma Atelier
                </span>
                {!isMobile && (
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded leading-none"
                    style={{
                      backgroundColor: accentSoft,
                      color: 'var(--preview-accent)',
                    }}
                  >
                    v2.4
                  </span>
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <nav className="flex items-center gap-5 text-xs">
                <span
                  className="font-medium cursor-pointer"
                  style={{ color: 'var(--preview-primary)' }}
                >
                  Overview
                </span>
                <span className="cursor-pointer transition-opacity hover:opacity-100" style={{ color: mutedText }}>
                  Architecture
                </span>
                <span className="cursor-pointer transition-opacity hover:opacity-100" style={{ color: mutedText }}>
                  Tokens
                </span>
                {!isTablet && (
                  <>
                    <span className="cursor-pointer transition-opacity hover:opacity-100" style={{ color: mutedText }}>
                      Journal
                    </span>
                    <span className="cursor-pointer transition-opacity hover:opacity-100" style={{ color: mutedText }}>
                      Pricing
                    </span>
                  </>
                )}
              </nav>
            )}

            {/* Navbar CTAs */}
            <div className="flex items-center gap-2">
              {isMobile ? (
                <>
                  <button
                    type="button"
                    className="text-xs font-medium px-2.5 py-1.5 rounded-[6px] flex items-center gap-1"
                    style={{
                      backgroundColor: 'var(--preview-primary)',
                      color: primaryFg,
                    }}
                  >
                    <span>Start</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-[6px] border"
                    style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
                    aria-label="Toggle navigation"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1.5 rounded-[6px] font-medium transition-opacity hover:opacity-80"
                    style={{
                      color: 'var(--preview-text)',
                      backgroundColor: subtleFill,
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="text-xs font-medium px-3 py-1.5 rounded-[6px] transition-transform active:scale-95 flex items-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--preview-primary)',
                      color: primaryFg,
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </header>

          {/* 2. EDITORIAL HERO SECTION */}
          <section
            className={`px-4 sm:px-8 py-8 sm:py-12 border-b ${isMobile ? 'space-y-6' : ''}`}
            style={{ borderColor: hairlineBorder }}
          >
            <div className={`max-w-5xl mx-auto ${isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
              {/* Left Column: Typography & CTAs */}
              <div className={`${isMobile ? 'w-full' : 'lg:col-span-7'} space-y-4`}>
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] text-[11px] font-mono border"
                  style={{
                    backgroundColor: accentSoft,
                    borderColor: hexToRgbaString(accent, 0.35),
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--preview-accent)' }}
                  />
                  <span className="uppercase tracking-wider font-medium">
                    Design System 09
                  </span>
                </div>

                <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-semibold tracking-tight leading-[1.18]`}>
                  Architectural clarity for{' '}
                  <span
                    className="underline decoration-2 underline-offset-4"
                    style={{
                      color: 'var(--preview-primary)',
                      textDecorationColor: 'var(--preview-accent)',
                    }}
                  >
                    digital systems
                  </span>
                  .
                </h1>

                <p
                  className="text-xs sm:text-sm leading-relaxed max-w-xl"
                  style={{ color: mutedText }}
                >
                  Built for engineering and product teams who demand typographic hierarchy,
                  calibrated surface contrast, and cohesive tokens across all viewport scales.
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} items-stretch sm:items-center gap-2.5 pt-1`}>
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-[7px] font-medium text-xs sm:text-sm transition-all hover:opacity-95 active:scale-[0.99] flex items-center justify-center gap-2 shadow-subtle"
                    style={{
                      backgroundColor: 'var(--preview-primary)',
                      color: primaryFg,
                    }}
                  >
                    <span>Explore Documentation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-[7px] font-medium text-xs sm:text-sm border transition-colors hover:opacity-85 text-center"
                    style={{
                      backgroundColor: surfaceBg,
                      borderColor: hairlineBorder,
                      color: 'var(--preview-text)',
                    }}
                  >
                    Inspect Token Spec
                  </button>
                </div>

                {/* Editorial Metadata Badges */}
                <div
                  className={`pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]`}
                  style={{ color: mutedText }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--preview-accent)' }} />
                    WCAG 2.2 Audited
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--preview-accent)' }} />
                    4-Role Harmonic Ratio
                  </span>
                  {!isMobile && (
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" style={{ color: 'var(--preview-accent)' }} />
                      Zero Runtime Bloat
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Live Interactive UI Token Calibration Card */}
              <div className={`${isMobile ? 'w-full' : 'lg:col-span-5'}`}>
                <div
                  className="rounded-[10px] border p-4 sm:p-5 space-y-3.5"
                  style={{
                    backgroundColor: elevatedBg,
                    borderColor: hairlineBorder,
                  }}
                >
                  <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: hairlineBorder }}>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: mutedText }}>
                        ACTIVE SPECIMEN
                      </span>
                      <h3 className="text-xs font-semibold mt-0.5">
                        Token Calibration Module
                      </h3>
                    </div>
                    <span
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: 'var(--preview-accent)',
                        color: accentFg,
                      }}
                    >
                      VERIFIED
                    </span>
                  </div>

                  {/* Swatch Breakdown inside Live Card */}
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className="p-2 rounded-[6px] border"
                      style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono" style={{ color: mutedText }}>PRIMARY</span>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: 'var(--preview-primary)' }}
                        />
                      </div>
                      <div className="text-xs font-mono font-medium truncate">{primary}</div>
                    </div>

                    <div
                      className="p-2 rounded-[6px] border"
                      style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono" style={{ color: mutedText }}>ACCENT</span>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: 'var(--preview-accent)' }}
                        />
                      </div>
                      <div className="text-xs font-mono font-medium truncate">{accent}</div>
                    </div>
                  </div>

                  {/* Progress & Status Indicator */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: mutedText }}>Contrast Index</span>
                      <span className="font-mono font-medium">98.6%</span>
                    </div>
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: subtleFill }}
                    >
                      <div
                        className="h-full rounded-full w-4/5"
                        style={{ backgroundColor: 'var(--preview-primary)' }}
                      />
                    </div>
                  </div>

                  <div className="pt-0.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono truncate" style={{ color: mutedText }}>
                      BG {background}
                    </span>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-[5px] text-[10px] font-medium"
                      style={{
                        backgroundColor: primarySoft,
                        color: 'var(--preview-primary)',
                      }}
                    >
                      Diagnostics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ARCHITECTURAL METRICS LEDGER */}
          <section
            className="border-b"
            style={{
              borderColor: hairlineBorder,
              backgroundColor: surfaceBg,
            }}
          >
            <div
              className={`max-w-5xl mx-auto grid ${isMobile ? 'grid-cols-2 divide-y divide-x' : 'grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x'}`}
              style={{ borderColor: hairlineBorder }}
            >
              {[
                { index: '01', metric: '99.98%', label: 'Uptime', note: 'Edge nodes' },
                { index: '02', metric: '14.2k', label: 'Systems', note: 'Repositories' },
                { index: '03', metric: '67', label: 'Palettes', note: '8 families' },
                { index: '04', metric: '4.96/5', label: 'Audited', note: 'Score' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 flex flex-col justify-between"
                  style={{ borderColor: hairlineBorder }}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5" style={{ color: mutedText }}>
                    <span>{stat.index}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? 'var(--preview-primary)' : 'var(--preview-accent)',
                      }}
                    />
                  </div>
                  <div className="text-lg sm:text-xl font-semibold tracking-tight font-mono">
                    {stat.metric}
                  </div>
                  <div className="mt-1 flex items-baseline justify-between gap-1">
                    <span className="text-xs font-medium">{stat.label}</span>
                    <span className="text-[10px]" style={{ color: mutedText }}>{stat.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. THREE FEATURE CARDS */}
          <section
            className="px-4 sm:px-8 py-8 sm:py-10 border-b"
            style={{ borderColor: hairlineBorder }}
          >
            <div className="max-w-5xl mx-auto">
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row items-end'} justify-between gap-3 mb-6`}>
                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest block mb-1"
                    style={{ color: 'var(--preview-accent)' }}
                  >
                    SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="text-base sm:text-xl font-semibold tracking-tight">
                    Calibrated role distribution
                  </h2>
                </div>
                <p className="text-xs max-w-sm" style={{ color: mutedText }}>
                  Every color role fulfills an explicit semantic responsibility across interface elements.
                </p>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-3.5'}`}>
                {[
                  {
                    num: '01',
                    icon: Compass,
                    title: 'Contextual Surface Contrast',
                    desc: 'Background and elevated card surfaces maintain calibrated luminance without visual fatigue.',
                    tag: 'Role: Background',
                    useAccent: false,
                  },
                  {
                    num: '02',
                    icon: Sliders,
                    title: 'Intentional Action Weights',
                    desc: 'Primary actions command immediate focal authority while secondary controls remain calm.',
                    tag: 'Role: Primary',
                    useAccent: true,
                  },
                  {
                    num: '03',
                    icon: Terminal,
                    title: 'Production CSS Tokens',
                    desc: 'Export clean custom properties mapped directly to standard stylesheet architectures.',
                    tag: 'Role: Accent & Text',
                    useAccent: false,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.num}
                      className="p-4 sm:p-5 rounded-[8px] border flex flex-col justify-between transition-colors"
                      style={{
                        backgroundColor: elevatedBg,
                        borderColor: hairlineBorder,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: item.useAccent
                                ? 'var(--preview-accent)'
                                : 'var(--preview-primary)',
                              color: item.useAccent ? accentFg : primaryFg,
                            }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-mono" style={{ color: mutedText }}>
                            /{item.num}
                          </span>
                        </div>

                        <h3 className="text-xs sm:text-sm font-semibold mb-1.5">{item.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                          {item.desc}
                        </p>
                      </div>

                      <div
                        className="mt-4 pt-2.5 border-t flex items-center justify-between text-[11px] font-mono"
                        style={{ borderColor: hairlineBorder }}
                      >
                        <span style={{ color: 'var(--preview-primary)' }}>{item.tag}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. TELEMETRY & DASHBOARD SPECIMEN */}
          <section
            className="px-4 sm:px-8 py-8 border-b"
            style={{ borderColor: hairlineBorder }}
          >
            <div className="max-w-5xl mx-auto">
              <div
                className="rounded-[8px] border p-4 sm:p-5"
                style={{
                  backgroundColor: elevatedBg,
                  borderColor: hairlineBorder,
                }}
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b"
                  style={{ borderColor: hairlineBorder }}
                >
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" style={{ color: 'var(--preview-primary)' }} />
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold">
                        Token Distribution Audit
                      </h3>
                      <p className="text-[10px]" style={{ color: mutedText }}>
                        Live balance telemetry
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: accentSoft,
                        color: 'var(--preview-accent)',
                      }}
                    >
                      <CircleDot className="w-2.5 h-2.5" />
                      Audited
                    </span>
                  </div>
                </div>

                <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-12 gap-5'} items-center`}>
                  {/* Visual Bar Distribution Chart */}
                  <div className={`${isMobile ? 'w-full' : 'md:col-span-7'} space-y-2`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[11px]">Weight Distribution</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--preview-primary)' }}>
                        60 / 20 / 10 / 10 Ratio
                      </span>
                    </div>

                    <div
                      className="flex items-end gap-1.5 h-20 pt-3 px-2 pb-1.5 rounded-[6px] border"
                      style={{
                        backgroundColor: subtleFill,
                        borderColor: hairlineBorder,
                      }}
                    >
                      {[65, 85, 50, 95, 72, 88, 60, 100, 78, 92, 68, 84].map((val, idx) => (
                        <div key={idx} className="flex-1 h-full flex items-end">
                          <div
                            className="w-full rounded-t-[2px] transition-all duration-300"
                            style={{
                              height: `${val}%`,
                              backgroundColor:
                                idx % 3 === 0
                                  ? 'var(--preview-accent)'
                                  : idx % 2 === 0
                                  ? 'var(--preview-primary)'
                                  : hexToRgbaString(primary, 0.45),
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-[9px] font-mono" style={{ color: mutedText }}>
                      <span>Q1</span>
                      <span>Q2</span>
                      <span>Q3</span>
                      <span>Q4</span>
                    </div>
                  </div>

                  {/* Role Allocation Rows */}
                  <div className={`${isMobile ? 'w-full' : 'md:col-span-5'} space-y-1.5`}>
                    {[
                      { label: 'Surface Canvases', token: '--preview-bg', share: '60%', swatch: background },
                      { label: 'Primary CTAs', token: '--preview-primary', share: '20%', swatch: primary },
                      { label: 'Accents & Badges', token: '--preview-accent', share: '10%', swatch: accent },
                      { label: 'Typography', token: '--preview-text', share: '10%', swatch: text },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1.5 rounded-[5px] border flex items-center justify-between text-xs"
                        style={{
                          backgroundColor: subtleFill,
                          borderColor: hairlineBorder,
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-3 h-3 rounded-[3px] shrink-0 ring-1 ring-black/15"
                            style={{ backgroundColor: row.swatch }}
                          />
                          <div className="min-w-0">
                            <div className="font-medium truncate text-[10px]">{row.label}</div>
                            <div className="text-[9px] font-mono truncate" style={{ color: mutedText }}>
                              {row.token}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] font-medium pl-1.5">{row.share}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. EDITORIAL TESTIMONIAL & PROMOTIONAL CALLOUT */}
          <section
            className="px-4 sm:px-8 py-8 border-b"
            style={{ borderColor: hairlineBorder }}
          >
            <div className={`max-w-5xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-12 gap-5'} items-stretch`}>
              {/* Quote Box */}
              <div
                className={`${isMobile ? 'w-full' : 'lg:col-span-7'} p-5 rounded-[8px] border flex flex-col justify-between`}
                style={{
                  backgroundColor: surfaceBg,
                  borderColor: hairlineBorder,
                }}
              >
                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest block mb-2"
                    style={{ color: 'var(--preview-accent)' }}
                  >
                    TESTIMONIAL
                  </span>
                  <blockquote className="text-xs sm:text-sm font-medium leading-relaxed">
                    “Testing color tokens inside realistic editorial specimens revealed subtle contrast
                    subtleties before committing to production design tokens.”
                  </blockquote>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: hairlineBorder }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                      style={{
                        backgroundColor: 'var(--preview-primary)',
                        color: primaryFg,
                      }}
                    >
                      EL
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Elena Lindqvist</div>
                      <div className="text-[10px]" style={{ color: mutedText }}>
                        Design Director, Nord
                      </div>
                    </div>
                  </div>
                  <Shield className="w-3.5 h-3.5 opacity-50" />
                </div>
              </div>

              {/* Promotional Action Card */}
              <div
                className={`${isMobile ? 'w-full' : 'lg:col-span-5'} p-5 rounded-[8px] flex flex-col justify-between`}
                style={{
                  backgroundColor: 'var(--preview-primary)',
                  color: primaryFg,
                }}
              >
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/15 mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Production Ready</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold leading-snug mb-1.5">
                    Deploy this color system directly.
                  </h3>
                  <p className="text-[11px] opacity-85 leading-relaxed">
                    Export CSS variables snippet or fine-tune any role using the customizer.
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-current/15 flex items-center justify-between text-xs font-medium">
                  <span className="text-[11px]">4 Harmonic Roles</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] underline underline-offset-4 cursor-pointer">
                    Export <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 7. FOOTER */}
          <footer className="px-4 sm:px-8 py-6 mt-auto">
            <div className="max-w-5xl mx-auto">
              <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-4 gap-5'} pb-5 border-b text-xs`} style={{ borderColor: hairlineBorder }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-[4px] flex items-center justify-center font-mono text-[10px] font-semibold"
                      style={{
                        backgroundColor: 'var(--preview-primary)',
                        color: primaryFg,
                      }}
                    >
                      F/
                    </div>
                    <span className="font-semibold text-xs">Forma Atelier</span>
                  </div>
                  <p className="text-[10px] leading-relaxed" style={{ color: mutedText }}>
                    Modular UI color system preview.
                  </p>
                </div>

                <div>
                  <div className="font-medium text-xs mb-1.5">Tokens</div>
                  <ul className="space-y-1 text-[10px]" style={{ color: mutedText }}>
                    <li className="cursor-pointer hover:underline">Background</li>
                    <li className="cursor-pointer hover:underline">Primary</li>
                    <li className="cursor-pointer hover:underline">Accent</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium text-xs mb-1.5">Documentation</div>
                  <ul className="space-y-1 text-[10px]" style={{ color: mutedText }}>
                    <li className="cursor-pointer hover:underline">Contrast Guide</li>
                    <li className="cursor-pointer hover:underline">Specification</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium text-xs mb-1.5">Dispatch</div>
                  <div className="flex gap-1">
                    <input
                      type="email"
                      placeholder="studio@domain.com"
                      readOnly
                      className="w-full px-2 py-1 rounded-[5px] text-[10px] border bg-transparent focus:outline-none"
                      style={{ borderColor: hairlineBorder }}
                    />
                    <button
                      type="button"
                      className="px-2 py-1 rounded-[5px] text-[10px] font-medium shrink-0"
                      style={{
                        backgroundColor: 'var(--preview-accent)',
                        color: accentFg,
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px]"
                style={{ color: mutedText }}
              >
                <span>© {new Date().getFullYear()} Forma Atelier. Live Specimen.</span>
                <div className="flex items-center gap-3 font-mono text-[9px]">
                  <span>BG: {background}</span>
                  <span>PRI: {primary}</span>
                  <span>ACC: {accent}</span>
                  <span>TXT: {text}</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
