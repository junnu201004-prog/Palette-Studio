import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Check,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const EcommerceTemplate: React.FC<TemplateComponentProps> = ({
  customColors,
  deviceMode,
  themeUtils,
}) => {
  const { primary, accent, text } = customColors;
  const {
    primaryFg,
    accentFg,
    surfaceBg,
    elevatedBg,
    hairlineBorder,
    subtleFill,
    mutedText,
    accentSoft,
  } = themeUtils;

  const isMobile = deviceMode === 'mobile';
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const categories = ['All', 'Ceramics', 'Leather', 'Lighting', 'Horology'];

  const products = [
    {
      id: 1,
      name: 'Stoneware Pour-Over Carafe',
      category: 'Ceramics',
      price: '$84',
      badge: 'Staff Pick',
      rating: '4.9',
      reviews: 42,
    },
    {
      id: 2,
      name: 'Full-Grain Folio Wallet',
      category: 'Leather',
      price: '$165',
      badge: 'Handcrafted',
      rating: '5.0',
      reviews: 88,
    },
    {
      id: 3,
      name: 'Machined Brass Task Lamp',
      category: 'Lighting',
      price: '$240',
      badge: 'Limited Run',
      rating: '4.8',
      reviews: 19,
    },
    {
      id: 4,
      name: 'Automatic Field Chronometer',
      category: 'Horology',
      price: '$420',
      badge: 'New Edition',
      rating: '4.9',
      reviews: 64,
    },
  ];

  const handleAdd = (id: number) => {
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1400);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Utility Dispatch Bar */}
      <div
        className="px-4 py-1.5 text-[11px] font-mono text-center border-b flex items-center justify-center gap-2"
        style={{
          backgroundColor: accentSoft,
          borderColor: hairlineBorder,
          color: 'var(--preview-accent)',
        }}
      >
        <span>Complimentary expedited shipping on orders over $150</span>
        <span className="hidden sm:inline">· Studio Edition 2026</span>
      </div>

      {/* Store Header */}
      <header
        className="px-4 sm:px-8 py-3.5 border-b flex items-center justify-between gap-3 shrink-0"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-[4px] flex items-center justify-center font-mono font-bold text-xs"
              style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
            >
              M
            </div>
            <span className="font-semibold text-sm tracking-tight">Mercantile Goods</span>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-4 text-xs font-medium" style={{ color: mutedText }}>
              <span className="cursor-pointer hover:underline" style={{ color: 'var(--preview-primary)' }}>Catalog</span>
              <span className="cursor-pointer hover:underline">Provenance</span>
              <span className="cursor-pointer hover:underline">Lookbook</span>
              <span className="cursor-pointer hover:underline">Atelier</span>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {!isMobile && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] border text-xs"
              style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}
            >
              <Search className="w-3.5 h-3.5" style={{ color: mutedText }} />
              <input
                type="text"
                placeholder="Search catalog..."
                readOnly
                className="bg-transparent border-none text-[11px] w-24 sm:w-32 focus:outline-none"
                style={{ color: 'var(--preview-text)' }}
              />
            </div>
          )}

          <button
            type="button"
            className="p-1.5 rounded-[6px] border text-xs flex items-center justify-center"
            style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            aria-label="Wishlist"
          >
            <Heart className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="px-3 py-1.5 rounded-[6px] text-xs font-medium flex items-center gap-1.5 shadow-sm"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag (2)</span>
          </button>
        </div>
      </header>

      {/* Hero Showcase Banner */}
      <section
        className="px-4 sm:px-8 py-8 sm:py-12 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-md">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
              style={{
                backgroundColor: accentSoft,
                borderColor: hairlineBorder,
                color: 'var(--preview-accent)',
              }}
            >
              AUTUMN CURATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">
              Objects designed for a lifetime of daily rituals.
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: mutedText }}>
              Each item is made in collaboration with independent ceramicists, leather artisans,
              and precision workshops worldwide.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-[6px] text-xs font-medium flex items-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="px-3.5 py-2 rounded-[6px] text-xs font-medium border"
                style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
              >
                View Lookbook
              </button>
            </div>
          </div>

          {/* Featured Product Specimen Box */}
          <div
            className="w-full md:w-72 p-4 rounded-[10px] border space-y-3"
            style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
          >
            <div
              className="w-full h-36 rounded-[6px] flex flex-col items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: subtleFill }}
            >
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                style={{ borderColor: 'var(--preview-accent)', color: 'var(--preview-accent)' }}
              >
                MG-08
              </div>
              <span
                className="absolute top-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'var(--preview-accent)', color: accentFg }}
              >
                Featured
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xs font-semibold">Modular Desk Organizer</h4>
                <p className="text-[11px]" style={{ color: mutedText }}>Solid Walnut & Raw Brass</p>
              </div>
              <span className="font-mono text-xs font-bold">$125</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section
        className="px-4 sm:px-8 py-4 border-b flex items-center justify-between gap-4 overflow-x-auto"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-wider mr-1" style={{ color: mutedText }}>
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded-[6px] text-xs transition-colors"
              style={
                activeCategory === cat
                  ? { backgroundColor: 'var(--preview-primary)', color: primaryFg }
                  : { backgroundColor: subtleFill, color: 'var(--preview-text)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono shrink-0 hidden sm:inline" style={{ color: mutedText }}>
          Showing 4 curated editions
        </span>
      </section>

      {/* Product Catalog Grid */}
      <section
        className="px-4 sm:px-8 py-8 sm:py-10 border-b"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="max-w-5xl mx-auto">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 lg:grid-cols-4 gap-4'}`}>
            {products.map((product) => {
              const isAdded = addedItem === product.id;
              return (
                <div
                  key={product.id}
                  className="rounded-[8px] border p-3 flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
                >
                  <div>
                    {/* Visual Mock Box */}
                    <div
                      className="w-full h-32 rounded-[6px] flex flex-col items-center justify-center relative mb-3"
                      style={{ backgroundColor: subtleFill }}
                    >
                      <span className="text-xs font-mono font-medium opacity-60">
                        {product.category}
                      </span>
                      <span
                        className="absolute top-2 left-2 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold"
                        style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
                      >
                        {product.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[10px]">
                        <Star className="w-3 h-3 fill-current" style={{ color: 'var(--preview-accent)' }} />
                        <span className="font-bold">{product.rating}</span>
                        <span style={{ color: mutedText }}>({product.reviews})</span>
                      </div>
                      <h3 className="text-xs font-semibold leading-tight">{product.name}</h3>
                      <p className="text-[11px]" style={{ color: mutedText }}>{product.category}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t flex items-center justify-between" style={{ borderColor: hairlineBorder }}>
                    <span className="font-mono text-xs font-bold">{product.price}</span>
                    <button
                      type="button"
                      onClick={() => handleAdd(product.id)}
                      className="px-2.5 py-1 rounded-[5px] text-[11px] font-medium flex items-center gap-1 transition-colors"
                      style={
                        isAdded
                          ? { backgroundColor: 'var(--preview-accent)', color: accentFg }
                          : { backgroundColor: 'var(--preview-primary)', color: primaryFg }
                      }
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Store Trust Pillars */}
      <section
        className="px-4 sm:px-8 py-6 border-b"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className={`max-w-5xl mx-auto grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-semibold">Worldwide Direct Courier</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>Tracked climate-neutral transit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-semibold">Guaranteed Provenance</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>Individually numbered editions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 shrink-0" style={{ color: 'var(--preview-primary)' }} />
            <div>
              <h4 className="text-xs font-semibold">30-Day Evaluation Period</h4>
              <p className="text-[11px]" style={{ color: mutedText }}>Hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: mutedText }}>
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: 'var(--preview-text)' }}>Mercantile Goods Co.</span>
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

