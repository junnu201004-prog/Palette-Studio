import React from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  Palette,
  Layout,
  Box,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const PortfolioTemplate: React.FC<TemplateComponentProps> = ({
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
    mutedText,
    accentSoft,
  } = themeUtils;

  const isMobile = deviceMode === 'mobile';

  const projects = [
    {
      title: 'Aethelgard Horology',
      client: 'Swiss Heritage Watchmaker',
      year: '2025',
      discipline: 'Brand Identity & Flagship E-Commerce',
      metrics: '+184% Global DTC Sales',
      accentTag: 'Identity',
    },
    {
      title: 'Solace Architecture Monograph',
      client: 'Nordic Architectural Practice',
      year: '2025',
      discipline: 'Editorial Design & Digital Archive',
      metrics: 'D&AD Yellow Pencil Winner',
      accentTag: 'Publishing',
    },
    {
      title: 'Kinetic Acoustic Hardware',
      client: 'Berlin Sound Labs',
      year: '2026',
      discipline: 'Interface Design & Industrial Packaging',
      metrics: 'Red Dot Best of Best',
      accentTag: 'Hardware UI',
    },
  ];

  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* Studio Header */}
      <header
        className="px-4 sm:px-8 py-4 border-b flex items-center justify-between gap-4 shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-[2px] flex items-center justify-center font-mono font-bold text-xs"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            L
          </div>
          <span className="font-bold text-sm tracking-tight uppercase">
            Lumière Studio
          </span>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium" style={{ color: mutedText }}>
            <span className="cursor-pointer font-bold" style={{ color: 'var(--preview-primary)' }}>Work</span>
            <span className="cursor-pointer hover:underline">Discipline</span>
            <span className="cursor-pointer hover:underline">Manifesto</span>
            <span className="cursor-pointer hover:underline">Contact</span>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border"
            style={{
              backgroundColor: accentSoft,
              borderColor: hairlineBorder,
              color: 'var(--preview-accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--preview-accent)' }} />
            <span>Open for Q3 Commissions</span>
          </span>
        </div>
      </header>

      {/* Hero Typography Showcase */}
      <section
        className="px-4 sm:px-8 py-10 sm:py-16 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--preview-primary)' }}>
            <span>[EST. 2016]</span>
            <span>·</span>
            <span>INDEPENDENT DESIGN DIRECTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.12]">
            We build defining visual identities and digital instruments for courageous pioneers.
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t" style={{ borderColor: hairlineBorder }}>
            <p className="text-xs sm:text-sm max-w-md leading-relaxed" style={{ color: mutedText }}>
              Operating at the intersection of graphic design, typographic discipline, and modern engineering.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
              >
                <span>Initiate Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Case Studies Grid */}
      <section
        className="px-4 sm:px-8 py-10 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: hairlineBorder }}>
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--preview-accent)' }}>
              SELECTED CASE STUDIES (03)
            </span>
            <span className="text-xs font-mono" style={{ color: mutedText }}>
              RECENT COMMISSIONS
            </span>
          </div>

          <div className="space-y-4">
            {projects.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[8px] border transition-all hover:translate-x-1"
                style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                      style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
                    >
                      {item.accentTag}
                    </span>
                    <span className="text-xs font-mono" style={{ color: mutedText }}>{item.year}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t text-xs" style={{ borderColor: hairlineBorder }}>
                  <div>
                    <span className="text-[10px] font-mono block" style={{ color: mutedText }}>CLIENT</span>
                    <span className="font-medium">{item.client}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono block" style={{ color: mutedText }}>DISCIPLINE</span>
                    <span className="font-medium">{item.discipline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono block" style={{ color: mutedText }}>IMPACT</span>
                      <span className="font-bold" style={{ color: 'var(--preview-primary)' }}>{item.metrics}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Capabilities Matrix */}
      <section
        className="px-4 sm:px-8 py-10 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest block mb-1" style={{ color: 'var(--preview-accent)' }}>
              PRACTICE SCOPE
            </span>
            <h2 className="text-xl font-bold">Studio Disciplines</h2>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-4 gap-3.5'}`}>
            {[
              { icon: Layers, title: 'Brand Identity', desc: 'Core marks, guidelines, typography systems.' },
              { icon: Layout, title: 'Digital Platforms', desc: 'Web apps, e-commerce, custom UI frameworks.' },
              { icon: Palette, title: 'Art Direction', desc: 'Campaign styling, photography, visual essays.' },
              { icon: Box, title: 'Physical Craft', desc: 'Packaging, bespoke print monographs, objects.' },
            ].map((col, i) => {
              const Icon = col.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-[6px] border flex flex-col justify-between"
                  style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
                >
                  <Icon className="w-5 h-5 mb-3" style={{ color: 'var(--preview-primary)' }} />
                  <div>
                    <h4 className="text-xs font-bold mb-1">{col.title}</h4>
                    <p className="text-[11px] leading-relaxed" style={{ color: mutedText }}>{col.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Colophon Footer */}
      <footer className="px-4 sm:px-8 py-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: mutedText }}>
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase" style={{ color: 'var(--preview-text)' }}>Lumière Creative Studio</span>
            <span>· All rights reserved</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>PRI: {primary}</span>
            <span>ACC: {accent}</span>
            <span>TXT: {text}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
