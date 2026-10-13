import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const CorporateTemplate: React.FC<TemplateComponentProps> = ({
  customColors,
  deviceMode,
  themeUtils,
}) => {
  const { primary, accent, text } = customColors;
  const {
    primaryFg,
    surfaceBg,
    elevatedBg,
    hairlineBorder,
    subtleFill,
    mutedText,
    accentSoft,
  } = themeUtils;

  const isMobile = deviceMode === 'mobile';
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* Top Corporate Dispatch */}
      <div
        className="px-4 py-1 text-[11px] font-mono border-b flex items-center justify-between"
        style={{ backgroundColor: subtleFill, borderColor: hairlineBorder, color: mutedText }}
      >
        <span>Global Strategic Advisory · London · New York · Zurich · Tokyo</span>
        <span className="hidden sm:inline">Member of Global Advisory Alliance</span>
      </div>

      {/* Corporate Header */}
      <header
        className="px-4 sm:px-8 py-3.5 border-b flex items-center justify-between gap-4 shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-[4px] flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight leading-none block">
              Vanguard Partners
            </span>
            <span className="text-[10px] font-mono tracking-wider opacity-70">
              Strategic Advisory & Capital
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium" style={{ color: mutedText }}>
            <span className="cursor-pointer font-semibold" style={{ color: 'var(--preview-primary)' }}>Practices</span>
            <span className="cursor-pointer hover:underline">Capital Advisory</span>
            <span className="cursor-pointer hover:underline">Executive Insights</span>
            <span className="cursor-pointer hover:underline">Global Team</span>
          </nav>
        )}

        <button
          type="button"
          className="px-3.5 py-1.5 rounded-[5px] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Consultation</span>
        </button>
      </header>

      {/* Hero Executive Positioning */}
      <section
        className="px-4 sm:px-8 py-10 sm:py-14 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider border"
            style={{
              backgroundColor: accentSoft,
              borderColor: hairlineBorder,
              color: 'var(--preview-accent)',
            }}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Fiduciary Rigor & Executive Strategy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-snug">
            Strategic counsel for market leaders navigating complex transformations.
          </h1>

          <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{ color: mutedText }}>
            We advise boards, institutional sovereign funds, and market-defining corporations on
            cross-border M&A, capital allocation, and enterprise resilience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-[5px] text-xs font-semibold flex items-center gap-2 shadow-sm"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              <span>Explore Advisory Practices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="px-3.5 py-2 rounded-[5px] text-xs font-semibold border"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            >
              2026 Global Market Outlook
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Ledger Statistics */}
      <section
        className="border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className={`max-w-4xl mx-auto grid ${isMobile ? 'grid-cols-2 divide-y divide-x' : 'grid-cols-4 divide-x'} text-center`} style={{ borderColor: hairlineBorder }}>
          {[
            { stat: '$180B+', label: 'Transaction Advisory' },
            { stat: '42%', label: 'Avg Efficiency Gains' },
            { stat: '14 Hubs', label: 'Global Footprint' },
            { stat: '99.4%', label: 'Executive Retention' },
          ].map((item, i) => (
            <div key={i} className="p-4">
              <div className="text-lg sm:text-xl font-bold font-mono" style={{ color: 'var(--preview-primary)' }}>
                {item.stat}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: mutedText }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Practice Areas */}
      <section
        className="px-4 sm:px-8 py-10 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest block mb-1" style={{ color: 'var(--preview-accent)' }}>
                CAPABILITIES
              </span>
              <h2 className="text-xl font-bold">Specialized Practices</h2>
            </div>
            <span className="text-xs font-mono" style={{ color: mutedText }}>CROSS-BORDER PRACTICE</span>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3.5' : 'grid-cols-3 gap-4'}`}>
            {[
              {
                icon: TrendingUp,
                title: 'Capital Restructuring & M&A',
                desc: 'Comprehensive due diligence, syndicate financing, and cross-border synergy realization.',
                metric: '$42B+ in 2025 Deals',
              },
              {
                icon: Briefcase,
                title: 'Enterprise Transformation',
                desc: 'Operating model modernization, digital architecture, and organizational restructuring.',
                metric: '85+ Turnarounds',
              },
              {
                icon: ShieldCheck,
                title: 'Governance & Regulatory Compliance',
                desc: 'Navigating evolving cross-border antitrust, trade regulations, and sovereign compliance.',
                metric: 'Zero Violations',
              },
            ].map((practice, idx) => {
              const Icon = practice.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-[8px] border flex flex-col justify-between"
                  style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
                >
                  <div>
                    <div
                      className="w-8 h-8 rounded-[5px] flex items-center justify-center mb-3"
                      style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold mb-2">{practice.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                      {practice.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t text-[11px] font-mono font-bold" style={{ borderColor: hairlineBorder, color: 'var(--preview-accent)' }}>
                    {practice.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Consultation Form */}
      <section
        className="px-4 sm:px-8 py-8 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold">Request Confidential Executive Briefing</h3>
            <p className="text-xs mt-0.5" style={{ color: mutedText }}>
              Connect directly with our senior managing partners in London or New York.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="corporate@enterprise.com"
              readOnly
              className="px-3 py-1.5 rounded-[5px] text-xs border bg-transparent w-full sm:w-56 focus:outline-none"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            />
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="px-3.5 py-1.5 rounded-[5px] text-xs font-bold shrink-0 shadow-sm"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              {submitted ? 'Inquiry Sent' : 'Request Briefing'}
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="px-4 sm:px-8 py-5 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: mutedText }}>
          <span>© {new Date().getFullYear()} Vanguard Partners International Ltd. Regulated fiduciary counsel.</span>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>PRI: {primary}</span>
            <span>ACC: {accent}</span>
            <span>TXT: {text}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
