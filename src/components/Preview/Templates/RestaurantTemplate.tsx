import React, { useState } from 'react';
import {
  Utensils,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ArrowRight,
  Check,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const RestaurantTemplate: React.FC<TemplateComponentProps> = ({
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
  const [activeCourse, setActiveCourse] = useState<'dinner' | 'cellar'>('dinner');
  const [isBooked, setIsBooked] = useState(false);

  const menuItems = [
    {
      course: 'Antipasti',
      name: 'Charred Heirloom Tomatoes & Cultured Ricotta',
      description: 'Smoked olive oil, wild marjoram, toasted sourdough crumbs',
      price: '$21',
      wine: 'Pairing: 2022 Etna Bianco',
    },
    {
      course: 'Primi',
      name: 'Hand-Cut Tagliolini with Brown Butter & Chanterelles',
      description: 'Aged mountain parmesan, cured egg yolk, thyme essence',
      price: '$32',
      wine: 'Pairing: 2021 Barbaresco DOCG',
    },
    {
      course: 'Secondi',
      name: 'Woodfire Heritage Duck with Fermented Damson Plum',
      description: 'Celeriac puree, glazed endive, reduced duck jus',
      price: '$46',
      wine: 'Pairing: 2019 Syrah, Northern Rhône',
    },
    {
      course: 'Dolci',
      name: 'Fig Leaf Ice Cream with Warm Spiced Tart',
      description: 'Caramelized honey, sea salt pollen crisp',
      price: '$18',
      wine: 'Pairing: 2018 Vin Santo del Chianti',
    },
  ];

  return (
    <div className="flex-1 flex flex-col font-serif">
      {/* Top Table Reservation Ticker */}
      <div
        className="px-4 py-1.5 text-[11px] font-sans font-medium text-center border-b flex items-center justify-center gap-2"
        style={{
          backgroundColor: accentSoft,
          borderColor: hairlineBorder,
          color: 'var(--preview-accent)',
        }}
      >
        <Sparkles className="w-3 h-3" />
        <span>Autumn Tasting Menu Now Debuting · Service Wed–Sun 17:30–23:00</span>
      </div>

      {/* Culinary Navigation */}
      <header
        className="px-4 sm:px-8 py-4 border-b flex items-center justify-between gap-4 font-sans shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            <Utensils className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-serif font-bold text-base tracking-wide leading-none block">
              Bistro Aurora
            </span>
            <span className="text-[10px] tracking-widest uppercase opacity-70">
              Woodfire & Cellar
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-5 text-xs font-sans tracking-wide" style={{ color: mutedText }}>
            <span className="cursor-pointer font-semibold" style={{ color: 'var(--preview-primary)' }}>Tasting Menu</span>
            <span className="cursor-pointer hover:underline">Provenance</span>
            <span className="cursor-pointer hover:underline">Sommelier Cellar</span>
            <span className="cursor-pointer hover:underline">Private Dining</span>
          </nav>
        )}

        <button
          type="button"
          onClick={() => setIsBooked(!isBooked)}
          className="px-3.5 py-1.5 rounded-[6px] text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{isBooked ? 'Table Confirmed' : 'Reserve Table'}</span>
        </button>
      </header>

      {/* Hero Atmosphere Section */}
      <section
        className="px-4 sm:px-8 py-10 sm:py-14 border-b text-center relative"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest border"
            style={{
              backgroundColor: subtleFill,
              borderColor: hairlineBorder,
              color: 'var(--preview-text)',
            }}
          >
            <Award className="w-3 h-3" style={{ color: 'var(--preview-accent)' }} />
            <span>Michelin Guide Selection 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight leading-snug">
            Honest woodfire gastronomy rooted in seasonal coastal terroir.
          </h1>

          <p className="text-xs sm:text-sm font-sans leading-relaxed max-w-lg mx-auto" style={{ color: mutedText }}>
            Every evening, Chef Mateo crafts an 8-course narrative celebrating wild-foraged botanicals,
            regenerative pasture farms, and natural low-intervention wines.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-sans">
            <button
              type="button"
              className="px-5 py-2.5 rounded-[6px] text-xs font-semibold flex items-center gap-2 shadow-sm"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              <span>Explore Seasonal Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-[6px] text-xs font-semibold border"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            >
              The Wine Cellar
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tasting Menu Sheet */}
      <section
        className="px-4 sm:px-8 py-10 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Menu Category Switcher */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b font-sans" style={{ borderColor: hairlineBorder }}>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--preview-accent)' }}>
                CURRENT REPERTOIRE
              </span>
              <h2 className="text-xl font-serif font-bold">Autumn Dinner Tasting Menu</h2>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-[6px] border text-xs" style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}>
              <button
                type="button"
                onClick={() => setActiveCourse('dinner')}
                className={`px-3 py-1 rounded-[4px] font-medium transition-colors ${
                  activeCourse === 'dinner' ? 'shadow-sm' : ''
                }`}
                style={
                  activeCourse === 'dinner'
                    ? { backgroundColor: 'var(--preview-primary)', color: primaryFg }
                    : { color: mutedText }
                }
              >
                Food Menu
              </button>
              <button
                type="button"
                onClick={() => setActiveCourse('cellar')}
                className={`px-3 py-1 rounded-[4px] font-medium transition-colors ${
                  activeCourse === 'cellar' ? 'shadow-sm' : ''
                }`}
                style={
                  activeCourse === 'cellar'
                    ? { backgroundColor: 'var(--preview-primary)', color: primaryFg }
                    : { color: mutedText }
                }
              >
                Pairings
              </button>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-6">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] border transition-colors"
                style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
              >
                <div className="flex items-baseline justify-between gap-4 border-b pb-2 mb-2" style={{ borderColor: hairlineBorder }}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider" style={{ color: 'var(--preview-accent)' }}>
                      {item.course}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-semibold">{item.name}</h3>
                  </div>
                  <span className="font-mono text-sm font-bold shrink-0">{item.price}</span>
                </div>
                <p className="text-xs font-sans leading-relaxed" style={{ color: mutedText }}>
                  {item.description}
                </p>
                <div className="mt-2 text-[11px] font-sans font-medium flex items-center gap-1" style={{ color: 'var(--preview-primary)' }}>
                  <Check className="w-3 h-3" />
                  <span>{item.wine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours, Location & Private Events Strip */}
      <section
        className="px-4 sm:px-8 py-8 border-b font-sans"
        style={{ borderColor: hairlineBorder }}
      >
        <div className={`max-w-5xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-semibold">Service Hours</h4>
              <p className="text-[11px] mt-0.5" style={{ color: mutedText }}>Wed – Sat: 17:30 – 23:00</p>
              <p className="text-[11px]" style={{ color: mutedText }}>Sun Luncheon: 12:30 – 16:00</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-semibold">Bespoke Location</h4>
              <p className="text-[11px] mt-0.5" style={{ color: mutedText }}>18 Old Foundry Lane</p>
              <p className="text-[11px]" style={{ color: mutedText }}>Harbour District, Maritime Quarter</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--preview-accent)' }} />
            <div>
              <h4 className="text-xs font-semibold">Sommelier Inquiries</h4>
              <p className="text-[11px] mt-0.5" style={{ color: mutedText }}>Cellar consultation & private cellar lockers</p>
              <p className="text-[11px] font-medium" style={{ color: 'var(--preview-primary)' }}>sommelier@bistro-aurora.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 mt-auto font-sans">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: mutedText }}>
          <span>© {new Date().getFullYear()} Bistro Aurora. Reservations & Inquiries.</span>
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
