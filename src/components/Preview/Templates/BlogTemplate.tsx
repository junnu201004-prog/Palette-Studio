import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const BlogTemplate: React.FC<TemplateComponentProps> = ({
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
  const [bookmarked, setBookmarked] = useState(false);

  const articles = [
    {
      kicker: 'CULTURAL CRITICISM',
      title: 'The Endurance of Physical Paper in an Era of Transient Feeds',
      author: 'Clara Sorensen',
      readTime: '8 min read',
      date: 'April 12',
    },
    {
      kicker: 'DESIGN THEORY',
      title: 'Colour Semantics: How Chromatic Hierarchy Directs Intuition',
      author: 'David Thorne',
      readTime: '11 min read',
      date: 'April 9',
    },
    {
      kicker: 'ARCHITECTURAL ESSAY',
      title: 'Silent Spaces: Designing Workspaces for Unbroken Contemplation',
      author: 'Amara Patel',
      readTime: '6 min read',
      date: 'April 4',
    },
  ];

  return (
    <div className="flex-1 flex flex-col font-serif">
      {/* Top Issue Bar */}
      <div
        className="px-4 py-1 text-[11px] font-sans border-b flex items-center justify-between"
        style={{ backgroundColor: surfaceBg, borderColor: hairlineBorder, color: mutedText }}
      >
        <span className="font-mono">ISSUE NO. 48 · SPRING MONOGRAPH</span>
        <span className="hidden sm:inline">DISPATCHES ON TYPOGRAPHY, FORM & CULTURE</span>
      </div>

      {/* Magazine Masthead */}
      <header
        className="px-4 sm:px-8 py-5 border-b text-center shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[10px] font-sans uppercase tracking-widest hidden sm:block" style={{ color: mutedText }}>
            VOL. XII
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-none">
              The Chronicle Journal
            </h1>
            <p className="text-[11px] font-sans tracking-widest uppercase mt-1" style={{ color: mutedText }}>
              Quarterly Review of Design & Society
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1 rounded-[4px] text-xs font-sans font-medium"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Story */}
      <section
        className="px-4 sm:px-8 py-8 sm:py-12 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest">
              <span
                className="px-2 py-0.5 rounded"
                style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
              >
                COVER ESSAY
              </span>
              <span style={{ color: mutedText }}>LONG FORM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-tight">
              The Return of Tangible Interfaces in a Dematerialized World.
            </h2>

            <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: mutedText }}>
              As screens saturate everyday attention, designers and engineers are reclaiming tactile knobs,
              calibrated mechanical resistance, and ink-on-paper monographs as instruments of mindfulness.
            </p>

            <div className="pt-2 flex items-center justify-between font-sans text-xs" style={{ color: mutedText }}>
              <div className="flex items-center gap-3">
                <span className="font-semibold" style={{ color: 'var(--preview-text)' }}>Julian Vance</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3 h-3" />
                  14 min read
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBookmarked(!bookmarked)}
                  className="p-1 rounded hover:bg-black/5"
                  title="Bookmark essay"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} style={{ color: 'var(--preview-primary)' }} />
                </button>
                <button type="button" className="p-1 rounded hover:bg-black/5" title="Share essay">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Graphic Specimen Placeholder */}
          <div
            className="md:col-span-4 p-5 rounded-[8px] border flex flex-col justify-between h-56"
            style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono" style={{ color: mutedText }}>SPECIMEN 01</span>
              <Sparkles className="w-4 h-4" style={{ color: 'var(--preview-accent)' }} />
            </div>

            <div className="space-y-1">
              <div
                className="w-8 h-1 rounded"
                style={{ backgroundColor: 'var(--preview-accent)' }}
              />
              <span className="font-serif text-sm font-bold block">“Physicality anchors memory.”</span>
              <span className="text-[10px] font-sans" style={{ color: mutedText }}>From Chapter 3: The Sensorium</span>
            </div>

            <button
              type="button"
              className="text-xs font-sans font-bold flex items-center gap-1 pt-2 border-t"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-primary)' }}
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Curated Dispatches Grid */}
      <section
        className="px-4 sm:px-8 py-8 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-6 border-b pb-2 font-sans" style={{ borderColor: hairlineBorder }}>
            <h3 className="text-sm font-bold uppercase tracking-wider">Recent Dispatches</h3>
            <span className="text-[11px] font-mono" style={{ color: mutedText }}>FILTER BY DISCIPLINE</span>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-5'}`}>
            {articles.map((item, idx) => (
              <article
                key={idx}
                className="p-4 rounded-[6px] border flex flex-col justify-between"
                style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
              >
                <div>
                  <span
                    className="text-[9px] font-sans font-bold uppercase tracking-wider block mb-1.5"
                    style={{ color: 'var(--preview-accent)' }}
                  >
                    {item.kicker}
                  </span>
                  <h4 className="font-serif text-sm font-bold leading-snug mb-2">
                    {item.title}
                  </h4>
                </div>

                <div className="pt-3 border-t font-sans text-[11px] flex items-center justify-between" style={{ borderColor: hairlineBorder, color: mutedText }}>
                  <span>{item.author}</span>
                  <span className="font-mono">{item.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Dispatch Box */}
      <section
        className="px-4 sm:px-8 py-8 border-b font-sans"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold">The Saturday Monograph</h4>
            <p className="text-xs mt-0.5" style={{ color: mutedText }}>
              Every weekend, an unhurried long-form reflection delivered to 24,000+ readers.
            </p>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <input
              type="email"
              placeholder="reader@domain.com"
              readOnly
              className="px-3 py-1.5 rounded-[4px] text-xs border bg-transparent w-full sm:w-56 focus:outline-none"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            />
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-[4px] text-xs font-bold shrink-0"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              Join
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-4 mt-auto font-sans">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: mutedText }}>
          <span>© {new Date().getFullYear()} The Chronicle Journal. Registered periodical publication.</span>
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
