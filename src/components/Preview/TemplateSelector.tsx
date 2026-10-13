import React from 'react';
import {
  Layers,
  ShoppingBag,
  Utensils,
  Layout,
  Building2,
  BookOpen,
  BarChart3,
  Compass,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { TemplateId, PreviewTemplate } from '../../types/palette';
import { PREVIEW_TEMPLATES } from '../../data/templates';

interface TemplateSelectorProps {
  activeTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

const TEMPLATE_ICONS: Record<TemplateId, React.ComponentType<{ className?: string }>> = {
  saas: Layers,
  ecommerce: ShoppingBag,
  restaurant: Utensils,
  portfolio: Layout,
  corporate: Building2,
  blog: BookOpen,
  dashboard: BarChart3,
  travel: Compass,
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTemplateId,
  onSelectTemplate,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FFFFFF] border-b border-[#E5DED1] px-4 sm:px-5 py-2.5 shrink-0 select-none">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#343630]">
            <Sparkles className="w-3.5 h-3.5 text-[#D16C50]" />
            <span>Preview Templates</span>
          </div>
          <span className="text-[11px] font-mono text-[#77786F]">
            (8 website designs)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="p-1 rounded-[6px] text-[#77786F] hover:text-[#343630] hover:bg-[#F7F4ED] border border-transparent hover:border-[#E5DED1] transition-colors"
            title="Scroll templates left"
            aria-label="Scroll templates left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="p-1 rounded-[6px] text-[#77786F] hover:text-[#343630] hover:bg-[#F7F4ED] border border-transparent hover:border-[#E5DED1] transition-colors"
            title="Scroll templates right"
            aria-label="Scroll templates right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Gallery of 8 Templates */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
        role="tablist"
        aria-label="Website preview templates"
      >
        {PREVIEW_TEMPLATES.map((tpl: PreviewTemplate, idx: number) => {
          const Icon = TEMPLATE_ICONS[tpl.id] || Layers;
          const isSelected = activeTemplateId === tpl.id;

          return (
            <button
              key={tpl.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`shrink-0 flex items-center gap-2.5 px-3 py-1.5 rounded-[8px] text-left border transition-all ${
                isSelected
                  ? 'bg-[#EAE5DA] border-[#D16C50] text-[#343630] shadow-sm ring-1 ring-[#D16C50]/30'
                  : 'bg-[#F7F4ED] border-[#E5DED1] text-[#77786F] hover:bg-[#FFFFFF] hover:text-[#343630] hover:border-[#D5CEC0]'
              }`}
            >
              {/* Mini visual icon badge */}
              <div
                className={`w-6 h-6 rounded-[5px] flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#D16C50] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] border border-[#E5DED1] text-[#77786F]'
                }`}
              >
                <Icon className="w-3 h-3" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                  <span className={`text-xs truncate ${isSelected ? 'font-semibold text-[#343630]' : 'font-medium'}`}>
                    {tpl.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#77786F] block truncate mt-0.5 leading-tight">
                  {tpl.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

