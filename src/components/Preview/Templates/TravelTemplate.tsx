import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  ArrowRight,
  Plane,
  Shield,
  Check,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const TravelTemplate: React.FC<TemplateComponentProps> = ({
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
  const [destination, setDestination] = useState('Lofoten, Norway');

  const destinations = [
    {
      id: 1,
      title: 'Lofoten Fjord Architecture Lodge',
      country: 'Norway',
      duration: '7 Nights',
      price: '$3,850',
      rating: '4.98',
      reviews: 38,
      tag: 'Arctic Wilderness',
    },
    {
      id: 2,
      title: 'Kyoto Cedar Forest Sanctuary',
      country: 'Japan',
      duration: '6 Nights',
      price: '$4,200',
      rating: '5.0',
      reviews: 52,
      tag: 'Cultural Immersion',
    },
    {
      id: 3,
      title: 'Atacama Celestial Stargazing Camp',
      country: 'Chile',
      duration: '5 Nights',
      price: '$2,950',
      rating: '4.95',
      reviews: 29,
      tag: 'Desert Astronomy',
    },
  ];

  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* Top Travel Notice */}
      <div
        className="px-4 py-1.5 text-[11px] font-mono border-b flex items-center justify-center gap-2"
        style={{ backgroundColor: accentSoft, borderColor: hairlineBorder, color: 'var(--preview-accent)' }}
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Winter 2026 Expeditions Open · Bespoke Carbon-Neutral Itineraries</span>
      </div>

      {/* Travel Header */}
      <header
        className="px-4 sm:px-8 py-3.5 border-b flex items-center justify-between gap-4 shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight leading-none block">
              Voyager Escapes
            </span>
            <span className="text-[10px] tracking-wider font-mono opacity-70">
              Bespoke Expeditions
            </span>
          </div>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium" style={{ color: mutedText }}>
            <span className="cursor-pointer font-semibold" style={{ color: 'var(--preview-primary)' }}>Expeditions</span>
            <span className="cursor-pointer hover:underline">Sanctuaries</span>
            <span className="cursor-pointer hover:underline">Philosophy</span>
            <span className="cursor-pointer hover:underline">Journal</span>
          </nav>
        )}

        <button
          type="button"
          className="px-3.5 py-1.5 rounded-[6px] text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>Plan Journey</span>
        </button>
      </header>

      {/* Hero Atmosphere & Search Box */}
      <section
        className="px-4 sm:px-8 py-10 sm:py-14 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-3 max-w-xl">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
              style={{
                backgroundColor: accentSoft,
                borderColor: hairlineBorder,
                color: 'var(--preview-accent)',
              }}
            >
              UNEXPLORED ARCHIPELAGOS
            </span>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-snug">
              Bespoke journeys to the world's most remote architectural sanctuaries.
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: mutedText }}>
              Private off-grid lodges, master naturalists, and handcrafted itineraries designed for restorative quietude.
            </p>
          </div>

          {/* Interactive Expedition Booking Bar */}
          <div
            className="p-3 sm:p-4 rounded-[10px] border shadow-sm"
            style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
          >
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-4 gap-3'} items-center`}>
              <div className="p-2 rounded border" style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}>
                <span className="text-[10px] font-mono block" style={{ color: mutedText }}>DESTINATION</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent border-none w-full focus:outline-none"
                    style={{ color: 'var(--preview-text)' }}
                  />
                </div>
              </div>

              <div className="p-2 rounded border" style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}>
                <span className="text-[10px] font-mono block" style={{ color: mutedText }}>TRAVEL DATES</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
                  <span>Oct 14 – Oct 22</span>
                </div>
              </div>

              <div className="p-2 rounded border" style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}>
                <span className="text-[10px] font-mono block" style={{ color: mutedText }}>PARTY SIZE</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
                  <span>2 Guests</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full h-full py-2.5 rounded-[6px] text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Expeditions</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Expeditions Grid */}
      <section
        className="px-4 sm:px-8 py-10 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-6 border-b pb-2" style={{ borderColor: hairlineBorder }}>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest block mb-0.5" style={{ color: 'var(--preview-accent)' }}>
                FEATURED EXPEDITIONS
              </span>
              <h2 className="text-xl font-bold">Curated Sanctuaries</h2>
            </div>
            <span className="text-xs font-mono" style={{ color: mutedText }}>LIMITED CAPACITY</span>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-4'}`}>
            {destinations.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-[8px] border flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
              >
                <div>
                  {/* Visual Destination Placeholder */}
                  <div
                    className="w-full h-32 rounded-[6px] flex flex-col items-center justify-center relative mb-3 overflow-hidden"
                    style={{ backgroundColor: subtleFill }}
                  >
                    <span className="text-xs font-mono font-bold tracking-wider opacity-60">
                      {item.country}
                    </span>
                    <span
                      className="absolute top-2 left-2 text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold"
                      style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-medium" style={{ color: mutedText }}>{item.duration}</span>
                      <span className="flex items-center gap-1 font-bold">
                        <Star className="w-3 h-3 fill-current" style={{ color: 'var(--preview-accent)' }} />
                        {item.rating}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold leading-snug">{item.title}</h3>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: hairlineBorder }}>
                  <div>
                    <span className="text-[9px] font-mono block" style={{ color: mutedText }}>ALL-INCLUSIVE</span>
                    <span className="font-mono text-xs font-bold">{item.price}</span>
                  </div>
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-[5px] text-[11px] font-semibold flex items-center gap-1"
                    style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Concierge Perks */}
      <section className="px-4 sm:px-8 py-6 border-b" style={{ borderColor: hairlineBorder }}>
        <div className={`max-w-4xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-6'}`}>
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-bold">Charter Coordination</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>Seamless connections to remote airfields</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-bold">Private Naturalist Guides</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>Accredited expedition specialists</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-accent)' }} />
            <div>
              <h4 className="text-xs font-bold">Verified Conservation</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>200% carbon offsetting on all bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: mutedText }}>
          <span>© {new Date().getFullYear()} Voyager Escapes Ltd. Licensed global travel atelier.</span>
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
