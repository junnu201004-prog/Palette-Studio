import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Star,
  ExternalLink,
  ChevronRight,
  Activity,
  Award,
} from 'lucide-react';
import { CustomColors, DeviceMode } from '../../types/palette';
import {
  getContrastColor,
  isDark,
  hexToRgbaString,
} from '../../utils/colorUtils';

interface WebsitePreviewProps {
  customColors: CustomColors;
  deviceMode: DeviceMode;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  customColors,
  deviceMode,
}) => {
  const { background, primary, accent, text } = customColors;

  const darkTheme = isDark(background);
  const primaryFg = getContrastColor(primary);
  const accentFg = getContrastColor(accent);

  // Surface and border calculations based on background brightness
  const cardBg = darkTheme
    ? hexToRgbaString('#FFFFFF', 0.04)
    : hexToRgbaString('#FFFFFF', 0.95);
  const cardBorder = darkTheme
    ? hexToRgbaString('#FFFFFF', 0.1)
    : hexToRgbaString('#000000', 0.08);
  const subtleBg = darkTheme
    ? hexToRgbaString('#FFFFFF', 0.07)
    : hexToRgbaString('#000000', 0.03);
  const mutedText = darkTheme
    ? hexToRgbaString(text, 0.72)
    : hexToRgbaString(text, 0.7);

  // Primary tinted subtle surface (for badges, highlight borders)
  const primaryTint = hexToRgbaString(primary, 0.12);
  const accentTint = hexToRgbaString(accent, 0.15);

  // Inline CSS variables object
  const previewStyle = {
    '--preview-bg': background,
    '--preview-primary': primary,
    '--preview-accent': accent,
    '--preview-text': text,
    backgroundColor: 'var(--preview-bg)',
    color: 'var(--preview-text)',
  } as React.CSSProperties;

  // Frame width container styles based on deviceMode
  const getDeviceContainerClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] max-w-full my-6 rounded-[36px] shadow-2xl border-[10px] border-slate-800 overflow-hidden ring-1 ring-slate-900/10 min-h-[780px]';
      case 'tablet':
        return 'w-[768px] max-w-full my-6 rounded-[24px] shadow-2xl border-[8px] border-slate-800 overflow-hidden ring-1 ring-slate-900/10 min-h-[700px]';
      case 'desktop':
      default:
        return 'w-full shadow-card min-h-full border border-slate-200/50 rounded-xl overflow-hidden';
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-start overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-100/70 transition-all">
      <div
        className={`transition-all duration-300 relative flex flex-col ${getDeviceContainerClass()}`}
        style={previewStyle}
      >
        {/* Mobile / Tablet camera pill indicator */}
        {deviceMode === 'mobile' && (
          <div className="w-full h-5 bg-slate-800 flex justify-center items-center shrink-0">
            <div className="w-16 h-3 bg-slate-950 rounded-full" />
          </div>
        )}

        {/* 1. REALISTIC NAVBAR */}
        <header
          className="w-full px-5 py-4 border-b transition-colors flex items-center justify-between shrink-0"
          style={{
            borderColor: cardBorder,
            backgroundColor: darkTheme ? hexToRgbaString(background, 0.9) : hexToRgbaString(background, 0.95),
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-xs"
              style={{
                backgroundColor: 'var(--preview-primary)',
                color: primaryFg,
              }}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">
                Apex UI
              </span>
              <span
                className="text-[10px] leading-tight font-medium"
                style={{ color: mutedText }}
              >
                Platform
              </span>
            </div>
          </div>

          {/* Nav links - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
            <span
              className="cursor-pointer transition-opacity hover:opacity-100 opacity-90 font-semibold"
              style={{ color: 'var(--preview-primary)' }}
            >
              Overview
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-100"
              style={{ color: mutedText }}
            >
              Features
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-100"
              style={{ color: mutedText }}
            >
              Solutions
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-100"
              style={{ color: mutedText }}
            >
              Pricing
            </span>
            <span
              className="cursor-pointer transition-opacity hover:opacity-100"
              style={{ color: mutedText }}
            >
              Changelog
            </span>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="hidden sm:inline-block text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                color: 'var(--preview-text)',
                backgroundColor: subtleBg,
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--preview-primary)',
                color: primaryFg,
              }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* 2. HERO SECTION */}
        <section className="px-5 py-10 md:py-16 text-center max-w-4xl mx-auto w-full">
          {/* Announcement Pill with Accent */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 border transition-all"
            style={{
              backgroundColor: accentTint,
              borderColor: hexToRgbaString(accent, 0.3),
              color: 'var(--preview-text)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--preview-accent)' }}
            />
            <span className="font-semibold" style={{ color: 'var(--preview-accent)' }}>
              v3.2 Released
            </span>
            <span className="opacity-40">·</span>
            <span className="text-[11px]" style={{ color: mutedText }}>
              Explore the new design engine
            </span>
            <ChevronRight className="w-3 h-3 opacity-70" />
          </div>

          {/* High-impact Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-tight mb-5">
            Build Stunning Interfaces with{' '}
            <span
              className="underline decoration-wavy decoration-2 underline-offset-4"
              style={{ color: 'var(--preview-primary)', textDecorationColor: 'var(--preview-accent)' }}
            >
              Harmonious Colors
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            className="text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
            style={{ color: mutedText }}
          >
            Empower your team with precision tokens, real-time contrast intelligence,
            and production-ready themes designed for seamless modern experiences.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {/* Primary CTA */}
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all hover:opacity-95 active:scale-95 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--preview-primary)',
                color: primaryFg,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Free Trial</span>
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                color: 'var(--preview-text)',
              }}
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

          {/* Social Proof Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: mutedText }}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--preview-accent)' }} />
              <span>WCAG 2.2 AA Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--preview-accent)' }} />
              <span>Zero Configuration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--preview-accent)' }} />
              <span>Instant Export</span>
            </div>
          </div>
        </section>

        {/* 3. METRICS / STATS SECTION */}
        <section className="px-5 py-6 w-full max-w-5xl mx-auto">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl border"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            {[
              { label: 'Platform Uptime', value: '99.98%', icon: Activity },
              { label: 'Active Projects', value: '45,000+', icon: Layers },
              { label: 'Palette Swatches', value: '67 Presets', icon: Zap },
              { label: 'Client Satisfaction', value: '4.95 / 5', icon: Award },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="p-3 rounded-xl flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: i % 2 === 0 ? primaryTint : accentTint,
                      color: i % 2 === 0 ? 'var(--preview-primary)' : 'var(--preview-accent)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium" style={{ color: mutedText }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. THREE FEATURE CARDS SECTION */}
        <section className="px-5 py-10 w-full max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span
              className="text-xs uppercase font-bold tracking-wider"
              style={{ color: 'var(--preview-accent)' }}
            >
              Enterprise Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 mb-2">
              Engineered for Discerning Designers
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: mutedText }}>
              Every token, swatch, and contrast ratio is calculated to guarantee readability and cohesive hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div
              className="p-5 rounded-2xl border transition-transform hover:-translate-y-1 shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--preview-primary)',
                    color: primaryFg,
                  }}
                >
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold mb-2">Automated Contrast Mapping</h3>
                <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                  Smart foreground calibration ensures buttons, badges, and labels remain crisp regardless of palette luminance.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: cardBorder }}>
                <span style={{ color: 'var(--preview-primary)' }}>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--preview-primary)' }} />
              </div>
            </div>

            {/* Feature 2 (Accent highlighted) */}
            <div
              className="p-5 rounded-2xl border transition-transform hover:-translate-y-1 shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: 'var(--preview-accent)',
                    color: accentFg,
                  }}
                >
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold mb-2">Adaptive Component Hierarchy</h3>
                <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                  Backgrounds, elevated cards, and accent chips automatically resolve into balanced visual weights.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: cardBorder }}>
                <span style={{ color: 'var(--preview-accent)' }}>View specs</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--preview-accent)' }} />
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="p-5 rounded-2xl border transition-transform hover:-translate-y-1 shadow-xs flex flex-col justify-between"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: subtleBg,
                    color: 'var(--preview-text)',
                  }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold mb-2">Seamless CSS Token Export</h3>
                <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                  One-click export directly into standard CSS custom properties ready for Tailwind, React, or vanilla HTML.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold" style={{ borderColor: cardBorder }}>
                <span style={{ color: 'var(--preview-text)' }}>Documentation</span>
                <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--preview-text)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* 5. DASHBOARD / ANALYTICS SAMPLE PREVIEW */}
        <section className="px-5 py-6 w-full max-w-5xl mx-auto">
          <div
            className="rounded-2xl border p-5 md:p-6 shadow-xs"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            {/* Dashboard Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b" style={{ borderColor: cardBorder }}>
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-5 h-5" style={{ color: 'var(--preview-primary)' }} />
                <div>
                  <h4 className="text-sm font-bold">Design Analytics & Telemetry</h4>
                  <p className="text-[11px]" style={{ color: mutedText }}>
                    Real-time token adoption metrics across production branches
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5"
                  style={{
                    backgroundColor: accentTint,
                    color: 'var(--preview-accent)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--preview-accent)' }} />
                  Live Sync
                </span>
                <button
                  type="button"
                  className="text-xs font-medium px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: subtleBg,
                    color: 'var(--preview-text)',
                  }}
                >
                  Export CSV
                </button>
              </div>
            </div>

            {/* Dashboard Content: Mini Charts and Activity */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Mini visual chart simulation */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span>Weekly Component Render Frequency</span>
                  <span style={{ color: 'var(--preview-primary)' }}>+24.6% this week</span>
                </div>

                <div className="flex items-end gap-2 h-28 pt-4 px-2 rounded-xl" style={{ backgroundColor: subtleBg }}>
                  {[45, 60, 35, 80, 55, 95, 75, 85, 65, 90, 70, 100].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                      <div
                        className="w-full rounded-t transition-all duration-300 group-hover:brightness-110"
                        style={{
                          height: `${val}%`,
                          backgroundColor:
                            idx % 3 === 0
                              ? 'var(--preview-accent)'
                              : idx % 3 === 1
                              ? 'var(--preview-primary)'
                              : hexToRgbaString(primary, 0.4),
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px]" style={{ color: mutedText }}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Status breakdown column */}
              <div className="md:col-span-5 space-y-2.5">
                {[
                  { title: 'Core Buttons & Links', count: '142 tokens', percent: '98%', color: primary },
                  { title: 'Badges & Accent Tags', count: '64 tokens', percent: '86%', color: accent },
                  { title: 'Background Surfaces', count: '28 presets', percent: '100%', color: text },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border flex items-center justify-between text-xs"
                    style={{
                      borderColor: cardBorder,
                      backgroundColor: subtleBg,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: row.color }}
                      />
                      <div>
                        <div className="font-semibold leading-tight">{row.title}</div>
                        <div className="text-[10px]" style={{ color: mutedText }}>{row.count}</div>
                      </div>
                    </div>
                    <span className="font-bold">{row.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIAL & PROMOTIONAL SECTION */}
        <section className="px-5 py-8 w-full max-w-5xl mx-auto">
          <div
            className="p-6 md:p-8 rounded-3xl border relative overflow-hidden"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
            }}
          >
            {/* Subtle decorative background accent circle */}
            <div
              className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: 'var(--preview-accent)' }}
            />

            <div className="max-w-2xl">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: 'var(--preview-accent)' }}
                  />
                ))}
              </div>

              <blockquote className="text-sm md:text-base font-medium italic leading-relaxed mb-4">
                "Switching our component library's core tokens using this palette structure
                immediately solved our legibility issues across both light and dark surfaces.
                It cut design review cycles in half."
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: 'var(--preview-primary)',
                    color: primaryFg,
                  }}
                >
                  SC
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Sarah Chen</div>
                  <div className="text-[11px]" style={{ color: mutedText }}>
                    Head of Design Systems at Vector Labs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer
          className="mt-auto px-5 py-8 border-t transition-colors shrink-0"
          style={{
            borderColor: cardBorder,
            backgroundColor: darkTheme ? hexToRgbaString(background, 0.8) : hexToRgbaString(background, 0.9),
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: 'var(--preview-primary)',
                      color: primaryFg,
                    }}
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-sm">Apex UI</span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: mutedText }}>
                  Next-generation color tokens and UI composition tools.
                </p>
              </div>

              <div>
                <h5 className="font-bold mb-2.5">Product</h5>
                <ul className="space-y-1.5 text-[11px]" style={{ color: mutedText }}>
                  <li className="hover:underline cursor-pointer">Design Tokens</li>
                  <li className="hover:underline cursor-pointer">Palette Studio</li>
                  <li className="hover:underline cursor-pointer">Accessibility</li>
                  <li className="hover:underline cursor-pointer">Releases</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2.5">Resources</h5>
                <ul className="space-y-1.5 text-[11px]" style={{ color: mutedText }}>
                  <li className="hover:underline cursor-pointer">Documentation</li>
                  <li className="hover:underline cursor-pointer">Guides & Tutorials</li>
                  <li className="hover:underline cursor-pointer">Community Discord</li>
                  <li className="hover:underline cursor-pointer">GitHub Repo</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold mb-2.5">Stay Updated</h5>
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-2.5 py-1.5 rounded-lg text-[11px] border bg-transparent focus:outline-none"
                    style={{ borderColor: cardBorder }}
                  />
                  <button
                    type="button"
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold shrink-0"
                    style={{
                      backgroundColor: 'var(--preview-primary)',
                      color: primaryFg,
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div
              className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
              style={{
                borderColor: cardBorder,
                color: mutedText,
              }}
            >
              <span>© {new Date().getFullYear()} Apex UI Inc. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span className="hover:underline cursor-pointer">Terms of Service</span>
                <span className="hover:underline cursor-pointer">Status</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
